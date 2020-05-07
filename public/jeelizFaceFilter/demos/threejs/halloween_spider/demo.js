'use strict';

const BASE_URL = './jeelizFaceFilter/demos/threejs/halloween_spider',
  openMouth = document.querySelector('#open-mouth');
let THREECAMERA = null,
  ISDETECTED = !1;
const MIXERS = [],
  ACTIONS = [];
let MASKOBJ3D = null,
  isAnimating = !1;

function detect_callback(e) {
  e
    ? console.log('INFO in detect_callback(): DETECTED')
    : console.log('INFO in detect_callback(): LOST');
}

function init_threeScene(e) {
  const o = THREE.JeelizHelper.init(e, detect_callback),
    n = new THREE.LoadingManager();
  let i;
  let t;
  new THREE.JSONLoader(n).load(
    `${BASE_URL}/models/small_spider/small_spider.json`,
    (e) => {
      const o = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(
          `${BASE_URL}/models/small_spider/diffuse_spider.jpg`
        ),
        morphTargets: !0
      });
      ((i = new THREE.Mesh(e, o)).frustumCulled = !1), (i.position.y -= 0.2);
      const n = new THREE.AnimationMixer(i),
        t = i.geometry.animations[0],
        a = n.clipAction(t);
      MIXERS.push(n), ACTIONS.push(a);
    }
  ),
    new THREE.JSONLoader(n).load(`${BASE_URL}/models/big_spider/big_spider.json`, (e) => {
      const o = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(
          `${BASE_URL}/models/big_spider/diffuse_spider.jpg`
        ),
        morphTargets: !0
      });
      (t = new THREE.Mesh(e, o)).frustumCulled = !1;
      const n = new THREE.AnimationMixer(t),
        i = t.geometry.animations[0],
        a = n.clipAction(i);
      MIXERS.push(n), ACTIONS.push(a);
    });
  let a = null;
  new THREE.BufferGeometryLoader(n).load(`${BASE_URL}/models/face/face.json`, (e) => {
    new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(`${BASE_URL}/models/face/diffuse_makeup.png`)
    });
    const o = new THREE.ShaderMaterial({
      vertexShader:
        'varying vec2 vUVvideo;\n      varying float vY, vNormalDotZ;\n      const float THETAHEAD=0.25;\n      void main() {\n        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0);\n        vec4 projectedPosition = projectionMatrix * mvPosition;\n        gl_Position = projectedPosition;\n        \n        // compute UV coordinates on the video texture:\n        vec4 mvPosition0 = modelViewMatrix * vec4( position, 1.0 );\n        vec4 projectedPosition0 = projectionMatrix * mvPosition0;\n        vUVvideo = vec2(0.5,0.5)+0.5*projectedPosition0.xy/projectedPosition0.w;\n        vY = position.y*cos(THETAHEAD)-position.z*sin(THETAHEAD);\n        vec3 normalView = vec3(modelViewMatrix * vec4(normal,0.));\n        vNormalDotZ = pow(abs(normalView.z), 1.5);\n      }',
      fragmentShader:
        'precision lowp float;\n      uniform sampler2D samplerVideo;\n      varying vec2 vUVvideo;\n      varying float vY, vNormalDotZ;\n      void main() {\n        vec3 videoColor = texture2D(samplerVideo, vUVvideo).rgb;\n        float darkenCoeff = smoothstep(-0.15, 0.05, vY);\n        float borderCoeff = smoothstep(0.0, 0.55, vNormalDotZ);\n        gl_FragColor = vec4(videoColor, 1 );\n        // gl_FragColor=vec4(borderCoeff, 0., 0., 1.);\n        // gl_FragColor=vec4(darkenCoeff, 0., 0., 1.);\n      }',
      transparent: !0,
      flatShading: !1,
      uniforms: {
        samplerVideo: {
          value: THREE.JeelizHelper.get_threeVideoTexture()
        }
      },
      transparent: !0
    });
    a = new THREE.Mesh(e, o);
  }),
    (n.onLoad = () => {
      MASKOBJ3D.add(a),
        MASKOBJ3D.add(i),
        MASKOBJ3D.add(t),
        MASKOBJ3D.scale.multiplyScalar(0.59),
        (MASKOBJ3D.position.z -= 0.5),
        (MASKOBJ3D.position.y += 0.4),
        o.faceObject.add(MASKOBJ3D);
    });
  const r = new THREE.Mesh(
    o.videoMesh.geometry,
    ((s = new THREE.TextureLoader().load(`${BASE_URL}/images/cadre_halloween.png`)),
    (l = !0),
    new THREE.RawShaderMaterial({
      depthWrite: !1,
      depthTest: !1,
      transparent: l,
      vertexShader:
        'attribute vec2 position;\n        varying vec2 vUV;\n        void main(void){\n          gl_Position = vec4(position, 0., 1.);\n          vUV = 0.5+0.5*position;\n        }',
      fragmentShader:
        'precision lowp float;\n        uniform sampler2D samplerVideo;\n        varying vec2 vUV;\n        void main(void){\n          gl_FragColor = texture2D(samplerVideo, vUV);\n        }',
      uniforms: {
        samplerVideo: {
          value: s
        }
      }
    }))
  );
  var s, l;
  (r.renderOrder = 999),
    (r.frustumCulled = !1),
    o.scene.add(r),
    (THREECAMERA = THREE.JeelizHelper.create_camera());
  const c = new THREE.AmbientLight(16777215, 0.8);
  o.scene.add(c);
  const d = new THREE.SpotLight(16777215);
  d.position.set(100, 1e3, 100), (d.castShadow = !0), o.scene.add(d);
}

function main() {
  (MASKOBJ3D = new THREE.Object3D()),
    JeelizResizer.size_canvas({
      canvasId: 'jeeFaceFilterCanvas',
      callback: function (e, o) {
        init_faceFilter(o);
      }
    });
}

function animateSpiders() {
  (openMouth.style.opacity = '0'),
    (isAnimating = !0),
    ACTIONS.forEach((e, o) => {
      (e.loop = !1),
        MIXERS[o].addEventListener('loop', () => {
          e.stop(), e.reset(), (isAnimating = !1);
        }),
        e.play();
    });
}

function init_faceFilter(e) {
  JEEFACEFILTERAPI.init({
    canvasId: 'jeeFaceFilterCanvas',
    NNCpath: './jeelizFaceFilter/dist/',
    videoSettings: e,
    callbackReady: function (e, o) {
      e
        ? console.log('AN ERROR HAPPENS. SORRY BRO :( . ERR =', e)
        : (console.log('INFO: JEEFACEFILTERAPI IS READY'), init_threeScene(o));
    },
    callbackTrack: function (e) {
      (ISDETECTED = THREE.JeelizHelper.get_isDetected()) &&
        (e.expressions[0] >= 0.8 &&
          !isAnimating &&
          (animateSpiders(), (openMouth.style.opacity = 0)),
        MIXERS &&
          MIXERS.length > 0 &&
          MIXERS.forEach((e) => {
            e.update(0.08);
          })),
        THREE.JeelizHelper.render(e, THREECAMERA);
    }
  });
}
