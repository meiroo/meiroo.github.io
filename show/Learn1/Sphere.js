define(function(require, exports, module) {

    //计算公式如下
    //原点o 球心c 相交点为x
    //则以 o c x 三点可以构成一个三角形 且 ||x-c|| = 半径R
    //根据向量相加原理  （o-c）+ （x-o） = （x-c）
    //o c均已知 设o-c = v  x-o的方向向量已知为d 则设x -o = td
    // v + td = (x-c)
    //(v+td)^2 = (x-c)^2 = R^2  求t
    //v^2 + 2vtd + (td)^2 = R^2  // 注意 v  d 均为向量 其余为值
    //v*v + 2tvd + t*t*d*d - R*R = 0
    //d*d * t*t  + 2vd*t + v*v- R*R = 0; 二元一次方程 (-b +- sqrt(b*b-4ac))/2a  且d*d = 1
    //-vd - sqrt（(vd)*(vd)-(v*v-R*R)）
    //  对应下面代码
    //t =  -DdotV -  sqrt(DdotV*DdotV - a0)  

    var IntersectResult = require("IntersectResult");         

    var Sphere = function(center, radius) { this.center = center; this.radius = radius; };
     
    Sphere.prototype = {
        copy : function() { return new Sphere(this.center.copy(), this.radius.copy()); },
     
        initialize : function() {
            this.sqrRadius = this.radius * this.radius;
        },
     
        intersect : function(ray) {
            var v = ray.origin.subtract(this.center);
            var a0 = v.sqrLength() - this.sqrRadius;
            var DdotV = ray.direction.dot(v);
     
            if (DdotV <= 0) {
                var discr = DdotV * DdotV - a0;
                if (discr >= 0) {
                    var result = new IntersectResult();
                    result.geometry = this;
                    result.distance = -DdotV - Math.sqrt(discr);
                    result.position = ray.getPoint(result.distance);
                    result.normal = result.position.subtract(this.center).normalize();
                    return result;
                }
            }
     
            return IntersectResult.noHit;
        }
    };

    module.exports = Sphere;

});