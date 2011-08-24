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
     * @return {Object} self
     */
    function Module(name, fn) {
        var self = this;
        
        this.name = name;

        this.fn = function (sandbox) {
            self.SDB = sandbox;
            var o = fn.call(self, sandbox)
              , k;
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
        _init: function () {
            this.started = true;
            this.init && this.init();
        },
        _destroy: function () {
            this.started = false;
            this.SDB.clean();
            this.destroy && this.destroy();
        }
    };

    Kernel.Module = Module;

})(Fea.Kernel);
