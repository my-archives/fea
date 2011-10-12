/**
 * bigpipe
 */
(function (Fea) {
    var Pagelet = Fea.Pagelet;

    function BigPipe(options) {
        this.options = options || {};
        this.pagelets = {};
    }

    BigPipe.prototype = {
        onArrive: function (data) {
            if (!(data.id in this.pagelets)) {

                if (!('charset' in data)) {
                    data.charset = this.options.encoding;
                }

                this.pagelets[data.id] = new Pagelet(data);
            }
        }
    };

    Fea.BigPipe = BigPipe;

})(Fea);
