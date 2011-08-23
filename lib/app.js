/**
 * app file
 */
(function (Kernel, Storage, Sandbox) {
    var modules = Storage.modules
      , registered = Storage.registered;

    /**
     * @class App
     * @param {Object} config
     */
    function App(config) {};

    App.prototype = {
        constructor: App,
        toString: function () {
            return '[object App]';
        },
        register: function (name) {
            if (!registered.hasOwnProperty(name)) {
                registered[name] = modules[name];
            }
        },
        start: function (name) {
            if (registered.hasOwnProperty(name)) {
                var mod = registered[name];
                if (!mod.started) {
                    mod.fn(mod.SDB || new Sandbox(this));
                    mod._init();
                }
            }
        },
        stop: function (name) {
            if (registered.hasOwnProperty(name)) {
                var mod = registered[name];
                if (mod.started) {
                    mod._destroy();
                }
            }
        },
        startAll: function (names) {
            for (var k in registered) {
                this.start(k);
            }
        },
        stopAll: function (names) {
            for (var k in registered) {
                this.stop(k);
            }
        }
    };

    Kernel.App = App;
})(Fea.Kernel, Fea.Kernel.Storage, Fea.Kernel.Sandbox);
