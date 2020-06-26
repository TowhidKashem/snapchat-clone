'use strict';

var Filters = window.Filters || {};

Filters.liberty = {
  BASE_URL: './filters/jeelizFaceFilter/demos/threejs/multiLiberty',
  THREECAMERA: null,
  SETTINGS: {
    maxFaces: 4
  },
  createLibertyMaterial: () => {
    return new THREE.MeshLambertMaterial({
      color: 0xadd7bf,
      alphaMap: new THREE.TextureLoader().load(
        Filters.liberty.BASE_URL + '/assets/libertyAlphaMapSoft512.png'
      ),
      transparent: true,
      premultipliedAlpha: true
    });
  },
  createFaceMaterial: () =>
    new THREE.MeshBasicMaterial({
      color: 0x5da0a0,
      transparent: true,
      side: THREE.DoubleSide,
      premultipliedAlpha: false,
      blending: THREE.CustomBlending,
      blendSrc: THREE.SrcColorFactor,
      blendDst: THREE.OneFactor,
      blendEquation: THREE.AddEquation
    }),
  initThreeScene: (spec) => {
    const threeStuffs = THREE.JeelizHelper.init(spec);
    const addFaceMesh = (threeFaceMesh) => {
      threeFaceMesh.frustumCulled = false;
      threeFaceMesh.scale.multiplyScalar(0.37);
      threeFaceMesh.position.set(0, 0.25, 0.5);
      threeStuffs.faceObjects.forEach((faceObject) =>
        faceObject.add(threeFaceMesh.clone())
      );
    };
    const libertyLoader = new THREE.BufferGeometryLoader();
    libertyLoader.load(Filters.liberty.BASE_URL + '/assets/liberty.json', function (
      libertyGeometry
    ) {
      THREE.JeelizHelper.sortFaces(libertyGeometry, 'z', true);
      const libertyMesh = new THREE.Mesh(
        libertyGeometry,
        Filters.liberty.createLibertyMaterial()
      );
      libertyMesh.renderOrder = 2;
      addFaceMesh(libertyMesh);
    });
    new THREE.BufferGeometryLoader().load(
      Filters.liberty.BASE_URL + '/assets/libertyFaceMask.json',
      (faceGeometry) => {
        THREE.JeelizHelper.sortFaces(faceGeometry, 'z', true);
        const faceMesh = new THREE.Mesh(
          faceGeometry,
          Filters.liberty.createFaceMaterial()
        );
        faceMesh.renderOrder = 1;
        addFaceMesh(faceMesh);
      }
    );
    Filters.liberty.THREECAMERA = THREE.JeelizHelper.create_camera();
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    const dirLight = new THREE.DirectionalLight(0xffffee, 0.7);
    dirLight.position.set(0, 0.05, 1);
    threeStuffs.scene.add(ambientLight, dirLight);
  },
  init: (callback) =>
    JEEFACEFILTERAPI.init({
      canvasId: 'filter-canvas',
      NNCpath: './filters/jeelizFaceFilter/dist/',
      maxFacesDetected: Filters.liberty.SETTINGS.maxFaces,
      callbackReady: function (errCode, spec) {
        if (errCode) return;
        Filters.liberty.initThreeScene(spec);
        if (callback) setTimeout(callback, 100);
      },
      callbackTrack: function (detectState) {
        THREE.JeelizHelper.render(detectState, Filters.liberty.THREECAMERA);
      }
    })
};
