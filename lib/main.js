
//set window size for object. change here and at bottom of page
var width = window.innerWidth;
var height = window.innerHeight;

function init() {
	var scene = new THREE.Scene();
	var clock = new THREE.Clock();
	
	// camera
	var camera = new THREE.PerspectiveCamera(
		45, // field of view
		width / height, // aspect ratio
		1, // near clipping plane
		1000 // far clipping plane
	);
	camera.position.z = 30;
	camera.position.x = 0;
	camera.position.y = 0;
	camera.lookAt(new THREE.Vector3(0, 0, 0));
	
	

//particle creators
	var cChangeSystem = new particleGenerator(849326/10, 5, 'rgb(0, 255, 0)');
	var conflictSystem = new particleGenerator(28394/10, 5, 'rgb(255, 0, 0)');
	var fragilitySystem = new particleGenerator(1008/10, 5, 'rgb(0, 100, 255)');
	var instabilitySystem = new particleGenerator(6271/10, 5, 'rgb(255, 255, 0)');
	var riskSystem = new particleGenerator(98397/10, 5, 'rgb(255, 0, 255)');
	var survivalSystem = new particleGenerator(14575/10, 5, 'rgb(0, 255, 255)');
	var violenceSystem = new particleGenerator(44486/10, 5, 'rgb(255, 100, 0)');
	var vulnerabilitySystem = new particleGenerator(6155/10, 5, 'rgb(255, 0, 100)');
	var warfareSystem = new particleGenerator(3718/10, 5, 'rgb(100, 0, 255)');
		
	cChangeSystem.name = 'cChangeSystem';
	conflictSystem.name = 'conflictSystem';
	fragilitySystem.name = 'fragilitySystem';
	instabilitySystem.name = 'instabilitySystem';
	riskSystem.name = 'riskSystem';
	survivalSystem.name = 'survivalSystem';
	violenceSystem.name = 'violenceSystem';
	vulnerabilitySystem.name = 'vulnerabilitySystem';
	warfareSystem.name = 'warfareSystem';
	scene.add(cChangeSystem);
	scene.add(conflictSystem);
	scene.add(fragilitySystem);
	scene.add(instabilitySystem);
	scene.add(riskSystem);
	scene.add(survivalSystem);
	scene.add(violenceSystem);
	scene.add(vulnerabilitySystem);
	scene.add(warfareSystem);
	document.getElementById("Climate Change").addEventListener("click", function(){
		cChangeSystem.visible = !cChangeSystem.visible;
	}
	);
	document.getElementById("Conflict").addEventListener("click", function(){
		conflictSystem.visible = !conflictSystem.visible;
	}
	);
	document.getElementById("Fragility").addEventListener("click", function(){
		fragilitySystem.visible = !fragilitySystem.visible;
	}
	);
	document.getElementById("Instability").addEventListener("click", function(){
		instabilitySystem.visible = !instabilitySystem.visible;
	}
	);
	document.getElementById("Risk").addEventListener("click", function(){
		riskSystem.visible = !riskSystem.visible;
	}
	);
	document.getElementById("Violence").addEventListener("click", function(){
		violenceSystem.visible = !violenceSystem.visible;
	}
	);
	document.getElementById("Survival").addEventListener("click", function(){
		survivalSystem.visible = !survivalSystem.visible;
	}
	);
	document.getElementById("Vulnerability").addEventListener("click", function(){
		vulnerabilitySystem.visible = !vulnerabilitySystem.visible;
	}
	);
	document.getElementById("Warfare").addEventListener("click", function(){
		warfareSystem.visible = !warfareSystem.visible;
	}
	);

	// renderer
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(width, height);
	renderer.shadowMap.enabled = true;
	renderer.setClearColor('rgb(0, 0, 0)');

	var controls = new THREE.OrbitControls( camera, renderer.domElement );

	document.getElementById('webgl').appendChild(renderer.domElement);

	update(renderer, scene, camera, controls, clock);

	return scene;
}


//particle generator function
function particleGenerator(count, radius, color){
	var particleGeo = new THREE.Geometry;
	var particleCount = count;
	var r = radius;
	var a;
	var b;
	for (var i = 0; i < particleCount; i++) {
		a = Math.random()*360;
		b = Math.random()*360;
		
		var posX = r * Math.sin(a*Math.PI/180) * Math.cos(b*Math.PI/180);
		var posY = r * Math.sin(a*Math.PI/180) * Math.sin(b*Math.PI/180);
		var posZ = r * Math.cos(a*Math.PI/180);
		var particle = new THREE.Vector3(posX, posY, posZ);
		
		particleGeo.vertices.push(particle);
	}
	
	var particleMat = new THREE.PointsMaterial({
		color: color,
		size: 0.1,
		map: new THREE.TextureLoader().load('/assets/textures/particle.jpg'),
		transparent: true,
		blending: THREE.AdditiveBlending,
		depthWrite: false,
	});
	
	
	var particleSystem = new THREE.Points(
		particleGeo,
		particleMat
	);
	
	return particleSystem;
	
}

//movement
function particleMover(x, y, z, time) {
	var bounds = 10;
	x += (noise.simplex3(x, y, time/Math.PI))/200;
	y += (noise.simplex3(x, time/Math.PI, z))/200;
	z += (noise.simplex3(time/Math.PI, y, z))/200;
	
	if(x > bounds) {
		x = bounds;
	}
	if(x < -bounds) {
		x = -bounds;
	}
	
	if(y > bounds) {
		y = bounds;
	}
	if(y < -bounds) {
		y = -bounds;
	}
	if(z > bounds) {
		z = bounds;
	}
	if(z < -bounds) {
		z = -bounds;
	}
	
	var particles = [x, y, z];
	return particles;
}

//update
function update(renderer, scene, camera, controls, clock) {
	controls.update();
	renderer.render(scene, camera);
	
	var time = clock.getElapsedTime();
	
	var cChangeSystem = scene.getObjectByName('cChangeSystem');
	var conflictSystem = scene.getObjectByName('conflictSystem');
	var fragilitySystem = scene.getObjectByName('fragilitySystem');
	var instabilitySystem = scene.getObjectByName('instabilitySystem');
	var riskSystem = scene.getObjectByName('riskSystem');
	var survivalSystem = scene.getObjectByName('survivalSystem');
	var violenceSystem = scene.getObjectByName('violenceSystem');
	var vulnerabilitySystem = scene.getObjectByName('vulnerabilitySystem');
	var warfareSystem = scene.getObjectByName('warfareSystem');
	
	cChangeSystem.geometry.vertices.forEach(function(particle) {
		
		var ccMover = new particleMover(particle.x, particle.y, particle.z, time);
		
		particle.x = ccMover[0];
		particle.y = ccMover[1];
		particle.z = ccMover[2];
		
		
	})
	conflictSystem.geometry.vertices.forEach(function(particle) {
		
		var ccMover = new particleMover(particle.x, particle.y, particle.z, time);
		
		particle.x = ccMover[0];
		particle.y = ccMover[1];
		particle.z = ccMover[2];
		
		
	})
	fragilitySystem.geometry.vertices.forEach(function(particle) {
		
		var ccMover = new particleMover(particle.x, particle.y, particle.z, time);
		
		particle.x = ccMover[0];
		particle.y = ccMover[1];
		particle.z = ccMover[2];
		
		
	})
	instabilitySystem.geometry.vertices.forEach(function(particle) {
		
		var ccMover = new particleMover(particle.x, particle.y, particle.z, time);
		
		particle.x = ccMover[0];
		particle.y = ccMover[1];
		particle.z = ccMover[2];
		
		
	})
	riskSystem.geometry.vertices.forEach(function(particle) {
		
		var ccMover = new particleMover(particle.x, particle.y, particle.z, time);
		
		particle.x = ccMover[0];
		particle.y = ccMover[1];
		particle.z = ccMover[2];
		
		
	})
	survivalSystem.geometry.vertices.forEach(function(particle) {
		
		var ccMover = new particleMover(particle.x, particle.y, particle.z, time);
		
		particle.x = ccMover[0];
		particle.y = ccMover[1];
		particle.z = ccMover[2];
		
		
	})
	violenceSystem.geometry.vertices.forEach(function(particle) {
		
		var ccMover = new particleMover(particle.x, particle.y, particle.z, time);
		
		particle.x = ccMover[0];
		particle.y = ccMover[1];
		particle.z = ccMover[2];
		
		
	})
	vulnerabilitySystem.geometry.vertices.forEach(function(particle) {
		
		var ccMover = new particleMover(particle.x, particle.y, particle.z, time);
		
		particle.x = ccMover[0];
		particle.y = ccMover[1];
		particle.z = ccMover[2];
		
		
	})
	warfareSystem.geometry.vertices.forEach(function(particle) {
		
		var ccMover = new particleMover(particle.x, particle.y, particle.z, time);
		
		particle.x = ccMover[0];
		particle.y = ccMover[1];
		particle.z = ccMover[2];
		
		
	})
	
	cChangeSystem.geometry.verticesNeedUpdate = true;
	conflictSystem.geometry.verticesNeedUpdate = true;
	fragilitySystem.geometry.verticesNeedUpdate = true;
	instabilitySystem.geometry.verticesNeedUpdate = true;
	riskSystem.geometry.verticesNeedUpdate = true;
	survivalSystem.geometry.verticesNeedUpdate = true;
	violenceSystem.geometry.verticesNeedUpdate = true;
	vulnerabilitySystem.geometry.verticesNeedUpdate = true;
	warfareSystem.geometry.verticesNeedUpdate = true;
	
	window.addEventListener( 'resize', onWindowResize, false );
	
	requestAnimationFrame(function() {
		update(renderer, scene, camera, controls, clock);
});
	
	//change window size here as well
	width = window.innerWidth;
	height = window.innerHeight;
	
function onWindowResize(){

		camera.aspect = width / height;
		camera.updateProjectionMatrix();

		renderer.setSize( width, height);

	}
}

var scene = init();
