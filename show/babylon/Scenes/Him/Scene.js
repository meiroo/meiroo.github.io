var PlayAnnimation = false, PlayerCharger = false, skybox, scene, sceneCharger = false, meshPlayer, meshOctree, skeletonsPlayer = [], cameraArcRotative = [], octree,
    keys={letft:0,right:0,arriere:0,avancer:0}, VitessePerso = 8, forward, backwards;
var scene = null;
var engine = null;
function animatActor()
{	
	if(PlayAnnimation === false && (keys.avancer == 1 || keys.arriere == 1)) {
		totalFrame = skeletonsPlayer[0]._scene._activeSkeletons.data.length;	
		start = 0;
		end = 100;
		VitesseAnim = parseFloat(100 / 100);
		scene.beginAnimation(skeletonsPlayer[0], (100*start)/totalFrame, (100*end)/totalFrame, true, VitesseAnim);
		meshPlayer.position = new BABYLON.Vector3(parseFloat(meshPlayer.position.x), parseFloat(meshPlayer.position.y), parseFloat(meshPlayer.position.z));
		PlayAnnimation = true;
	}
	if (keys.avancer == 1){	// En avant		
		forward = new BABYLON.Vector3(parseFloat(Math.sin(parseFloat(meshPlayer.rotation.y))) / VitessePerso, 0.5, parseFloat(Math.cos(parseFloat(meshPlayer.rotation.y))) / VitessePerso);
		forward = forward.negate();
		meshPlayer.moveWithCollisions(forward);
	}	
	else if (keys.arriere == 1) { // En arriere	
		backwards = new BABYLON.Vector3(parseFloat(Math.sin(parseFloat(meshPlayer.rotation.y))) / VitessePerso, -0.5, parseFloat(Math.cos(parseFloat(meshPlayer.rotation.y))) / VitessePerso);		
		meshPlayer.moveWithCollisions(backwards);
	}	
}
// Cameras rotative qui suit l'acteur joueur
function CameraFollowActor()
{		
	meshPlayer.rotation.y = -4.69 - cameraArcRotative[0].alpha;			
	cameraArcRotative[0].target.x = parseFloat(meshPlayer.position.x);		
	cameraArcRotative[0].target.z = parseFloat(meshPlayer.position.z);		
}

function createScene(s,e,c) {
	//alert(engine);
   	engine = e;
	//engine.displayLoadingUI();
	scene = new BABYLON.Scene(engine);	
	//Active gravity and collision
	scene.gravity = new BABYLON.Vector3(0, -0.5, 0);	
    scene.collisionsEnabled = true;	
   
    // Light directional
	var LightDirectional = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-2, -4, 2), scene);    
	LightDirectional.diffuse = new BABYLON.Color3(1, 1, 1);	
	LightDirectional.specular = new BABYLON.Color3(0, 0, 0);
	LightDirectional.position = new BABYLON.Vector3(250, 400, 0);
    LightDirectional.intensity = 1.8;
	
	// Camera 3 eme personne
	cameraArcRotative[0] = new BABYLON.ArcRotateCamera("CameraBaseRotate", -Math.PI/2, Math.PI/2.2, 12, new BABYLON.Vector3(0, 5.0, 0), scene);	
	cameraArcRotative[0].wheelPrecision = 15;	
	cameraArcRotative[0].lowerRadiusLimit = 2;
	cameraArcRotative[0].upperRadiusLimit = 22;
	cameraArcRotative[0].minZ = 0;
	cameraArcRotative[0].minX = 4096;
	//scene.activeCamera = cameraArcRotative[0];	
	scene.activeCamera.attachControl(c);

	// Terrain
	var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "Scenes/Him/map.jpg", 100, 100, 100, 0, 12, scene, true);   
    var groundMaterial = new BABYLON.StandardMaterial("groundMat", scene);
	groundMaterial.diffuseTexture = new BABYLON.Texture("Scenes/Him/terre.png", scene);
	groundMaterial.diffuseTexture.uScale = 5.0;
	groundMaterial.diffuseTexture.vScale = 5.0;
	ground.material = groundMaterial;	
	ground.checkCollisions = true;
	
	// Wall
	var Mur = BABYLON.Mesh.CreateBox("Mur", 1, scene);	
	Mur.scaling = new BABYLON.Vector3(15, 6, 1);
	Mur.position.y = 3.1;
	Mur.position.z = 20;
	Mur.checkCollisions = true;	
	
	// Character import
	BABYLON.SceneLoader.ImportMesh("", "Scenes/Him/", "Him.babylon", scene, function (newMeshes, particleSystems, skeletons)
	{
		meshPlayer = newMeshes[0];
		meshOctree = newMeshes;
		meshPlayer.scaling= new BABYLON.Vector3(0.05, 0.05, 0.05);
		meshPlayer.position = new BABYLON.Vector3(-5.168, 1.392, -7.463);
		meshPlayer.rotation = new BABYLON.Vector3(0, 3.9, 0);
		cameraArcRotative[0].alpha = -parseFloat(meshPlayer.rotation.y) + 4.69;
		
		skeletonsPlayer[0] = skeletons[0];
		skeletonsPlayer.push(skeletons[0]);
		var totalFrame = skeletons[0]._scene._activeSkeletons.data.length;	
		var start = 0;
		var end = 100;
		var vitesse = 100 / 100;
		scene.beginAnimation(skeletons[0], 100*start/totalFrame, 100*end/totalFrame, true, vitesse);
		
		meshPlayer.checkCollisions = true;
		meshPlayer.ellipsoid = new BABYLON.Vector3(0.5, 1, 0.5);
		meshPlayer.ellipsoidOffset = new BABYLON.Vector3(0, 2, 0);
		meshPlayer.applyGravity = true;		
	});		
	
	scene.registerBeforeRender(function(){			
		if(scene.isReady() && meshPlayer) {	
			if(sceneCharger == false) {				
				engine.hideLoadingUI();
				sceneCharger = true;
			}
			animatActor();			
		}
	});
	
	engine.runRenderLoop(function () {
        scene.render();		
		if(scene.isReady() && meshPlayer){				
			
			CameraFollowActor();
			
			if(PlayerCharger == false) {
				scene.stopAnimation(skeletonsPlayer[0]);
				PlayerCharger = true;
				
				octree = scene.createOrUpdateSelectionOctree();
				for(var i = 0; i < meshOctree.length; i++) {
					octree.dynamicContent.push(meshOctree[i]);
				}
			}
		}		
    });	
	
    window.addEventListener("resize", function () { engine.resize();});	
	window.addEventListener("keydown", onKeyDown, false);
	window.addEventListener("keyup", onKeyUp, false);
}

// Gestion du clavier quand on presse une touche
function onKeyDown(event) 
{    
	//alert('down');
	var touche = event.keyCode;
	var ch = String.fromCharCode(touche);
	switch (touche) {
		case 16: // MAJ Le perso cours
			VitessePerso = 2.5;
		break;
		case 32: // ESPACE le perso saute			
			keys.saut=1;
		break;
	}		
	
	// Clavier AZERTY
	if (ch == "W") keys.avancer=1;
	if (ch == "A") keys.left=1;	
	if (ch == "S") keys.arriere=1;
	if (ch == "D") keys.right=1;
}

// Gestion du clavier quand on relache une touche
function onKeyUp(event)
{    
	var touche = event.keyCode;
	var ch = String.fromCharCode(touche);
	switch (touche) {
		case 16: // MAJ Le perso marche
			VitessePerso = 5;
		break;
		case 32: // ESPACE le perso ne saute plus
			keys.saut=0;			 
		break;
	}	
	
	// Clavier AZERTY
	if (ch == "W") keys.avancer=0;
	if (ch == "A") keys.left=0;	
	if (ch == "S") keys.arriere=0;
	if (ch == "D") keys.right=0;
	
	PlayAnnimation = false;
	scene.stopAnimation(skeletonsPlayer[0]);
}