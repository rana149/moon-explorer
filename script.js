let scene, camera, renderer, controls, moon, directionalLight, ambientLight, starfield;

// Sample moon terrain data (you can expand this)
const moonTerrains = {
  "mare tranquillitatis": {
    info: "Mare Tranquillitatis is a lunar mare located within the Tranquillitatis basin.",
    img: "https://example.com/mare_tranquillitatis.jpg",
    position: new THREE.Vector3(0, -1, 1)  // Example position (adjust as needed)
  },
  "copernicus crater": {
    info: "Copernicus is a prominent lunar impact crater located in eastern Oceanus Procellarum.",
    img: "https://example.com/copernicus_crater.jpg",
    position: new THREE.Vector3(1, 0.5, 1)  // Example position (adjust as needed)
  },
  "apollo 11 landing site": {
    info: "The Apollo 11 landing site is where humans first landed on the Moon on July 20, 1969.",
    img: "https://example.com/apollo_11_landing_site.jpg",
    position: new THREE.Vector3(0.5, -1, 1)
  },
  "apollo 12 landing site": {
    info: "The Apollo 12 landing site is located near the Oceanus Procellarum and was visited in November 1969.",
    img: "https://example.com/apollo_12_landing_site.jpg",
    position: new THREE.Vector3(1.5, -0.5, 1)
  },
  "apollo 15 landing site": {
    info: "The Apollo 15 landing site is located in the Hadley-Apennine region, where astronauts explored mountains and valleys.",
    img: "https://example.com/apollo_15_landing_site.jpg",
    position: new THREE.Vector3(2, 0, 1)
  },
  "apollo 16 landing site": {
    info: "The Apollo 16 landing site is in the Descartes Highlands and was the first mission to study the lunar highlands.",
    img: "https://example.com/apollo_16_landing_site.jpg",
    position: new THREE.Vector3(2.5, 0.5, 1)
  },
  "apollo 17 landing site": {
    info: "The Apollo 17 landing site is the last manned mission to the Moon and took place in December 1972.",
    img: "https://example.com/apollo_17_landing_site.jpg",
    position: new THREE.Vector3(3, 1, 1)
  },
  "sea of storms": {
    info: "Oceanus Procellarum, or the Sea of Storms, is the largest mare on the Moon.",
    img: "https://example.com/sea_of_storms.jpg",
    position: new THREE.Vector3(0, -1.5, 1)
  },
  "sea of tranquility": {
    info: "Mare Tranquillitatis is known as the Sea of Tranquility, where Apollo 11 landed.",
    img: "https://example.com/sea_of_tranquility.jpg",
    position: new THREE.Vector3(0.5, -1.5, 1)
  },
  "sea of serenity": {
    info: "Mare Serenitatis is a large lunar mare located in the northern hemisphere.",
    img: "https://example.com/sea_of_serenity.jpg",
    position: new THREE.Vector3(1, -1.5, 1)
  },
  "sea of fertility": {
    info: "Mare Fecunditatis is known as the Sea of Fertility and is located near the Moon's equator.",
    img: "https://example.com/sea_of_fertility.jpg",
    position: new THREE.Vector3(1.5, -1.5, 1)
  },
  "highlands": {
    info: "The lunar highlands are the brighter, more rugged areas of the Moon, heavily cratered.",
    img: "https://example.com/highlands.jpg",
    position: new THREE.Vector3(2, -1.5, 1)
  },
  "lunar poles": {
    info: "The Moon's poles are of interest for future exploration due to the presence of water ice.",
    img: "https://example.com/lunar_poles.jpg",
    position: new THREE.Vector3(2.5, -1.5, 1)
  },
  "mare lunaris": {
    info: "Mare Lunaris refers to a proposed name for the dark plains of the Moon.",
    img: "https://example.com/maria_lunaris.jpg",
    position: new THREE.Vector3(3, -1.5, 1)
  },
  "descartes mountains": {
    info: "The Descartes Mountains are located in the highlands of the Moon, explored by Apollo 16.",
    img: "https://example.com/descartes_mountains.jpg",
    position: new THREE.Vector3(3.5, -1.5, 1)
  },
  "rilles of the moon": {
    info: "Rilles are long, narrow depressions that may have formed from volcanic activity.",
    img: "https://example.com/rilles_of_the_moon.jpg",
    position: new THREE.Vector3(4, -1.5, 1)
  },
  "crater chains": {
    info: "Crater chains are linear arrangements of craters that may be the result of impacts from a single object.",
    img: "https://example.com/crater_chains.jpg",
    position: new THREE.Vector3(4.5, -1.5, 1)
  },
  "flatlands": {
    info: "Flatlands on the Moon are generally associated with the maria, which are smoother than the highlands.",
    img: "https://example.com/flatlands.jpg",
    position: new THREE.Vector3(5, -1.5, 1)
  },
  "basins of the moon": {
    info: "Lunar basins are large, circular depressions formed by ancient impacts.",
    img: "https://example.com/basins_of_the_moon.jpg",
    position: new THREE.Vector3(5.5, -1.5, 1)
  },
  "lunar maria": {
    info: "The lunar maria are the dark plains on the Moon's surface formed by ancient volcanic eruptions.",
    img: "https://example.com/lunar_maria.jpg",
    position: new THREE.Vector3(6, -1.5, 1)
  },
  "oceanus procellarum": {
    info: "Oceanus Procellarum, or the Sea of Storms, is the largest mare on the Moon.",
    img: "https://example.com/oceanus_procellarum.jpg",
    position: new THREE.Vector3(6.5, -1.5, 1)
  },
  "maria of the moon": {
    info: "The maria of the Moon are basaltic plains, formed from ancient volcanic eruptions.",
    img: "https://example.com/maria_of_the_moon.jpg",
    position: new THREE.Vector3(7, -1.5, 1)
  },
  "ancient craters": {
    info: "Ancient craters are significant for understanding the Moon's geological history.",
    img: "https://example.com/ancient_craters.jpg",
    position: new THREE.Vector3(7.5, -1.5, 1)
  },
  "volcanic pits": {
    info: "Volcanic pits are depressions formed by volcanic activity, found in various locations on the Moon.",
    img: "https://example.com/volcanic_pits.jpg",
    position: new THREE.Vector3(8, -1.5, 1)
  },
  "moon equator": {
    info: "The Moon's equator is significant for studies of temperature and illumination.",
    img: "https://example.com/moon_equator.jpg",
    position: new THREE.Vector3(8.5, -1.5, 1)
  },
  "lunar regolith": {
    info: "Lunar regolith is the layer of loose, fragmented material covering solid bedrock on the Moon.",
    img: "https://example.com/lunar_regolith.jpg",
    position: new THREE.Vector3(9, -1.5, 1)
  },
  "impact sites": {
    info: "Impact sites on the Moon are crucial for studying the history of impacts in the solar system.",
    img: "https://example.com/impact_sites.jpg",
    position: new THREE.Vector3(9.5, -1.5, 1)
  },
  "impact basins": {
    info: "Impact basins are large depressions created by asteroids or comets hitting the Moon.",
    img: "https://example.com/impact_basins.jpg",
    position: new THREE.Vector3(10, -1.5, 1)
  },
  "dark side of the moon": {
    info: "The term 'dark side of the moon' refers to the hemisphere that is always facing away from Earth.",
    img: "https://example.com/dark_side_of_the_moon.jpg",
    position: new THREE.Vector3(10.5, -1.5, 1)
  },
  "maria near the poles": {
    info: "Certain maria near the poles are of interest for potential resource exploration.",
    img: "https://example.com/maria_near_poles.jpg",
    position: new THREE.Vector3(11, -1.5, 1)
  },
  "lunar surface": {
    info: "The lunar surface is characterized by maria, highlands, craters, and more.",
    img: "https://example.com/lunar_surface.jpg",
    position: new THREE.Vector3(11.5, -1.5, 1)
  },
  "lunar highlands": {
    info: "The highlands of the Moon are older than the maria and are heavily cratered.",
    img: "https://example.com/lunar_highlands.jpg",
    position: new THREE.Vector3(12, -1.5, 1)
  },
  "mare near the poles": {
    info: "Mare areas located near the lunar poles are of interest for future exploration.",
    img: "https://example.com/mare_near_poles.jpg",
    position: new THREE.Vector3(12.5, -1.5, 1)
  },
  "surface geology": {
    info: "The surface geology of the Moon is essential for understanding its formation and evolution.",
    img: "https://example.com/surface_geology.jpg",
    position: new THREE.Vector3(13, -1.5, 1)
  },
  "lunar atmosphere": {
    info: "The Moon has a very thin atmosphere, known as an exosphere.",
    img: "https://example.com/lunar_atmosphere.jpg",
    position: new THREE.Vector3(13.5, -1.5, 1)
  },
  "moonscape": {
    info: "Moonscape refers to the visual appearance of the Moon's surface.",
    img: "https://example.com/moonscape.jpg",
    position: new THREE.Vector3(14, -1.5, 1)
  },
  "lunar maria formations": {
    info: "Lunar maria formations are the result of ancient volcanic activity.",
    img: "https://example.com/lunar_maria_formations.jpg",
    position: new THREE.Vector3(14.5, -1.5, 1)
  },
  "lunar exploration sites": {
    info: "Lunar exploration sites are locations of historical and future missions.",
    img: "https://example.com/lunar_exploration_sites.jpg",
    position: new THREE.Vector3(15, -1.5, 1)
  },
  "resource-rich areas": {
    info: "Certain areas of the Moon are rich in resources, including water ice.",
    img: "https://example.com/resource_rich_areas.jpg",
    position: new THREE.Vector3(15.5, -1.5, 1)
  },
  "scientific interest areas": {
    info: "Areas of scientific interest on the Moon are vital for understanding its history.",
    img: "https://example.com/scientific_interest_areas.jpg",
    position: new THREE.Vector3(16, -1.5, 1)
  },
  // Add more landmarks here following the same structure
};


// Initialize the scene
function init() {
  // Create scene
  scene = new THREE.Scene();

  // Set up the camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 2);
  camera.lookAt(0, 0, 0);

  // Set up the renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('container').appendChild(renderer.domElement);

  // Create the moon geometry
  const geometry = new THREE.SphereGeometry(1, 128, 128);
  const textureLoader = new THREE.TextureLoader();
  const moonTexture = textureLoader.load('moon2.jpg');

  // Normal moon material (lit by light sources)
  normalMaterial = new THREE.MeshPhongMaterial({ map: moonTexture });

  // Fully lit moon material (emissive, glowing effect)
  fullyLitMaterial = new THREE.MeshBasicMaterial({ map: moonTexture, emissive: 0xffffff });

  // Create moon mesh with normal material initially
  moon = new THREE.Mesh(geometry, normalMaterial);
  scene.add(moon);

  // Add ambient light to the scene
  ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(ambientLight);

  // Add a directional light for normal moon lighting
  directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5).normalize();
  scene.add(directionalLight);

  // Create stars background (starfield)
  createStarfield();

  // Orbit controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableZoom = true;
  controls.minDistance = 1;
  controls.maxDistance = 10;

  // Start the animation loop
  animate();

  // Handle window resizing
  window.addEventListener('resize', onWindowResize, false);
  
  // Add event listener for lighting selection
  const lightingSelect = document.getElementById('lighting');
  lightingSelect.addEventListener('change', updateLighting);

  // Set up search bar for moon terrain information
  setupSearchBar();
}
// Handle window resizing
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Create a starfield background
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
    moon.material = fullyLitMaterial; // Switch to fully lit material
    directionalLight.visible = false; // Turn off the directional light (since it's fully lit)
  } else {
    moon.material = normalMaterial; // Switch back to normal material
    directionalLight.visible = true; // Turn the directional light back on
  }
}


// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  starfield.rotation.y += 0.0001;
  renderer.render(scene, camera);
}

// Set up search bar for moon terrain information
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
      terrain.startsWith(query) // Allow searching based on the first few letters
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
      // Move camera to terrain position
      
      

      searchResults.innerHTML = `
        <p><strong>${terrain.charAt(0).toUpperCase() + terrain.slice(1)}</strong></p>
        <p>${terrainData.info}</p>
        <img src="${terrainData.img}" alt="${terrain}" style="width: 100%; height: auto;">
      `;
    });
  });
}

// Initialize the scene
init();
