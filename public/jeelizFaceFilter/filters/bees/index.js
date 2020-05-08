'use strict';

(function () {
  const BASE_URL = './jeelizFaceFilter/filters/bees';
  const SETTINGS = {
    numberBees: 8
  };

  let THREECAMERA = null;
  let GLASSESOBJ3D = null;

  const ACTIONS = [];
  const MIXERS = [];

  let ISANIMATED = false;
  let BEEMESH = null,
    BEEOBJ3D = null;

  function detect_callback(isDetected) {
    if (isDetected) {
      console.log('INFO in detect_callback(): DETECTED');
    } else {
      console.log('INFO in detect_callback(): LOST');
    }
  }

  function init_threeScene(spec) {
    const threeStuffs = THREE.JeelizHelper.init(spec, detect_callback);

    let frameMesh = null;
    let lensesMesh = null;
    let branchesMesh = null;
    let decoMesh = null;

    const loadingManager = new THREE.LoadingManager();

    const loaderFrame = new THREE.BufferGeometryLoader(loadingManager);

    loaderFrame.load(BASE_URL + '/models/glasses/frame.json', (geometry) => {
      const mat = new THREE.MeshPhongMaterial({
        color: 0x000000,
        shininess: 2,
        specular: 0xffffff,
        transparent: true
      });

      frameMesh = new THREE.Mesh(geometry, mat);
      frameMesh.scale.multiplyScalar(0.0067);
      frameMesh.frustumCulled = false;
      frameMesh.renderOrder = 10000;
    });

    const loaderLenses = new THREE.BufferGeometryLoader(loadingManager);

    loaderLenses.load(BASE_URL + '/models/glasses/lenses.json', (geometry) => {
      const mat = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(BASE_URL + '/models/glasses/texture_mp.jpg')
      });

      lensesMesh = new THREE.Mesh(geometry, mat);
      lensesMesh.scale.multiplyScalar(0.0067);
      lensesMesh.frustumCulled = false;
      lensesMesh.renderOrder = 10000;
    });

    const loaderBranches = new THREE.BufferGeometryLoader(loadingManager);

    loaderBranches.load(BASE_URL + '/models/glasses/branches.json', (geometry) => {
      const mat = new THREE.MeshBasicMaterial({
        alphaMap: new THREE.TextureLoader().load(
          BASE_URL + '/models/glasses/alpha_branches.jpg'
        ),
        map: new THREE.TextureLoader().load(
          BASE_URL + '/models/glasses/textureBlack.jpg'
        ),
        transparent: true
      });

      branchesMesh = new THREE.Mesh(geometry, mat);
      branchesMesh.scale.multiplyScalar(0.0067);
      branchesMesh.frustumCulled = false;
      branchesMesh.renderOrder = 10000;
    });

    const loaderDeco = new THREE.BufferGeometryLoader(loadingManager);

    loaderDeco.load(BASE_URL + '/models/glasses/deco.json', (geometry) => {
      const mat = new THREE.MeshBasicMaterial({
        color: 0xffffff
      });

      decoMesh = new THREE.Mesh(geometry, mat);
      decoMesh.scale.multiplyScalar(0.0067);

      decoMesh.frustumCulled = false;
      decoMesh.renderOrder = 10000;
    });

    loadingManager.onLoad = () => {
      GLASSESOBJ3D.add(branchesMesh, frameMesh, lensesMesh, decoMesh);
      GLASSESOBJ3D.scale.multiplyScalar(1.1);
      GLASSESOBJ3D.position.setY(0.05);
      GLASSESOBJ3D.position.setZ(0.25);

      addDragEventListener(GLASSESOBJ3D);

      threeStuffs.faceObject.add(GLASSESOBJ3D);
    };

    const beeLoader = new THREE.JSONLoader();

    beeLoader.load(BASE_URL + '/models/bee/bee.json', (geometry) => {
      const materialBee = new THREE.MeshLambertMaterial({
        map: new THREE.TextureLoader().load(BASE_URL + '/models/bee/texture_bee.jpg'),
        transparent: true,
        morphTargets: true
      });

      BEEMESH = new THREE.Mesh(geometry, materialBee);
      BEEOBJ3D = new THREE.Object3D();

      for (let i = 1; i < SETTINGS.numberBees; i++) {
        const sign = i % 2 === 0 ? 1 : -1;
        const beeInstance = BEEMESH.clone();

        const xRand = Math.random() * 1.5 - 0.75;
        const yRand = Math.random() * 2 - 1 + 1;
        const zRand = Math.random() * 0.5 - 0.25;

        beeInstance.position.set(xRand, yRand, zRand);
        beeInstance.scale.multiplyScalar(0.1);
        animateFlyBees(beeInstance, sign * ((i + 1) * 0.005 + 0.01), sign);
        let BEEINSTANCEOBJ3D = new THREE.Object3D();
        BEEINSTANCEOBJ3D.add(beeInstance);

        if (!ISANIMATED) {
          const mixer = new THREE.AnimationMixer(beeInstance);

          const clips = beeInstance.geometry.animations;
          const clip = clips[0];
          const action = mixer.clipAction(clip);

          ACTIONS.push(action);
          MIXERS.push(mixer);
        }

        BEEOBJ3D.add(BEEINSTANCEOBJ3D);
      }

      ACTIONS.forEach((a, index) => {
        setTimeout(() => {
          a.play();
        }, index * 33);
      });

      ISANIMATED = true;

      threeStuffs.faceObject.add(BEEOBJ3D);
    });

    function create_mat2d(threeTexture, isTransparent) {
      return new THREE.RawShaderMaterial({
        depthWrite: false,
        depthTest: false,
        transparent: isTransparent,
        vertexShader:
          'attribute vec2 position;\n\
          varying vec2 vUV;\n\
          void main(void){\n\
            gl_Position=vec4(position, 0., 1.);\n\
            vUV=0.5+0.5*position;\n\
          }',
        fragmentShader:
          'precision lowp float;\n\
          uniform sampler2D samplerVideo;\n\
          varying vec2 vUV;\n\
          void main(void){\n\
            gl_FragColor = texture2D(samplerVideo, vUV);\n\
          }',
        uniforms: {
          samplerVideo: {
            value: threeTexture
          }
        }
      });
    }

    const calqueMesh = new THREE.Mesh(
      threeStuffs.videoMesh.geometry,
      create_mat2d(new THREE.TextureLoader().load(BASE_URL + '/images/frame.png'), true)
    );
    calqueMesh.renderOrder = 999;
    calqueMesh.frustumCulled = false;
    threeStuffs.scene.add(calqueMesh);

    THREECAMERA = THREE.JeelizHelper.create_camera();

    const ambient = new THREE.AmbientLight(0xffffff, 1);
    threeStuffs.scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(100, 1000, 100);
    threeStuffs.scene.add(dirLight);
  }

  function animateFlyBees(mesh, theta, sign) {
    let count = 0;
    setInterval(() => {
      count += 1;
      const x = mesh.position.x;
      const z = mesh.position.z;
      const y = mesh.position.y;

      mesh.position.set(
        x * Math.cos(theta) + z * Math.sin(theta),
        (y * Math.cos(theta) + x * Math.sin(theta)) * 0.96 + 0.05,
        z * Math.cos(theta) - x * Math.sin(theta)
      );
      mesh.rotation.set(
        -(x * Math.cos(theta) + z * Math.sin(theta)) * sign,
        -(y * Math.cos(theta) + z * Math.sin(theta)) * sign,
        -(z * Math.cos(theta) - x * Math.sin(theta)) * sign
      );
    }, 16);
  }

  function main() {
    GLASSESOBJ3D = new THREE.Object3D();

    JeelizResizer.size_canvas({
      canvasId: 'jeeFaceFilterCanvas',
      callback: function (isError, bestVideoSettings) {
        init_faceFilter(bestVideoSettings);
      }
    });
  }

  function init_faceFilter(videoSettings) {
    JEEFACEFILTERAPI.init({
      canvasId: 'jeeFaceFilterCanvas',
      NNCpath: './jeelizFaceFilter/dist/',
      videoSettings: videoSettings,
      callbackReady: function (errCode, spec) {
        if (errCode) {
          console.log('AN ERROR HAPPENS. SORRY BRO :( . ERR =', errCode);
          return;
        }

        console.log('INFO: JEEFACEFILTERAPI IS READY');
        init_threeScene(spec);
      },

      callbackTrack: function (detectState) {
        THREE.JeelizHelper.render(detectState, THREECAMERA);

        TWEEN.update();

        if (MIXERS.length > 1) {
          MIXERS.forEach((m) => {
            m.update(0.16);
          });
        }
      }
    });
  }

  main();
})();
