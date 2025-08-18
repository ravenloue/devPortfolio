//skills.js
// Designed with the help of AI

// Global variables
let scene, camera, renderer, centralOrb;
let skills = [];
let orbits = [];
let animationSpeed = 1;
let isPaused = false;
let skillLabels = [];

// Skill data
const skillsData = {
    // Most proficient
    'HTML/CSS': { proficiency: 96, category: 'Frontend', color: 0x06b6d4, orbit: 0,
        description: 'Semantic HTML5 and modern CSS3 with Flexbox, Grid, animations, and responsive design.' },
    'JavaScript': { proficiency: 90, category: 'Frontend', color: 0x06b6d4, orbit: 0,
        description: 'Modern ES6+ JavaScript, async programming, DOM manipulation, and functional programming.' },
    'Java': { proficiency: 95, category: 'Backend', color: 0x10b981, orbit: 0,
        description: 'Object-oriented programming with Java and Spring Boot framework.' },
    'Git': { proficiency: 92, category: 'Tools', color: 0xef4444, orbit: 0,
        description: 'Version control system for tracking changes and collaboration.' },
    'Generative AI': { proficiency: 90, category: 'Tools', color: 0xef4444, orbit: 0,
        description: 'AI with a focus on producing creative outputs such as text, images, or code.' },

    // Very comfortable
    'Node.js': { proficiency: 87, category: 'Backend', color: 0x10b981, orbit: 1,
        description: 'Server-side JavaScript runtime for building scalable network applications and APIs.' },
    'Python': { proficiency: 83, category: 'Backend', color: 0x10b981, orbit: 1,
        description: 'Versatile programming language for web development, data analysis, and automation.' },
    'React': { proficiency: 84, category: 'Backend', color: 0x06b6d4, orbit: 1,
        description: 'Component-based UI development with hooks, context, and state management.' },
    'Express': { proficiency: 85, category: 'Backend', color: 0x10b981, orbit: 1,
        description: 'Minimal Node.js web framework for building robust APIs and applications.' },
    'Penpot': { proficiency: 87, category: 'Tools', color: 0xef4444, orbit: 1,
        description: 'Open-source design and prototyping platform with team collaboration support.' },
    'MySQL': { proficiency: 92, category: 'Database', color: 0xf59e0b, orbit: 1,
        description: 'Relational database management system for structured data, queries, and transactions.' },
    'PHP': { proficiency: 94, category: 'Backend', color: 0x10b981, orbit: 1,
        description: 'Server-side scripting for dynamic web applications and backend logic.' },
    'Spring Framework': { proficiency: 86, category: 'Backend', color: 0x10b981, orbit: 1,
        description: 'Comprehensive Java framework for enterprise applications, including Spring Boot.' },
    'TailwindCSS': { proficiency: 88, category: 'Frontend', color: 0x06b6d4, orbit: 1,
        description: 'Utility-first CSS framework for rapid UI development with responsive design.' },

    // Use infrequently but still comfortable
    'MongoDB': { proficiency: 80, category: 'Database', color: 0xf59e0b, orbit: 2,
        description: 'NoSQL document database with flexible schema design and aggregation capabilities.' },
    'PostgreSQL': { proficiency: 77, category: 'Database', color: 0xf59e0b, orbit: 2,
        description: 'Advanced relational database with complex queries and ACID compliance.' },
    'Docker': { proficiency: 80, category: 'Tools', color: 0xef4444, orbit: 2,
        description: 'Containerization platform for developing and shipping applications.' },
    'Django': { proficiency: 82, category: 'Backend', color: 0x10b981, orbit: 2,
        description: 'High-level Python web framework with built-in ORM, authentication, and admin tools.' },
    'TypeScript': { proficiency: 80, category: 'Frontend', color: 0x10b981, orbit: 2,
        description: 'Strongly typed JavaScript for better code quality and enhanced developer experience.' },
    'Figma': { proficiency: 75, category: 'Tools', color: 0xef4444, orbit: 2,
        description: 'Collaborative UI/UX design tool for wireframing, prototyping, and design systems.' },
};

function init() {
    const container = document.getElementById('canvas-container');
    
    // Create scene
    scene = new THREE.Scene();
    
    // Create camera (smaller field of view for more compact view)
    camera = new THREE.PerspectiveCamera(50, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    // Create central orb (smaller)
    createCentralOrb();
    
    // Create skills
    createSkills();
    
    // Add lights
    addLights();
    
    // Add event listeners
    addEventListeners();
    
    // Start animation
    animate();
}

function createCentralOrb() {
    const geometry = new THREE.SphereGeometry(0.3, 24, 24);
    const material = new THREE.MeshPhongMaterial({ 
        color: 0xa855f7,
        shininess: 100,
        transparent: true,
        opacity: 0.9
    });
    
    centralOrb = new THREE.Mesh(geometry, material);
    scene.add(centralOrb);
    
    // Add glow effect (smaller)
    const glowGeometry = new THREE.SphereGeometry(0.5, 16, 16);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xa855f7,
        transparent: true,
        opacity: 0.1
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    centralOrb.add(glow);
}

function createSkills() {
    const skillNames = Object.keys(skillsData);
    const orbitRadii = [.6, 1.2, 1.6]; // Much smaller orbits
    
    for (let orbitIndex = 0; orbitIndex < 3; orbitIndex++) {
        const orbit = new THREE.Group();
        scene.add(orbit);
        orbits.push(orbit);
        
        const skillsInThisOrbit = skillNames.filter(skill => skillsData[skill].orbit === orbitIndex);
        
        skillsInThisOrbit.forEach((skillName, index) => {
            const skillData = skillsData[skillName];
            const angle = (index / skillsInThisOrbit.length) * Math.PI * 2;
            
            // Create skill group
            const skillGroup = new THREE.Group();
            
            // Create smaller skill sphere
            const geometry = new THREE.SphereGeometry(0.08, 12, 12);
            const material = new THREE.MeshPhongMaterial({ 
                color: skillData.color,
                shininess: 50
            });
            const skillSphere = new THREE.Mesh(geometry, material);
            skillGroup.add(skillSphere);
            
            // Position the skill
            skillGroup.position.set(
                Math.cos(angle) * orbitRadii[orbitIndex],
                Math.sin(angle) * orbitRadii[orbitIndex],
                (Math.random() - 0.5) * 0.2 // Small Z variation
            );
            
            // Add to orbit
            orbit.add(skillGroup);
            
            // Store skill data
            skillGroup.userData = {
                name: skillName,
                data: skillData,
                labelElement: null
            };
            
            skills.push(skillGroup);
            
            // Create label
            createSkillLabel(skillGroup, skillName);
        });
    }
}

function createSkillLabel(skillGroup, skillName) {
    const label = document.createElement('div');
    label.className = 'skill-label';
    label.textContent = skillName;
    label.style.borderColor = `#${skillGroup.userData.data.color.toString(16)}`;
    
    document.getElementById('canvas-container').appendChild(label);
    skillGroup.userData.labelElement = label;
    skillLabels.push({ group: skillGroup, element: label });
}

function updateLabels() {
    const container = document.getElementById('canvas-container');
    const rect = container.getBoundingClientRect();
    
    skillLabels.forEach(({ group, element }) => {
        // Get world position
        const vector = new THREE.Vector3();
        group.getWorldPosition(vector);
        
        // Project to screen coordinates
        vector.project(camera);
        
        const x = (vector.x * 0.5 + 0.5) * container.offsetWidth;
        const y = (-vector.y * 0.5 + 0.5) * container.offsetHeight;
        
        // Update label position
        element.style.left = x + 'px';
        element.style.top = y + 'px';
        
        // Hide labels that are behind the camera or too far
        element.style.opacity = vector.z < 1 ? '1' : '0';
    });
}

function addLights() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
    scene.add(ambientLight);
    
    // Directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Point light for central orb
    const pointLight = new THREE.PointLight(0xa855f7, 0.8, 10);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);
}

function addEventListeners() {
    // Raycaster for clicking skills
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    renderer.domElement.addEventListener('click', (event) => {
        const container = document.getElementById('canvas-container');
        const rect = container.getBoundingClientRect();
        
        mouse.x = ((event.clientX - rect.left) / container.offsetWidth) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / container.offsetHeight) * 2 + 1;
        
        raycaster.setFromCamera(mouse, camera);
        
        const skillMeshes = skills.map(skill => skill.children[0]);
        const intersects = raycaster.intersectObjects(skillMeshes);
        
        if (intersects.length > 0) {
            const skill = intersects[0].object.parent;
            openModal(skill.userData.name, skill.userData.data);
        }
    });
    
    // Window resize
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    const container = document.getElementById('canvas-container');
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
}

function animate() {
    requestAnimationFrame(animate);
    
    if (!isPaused) {
        // Rotate orbits (slower for better readability)
        orbits[0].rotation.z += 0.008 * animationSpeed;
        orbits[1].rotation.z -= 0.005 * animationSpeed;
        orbits[2].rotation.z += 0.0015 * animationSpeed;
        
        // Add slight variations
        orbits[1].rotation.x += 0.0005 * animationSpeed;
        orbits[2].rotation.y += 0.0005 * animationSpeed;
        
        // Pulsate central orb
        const time = Date.now() * 0.001;
        centralOrb.scale.setScalar(1 + Math.sin(time * 2) * 0.1);
    }
    
    // Update label positions
    updateLabels();
    
    renderer.render(scene, camera);
}

// Control functions
function setSpeed(speed) {
    const speeds = { slow: 0.3, normal: 1, fast: 2 };
    animationSpeed = speeds[speed];
    
    document.querySelectorAll('.control-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

function togglePause() {
    isPaused = !isPaused;
    const btn = event.target;
    btn.textContent = isPaused ? 'Resume' : 'Pause';
    btn.classList.toggle('active', isPaused);
}

// Modal functions
function openModal(skillName, skillData) {
    document.getElementById('modalTitle').textContent = skillName;
    document.getElementById('modalCategory').textContent = skillData.category + ' Technology';
    document.getElementById('modalDescription').textContent = skillData.description;
    document.getElementById('progressPercent').textContent = skillData.proficiency + '%';
    document.getElementById('progressFill').style.width = skillData.proficiency + '%';
    
    document.getElementById('skillModal').classList.add('show');
}

function closeModal() {
    document.getElementById('skillModal').classList.remove('show');
}

// Initialize the app
init();