'use strict';

const BASE_URL = './jeelizFaceFilter/demos/threejs/dog_face';
let THREECAMERA = null,
  ISDETECTED = !1,
  TONGUEMESH = null,
  NOSEMESH = null,
  EARMESH = null,
  DOGOBJ3D = null,
  FRAMEOBJ3D = null,
  ISOVERTHRESHOLD = !1,
  ISUNDERTRESHOLD = !0,
  ISLOADED = !1,
  MIXER = null,
  ACTION = null,
  ISANIMATING = !1,
  ISOPAQUE = !1,
  ISTONGUEOUT = !1,
  ISANIMATIONOVER = !1,
  _flexParts = [];

function detect_callback(e) {
  e
    ? console.log('INFO in detect_callback(): DETECTED')
    : console.log('INFO in detect_callback(): LOST');
}

function create_mat2d(e, E) {
  return new THREE.RawShaderMaterial({
    depthWrite: !1,
    depthTest: !1,
    transparent: E,
    vertexShader:
      'attribute vec2 position;\n      varying vec2 vUV;\n      void main(void){\n        gl_Position=vec4(position, 0., 1.);\n        vUV=0.5+0.5*position;\n      }',
    fragmentShader:
      'precision lowp float;\n      uniform sampler2D samplerVideo;\n      varying vec2 vUV;\n      void main(void){\n        gl_FragColor=texture2D(samplerVideo, vUV);\n      }',
    uniforms: {
      samplerVideo: {
        value: e
      }
    }
  });
}

function applyFilter() {
  let e;
  try {
    e = fx.canvas();
  } catch (e) {
    return void alert("Ow no! WebGL isn't supported...");
  }
  const E = new Image(512, 512);
  (E.src = `${BASE_URL}/images/texture_pink.jpg`),
    (E.onload = () => {
      const a = e.texture(E);
      e.draw(a).vignette(0.5, 0.6).update();
      const t = document.createElement('canvas');
      (t.width = 512), (t.height = 512);
      const n = t.getContext('2d');
      (n.globalAlpha = 0.2), n.drawImage(e, 0, 0, 512, 512);
      const o = new THREE.Mesh(
        THREESTUFF.videoMesh.geometry,
        create_mat2d(new THREE.TextureLoader().load(t.toDataURL('image/png')), !0)
      );
      (o.material.opacity = 0.2),
        (o.material.transparent = !0),
        (o.renderOrder = 999),
        (o.frustumCulled = !1),
        FRAMEOBJ3D.add(o);
    });
}

function init_threeScene(e) {
  const E = THREE.JeelizHelper.init(e, detect_callback),
    a = new THREE.LoadingManager();
  new THREE.BufferGeometryLoader(a).load(
    `${BASE_URL}/models/dog/dog_ears.json`,
    function (e) {
      const E = new THREE.FlexMaterial({
        map: new THREE.TextureLoader().load(`${BASE_URL}/models/dog/texture_ears.jpg`),
        flexMap: new THREE.TextureLoader().load(
          `${BASE_URL}/models/dog/flex_ears_256.jpg`
        ),
        alphaMap: new THREE.TextureLoader().load(
          `${BASE_URL}/models/dog/alpha_ears_256.jpg`
        ),
        transparent: !0,
        opacity: 1,
        bumpMap: new THREE.TextureLoader().load(`${BASE_URL}/models/dog/normal_ears.jpg`),
        bumpScale: 0.0075,
        shininess: 1.5,
        specular: 16777215
      });
      (EARMESH = new THREE.Mesh(e, E)).scale.multiplyScalar(0.025),
        EARMESH.position.setY(-0.3),
        (EARMESH.frustumCulled = !1),
        (EARMESH.renderOrder = 1e4),
        (EARMESH.material.opacity.value = 1);
    }
  ),
    new THREE.BufferGeometryLoader(a).load(
      `${BASE_URL}/models/dog/dog_nose.json`,
      function (e) {
        const E = new THREE.MeshPhongMaterial({
          map: new THREE.TextureLoader().load(`${BASE_URL}/models/dog/texture_nose.jpg`),
          shininess: 1.5,
          specular: 16777215,
          bumpMap: new THREE.TextureLoader().load(
            `${BASE_URL}/models/dog/normal_nose.jpg`
          ),
          bumpScale: 0.005
        });
        (NOSEMESH = new THREE.Mesh(e, E)).scale.multiplyScalar(0.018),
          NOSEMESH.position.setY(-0.05),
          NOSEMESH.position.setZ(0.15),
          (NOSEMESH.frustumCulled = !1),
          (NOSEMESH.renderOrder = 1e4);
      }
    ),
    new THREE.JSONLoader(a).load(`${BASE_URL}/models/dog/dog_tongue.json`, function (e) {
      e.computeMorphNormals();
      const E = new THREE.FlexMaterial({
        map: new THREE.TextureLoader().load(`${BASE_URL}/models/dog/dog_tongue.jpg`),
        flexMap: new THREE.TextureLoader().load(
          `${BASE_URL}/models/dog/flex_tongue_256.png`
        ),
        alphaMap: new THREE.TextureLoader().load(
          `${BASE_URL}/models/dog/tongue_alpha_256.jpg`
        ),
        transparent: !0,
        morphTargets: !0,
        opacity: 1
      });
      if (
        (((TONGUEMESH = new THREE.Mesh(e, E)).material.opacity.value = 0),
        TONGUEMESH.scale.multiplyScalar(2),
        TONGUEMESH.position.setY(-0.28),
        (TONGUEMESH.frustumCulled = !1),
        (TONGUEMESH.visible = !1),
        !MIXER)
      ) {
        MIXER = new THREE.AnimationMixer(TONGUEMESH);
        const e = TONGUEMESH.geometry.animations[0];
        ((ACTION = MIXER.clipAction(e)).noLoop = !0), ACTION.play();
      }
    }),
    (a.onLoad = () => {
      DOGOBJ3D.add(EARMESH),
        DOGOBJ3D.add(NOSEMESH),
        DOGOBJ3D.add(TONGUEMESH),
        addDragEventListener(DOGOBJ3D),
        E.faceObject.add(DOGOBJ3D),
        (ISLOADED = !0);
    });
  const t = new THREE.AmbientLight(16777215, 0.8);
  E.scene.add(t);
  const n = new THREE.DirectionalLight(16777215, 0.5);
  n.position.set(100, 1e3, 1e3),
    E.scene.add(n),
    (THREECAMERA = THREE.JeelizHelper.create_camera()),
    E.scene.add(FRAMEOBJ3D),
    applyFilter();
}

function animateTongue(e, E) {
  (e.visible = !0),
    E
      ? ((ACTION.timescale = -1),
        (ACTION.paused = !1),
        setTimeout(() => {
          (ACTION.paused = !0),
            (ISOPAQUE = !1),
            (ISTONGUEOUT = !1),
            (ISANIMATING = !1),
            (ISANIMATIONOVER = !0),
            new TWEEN.Tween(e.material.opacity)
              .to(
                {
                  value: 0
                },
                150
              )
              .start();
        }, 150))
      : ((ACTION.timescale = 1),
        ACTION.reset(),
        (ACTION.paused = !1),
        new TWEEN.Tween(e.material.opacity)
          .to(
            {
              value: 1
            },
            100
          )
          .onComplete(() => {
            (ISOPAQUE = !0),
              setTimeout(() => {
                (ACTION.paused = !0),
                  (ISANIMATING = !1),
                  (ISTONGUEOUT = !0),
                  (ISANIMATIONOVER = !0);
              }, 150);
          })
          .start());
}

function main() {
  (DOGOBJ3D = new THREE.Object3D()),
    (FRAMEOBJ3D = new THREE.Object3D()),
    JeelizResizer.size_canvas({
      canvasId: 'jeeFaceFilterCanvas',
      callback: function (e, E) {
        init_faceFilter(E);
      }
    });
}

function init_faceFilter(e) {
  JEEFACEFILTERAPI.init({
    canvasId: 'jeeFaceFilterCanvas',
    NNCpath: './jeelizFaceFilter/dist/',
    videoSettings: e,
    callbackReady: function (e, E) {
      e
        ? console.log('AN ERROR HAPPENS. SORRY BRO :( . ERR =', e)
        : (console.log('INFO: JEEFACEFILTERAPI IS READY'), init_threeScene(E));
    },
    callbackTrack: function (e) {
      if ((ISDETECTED = THREE.JeelizHelper.get_isDetected())) {
        const E = new THREE.Quaternion(),
          a = new THREE.Euler();
        a.setFromQuaternion(E),
          EARMESH &&
            EARMESH.material.set_amortized &&
            EARMESH.material.set_amortized(
              EARMESH.getWorldPosition(new THREE.Vector3(0, 0, 0)),
              EARMESH.getWorldScale(new THREE.Vector3(0, 0, 0)),
              EARMESH.getWorldQuaternion(a),
              !1,
              0.1
            ),
          TONGUEMESH &&
            TONGUEMESH.material.set_amortized &&
            TONGUEMESH.material.set_amortized(
              TONGUEMESH.getWorldPosition(new THREE.Vector3(0, 0, 0)),
              TONGUEMESH.getWorldScale(new THREE.Vector3(0, 0, 0)),
              TONGUEMESH.getWorldQuaternion(a),
              !1,
              0.3
            ),
          e.expressions[0] >= 0.85 &&
            !ISOVERTHRESHOLD &&
            ((ISOVERTHRESHOLD = !0), (ISUNDERTRESHOLD = !1), (ISANIMATIONOVER = !1)),
          e.expressions[0] <= 0.1 &&
            !ISUNDERTRESHOLD &&
            ((ISOVERTHRESHOLD = !1), (ISUNDERTRESHOLD = !0), (ISANIMATIONOVER = !1)),
          ISLOADED &&
            ISOVERTHRESHOLD &&
            !ISANIMATING &&
            !ISANIMATIONOVER &&
            (ISTONGUEOUT
              ? ((ISANIMATING = !0), animateTongue(TONGUEMESH, !0))
              : ((ISANIMATING = !0), animateTongue(TONGUEMESH)));
      }
      TWEEN.update(),
        ISOPAQUE && MIXER.update(0.16),
        THREE.JeelizHelper.render(e, THREECAMERA);
    }
  });
}
