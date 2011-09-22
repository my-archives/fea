/**
 * widget
 */
(function (Fea) {

    function Widget(config) {
        Fea.PageBox.call(this, config);
    }

    Widget.prototype = {
        constructor: Widget,
        toString: function () {
            return '[object Widget]';
        }
    };

    Fea.extend(Widget.prototype, Fea.PageBox.prototype);

    Fea.Widget = Widget;

})(Fea);
