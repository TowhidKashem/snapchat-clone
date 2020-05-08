'use strict';

(function () {
  const BASE_URL = './jeelizFaceFilter/filters/dog';

  let THREECAMERA = null;
  let ISDETECTED = false;
  let TONGUEMESH = null,
    NOSEMESH = null,
    EARMESH = null;
  let DOGOBJ3D = null,
    FRAMEOBJ3D = null;

  let ISOVERTHRESHOLD = false,
    ISUNDERTRESHOLD = true;

  let ISLOADED = false;

  let MIXER = null;
  let ACTION = null;

  let ISANIMATING = false;
  let ISOPAQUE = false;
  let ISTONGUEOUT = false;
  let ISANIMATIONOVER = false;

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
        gl_FragColor=texture2D(samplerVideo, vUV);\n\
      }',
      uniforms: {
        samplerVideo: {
          value: threeTexture
        }
      }
    });
  }

  function applyFilter() {
    let canvas;
    try {
      canvas = fx.canvas();
    } catch (e) {
      alert("Ow no! WebGL isn't supported...");
      return;
    }

    const tempImage = new Image(512, 512);
    tempImage.src = BASE_URL + '/images/texture_pink.jpg';

    tempImage.onload = () => {
      const texture = canvas.texture(tempImage);

      canvas.draw(texture).vignette(0.5, 0.6).update();

      const canvasOpacity = document.createElement('canvas');
      canvasOpacity.width = 512;
      canvasOpacity.height = 512;
      const ctx = canvasOpacity.getContext('2d');

      ctx.globalAlpha = 0.2;
      ctx.drawImage(canvas, 0, 0, 512, 512);

      const calqueMesh = new THREE.Mesh(
        THREESTUFF.videoMesh.geometry,
        create_mat2d(
          new THREE.TextureLoader().load(canvasOpacity.toDataURL('image/png')),
          true
        )
      );
      calqueMesh.material.opacity = 0.2;
      calqueMesh.material.transparent = true;
      calqueMesh.renderOrder = 999;
      calqueMesh.frustumCulled = false;
      FRAMEOBJ3D.add(calqueMesh);
    };
  }

  function init_threeScene(spec) {
    const threeStuffs = THREE.JeelizHelper.init(spec);
    const loadingManager = new THREE.LoadingManager();
    const loaderEars = new THREE.BufferGeometryLoader(loadingManager);

    loaderEars.load(BASE_URL + '/models/dog/dog_ears.json', function (geometry) {
      const mat = new THREE.FlexMaterial({
        map: new THREE.TextureLoader().load(BASE_URL + '/models/dog/texture_ears.jpg'),
        flexMap: new THREE.TextureLoader().load(
          BASE_URL + '/models/dog/flex_ears_256.jpg'
        ),
        alphaMap: new THREE.TextureLoader().load(
          BASE_URL + '/models/dog/alpha_ears_256.jpg'
        ),
        transparent: true,
        opacity: 1,
        bumpMap: new THREE.TextureLoader().load(BASE_URL + '/models/dog/normal_ears.jpg'),
        bumpScale: 0.0075,
        shininess: 1.5,
        specular: 0xffffff
      });

      EARMESH = new THREE.Mesh(geometry, mat);
      EARMESH.scale.multiplyScalar(0.025);
      EARMESH.position.setY(-0.3);
      EARMESH.frustumCulled = false;
      EARMESH.renderOrder = 10000;
      EARMESH.material.opacity.value = 1;
    });

    const loaderNose = new THREE.BufferGeometryLoader(loadingManager);

    loaderNose.load(BASE_URL + '/models/dog/dog_nose.json', function (geometry) {
      const mat = new THREE.MeshPhongMaterial({
        map: new THREE.TextureLoader().load(BASE_URL + '/models/dog/texture_nose.jpg'),
        shininess: 1.5,
        specular: 0xffffff,
        bumpMap: new THREE.TextureLoader().load(BASE_URL + '/models/dog/normal_nose.jpg'),
        bumpScale: 0.005
      });

      NOSEMESH = new THREE.Mesh(geometry, mat);
      NOSEMESH.scale.multiplyScalar(0.018);
      NOSEMESH.position.setY(-0.05);
      NOSEMESH.position.setZ(0.15);
      NOSEMESH.frustumCulled = false;
      NOSEMESH.renderOrder = 10000;
    });

    const loaderTongue = new THREE.JSONLoader(loadingManager);

    loaderTongue.load(BASE_URL + '/models/dog/dog_tongue.json', function (geometry) {
      geometry.computeMorphNormals();
      const mat = new THREE.FlexMaterial({
        map: new THREE.TextureLoader().load(BASE_URL + '/models/dog/dog_tongue.jpg'),
        flexMap: new THREE.TextureLoader().load(
          BASE_URL + '/models/dog/flex_tongue_256.png'
        ),
        alphaMap: new THREE.TextureLoader().load(
          BASE_URL + '/models/dog/tongue_alpha_256.jpg'
        ),
        transparent: true,
        morphTargets: true,
        opacity: 1
      });

      TONGUEMESH = new THREE.Mesh(geometry, mat);
      TONGUEMESH.material.opacity.value = 0;

      TONGUEMESH.scale.multiplyScalar(2);
      TONGUEMESH.position.setY(-0.28);

      TONGUEMESH.frustumCulled = false;
      TONGUEMESH.visible = false;

      if (!MIXER) {
        MIXER = new THREE.AnimationMixer(TONGUEMESH);
        const clips = TONGUEMESH.geometry.animations;

        const clip = clips[0];

        ACTION = MIXER.clipAction(clip);
        ACTION.noLoop = true;

        ACTION.play();
      }
    });

    loadingManager.onLoad = () => {
      DOGOBJ3D.add(EARMESH);
      DOGOBJ3D.add(NOSEMESH);
      DOGOBJ3D.add(TONGUEMESH);

      addDragEventListener(DOGOBJ3D);

      threeStuffs.faceObject.add(DOGOBJ3D);

      ISLOADED = true;
    };

    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    threeStuffs.scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
    dirLight.position.set(100, 1000, 1000);
    threeStuffs.scene.add(dirLight);

    THREECAMERA = THREE.JeelizHelper.create_camera();

    threeStuffs.scene.add(FRAMEOBJ3D);

    applyFilter();
  }

  function animateTongue(mesh, isReverse) {
    mesh.visible = true;

    if (isReverse) {
      ACTION.timescale = -1;
      ACTION.paused = false;

      setTimeout(() => {
        ACTION.paused = true;

        ISOPAQUE = false;
        ISTONGUEOUT = false;
        ISANIMATING = false;
        ISANIMATIONOVER = true;

        new TWEEN.Tween(mesh.material.opacity)
          .to(
            {
              value: 0
            },
            150
          )
          .start();
      }, 150);
    } else {
      ACTION.timescale = 1;
      ACTION.reset();
      ACTION.paused = false;

      new TWEEN.Tween(mesh.material.opacity)
        .to(
          {
            value: 1
          },
          100
        )
        .onComplete(() => {
          ISOPAQUE = true;
          setTimeout(() => {
            ACTION.paused = true;
            ISANIMATING = false;
            ISTONGUEOUT = true;
            ISANIMATIONOVER = true;
          }, 150);
        })
        .start();
    }
  }

  function main() {
    DOGOBJ3D = new THREE.Object3D();
    FRAMEOBJ3D = new THREE.Object3D();

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
        if (errCode) return;
        init_threeScene(spec);
      },

      callbackTrack: function (detectState) {
        ISDETECTED = THREE.JeelizHelper.get_isDetected();

        if (ISDETECTED) {
          const _quat = new THREE.Quaternion();
          const _eul = new THREE.Euler();
          _eul.setFromQuaternion(_quat);

          if (EARMESH && EARMESH.material.set_amortized) {
            EARMESH.material.set_amortized(
              EARMESH.getWorldPosition(new THREE.Vector3(0, 0, 0)),
              EARMESH.getWorldScale(new THREE.Vector3(0, 0, 0)),
              EARMESH.getWorldQuaternion(_eul),
              false,
              0.1
            );
          }

          if (TONGUEMESH && TONGUEMESH.material.set_amortized) {
            TONGUEMESH.material.set_amortized(
              TONGUEMESH.getWorldPosition(new THREE.Vector3(0, 0, 0)),
              TONGUEMESH.getWorldScale(new THREE.Vector3(0, 0, 0)),
              TONGUEMESH.getWorldQuaternion(_eul),
              false,
              0.3
            );
          }

          if (detectState.expressions[0] >= 0.85 && !ISOVERTHRESHOLD) {
            ISOVERTHRESHOLD = true;
            ISUNDERTRESHOLD = false;
            ISANIMATIONOVER = false;
          }
          if (detectState.expressions[0] <= 0.1 && !ISUNDERTRESHOLD) {
            ISOVERTHRESHOLD = false;
            ISUNDERTRESHOLD = true;
            ISANIMATIONOVER = false;
          }

          if (ISLOADED && ISOVERTHRESHOLD && !ISANIMATING && !ISANIMATIONOVER) {
            if (!ISTONGUEOUT) {
              ISANIMATING = true;
              animateTongue(TONGUEMESH);
            } else {
              ISANIMATING = true;
              animateTongue(TONGUEMESH, true);
            }
          }
        }

        TWEEN.update();

        if (ISOPAQUE) {
          MIXER.update(0.16);
        }

        THREE.JeelizHelper.render(detectState, THREECAMERA);
      }
    });
  }

  main();
})();
