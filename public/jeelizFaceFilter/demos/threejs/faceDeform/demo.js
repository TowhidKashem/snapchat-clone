'use strict';
const BASE_URL = './jeelizFaceFilter/demos/threejs/faceDeform';
let THREECAMERA = null;

function detect_callback(e) {
  e
    ? console.log('INFO in detect_callback(): DETECTED')
    : console.log('INFO in detect_callback(): LOST');
}

function build_maskMaterial() {
  return new THREE.ShaderMaterial({
    vertexShader:
      'varying vec2 vUVvideo;\n  // deformation 0 parameters:\n  const vec2 TEARPOINT0 = vec2(0.,-0.5);\n  const vec2 DISPLACEMENT0 = vec2(0.,0.15);\n  const float RADIUS0 = 0.4;\n  // deformation 1 parameters:\n  const vec2 TEARPOINT1 = vec2(0.25,-0.4);\n  const vec2 DISPLACEMENT1 = vec2(0.12,-0.07);\n  const float RADIUS1 = 0.3;\n  // deformation 2 parameters:\n  const vec2 TEARPOINT2 = vec2(-0.25,-0.4);\n  const vec2 DISPLACEMENT2 = vec2(-0.12,-0.07);\n  const float RADIUS2 = 0.3;\n  void main() {\n    vec3 positionDeformed=position;\n    // apply deformation 0\n    float deformFactor0 = 1.-smoothstep(0.0, RADIUS0, distance(TEARPOINT0, position.xy));\n    positionDeformed.xy += deformFactor0*DISPLACEMENT0;\n    // apply deformation 1\n    float deformFactor1 = 1.-smoothstep(0.0, RADIUS1, distance(TEARPOINT1, position.xy));\n    positionDeformed.xy += deformFactor1*DISPLACEMENT1;\n    // apply deformation 2\n    float deformFactor2 = 1. - smoothstep(0.0, RADIUS2, distance(TEARPOINT2, position.xy));\n    positionDeformed.xy += deformFactor2*DISPLACEMENT2;\n    // project deformed point:\n    vec4 mvPosition = modelViewMatrix * vec4( positionDeformed, 1.0 );\n    vec4 projectedPosition=projectionMatrix * mvPosition;\n    gl_Position=projectedPosition;\n    // compute UV coordinates on the video texture:\n    vec4 mvPosition0 = modelViewMatrix * vec4( position, 1.0 );\n    vec4 projectedPosition0 = projectionMatrix * mvPosition0;\n    vUVvideo = vec2(0.5,0.5) + 0.5*projectedPosition0.xy/projectedPosition0.w;\n  }',
    fragmentShader:
      'precision mediump float;\n  uniform sampler2D samplerVideo;\n  varying vec2 vUVvideo;\n  void main() {\n    gl_FragColor = texture2D(samplerVideo, vUVvideo);\n  }',
    uniforms: {
      samplerVideo: {
        value: THREE.JeelizHelper.get_threeVideoTexture()
      }
    }
  });
}

function init_threeScene(e) {
  const o = THREE.JeelizHelper.init(e, detect_callback);
  new THREE.BufferGeometryLoader().load(`${BASE_URL}/models/faceLowPoly.json`, function (
    e
  ) {
    e.computeVertexNormals();
    const t = new THREE.Mesh(e, build_maskMaterial());
    (t.frustumCulled = !1),
      t.scale.multiplyScalar(1.2),
      t.position.set(0, 0.2, -0.5),
      o.faceObject.add(t);
  }),
    (THREECAMERA = THREE.JeelizHelper.create_camera());
}

function main() {
  JeelizResizer.size_canvas({
    canvasId: 'jeeFaceFilterCanvas',
    callback: function (e, o) {
      init_faceFilter(o);
    }
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
      THREE.JeelizHelper.render(e, THREECAMERA);
    }
  });
}
