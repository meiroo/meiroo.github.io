define(function(require, exports, module) {

    var IntersectResult = require("IntersectResult");

    var Union = function(geometries) { this.geometries = geometries; };

    Union.prototype = {
        initialize: function() {
            for (var i in this.geometries)
                this.geometries[i].initialize();
        },
        
        intersect: function(ray) {
            var minDistance = Infinity;
            var minResult = IntersectResult.noHit;
            for (var i in this.geometries) {
                var result = this.geometries[i].intersect(ray);
                if (result && result.geometry && result.distance < minDistance) {
                    minDistance = result.distance;
                    minResult = result;
                }
            }
            return minResult;
        }
    };

    module.exports = Union;
    

});
