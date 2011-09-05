/**
 * sandbox file
 */
(function (Kernel, EventTarget, guid) {

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

        Global: Sandbox.Global ? Sandbox.Global : (Sandbox.Global = new EventTarget()),

        _init: function (APP) {
            this.id = guid('S');
            this.APP = APP;
            EventTarget.call(this);
        }
    };

    for (var k in EventTarget.prototype) {
        Sandbox.prototype[k] = EventTarget.prototype[k];
    }

    Kernel.Sandbox = Sandbox;

})(Fea.Kernel, Fea.Eventx.EventTarget, Fea.Utils.guid);
