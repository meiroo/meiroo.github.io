/// <reference path="babylon.js" />
document.addEventListener("DOMContentLoaded", function () {
    onload();
}, false);

var onload = function () {
    var canvas = document.getElementById("renderCanvas");

    var backImg = document.getElementById("back");
    backImg.style.maxWidth = window.innerWidth + "px";
    window.addEventListener("resize", function () {
        backImg.style.maxWidth = window.innerWidth + "px";
    });

    function hideAllUI() {
        var divsToHide = document.querySelectorAll("#renderZone > div");
        for (var i = 0; i < divsToHide.length; ++i) {
            if (divsToHide[i].id == "fps") continue;
            divsToHide[i].className += " hidden";
        }
    }

    function restoreAllUI() {
        var divsToHide = document.querySelectorAll("#renderZone > div");
        for (var i = 0; i < divsToHide.length; ++i) {
            if (divsToHide[i].id == "fps") continue;
            divsToHide[i].className = divsToHide[i].className.replace(" hidden", "");
        }
    }
    // Demos
    var demos = [
        {
            title: "HEART", scene: "Heart", screenshot: "Heart.jpg", doNotUseCDN: true, size: "14 MB", onload: function () {
                //scene.getMeshByName("Labels").setEnabled(false);
                var obj = scene.activeCamera;
                console.log(obj);

            }
        },
        {
            title: "Meiro", scene: "Meiro", screenshot: "Meiro.jpg", doNotUseCDN: true, size: "5 MB", onload: function () {
                //scene.getMeshByName("Labels").setEnabled(false);
            }
        },
        {
            title: "Tower", scene: "Tower", screenshot: "Tower.jpg", doNotUseCDN: true, size: "28 MB", onload: function (scene,engine) {
                //scene.getMeshByName("Labels").setEnabled(false);
                console.log(scene.meshes);
                //scene.gravity = new BABYLON.Vector3(0, 0, 0);
                var camera = scene.activeCamera;
                //camera.applyGravity = false;
                //camera.ellipsoid = new BABYLON.Vector3(500, 100, 500);
                //camera.collisionRadius = new BABYLON.Vector3(2000, 2000, 2000);
                scene.collisionsEnabled = true;
                camera.checkCollisions = true;

                for(var i = 0;i<scene.meshes.length;i++){
                    var mesh = scene.meshes[i];
                    mesh.checkCollisions = true;
                    if(mesh.name === '#Skydome'){
                        mesh.checkCollisions = false;
                    }
                }
            }
        },
        {
            title: "Shop", scene: "Shop", screenshot: "Shop.jpg", doNotUseCDN: true, size: "35 MB", onload: function (scene,engine,canvas) {
                //scene.enablePhysics();
                //createShopScene(scene,engine,canvas);
                scene.ambientColor = new BABYLON.Color3(0.2, 0.2, 0.2);
                var camera = scene.activeCamera;
                //alert(camera.speed);
                camera.speed = 50;
                scene.collisionsEnabled = true;
                camera.checkCollisions = true;

                scene.gravity = new BABYLON.Vector3(0, -90, 0);
                camera.applyGravity = true;
                camera.ellipsoid = new BABYLON.Vector3(800, 800, 800);
                //camera.collisionRadius = new BABYLON.Vector3(2000, 2000, 2000);

                // for(var i = 0;i<scene.meshes.length;i++){
                //     var mesh = scene.meshes[i];
                //     mesh.checkCollisions = true;
                // }
            }
        },
        {
            title: "Him", scene: "Him", screenshot: "Him.png", doNotUseCDN: true, size: "5 MB", onload: function (scene,engine,canvas) {
                //scene.getMeshByName("Labels").setEnabled(false);
                //scene.debugLayer.show(true);
                createScene(scene,engine,canvas);
            }
        },

        ];

    var oculusProcessing = function () {
        var originCamera = scene.activeCamera;
        scene.autoClear = true;

        scene.activeCamera = new BABYLON.OculusCamera("Oculus", originCamera.position, scene);
        scene.activeCamera.minZ = originCamera.minZ;
        scene.activeCamera.maxZ = originCamera.maxZ;
        scene.activeCamera.gravity = originCamera.gravity;
        scene.activeCamera.checkCollisions = false;
        scene.activeCamera.applyGravity = false;
        scene.activeCamera.attachControl(canvas);
        scene.activeCamera.speed = originCamera.speed;
        scene.activeCamera.rotation.copyFrom(originCamera.rotation);

        hideAllUI();
    };

    var oculusProcessingWithCollisionsAndGravity = function () {
        oculusProcessing();
        scene.activeCamera.checkCollisions = true;
        scene.activeCamera.applyGravity = true;
    };

    
    // UI
    var menuPanel = document.getElementById("screen1");
    var items = document.getElementById("items");
    var testItems = document.getElementById("testItems");
    var _3rdItems = document.getElementById("3rdItems");
    var oculusDemosElem = document.getElementById("oculusDemos");
    var renderZone = document.getElementById("renderZone");
    var controlPanel = document.getElementById("controlPanel");
    var cameraPanel = document.getElementById("cameraPanel");
    var wireframe = document.getElementById("wireframe");
    var divFps = document.getElementById("fps");
    var stats = document.getElementById("stats");
    var enableStats = document.getElementById("enableStats");
    var hardwareScalingLevel = document.getElementById("hardwareScalingLevel");
    var collisions = document.getElementById("collisions");
    var postProcess = document.getElementById("postProcess");
    var mirrors = document.getElementById("mirrors");
    var status = document.getElementById("status");
    var fullscreen = document.getElementById("fullscreen");
    var touchCamera = document.getElementById("touchCamera");
    var deviceOrientationCamera = document.getElementById("deviceOrientationCamera");
    var gamepadCamera = document.getElementById("gamepadCamera");
    var virtualJoysticksCamera = document.getElementById("virtualJoysticksCamera");
    var anaglyphCamera = document.getElementById("anaglyphCamera");
    var camerasList = document.getElementById("camerasList");
    var toggleFsaa4 = document.getElementById("toggleFsaa4");
    var toggleFxaa = document.getElementById("toggleFxaa");
    var toggleBandW = document.getElementById("toggleBandW");
    var toggleSepia = document.getElementById("toggleSepia");


    var sceneChecked;

    var itemClick = function (demo) {
        return function () {
            var sceneLocation = "Scenes/";

            // Check support
            if (!BABYLON.Engine.isSupported()) {
                document.getElementById("notSupported").className = "";
            } else {

                restoreAllUI();


                if (demo.url) {
                    window.location = demo.url;
                    return;
                }
                var mode = "";

                if (demo.incremental) {
                    mode = ".incremental";
                } else if (demo.binary) {
                    mode = ".binary";
                }

                /*if(demo.scene === 'Shop'){
                    //demo.onload(scene,engine);
                    //scene.activeCamera.attachControl(canvas);
                    var engine = new BABYLON.Engine(canvas, true);
                    demo.onload(scene,engine,canvas);
                    return;
                }*/


                if(demo.scene === 'Him'){
                    //demo.onload(scene,engine);

                    loadScene(demo.id !== undefined ? demo.id : demo.scene, mode, sceneLocation, function (scene) {
                        BABYLON.StandardMaterial.BumpTextureEnabled = true;
                        if (demo.collisions !== undefined) {
                            scene.collisionsEnabled = demo.collisions;
                        }

                        if (demo.onload) {
                            scene.activeCamera.attachControl(canvas);
                            demo.onload(scene,engine,canvas);
                        }
                    });
                    return;
                }

                loadScene(demo.id !== undefined ? demo.id : demo.scene, mode, sceneLocation, function (scene) {
                    BABYLON.StandardMaterial.BumpTextureEnabled = true;
                    if (demo.collisions !== undefined) {
                        scene.collisionsEnabled = demo.collisions;
                    }

                    if (demo.onload) {
                        demo.onload(scene,engine,canvas);
                    }
                });
            };
        };
    };

    var removeChildren = function (root) {
        while (root.childNodes.length) {
            root.removeChild(root.childNodes[0]);
        }
    };

    var createItem = function (item, root) {
        var span = document.createElement("span");
        var img = document.createElement("img");
        var div = document.createElement("div");
        var label2 = document.createElement("label");

        if (item.big) {
            span.className = "big-item";
            var newImg = document.createElement("img");
            var newText = document.createElement("div");
            newImg.id = "newImg";
            newImg.src = "Assets/SpotLast.png";
            newText.innerHTML = "LAST<br>UPDATE";
            newText.id = "newText";
            span.appendChild(newImg);
            span.appendChild(newText);
        } else {
            span.className = "item";
        }

        img.className = "item-image";
        img.src = "Screenshots/" + item.screenshot;
        span.appendChild(img);

        div.className = "item-text";
        div.innerHTML = item.title;
        span.appendChild(div);

        label2.className = "item-text-right";
        label2.innerHTML = item.size;
        span.appendChild(label2);

        span.onclick = itemClick(item);

        root.appendChild(span);
    };

    // Demos

    removeChildren(items);
    for (var index = 0; index < demos.length; index++) {
        var demo = demos[index];
        createItem(demo, items);
    }

    
    // Go Back
    var goBack = function () {
        if (scene) {
            scene.dispose();
            scene = null;
        }

        if (engine) {
            engine.hideLoadingUI();
        }
        menuPanel.className = "";
        renderZone.className = "movedRight";
    };

    // History
    if (window.onpopstate !== undefined) {
        window.onpopstate = function () {
            goBack();
        };
    }

    // Babylon
    var engine = new BABYLON.Engine(canvas, true);
    var scene;

    var previousPickedMesh;
    var onPointerDown = function (evt, pickResult) {
        if (!panelIsClosed) {
            panelIsClosed = true;
            controlPanel.style.webkitTransform = "translateY(250px)";
            controlPanel.style.transform = "translateY(250px)";
        }

        if (pickResult.hit) {
            if (evt.ctrlKey) {
                status.innerHTML = "Selected object: " + pickResult.pickedMesh.name + "(" + pickResult.pickedPoint.x + "," + pickResult.pickedPoint.y + "," + pickResult.pickedPoint.z + ")";

                if (previousPickedMesh) {
                    previousPickedMesh.showBoundingBox = false;
                }

                pickResult.pickedMesh.showBoundingBox = true;

                // Emit particles
                var particleSystem = new BABYLON.ParticleSystem("particles", 400, scene);
                particleSystem.particleTexture = new BABYLON.Texture("Assets/Flare.png", scene);
                particleSystem.minAngularSpeed = -0.5;
                particleSystem.maxAngularSpeed = 0.5;
                particleSystem.minSize = 0.1;
                particleSystem.maxSize = 0.5;
                particleSystem.minLifeTime = 0.5;
                particleSystem.maxLifeTime = 2.0;
                particleSystem.minEmitPower = 0.5;
                particleSystem.maxEmitPower = 1.0;
                particleSystem.emitter = pickResult.pickedPoint;
                particleSystem.emitRate = 400;
                particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
                particleSystem.minEmitBox = new BABYLON.Vector3(0, 0, 0);
                particleSystem.maxEmitBox = new BABYLON.Vector3(0, 0, 0);
                particleSystem.direction1 = new BABYLON.Vector3(-1, -1, -1);
                particleSystem.direction2 = new BABYLON.Vector3(1, 1, 1);
                particleSystem.color1 = new BABYLON.Color4(1, 0, 0, 1);
                particleSystem.color2 = new BABYLON.Color4(0, 1, 1, 1);
                particleSystem.gravity = new BABYLON.Vector3(0, -5, 0);
                particleSystem.disposeOnStop = true;
                particleSystem.targetStopDuration = 0.1;
                particleSystem.start();

                previousPickedMesh = pickResult.pickedMesh;

            } else {
                var dir = pickResult.pickedPoint.subtract(scene.activeCamera.position);
                dir.normalize();
                pickResult.pickedMesh.applyImpulse(dir.scale(10), pickResult.pickedPoint);
                status.innerHTML = "";
            }
        }
    };

    var restoreUI = function () {
        scene.onPointerDown = onPointerDown;

        sceneChecked = true;
        controlPanel.className = "";
        cameraPanel.className = "";
        divFps.className = "";

        camerasList.options.length = 0;

        for (var index = 0; index < scene.cameras.length; index++) {
            var camera = scene.cameras[index];
            var option = new Option();
            option.text = camera.name;
            option.value = camera;

            if (camera == scene.activeCamera) {
                option.selected = true;
            }

            camerasList.appendChild(option);
        }
    };

    var loadScene = function (name, incremental, sceneLocation, then) {
        sceneChecked = false;

        BABYLON.SceneLoader.ForceFullSceneLoadingForIncremental = true;

        // History
        if (history.pushState) {
            history.pushState({}, name, window.location.pathname + window.location.search);
        }

        // Loading
        var importScene = function () {
            renderZone.removeEventListener("transitionend", importScene);

            // Cleaning
            if (scene) {
                scene.dispose();
                scene = null;
            }

            engine.resize();

            if (typeof name == "number") {
                
            };

            var dlCount = 0;
            BABYLON.SceneLoader.Load(sceneLocation + name + "/", name + incremental + ".babylon", engine, function (newScene) {
                scene = newScene;
                scene.executeWhenReady(function () {
                    canvas.style.opacity = 1;
                    if (scene.activeCamera) {
                        scene.activeCamera.attachControl(canvas);

                        if (newScene.activeCamera.keysUp) {
                            newScene.activeCamera.keysUp.push(90); // Z
                            newScene.activeCamera.keysUp.push(87); // W
                            newScene.activeCamera.keysDown.push(83); // S
                            newScene.activeCamera.keysLeft.push(65); // A
                            newScene.activeCamera.keysLeft.push(81); // Q
                            newScene.activeCamera.keysRight.push(69); // E
                            newScene.activeCamera.keysRight.push(68); // D
                        }
                    }

                    if (then) {
                        then(scene,engine);
                    }

                    // UI
                    restoreUI();

                });

            }, function (evt) {
                if (evt.lengthComputable) {
                    engine.loadingUIText = "Loading, please wait..." + (evt.loaded * 100 / evt.total).toFixed() + "%";
                } else {
                    dlCount = evt.loaded / (1024 * 1024);
                    engine.loadingUIText= "Loading, please wait..." + Math.floor(dlCount * 100.0) / 100.0 + " MB already loaded.";
                }
            });
        };

        menuPanel.className = "movedLeft";
        renderZone.className = "";
        controlPanel.className = "hidden";
        cameraPanel.className = "hidden";
        divFps.className = "hidden";
        canvas.style.opacity = 0;

        renderZone.addEventListener("transitionend", importScene);
    };

    // Render loop
    var renderFunction = function () {
        // Fps
        divFps.innerHTML = BABYLON.Tools.GetFps().toFixed() + " fps";

        // Render scene
        if (scene) {
            if (!sceneChecked) {
                var remaining = scene.getWaitingItemsCount();
                engine.loadingUIText = "Streaming items..." + (remaining ? (remaining + " remaining") : "");
            }

            scene.render();

            // Stats
            if (enableStats.checked) {
                stats.innerHTML = "Total vertices: " + scene.getTotalVertices() + "<br>"
                    + "Active vertices: " + scene.getActiveVertices() + "<br>"
                    + "Active particles: " + scene.getActiveParticles() + "<br><br><br>"
                    + "Frame duration: " + scene.getLastFrameDuration() + " ms<br><br>"
                    + "<i>Evaluate Active Meshes duration:</i> " + scene.getEvaluateActiveMeshesDuration() + " ms<br>"
                    + "<i>Render Targets duration:</i> " + scene.getRenderTargetsDuration() + " ms<br>"
                    + "<i>Particles duration:</i> " + scene.getParticlesDuration() + " ms<br>"
                    + "<i>Sprites duration:</i> " + scene.getSpritesDuration() + " ms<br>"
                    + "<i>Render duration:</i> " + scene.getRenderDuration() + " ms";
            }

            // Streams
            if (scene.useDelayedTextureLoading) {
                var waiting = scene.getWaitingItemsCount();
                if (waiting > 0) {
                    status.innerHTML = "Streaming items..." + waiting + " remaining";
                } else {
                    status.innerHTML = "";
                }
            }
        }
    };

    // Launch render loop
    engine.runRenderLoop(renderFunction);

    // Resize
    window.addEventListener("resize", function () {
        engine.resize();
    });

    // Caps
    var caps = engine.getCaps();
    document.getElementById("extensions").innerHTML =
            "Max textures image units: <b>" + caps.maxTexturesImageUnits + "</b><br>" +
            "Max texture size: <b>" + caps.maxTextureSize + "</b><br>" +
            "Max cubemap texture size: <b>" + caps.maxCubemapTextureSize + "</b><br>" +
            "Max render texture size: <b>" + caps.maxRenderTextureSize + "</b><br>";

    // UI
    var panelIsClosed = true;
    var cameraPanelIsClosed = true;
    var aboutIsClosed = true;
    document.getElementById("clickableTag").addEventListener("click", function () {
        if (panelIsClosed) {
            panelIsClosed = false;
            controlPanel.style.webkitTransform = "translateY(0px)";
            controlPanel.style.transform = "translateY(0px)";
        } else {
            panelIsClosed = true;
            controlPanel.style.webkitTransform = "translateY(250px)";
            controlPanel.style.transform = "translateY(250px)";
        }
    });

    document.getElementById("cameraClickableTag").addEventListener("click", function () {
        if (cameraPanelIsClosed) {
            cameraPanelIsClosed = false;
            cameraPanel.style.webkitTransform = "translateX(0px)";
            cameraPanel.style.transform = "translateX(0px)";
        } else {
            hideCameraPanel();
        }
    });

    document.getElementById("aboutLink").addEventListener("click", function () {
        if (aboutIsClosed) {
            aboutIsClosed = false;
            aboutPanel.style.webkitTransform = "translateX(0px)";
            aboutPanel.style.transform = "translateX(0px)";
        } else {
            aboutIsClosed = true;
            aboutPanel.style.webkitTransform = "translateX(-120%)";
            aboutPanel.style.transform = "translateX(-120%)";
        }
    });

    document.getElementById("notSupported").addEventListener("click", function () {
        document.getElementById("notSupported").className = "hidden";
    });

    document.getElementById("aboutPanel").addEventListener("click", function (evt) {
        evt.cancelBubble = true;
    });

    var hideCameraPanel = function () {
        cameraPanelIsClosed = true;
        cameraPanel.style.webkitTransform = "translateX(17em)";
        cameraPanel.style.transform = "translateX(17em)";
    };

    document.getElementById("menuPanel").addEventListener("click", function (evt) {
        if (!aboutIsClosed) {
            aboutIsClosed = true;
            aboutPanel.style.webkitTransform = "translateX(-120%)";
            aboutPanel.style.transform = "translateX(-120%)";

            hideCameraPanel();
        }
    });

    wireframe.addEventListener("change", function () {
        if (engine) {
            engine.forceWireframe = wireframe.checked;
        }
    });

    enableStats.addEventListener("change", function () {
        stats.className = enableStats.checked ? "" : "hidden";
    });

    fullscreen.addEventListener("click", function () {
        if (engine) {
            engine.switchFullscreen(true);
        }
    });

    var switchCamera = function (camera) {
        if (scene.activeCamera.rotation) {
            camera.rotation = scene.activeCamera.rotation.clone();
        }
        camera.fov = scene.activeCamera.fov;
        camera.minZ = scene.activeCamera.minZ;
        camera.maxZ = scene.activeCamera.maxZ;

        if (scene.activeCamera.ellipsoid) {
            camera.ellipsoid = scene.activeCamera.ellipsoid.clone();
        }
        camera.checkCollisions = scene.activeCamera.checkCollisions;
        camera.applyGravity = scene.activeCamera.applyGravity;

        camera.speed = scene.activeCamera.speed;

        camera.postProcesses = scene.activeCamera.postProcesses;
        scene.activeCamera.postProcesses = [];
        scene.activeCamera.detachControl(canvas);
        if (scene.activeCamera.dispose) scene.activeCamera.dispose();

        scene.activeCamera = camera;

        scene.activeCamera.attachControl(canvas);

        hideCameraPanel();
    };

    touchCamera.addEventListener("click", function () {
        if (!scene) {
            return;
        }

        if (scene.activeCamera instanceof BABYLON.TouchCamera) {
            return;
        }

        var camera = new BABYLON.TouchCamera("touchCamera", scene.activeCamera.position, scene);
        switchCamera(camera);
    });

    gamepadCamera.addEventListener("click", function () {
        if (!scene) {
            return;
        }

        if (scene.activeCamera instanceof BABYLON.GamepadCamera) {
            return;
        }

        var camera = new BABYLON.GamepadCamera("gamepadCamera", scene.activeCamera.position, scene);

        switchCamera(camera);
    });

    virtualJoysticksCamera.addEventListener("click", function () {
        if (!scene) {
            return;
        }

        if (scene.activeCamera instanceof BABYLON.VirtualJoysticksCamera) {
            return;
        }

        var camera = new BABYLON.VirtualJoysticksCamera("virtualJoysticksCamera", scene.activeCamera.position, scene);

        switchCamera(camera);
    });

    anaglyphCamera.addEventListener("click", function () {
        if (!scene) {
            return;
        }

        if (scene.activeCamera instanceof BABYLON.AnaglyphArcRotateCamera) {
            return;
        }

        var camera = new BABYLON.AnaglyphFreeCamera("anaglyphCamera", scene.activeCamera.position, 0.2, scene);
        //var camera = new BABYLON.AnaglyphArcRotateCamera("anaglyphCamera", 0, Math.PI / 2, 20, BABYLON.Vector3.Zero(), 0.2, scene);

        switchCamera(camera);
    });

    deviceOrientationCamera.addEventListener("click", function () {
        if (!scene) {
            return;
        }

        if (scene.activeCamera instanceof BABYLON.DeviceOrientationCamera) {
            return;
        }

        var camera = new BABYLON.DeviceOrientationCamera("deviceOrientationCamera", scene.activeCamera.position, scene);

        switchCamera(camera);
    });

    hardwareScalingLevel.addEventListener("change", function () {
        if (!engine)
            return;
        engine.setHardwareScalingLevel(hardwareScalingLevel.selectedIndex + 1);
    });

    collisions.addEventListener("change", function () {
        if (scene) {
            scene.collisionsEnabled = collisions.checked;
        }
    });

    postProcess.addEventListener("change", function () {
        if (scene) {
            scene.postProcessesEnabled = postProcess.checked;
        }
    });

    mirrors.addEventListener("change", function () {
        if (scene) {
            scene.renderTargetsEnabled = mirrors.checked;
        }
    });

    toggleBandW.addEventListener("click", function () {
        if (scene && scene.activeCamera) {
            if (scene.activeCamera.__bandw_cookie) {
                scene.activeCamera.__bandw_cookie.dispose(),
                scene.activeCamera.__bandw_cookie = null;
                toggleBandW.className = "smallButtonControlPanel";
            } else {
                scene.activeCamera.__bandw_cookie = new BABYLON.BlackAndWhitePostProcess("bandw", 1.0, scene.activeCamera);
                toggleBandW.className = "smallButtonControlPanel pushed";
            }
        }
    });

    toggleFxaa.addEventListener("click", function () {
        if (scene && scene.activeCamera) {
            if (scene.activeCamera.__fxaa_cookie) {
                scene.activeCamera.__fxaa_cookie.dispose(),
                scene.activeCamera.__fxaa_cookie = null;
                toggleFxaa.className = "smallButtonControlPanel";
            } else {
                scene.activeCamera.__fxaa_cookie = new BABYLON.FxaaPostProcess("fxaa", 1.0, scene.activeCamera);
                toggleFxaa.className = "smallButtonControlPanel pushed";
            }
        }
    });

    toggleFsaa4.addEventListener("click", function () {
        if (scene && scene.activeCamera) {
            if (scene.activeCamera.__fsaa_cookie) {
                scene.activeCamera.__fsaa_cookie.dispose(),
                scene.activeCamera.__fsaa_cookie = null;
                toggleFsaa4.className = "smallButtonControlPanel";
            } else {
                var fx = new BABYLON.PassPostProcess("fsaa", 2.0, scene.activeCamera);
                fx.renderTargetSamplingMode = BABYLON.Texture.BILINEAR_SAMPLINGMODE;
                scene.activeCamera.__fsaa_cookie = fx;
                toggleFsaa4.className = "smallButtonControlPanel pushed";
            }
        }
    });

    toggleSepia.addEventListener("click", function () {
        if (scene && scene.activeCamera) {
            if (scene.activeCamera.__sepia_cookie) {
                scene.activeCamera.__sepia_cookie.dispose(),
                scene.activeCamera.__sepia_cookie = null;
                toggleSepia.className = "smallButtonControlPanel";
            } else {
                var sepiaKernelMatrix = BABYLON.Matrix.FromValues(
                    0.393, 0.349, 0.272, 0,
                    0.769, 0.686, 0.534, 0,
                    0.189, 0.168, 0.131, 0,
                    0, 0, 0, 0
                );
                scene.activeCamera.__sepia_cookie = new BABYLON.FilterPostProcess("Sepia", sepiaKernelMatrix, 1.0, scene.activeCamera);
                toggleSepia.className = "smallButtonControlPanel pushed";
            }
        }
    });


    // Cameras
    camerasList.addEventListener("change", function (ev) {
        scene.activeCamera.detachControl(canvas);
        scene.activeCamera = scene.cameras[camerasList.selectedIndex];
        scene.activeCamera.attachControl(canvas);
    });

    // Query string
    var queryString = window.location.search;

    if (queryString) {
        var query = queryString.replace("?", "");
        var index = parseInt(query);

        if (!isNaN(index)) {
            if (index >= demos.length) {
                itemClick(tests[index - demos.length])();
            } else {
                itemClick(demos[index])();
            }
        } else {
            for (index = 0; index < demos.length; index++) {
                if (demos[index].anchor && demos[index].anchor === query || demos[index].title === query) {
                    itemClick(demos[index])();
                    return;
                }
            }
            for (index = 0; index < tests.length; index++) {
                if (tests[index].anchor && tests[index].anchor === query || tests[index].title === query) {
                    itemClick(tests[index])();
                    return;
                }
            }
            for (index = 0; index < oculusTests.length; index++) {
                if (oculusTests[index].anchor && oculusTests[index].anchor === query || oculusTests[index].title === query) {
                    itemClick(oculusTests[index])();
                    return;
                }
            }
        }

    }

};