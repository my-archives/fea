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

    Fea.Utils = Utils;
})(Fea);
