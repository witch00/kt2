document.addEventListener('DOMContentLoaded', () => {
const container = document.getElementById('ring-3d');
if (!container) return;

// Сцена
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1e1e1e);

// Рендерер
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
container.appendChild(renderer.domElement);

// Камера (параметры near/far потом подстроим)
const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.01, 5000);
camera.position.set(0, 0, 5);

// Управление
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.06;

// Свет
scene.add(new THREE.AmbientLight(0xffffff, 1.1));
const key = new THREE.DirectionalLight(0xffffff, 2);
key.position.set(5, 5, 5);
scene.add(key);
const rim = new THREE.DirectionalLight(0xffffff, 1);
rim.position.set(-4, 3, -5);
scene.add(rim);

// Загрузка модели
const loader = new THREE.GLTFLoader();
const url = 'https://raw.githubusercontent.com/witch00/3d/main/rose%20gold%20ring%203d%20model.glb';

loader.load(url, (gltf) => {
const model = gltf.scene;
scene.add(model);
// Подгоняем камеру, чтобы модель была ближе
fitToView(model, camera, controls, 0.72); // 0.72 = ближе; 1.0 = дальше
}, undefined, (e) => console.error('Ошибка загрузки модели:', e));

// Кадрирование модели под камеру
function fitToView(object, camera, controls, fitOffset = 0.72) {
const box = new THREE.Box3().setFromObject(object);
const size = box.getSize(new THREE.Vector3());
const center = box.getCenter(new THREE.Vector3());
const boxSize = size.length(); // диагональ бокса
}

// Рендер-цикл
function animate() {
requestAnimationFrame(animate);
controls.update();
renderer.render(scene, camera);
}
animate();

// Ресайз
window.addEventListener('resize', () => {
const w = container.clientWidth;
const h = container.clientHeight;
renderer.setSize(w, h);
camera.aspect = w / h;
camera.updateProjectionMatrix();
});
});


const fitHeightDistance = boxSize / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2));
const fitWidthDistance  = fitHeightDistance / camera.aspect;
const distance = Math.max(fitHeightDistance, fitWidthDistance) * fitOffset;

// Ставим камеру под приятным углом и на нужной дистанции
const dir = new THREE.Vector3(1, 0.12, 1).normalize(); // направление взгляда
camera.position.copy(center).addScaledVector(dir, distance);

// Корректируем плоскости отсечения и цель управления
camera.near = distance / 100;
camera.far  = distance * 100;
camera.updateProjectionMatrix();

controls.target.copy(center);
controls.minDistance = distance * 0.25;
controls.maxDistance = distance * 4.0;
controls.update();
