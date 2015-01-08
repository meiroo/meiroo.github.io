define(function(require, exports, module) {

	var Vector3 = require("Vector3");
	var Color = require("Color");

	var CheckerMaterial = function(scale, reflectiveness) { this.scale = scale; this.reflectiveness = reflectiveness; };
	 
	CheckerMaterial.prototype = {
	    sample : function(ray, position, normal) {
	        return Math.abs((Math.floor(position.x * 0.1) + Math.floor(position.z * this.scale)) % 2) < 1 ? Color.black : Color.white;
	    }
	};

	var PhongMaterial = function(diffuse, specular, shininess, reflectiveness) {
	    this.diffuse = diffuse;
	    this.specular = specular;
	    this.shininess = shininess;
	    this.reflectiveness = reflectiveness;
	};
	 
	var lightDir = new Vector3(1, 1, 1).normalize();
	var lightColor = Color.white;
	 
	PhongMaterial.prototype = {
	    sample: function(ray, position, normal) {
	        var NdotL = normal.dot(lightDir);
	        var H = (lightDir.subtract(ray.direction)).normalize();
	        var NdotH = normal.dot(H);
	        var diffuseTerm = this.diffuse.multiply(Math.max(NdotL, 0));
	        var specularTerm = this.specular.multiply(Math.pow(Math.max(NdotH, 0), this.shininess));
	        return lightColor.modulate(diffuseTerm.add(specularTerm));
	    }
	};

	module.exports = {"Checker":CheckerMaterial,"Phong":PhongMaterial};
	

});