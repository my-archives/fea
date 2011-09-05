/**
 * app file
 */
(function (Kernel, Storage, Sandbox, Module, Utils) {
    var modules = Storage.modules,
        registered = Storage.registered,
        NOOP = Utils.NOOP,
        hasOwn = Object.prototype.hasOwnProperty,
        TOSTRING = Object.prototype.toString;

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

        register: function (name, fn, infos) {
            modules[name] = new Module(name, fn || NOOP, infos);
            registered[name] = modules[name];
            return this;
        },

        start: function (name, callback) {
            if (!hasOwn.call(registered, name)) {
                throw new Error('The ' + name + ' module is not registered');
            }

            var mod = registered[name];
            if (!mod.started) {
                mod.fn(mod.SDB || new Sandbox(this));
                mod._init(callback || NOOP);
            }
            return this;
        },

        startAll: function (names) {
            var k;
            if (names && TOSTRING.call(names) === '[object Array]') {
                for (k = 0; hasOwn.call(registered, names[k]) && this.start(names[k]); k++) {}
            } else {
                for (k in registered) {
                    this.start(k);
                }
            }
            return this;
        }
    };

    Kernel.App = App;
})(Fea.Kernel, Fea.Kernel.Storage, Fea.Kernel.Sandbox, Fea.Kernel.Module, Fea.Utils);
