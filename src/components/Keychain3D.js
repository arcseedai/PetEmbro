// Three.js 3D Keychain Viewer
// Zoomed in directly onto the wooden frame origin with mouse wheel & touch pinch zoom

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class Keychain3DViewer {
  constructor(canvasContainer) {
    this.container = canvasContainer;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.keychainGroup = null;
    this.fabricMaterials = [];
    this.woodMaterials = [];
    this.metalMaterials = [];
    this.fabricCanvas = null;
    this.fabricTexture = null;
    this.animationFrameId = null;

    // Interaction state
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    this.targetRotation = { x: 0, y: 0 };
    this.currentRotation = { x: 0, y: 0 };
    this.clock = new THREE.Clock();

    // Camera distance limits - centered on exact Blender origin
    this.targetCameraZ = 3.0;
    this.currentCameraZ = 3.0;
    this.minCameraZ = 1.8;
    this.maxCameraZ = 4.8;

    // Wood tint finishes
    this.woodColors = {
      oak: { color: 0xC69A6A, roughness: 0.65 },
      birch: { color: 0xE8CCA6, roughness: 0.55 },
      walnut: { color: 0x664126, roughness: 0.7 }
    };

    // Metal finishes
    this.metalColors = {
      silver: { color: 0xE2E6EA, metalness: 0.95, roughness: 0.18 },
      brass: { color: 0xD4AF37, metalness: 0.9, roughness: 0.22 },
      rosegold: { color: 0xB8707C, metalness: 0.9, roughness: 0.25 }
    };

    this.currentWood = 'oak';
    this.currentMetal = 'silver';

    this.resizeObserver = null;
    this.init();
  }

  init() {
    this.scene = new THREE.Scene();

    // Guard against zero or uncomputed layout dimensions on initial page refresh
    let width = this.container.clientWidth || this.container.parentElement?.clientWidth || 600;
    let height = this.container.clientHeight || 520;
    if (width <= 0) width = 600;
    if (height <= 0) height = 520;

    const aspect = (width > 0 && height > 0) ? (width / height) : (600 / 520);
    // FOV 34, camera points directly at exact Blender origin (0, 0, 0)
    this.camera = new THREE.PerspectiveCamera(34, aspect, 0.1, 100);
    this.camera.position.set(0, 0, this.targetCameraZ);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.NeutralToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.container.innerHTML = '';
    this.container.appendChild(this.renderer.domElement);

    this.setupLighting();
    this.initFabricCanvasTexture();
    this.loadDefaultModel('/assets/Keychain.glb');
    this.bindControls();

    this.handleResize = this.handleResize.bind(this);
    window.addEventListener('resize', this.handleResize);

    // ResizeObserver ensures canvas updates as soon as Tailwind CDN / CSS layout finishes computing
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.handleResize();
      });
      this.resizeObserver.observe(this.container);
    }

    // Double-check dimensions during initial layout reflow
    requestAnimationFrame(() => this.handleResize());
    setTimeout(() => this.handleResize(), 150);
    setTimeout(() => this.handleResize(), 450);

    this.animate = this.animate.bind(this);
    this.animate();
  }

  setupLighting() {
    // Ambient light: Soft even studio fill across all angles
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
    this.scene.add(ambientLight);

    // Front studio key light: Directly illuminates the flat hoop face perpendicularly (normal = 0, 0, 1)
    const frontLight = new THREE.DirectionalLight(0xffffff, 1.0);
    frontLight.position.set(0, 0, 6.0);
    this.scene.add(frontLight);

    // Angled light: Casts gentle 3D shadow relief on wooden hoop rim and metal chain
    const keyLight = new THREE.DirectionalLight(0xfff8f0, 0.7);
    keyLight.position.set(3.0, 4.5, 3.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.001;
    this.scene.add(keyLight);

    // Soft rim fill light
    const rimLight = new THREE.DirectionalLight(0xe8f0ff, 0.4);
    rimLight.position.set(-3.0, 2.0, -2.0);
    this.scene.add(rimLight);
  }

  initFabricCanvasTexture() {
    this.fabricCanvas = document.createElement('canvas');
    this.fabricCanvas.width = 1024;
    this.fabricCanvas.height = 1024;

    const ctx = this.fabricCanvas.getContext('2d');
    ctx.fillStyle = '#FAF6F0';
    ctx.fillRect(0, 0, 1024, 1024);

    const initialImg = new Image();
    initialImg.crossOrigin = 'anonymous';
    initialImg.src = '/assets/preset_extracted.jpg';
    initialImg.onload = () => {
      ctx.drawImage(initialImg, 0, 0, 1024, 1024);
      if (this.fabricTexture) {
        this.fabricTexture.needsUpdate = true;
      }
    };

    this.fabricTexture = new THREE.CanvasTexture(this.fabricCanvas);
    this.fabricTexture.colorSpace = THREE.SRGBColorSpace;
    this.fabricTexture.wrapS = THREE.ClampToEdgeWrapping;
    this.fabricTexture.wrapT = THREE.ClampToEdgeWrapping;
    this.fabricTexture.flipY = false;
  }

  loadDefaultModel(url) {
    const loader = new GLTFLoader();

    loader.load(
      url,
      (gltf) => {
        if (this.keychainGroup) {
          this.scene.remove(this.keychainGroup);
        }

        const model = gltf.scene;
        this.keychainGroup = new THREE.Group();
        this.keychainGroup.add(model);

        this.fabricMaterials = [];
        this.woodMaterials = [];
        this.metalMaterials = [];

        // Scale model to fit view cleanly
        const scaleFactor = 2.5;
        model.scale.setScalar(scaleFactor);

        // Keep model at exact Blender origin (0, 0, 0) - no artificial offsets!
        model.position.set(0, 0, 0);

        // Bind materials
        model.traverse((node) => {
          if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;

            const mats = Array.isArray(node.material) ? node.material : [node.material];
            mats.forEach((mat) => {
              if (!mat) return;
              const matName = mat.name.toLowerCase();

              if (matName.includes('fabric')) {
                this.fabricMaterials.push(mat);
                mat.roughness = 1.0;
                mat.metalness = 0.0;
                if (mat.color) mat.color.setRGB(1, 1, 1);
                if (mat.map) {
                  mat.map.colorSpace = THREE.SRGBColorSpace;
                }
              } else if (matName.includes('wood')) {
                this.woodMaterials.push(mat);
              } else if (matName.includes('material') || matName.includes('metal')) {
                this.metalMaterials.push(mat);
                mat.metalness = 0.95;
                mat.roughness = 0.18;
              }
            });
          }
        });

        this.scene.add(this.keychainGroup);

        // Immediate render pass once model is loaded into the scene
        this.handleResize();
        this.renderer.render(this.scene, this.camera);

        const loaderEl = document.getElementById('canvas-loader');
        if (loaderEl) loaderEl.remove();
      },
      undefined,
      (err) => {
        console.error('Failed to load Keychain.glb', err);
        const loaderEl = document.getElementById('canvas-loader');
        if (loaderEl) {
          loaderEl.innerHTML = `
            <div class="text-terracotta text-sm text-center px-4">
              <p class="font-bold mb-1">Failed to load 3D model</p>
              <p class="text-xs text-stone-500">Please refresh the page</p>
            </div>
          `;
        }
      }
    );
  }

  loadCustomModel(file) {
    const url = URL.createObjectURL(file);
    this.loadDefaultModel(url);
  }

  updateEmbroideryTexture(imageSource) {
    if (!this.fabricCanvas) return;
    const ctx = this.fabricCanvas.getContext('2d');
    const w = this.fabricCanvas.width;
    const h = this.fabricCanvas.height;

    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(imageSource, 0, 0, w, h);

    if (this.fabricTexture) {
      this.fabricTexture.colorSpace = THREE.SRGBColorSpace;
      this.fabricTexture.needsUpdate = true;
    }

    this.fabricMaterials.forEach((mat) => {
      mat.map = this.fabricTexture;
      mat.map.colorSpace = THREE.SRGBColorSpace;
      mat.map.flipY = false;
      mat.roughness = 1.0;
      mat.metalness = 0.0;
      if (mat.color) mat.color.setRGB(1, 1, 1);
      mat.map.needsUpdate = true;
      mat.needsUpdate = true;
    });
  }

  zoomIn() {
    this.targetCameraZ = Math.max(this.minCameraZ, this.targetCameraZ - 0.35);
  }

  zoomOut() {
    this.targetCameraZ = Math.min(this.maxCameraZ, this.targetCameraZ + 0.35);
  }

  setWoodFinish(type) {
    if (!this.woodColors[type]) return;
    this.currentWood = type;
    const config = this.woodColors[type];
    this.woodMaterials.forEach(mat => {
      mat.color.setHex(config.color);
      mat.roughness = config.roughness;
      mat.needsUpdate = true;
    });
  }

  setMetalFinish(type) {
    if (!this.metalColors[type]) return;
    this.currentMetal = type;
    const config = this.metalColors[type];
    this.metalMaterials.forEach(mat => {
      mat.color.setHex(config.color);
      mat.metalness = config.metalness;
      mat.roughness = config.roughness;
      mat.needsUpdate = true;
    });
  }

  bindControls() {
    const el = this.renderer.domElement;

    // Mouse Drag Rotation
    const onPointerDown = (e) => {
      this.isDragging = true;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      this.previousMousePosition = { x: clientX, y: clientY };
    };

    const onPointerMove = (e) => {
      if (!this.isDragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - this.previousMousePosition.x;
      const deltaY = clientY - this.previousMousePosition.y;

      // Rotate pivoting directly around the center of the wooden hoop!
      this.targetRotation.y += deltaX * 0.007;
      this.targetRotation.y = Math.max(-0.75, Math.min(0.75, this.targetRotation.y));

      this.targetRotation.x += deltaY * 0.005;
      this.targetRotation.x = Math.max(-0.4, Math.min(0.4, this.targetRotation.x));

      this.previousMousePosition = { x: clientX, y: clientY };
    };

    const onPointerUp = () => {
      this.isDragging = false;
    };

    // Mouse Wheel Zoom
    const onWheel = (e) => {
      e.preventDefault();
      const zoomDelta = e.deltaY * 0.0025;
      this.targetCameraZ = Math.max(this.minCameraZ, Math.min(this.maxCameraZ, this.targetCameraZ + zoomDelta));
    };

    el.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    el.addEventListener('wheel', onWheel, { passive: false });

    el.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);
  }

  animate() {
    this.animationFrameId = requestAnimationFrame(this.animate);
    const elapsedTime = this.clock.getElapsedTime();

    // Auto-fix if canvas had 0 dimensions at initial frame render
    if (this.renderer && this.renderer.domElement && this.renderer.domElement.height === 0 && this.container.clientHeight > 0) {
      this.handleResize();
    }

    // Smooth camera distance zoom interpolation
    this.currentCameraZ += (this.targetCameraZ - this.currentCameraZ) * 0.1;
    this.camera.position.z = this.currentCameraZ;

    if (this.keychainGroup) {
      // Hover bobbing centered exactly around Blender origin (0, 0, 0)
      const hoverY = Math.sin(elapsedTime * 1.5) * 0.03;
      this.keychainGroup.position.y = hoverY;

      if (!this.isDragging) {
        const idleRotY = Math.sin(elapsedTime * 0.85) * 0.16;
        const idleRotX = Math.cos(elapsedTime * 1.1) * 0.035;
        const idleTiltZ = Math.sin(elapsedTime * 0.75) * 0.025;

        this.targetRotation.y = idleRotY;
        this.targetRotation.x = idleRotX;
        this.keychainGroup.rotation.z = idleTiltZ;
      }

      this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * 0.08;
      this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * 0.08;

      this.keychainGroup.rotation.x = this.currentRotation.x;
      this.keychainGroup.rotation.y = this.currentRotation.y;
    }

    this.renderer.render(this.scene, this.camera);
  }

  captureSnapshot() {
    return this.renderer.domElement.toDataURL('image/png');
  }

  resetView() {
    this.targetRotation = { x: 0, y: 0 };
    this.currentRotation = { x: 0, y: 0 };
    this.targetCameraZ = 3.0;
  }

  handleResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth || this.container.parentElement?.clientWidth || 0;
    const height = this.container.clientHeight || 0;
    if (width <= 0 || height <= 0) return;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    window.removeEventListener('resize', this.handleResize);
    if (this.renderer) {
      this.renderer.dispose();
      if (this.renderer.domElement) {
        this.renderer.domElement.remove();
      }
    }
  }
}
