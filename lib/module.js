/**
 * module file
 */
(function (Kernel) {

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

        this.name = name;

        this.infos = infos || {};

        this.fn = function (sandbox) {
            self.SDB = sandbox;
            var o = fn.call(self, sandbox), k;
            if ({}.toString.call(o) === '[object Object]') {
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
            this.SDB.clean();
            this.destroy && this.destroy();
            return this;
        }
    };

    Kernel.Module = Module;

})(Fea.Kernel);
