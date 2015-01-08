define(function(require, exports, module) {

	var Vector3 = require("Vector3");
	var IntersectResult = function() {
	    this.geometry = null;
	    this.distance = 0;
	    this.position = Vector3.zero;
	    this.normal = Vector3.zero;
	};

	module.exports = IntersectResult;

});