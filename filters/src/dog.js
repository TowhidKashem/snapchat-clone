'use strict';

var Filters = window.Filters || {};

Filters.dog = {
  BASE_URL: './filters/jeelizFaceFilter/demos/threejs/dog_face',
  THREECAMERA: null,
  ISDETECTED: false,
  TONGUEMESH: null,
  NOSEMESH: null,
  EARMESH: null,
  DOGOBJ3D: null,
  FRAMEOBJ3D: null,
  ISOVERTHRESHOLD: false,
  ISUNDERTRESHOLD: true,
  ISLOADED: false,
  MIXER: null,
  ACTION: null,
  ISANIMATING: false,
  ISOPAQUE: false,
  ISTONGUEOUT: false,
  ISANIMATIONOVER: false,
  createMat2d: (threeTexture, isTransparent) =>
    new THREE.RawShaderMaterial({
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
    }),
  applyFilter: () => {
    let canvas;
    try {
      canvas = fx.canvas();
    } catch (e) {
      alert("Ow no! WebGL isn't supported...");
      return;
    }
    const tempImage = new Image(512, 512);
    tempImage.src = Filters.dog.BASE_URL + '/images/texture_pink.jpg';
    tempImage.onload = () => {
      const texture = canvas.texture(tempImage);
      canvas.draw(texture).vignette(0.5, 0.6).update();
      const canvasOpacity = document.createElement('canvas');
      canvasOpacity.width = 512;
      canvasOpacity.height = 512;
      const ctx = canvasOpacity.getContext('2d');
      ctx.globalAlpha = 0.2;
      ctx.drawImage(canvas, 0, 0, 512, 512);
      // const calqueMesh = new THREE.Mesh(
      //   THREESTUFF.videoMesh.geometry,
      //   Filters.dog.createMat2d(
      //     new THREE.TextureLoader().load(canvasOpacity.toDataURL('image/png')),
      //     true
      //   )
      // );
      // calqueMesh.material.opacity = 0.2;
      // calqueMesh.material.transparent = true;
      // calqueMesh.renderOrder = 999;
      // calqueMesh.frustumCulled = false;
      // Filters.dog.FRAMEOBJ3D.add(calqueMesh);
    };
  },
  initThreeScene: (spec) => {
    const threeStuffs = THREE.JeelizHelper.init(spec);
    const loadingManager = new THREE.LoadingManager();
    const loaderEars = new THREE.BufferGeometryLoader(loadingManager);
    loaderEars.load(Filters.dog.BASE_URL + '/models/dog/dog_ears.json', function (
      geometry
    ) {
      const mat = new THREE.FlexMaterial({
        map: new THREE.TextureLoader().load(
          Filters.dog.BASE_URL + '/models/dog/texture_ears.jpg'
        ),
        flexMap: new THREE.TextureLoader().load(
          Filters.dog.BASE_URL + '/models/dog/flex_ears_256.jpg'
        ),
        alphaMap: new THREE.TextureLoader().load(
          Filters.dog.BASE_URL + '/models/dog/alpha_ears_256.jpg'
        ),
        transparent: true,
        opacity: 1,
        bumpMap: new THREE.TextureLoader().load(
          Filters.dog.BASE_URL + '/models/dog/normal_ears.jpg'
        ),
        bumpScale: 0.0075,
        shininess: 1.5,
        specular: 0xffffff
      });
      Filters.dog.EARMESH = new THREE.Mesh(geometry, mat);
      Filters.dog.EARMESH.scale.multiplyScalar(0.025);
      Filters.dog.EARMESH.position.setY(-0.3);
      Filters.dog.EARMESH.frustumCulled = false;
      Filters.dog.EARMESH.renderOrder = 10000;
      Filters.dog.EARMESH.material.opacity.value = 1;
    });
    const loaderNose = new THREE.BufferGeometryLoader(loadingManager);
    loaderNose.load(Filters.dog.BASE_URL + '/models/dog/dog_nose.json', function (
      geometry
    ) {
      const mat = new THREE.MeshPhongMaterial({
        map: new THREE.TextureLoader().load(
          Filters.dog.BASE_URL + '/models/dog/texture_nose.jpg'
        ),
        shininess: 1.5,
        specular: 0xffffff,
        bumpMap: new THREE.TextureLoader().load(
          Filters.dog.BASE_URL + '/models/dog/normal_nose.jpg'
        ),
        bumpScale: 0.005
      });
      Filters.dog.NOSEMESH = new THREE.Mesh(geometry, mat);
      Filters.dog.NOSEMESH.scale.multiplyScalar(0.018);
      Filters.dog.NOSEMESH.position.setY(-0.05);
      Filters.dog.NOSEMESH.position.setZ(0.15);
      Filters.dog.NOSEMESH.frustumCulled = false;
      Filters.dog.NOSEMESH.renderOrder = 10000;
    });
    const loaderTongue = new THREE.JSONLoader(loadingManager);
    loaderTongue.load(Filters.dog.BASE_URL + '/models/dog/dog_tongue.json', function (
      geometry
    ) {
      geometry.computeMorphNormals();
      const mat = new THREE.FlexMaterial({
        map: new THREE.TextureLoader().load(
          Filters.dog.BASE_URL + '/models/dog/dog_tongue.jpg'
        ),
        flexMap: new THREE.TextureLoader().load(
          Filters.dog.BASE_URL + '/models/dog/flex_tongue_256.png'
        ),
        alphaMap: new THREE.TextureLoader().load(
          Filters.dog.BASE_URL + '/models/dog/tongue_alpha_256.jpg'
        ),
        transparent: true,
        morphTargets: true,
        opacity: 1
      });
      Filters.dog.TONGUEMESH = new THREE.Mesh(geometry, mat);
      Filters.dog.TONGUEMESH.material.opacity.value = 0;
      Filters.dog.TONGUEMESH.scale.multiplyScalar(2);
      Filters.dog.TONGUEMESH.position.setY(-0.28);
      Filters.dog.TONGUEMESH.frustumCulled = false;
      Filters.dog.TONGUEMESH.visible = false;
      if (!Filters.dog.MIXER) {
        Filters.dog.MIXER = new THREE.AnimationMixer(Filters.dog.TONGUEMESH);
        const clips = Filters.dog.TONGUEMESH.geometry.animations;
        const clip = clips[0];
        Filters.dog.ACTION = Filters.dog.MIXER.clipAction(clip);
        Filters.dog.ACTION.noLoop = true;
        Filters.dog.ACTION.play();
      }
    });
    loadingManager.onLoad = () => {
      Filters.dog.DOGOBJ3D.add(Filters.dog.EARMESH);
      Filters.dog.DOGOBJ3D.add(Filters.dog.NOSEMESH);
      Filters.dog.DOGOBJ3D.add(Filters.dog.TONGUEMESH);
      addDragEventListener(Filters.dog.DOGOBJ3D);
      threeStuffs.faceObject.add(Filters.dog.DOGOBJ3D);
      Filters.dog.ISLOADED = true;
    };
    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    threeStuffs.scene.add(ambient);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
    dirLight.position.set(100, 1000, 1000);
    threeStuffs.scene.add(dirLight);
    Filters.dog.THREECAMERA = THREE.JeelizHelper.create_camera();
    threeStuffs.scene.add(Filters.dog.FRAMEOBJ3D);
    Filters.dog.applyFilter();
  },
  animateTongue: (mesh, isReverse) => {
    mesh.visible = true;
    if (isReverse) {
      Filters.dog.ACTION.timescale = -1;
      Filters.dog.ACTION.paused = false;
      setTimeout(() => {
        Filters.dog.ACTION.paused = true;
        Filters.dog.ISOPAQUE = false;
        Filters.dog.ISTONGUEOUT = false;
        Filters.dog.ISANIMATING = false;
        Filters.dog.ISANIMATIONOVER = true;
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
      Filters.dog.ACTION.timescale = 1;
      Filters.dog.ACTION.reset();
      Filters.dog.ACTION.paused = false;
      new TWEEN.Tween(mesh.material.opacity)
        .to(
          {
            value: 1
          },
          100
        )
        .onComplete(() => {
          Filters.dog.ISOPAQUE = true;
          setTimeout(() => {
            Filters.dog.ACTION.paused = true;
            Filters.dog.ISANIMATING = false;
            Filters.dog.ISTONGUEOUT = true;
            Filters.dog.ISANIMATIONOVER = true;
          }, 150);
        })
        .start();
    }
  },
  init: (callback) => {
    Filters.dog.DOGOBJ3D = new THREE.Object3D();
    Filters.dog.FRAMEOBJ3D = new THREE.Object3D();
    JeelizResizer.size_canvas({
      canvasId: 'filter-canvas',
      callback: function (isError, bestVideoSettings) {
        Filters.dog.initFaceFilter(bestVideoSettings, callback);
      }
    });
  },
  initFaceFilter: (videoSettings, callback) => {
    JEEFACEFILTERAPI.init({
      canvasId: 'filter-canvas',
      NNCpath: './filters/jeelizFaceFilter/dist/',
      videoSettings: videoSettings,
      callbackReady: function (errCode, spec) {
        if (errCode) return;
        Filters.dog.initThreeScene(spec);
        if (callback) setTimeout(callback, 100);
      },
      callbackTrack: function (detectState) {
        Filters.dog.ISDETECTED = THREE.JeelizHelper.get_isDetected();
        if (Filters.dog.ISDETECTED) {
          const _quat = new THREE.Quaternion();
          const _eul = new THREE.Euler();
          _eul.setFromQuaternion(_quat);
          if (Filters.dog.EARMESH && Filters.dog.EARMESH.material.set_amortized) {
            Filters.dog.EARMESH.material.set_amortized(
              Filters.dog.EARMESH.getWorldPosition(new THREE.Vector3(0, 0, 0)),
              Filters.dog.EARMESH.getWorldScale(new THREE.Vector3(0, 0, 0)),
              Filters.dog.EARMESH.getWorldQuaternion(_eul),
              false,
              0.1
            );
          }
          if (Filters.dog.TONGUEMESH && Filters.dog.TONGUEMESH.material.set_amortized) {
            Filters.dog.TONGUEMESH.material.set_amortized(
              Filters.dog.TONGUEMESH.getWorldPosition(new THREE.Vector3(0, 0, 0)),
              Filters.dog.TONGUEMESH.getWorldScale(new THREE.Vector3(0, 0, 0)),
              Filters.dog.TONGUEMESH.getWorldQuaternion(_eul),
              false,
              0.3
            );
          }
          if (detectState.expressions[0] >= 0.85 && !Filters.dog.ISOVERTHRESHOLD) {
            Filters.dog.ISOVERTHRESHOLD = true;
            Filters.dog.ISUNDERTRESHOLD = false;
            Filters.dog.ISANIMATIONOVER = false;
          }
          if (detectState.expressions[0] <= 0.1 && !Filters.dog.ISUNDERTRESHOLD) {
            Filters.dog.ISOVERTHRESHOLD = false;
            Filters.dog.ISUNDERTRESHOLD = true;
            Filters.dog.ISANIMATIONOVER = false;
          }
          if (
            Filters.dog.ISLOADED &&
            Filters.dog.ISOVERTHRESHOLD &&
            !Filters.dog.ISANIMATING &&
            !Filters.dog.ISANIMATIONOVER
          ) {
            if (!Filters.dog.ISTONGUEOUT) {
              Filters.dog.ISANIMATING = true;
              Filters.dog.animateTongue(Filters.dog.TONGUEMESH);
            } else {
              Filters.dog.ISANIMATING = true;
              Filters.dog.animateTongue(Filters.dog.TONGUEMESH, true);
            }
          }
        }
        TWEEN.update();
        if (Filters.dog.ISOPAQUE) {
          Filters.dog.MIXER.update(0.16);
        }
        THREE.JeelizHelper.render(detectState, Filters.dog.THREECAMERA);
      }
    });
  }
};
