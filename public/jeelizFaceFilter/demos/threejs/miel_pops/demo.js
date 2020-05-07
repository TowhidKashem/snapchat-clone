'use strict';
const BASE_URL = './jeelizFaceFilter/demos/threejs/miel_pops',
  SETTINGS = {
    numberBees: 8
  };
let THREECAMERA = null,
  GLASSESOBJ3D = null;
const ACTIONS = [],
  MIXERS = [];
let ISANIMATED = !1,
  BEEMESH = null,
  BEEOBJ3D = null;

function detect_callback(e) {
  e
    ? console.log('INFO in detect_callback(): DETECTED')
    : console.log('INFO in detect_callback(): LOST');
}

function init_threeScene(e) {
  const a = THREE.JeelizHelper.init(e, detect_callback);
  let n = null,
    t = null,
    s = null,
    l = null;
  const o = new THREE.LoadingManager();
  new THREE.BufferGeometryLoader(o).load(`${BASE_URL}/models/glasses/frame.json`, (e) => {
    const a = new THREE.MeshPhongMaterial({
      color: 0,
      shininess: 2,
      specular: 16777215,
      transparent: !0
    });
    (n = new THREE.Mesh(e, a)).scale.multiplyScalar(0.0067),
      (n.frustumCulled = !1),
      (n.renderOrder = 1e4);
  }),
    new THREE.BufferGeometryLoader(o).load(
      `${BASE_URL}/models/glasses/lenses.json`,
      (e) => {
        const a = new THREE.MeshBasicMaterial({
          map: new THREE.TextureLoader().load(`${BASE_URL}/models/glasses/texture_mp.jpg`)
        });
        (t = new THREE.Mesh(e, a)).scale.multiplyScalar(0.0067),
          (t.frustumCulled = !1),
          (t.renderOrder = 1e4);
      }
    ),
    new THREE.BufferGeometryLoader(o).load(
      `${BASE_URL}/models/glasses/branches.json`,
      (e) => {
        const a = new THREE.MeshBasicMaterial({
          alphaMap: new THREE.TextureLoader().load(
            `${BASE_URL}/models/glasses/alpha_branches.jpg`
          ),
          map: new THREE.TextureLoader().load(
            `${BASE_URL}/models/glasses/textureBlack.jpg`
          ),
          transparent: !0
        });
        (s = new THREE.Mesh(e, a)).scale.multiplyScalar(0.0067),
          (s.frustumCulled = !1),
          (s.renderOrder = 1e4);
      }
    ),
    new THREE.BufferGeometryLoader(o).load(
      `${BASE_URL}/models/glasses/deco.json`,
      (e) => {
        const a = new THREE.MeshBasicMaterial({
          color: 16777215
        });
        (l = new THREE.Mesh(e, a)).scale.multiplyScalar(0.0067),
          (l.frustumCulled = !1),
          (l.renderOrder = 1e4);
      }
    ),
    (o.onLoad = () => {
      GLASSESOBJ3D.add(s, n, t, l),
        GLASSESOBJ3D.scale.multiplyScalar(1.1),
        GLASSESOBJ3D.position.setY(0.05),
        GLASSESOBJ3D.position.setZ(0.25),
        addDragEventListener(GLASSESOBJ3D),
        a.faceObject.add(GLASSESOBJ3D);
    }),
    new THREE.JSONLoader().load(`${BASE_URL}/models/bee/bee.json`, (e) => {
      const n = new THREE.MeshLambertMaterial({
        map: new THREE.TextureLoader().load(`${BASE_URL}/models/bee/texture_bee.jpg`),
        transparent: !0,
        morphTargets: !0
      });
      (BEEMESH = new THREE.Mesh(e, n)), (BEEOBJ3D = new THREE.Object3D());
      for (let e = 1; e < SETTINGS.numberBees; e++) {
        const a = e % 2 == 0 ? 1 : -1,
          n = BEEMESH.clone(),
          t = 1.5 * Math.random() - 0.75,
          s = 2 * Math.random() - 1 + 1,
          l = 0.5 * Math.random() - 0.25;
        n.position.set(t, s, l),
          n.scale.multiplyScalar(0.1),
          animateFlyBees(n, a * (0.005 * (e + 1) + 0.01), a);
        let o = new THREE.Object3D();
        if ((o.add(n), !ISANIMATED)) {
          const e = new THREE.AnimationMixer(n),
            a = n.geometry.animations[0],
            t = e.clipAction(a);
          ACTIONS.push(t), MIXERS.push(e);
        }
        BEEOBJ3D.add(o);
      }
      ACTIONS.forEach((e, a) => {
        setTimeout(() => {
          e.play();
        }, 33 * a);
      }),
        (ISANIMATED = !0),
        a.faceObject.add(BEEOBJ3D);
    });
  const E = new THREE.Mesh(
    a.videoMesh.geometry,
    ((r = new THREE.TextureLoader().load(`${BASE_URL}/images/frame.png`)),
    (i = !0),
    new THREE.RawShaderMaterial({
      depthWrite: !1,
      depthTest: !1,
      transparent: i,
      vertexShader:
        'attribute vec2 position;\n        varying vec2 vUV;\n        void main(void){\n          gl_Position=vec4(position, 0., 1.);\n          vUV=0.5+0.5*position;\n        }',
      fragmentShader:
        'precision lowp float;\n        uniform sampler2D samplerVideo;\n        varying vec2 vUV;\n        void main(void){\n          gl_FragColor = texture2D(samplerVideo, vUV);\n        }',
      uniforms: {
        samplerVideo: {
          value: r
        }
      }
    }))
  );
  var r, i;
  (E.renderOrder = 999),
    (E.frustumCulled = !1),
    a.scene.add(E),
    (THREECAMERA = THREE.JeelizHelper.create_camera());
  const c = new THREE.AmbientLight(16777215, 1);
  a.scene.add(c);
  const d = new THREE.DirectionalLight(16777215);
  d.position.set(100, 1e3, 100), a.scene.add(d);
}

function animateFlyBees(e, a, n) {
  let t = 0;
  setInterval(() => {
    t += 1;
    const s = e.position.x,
      l = e.position.z,
      o = e.position.y;
    e.position.set(
      s * Math.cos(a) + l * Math.sin(a),
      0.96 * (o * Math.cos(a) + s * Math.sin(a)) + 0.05,
      l * Math.cos(a) - s * Math.sin(a)
    ),
      e.rotation.set(
        -(s * Math.cos(a) + l * Math.sin(a)) * n,
        -(o * Math.cos(a) + l * Math.sin(a)) * n,
        -(l * Math.cos(a) - s * Math.sin(a)) * n
      );
  }, 16);
}

function main() {
  (GLASSESOBJ3D = new THREE.Object3D()),
    JeelizResizer.size_canvas({
      canvasId: 'jeeFaceFilterCanvas',
      callback: function (e, a) {
        init_faceFilter(a);
      }
    });
}

function init_faceFilter(e) {
  JEEFACEFILTERAPI.init({
    canvasId: 'jeeFaceFilterCanvas',
    NNCpath: './jeelizFaceFilter/dist/',
    videoSettings: e,
    callbackReady: function (e, a) {
      e
        ? console.log('AN ERROR HAPPENS. SORRY BRO :( . ERR =', e)
        : (console.log('INFO: JEEFACEFILTERAPI IS READY'), init_threeScene(a));
    },
    callbackTrack: function (e) {
      THREE.JeelizHelper.render(e, THREECAMERA),
        TWEEN.update(),
        MIXERS.length > 1 &&
          MIXERS.forEach((e) => {
            e.update(0.16);
          });
    }
  });
}
