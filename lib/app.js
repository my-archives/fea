/**
 * app file
 */
(function (Kernel, Storage, Sandbox, Module) {
    var modules = Storage.modules,
        registered = Storage.registered,
        hasOwn = Object.prototype.hasOwnProperty.call,
        SLICE = Array.prototype.slice,
        TOSTRING = Object.prototype.toString.call;

    /**
     * @class App
     * @param {Object} config
     */
    function App(config) {}

    App.prototype = {
        constructor: App,
        toString: function () {
            return '[object App]';
        },
        register: function (name) {
            if (!registered.hasOwnProperty(name)) {
                if (modules.hasOwnProperty(name)) {
                    registered[name] = modules[name];
                } else {
                    throw 'The ' + name + ' Module is not defined.';
                }
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
        },
        add: function (name, fn, infos) {
            modules[name] = new Module(name, fn, infos);
            registered[name] = modules[name];
            return this;
        },
        use: function (name, callback) {
            if (!hasOwn(registered, name)) {
                throw new Error('The ' + name + ' module is not registered');
            }

            var mod = registered[name];
            if (!mod.started) {
                mod.fn(mod.SDB || new Sandbox(this));
                callback.call(mod, mod.SDB, mod);
                mod._init();
            }
            return this;
        }
    };

    Kernel.App = App;
})(Fea.Kernel, Fea.Kernel.Storage, Fea.Kernel.Sandbox, Fea.Kernel.Module);
