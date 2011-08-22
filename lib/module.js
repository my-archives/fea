/**
 * module file
 */
!function(Kernel) {
    
    /**
     * @class Module
     * @param {String} name
     * @param {Function} fn
     * @param {Objecr} config
     * @return {Object} self
     */
    function Module(name, fn) {
        var self = this
        
        this.name = name;

        this.fn = function(sandbox) {
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
            return '[Object Module]';
        },
        started: false,
        init: function() {return this;},
        destroy: function() {return this;}
    };

    Kernel.Module = Module;

}(Fea.Kernel);
