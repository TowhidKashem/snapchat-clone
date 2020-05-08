'use strict';

(function () {
  const BASE_URL = './jeelizFaceFilter/filters/halloween';
  const openMouth = document.querySelector('#open-mouth');

  let THREECAMERA = null;
  let ISDETECTED = false;

  const MIXERS = [];
  const ACTIONS = [];
  let MASKOBJ3D = null;
  let isAnimating = false;

  function init_threeScene(spec) {
    const threeStuffs = THREE.JeelizHelper.init(spec);

    const loadingManager = new THREE.LoadingManager();

    let smallSpiderMesh;
    const smallSpiderLoader = new THREE.JSONLoader(loadingManager);
    smallSpiderLoader.load(
      BASE_URL + '/models/small_spider/small_spider.json',
      (geometry) => {
        const material = new THREE.MeshBasicMaterial({
          map: new THREE.TextureLoader().load(
            BASE_URL + '/models/small_spider/diffuse_spider.jpg'
          ),
          morphTargets: true
        });

        smallSpiderMesh = new THREE.Mesh(geometry, material);
        smallSpiderMesh.frustumCulled = false;
        smallSpiderMesh.position.y -= 0.2;

        const mixer = new THREE.AnimationMixer(smallSpiderMesh);

        const clip = smallSpiderMesh.geometry.animations[0];
        const action = mixer.clipAction(clip);

        MIXERS.push(mixer);
        ACTIONS.push(action);
      }
    );

    let bigSpiderMesh;
    const bigSpiderLoader = new THREE.JSONLoader(loadingManager);
    bigSpiderLoader.load(BASE_URL + '/models/big_spider/big_spider.json', (geometry) => {
      const material = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(
          BASE_URL + '/models/big_spider/diffuse_spider.jpg'
        ),
        morphTargets: true
      });

      bigSpiderMesh = new THREE.Mesh(geometry, material);
      bigSpiderMesh.frustumCulled = false;

      const mixer = new THREE.AnimationMixer(bigSpiderMesh);

      const clip = bigSpiderMesh.geometry.animations[0];
      const action = mixer.clipAction(clip);

      MIXERS.push(mixer);
      ACTIONS.push(action);
    });

    let faceMesh = null;
    const faceLoader = new THREE.BufferGeometryLoader(loadingManager);
    faceLoader.load(BASE_URL + '/models/face/face.json', (geometry) => {
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
      MASKOBJ3D.add(faceMesh);
      MASKOBJ3D.add(smallSpiderMesh);
      MASKOBJ3D.add(bigSpiderMesh);

      MASKOBJ3D.scale.multiplyScalar(0.59);
      MASKOBJ3D.position.z -= 0.5;
      MASKOBJ3D.position.y += 0.4;

      threeStuffs.faceObject.add(MASKOBJ3D);
    };

    function create_mat2d(threeTexture, isTransparent) {
      return new THREE.RawShaderMaterial({
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
    }

    const calqueMesh = new THREE.Mesh(
      threeStuffs.videoMesh.geometry,
      create_mat2d(
        new THREE.TextureLoader().load(BASE_URL + '/images/cadre_halloween.png'),
        true
      )
    );
    calqueMesh.renderOrder = 999;
    calqueMesh.frustumCulled = false;
    threeStuffs.scene.add(calqueMesh);

    THREECAMERA = THREE.JeelizHelper.create_camera();

    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    threeStuffs.scene.add(ambient);

    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(100, 1000, 100);
    spotLight.castShadow = true;
    threeStuffs.scene.add(spotLight);
  }

  function main() {
    MASKOBJ3D = new THREE.Object3D();
    JeelizResizer.size_canvas({
      canvasId: 'jeeFaceFilterCanvas',
      callback: function (isError, bestVideoSettings) {
        init_faceFilter(bestVideoSettings);
      }
    });
  }

  function animateSpiders() {
    openMouth.style.opacity = '0';

    isAnimating = true;

    ACTIONS.forEach((action, index) => {
      action.loop = false;

      MIXERS[index].addEventListener('loop', () => {
        action.stop();
        action.reset();
        isAnimating = false;
      });

      action.play();
    });
  }

  function init_faceFilter(videoSettings) {
    JEEFACEFILTERAPI.init({
      canvasId: 'jeeFaceFilterCanvas',
      NNCpath: './jeelizFaceFilter/dist/',
      videoSettings: videoSettings,
      callbackReady: function (errCode, spec) {
        if (errCode) return;
        init_threeScene(spec);
      },

      callbackTrack: function (detectState) {
        ISDETECTED = THREE.JeelizHelper.get_isDetected();

        if (ISDETECTED) {
          if (detectState.expressions[0] >= 0.8 && !isAnimating) {
            animateSpiders();
            openMouth.style.opacity = 0;
          }
          if (MIXERS && MIXERS.length > 0) {
            MIXERS.forEach((mixer) => {
              mixer.update(0.08);
            });
          }
        }

        THREE.JeelizHelper.render(detectState, THREECAMERA);
      }
    });
  }

  main();
})();
