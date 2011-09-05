/**
 * module file
 */
(function (Kernel, guid) {
    var TOSTRING = Object.prototype.toString;

    //simple curry function
    function curry(o, f) {
        return function () {
            f.call(o, arguments);
            return o;
        };
    }
    
    /**
     * @class Module
     * @param {String} name
     * @param {Function} fn
     * @param {Object} infos
     * @return {Object} self
     */
    function Module(name, fn, infos) {
        var self = this;

        this.id = guid('M');

        this.name = name;

        this.infos = infos;

        this.fn = function (sandbox) {
            self.SDB = sandbox;
            var o = fn.call(self, sandbox), k;
            if (TOSTRING.call(o) === '[object Object]') {
                for (k in o) {
                    self[k] = curry(self, o[k]);
                }
            }
            return self;
        };

        return self;
    }

    Module.prototype = {

        constructor: Module,

        toString: function () {
            return '[object Module]';
        },

        // the module is started ?
        started: false,

        _init: function (callback) {
            callback.call(this, this.SDB, this);
            this.started = true;
            this.init && this.init();
            return this;
        },

        _destroy: function (callback) {
            callback.call(this, this.SDB, this);
            this.started = false;
            this.SDB.detachAll();
            this.SDB.Global.detachAll(this.SDB);
            this.destroy && this.destroy();
            return this;
        },

        setFn: function (fn) {
            if (TOSTRING.call(fn) === '[object Function]') {
                this.fn = fn;
            }
            return this;
        },

        setInfos: function (infos) {
            if (TOSTRING.call(infos) === '[object Object]') {
                this.infos = infos;
            }
            return this;
        }

    };

    Kernel.Module = Module;

})(Fea.Kernel, Fea.Utils.guid);
