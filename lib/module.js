/**
 * module file
 */
!function(Kernel) {
    
    /**
     * @class Module
     * @param {String} name
     * @param {Function} fn
     * @return {Object} self
     */
    function Module(name, fn) {
        var self = this
        
        this.name = name;

        this.fn = function(sandbox) {
            this.SDB = sandbox;
            var o = fn.call(self, sandbox);
            if ({}.toString.call(o) === '[object Object]') {
                for (var k in o) {
                    this[k] = function(f) {
                        return function() {
                            f.apply(self, arguments);
                            return self;
                        };
                    }(o[k]);
                }
            }
            return self;
        }

        return self;
    }

    Module.prototype = {
        constructor: Module,
        toString: function() {
            return '[object Module]';
        },
        // the module is started ?
        started: false,
        _init: function() {
            this.started = true;
            this.init && this.init();
        },
        _destroy: function() {
            this.started = false;
            this.SDB.clean();
            this.destroy && this.destroy();
        }
    };

    Kernel.Module = Module;

}(Fea.Kernel);
