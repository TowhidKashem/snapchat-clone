'use strict';

var Filters = window.Filters || {};

Filters.deform = {
  BASE_URL: './jeelizFaceFilter/filters/deform',
  THREECAMERA: null,
  buildMaskMaterial: () => {
    const vertexShaderSource =
      'varying vec2 vUVvideo;\n\
  // deformation 0 parameters:\n\
  const vec2 TEARPOINT0 = vec2(0.,-0.5);\n\
  const vec2 DISPLACEMENT0 = vec2(0.,0.15);\n\
  const float RADIUS0 = 0.4;\n\
  // deformation 1 parameters:\n\
  const vec2 TEARPOINT1 = vec2(0.25,-0.4);\n\
  const vec2 DISPLACEMENT1 = vec2(0.12,-0.07);\n\
  const float RADIUS1 = 0.3;\n\
  // deformation 2 parameters:\n\
  const vec2 TEARPOINT2 = vec2(-0.25,-0.4);\n\
  const vec2 DISPLACEMENT2 = vec2(-0.12,-0.07);\n\
  const float RADIUS2 = 0.3;\n\
  void main() {\n\
    vec3 positionDeformed=position;\n\
    // apply deformation 0\n\
    float deformFactor0 = 1.-smoothstep(0.0, RADIUS0, distance(TEARPOINT0, position.xy));\n\
    positionDeformed.xy += deformFactor0*DISPLACEMENT0;\n\
    // apply deformation 1\n\
    float deformFactor1 = 1.-smoothstep(0.0, RADIUS1, distance(TEARPOINT1, position.xy));\n\
    positionDeformed.xy += deformFactor1*DISPLACEMENT1;\n\
    // apply deformation 2\n\
    float deformFactor2 = 1. - smoothstep(0.0, RADIUS2, distance(TEARPOINT2, position.xy));\n\
    positionDeformed.xy += deformFactor2*DISPLACEMENT2;\n\
    // project deformed point:\n\
    vec4 mvPosition = modelViewMatrix * vec4( positionDeformed, 1.0 );\n\
    vec4 projectedPosition=projectionMatrix * mvPosition;\n\
    gl_Position=projectedPosition;\n\
    // compute UV coordinates on the video texture:\n\
    vec4 mvPosition0 = modelViewMatrix * vec4( position, 1.0 );\n\
    vec4 projectedPosition0 = projectionMatrix * mvPosition0;\n\
    vUVvideo = vec2(0.5,0.5) + 0.5*projectedPosition0.xy/projectedPosition0.w;\n\
  }';
    const fragmentShaderSource =
      'precision mediump float;\n\
  uniform sampler2D samplerVideo;\n\
  varying vec2 vUVvideo;\n\
  void main() {\n\
    gl_FragColor = texture2D(samplerVideo, vUVvideo);\n\
  }';
    const mat = new THREE.ShaderMaterial({
      vertexShader: vertexShaderSource,
      fragmentShader: fragmentShaderSource,
      uniforms: {
        samplerVideo: {
          value: THREE.JeelizHelper.get_threeVideoTexture()
        }
      }
    });
    return mat;
  },
  initThreeScene: (spec) => {
    const threeStuffs = THREE.JeelizHelper.init(spec);
    const maskLoader = new THREE.BufferGeometryLoader();
    maskLoader.load(Filters.deform.BASE_URL + '/models/faceLowPoly.json', function (
      maskBufferGeometry
    ) {
      maskBufferGeometry.computeVertexNormals();
      const threeMask = new THREE.Mesh(
        maskBufferGeometry,
        Filters.deform.buildMaskMaterial()
      );
      threeMask.frustumCulled = false;
      threeMask.scale.multiplyScalar(1.2);
      threeMask.position.set(0, 0.2, -0.5);
      threeStuffs.faceObject.add(threeMask);
    });
    Filters.deform.THREECAMERA = THREE.JeelizHelper.create_camera();
  },
  init: (callback) => {
    JeelizResizer.size_canvas({
      canvasId: 'jeeFaceFilterCanvas',
      callback: (isError, bestVideoSettings) => {
        Filters.deform.initFaceFilter(bestVideoSettings, callback);
      }
    });
  },
  initFaceFilter: (videoSettings, callback) => {
    JEEFACEFILTERAPI.init({
      canvasId: 'jeeFaceFilterCanvas',
      NNCpath: './jeelizFaceFilter/dist/',
      videoSettings,
      callbackReady: function (errCode, spec) {
        if (errCode) return;
        Filters.deform.initThreeScene(spec);
        if (callback) setTimeout(callback, 100);
      },
      callbackTrack: function (detectState) {
        THREE.JeelizHelper.render(detectState, Filters.deform.THREECAMERA);
      }
    });
  }
};
