/* tween/v16_3_5/Tween.min.js */
var TWEEN =
  TWEEN ||
  (function () {
    var n = [];
    return {
      getAll: function () {
        return n;
      },
      removeAll: function () {
        n = [];
      },
      add: function (t) {
        n.push(t);
      },
      remove: function (t) {
        var r = n.indexOf(t);
        -1 !== r && n.splice(r, 1);
      },
      update: function (t, r) {
        if (0 === n.length) return !1;
        var i = 0;
        for (t = void 0 !== t ? t : TWEEN.now(); i < n.length; )
          n[i].update(t) || r ? i++ : n.splice(i, 1);
        return !0;
      }
    };
  })();
!(function () {
  void 0 === this.window && void 0 !== this.process
    ? (TWEEN.now = function () {
        var n = process.hrtime();
        return 1e3 * n[0] + n[1] / 1e3;
      })
    : void 0 !== this.window &&
      void 0 !== window.performance &&
      void 0 !== window.performance.now
    ? (TWEEN.now = window.performance.now.bind(window.performance))
    : void 0 !== Date.now
    ? (TWEEN.now = Date.now)
    : (TWEEN.now = function () {
        return new Date().getTime();
      });
})(),
  (TWEEN.Tween = function (n) {
    var t = n,
      r = {},
      i = {},
      o = {},
      u = 1e3,
      e = 0,
      a = !1,
      f = !1,
      c = !1,
      s = 0,
      h = null,
      l = TWEEN.Easing.Linear.None,
      E = TWEEN.Interpolation.Linear,
      p = [],
      d = null,
      v = !1,
      w = null,
      I = null,
      M = null;
    for (var T in n) r[T] = parseFloat(n[T], 10);
    (this.to = function (n, t) {
      return void 0 !== t && (u = t), (i = n), this;
    }),
      (this.start = function (n) {
        TWEEN.add(this),
          (f = !0),
          (v = !1),
          (h = void 0 !== n ? n : TWEEN.now()),
          (h += s);
        for (var u in i) {
          if (i[u] instanceof Array) {
            if (0 === i[u].length) continue;
            i[u] = [t[u]].concat(i[u]);
          }
          void 0 !== r[u] &&
            ((r[u] = t[u]),
            r[u] instanceof Array == !1 && (r[u] *= 1),
            (o[u] = r[u] || 0));
        }
        return this;
      }),
      (this.stop = function () {
        return f
          ? (TWEEN.remove(this),
            (f = !1),
            null !== M && M.call(t),
            this.stopChainedTweens(),
            this)
          : this;
      }),
      (this.stopChainedTweens = function () {
        for (var n = 0, t = p.length; t > n; n++) p[n].stop();
      }),
      (this.delay = function (n) {
        return (s = n), this;
      }),
      (this.repeat = function (n) {
        return (e = n), this;
      }),
      (this.yoyo = function (n) {
        return (a = n), this;
      }),
      (this.easing = function (n) {
        return (l = n), this;
      }),
      (this.interpolation = function (n) {
        return (E = n), this;
      }),
      (this.chain = function () {
        return (p = arguments), this;
      }),
      (this.onStart = function (n) {
        return (d = n), this;
      }),
      (this.onUpdate = function (n) {
        return (w = n), this;
      }),
      (this.onComplete = function (n) {
        return (I = n), this;
      }),
      (this.onStop = function (n) {
        return (M = n), this;
      }),
      (this.update = function (n) {
        var f, M, T;
        if (h > n) return !0;
        v === !1 && (null !== d && d.call(t), (v = !0)),
          (M = (n - h) / u),
          (M = M > 1 ? 1 : M),
          (T = l(M));
        for (f in i)
          if (void 0 !== r[f]) {
            var N = r[f] || 0,
              W = i[f];
            W instanceof Array
              ? (t[f] = E(W, T))
              : ('string' == typeof W &&
                  (W =
                    '+' === W.charAt(0) || '-' === W.charAt(0)
                      ? N + parseFloat(W, 10)
                      : parseFloat(W, 10)),
                'number' == typeof W && (t[f] = N + (W - N) * T));
          }
        if ((null !== w && w.call(t, T), 1 === M)) {
          if (e > 0) {
            isFinite(e) && e--;
            for (f in o) {
              if (('string' == typeof i[f] && (o[f] = o[f] + parseFloat(i[f], 10)), a)) {
                var O = o[f];
                (o[f] = i[f]), (i[f] = O);
              }
              r[f] = o[f];
            }
            return a && (c = !c), (h = n + s), !0;
          }
          null !== I && I.call(t);
          for (var m = 0, g = p.length; g > m; m++) p[m].start(h + u);
          return !1;
        }
        return !0;
      });
  }),
  (TWEEN.Easing = {
    Linear: {
      None: function (n) {
        return n;
      }
    },
    Quadratic: {
      In: function (n) {
        return n * n;
      },
      Out: function (n) {
        return n * (2 - n);
      },
      InOut: function (n) {
        return (n *= 2) < 1 ? 0.5 * n * n : -0.5 * (--n * (n - 2) - 1);
      }
    },
    Cubic: {
      In: function (n) {
        return n * n * n;
      },
      Out: function (n) {
        return --n * n * n + 1;
      },
      InOut: function (n) {
        return (n *= 2) < 1 ? 0.5 * n * n * n : 0.5 * ((n -= 2) * n * n + 2);
      }
    },
    Quartic: {
      In: function (n) {
        return n * n * n * n;
      },
      Out: function (n) {
        return 1 - --n * n * n * n;
      },
      InOut: function (n) {
        return (n *= 2) < 1 ? 0.5 * n * n * n * n : -0.5 * ((n -= 2) * n * n * n - 2);
      }
    },
    Quintic: {
      In: function (n) {
        return n * n * n * n * n;
      },
      Out: function (n) {
        return --n * n * n * n * n + 1;
      },
      InOut: function (n) {
        return (n *= 2) < 1
          ? 0.5 * n * n * n * n * n
          : 0.5 * ((n -= 2) * n * n * n * n + 2);
      }
    },
    Sinusoidal: {
      In: function (n) {
        return 1 - Math.cos((n * Math.PI) / 2);
      },
      Out: function (n) {
        return Math.sin((n * Math.PI) / 2);
      },
      InOut: function (n) {
        return 0.5 * (1 - Math.cos(Math.PI * n));
      }
    },
    Exponential: {
      In: function (n) {
        return 0 === n ? 0 : Math.pow(1024, n - 1);
      },
      Out: function (n) {
        return 1 === n ? 1 : 1 - Math.pow(2, -10 * n);
      },
      InOut: function (n) {
        return 0 === n
          ? 0
          : 1 === n
          ? 1
          : (n *= 2) < 1
          ? 0.5 * Math.pow(1024, n - 1)
          : 0.5 * (-Math.pow(2, -10 * (n - 1)) + 2);
      }
    },
    Circular: {
      In: function (n) {
        return 1 - Math.sqrt(1 - n * n);
      },
      Out: function (n) {
        return Math.sqrt(1 - --n * n);
      },
      InOut: function (n) {
        return (n *= 2) < 1
          ? -0.5 * (Math.sqrt(1 - n * n) - 1)
          : 0.5 * (Math.sqrt(1 - (n -= 2) * n) + 1);
      }
    },
    Elastic: {
      In: function (n) {
        return 0 === n
          ? 0
          : 1 === n
          ? 1
          : -Math.pow(2, 10 * (n - 1)) * Math.sin(5 * (n - 1.1) * Math.PI);
      },
      Out: function (n) {
        return 0 === n
          ? 0
          : 1 === n
          ? 1
          : Math.pow(2, -10 * n) * Math.sin(5 * (n - 0.1) * Math.PI) + 1;
      },
      InOut: function (n) {
        return 0 === n
          ? 0
          : 1 === n
          ? 1
          : ((n *= 2),
            1 > n
              ? -0.5 * Math.pow(2, 10 * (n - 1)) * Math.sin(5 * (n - 1.1) * Math.PI)
              : 0.5 * Math.pow(2, -10 * (n - 1)) * Math.sin(5 * (n - 1.1) * Math.PI) + 1);
      }
    },
    Back: {
      In: function (n) {
        var t = 1.70158;
        return n * n * ((t + 1) * n - t);
      },
      Out: function (n) {
        var t = 1.70158;
        return --n * n * ((t + 1) * n + t) + 1;
      },
      InOut: function (n) {
        var t = 2.5949095;
        return (n *= 2) < 1
          ? 0.5 * (n * n * ((t + 1) * n - t))
          : 0.5 * ((n -= 2) * n * ((t + 1) * n + t) + 2);
      }
    },
    Bounce: {
      In: function (n) {
        return 1 - TWEEN.Easing.Bounce.Out(1 - n);
      },
      Out: function (n) {
        return 1 / 2.75 > n
          ? 7.5625 * n * n
          : 2 / 2.75 > n
          ? 7.5625 * (n -= 1.5 / 2.75) * n + 0.75
          : 2.5 / 2.75 > n
          ? 7.5625 * (n -= 2.25 / 2.75) * n + 0.9375
          : 7.5625 * (n -= 2.625 / 2.75) * n + 0.984375;
      },
      InOut: function (n) {
        return 0.5 > n
          ? 0.5 * TWEEN.Easing.Bounce.In(2 * n)
          : 0.5 * TWEEN.Easing.Bounce.Out(2 * n - 1) + 0.5;
      }
    }
  }),
  (TWEEN.Interpolation = {
    Linear: function (n, t) {
      var r = n.length - 1,
        i = r * t,
        o = Math.floor(i),
        u = TWEEN.Interpolation.Utils.Linear;
      return 0 > t
        ? u(n[0], n[1], i)
        : t > 1
        ? u(n[r], n[r - 1], r - i)
        : u(n[o], n[o + 1 > r ? r : o + 1], i - o);
    },
    Bezier: function (n, t) {
      for (
        var r = 0,
          i = n.length - 1,
          o = Math.pow,
          u = TWEEN.Interpolation.Utils.Bernstein,
          e = 0;
        i >= e;
        e++
      )
        r += o(1 - t, i - e) * o(t, e) * n[e] * u(i, e);
      return r;
    },
    CatmullRom: function (n, t) {
      var r = n.length - 1,
        i = r * t,
        o = Math.floor(i),
        u = TWEEN.Interpolation.Utils.CatmullRom;
      return n[0] === n[r]
        ? (0 > t && (o = Math.floor((i = r * (1 + t)))),
          u(n[(o - 1 + r) % r], n[o], n[(o + 1) % r], n[(o + 2) % r], i - o))
        : 0 > t
        ? n[0] - (u(n[0], n[0], n[1], n[1], -i) - n[0])
        : t > 1
        ? n[r] - (u(n[r], n[r], n[r - 1], n[r - 1], i - r) - n[r])
        : u(
            n[o ? o - 1 : 0],
            n[o],
            n[o + 1 > r ? r : o + 1],
            n[o + 2 > r ? r : o + 2],
            i - o
          );
    },
    Utils: {
      Linear: function (n, t, r) {
        return (t - n) * r + n;
      },
      Bernstein: function (n, t) {
        var r = TWEEN.Interpolation.Utils.Factorial;
        return r(n) / r(t) / r(n - t);
      },
      Factorial: (function () {
        var n = [1];
        return function (t) {
          var r = 1;
          if (n[t]) return n[t];
          for (var i = t; i > 1; i--) r *= i;
          return (n[t] = r), r;
        };
      })(),
      CatmullRom: function (n, t, r, i, o) {
        var u = 0.5 * (r - n),
          e = 0.5 * (i - t),
          a = o * o,
          f = o * a;
        return (2 * t - 2 * r + u + e) * f + (-3 * t + 3 * r - 2 * u - e) * a + u * o + t;
      }
    }
  }),
  (function (n) {
    'function' == typeof define && define.amd
      ? define([], function () {
          return TWEEN;
        })
      : 'undefined' != typeof module && 'object' == typeof exports
      ? (module.exports = TWEEN)
      : void 0 !== n && (n.TWEEN = TWEEN);
  })(this);

/* threejs/customMaterials/FlexMaterial/ThreeFlexMaterial.js */
('use strict');
THREE.FlexMaterial = function (e) {
  var a = new THREE.Matrix4();
  function r(e, a, r) {
    e.set(a.x * r + e.x * (1 - r), a.y * r + e.y * (1 - r), a.z * r + e.z * (1 - r));
  }
  var i,
    o,
    n = THREE.ShaderLib.phong,
    t = n.vertexShader;
  (i = '#include <common>'),
    (o = 'uniform mat4 modelMatrixDelayed;\nuniform sampler2D flexMap;\n'),
    (t = (function (e, a, r) {
      return e.replace(a, r);
    })(
      (t = (function (e, a) {
        return e.replace(a, '');
      })((t = t.replace(i, i + '\n' + o)), '#include <worldpos_vertex>')),
      '#include <project_vertex>',
      'vec4 worldPosition = modelMatrix * vec4( transformed, 1.0 );\n        vec4 worldPositionDelayed = modelMatrixDelayed * vec4( transformed, 1.0 );\n        worldPosition = mix(worldPosition, worldPositionDelayed, texture2D(flexMap, uv).r);\n        vec4 mvPosition = viewMatrix* worldPosition;\n        gl_Position = projectionMatrix * mvPosition;'
    ));
  var p = {
      modelMatrixDelayed: { value: a },
      flexMap: { value: e.flexMap },
      opacity: { value: void 0 !== e.opacity ? e.opacity : 1 }
    },
    l = Object.assign({}, n.uniforms, p),
    s = !!e.morphTargets,
    m = new THREE.ShaderMaterial({
      vertexShader: t,
      fragmentShader: n.fragmentShader,
      uniforms: l,
      transparent: !!e.transparent,
      lights: !0,
      morphTargets: s,
      morphNormals: s
    });
  (m.flexMap = e.flexMap),
    (m.opacity = m.uniforms.opacity),
    void 0 !== e.map && ((l.map = { value: e.map }), (m.map = e.map)),
    void 0 !== e.alphaMap &&
      ((l.alphaMap = { value: e.alphaMap }),
      (m.transparent = !0),
      (m.alphaMap = e.alphaMap)),
    void 0 !== e.bumpMap && ((l.bumpMap = { value: e.bumpMap }), (m.bumpMap = e.bumpMap)),
    void 0 !== e.bumpScale &&
      ((l.bumpScale = { value: e.bumpScale }), (m.bumpScale = e.bumpScale)),
    void 0 !== e.shininess &&
      ((l.shininess = { value: e.shininess }), (m.shininess = e.shininess));
  var u = new THREE.Vector3(),
    c = new THREE.Vector3(),
    d = new THREE.Euler(),
    v = !1;
  return (
    (m.set_amortized = function (e, i, o, n, t) {
      v || (e && u.copy(e), i && c.copy(i), o && d.copy(o), (v = !0)),
        o && (r(d, o, t), a.makeRotationFromEuler(d)),
        e && (r(u, e, t), a.setPosition(u)),
        i && (r(c, i, t), a.scale(c)),
        n && a.multiplyMatrices(n, a);
    }),
    m
  );
};

/* glfx.js */
var fx = (function () {
  function e(e, t, r) {
    return Math.max(e, Math.min(t, r));
  }
  function t(e) {
    return {
      _: e,
      loadContentsOf: function (e) {
        (M = this._.gl), this._.loadContentsOf(e);
      },
      destroy: function () {
        (M = this._.gl), this._.destroy();
      }
    };
  }
  function r(e) {
    return t(N.fromElement(e));
  }
  function o(e, t) {
    var r = M.UNSIGNED_BYTE;
    if (
      M.getExtension('OES_texture_float') &&
      M.getExtension('OES_texture_float_linear')
    ) {
      var o = new N(100, 100, M.RGBA, M.FLOAT);
      try {
        o.drawTo(function () {
          r = M.FLOAT;
        });
      } catch (e) {}
      o.destroy();
    }
    this._.texture && this._.texture.destroy(),
      this._.spareTexture && this._.spareTexture.destroy(),
      (this.width = e),
      (this.height = t),
      (this._.texture = new N(e, t, M.RGBA, r)),
      (this._.spareTexture = new N(e, t, M.RGBA, r)),
      (this._.extraTexture = this._.extraTexture || new N(0, 0, M.RGBA, r)),
      (this._.flippedShader =
        this._.flippedShader ||
        new L(
          null,
          'uniform sampler2D texture;varying vec2 texCoord;void main(){gl_FragColor=texture2D(texture,vec2(texCoord.x,1.0-texCoord.y));}'
        )),
      (this._.isInitialized = !0);
  }
  function i(e, t, r) {
    return (
      (this._.isInitialized && e._.width == this.width && e._.height == this.height) ||
        o.call(this, t || e._.width, r || e._.height),
      e._.use(),
      this._.texture.drawTo(function () {
        L.getDefaultShader().drawRect();
      }),
      this
    );
  }
  function a() {
    return this._.texture.use(), this._.flippedShader.drawRect(), this;
  }
  function n(e, t, r, o) {
    (r || this._.texture).use(),
      this._.spareTexture.drawTo(function () {
        e.uniforms(t).drawRect();
      }),
      this._.spareTexture.swapWith(o || this._.texture);
  }
  function l(e) {
    return e.parentNode.insertBefore(this, e), e.parentNode.removeChild(e), this;
  }
  function s() {
    var e = new N(this._.texture.width, this._.texture.height, M.RGBA, M.UNSIGNED_BYTE);
    return (
      this._.texture.use(),
      e.drawTo(function () {
        L.getDefaultShader().drawRect();
      }),
      t(e)
    );
  }
  function c() {
    var e = this._.texture.width,
      t = this._.texture.height,
      r = new Uint8Array(4 * e * t);
    return (
      this._.texture.drawTo(function () {
        M.readPixels(0, 0, e, t, M.RGBA, M.UNSIGNED_BYTE, r);
      }),
      r
    );
  }
  function u(e) {
    return function () {
      return (M = this._.gl), e.apply(this, arguments);
    };
  }
  function h(e, t, r, o, i, a, n, l) {
    var s,
      c,
      u = o - a,
      h = l - a,
      f = (c = r - i) * h - (s = n - i) * u;
    return [
      r - e + (s = ((i = e - r + i - n) * h - s * (a = t - o + a - l)) / f) * r,
      o - t + s * o,
      s,
      n - e + (c = (c * a - i * u) / f) * n,
      l - t + c * l,
      c,
      e,
      t,
      1
    ];
  }
  function f(e) {
    var t = e[0],
      r = e[1],
      o = e[2],
      i = e[3],
      a = e[4],
      n = e[5],
      l = e[6],
      s = e[7],
      c = t * a * (e = e[8]) - t * n * s - r * i * e + r * n * l + o * i * s - o * a * l;
    return [
      (a * e - n * s) / c,
      (o * s - r * e) / c,
      (r * n - o * a) / c,
      (n * l - i * e) / c,
      (t * e - o * l) / c,
      (o * i - t * n) / c,
      (i * s - a * l) / c,
      (r * l - t * s) / c,
      (t * a - r * i) / c
    ];
  }
  function x(e) {
    var t = e.length;
    (this.xa = []),
      (this.ya = []),
      (this.u = []),
      (this.y2 = []),
      e.sort(function (e, t) {
        return e[0] - t[0];
      });
    for (var r = 0; r < t; r++) this.xa.push(e[r][0]), this.ya.push(e[r][1]);
    for (this.u[0] = 0, this.y2[0] = 0, r = 1; r < t - 1; ++r) {
      e = this.xa[r + 1] - this.xa[r - 1];
      var o = (this.xa[r] - this.xa[r - 1]) / e,
        i = o * this.y2[r - 1] + 2;
      (this.y2[r] = (o - 1) / i),
        (this.u[r] =
          ((6 *
            ((this.ya[r + 1] - this.ya[r]) / (this.xa[r + 1] - this.xa[r]) -
              (this.ya[r] - this.ya[r - 1]) / (this.xa[r] - this.xa[r - 1]))) /
            e -
            o * this.u[r - 1]) /
          i);
    }
    for (this.y2[t - 1] = 0, r = t - 2; 0 <= r; --r)
      this.y2[r] = this.y2[r] * this.y2[r + 1] + this.u[r];
  }
  function d(e, t) {
    return new L(
      null,
      e +
        'uniform sampler2D texture;uniform vec2 texSize;varying vec2 texCoord;void main(){vec2 coord=texCoord*texSize;' +
        t +
        'gl_FragColor=texture2D(texture,coord/texSize);vec2 clampedCoord=clamp(coord,vec2(0.0),texSize);if(coord!=clampedCoord){gl_FragColor.a*=max(0.0,1.0-length(coord-clampedCoord));}}'
    );
  }
  function g(t, r) {
    return (
      (M.brightnessContrast =
        M.brightnessContrast ||
        new L(
          null,
          'uniform sampler2D texture;uniform float brightness;uniform float contrast;varying vec2 texCoord;void main(){vec4 color=texture2D(texture,texCoord);color.rgb+=brightness;if(contrast>0.0){color.rgb=(color.rgb-0.5)/(1.0-contrast)+0.5;}else{color.rgb=(color.rgb-0.5)*(1.0+contrast)+0.5;}gl_FragColor=color;}'
        )),
      n.call(this, M.brightnessContrast, {
        brightness: e(-1, t, 1),
        contrast: e(-1, r, 1)
      }),
      this
    );
  }
  function m(t) {
    t = new x(t);
    for (var r = [], o = 0; 256 > o; o++)
      r.push(e(0, Math.floor(256 * t.interpolate(o / 255)), 255));
    return r;
  }
  function v(e, t, r) {
    (e = m(e)), 1 == arguments.length ? (t = r = e) : ((t = m(t)), (r = m(r)));
    for (var o = [], i = 0; 256 > i; i++) o.splice(o.length, 0, e[i], t[i], r[i], 255);
    return (
      this._.extraTexture.initFromBytes(256, 1, o),
      this._.extraTexture.use(1),
      (M.curves =
        M.curves ||
        new L(
          null,
          'uniform sampler2D texture;uniform sampler2D map;varying vec2 texCoord;void main(){vec4 color=texture2D(texture,texCoord);color.r=texture2D(map,vec2(color.r)).r;color.g=texture2D(map,vec2(color.g)).g;color.b=texture2D(map,vec2(color.b)).b;gl_FragColor=color;}'
        )),
      M.curves.textures({ map: 1 }),
      n.call(this, M.curves, {}),
      this
    );
  }
  function p(e) {
    M.denoise =
      M.denoise ||
      new L(
        null,
        'uniform sampler2D texture;uniform float exponent;uniform float strength;uniform vec2 texSize;varying vec2 texCoord;void main(){vec4 center=texture2D(texture,texCoord);vec4 color=vec4(0.0);float total=0.0;for(float x=-4.0;x<=4.0;x+=1.0){for(float y=-4.0;y<=4.0;y+=1.0){vec4 sample=texture2D(texture,texCoord+vec2(x,y)/texSize);float weight=1.0-abs(dot(sample.rgb-center.rgb,vec3(0.25)));weight=pow(weight,exponent);color+=sample*weight;total+=weight;}}gl_FragColor=color/total;}'
      );
    for (var t = 0; 2 > t; t++)
      n.call(this, M.denoise, {
        exponent: Math.max(0, e),
        texSize: [this.width, this.height]
      });
    return this;
  }
  function _(t, r) {
    return (
      (M.hueSaturation =
        M.hueSaturation ||
        new L(
          null,
          'uniform sampler2D texture;uniform float hue;uniform float saturation;varying vec2 texCoord;void main(){vec4 color=texture2D(texture,texCoord);float angle=hue*3.14159265;float s=sin(angle),c=cos(angle);vec3 weights=(vec3(2.0*c,-sqrt(3.0)*s-c,sqrt(3.0)*s-c)+1.0)/3.0;float len=length(color.rgb);color.rgb=vec3(dot(color.rgb,weights.xyz),dot(color.rgb,weights.zxy),dot(color.rgb,weights.yzx));float average=(color.r+color.g+color.b)/3.0;if(saturation>0.0){color.rgb+=(average-color.rgb)*(1.0-1.0/(1.001-saturation));}else{color.rgb+=(average-color.rgb)*(-saturation);}gl_FragColor=color;}'
        )),
      n.call(this, M.hueSaturation, { hue: e(-1, t, 1), saturation: e(-1, r, 1) }),
      this
    );
  }
  function T(t) {
    return (
      (M.noise =
        M.noise ||
        new L(
          null,
          'uniform sampler2D texture;uniform float amount;varying vec2 texCoord;float rand(vec2 co){return fract(sin(dot(co.xy,vec2(12.9898,78.233)))*43758.5453);}void main(){vec4 color=texture2D(texture,texCoord);float diff=(rand(texCoord)-0.5)*amount;color.r+=diff;color.g+=diff;color.b+=diff;gl_FragColor=color;}'
        )),
      n.call(this, M.noise, { amount: e(0, t, 1) }),
      this
    );
  }
  function E(t) {
    return (
      (M.sepia =
        M.sepia ||
        new L(
          null,
          'uniform sampler2D texture;uniform float amount;varying vec2 texCoord;void main(){vec4 color=texture2D(texture,texCoord);float r=color.r;float g=color.g;float b=color.b;color.r=min(1.0,(r*(1.0-(0.607*amount)))+(g*(0.769*amount))+(b*(0.189*amount)));color.g=min(1.0,(r*0.349*amount)+(g*(1.0-(0.314*amount)))+(b*0.168*amount));color.b=min(1.0,(r*0.272*amount)+(g*0.534*amount)+(b*(1.0-(0.869*amount))));gl_FragColor=color;}'
        )),
      n.call(this, M.sepia, { amount: e(0, t, 1) }),
      this
    );
  }
  function y(e, t) {
    return (
      (M.unsharpMask =
        M.unsharpMask ||
        new L(
          null,
          'uniform sampler2D blurredTexture;uniform sampler2D originalTexture;uniform float strength;uniform float threshold;varying vec2 texCoord;void main(){vec4 blurred=texture2D(blurredTexture,texCoord);vec4 original=texture2D(originalTexture,texCoord);gl_FragColor=mix(blurred,original,1.0+strength);}'
        )),
      this._.extraTexture.ensureFormat(this._.texture),
      this._.texture.use(),
      this._.extraTexture.drawTo(function () {
        L.getDefaultShader().drawRect();
      }),
      this._.extraTexture.use(1),
      this.triangleBlur(e),
      M.unsharpMask.textures({ originalTexture: 1 }),
      n.call(this, M.unsharpMask, { strength: t }),
      this._.extraTexture.unuse(1),
      this
    );
  }
  function w(t) {
    return (
      (M.vibrance =
        M.vibrance ||
        new L(
          null,
          'uniform sampler2D texture;uniform float amount;varying vec2 texCoord;void main(){vec4 color=texture2D(texture,texCoord);float average=(color.r+color.g+color.b)/3.0;float mx=max(color.r,max(color.g,color.b));float amt=(mx-average)*(-amount*3.0);color.rgb=mix(color.rgb,vec3(mx),amt);gl_FragColor=color;}'
        )),
      n.call(this, M.vibrance, { amount: e(-1, t, 1) }),
      this
    );
  }
  function b(t, r) {
    return (
      (M.vignette =
        M.vignette ||
        new L(
          null,
          'uniform sampler2D texture;uniform float size;uniform float amount;varying vec2 texCoord;void main(){vec4 color=texture2D(texture,texCoord);float dist=distance(texCoord,vec2(0.5,0.5));color.rgb*=smoothstep(0.8,size*0.799,dist*(amount+size));gl_FragColor=color;}'
        )),
      n.call(this, M.vignette, { size: e(0, t, 1), amount: e(0, r, 1) }),
      this
    );
  }
  function R(t, r, o) {
    M.lensBlurPrePass =
      M.lensBlurPrePass ||
      new L(
        null,
        'uniform sampler2D texture;uniform float power;varying vec2 texCoord;void main(){vec4 color=texture2D(texture,texCoord);color=pow(color,vec4(power));gl_FragColor=vec4(color);}'
      );
    var i =
      'uniform sampler2D texture0;uniform sampler2D texture1;uniform vec2 delta0;uniform vec2 delta1;uniform float power;varying vec2 texCoord;' +
      k +
      'vec4 sample(vec2 delta){float offset=random(vec3(delta,151.7182),0.0);vec4 color=vec4(0.0);float total=0.0;for(float t=0.0;t<=30.0;t++){float percent=(t+offset)/30.0;color+=texture2D(texture0,texCoord+delta*percent);total+=1.0;}return color/total;}';
    (M.lensBlur0 =
      M.lensBlur0 || new L(null, i + 'void main(){gl_FragColor=sample(delta0);}')),
      (M.lensBlur1 =
        M.lensBlur1 ||
        new L(
          null,
          i + 'void main(){gl_FragColor=(sample(delta0)+sample(delta1))*0.5;}'
        )),
      (M.lensBlur2 =
        M.lensBlur2 ||
        new L(
          null,
          i +
            'void main(){vec4 color=(sample(delta0)+2.0*texture2D(texture1,texCoord))/3.0;gl_FragColor=pow(color,vec4(power));}'
        ).textures({ texture1: 1 }));
    i = [];
    for (var a = 0; 3 > a; a++) {
      var l = o + (2 * a * Math.PI) / 3;
      i.push([(t * Math.sin(l)) / this.width, (t * Math.cos(l)) / this.height]);
    }
    return (
      (t = Math.pow(10, e(-1, r, 1))),
      n.call(this, M.lensBlurPrePass, { power: t }),
      this._.extraTexture.ensureFormat(this._.texture),
      n.call(this, M.lensBlur0, { delta0: i[0] }, this._.texture, this._.extraTexture),
      n.call(
        this,
        M.lensBlur1,
        { delta0: i[1], delta1: i[2] },
        this._.extraTexture,
        this._.extraTexture
      ),
      n.call(this, M.lensBlur0, { delta0: i[1] }),
      this._.extraTexture.use(1),
      n.call(this, M.lensBlur2, { power: 1 / t, delta0: i[2] }),
      this
    );
  }
  function C(e, t, r, o, i, a) {
    M.tiltShift =
      M.tiltShift ||
      new L(
        null,
        'uniform sampler2D texture;uniform float blurRadius;uniform float gradientRadius;uniform vec2 start;uniform vec2 end;uniform vec2 delta;uniform vec2 texSize;varying vec2 texCoord;' +
          k +
          'void main(){vec4 color=vec4(0.0);float total=0.0;float offset=random(vec3(12.9898,78.233,151.7182),0.0);vec2 normal=normalize(vec2(start.y-end.y,end.x-start.x));float radius=smoothstep(0.0,1.0,abs(dot(texCoord*texSize-start,normal))/gradientRadius)*blurRadius;for(float t=-30.0;t<=30.0;t++){float percent=(t+offset-0.5)/30.0;float weight=1.0-abs(percent);vec4 sample=texture2D(texture,texCoord+delta/texSize*percent*radius);sample.rgb*=sample.a;color+=sample*weight;total+=weight;}gl_FragColor=color/total;gl_FragColor.rgb/=gl_FragColor.a+0.00001;}'
      );
    var l = r - e,
      s = o - t,
      c = Math.sqrt(l * l + s * s);
    return (
      n.call(this, M.tiltShift, {
        blurRadius: i,
        gradientRadius: a,
        start: [e, t],
        end: [r, o],
        delta: [l / c, s / c],
        texSize: [this.width, this.height]
      }),
      n.call(this, M.tiltShift, {
        blurRadius: i,
        gradientRadius: a,
        start: [e, t],
        end: [r, o],
        delta: [-s / c, l / c],
        texSize: [this.width, this.height]
      }),
      this
    );
  }
  function A(e) {
    return (
      (M.triangleBlur =
        M.triangleBlur ||
        new L(
          null,
          'uniform sampler2D texture;uniform vec2 delta;varying vec2 texCoord;' +
            k +
            'void main(){vec4 color=vec4(0.0);float total=0.0;float offset=random(vec3(12.9898,78.233,151.7182),0.0);for(float t=-30.0;t<=30.0;t++){float percent=(t+offset-0.5)/30.0;float weight=1.0-abs(percent);vec4 sample=texture2D(texture,texCoord+delta*percent);sample.rgb*=sample.a;color+=sample*weight;total+=weight;}gl_FragColor=color/total;gl_FragColor.rgb/=gl_FragColor.a+0.00001;}'
        )),
      n.call(this, M.triangleBlur, { delta: [e / this.width, 0] }),
      n.call(this, M.triangleBlur, { delta: [0, e / this.height] }),
      this
    );
  }
  function D(e, t, r) {
    return (
      (M.zoomBlur =
        M.zoomBlur ||
        new L(
          null,
          'uniform sampler2D texture;uniform vec2 center;uniform float strength;uniform vec2 texSize;varying vec2 texCoord;' +
            k +
            'void main(){vec4 color=vec4(0.0);float total=0.0;vec2 toCenter=center-texCoord*texSize;float offset=random(vec3(12.9898,78.233,151.7182),0.0);for(float t=0.0;t<=40.0;t++){float percent=(t+offset)/40.0;float weight=4.0*(percent-percent*percent);vec4 sample=texture2D(texture,texCoord+toCenter*percent*strength/texSize);sample.rgb*=sample.a;color+=sample*weight;total+=weight;}gl_FragColor=color/total;gl_FragColor.rgb/=gl_FragColor.a+0.00001;}'
        )),
      n.call(this, M.zoomBlur, {
        center: [e, t],
        strength: r,
        texSize: [this.width, this.height]
      }),
      this
    );
  }
  function S(e, t, r, o) {
    return (
      (M.colorHalftone =
        M.colorHalftone ||
        new L(
          null,
          'uniform sampler2D texture;uniform vec2 center;uniform float angle;uniform float scale;uniform vec2 texSize;varying vec2 texCoord;float pattern(float angle){float s=sin(angle),c=cos(angle);vec2 tex=texCoord*texSize-center;vec2 point=vec2(c*tex.x-s*tex.y,s*tex.x+c*tex.y)*scale;return(sin(point.x)*sin(point.y))*4.0;}void main(){vec4 color=texture2D(texture,texCoord);vec3 cmy=1.0-color.rgb;float k=min(cmy.x,min(cmy.y,cmy.z));cmy=(cmy-k)/(1.0-k);cmy=clamp(cmy*10.0-3.0+vec3(pattern(angle+0.26179),pattern(angle+1.30899),pattern(angle)),0.0,1.0);k=clamp(k*10.0-5.0+pattern(angle+0.78539),0.0,1.0);gl_FragColor=vec4(1.0-cmy-k,color.a);}'
        )),
      n.call(this, M.colorHalftone, {
        center: [e, t],
        angle: r,
        scale: Math.PI / o,
        texSize: [this.width, this.height]
      }),
      this
    );
  }
  function F(e, t, r, o) {
    return (
      (M.dotScreen =
        M.dotScreen ||
        new L(
          null,
          'uniform sampler2D texture;uniform vec2 center;uniform float angle;uniform float scale;uniform vec2 texSize;varying vec2 texCoord;float pattern(){float s=sin(angle),c=cos(angle);vec2 tex=texCoord*texSize-center;vec2 point=vec2(c*tex.x-s*tex.y,s*tex.x+c*tex.y)*scale;return(sin(point.x)*sin(point.y))*4.0;}void main(){vec4 color=texture2D(texture,texCoord);float average=(color.r+color.g+color.b)/3.0;gl_FragColor=vec4(vec3(average*10.0-5.0+pattern()),color.a);}'
        )),
      n.call(this, M.dotScreen, {
        center: [e, t],
        angle: r,
        scale: Math.PI / o,
        texSize: [this.width, this.height]
      }),
      this
    );
  }
  function B(e) {
    return (
      (M.edgeWork1 =
        M.edgeWork1 ||
        new L(
          null,
          'uniform sampler2D texture;uniform vec2 delta;varying vec2 texCoord;' +
            k +
            'void main(){vec2 color=vec2(0.0);vec2 total=vec2(0.0);float offset=random(vec3(12.9898,78.233,151.7182),0.0);for(float t=-30.0;t<=30.0;t++){float percent=(t+offset-0.5)/30.0;float weight=1.0-abs(percent);vec3 sample=texture2D(texture,texCoord+delta*percent).rgb;float average=(sample.r+sample.g+sample.b)/3.0;color.x+=average*weight;total.x+=weight;if(abs(t)<15.0){weight=weight*2.0-1.0;color.y+=average*weight;total.y+=weight;}}gl_FragColor=vec4(color/total,0.0,1.0);}'
        )),
      (M.edgeWork2 =
        M.edgeWork2 ||
        new L(
          null,
          'uniform sampler2D texture;uniform vec2 delta;varying vec2 texCoord;' +
            k +
            'void main(){vec2 color=vec2(0.0);vec2 total=vec2(0.0);float offset=random(vec3(12.9898,78.233,151.7182),0.0);for(float t=-30.0;t<=30.0;t++){float percent=(t+offset-0.5)/30.0;float weight=1.0-abs(percent);vec2 sample=texture2D(texture,texCoord+delta*percent).xy;color.x+=sample.x*weight;total.x+=weight;if(abs(t)<15.0){weight=weight*2.0-1.0;color.y+=sample.y*weight;total.y+=weight;}}float c=clamp(10000.0*(color.y/total.y-color.x/total.x)+0.5,0.0,1.0);gl_FragColor=vec4(c,c,c,1.0);}'
        )),
      n.call(this, M.edgeWork1, { delta: [e / this.width, 0] }),
      n.call(this, M.edgeWork2, { delta: [0, e / this.height] }),
      this
    );
  }
  function U(e, t, r) {
    return (
      (M.hexagonalPixelate =
        M.hexagonalPixelate ||
        new L(
          null,
          'uniform sampler2D texture;uniform vec2 center;uniform float scale;uniform vec2 texSize;varying vec2 texCoord;void main(){vec2 tex=(texCoord*texSize-center)/scale;tex.y/=0.866025404;tex.x-=tex.y*0.5;vec2 a;if(tex.x+tex.y-floor(tex.x)-floor(tex.y)<1.0)a=vec2(floor(tex.x),floor(tex.y));else a=vec2(ceil(tex.x),ceil(tex.y));vec2 b=vec2(ceil(tex.x),floor(tex.y));vec2 c=vec2(floor(tex.x),ceil(tex.y));vec3 TEX=vec3(tex.x,tex.y,1.0-tex.x-tex.y);vec3 A=vec3(a.x,a.y,1.0-a.x-a.y);vec3 B=vec3(b.x,b.y,1.0-b.x-b.y);vec3 C=vec3(c.x,c.y,1.0-c.x-c.y);float alen=length(TEX-A);float blen=length(TEX-B);float clen=length(TEX-C);vec2 choice;if(alen<blen){if(alen<clen)choice=a;else choice=c;}else{if(blen<clen)choice=b;else choice=c;}choice.x+=choice.y*0.5;choice.y*=0.866025404;choice*=scale/texSize;gl_FragColor=texture2D(texture,choice+center/texSize);}'
        )),
      n.call(this, M.hexagonalPixelate, {
        center: [e, t],
        scale: r,
        texSize: [this.width, this.height]
      }),
      this
    );
  }
  function P(e) {
    return (
      (M.ink =
        M.ink ||
        new L(
          null,
          'uniform sampler2D texture;uniform float strength;uniform vec2 texSize;varying vec2 texCoord;void main(){vec2 dx=vec2(1.0/texSize.x,0.0);vec2 dy=vec2(0.0,1.0/texSize.y);vec4 color=texture2D(texture,texCoord);float bigTotal=0.0;float smallTotal=0.0;vec3 bigAverage=vec3(0.0);vec3 smallAverage=vec3(0.0);for(float x=-2.0;x<=2.0;x+=1.0){for(float y=-2.0;y<=2.0;y+=1.0){vec3 sample=texture2D(texture,texCoord+dx*x+dy*y).rgb;bigAverage+=sample;bigTotal+=1.0;if(abs(x)+abs(y)<2.0){smallAverage+=sample;smallTotal+=1.0;}}}vec3 edge=max(vec3(0.0),bigAverage/bigTotal-smallAverage/smallTotal);gl_FragColor=vec4(color.rgb-dot(edge,edge)*strength*100000.0,color.a);}'
        )),
      n.call(this, M.ink, {
        strength: e * e * e * e * e,
        texSize: [this.width, this.height]
      }),
      this
    );
  }
  function z(t, r, o, i) {
    return (
      (M.bulgePinch =
        M.bulgePinch ||
        d(
          'uniform float radius;uniform float strength;uniform vec2 center;',
          'coord-=center;float distance=length(coord);if(distance<radius){float percent=distance/radius;if(strength>0.0){coord*=mix(1.0,smoothstep(0.0,radius/distance,percent),strength*0.75);}else{coord*=mix(1.0,pow(percent,1.0+strength*0.75)*radius/distance,1.0-percent);}}coord+=center;'
        )),
      n.call(this, M.bulgePinch, {
        radius: o,
        strength: e(-1, i, 1),
        center: [t, r],
        texSize: [this.width, this.height]
      }),
      this
    );
  }
  function X(e, t, r) {
    if (
      ((M.matrixWarp =
        M.matrixWarp ||
        d(
          'uniform mat3 matrix;uniform bool useTextureSpace;',
          'if(useTextureSpace)coord=coord/texSize*2.0-1.0;vec3 warp=matrix*vec3(coord,1.0);coord=warp.xy/warp.z;if(useTextureSpace)coord=(coord*0.5+0.5)*texSize;'
        )),
      4 == (e = Array.prototype.concat.apply([], e)).length)
    )
      e = [e[0], e[1], 0, e[2], e[3], 0, 0, 0, 1];
    else if (9 != e.length) throw 'can only warp with 2x2 or 3x3 matrix';
    return (
      n.call(this, M.matrixWarp, {
        matrix: t ? f(e) : e,
        texSize: [this.width, this.height],
        useTextureSpace: 0 | r
      }),
      this
    );
  }
  function I(e, t) {
    var r = h.apply(null, t),
      o = h.apply(null, e);
    r = f(r);
    return this.matrixWarp([
      r[0] * o[0] + r[1] * o[3] + r[2] * o[6],
      r[0] * o[1] + r[1] * o[4] + r[2] * o[7],
      r[0] * o[2] + r[1] * o[5] + r[2] * o[8],
      r[3] * o[0] + r[4] * o[3] + r[5] * o[6],
      r[3] * o[1] + r[4] * o[4] + r[5] * o[7],
      r[3] * o[2] + r[4] * o[5] + r[5] * o[8],
      r[6] * o[0] + r[7] * o[3] + r[8] * o[6],
      r[6] * o[1] + r[7] * o[4] + r[8] * o[7],
      r[6] * o[2] + r[7] * o[5] + r[8] * o[8]
    ]);
  }
  function G(e, t, r, o) {
    return (
      (M.swirl =
        M.swirl ||
        d(
          'uniform float radius;uniform float angle;uniform vec2 center;',
          'coord-=center;float distance=length(coord);if(distance<radius){float percent=(radius-distance)/radius;float theta=percent*percent*angle;float s=sin(theta);float c=cos(theta);coord=vec2(coord.x*c-coord.y*s,coord.x*s+coord.y*c);}coord+=center;'
        )),
      n.call(this, M.swirl, {
        radius: r,
        center: [e, t],
        angle: o,
        texSize: [this.width, this.height]
      }),
      this
    );
  }
  var M,
    O = {};
  !(function () {
    function e() {}
    try {
      var t = document.createElement('canvas').getContext('experimental-webgl');
    } catch (e) {}
    if (
      t &&
      -1 === t.getSupportedExtensions().indexOf('OES_texture_float_linear') &&
      (function (e) {
        if (!e.getExtension('OES_texture_float')) return !1;
        var t = e.createFramebuffer(),
          r = e.createTexture();
        e.bindTexture(e.TEXTURE_2D, r),
          e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST),
          e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.NEAREST),
          e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE),
          e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE),
          e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, 1, 1, 0, e.RGBA, e.UNSIGNED_BYTE, null),
          e.bindFramebuffer(e.FRAMEBUFFER, t),
          e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, r, 0),
          (t = e.createTexture()),
          e.bindTexture(e.TEXTURE_2D, t),
          e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR),
          e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR),
          e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE),
          e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE),
          e.texImage2D(
            e.TEXTURE_2D,
            0,
            e.RGBA,
            2,
            2,
            0,
            e.RGBA,
            e.FLOAT,
            new Float32Array([2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
          ),
          (r = e.createProgram());
        var o = e.createShader(e.VERTEX_SHADER),
          i = e.createShader(e.FRAGMENT_SHADER);
        return (
          e.shaderSource(
            o,
            'attribute vec2 vertex;void main(){gl_Position=vec4(vertex,0.0,1.0);}'
          ),
          e.shaderSource(
            i,
            'uniform sampler2D texture;void main(){gl_FragColor=texture2D(texture,vec2(0.5));}'
          ),
          e.compileShader(o),
          e.compileShader(i),
          e.attachShader(r, o),
          e.attachShader(r, i),
          e.linkProgram(r),
          (o = e.createBuffer()),
          e.bindBuffer(e.ARRAY_BUFFER, o),
          e.bufferData(e.ARRAY_BUFFER, new Float32Array([0, 0]), e.STREAM_DRAW),
          e.enableVertexAttribArray(0),
          e.vertexAttribPointer(0, 2, e.FLOAT, !1, 0, 0),
          (o = new Uint8Array(4)),
          e.useProgram(r),
          e.viewport(0, 0, 1, 1),
          e.bindTexture(e.TEXTURE_2D, t),
          e.drawArrays(e.POINTS, 0, 1),
          e.readPixels(0, 0, 1, 1, e.RGBA, e.UNSIGNED_BYTE, o),
          127 === o[0] || 128 === o[0]
        );
      })(t)
    ) {
      var r = WebGLRenderingContext.prototype.getExtension,
        o = WebGLRenderingContext.prototype.getSupportedExtensions;
      (WebGLRenderingContext.prototype.getExtension = function (t) {
        return (
          'OES_texture_float_linear' === t
            ? (void 0 === this.$OES_texture_float_linear$ &&
                Object.defineProperty(this, '$OES_texture_float_linear$', {
                  enumerable: !1,
                  configurable: !1,
                  writable: !1,
                  value: new e()
                }),
              (t = this.$OES_texture_float_linear$))
            : (t = r.call(this, t)),
          t
        );
      }),
        (WebGLRenderingContext.prototype.getSupportedExtensions = function () {
          var e = o.call(this);
          return (
            -1 === e.indexOf('OES_texture_float_linear') &&
              e.push('OES_texture_float_linear'),
            e
          );
        });
    }
  })(),
    (O.canvas = function () {
      var e = document.createElement('canvas');
      try {
        M = e.getContext('experimental-webgl', { premultipliedAlpha: !1 });
      } catch (e) {
        M = null;
      }
      if (!M) throw 'This browser does not support WebGL';
      return (
        (e._ = {
          gl: M,
          isInitialized: !1,
          texture: null,
          spareTexture: null,
          flippedShader: null
        }),
        (e.texture = u(r)),
        (e.draw = u(i)),
        (e.update = u(a)),
        (e.replace = u(l)),
        (e.contents = u(s)),
        (e.getPixelArray = u(c)),
        (e.brightnessContrast = u(g)),
        (e.hexagonalPixelate = u(U)),
        (e.hueSaturation = u(_)),
        (e.colorHalftone = u(S)),
        (e.triangleBlur = u(A)),
        (e.unsharpMask = u(y)),
        (e.perspective = u(I)),
        (e.matrixWarp = u(X)),
        (e.bulgePinch = u(z)),
        (e.tiltShift = u(C)),
        (e.dotScreen = u(F)),
        (e.edgeWork = u(B)),
        (e.lensBlur = u(R)),
        (e.zoomBlur = u(D)),
        (e.noise = u(T)),
        (e.denoise = u(p)),
        (e.curves = u(v)),
        (e.swirl = u(G)),
        (e.ink = u(P)),
        (e.vignette = u(b)),
        (e.vibrance = u(w)),
        (e.sepia = u(E)),
        e
      );
    }),
    (O.splineInterpolate = m);
  var L = (function () {
    function e(e, t) {
      var r = M.createShader(e);
      if (
        (M.shaderSource(r, t),
        M.compileShader(r),
        !M.getShaderParameter(r, M.COMPILE_STATUS))
      )
        throw 'compile error: ' + M.getShaderInfoLog(r);
      return r;
    }
    function t(t, i) {
      if (
        ((this.texCoordAttribute = this.vertexAttribute = null),
        (this.program = M.createProgram()),
        (t = t || r),
        (i = 'precision highp float;' + (i = i || o)),
        M.attachShader(this.program, e(M.VERTEX_SHADER, t)),
        M.attachShader(this.program, e(M.FRAGMENT_SHADER, i)),
        M.linkProgram(this.program),
        !M.getProgramParameter(this.program, M.LINK_STATUS))
      )
        throw 'link error: ' + M.getProgramInfoLog(this.program);
    }
    var r =
        'attribute vec2 vertex;attribute vec2 _texCoord;varying vec2 texCoord;void main(){texCoord=_texCoord;gl_Position=vec4(vertex*2.0-1.0,0.0,1.0);}',
      o =
        'uniform sampler2D texture;varying vec2 texCoord;void main(){gl_FragColor=texture2D(texture,texCoord);}';
    return (
      (t.prototype.destroy = function () {
        M.deleteProgram(this.program), (this.program = null);
      }),
      (t.prototype.uniforms = function (e) {
        for (var t in (M.useProgram(this.program), e))
          if (e.hasOwnProperty(t)) {
            var r = M.getUniformLocation(this.program, t);
            if (null !== r) {
              var o = e[t];
              if ('[object Array]' == Object.prototype.toString.call(o))
                switch (o.length) {
                  case 1:
                    M.uniform1fv(r, new Float32Array(o));
                    break;
                  case 2:
                    M.uniform2fv(r, new Float32Array(o));
                    break;
                  case 3:
                    M.uniform3fv(r, new Float32Array(o));
                    break;
                  case 4:
                    M.uniform4fv(r, new Float32Array(o));
                    break;
                  case 9:
                    M.uniformMatrix3fv(r, !1, new Float32Array(o));
                    break;
                  case 16:
                    M.uniformMatrix4fv(r, !1, new Float32Array(o));
                    break;
                  default:
                    throw (
                      'dont\'t know how to load uniform "' + t + '" of length ' + o.length
                    );
                }
              else {
                if ('[object Number]' != Object.prototype.toString.call(o))
                  throw (
                    'attempted to set uniform "' +
                    t +
                    '" to invalid value ' +
                    (o || 'undefined').toString()
                  );
                M.uniform1f(r, o);
              }
            }
          }
        return this;
      }),
      (t.prototype.textures = function (e) {
        for (var t in (M.useProgram(this.program), e))
          e.hasOwnProperty(t) && M.uniform1i(M.getUniformLocation(this.program, t), e[t]);
        return this;
      }),
      (t.prototype.drawRect = function (e, t, r, o) {
        var i = M.getParameter(M.VIEWPORT);
        (t = void 0 !== t ? (t - i[1]) / i[3] : 0),
          (e = void 0 !== e ? (e - i[0]) / i[2] : 0),
          (r = void 0 !== r ? (r - i[0]) / i[2] : 1),
          (o = void 0 !== o ? (o - i[1]) / i[3] : 1),
          null == M.vertexBuffer && (M.vertexBuffer = M.createBuffer()),
          M.bindBuffer(M.ARRAY_BUFFER, M.vertexBuffer),
          M.bufferData(
            M.ARRAY_BUFFER,
            new Float32Array([e, t, e, o, r, t, r, o]),
            M.STATIC_DRAW
          ),
          null == M.texCoordBuffer &&
            ((M.texCoordBuffer = M.createBuffer()),
            M.bindBuffer(M.ARRAY_BUFFER, M.texCoordBuffer),
            M.bufferData(
              M.ARRAY_BUFFER,
              new Float32Array([0, 0, 0, 1, 1, 0, 1, 1]),
              M.STATIC_DRAW
            )),
          null == this.vertexAttribute &&
            ((this.vertexAttribute = M.getAttribLocation(this.program, 'vertex')),
            M.enableVertexAttribArray(this.vertexAttribute)),
          null == this.texCoordAttribute &&
            ((this.texCoordAttribute = M.getAttribLocation(this.program, '_texCoord')),
            M.enableVertexAttribArray(this.texCoordAttribute)),
          M.useProgram(this.program),
          M.bindBuffer(M.ARRAY_BUFFER, M.vertexBuffer),
          M.vertexAttribPointer(this.vertexAttribute, 2, M.FLOAT, !1, 0, 0),
          M.bindBuffer(M.ARRAY_BUFFER, M.texCoordBuffer),
          M.vertexAttribPointer(this.texCoordAttribute, 2, M.FLOAT, !1, 0, 0),
          M.drawArrays(M.TRIANGLE_STRIP, 0, 4);
      }),
      (t.getDefaultShader = function () {
        return (M.defaultShader = M.defaultShader || new t()), M.defaultShader;
      }),
      t
    );
  })();
  x.prototype.interpolate = function (e) {
    for (var t = 0, r = this.ya.length - 1; 1 < r - t; ) {
      var o = (r + t) >> 1;
      this.xa[o] > e ? (r = o) : (t = o);
    }
    o = this.xa[r] - this.xa[t];
    var i = (this.xa[r] - e) / o;
    return (
      (e = (e - this.xa[t]) / o),
      i * this.ya[t] +
        e * this.ya[r] +
        (((i * i * i - i) * this.y2[t] + (e * e * e - e) * this.y2[r]) * o * o) / 6
    );
  };
  var N = (function () {
      function e(e, t, r, o) {
        (this.gl = M),
          (this.id = M.createTexture()),
          (this.width = e),
          (this.height = t),
          (this.format = r),
          (this.type = o),
          M.bindTexture(M.TEXTURE_2D, this.id),
          M.texParameteri(M.TEXTURE_2D, M.TEXTURE_MAG_FILTER, M.LINEAR),
          M.texParameteri(M.TEXTURE_2D, M.TEXTURE_MIN_FILTER, M.LINEAR),
          M.texParameteri(M.TEXTURE_2D, M.TEXTURE_WRAP_S, M.CLAMP_TO_EDGE),
          M.texParameteri(M.TEXTURE_2D, M.TEXTURE_WRAP_T, M.CLAMP_TO_EDGE),
          e &&
            t &&
            M.texImage2D(
              M.TEXTURE_2D,
              0,
              this.format,
              e,
              t,
              0,
              this.format,
              this.type,
              null
            );
      }
      function t(e) {
        return (
          null == r && (r = document.createElement('canvas')),
          (r.width = e.width),
          (r.height = e.height),
          (e = r.getContext('2d')).clearRect(0, 0, r.width, r.height),
          e
        );
      }
      (e.fromElement = function (t) {
        var r = new e(0, 0, M.RGBA, M.UNSIGNED_BYTE);
        return r.loadContentsOf(t), r;
      }),
        (e.prototype.loadContentsOf = function (e) {
          (this.width = e.width || e.videoWidth),
            (this.height = e.height || e.videoHeight),
            M.bindTexture(M.TEXTURE_2D, this.id),
            M.texImage2D(M.TEXTURE_2D, 0, this.format, this.format, this.type, e);
        }),
        (e.prototype.initFromBytes = function (e, t, r) {
          (this.width = e),
            (this.height = t),
            (this.format = M.RGBA),
            (this.type = M.UNSIGNED_BYTE),
            M.bindTexture(M.TEXTURE_2D, this.id),
            M.texImage2D(
              M.TEXTURE_2D,
              0,
              M.RGBA,
              e,
              t,
              0,
              M.RGBA,
              this.type,
              new Uint8Array(r)
            );
        }),
        (e.prototype.destroy = function () {
          M.deleteTexture(this.id), (this.id = null);
        }),
        (e.prototype.use = function (e) {
          M.activeTexture(M.TEXTURE0 + (e || 0)), M.bindTexture(M.TEXTURE_2D, this.id);
        }),
        (e.prototype.unuse = function (e) {
          M.activeTexture(M.TEXTURE0 + (e || 0)), M.bindTexture(M.TEXTURE_2D, null);
        }),
        (e.prototype.ensureFormat = function (e, t, r, o) {
          if (1 == arguments.length) {
            var i = arguments[0];
            (e = i.width), (t = i.height), (r = i.format), (o = i.type);
          }
          (e == this.width && t == this.height && r == this.format && o == this.type) ||
            ((this.width = e),
            (this.height = t),
            (this.format = r),
            (this.type = o),
            M.bindTexture(M.TEXTURE_2D, this.id),
            M.texImage2D(
              M.TEXTURE_2D,
              0,
              this.format,
              e,
              t,
              0,
              this.format,
              this.type,
              null
            ));
        }),
        (e.prototype.drawTo = function (e) {
          if (
            ((M.framebuffer = M.framebuffer || M.createFramebuffer()),
            M.bindFramebuffer(M.FRAMEBUFFER, M.framebuffer),
            M.framebufferTexture2D(
              M.FRAMEBUFFER,
              M.COLOR_ATTACHMENT0,
              M.TEXTURE_2D,
              this.id,
              0
            ),
            M.checkFramebufferStatus(M.FRAMEBUFFER) !== M.FRAMEBUFFER_COMPLETE)
          )
            throw Error('incomplete framebuffer');
          M.viewport(0, 0, this.width, this.height),
            e(),
            M.bindFramebuffer(M.FRAMEBUFFER, null);
        });
      var r = null;
      return (
        (e.prototype.fillUsingCanvas = function (e) {
          return (
            e(t(this)),
            (this.format = M.RGBA),
            (this.type = M.UNSIGNED_BYTE),
            M.bindTexture(M.TEXTURE_2D, this.id),
            M.texImage2D(M.TEXTURE_2D, 0, M.RGBA, M.RGBA, M.UNSIGNED_BYTE, r),
            this
          );
        }),
        (e.prototype.toImage = function (e) {
          this.use(), L.getDefaultShader().drawRect();
          var o = 4 * this.width * this.height,
            i = new Uint8Array(o),
            a = t(this),
            n = a.createImageData(this.width, this.height);
          M.readPixels(0, 0, this.width, this.height, M.RGBA, M.UNSIGNED_BYTE, i);
          for (var l = 0; l < o; l++) n.data[l] = i[l];
          a.putImageData(n, 0, 0), (e.src = r.toDataURL());
        }),
        (e.prototype.swapWith = function (e) {
          var t;
          (t = e.id),
            (e.id = this.id),
            (this.id = t),
            (t = e.width),
            (e.width = this.width),
            (this.width = t),
            (t = e.height),
            (e.height = this.height),
            (this.height = t),
            (t = e.format),
            (e.format = this.format),
            (this.format = t);
        }),
        e
      );
    })(),
    k =
      'float random(vec3 scale,float seed){return fract(sin(dot(gl_FragCoord.xyz+seed,scale))*43758.5453+seed);}';
  return O;
})();

/* jeelizFaceFilter/helpers/addDragEventListener.js */
('use strict');
const _states = { idle: 0, loading: 1, dragging: 2 };
let _state = _states.idle,
  _dP = new window.THREE.Vector3(),
  _x0 = -1,
  _y0 = -1,
  _scenes = null,
  _boundFunction = null;
function updateMeshPosition(e, t) {
  const n = new window.THREE.Vector3(),
    o = new window.THREE.Vector3(),
    s = new window.THREE.Vector3();
  if (_state !== _states.dragging) return;
  const i = !(!t.touches || !t.touches.length),
    u = i ? t.touches[0].clientX : t.clientX,
    c = i ? t.touches[0].clientY : t.clientY,
    d = u - _x0,
    r = c - _y0;
  (_x0 = u), (_y0 = c);
  const a = -d / e.offsetWidth,
    E = -r / e.offsetHeight,
    m =
      1 === _scenes.length
        ? _scenes[0]
        : _scenes.find(function (t) {
            if (!t.parent.visible) return !1;
            n.set((-u / e.offsetWidth) * 2 + 1, (-c / e.offsetHeight) * 2 + 1, 0.5);
            const o = new window.THREE.Raycaster();
            return (
              o.setFromCamera(n, window.THREECAMERA),
              o.intersectObjects(t.children).length > 0
            );
          });
  if (!m) return;
  if ((s.set(a, E, 1), o.copy(s), !window.THREECAMERA))
    throw new Error(
      'Cannot find the THREE.js camera. Please check that window.THREECAMERA is the default scene camera'
    );
  o.unproject(window.THREECAMERA), o.sub(window.THREECAMERA.position), o.normalize();
  const w = -1 / o.z;
  _dP.copy(o).multiplyScalar(w), _dP.setZ(0);
  const l = new window.THREE.Quaternion(),
    _ = new window.THREE.Euler();
  _.setFromQuaternion(l),
    _dP.applyEuler(m.getWorldQuaternion(_)),
    _dP.multiplyScalar(10),
    m.position.add(_dP);
}
function setMousePosition0(e) {
  const t = !(!e.touches || !e.touches.length);
  (t && e.touches.length > 1) ||
    ((_x0 = t ? e.touches[0].clientX : e.clientX),
    (_y0 = t ? e.touches[0].clientY : e.clientY));
}
function mouseDown(e) {
  setMousePosition0(e), (_state = _states.dragging);
}
function mouseUp() {
  _state = _states.idle;
}
function addDragEventListener(e, t, n) {
  _scenes = Array.isArray(e) ? e : [e];
  const o = document.getElementById(void 0 === t ? 'jeeFaceFilterCanvas' : t);
  (_state = _states.idle),
    (_dP = new window.THREE.Vector3()),
    (_x0 = void 0),
    (_y0 = void 0),
    n
      ? (o.removeEventListener('mousemove', _boundFunction, !0),
        o.removeEventListener('touchmove', _boundFunction, !0),
        o.removeEventListener('mousedown', mouseDown),
        o.removeEventListener('touchstart', mouseDown),
        o.removeEventListener('mouseup', mouseUp),
        o.removeEventListener('touchend', mouseUp),
        o.removeEventListener('mouseout', mouseUp),
        o.removeEventListener('touchcancel', mouseUp))
      : ((_boundFunction = updateMeshPosition.bind(this, o)),
        o.addEventListener('mousemove', _boundFunction, !0),
        o.addEventListener('touchmove', _boundFunction, !0),
        o.addEventListener('mousedown', mouseDown),
        o.addEventListener('touchstart', mouseDown),
        o.addEventListener('mouseup', mouseUp),
        o.addEventListener('touchend', mouseUp),
        o.addEventListener('mouseout', mouseUp),
        o.addEventListener('touchcancel', mouseUp));
}
