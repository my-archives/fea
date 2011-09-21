/**
 * utils file
 */
(function (Fea) {
    var n = 0;
    var Utils = {};

    // Empty function
    Utils.NOOP = function () {};

    // Generate unique ID
    Utils.guid = function (prefix) {
        prefix = prefix || 'F';
        return prefix + (n++);
    };

    // extend Object/Class
    Fea.extend = Utils.extend = function (target, source) {
        var k;
        for (k in source) {
            target[k] = source[k];
        }
        return target;
    };

    Fea.Utils = Utils;
})(Fea);
