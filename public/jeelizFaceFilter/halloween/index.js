'use strict';

var Filters = window.Filters || {};

Filters.halloween = {
  BASE_URL: './jeelizFaceFilter/halloween',
  THREECAMERA: null,
  ISDETECTED: false,
  MIXERS: [],
  ACTIONS: [],
  MASKOBJ3D: null,
  isAnimating: false,
  initThreeScene: (spec) => {
    const threeStuffs = THREE.JeelizHelper.init(spec);
    const loadingManager = new THREE.LoadingManager();
    let smallSpiderMesh;
    const smallSpiderLoader = new THREE.JSONLoader(loadingManager);
    smallSpiderLoader.load(
      Filters.halloween.BASE_URL + '/models/small_spider/small_spider.json',
      (geometry) => {
        const material = new THREE.MeshBasicMaterial({
          map: new THREE.TextureLoader().load(
            Filters.halloween.BASE_URL + '/models/small_spider/diffuse_spider.jpg'
          ),
          morphTargets: true
        });
        smallSpiderMesh = new THREE.Mesh(geometry, material);
        smallSpiderMesh.frustumCulled = false;
        smallSpiderMesh.position.y -= 0.2;
        const mixer = new THREE.AnimationMixer(smallSpiderMesh);
        const clip = smallSpiderMesh.geometry.animations[0];
        const action = mixer.clipAction(clip);
        Filters.halloween.MIXERS.push(mixer);
        Filters.halloween.ACTIONS.push(action);
      }
    );
    let bigSpiderMesh;
    const bigSpiderLoader = new THREE.JSONLoader(loadingManager);
    bigSpiderLoader.load(
      Filters.halloween.BASE_URL + '/models/big_spider/big_spider.json',
      (geometry) => {
        const material = new THREE.MeshBasicMaterial({
          map: new THREE.TextureLoader().load(
            Filters.halloween.BASE_URL + '/models/big_spider/diffuse_spider.jpg'
          ),
          morphTargets: true
        });
        bigSpiderMesh = new THREE.Mesh(geometry, material);
        bigSpiderMesh.frustumCulled = false;
        const mixer = new THREE.AnimationMixer(bigSpiderMesh);
        const clip = bigSpiderMesh.geometry.animations[0];
        const action = mixer.clipAction(clip);
        Filters.halloween.MIXERS.push(mixer);
        Filters.halloween.ACTIONS.push(action);
      }
    );
    let faceMesh = null;
    const faceLoader = new THREE.BufferGeometryLoader(loadingManager);
    faceLoader.load(Filters.halloween.BASE_URL + '/models/face/face.json', (geometry) => {
      const material = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('./models/face/diffuse_makeup.png')
      });
      const vertexShaderSource =
        'varying vec2 vUVvideo;\n\
      varying float vY, vNormalDotZ;\n\
      const float THETAHEAD=0.25;\n\
      void main() {\n\
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0);\n\
        vec4 projectedPosition = projectionMatrix * mvPosition;\n\
        gl_Position = projectedPosition;\n\
        \n\
        // compute UV coordinates on the video texture:\n\
        vec4 mvPosition0 = modelViewMatrix * vec4( position, 1.0 );\n\
        vec4 projectedPosition0 = projectionMatrix * mvPosition0;\n\
        vUVvideo = vec2(0.5,0.5)+0.5*projectedPosition0.xy/projectedPosition0.w;\n\
        vY = position.y*cos(THETAHEAD)-position.z*sin(THETAHEAD);\n\
        vec3 normalView = vec3(modelViewMatrix * vec4(normal,0.));\n\
        vNormalDotZ = pow(abs(normalView.z), 1.5);\n\
      }';
      const fragmentShaderSource =
        'precision lowp float;\n\
      uniform sampler2D samplerVideo;\n\
      varying vec2 vUVvideo;\n\
      varying float vY, vNormalDotZ;\n\
      void main() {\n\
        vec3 videoColor = texture2D(samplerVideo, vUVvideo).rgb;\n\
        float darkenCoeff = smoothstep(-0.15, 0.05, vY);\n\
        float borderCoeff = smoothstep(0.0, 0.55, vNormalDotZ);\n\
        gl_FragColor = vec4(videoColor, 1 );\n\
        // gl_FragColor=vec4(borderCoeff, 0., 0., 1.);\n\
        // gl_FragColor=vec4(darkenCoeff, 0., 0., 1.);\n\
      }';
      const materialVideo = new THREE.ShaderMaterial({
        vertexShader: vertexShaderSource,
        fragmentShader: fragmentShaderSource,
        transparent: true,
        flatShading: false,
        uniforms: {
          samplerVideo: {
            value: THREE.JeelizHelper.get_threeVideoTexture()
          }
        },
        transparent: true
      });
      faceMesh = new THREE.Mesh(geometry, materialVideo);
    });
    loadingManager.onLoad = () => {
      Filters.halloween.MASKOBJ3D.add(faceMesh);
      Filters.halloween.MASKOBJ3D.add(smallSpiderMesh);
      Filters.halloween.MASKOBJ3D.add(bigSpiderMesh);
      Filters.halloween.MASKOBJ3D.scale.multiplyScalar(0.59);
      Filters.halloween.MASKOBJ3D.position.z -= 0.5;
      Filters.halloween.MASKOBJ3D.position.y += 0.4;
      threeStuffs.faceObject.add(Filters.halloween.MASKOBJ3D);
    };
    const createMat2d = (threeTexture, isTransparent) =>
      new THREE.RawShaderMaterial({
        depthWrite: false,
        depthTest: false,
        transparent: isTransparent,
        vertexShader:
          'attribute vec2 position;\n\
        varying vec2 vUV;\n\
        void main(void){\n\
          gl_Position = vec4(position, 0., 1.);\n\
          vUV = 0.5+0.5*position;\n\
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
    const calqueMesh = new THREE.Mesh(
      threeStuffs.videoMesh.geometry,
      createMat2d(
        new THREE.TextureLoader().load(
          Filters.halloween.BASE_URL + '/images/cadre_halloween.png'
        ),
        true
      )
    );
    calqueMesh.renderOrder = 999;
    calqueMesh.frustumCulled = false;
    threeStuffs.scene.add(calqueMesh);
    Filters.halloween.THREECAMERA = THREE.JeelizHelper.create_camera();
    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    threeStuffs.scene.add(ambient);
    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(100, 1000, 100);
    spotLight.castShadow = true;
    threeStuffs.scene.add(spotLight);
  },
  init: (callback) => {
    Filters.halloween.MASKOBJ3D = new THREE.Object3D();
    JeelizResizer.size_canvas({
      canvasId: 'jeeFaceFilterCanvas',
      callback: function (isError, bestVideoSettings) {
        Filters.halloween.initFaceFilter(bestVideoSettings, callback);
      }
    });
  },
  animateSpiders: () => {
    Filters.halloween.isAnimating = true;
    Filters.halloween.ACTIONS.forEach((action, index) => {
      action.loop = false;
      Filters.halloween.MIXERS[index].addEventListener('loop', () => {
        action.stop();
        action.reset();
        Filters.halloween.isAnimating = false;
      });
      action.play();
    });
  },
  initFaceFilter: (videoSettings, callback) => {
    JEEFACEFILTERAPI.init({
      canvasId: 'jeeFaceFilterCanvas',
      NNCpath: './jeelizFaceFilter/',
      videoSettings: videoSettings,
      callbackReady: function (errCode, spec) {
        if (errCode) return;
        Filters.halloween.initThreeScene(spec);
        if (callback) setTimeout(callback, 100);
      },
      callbackTrack: function (detectState) {
        Filters.halloween.ISDETECTED = THREE.JeelizHelper.get_isDetected();
        if (Filters.halloween.ISDETECTED) {
          if (detectState.expressions[0] >= 0.8 && !Filters.halloween.isAnimating) {
            Filters.halloween.animateSpiders();
          }
          if (Filters.halloween.MIXERS && Filters.halloween.MIXERS.length > 0) {
            Filters.halloween.MIXERS.forEach((mixer) => {
              mixer.update(0.08);
            });
          }
        }
        THREE.JeelizHelper.render(detectState, Filters.halloween.THREECAMERA);
      }
    });
  }
};
