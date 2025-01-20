// script.js

let scene, camera, renderer, matrix;
let scrollY = 0;

function init() {
    // Scene Setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("canvas-container").appendChild(renderer.domElement);

    // Add some basic cubes for blockchain visualization
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    matrix = new THREE.Group();

    for (let i = 0; i < 500; i++) {
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50);
        matrix.add(cube);
    }

    scene.add(matrix);

    // Set camera position
    camera.position.z = 50;

    // Start the animation loop
    animate();
}

function animate() {
    requestAnimationFrame(animate);

    // Apply rotation to the matrix for a 3D effect
    matrix.rotation.x += 0.01;
    matrix.rotation.y += 0.01;

    renderer.render(scene, camera);
}

// Adjust canvas size on window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Scroll interaction logic
window.addEventListener('scroll', () => {
    scrollY = window.scrollY;

    // Animate the blockchain matrix based on scroll position
    const scrollPercentage = scrollY / (document.body.scrollHeight - window.innerHeight);

    // Adjust camera zoom and matrix rotation
    camera.position.z = 50 + scrollPercentage * 150;  // Zoom in/out as you scroll
    matrix.rotation.x = scrollPercentage * Math.PI;  // Rotate based on scroll
    matrix.rotation.y = scrollPercentage * Math.PI;

    // Fade in sections as the user scrolls
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollY >= sectionTop - window.innerHeight && scrollY < sectionTop + sectionHeight) {
            section.classList.add('visible');
        } else {
            section.classList.remove('visible');
        }
    });
});

// Initialize everything
init();
