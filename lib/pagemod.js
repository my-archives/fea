(function (Fea) {

    function PageMod(config) {
        Fea.PageBox.call(this, config);
    }

    PageMod.prototype = {
        constructor: PageMod,
        toString: function () {
            return '[object PageMod]';
        }
    };

    Fea.extend(PageMod.prototype, Fea.PageBox.prototype);

    Fea.PageMod = PageMod;

})(Fea);
