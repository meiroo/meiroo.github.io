define(function(require, exports, module) {
    var Ray3 = require("Ray3");

    //透视投影获取Ray
    //需要提供的参数
    //eye,front,up ,fov
    //front叉乘refUp得到right
    //fovScale为前切面的相交长度 单位为1
    //generateRay: 范围为0到1 00左下角 11右上角
    //计算r和u 为按照最大为fovscale等比例计算横向和竖向 向量
    //最后前向量+ 横向 竖向 计算为最终向量

    var PerspectiveCamera = function(eye, front, up, fov) { this.eye = eye; this.front = front; this.refUp = up; this.fov = fov; };
     
    PerspectiveCamera.prototype = {
        initialize : function() {
            this.right = this.front.cross(this.refUp);
            this.up = this.right.cross(this.front);
            this.fovScale = Math.tan(this.fov * 0.5 * Math.PI / 180) * 2;
        },
     
        generateRay : function(x, y) {
            var r = this.right.multiply((x - 0.5) * this.fovScale);
            var u = this.up.multiply((y - 0.5) * this.fovScale);
            return new Ray3(this.eye, this.front.add(r).add(u).normalize());
        }
    };
    module.exports = PerspectiveCamera;

});