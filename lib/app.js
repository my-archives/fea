/**
 * app file
 */
!function(Kernel, Storage, Sandbox) {
    var mods = Storage.mods
      , registed = Storage.registed;

    /**
     * @class App
     * @param {Object} config
     */
    function App(config) {
    
    };

    App.prototype = {
        constructor: App,
        toString: function() {
            return '[object App]';
        },
        register: function(name) {
            if (!registed.hasOwnProperty(name)) {
                registed[name] = mods[name];
            }
        },
        start: function(name) {
            if (registed.hasOwnProperty(name)) {
                var mod = registed[name];
                if (!mod.started) {
                    mod.fn(mod.SDB || new Sandbox(this));
                    mod._init();
                }
            }
        },
        stop: function(name) {
            if (registed.hasOwnProperty(name)) {
                var mod = registed[name];
                if (mod.started) {
                    mod._destroy();
                }
            }
        },
        startAll: function(names) {
            for (var k in registed) {
                this.start(k);
            }
        },
        stopAll: function(names) {
            for (var k in registed) {
                this.stop(k);
            }
        }
    };

    Kernel.App = App;
}(Fea.Kernel, Fea.Kernel.Storage, Fea.Kernel.Sandbox);
