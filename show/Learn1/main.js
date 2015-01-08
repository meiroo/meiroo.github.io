require.config({
    baseUrl: '',
    paths: {
        Vector3: "./Learn1/Vector3",
        Ray3:"./Learn1/Ray3",
        Sphere:"./Learn1/Sphere",
        PerspectiveCamera:"./Learn1/PerspectiveCamera",
        IntersectResult:"./Learn1/IntersectResult",
        Plane:"./Learn1/Plane",
        Union:"./Learn1/Union",
        Material:"./Learn1/Material",
        Color:"./Learn1/Color"
    }
});


function rayTrace(canvas, scene, camera, maxDepth) {
    // 从canvas取得imgdata和pixels，跟之前的代码一样
    var ctx = canvas.getContext("2d");
    var w = canvas.width;
    var h = canvas.height;
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0,0,w,h);
    var imgdata = ctx.getImageData(0,0,w,h);
    var pixels = imgdata.data;

 
    scene.initialize();
    camera.initialize();
 
    var i = 0;
    for (var y = 0; y < h; y++) {
        var sy = 1 - y / h;
        for (var x = 0; x < w; x++) {
            var sx = x / w;            
            var ray = camera.generateRay(sx, sy);
            var result = scene.intersect(ray);
            if (result && result.geometry) {
                // var depth = 255 - Math.min((result.distance / maxDepth) * 255, 255);
                // pixels[i    ] = depth;
                // pixels[i + 1] = depth;
                // pixels[i + 2] = depth;
                // pixels[i + 3] = 255;
                var color = result.geometry.material.sample(ray, result.position, result.normal);
                pixels[i] = color.r * 255;
                pixels[i + 1] = color.g * 255;
                pixels[i + 2] = color.b * 255;
                pixels[i + 3] = 255;
            }
            i += 4;
        }
    }
 
    ctx.putImageData(imgdata, 0, 0);
}

require(["Vector3","Color","PerspectiveCamera","Sphere","Plane","Union","Material"],function(Vector3,Color,PerspectiveCamera,Sphere,Plane,Union,Material){
    var canvas = document.getElementById("canvas");
    var plane = new Plane(new Vector3(0, 1, 0), 0);
    var sphere1 = new Sphere(new Vector3(-10, 10, -10), 10);
    var sphere2 = new Sphere(new Vector3(10, 10, -10), 10);
    plane.material = new Material.Checker(0.1);
    sphere1.material = new Material.Phong(Color.red, Color.white, 16);
    sphere2.material = new Material.Phong(Color.blue, Color.white, 16);
    rayTrace
    (
        canvas
        ,new Union([plane, sphere1, sphere2])
        ,new PerspectiveCamera(new Vector3(0, 5, 15), new Vector3(0, 0, -1), new Vector3(0, 1, 0), 90)

    );
});

