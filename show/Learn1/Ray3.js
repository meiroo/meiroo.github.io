define(function(require, exports, module) {
	var Ray3 = function(origin, direction) { this.origin = origin; this.direction = direction; }
	 
	Ray3.prototype = {
	    getPoint : function(t) { return this.origin.add(this.direction.multiply(t)); }
	};

	module.exports = Ray3;
});