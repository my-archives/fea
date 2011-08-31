/**
 * sandbox file
 */
(function (Kernel, EventEngine) {
    var sguid = 0;

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

    Sandbox.prototype = {
        constructor: Sandbox,
        toString: function () {
            return '[object Sandbox]';
        },
        Global: Sandbox.Global ? Sandbox.Global : (Sandbox.Global = new EventEngine()),

        _init: function (APP) {
            this.id = ++sguid;
            this.APP = APP;
            EventEngine.call(this);
        }
    };

    for (var k in EventEngine.prototype) {
        Sandbox.prototype[k] = EventEngine.prototype[k];
    }

    Kernel.Sandbox = Sandbox;

})(Fea.Kernel, Fea.Aop.EventEngine);
