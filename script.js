let scene, camera, renderer, controls, moon, directionalLight, ambientLight, starfield;

const moonTerrains = {
  "mare tranquillitatis": {
    info: "Mare Tranquillitatis is a lunar mare located within the Tranquillitatis basin.",
    img: "mare-tranquillitatis.jpg",
  },
  "copernicus crater": {
    info: "Copernicus is a prominent lunar impact crater located in eastern Oceanus Procellarum.",
    img: "copernicus crater.jpg",
  },
  "apollo 11": {
    info: "The Apollo 11 landing site is where humans first landed on the Moon on July 20, 1969.",
    img: "apollo 11.jpg",
  
  },
  "apollo 12": {
    info: "The Apollo 12 landing site is located near the Oceanus Procellarum and was visited in November 1969.",
    img: "apollo 12.jpg",
    
  },
  "apollo 15": {
    info: "The Apollo 15 landing site is located in the Hadley-Apennine region, where astronauts explored mountains and valleys.",
    img: "apollo 15.jpg",
  },
  "apollo 16": {
    info: "The Apollo 16 landing site is in the Descartes Highlands and was the first mission to study the lunar highlands.",
    img: "apollo 16.jpg",
 
  },
  "apollo 17": {
    info: "The Apollo 17 landing site is the last manned mission to the Moon and took place in December 1972.",
    img: "apollo 17.jpg",
  },
  "sea of tranquility": {
    info: "Mare Tranquillitatis is known as the Sea of Tranquility, where Apollo 11 landed.",
    img: "sea of tranquility.jpg",
  },

  "rilles": {
    info: "Rilles are long, narrow depressions that may have formed from volcanic activity.",
    img: "rilles of the moon.jpg",

  },
  "oceanus procellarum": {
    info: "Oceanus Procellarum, or the Sea of Storms, is the largest mare on the Moon.",
    img: "oceanus procellarum.jpg",

  },

  "lunar regolith": {
    info: "Lunar regolith is the layer of loose, fragmented material covering solid bedrock on the Moon.",
    img: "lunar regolith.jpg",
  },
  "dark side of the moon": {
    info: "The term 'dark side of the moon' refers to the hemisphere that is always facing away from Earth.",
    img: "dark side of the moon.jpg",
  },




};


function init() {
 
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 2);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('container').appendChild(renderer.domElement);

  const geometry = new THREE.SphereGeometry(1, 128, 128);
  const textureLoader = new THREE.TextureLoader();
  const moonTexture = textureLoader.load('moon2.jpg');

  normalMaterial = new THREE.MeshPhongMaterial({ map: moonTexture });

  fullyLitMaterial = new THREE.MeshBasicMaterial({ map: moonTexture, emissive: 0xffffff });

  moon = new THREE.Mesh(geometry, normalMaterial);
  scene.add(moon);

  ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(ambientLight);

  directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5).normalize();
  scene.add(directionalLight);

  createStarfield();

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableZoom = true;
  controls.minDistance = 1;
  controls.maxDistance = 10;

  animate();

  window.addEventListener('resize', onWindowResize, false);
  
  const lightingSelect = document.getElementById('lighting');
  lightingSelect.addEventListener('change', updateLighting);

  setupSearchBar();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}


function createStarfield() {
  const starGeometry = new THREE.BufferGeometry();
  const starCount = 10000;
  const starPositions = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount; i++) {
    starPositions[i * 3] = (Math.random() - 0.5) * 2000;
    starPositions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
    starPositions[i * 3 + 2] = (Math.random() - 0.5) * 2000;
  }

  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.5,
  });

  starfield = new THREE.Points(starGeometry, starMaterial);
  scene.add(starfield);
}

function updateLighting() {
  const selectedOption = document.getElementById('lighting').value;

  if (selectedOption === "fully_lit") {
    moon.material = fullyLitMaterial; 
    directionalLight.visible = false;
  } else {
    moon.material = normalMaterial; 
    directionalLight.visible = true; 
  }
}



function animate() {
  requestAnimationFrame(animate);
  controls.update();
  starfield.rotation.y += 0.0001;
  renderer.render(scene, camera);
}

function setupSearchBar() {
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const searchResults = document.getElementById('searchResults');

  searchButton.addEventListener('click', function() {
    const query = searchInput.value.trim().toLowerCase();
    
    if (!query) {
      searchResults.innerHTML = 'Please enter a search term.';
      return;
    }

    const matchingTerrains = Object.keys(moonTerrains).filter(terrain =>
      terrain.startsWith(query) 
    );

    if (matchingTerrains.length > 0) {
      searchResults.innerHTML = matchingTerrains.map(terrain => `
        <p style="cursor:pointer;" data-terrain="${terrain}">${terrain.charAt(0).toUpperCase() + terrain.slice(1)}</p>
      `).join('');
      addClickEventToResults(searchResults, matchingTerrains);
    } else {
      searchResults.innerHTML = 'No information found for this terrain.';
    }
  });
}

function addClickEventToResults(searchResults, matchingTerrains) {
  matchingTerrains.forEach(terrain => {
    const terrainElement = searchResults.querySelector(`[data-terrain="${terrain}"]`);
    terrainElement.addEventListener('click', function() {
      const terrainData = moonTerrains[terrain];
      
      

      searchResults.innerHTML = `
        <p><strong>${terrain.charAt(0).toUpperCase() + terrain.slice(1)}</strong></p>
        <p>${terrainData.info}</p>
        <img src="${terrainData.img}" alt="${terrain}" style="width: 100%; height: auto;">
      `;
    });
  });
}

init();
