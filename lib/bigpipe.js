/**
 * bigpipe
 */
(function (Fea) {
    var Pagelet = Fea.Pagelet;

    function BigPipe() {
        this.pagelets = {};
    }

    BigPipe.prototype = {
        onArrive: function (data) {
            if (!(data.id in this.pagelets)) {
                this.pagelets[data.id] = new Pagelet(data);
            }
        }
    };

    Fea.BigPipe = BigPipe;

})(Fea);
