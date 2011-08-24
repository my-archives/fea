/**
 * sandbox file
 */
(function (Kernel) {
    var APUSH = Array.prototype.push
      , PATTERN = /(?:[\w\d\-_]+|\*)/g
      , PTYPE = '[\\w\\d\\-_]+'
      , sguid = 0;

    function spliceType(type) {
        var pairs = type.split(':')
         , l = pairs.length
         , p0 = pairs[0] === '' ? '*' : pairs[0]
         , p1 = (l - 1) && pairs[1] !== '' ? pairs[1] : '*';

        return p0 + ':' + p1;
    }

    function genTypeReg(type) {
        var m = type.match(PATTERN)
          , sreg = '(?:\\*|' + ((m[0] === '*') ? PTYPE : m[0]) + 
                  ')\\:(?:\\*|' + ((m[1] === '*') ? PTYPE : m[1]) + ')';

        return new RegExp('^' + sreg + '$');
    }

    /**
     * @class Listener
     * @param {Object} instance
     * @param {Function} callback
     * @param {String} type
     * @return {Object} self
     */
    function Listener(instance, type, callback) {
        this.instance = instance;
        this.type = type;
        this.callback = callback;
        this.timestamp = +new Date();
    }

    Listener.prototype.toString = function () {
        return '[object Listener]';
    };

    /**
     * @class Sandbox
     * @param {Object} APP
     * @return {Object} self
     */
    function Sandbox(APP) {
        var S = this;

        if (!(S instanceof Sandbox)) {
            S = new Sandbox();
        } else {
            S._init(APP);
        }

        return S;
    }

    // @static
    Sandbox.listeners = {};

    Sandbox.prototype = {
        constructor: Sandbox,
        toString: function () {
            return '[object Sandbox]';
        },
        listeners: Sandbox.listeners,

        _init: function (APP) {
            this.id = ++sguid;
            this.APP = APP;
        },

        /**
         * @param {String} type
         * @param {Function} callback
         * @return {Object} self
         *
         * type: 
         *      1. '', '*', ':', '*:', ':*', '::' => 监听所有主题
         *      2. ':click', '*:click' => 监听所有 :click 的主题
         *      3. 'post', 'post:', 'post:*' => 监听 post 下的所有主题
         *      4. 'post:click' => 监听 post 下的 click 主题
         */
        listen: function (type, callback) {
            type = spliceType(type);

            var listener = new Listener(this, type, callback);

            (this.listeners[type] = this.listeners[type] || []).push(listener);

            return this;
        },
        
        /**
         * 监听一次后移除
         * @param {String} type
         * @param {Function} callback
         * @return {Object} self
         *
         * type: 
         *      1. '', '*', ':', '*:', ':*', '::' => 监听所有主题
         *      2. ':click', '*:click' => 监听所有 :click 的主题
         *      3. 'post', 'post:', 'post:*' => 监听 post 下的所有主题
         *      4. 'post:click' => 监听 post 下的 click 主题
         */
        listenOnce: function (type, callback) {
            type = spliceType(type);
            this.listeners[type] = this.listeners[type] || [];

            var listener = new Listener(this, type);
            listener.callback = function (L, listeners, fn) {
                return function (data) {
                    fn.call(this, data);
                    var i = 0
                      , l = listeners.length;
                    for (; i < l;) {
                        if (L === listeners[i++]) {
                            listeners.splice(--i, 1);
                            l--;
                        }
                    }
                };
            }(listener, this.listeners[type], callback);

            this.listeners[type].push(listener);
                    
            return this;
        },

        /**
         * @param {String} type
         * @param {Object} data
         * @param {Function} fn
         * @return {Object} self
         *
         * @see listen
         * type: 
         *      1. '', '*', ':', '*:', ':*', '::' => 广播到所有主题
         *      2. ':click', '*:click' => 广播到所有 :click 的主题
         *      3. 'post', 'post:', 'post:*' => 广播到 post 下的所有主题
         *      4. 'post:click' => 广播 post 下的 click 主题
         */
        broadcast: function (type, data, fn) {
            type = spliceType(type);

            var reg = genTypeReg(type)
              , a = []
              , i = 0
              , k;

            for (k in this.listeners) {
                if (reg.test(k)) {
                    APUSH.apply(a, this.listeners[k]);
                }
            }
            
            while (a[i] && this.APP) {
                a[i].callback.call(a[i++].instance, data);
            }

            if (fn) {
                fn.call(this);
            }

            return this;
        },

        /**
         * @param {String} type
         * @param {Function} fn
         * @return {Object} self
         *
         * @see listen
         * type: 
         *      1. '', '*', ':', '*:', ':*', '::' => 删除所有主题
         *      2. ':click', '*:click' => 删除所有 :click 的主题
         *      3. 'post', 'post:', 'post:*' => 删除 post 下的所有主题
         *      4. 'post:click' => 删除 post 下的 click 主题
         */
        unListen: function (type, fn) {
            type = spliceType(type);

            var reg = genTypeReg(type)
              , listeners
              , k;

            for (k in this.listeners) {
                if (reg.test(k)) {
                    var i;
                    listeners = this.listeners[k];

                    while (listeners[i = listeners.length - 1]) {
                        if (this === listeners[i].instance) {
                            listeners.splice(i, 1);
                        } 
                        i++;
                    }
                }
            }

            if (fn) {
                fn.call(this);
            }
        
            return this;
        },
        
        /**
         * clean sandbox's all topics.
         */
        clean: function () {
            return this.unListen('*:*');
        }
    };

    Kernel.Sandbox = Sandbox;

})(Fea.Kernel);
