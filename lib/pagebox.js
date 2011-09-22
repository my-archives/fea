(function (Fea) {

    function PageBox(config) {
        this.config = config || {}; 
        this.init(config);
    }

    PageBox.prototype = {

        init: function (config) {
            this._applyConfig(config || {});
            this.initStorage();
        },

        _applyConfig: function (config) {
            for (var k in config) {
                if (!(k in this)) {
                    this[k] = config[k];
                }
            }
        },

        destory: function () {},

        render: function () {
            this.renderUI();
            this.bindUI();
        },

        renderUI: function () {},

        bindUI: function () {}

    };

    Fea.extend(PageBox.prototype, Fea.Eventx.EventTarget.prototype);

    Fea.PageBox = PageBox;

})(Fea);
