var createFFmpegCore = (function () {
  var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined
  if (typeof __filename !== 'undefined') _scriptDir = _scriptDir || __filename
  return function (createFFmpegCore) {
    createFFmpegCore = createFFmpegCore || {}

    var e
    e || (e = typeof createFFmpegCore !== 'undefined' ? createFFmpegCore : {})
    var aa, ba
    e.ready = new Promise(function (a, b) {
      aa = a
      ba = b
    })
    e.quit = function (a) {
      if (e.onExit) e.onExit(a)
      throw new ca(a)
    }
    e.exit = da
    ea = k = function () {}
    var fa = {},
      l
    for (l in e) e.hasOwnProperty(l) && (fa[l] = e[l])
    var ha = [],
      ia = './this.program'
    function ja(a, b) {
      throw b
    }
    var ka = !1,
      v = !1,
      x = !1,
      la = !1
    ka = 'object' === typeof window
    v = 'function' === typeof importScripts
    x = 'object' === typeof process && 'object' === typeof process.versions && 'string' === typeof process.versions.node
    la = !ka && !x && !v
    var y = '',
      ma,
      na,
      oa,
      pa,
      qa
    if (x)
      (y = v ? require('path').dirname(y) + '/' : __dirname + '/'),
        (ma = function (a, b) {
          pa || (pa = require('fs'))
          qa || (qa = require('path'))
          a = qa.normalize(a)
          return pa.readFileSync(a, b ? null : 'utf8')
        }),
        (oa = function (a) {
          a = ma(a, !0)
          a.buffer || (a = new Uint8Array(a))
          assert(a.buffer)
          return a
        }),
        1 < process.argv.length && (ia = process.argv[1].replace(/\\/g, '/')),
        (ha = process.argv.slice(2)),
        process.on('uncaughtException', function (a) {
          if (!(a instanceof ca)) throw a
        }),
        process.on('unhandledRejection', B),
        (ja = function (a) {
          process.exit(a)
        }),
        (e.inspect = function () {
          return '[Emscripten Module object]'
        })
    else if (la)
      'undefined' != typeof read &&
        (ma = function (a) {
          return read(a)
        }),
        (oa = function (a) {
          if ('function' === typeof readbuffer) return new Uint8Array(readbuffer(a))
          a = read(a, 'binary')
          assert('object' === typeof a)
          return a
        }),
        'undefined' != typeof scriptArgs ? (ha = scriptArgs) : 'undefined' != typeof arguments && (ha = arguments),
        'function' === typeof quit &&
          (ja = function (a) {
            quit(a)
          }),
        'undefined' !== typeof print &&
          ('undefined' === typeof console && (console = {}),
          (console.log = print),
          (console.warn = console.error = 'undefined' !== typeof printErr ? printErr : print))
    else if (ka || v)
      v
        ? (y = self.location.href)
        : 'undefined' !== typeof document && document.currentScript && (y = document.currentScript.src),
        _scriptDir && (y = _scriptDir),
        0 !== y.indexOf('blob:') ? (y = y.substr(0, y.lastIndexOf('/') + 1)) : (y = ''),
        (ma = function (a) {
          var b = new XMLHttpRequest()
          b.open('GET', a, !1)
          b.send(null)
          return b.responseText
        }),
        v &&
          (oa = function (a) {
            var b = new XMLHttpRequest()
            b.open('GET', a, !1)
            b.responseType = 'arraybuffer'
            b.send(null)
            return new Uint8Array(b.response)
          }),
        (na = function (a, b, c) {
          var d = new XMLHttpRequest()
          d.open('GET', a, !0)
          d.responseType = 'arraybuffer'
          d.onload = function () {
            200 == d.status || (0 == d.status && d.response) ? b(d.response) : c()
          }
          d.onerror = c
          d.send(null)
        })
    var ea = e.print || console.log.bind(console),
      k = e.printErr || console.warn.bind(console)
    for (l in fa) fa.hasOwnProperty(l) && (e[l] = fa[l])
    fa = null
    e.arguments && (ha = e.arguments)
    e.thisProgram && (ia = e.thisProgram)
    e.quit && (ja = e.quit)
    var ra = 0,
      sa
    e.wasmBinary && (sa = e.wasmBinary)
    var noExitRuntime = e.noExitRuntime || !0
    'object' !== typeof WebAssembly && B('no native wasm support detected')
    var ta,
      ua = !1
    function assert(a, b) {
      a || B('Assertion failed: ' + b)
    }
    function va(a) {
      var b = e['_' + a]
      assert(b, 'Cannot call unknown function ' + a + ', make sure it is exported')
      return b
    }
    function wa(a, b, c, d) {
      var f = {
          string: function (q) {
            var r = 0
            if (null !== q && void 0 !== q && 0 !== q) {
              var w = (q.length << 2) + 1
              r = xa(w)
              C(q, D, r, w)
            }
            return r
          },
          array: function (q) {
            var r = xa(q.length)
            F.set(q, r)
            return r
          },
        },
        g = va(a),
        h = []
      a = 0
      if (d)
        for (var n = 0; n < d.length; n++) {
          var p = f[c[n]]
          p ? (0 === a && (a = G()), (h[n] = p(d[n]))) : (h[n] = d[n])
        }
      c = g.apply(null, h)
      c = (function (q) {
        return 'string' === b ? H(q) : 'boolean' === b ? !!q : q
      })(c)
      0 !== a && I(a)
      return c
    }
    var ya = 'undefined' !== typeof TextDecoder ? new TextDecoder('utf8') : void 0
    function za(a, b, c) {
      var d = b + c
      for (c = b; a[c] && !(c >= d); ) ++c
      if (16 < c - b && a.subarray && ya) return ya.decode(a.subarray(b, c))
      for (d = ''; b < c; ) {
        var f = a[b++]
        if (f & 128) {
          var g = a[b++] & 63
          if (192 == (f & 224)) d += String.fromCharCode(((f & 31) << 6) | g)
          else {
            var h = a[b++] & 63
            f =
              224 == (f & 240)
                ? ((f & 15) << 12) | (g << 6) | h
                : ((f & 7) << 18) | (g << 12) | (h << 6) | (a[b++] & 63)
            65536 > f
              ? (d += String.fromCharCode(f))
              : ((f -= 65536), (d += String.fromCharCode(55296 | (f >> 10), 56320 | (f & 1023))))
          }
        } else d += String.fromCharCode(f)
      }
      return d
    }
    function H(a) {
      return a ? za(D, a, void 0) : ''
    }
    function C(a, b, c, d) {
      if (!(0 < d)) return 0
      var f = c
      d = c + d - 1
      for (var g = 0; g < a.length; ++g) {
        var h = a.charCodeAt(g)
        if (55296 <= h && 57343 >= h) {
          var n = a.charCodeAt(++g)
          h = (65536 + ((h & 1023) << 10)) | (n & 1023)
        }
        if (127 >= h) {
          if (c >= d) break
          b[c++] = h
        } else {
          if (2047 >= h) {
            if (c + 1 >= d) break
            b[c++] = 192 | (h >> 6)
          } else {
            if (65535 >= h) {
              if (c + 2 >= d) break
              b[c++] = 224 | (h >> 12)
            } else {
              if (c + 3 >= d) break
              b[c++] = 240 | (h >> 18)
              b[c++] = 128 | ((h >> 12) & 63)
            }
            b[c++] = 128 | ((h >> 6) & 63)
          }
          b[c++] = 128 | (h & 63)
        }
      }
      b[c] = 0
      return c - f
    }
    function Aa(a) {
      for (var b = 0, c = 0; c < a.length; ++c) {
        var d = a.charCodeAt(c)
        55296 <= d && 57343 >= d && (d = (65536 + ((d & 1023) << 10)) | (a.charCodeAt(++c) & 1023))
        127 >= d ? ++b : (b = 2047 >= d ? b + 2 : 65535 >= d ? b + 3 : b + 4)
      }
      return b
    }
    function Ba(a) {
      var b = Aa(a) + 1,
        c = Ca(b)
      c && C(a, F, c, b)
      return c
    }
    function Da(a) {
      var b = Aa(a) + 1,
        c = xa(b)
      C(a, F, c, b)
      return c
    }
    function K(a, b, c) {
      for (var d = 0; d < a.length; ++d) F[b++ >> 0] = a.charCodeAt(d)
      c || (F[b >> 0] = 0)
    }
    var Ea,
      F,
      D,
      L,
      Fa,
      M,
      Ga,
      Ha,
      O,
      Ia = [],
      Ja = [],
      Ka = [],
      La = []
    function Ma() {
      var a = e.preRun.shift()
      Ia.unshift(a)
    }
    var Na = 0,
      Qa = null,
      Ra = null
    function Sa() {
      Na++
      e.monitorRunDependencies && e.monitorRunDependencies(Na)
    }
    function Ta() {
      Na--
      e.monitorRunDependencies && e.monitorRunDependencies(Na)
      if (0 == Na && (null !== Qa && (clearInterval(Qa), (Qa = null)), Ra)) {
        var a = Ra
        Ra = null
        a()
      }
    }
    e.preloadedImages = {}
    e.preloadedAudios = {}
    function B(a) {
      if (e.onAbort) e.onAbort(a)
      k(a)
      ua = !0
      a = new WebAssembly.RuntimeError('abort(' + a + '). Build with -s ASSERTIONS=1 for more info.')
      ba(a)
      throw a
    }
    function Ua() {
      return P.startsWith('data:application/octet-stream;base64,')
    }
    var P
    P = 'ffmpeg-core.wasm'
    if (!Ua()) {
      var Va = P
      P = e.locateFile ? e.locateFile(Va, y) : y + Va
    }
    function Wa() {
      var a = P
      try {
        if (a == P && sa) return new Uint8Array(sa)
        if (oa) return oa(a)
        throw 'both async and sync fetching of the wasm failed'
      } catch (b) {
        B(b)
      }
    }
    function Xa() {
      if (!sa && (ka || v)) {
        if ('function' === typeof fetch && !P.startsWith('file://'))
          return fetch(P, { credentials: 'same-origin' })
            .then(function (a) {
              if (!a.ok) throw "failed to load wasm binary file at '" + P + "'"
              return a.arrayBuffer()
            })
            .catch(function () {
              return Wa()
            })
        if (na)
          return new Promise(function (a, b) {
            na(
              P,
              function (c) {
                a(new Uint8Array(c))
              },
              b,
            )
          })
      }
      return Promise.resolve().then(function () {
        return Wa()
      })
    }
    var Q, R
    function Ya(a) {
      for (; 0 < a.length; ) {
        var b = a.shift()
        if ('function' == typeof b) b(e)
        else {
          var c = b.fe
          'number' === typeof c ? (void 0 === b.qc ? O.get(c)() : O.get(c)(b.qc)) : c(void 0 === b.qc ? null : b.qc)
        }
      }
    }
    var Za = 0,
      $a
    x
      ? ($a = function () {
          var a = process.hrtime()
          return 1e3 * a[0] + a[1] / 1e6
        })
      : 'undefined' !== typeof dateNow
      ? ($a = dateNow)
      : ($a = function () {
          return performance.now()
        })
    function ab(a, b) {
      if (0 === a) a = Date.now()
      else if (1 === a || 4 === a) a = $a()
      else return (M[cb() >> 2] = 28), -1
      M[b >> 2] = (a / 1e3) | 0
      M[(b + 4) >> 2] = ((a % 1e3) * 1e6) | 0
      return 0
    }
    function db(a, b) {
      a = new Date(1e3 * M[a >> 2])
      M[b >> 2] = a.getUTCSeconds()
      M[(b + 4) >> 2] = a.getUTCMinutes()
      M[(b + 8) >> 2] = a.getUTCHours()
      M[(b + 12) >> 2] = a.getUTCDate()
      M[(b + 16) >> 2] = a.getUTCMonth()
      M[(b + 20) >> 2] = a.getUTCFullYear() - 1900
      M[(b + 24) >> 2] = a.getUTCDay()
      M[(b + 36) >> 2] = 0
      M[(b + 32) >> 2] = 0
      M[(b + 28) >> 2] = ((a.getTime() - Date.UTC(a.getUTCFullYear(), 0, 1, 0, 0, 0, 0)) / 864e5) | 0
      db.Hc || (db.Hc = Ba('GMT'))
      M[(b + 40) >> 2] = db.Hc
      return b
    }
    function eb() {
      function a(h) {
        return (h = h.toTimeString().match(/\(([A-Za-z ]+)\)$/)) ? h[1] : 'GMT'
      }
      if (!fb) {
        fb = !0
        var b = new Date().getFullYear(),
          c = new Date(b, 0, 1),
          d = new Date(b, 6, 1)
        b = c.getTimezoneOffset()
        var f = d.getTimezoneOffset(),
          g = Math.max(b, f)
        M[gb() >> 2] = 60 * g
        M[hb() >> 2] = Number(b != f)
        c = a(c)
        d = a(d)
        c = Ba(c)
        d = Ba(d)
        f < b ? ((M[ib() >> 2] = c), (M[(ib() + 4) >> 2] = d)) : ((M[ib() >> 2] = d), (M[(ib() + 4) >> 2] = c))
      }
    }
    var fb
    function jb(a, b) {
      eb()
      a = new Date(1e3 * M[a >> 2])
      M[b >> 2] = a.getSeconds()
      M[(b + 4) >> 2] = a.getMinutes()
      M[(b + 8) >> 2] = a.getHours()
      M[(b + 12) >> 2] = a.getDate()
      M[(b + 16) >> 2] = a.getMonth()
      M[(b + 20) >> 2] = a.getFullYear() - 1900
      M[(b + 24) >> 2] = a.getDay()
      var c = new Date(a.getFullYear(), 0, 1)
      M[(b + 28) >> 2] = ((a.getTime() - c.getTime()) / 864e5) | 0
      M[(b + 36) >> 2] = -(60 * a.getTimezoneOffset())
      var d = new Date(a.getFullYear(), 6, 1).getTimezoneOffset()
      c = c.getTimezoneOffset()
      a = (d != c && a.getTimezoneOffset() == Math.min(c, d)) | 0
      M[(b + 32) >> 2] = a
      a = M[(ib() + (a ? 4 : 0)) >> 2]
      M[(b + 40) >> 2] = a
      return b
    }
    function kb(a, b) {
      for (var c = 0, d = a.length - 1; 0 <= d; d--) {
        var f = a[d]
        '.' === f ? a.splice(d, 1) : '..' === f ? (a.splice(d, 1), c++) : c && (a.splice(d, 1), c--)
      }
      if (b) for (; c; c--) a.unshift('..')
      return a
    }
    function lb(a) {
      var b = '/' === a.charAt(0),
        c = '/' === a.substr(-1)
      ;(a = kb(
        a.split('/').filter(function (d) {
          return !!d
        }),
        !b,
      ).join('/')) ||
        b ||
        (a = '.')
      a && c && (a += '/')
      return (b ? '/' : '') + a
    }
    function nb(a) {
      var b = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1)
      a = b[0]
      b = b[1]
      if (!a && !b) return '.'
      b && (b = b.substr(0, b.length - 1))
      return a + b
    }
    function S(a) {
      if ('/' === a) return '/'
      a = lb(a)
      a = a.replace(/\/$/, '')
      var b = a.lastIndexOf('/')
      return -1 === b ? a : a.substr(b + 1)
    }
    function ob(a, b) {
      return lb(a + '/' + b)
    }
    function pb() {
      if ('object' === typeof crypto && 'function' === typeof crypto.getRandomValues) {
        var a = new Uint8Array(1)
        return function () {
          crypto.getRandomValues(a)
          return a[0]
        }
      }
      if (x)
        try {
          var b = require('crypto')
          return function () {
            return b.randomBytes(1)[0]
          }
        } catch (c) {}
      return function () {
        B('randomDevice')
      }
    }
    function qb() {
      for (var a = '', b = !1, c = arguments.length - 1; -1 <= c && !b; c--) {
        b = 0 <= c ? arguments[c] : T.cwd()
        if ('string' !== typeof b) throw new TypeError('Arguments to path.resolve must be strings')
        if (!b) return ''
        a = b + '/' + a
        b = '/' === b.charAt(0)
      }
      a = kb(
        a.split('/').filter(function (d) {
          return !!d
        }),
        !b,
      ).join('/')
      return (b ? '/' : '') + a || '.'
    }
    function rb(a, b) {
      function c(h) {
        for (var n = 0; n < h.length && '' === h[n]; n++);
        for (var p = h.length - 1; 0 <= p && '' === h[p]; p--);
        return n > p ? [] : h.slice(n, p - n + 1)
      }
      a = qb(a).substr(1)
      b = qb(b).substr(1)
      a = c(a.split('/'))
      b = c(b.split('/'))
      for (var d = Math.min(a.length, b.length), f = d, g = 0; g < d; g++)
        if (a[g] !== b[g]) {
          f = g
          break
        }
      d = []
      for (g = f; g < a.length; g++) d.push('..')
      d = d.concat(b.slice(f))
      return d.join('/')
    }
    var sb = []
    function tb(a, b) {
      sb[a] = { input: [], output: [], Mb: b }
      T.Ec(a, ub)
    }
    var ub = {
        open: function (a) {
          var b = sb[a.node.rdev]
          if (!b) throw new T.Za(43)
          a.tty = b
          a.seekable = !1
        },
        close: function (a) {
          a.tty.Mb.flush(a.tty)
        },
        flush: function (a) {
          a.tty.Mb.flush(a.tty)
        },
        read: function (a, b, c, d) {
          if (!a.tty || !a.tty.Mb.Uc) throw new T.Za(60)
          for (var f = 0, g = 0; g < d; g++) {
            try {
              var h = a.tty.Mb.Uc(a.tty)
            } catch (n) {
              throw new T.Za(29)
            }
            if (void 0 === h && 0 === f) throw new T.Za(6)
            if (null === h || void 0 === h) break
            f++
            b[c + g] = h
          }
          f && (a.node.timestamp = Date.now())
          return f
        },
        write: function (a, b, c, d) {
          if (!a.tty || !a.tty.Mb.Bc) throw new T.Za(60)
          try {
            for (var f = 0; f < d; f++) a.tty.Mb.Bc(a.tty, b[c + f])
          } catch (g) {
            throw new T.Za(29)
          }
          d && (a.node.timestamp = Date.now())
          return f
        },
      },
      wb = {
        Uc: function (a) {
          if (!a.input.length) {
            var b = null
            if (x) {
              var c = Buffer.Ib ? Buffer.Ib(256) : new Buffer(256),
                d = 0
              try {
                d = pa.readSync(process.stdin.fd, c, 0, 256, null)
              } catch (f) {
                if (f.toString().includes('EOF')) d = 0
                else throw f
              }
              0 < d ? (b = c.slice(0, d).toString('utf-8')) : (b = null)
            } else
              'undefined' != typeof window && 'function' == typeof window.prompt
                ? ((b = window.prompt('Input: ')), null !== b && (b += '\n'))
                : 'function' == typeof readline && ((b = readline()), null !== b && (b += '\n'))
            if (!b) return null
            a.input = vb(b, !0)
          }
          return a.input.shift()
        },
        Bc: function (a, b) {
          null === b || 10 === b ? (ea(za(a.output, 0)), (a.output = [])) : 0 != b && a.output.push(b)
        },
        flush: function (a) {
          a.output && 0 < a.output.length && (ea(za(a.output, 0)), (a.output = []))
        },
      },
      xb = {
        Bc: function (a, b) {
          null === b || 10 === b ? (k(za(a.output, 0)), (a.output = [])) : 0 != b && a.output.push(b)
        },
        flush: function (a) {
          a.output && 0 < a.output.length && (k(za(a.output, 0)), (a.output = []))
        },
      },
      U = {
        xb: null,
        gb: function () {
          return U.createNode(null, '/', 16895, 0)
        },
        createNode: function (a, b, c, d) {
          if (T.Dd(c) || T.isFIFO(c)) throw new T.Za(63)
          U.xb ||
            (U.xb = {
              dir: {
                node: {
                  ub: U.$a.ub,
                  lb: U.$a.lb,
                  lookup: U.$a.lookup,
                  yb: U.$a.yb,
                  rename: U.$a.rename,
                  unlink: U.$a.unlink,
                  rmdir: U.$a.rmdir,
                  readdir: U.$a.readdir,
                  symlink: U.$a.symlink,
                },
                stream: { pb: U.ab.pb },
              },
              file: {
                node: { ub: U.$a.ub, lb: U.$a.lb },
                stream: { pb: U.ab.pb, read: U.ab.read, write: U.ab.write, Sb: U.ab.Sb, Kb: U.ab.Kb, Lb: U.ab.Lb },
              },
              link: { node: { ub: U.$a.ub, lb: U.$a.lb, readlink: U.$a.readlink }, stream: {} },
              Kc: { node: { ub: U.$a.ub, lb: U.$a.lb }, stream: T.qd },
            })
          c = T.createNode(a, b, c, d)
          T.ib(c.mode)
            ? ((c.$a = U.xb.dir.node), (c.ab = U.xb.dir.stream), (c.cb = {}))
            : T.isFile(c.mode)
            ? ((c.$a = U.xb.file.node), (c.ab = U.xb.file.stream), (c.fb = 0), (c.cb = null))
            : T.Db(c.mode)
            ? ((c.$a = U.xb.link.node), (c.ab = U.xb.link.stream))
            : T.Ub(c.mode) && ((c.$a = U.xb.Kc.node), (c.ab = U.xb.Kc.stream))
          c.timestamp = Date.now()
          a && ((a.cb[b] = c), (a.timestamp = c.timestamp))
          return c
        },
        ge: function (a) {
          return a.cb ? (a.cb.subarray ? a.cb.subarray(0, a.fb) : new Uint8Array(a.cb)) : new Uint8Array(0)
        },
        Qc: function (a, b) {
          var c = a.cb ? a.cb.length : 0
          c >= b ||
            ((b = Math.max(b, (c * (1048576 > c ? 2 : 1.125)) >>> 0)),
            0 != c && (b = Math.max(b, 256)),
            (c = a.cb),
            (a.cb = new Uint8Array(b)),
            0 < a.fb && a.cb.set(c.subarray(0, a.fb), 0))
        },
        Rd: function (a, b) {
          if (a.fb != b)
            if (0 == b) (a.cb = null), (a.fb = 0)
            else {
              var c = a.cb
              a.cb = new Uint8Array(b)
              c && a.cb.set(c.subarray(0, Math.min(b, a.fb)))
              a.fb = b
            }
        },
        $a: {
          ub: function (a) {
            var b = {}
            b.dev = T.Ub(a.mode) ? a.id : 1
            b.ino = a.id
            b.mode = a.mode
            b.nlink = 1
            b.uid = 0
            b.gid = 0
            b.rdev = a.rdev
            T.ib(a.mode)
              ? (b.size = 4096)
              : T.isFile(a.mode)
              ? (b.size = a.fb)
              : T.Db(a.mode)
              ? (b.size = a.link.length)
              : (b.size = 0)
            b.atime = new Date(a.timestamp)
            b.mtime = new Date(a.timestamp)
            b.ctime = new Date(a.timestamp)
            b.od = 4096
            b.blocks = Math.ceil(b.size / b.od)
            return b
          },
          lb: function (a, b) {
            void 0 !== b.mode && (a.mode = b.mode)
            void 0 !== b.timestamp && (a.timestamp = b.timestamp)
            void 0 !== b.size && U.Rd(a, b.size)
          },
          lookup: function () {
            throw T.tc[44]
          },
          yb: function (a, b, c, d) {
            return U.createNode(a, b, c, d)
          },
          rename: function (a, b, c) {
            if (T.ib(a.mode)) {
              try {
                var d = T.vb(b, c)
              } catch (g) {}
              if (d) for (var f in d.cb) throw new T.Za(55)
            }
            delete a.parent.cb[a.name]
            a.parent.timestamp = Date.now()
            a.name = c
            b.cb[c] = a
            b.timestamp = a.parent.timestamp
            a.parent = b
          },
          unlink: function (a, b) {
            delete a.cb[b]
            a.timestamp = Date.now()
          },
          rmdir: function (a, b) {
            var c = T.vb(a, b),
              d
            for (d in c.cb) throw new T.Za(55)
            delete a.cb[b]
            a.timestamp = Date.now()
          },
          readdir: function (a) {
            var b = ['.', '..'],
              c
            for (c in a.cb) a.cb.hasOwnProperty(c) && b.push(c)
            return b
          },
          symlink: function (a, b, c) {
            a = U.createNode(a, b, 41471, 0)
            a.link = c
            return a
          },
          readlink: function (a) {
            if (!T.Db(a.mode)) throw new T.Za(28)
            return a.link
          },
        },
        ab: {
          read: function (a, b, c, d, f) {
            var g = a.node.cb
            if (f >= a.node.fb) return 0
            a = Math.min(a.node.fb - f, d)
            if (8 < a && g.subarray) b.set(g.subarray(f, f + a), c)
            else for (d = 0; d < a; d++) b[c + d] = g[f + d]
            return a
          },
          write: function (a, b, c, d, f, g) {
            if (!d) return 0
            a = a.node
            a.timestamp = Date.now()
            if (b.subarray && (!a.cb || a.cb.subarray)) {
              if (g) return (a.cb = b.subarray(c, c + d)), (a.fb = d)
              if (0 === a.fb && 0 === f) return (a.cb = b.slice(c, c + d)), (a.fb = d)
              if (f + d <= a.fb) return a.cb.set(b.subarray(c, c + d), f), d
            }
            U.Qc(a, f + d)
            if (a.cb.subarray && b.subarray) a.cb.set(b.subarray(c, c + d), f)
            else for (g = 0; g < d; g++) a.cb[f + g] = b[c + g]
            a.fb = Math.max(a.fb, f + d)
            return d
          },
          pb: function (a, b, c) {
            1 === c ? (b += a.position) : 2 === c && T.isFile(a.node.mode) && (b += a.node.fb)
            if (0 > b) throw new T.Za(28)
            return b
          },
          Sb: function (a, b, c) {
            U.Qc(a.node, b + c)
            a.node.fb = Math.max(a.node.fb, b + c)
          },
          Kb: function (a, b, c, d, f, g) {
            if (0 !== b) throw new T.Za(28)
            if (!T.isFile(a.node.mode)) throw new T.Za(43)
            a = a.node.cb
            if (g & 2 || a.buffer !== Ea) {
              if (0 < d || d + c < a.length)
                a.subarray ? (a = a.subarray(d, d + c)) : (a = Array.prototype.slice.call(a, d, d + c))
              d = !0
              g = 65536 * Math.ceil(c / 65536)
              for (b = Ca(g); c < g; ) F[b + c++] = 0
              c = b
              if (!c) throw new T.Za(48)
              F.set(a, c)
            } else (d = !1), (c = a.byteOffset)
            return { Qd: c, oc: d }
          },
          Lb: function (a, b, c, d, f) {
            if (!T.isFile(a.node.mode)) throw new T.Za(43)
            if (f & 2) return 0
            U.ab.write(a, b, 0, d, c, !1)
            return 0
          },
        },
      },
      T = {
        root: null,
        Xb: [],
        Oc: {},
        streams: [],
        Kd: 1,
        wb: null,
        Nc: '/',
        wc: !1,
        Yc: !0,
        kb: {},
        ed: { $c: { kd: 1, ld: 2 } },
        Za: null,
        tc: {},
        yd: null,
        ic: 0,
        eb: function (a, b) {
          a = qb(T.cwd(), a)
          b = b || {}
          if (!a) return { path: '', node: null }
          var c = { sc: !0, Dc: 0 },
            d
          for (d in c) void 0 === b[d] && (b[d] = c[d])
          if (8 < b.Dc) throw new T.Za(32)
          a = kb(
            a.split('/').filter(function (h) {
              return !!h
            }),
            !1,
          )
          var f = T.root
          c = '/'
          for (d = 0; d < a.length; d++) {
            var g = d === a.length - 1
            if (g && b.parent) break
            f = T.vb(f, a[d])
            c = ob(c, a[d])
            T.Eb(f) && (!g || (g && b.sc)) && (f = f.Wb.root)
            if (!g || b.sb)
              for (g = 0; T.Db(f.mode); )
                if (((f = T.readlink(c)), (c = qb(nb(c), f)), (f = T.eb(c, { Dc: b.Dc }).node), 40 < g++))
                  throw new T.Za(32)
          }
          return { path: c, node: f }
        },
        Ab: function (a) {
          for (var b; ; ) {
            if (T.cc(a)) return (a = a.gb.Zc), b ? ('/' !== a[a.length - 1] ? a + '/' + b : a + b) : a
            b = b ? a.name + '/' + b : a.name
            a = a.parent
          }
        },
        vc: function (a, b) {
          for (var c = 0, d = 0; d < b.length; d++) c = ((c << 5) - c + b.charCodeAt(d)) | 0
          return ((a + c) >>> 0) % T.wb.length
        },
        Wc: function (a) {
          var b = T.vc(a.parent.id, a.name)
          a.Gb = T.wb[b]
          T.wb[b] = a
        },
        Xc: function (a) {
          var b = T.vc(a.parent.id, a.name)
          if (T.wb[b] === a) T.wb[b] = a.Gb
          else
            for (b = T.wb[b]; b; ) {
              if (b.Gb === a) {
                b.Gb = a.Gb
                break
              }
              b = b.Gb
            }
        },
        vb: function (a, b) {
          var c = T.Hd(a)
          if (c) throw new T.Za(c, a)
          for (c = T.wb[T.vc(a.id, b)]; c; c = c.Gb) {
            var d = c.name
            if (c.parent.id === a.id && d === b) return c
          }
          return T.lookup(a, b)
        },
        createNode: function (a, b, c, d) {
          a = new T.hd(a, b, c, d)
          T.Wc(a)
          return a
        },
        rc: function (a) {
          T.Xc(a)
        },
        cc: function (a) {
          return a === a.parent
        },
        Eb: function (a) {
          return !!a.Wb
        },
        isFile: function (a) {
          return 32768 === (a & 61440)
        },
        ib: function (a) {
          return 16384 === (a & 61440)
        },
        Db: function (a) {
          return 40960 === (a & 61440)
        },
        Ub: function (a) {
          return 8192 === (a & 61440)
        },
        Dd: function (a) {
          return 24576 === (a & 61440)
        },
        isFIFO: function (a) {
          return 4096 === (a & 61440)
        },
        isSocket: function (a) {
          return 49152 === (a & 49152)
        },
        zd: { r: 0, 'r+': 2, w: 577, 'w+': 578, a: 1089, 'a+': 1090 },
        Jd: function (a) {
          var b = T.zd[a]
          if ('undefined' === typeof b) throw Error('Unknown file open mode: ' + a)
          return b
        },
        Rc: function (a) {
          var b = ['r', 'w', 'rw'][a & 3]
          a & 512 && (b += 'w')
          return b
        },
        Bb: function (a, b) {
          if (T.Yc) return 0
          if (!b.includes('r') || a.mode & 292) {
            if ((b.includes('w') && !(a.mode & 146)) || (b.includes('x') && !(a.mode & 73))) return 2
          } else return 2
          return 0
        },
        Hd: function (a) {
          var b = T.Bb(a, 'x')
          return b ? b : a.$a.lookup ? 0 : 2
        },
        Ac: function (a, b) {
          try {
            return T.vb(a, b), 20
          } catch (c) {}
          return T.Bb(a, 'wx')
        },
        dc: function (a, b, c) {
          try {
            var d = T.vb(a, b)
          } catch (f) {
            return f.bb
          }
          if ((a = T.Bb(a, 'wx'))) return a
          if (c) {
            if (!T.ib(d.mode)) return 54
            if (T.cc(d) || T.Ab(d) === T.cwd()) return 10
          } else if (T.ib(d.mode)) return 31
          return 0
        },
        Id: function (a, b) {
          return a ? (T.Db(a.mode) ? 32 : T.ib(a.mode) && ('r' !== T.Rc(b) || b & 512) ? 31 : T.Bb(a, T.Rc(b))) : 44
        },
        jd: 4096,
        Ld: function (a, b) {
          b = b || T.jd
          for (a = a || 0; a <= b; a++) if (!T.streams[a]) return a
          throw new T.Za(33)
        },
        tb: function (a) {
          return T.streams[a]
        },
        Mc: function (a, b, c) {
          T.mc ||
            ((T.mc = function () {}),
            (T.mc.prototype = {
              object: {
                get: function () {
                  return this.node
                },
                set: function (g) {
                  this.node = g
                },
              },
            }))
          var d = new T.mc(),
            f
          for (f in a) d[f] = a[f]
          a = d
          b = T.Ld(b, c)
          a.fd = b
          return (T.streams[b] = a)
        },
        rd: function (a) {
          T.streams[a] = null
        },
        qd: {
          open: function (a) {
            a.ab = T.Ad(a.node.rdev).ab
            a.ab.open && a.ab.open(a)
          },
          pb: function () {
            throw new T.Za(70)
          },
        },
        zc: function (a) {
          return a >> 8
        },
        je: function (a) {
          return a & 255
        },
        Fb: function (a, b) {
          return (a << 8) | b
        },
        Ec: function (a, b) {
          T.Oc[a] = { ab: b }
        },
        Ad: function (a) {
          return T.Oc[a]
        },
        Tc: function (a) {
          var b = []
          for (a = [a]; a.length; ) {
            var c = a.pop()
            b.push(c)
            a.push.apply(a, c.Xb)
          }
          return b
        },
        dd: function (a, b) {
          function c(h) {
            T.ic--
            return b(h)
          }
          function d(h) {
            if (h) {
              if (!d.xd) return (d.xd = !0), c(h)
            } else ++g >= f.length && c(null)
          }
          'function' === typeof a && ((b = a), (a = !1))
          T.ic++
          1 < T.ic && k('warning: ' + T.ic + ' FS.syncfs operations in flight at once, probably just doing extra work')
          var f = T.Tc(T.root.gb),
            g = 0
          f.forEach(function (h) {
            if (!h.type.dd) return d(null)
            h.type.dd(h, a, d)
          })
        },
        gb: function (a, b, c) {
          var d = '/' === c,
            f = !c
          if (d && T.root) throw new T.Za(10)
          if (!d && !f) {
            var g = T.eb(c, { sc: !1 })
            c = g.path
            g = g.node
            if (T.Eb(g)) throw new T.Za(10)
            if (!T.ib(g.mode)) throw new T.Za(54)
          }
          b = { type: a, me: b, Zc: c, Xb: [] }
          a = a.gb(b)
          a.gb = b
          b.root = a
          d ? (T.root = a) : g && ((g.Wb = b), g.gb && g.gb.Xb.push(b))
          return a
        },
        pe: function (a) {
          a = T.eb(a, { sc: !1 })
          if (!T.Eb(a.node)) throw new T.Za(28)
          a = a.node
          var b = a.Wb,
            c = T.Tc(b)
          Object.keys(T.wb).forEach(function (d) {
            for (d = T.wb[d]; d; ) {
              var f = d.Gb
              c.includes(d.gb) && T.rc(d)
              d = f
            }
          })
          a.Wb = null
          a.gb.Xb.splice(a.gb.Xb.indexOf(b), 1)
        },
        lookup: function (a, b) {
          return a.$a.lookup(a, b)
        },
        yb: function (a, b, c) {
          var d = T.eb(a, { parent: !0 }).node
          a = S(a)
          if (!a || '.' === a || '..' === a) throw new T.Za(28)
          var f = T.Ac(d, a)
          if (f) throw new T.Za(f)
          if (!d.$a.yb) throw new T.Za(63)
          return d.$a.yb(d, a, b, c)
        },
        create: function (a, b) {
          return T.yb(a, ((void 0 !== b ? b : 438) & 4095) | 32768, 0)
        },
        mkdir: function (a, b) {
          return T.yb(a, ((void 0 !== b ? b : 511) & 1023) | 16384, 0)
        },
        ke: function (a, b) {
          a = a.split('/')
          for (var c = '', d = 0; d < a.length; ++d)
            if (a[d]) {
              c += '/' + a[d]
              try {
                T.mkdir(c, b)
              } catch (f) {
                if (20 != f.bb) throw f
              }
            }
        },
        ec: function (a, b, c) {
          'undefined' === typeof c && ((c = b), (b = 438))
          return T.yb(a, b | 8192, c)
        },
        symlink: function (a, b) {
          if (!qb(a)) throw new T.Za(44)
          var c = T.eb(b, { parent: !0 }).node
          if (!c) throw new T.Za(44)
          b = S(b)
          var d = T.Ac(c, b)
          if (d) throw new T.Za(d)
          if (!c.$a.symlink) throw new T.Za(63)
          return c.$a.symlink(c, b, a)
        },
        rename: function (a, b) {
          var c = nb(a),
            d = nb(b),
            f = S(a),
            g = S(b)
          var h = T.eb(a, { parent: !0 })
          var n = h.node
          h = T.eb(b, { parent: !0 })
          h = h.node
          if (!n || !h) throw new T.Za(44)
          if (n.gb !== h.gb) throw new T.Za(75)
          var p = T.vb(n, f)
          d = rb(a, d)
          if ('.' !== d.charAt(0)) throw new T.Za(28)
          d = rb(b, c)
          if ('.' !== d.charAt(0)) throw new T.Za(55)
          try {
            var q = T.vb(h, g)
          } catch (r) {}
          if (p !== q) {
            c = T.ib(p.mode)
            if ((f = T.dc(n, f, c))) throw new T.Za(f)
            if ((f = q ? T.dc(h, g, c) : T.Ac(h, g))) throw new T.Za(f)
            if (!n.$a.rename) throw new T.Za(63)
            if (T.Eb(p) || (q && T.Eb(q))) throw new T.Za(10)
            if (h !== n && (f = T.Bb(n, 'w'))) throw new T.Za(f)
            try {
              T.kb.willMovePath && T.kb.willMovePath(a, b)
            } catch (r) {
              k("FS.trackingDelegate['willMovePath']('" + a + "', '" + b + "') threw an exception: " + r.message)
            }
            T.Xc(p)
            try {
              n.$a.rename(p, h, g)
            } catch (r) {
              throw r
            } finally {
              T.Wc(p)
            }
            try {
              if (T.kb.onMovePath) T.kb.onMovePath(a, b)
            } catch (r) {
              k("FS.trackingDelegate['onMovePath']('" + a + "', '" + b + "') threw an exception: " + r.message)
            }
          }
        },
        rmdir: function (a) {
          var b = T.eb(a, { parent: !0 }).node,
            c = S(a),
            d = T.vb(b, c),
            f = T.dc(b, c, !0)
          if (f) throw new T.Za(f)
          if (!b.$a.rmdir) throw new T.Za(63)
          if (T.Eb(d)) throw new T.Za(10)
          try {
            T.kb.willDeletePath && T.kb.willDeletePath(a)
          } catch (g) {
            k("FS.trackingDelegate['willDeletePath']('" + a + "') threw an exception: " + g.message)
          }
          b.$a.rmdir(b, c)
          T.rc(d)
          try {
            if (T.kb.onDeletePath) T.kb.onDeletePath(a)
          } catch (g) {
            k("FS.trackingDelegate['onDeletePath']('" + a + "') threw an exception: " + g.message)
          }
        },
        readdir: function (a) {
          a = T.eb(a, { sb: !0 }).node
          if (!a.$a.readdir) throw new T.Za(54)
          return a.$a.readdir(a)
        },
        unlink: function (a) {
          var b = T.eb(a, { parent: !0 }).node,
            c = S(a),
            d = T.vb(b, c),
            f = T.dc(b, c, !1)
          if (f) throw new T.Za(f)
          if (!b.$a.unlink) throw new T.Za(63)
          if (T.Eb(d)) throw new T.Za(10)
          try {
            T.kb.willDeletePath && T.kb.willDeletePath(a)
          } catch (g) {
            k("FS.trackingDelegate['willDeletePath']('" + a + "') threw an exception: " + g.message)
          }
          b.$a.unlink(b, c)
          T.rc(d)
          try {
            if (T.kb.onDeletePath) T.kb.onDeletePath(a)
          } catch (g) {
            k("FS.trackingDelegate['onDeletePath']('" + a + "') threw an exception: " + g.message)
          }
        },
        readlink: function (a) {
          a = T.eb(a).node
          if (!a) throw new T.Za(44)
          if (!a.$a.readlink) throw new T.Za(28)
          return qb(T.Ab(a.parent), a.$a.readlink(a))
        },
        stat: function (a, b) {
          a = T.eb(a, { sb: !b }).node
          if (!a) throw new T.Za(44)
          if (!a.$a.ub) throw new T.Za(63)
          return a.$a.ub(a)
        },
        lstat: function (a) {
          return T.stat(a, !0)
        },
        chmod: function (a, b, c) {
          a = 'string' === typeof a ? T.eb(a, { sb: !c }).node : a
          if (!a.$a.lb) throw new T.Za(63)
          a.$a.lb(a, { mode: (b & 4095) | (a.mode & -4096), timestamp: Date.now() })
        },
        lchmod: function (a, b) {
          T.chmod(a, b, !0)
        },
        fchmod: function (a, b) {
          a = T.tb(a)
          if (!a) throw new T.Za(8)
          T.chmod(a.node, b)
        },
        chown: function (a, b, c, d) {
          a = 'string' === typeof a ? T.eb(a, { sb: !d }).node : a
          if (!a.$a.lb) throw new T.Za(63)
          a.$a.lb(a, { timestamp: Date.now() })
        },
        lchown: function (a, b, c) {
          T.chown(a, b, c, !0)
        },
        fchown: function (a, b, c) {
          a = T.tb(a)
          if (!a) throw new T.Za(8)
          T.chown(a.node, b, c)
        },
        truncate: function (a, b) {
          if (0 > b) throw new T.Za(28)
          a = 'string' === typeof a ? T.eb(a, { sb: !0 }).node : a
          if (!a.$a.lb) throw new T.Za(63)
          if (T.ib(a.mode)) throw new T.Za(31)
          if (!T.isFile(a.mode)) throw new T.Za(28)
          var c = T.Bb(a, 'w')
          if (c) throw new T.Za(c)
          a.$a.lb(a, { size: b, timestamp: Date.now() })
        },
        ee: function (a, b) {
          a = T.tb(a)
          if (!a) throw new T.Za(8)
          if (0 === (a.flags & 2097155)) throw new T.Za(28)
          T.truncate(a.node, b)
        },
        qe: function (a, b, c) {
          a = T.eb(a, { sb: !0 }).node
          a.$a.lb(a, { timestamp: Math.max(b, c) })
        },
        open: function (a, b, c, d, f) {
          if ('' === a) throw new T.Za(44)
          b = 'string' === typeof b ? T.Jd(b) : b
          c = b & 64 ? (('undefined' === typeof c ? 438 : c) & 4095) | 32768 : 0
          if ('object' === typeof a) var g = a
          else {
            a = lb(a)
            try {
              g = T.eb(a, { sb: !(b & 131072) }).node
            } catch (n) {}
          }
          var h = !1
          if (b & 64)
            if (g) {
              if (b & 128) throw new T.Za(20)
            } else (g = T.yb(a, c, 0)), (h = !0)
          if (!g) throw new T.Za(44)
          T.Ub(g.mode) && (b &= -513)
          if (b & 65536 && !T.ib(g.mode)) throw new T.Za(54)
          if (!h && (c = T.Id(g, b))) throw new T.Za(c)
          b & 512 && T.truncate(g, 0)
          b &= -131713
          d = T.Mc({ node: g, path: T.Ab(g), flags: b, seekable: !0, position: 0, ab: g.ab, Yd: [], error: !1 }, d, f)
          d.ab.open && d.ab.open(d)
          !e.logReadFiles ||
            b & 1 ||
            (T.Cc || (T.Cc = {}), a in T.Cc || ((T.Cc[a] = 1), k('FS.trackingDelegate error on read file: ' + a)))
          try {
            T.kb.onOpenFile &&
              ((f = 0),
              1 !== (b & 2097155) && (f |= T.ed.$c.kd),
              0 !== (b & 2097155) && (f |= T.ed.$c.ld),
              T.kb.onOpenFile(a, f))
          } catch (n) {
            k("FS.trackingDelegate['onOpenFile']('" + a + "', flags) threw an exception: " + n.message)
          }
          return d
        },
        close: function (a) {
          if (T.Vb(a)) throw new T.Za(8)
          a.Cb && (a.Cb = null)
          try {
            a.ab.close && a.ab.close(a)
          } catch (b) {
            throw b
          } finally {
            T.rd(a.fd)
          }
          a.fd = null
        },
        Vb: function (a) {
          return null === a.fd
        },
        pb: function (a, b, c) {
          if (T.Vb(a)) throw new T.Za(8)
          if (!a.seekable || !a.ab.pb) throw new T.Za(70)
          if (0 != c && 1 != c && 2 != c) throw new T.Za(28)
          a.position = a.ab.pb(a, b, c)
          a.Yd = []
          return a.position
        },
        read: function (a, b, c, d, f) {
          if (0 > d || 0 > f) throw new T.Za(28)
          if (T.Vb(a)) throw new T.Za(8)
          if (1 === (a.flags & 2097155)) throw new T.Za(8)
          if (T.ib(a.node.mode)) throw new T.Za(31)
          if (!a.ab.read) throw new T.Za(28)
          var g = 'undefined' !== typeof f
          if (!g) f = a.position
          else if (!a.seekable) throw new T.Za(70)
          b = a.ab.read(a, b, c, d, f)
          g || (a.position += b)
          return b
        },
        write: function (a, b, c, d, f, g) {
          if (0 > d || 0 > f) throw new T.Za(28)
          if (T.Vb(a)) throw new T.Za(8)
          if (0 === (a.flags & 2097155)) throw new T.Za(8)
          if (T.ib(a.node.mode)) throw new T.Za(31)
          if (!a.ab.write) throw new T.Za(28)
          a.seekable && a.flags & 1024 && T.pb(a, 0, 2)
          var h = 'undefined' !== typeof f
          if (!h) f = a.position
          else if (!a.seekable) throw new T.Za(70)
          b = a.ab.write(a, b, c, d, f, g)
          h || (a.position += b)
          try {
            if (a.path && T.kb.onWriteToFile) T.kb.onWriteToFile(a.path)
          } catch (n) {
            k("FS.trackingDelegate['onWriteToFile']('" + a.path + "') threw an exception: " + n.message)
          }
          return b
        },
        Sb: function (a, b, c) {
          if (T.Vb(a)) throw new T.Za(8)
          if (0 > b || 0 >= c) throw new T.Za(28)
          if (0 === (a.flags & 2097155)) throw new T.Za(8)
          if (!T.isFile(a.node.mode) && !T.ib(a.node.mode)) throw new T.Za(43)
          if (!a.ab.Sb) throw new T.Za(138)
          a.ab.Sb(a, b, c)
        },
        Kb: function (a, b, c, d, f, g) {
          if (0 !== (f & 2) && 0 === (g & 2) && 2 !== (a.flags & 2097155)) throw new T.Za(2)
          if (1 === (a.flags & 2097155)) throw new T.Za(2)
          if (!a.ab.Kb) throw new T.Za(43)
          return a.ab.Kb(a, b, c, d, f, g)
        },
        Lb: function (a, b, c, d, f) {
          return a && a.ab.Lb ? a.ab.Lb(a, b, c, d, f) : 0
        },
        le: function () {
          return 0
        },
        Jb: function (a, b, c) {
          if (!a.ab.Jb) throw new T.Za(59)
          return a.ab.Jb(a, b, c)
        },
        readFile: function (a, b) {
          b = b || {}
          b.flags = b.flags || 0
          b.encoding = b.encoding || 'binary'
          if ('utf8' !== b.encoding && 'binary' !== b.encoding)
            throw Error('Invalid encoding type "' + b.encoding + '"')
          var c,
            d = T.open(a, b.flags)
          a = T.stat(a).size
          var f = new Uint8Array(a)
          T.read(d, f, 0, a, 0)
          'utf8' === b.encoding ? (c = za(f, 0)) : 'binary' === b.encoding && (c = f)
          T.close(d)
          return c
        },
        writeFile: function (a, b, c) {
          c = c || {}
          c.flags = c.flags || 577
          a = T.open(a, c.flags, c.mode)
          if ('string' === typeof b) {
            var d = new Uint8Array(Aa(b) + 1)
            b = C(b, d, 0, d.length)
            T.write(a, d, 0, b, void 0, c.pd)
          } else if (ArrayBuffer.isView(b)) T.write(a, b, 0, b.byteLength, void 0, c.pd)
          else throw Error('Unsupported data type')
          T.close(a)
        },
        cwd: function () {
          return T.Nc
        },
        chdir: function (a) {
          a = T.eb(a, { sb: !0 })
          if (null === a.node) throw new T.Za(44)
          if (!T.ib(a.node.mode)) throw new T.Za(54)
          var b = T.Bb(a.node, 'x')
          if (b) throw new T.Za(b)
          T.Nc = a.path
        },
        td: function () {
          T.mkdir('/tmp')
          T.mkdir('/home')
          T.mkdir('/home/web_user')
        },
        sd: function () {
          T.mkdir('/dev')
          T.Ec(T.Fb(1, 3), {
            read: function () {
              return 0
            },
            write: function (b, c, d, f) {
              return f
            },
          })
          T.ec('/dev/null', T.Fb(1, 3))
          tb(T.Fb(5, 0), wb)
          tb(T.Fb(6, 0), xb)
          T.ec('/dev/tty', T.Fb(5, 0))
          T.ec('/dev/tty1', T.Fb(6, 0))
          var a = pb()
          T.zb('/dev', 'random', a)
          T.zb('/dev', 'urandom', a)
          T.mkdir('/dev/shm')
          T.mkdir('/dev/shm/tmp')
        },
        vd: function () {
          T.mkdir('/proc')
          var a = T.mkdir('/proc/self')
          T.mkdir('/proc/self/fd')
          T.gb(
            {
              gb: function () {
                var b = T.createNode(a, 'fd', 16895, 73)
                b.$a = {
                  lookup: function (c, d) {
                    var f = T.tb(+d)
                    if (!f) throw new T.Za(8)
                    c = {
                      parent: null,
                      gb: { Zc: 'fake' },
                      $a: {
                        readlink: function () {
                          return f.path
                        },
                      },
                    }
                    return (c.parent = c)
                  },
                }
                return b
              },
            },
            {},
            '/proc/self/fd',
          )
        },
        wd: function () {
          e.stdin ? T.zb('/dev', 'stdin', e.stdin) : T.symlink('/dev/tty', '/dev/stdin')
          e.stdout ? T.zb('/dev', 'stdout', null, e.stdout) : T.symlink('/dev/tty', '/dev/stdout')
          e.stderr ? T.zb('/dev', 'stderr', null, e.stderr) : T.symlink('/dev/tty1', '/dev/stderr')
          T.open('/dev/stdin', 0)
          T.open('/dev/stdout', 1)
          T.open('/dev/stderr', 1)
        },
        Pc: function () {
          T.Za ||
            ((T.Za = function (a, b) {
              this.node = b
              this.Sd = function (c) {
                this.bb = c
              }
              this.Sd(a)
              this.message = 'FS error'
            }),
            (T.Za.prototype = Error()),
            (T.Za.prototype.constructor = T.Za),
            [44].forEach(function (a) {
              T.tc[a] = new T.Za(a)
              T.tc[a].stack = '<generic error, no stack>'
            }))
        },
        Td: function () {
          T.Pc()
          T.wb = Array(4096)
          T.gb(U, {}, '/')
          T.td()
          T.sd()
          T.vd()
          T.yd = { MEMFS: U }
        },
        Tb: function (a, b, c) {
          T.Tb.wc = !0
          T.Pc()
          e.stdin = a || e.stdin
          e.stdout = b || e.stdout
          e.stderr = c || e.stderr
          T.wd()
        },
        quit: function () {
          T.Tb.wc = !1
          var a = e._fflush
          a && a(0)
          for (a = 0; a < T.streams.length; a++) {
            var b = T.streams[a]
            b && T.close(b)
          }
        },
        uc: function (a, b) {
          var c = 0
          a && (c |= 365)
          b && (c |= 146)
          return c
        },
        de: function (a, b) {
          a = T.pc(a, b)
          return a.exists ? a.object : null
        },
        pc: function (a, b) {
          try {
            var c = T.eb(a, { sb: !b })
            a = c.path
          } catch (f) {}
          var d = { cc: !1, exists: !1, error: 0, name: null, path: null, object: null, Md: !1, Od: null, Nd: null }
          try {
            ;(c = T.eb(a, { parent: !0 })),
              (d.Md = !0),
              (d.Od = c.path),
              (d.Nd = c.node),
              (d.name = S(a)),
              (c = T.eb(a, { sb: !b })),
              (d.exists = !0),
              (d.path = c.path),
              (d.object = c.node),
              (d.name = c.node.name),
              (d.cc = '/' === c.path)
          } catch (f) {
            d.error = f.bb
          }
          return d
        },
        be: function (a, b) {
          a = 'string' === typeof a ? a : T.Ab(a)
          for (b = b.split('/').reverse(); b.length; ) {
            var c = b.pop()
            if (c) {
              var d = ob(a, c)
              try {
                T.mkdir(d)
              } catch (f) {}
              a = d
            }
          }
          return d
        },
        ud: function (a, b, c, d, f) {
          a = ob('string' === typeof a ? a : T.Ab(a), b)
          return T.create(a, T.uc(d, f))
        },
        Lc: function (a, b, c, d, f, g) {
          a = b ? ob('string' === typeof a ? a : T.Ab(a), b) : a
          d = T.uc(d, f)
          f = T.create(a, d)
          if (c) {
            if ('string' === typeof c) {
              a = Array(c.length)
              b = 0
              for (var h = c.length; b < h; ++b) a[b] = c.charCodeAt(b)
              c = a
            }
            T.chmod(f, d | 146)
            a = T.open(f, 577)
            T.write(a, c, 0, c.length, 0, g)
            T.close(a)
            T.chmod(f, d)
          }
          return f
        },
        zb: function (a, b, c, d) {
          a = ob('string' === typeof a ? a : T.Ab(a), b)
          b = T.uc(!!c, !!d)
          T.zb.zc || (T.zb.zc = 64)
          var f = T.Fb(T.zb.zc++, 0)
          T.Ec(f, {
            open: function (g) {
              g.seekable = !1
            },
            close: function () {
              d && d.buffer && d.buffer.length && d(10)
            },
            read: function (g, h, n, p) {
              for (var q = 0, r = 0; r < p; r++) {
                try {
                  var w = c()
                } catch (z) {
                  throw new T.Za(29)
                }
                if (void 0 === w && 0 === q) throw new T.Za(6)
                if (null === w || void 0 === w) break
                q++
                h[n + r] = w
              }
              q && (g.node.timestamp = Date.now())
              return q
            },
            write: function (g, h, n, p) {
              for (var q = 0; q < p; q++)
                try {
                  d(h[n + q])
                } catch (r) {
                  throw new T.Za(29)
                }
              p && (g.node.timestamp = Date.now())
              return q
            },
          })
          return T.ec(a, b, f)
        },
        Sc: function (a) {
          if (a.xc || a.Ed || a.link || a.cb) return !0
          if ('undefined' !== typeof XMLHttpRequest)
            throw Error(
              'Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.',
            )
          if (ma)
            try {
              ;(a.cb = vb(ma(a.url), !0)), (a.fb = a.cb.length)
            } catch (b) {
              throw new T.Za(29)
            }
          else throw Error('Cannot load without read() or XMLHttpRequest.')
        },
        ae: function (a, b, c, d, f) {
          function g() {
            this.yc = !1
            this.Ib = []
          }
          g.prototype.get = function (q) {
            if (!(q > this.length - 1 || 0 > q)) {
              var r = q % this.chunkSize
              return this.Vc((q / this.chunkSize) | 0)[r]
            }
          }
          g.prototype.gd = function (q) {
            this.Vc = q
          }
          g.prototype.Jc = function () {
            var q = new XMLHttpRequest()
            q.open('HEAD', c, !1)
            q.send(null)
            if (!((200 <= q.status && 300 > q.status) || 304 === q.status))
              throw Error("Couldn't load " + c + '. Status: ' + q.status)
            var r = Number(q.getResponseHeader('Content-length')),
              w,
              z = (w = q.getResponseHeader('Accept-Ranges')) && 'bytes' === w
            q = (w = q.getResponseHeader('Content-Encoding')) && 'gzip' === w
            var m = 1048576
            z || (m = r)
            var t = this
            t.gd(function (u) {
              var E = u * m,
                J = (u + 1) * m - 1
              J = Math.min(J, r - 1)
              if ('undefined' === typeof t.Ib[u]) {
                var bb = t.Ib
                if (E > J) throw Error('invalid range (' + E + ', ' + J + ') or no bytes requested!')
                if (J > r - 1) throw Error('only ' + r + ' bytes available! programmer error!')
                var A = new XMLHttpRequest()
                A.open('GET', c, !1)
                r !== m && A.setRequestHeader('Range', 'bytes=' + E + '-' + J)
                'undefined' != typeof Uint8Array && (A.responseType = 'arraybuffer')
                A.overrideMimeType && A.overrideMimeType('text/plain; charset=x-user-defined')
                A.send(null)
                if (!((200 <= A.status && 300 > A.status) || 304 === A.status))
                  throw Error("Couldn't load " + c + '. Status: ' + A.status)
                E = void 0 !== A.response ? new Uint8Array(A.response || []) : vb(A.responseText || '', !0)
                bb[u] = E
              }
              if ('undefined' === typeof t.Ib[u]) throw Error('doXHR failed!')
              return t.Ib[u]
            })
            if (q || !r)
              (m = r = 1),
                (m = r = this.Vc(0).length),
                ea('LazyFiles on gzip forces download of the whole file when length is accessed')
            this.nd = r
            this.md = m
            this.yc = !0
          }
          if ('undefined' !== typeof XMLHttpRequest) {
            if (!v)
              throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc'
            var h = new g()
            Object.defineProperties(h, {
              length: {
                get: function () {
                  this.yc || this.Jc()
                  return this.nd
                },
              },
              chunkSize: {
                get: function () {
                  this.yc || this.Jc()
                  return this.md
                },
              },
            })
            h = { xc: !1, cb: h }
          } else h = { xc: !1, url: c }
          var n = T.ud(a, b, h, d, f)
          h.cb ? (n.cb = h.cb) : h.url && ((n.cb = null), (n.url = h.url))
          Object.defineProperties(n, {
            fb: {
              get: function () {
                return this.cb.length
              },
            },
          })
          var p = {}
          Object.keys(n.ab).forEach(function (q) {
            var r = n.ab[q]
            p[q] = function () {
              T.Sc(n)
              return r.apply(null, arguments)
            }
          })
          p.read = function (q, r, w, z, m) {
            T.Sc(n)
            q = q.node.cb
            if (m >= q.length) return 0
            z = Math.min(q.length - m, z)
            if (q.slice) for (var t = 0; t < z; t++) r[w + t] = q[m + t]
            else for (t = 0; t < z; t++) r[w + t] = q.get(m + t)
            return z
          }
          n.ab = p
          return n
        },
        ce: function (a, b, c, d, f, g, h, n, p, q) {
          function r(z) {
            function m(u) {
              q && q()
              n || T.Lc(a, b, u, d, f, p)
              g && g()
              Ta()
            }
            var t = !1
            e.preloadPlugins.forEach(function (u) {
              !t &&
                u.canHandle(w) &&
                (u.handle(z, w, m, function () {
                  h && h()
                  Ta()
                }),
                (t = !0))
            })
            t || m(z)
          }
          yb.Tb()
          var w = b ? qb(ob(a, b)) : a
          Sa()
          'string' == typeof c
            ? yb.Zd(
                c,
                function (z) {
                  r(z)
                },
                h,
              )
            : r(c)
        },
        indexedDB: function () {
          return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
        },
        Fc: function () {
          return 'EM_FS_' + window.location.pathname
        },
        Gc: 20,
        Rb: 'FILE_DATA',
        ne: function (a, b, c) {
          b = b || function () {}
          c = c || function () {}
          var d = T.indexedDB()
          try {
            var f = d.open(T.Fc(), T.Gc)
          } catch (g) {
            return c(g)
          }
          f.onupgradeneeded = function () {
            ea('creating db')
            f.result.createObjectStore(T.Rb)
          }
          f.onsuccess = function () {
            var g = f.result.transaction([T.Rb], 'readwrite'),
              h = g.objectStore(T.Rb),
              n = 0,
              p = 0,
              q = a.length
            a.forEach(function (r) {
              r = h.put(T.pc(r).object.cb, r)
              r.onsuccess = function () {
                n++
                n + p == q && (0 == p ? b() : c())
              }
              r.onerror = function () {
                p++
                n + p == q && (0 == p ? b() : c())
              }
            })
            g.onerror = c
          }
          f.onerror = c
        },
        ie: function (a, b, c) {
          b = b || function () {}
          c = c || function () {}
          var d = T.indexedDB()
          try {
            var f = d.open(T.Fc(), T.Gc)
          } catch (g) {
            return c(g)
          }
          f.onupgradeneeded = c
          f.onsuccess = function () {
            var g = f.result
            try {
              var h = g.transaction([T.Rb], 'readonly')
            } catch (w) {
              c(w)
              return
            }
            var n = h.objectStore(T.Rb),
              p = 0,
              q = 0,
              r = a.length
            a.forEach(function (w) {
              var z = n.get(w)
              z.onsuccess = function () {
                T.pc(w).exists && T.unlink(w)
                T.Lc(nb(w), S(w), z.result, !0, !0, !0)
                p++
                p + q == r && (0 == q ? b() : c())
              }
              z.onerror = function () {
                q++
                p + q == r && (0 == q ? b() : c())
              }
            })
            h.onerror = c
          }
          f.onerror = c
        },
      },
      zb = {}
    function Ab(a, b, c) {
      try {
        var d = a(b)
      } catch (f) {
        if (f && f.node && lb(b) !== lb(T.Ab(f.node))) return -54
        throw f
      }
      M[c >> 2] = d.dev
      M[(c + 4) >> 2] = 0
      M[(c + 8) >> 2] = d.ino
      M[(c + 12) >> 2] = d.mode
      M[(c + 16) >> 2] = d.nlink
      M[(c + 20) >> 2] = d.uid
      M[(c + 24) >> 2] = d.gid
      M[(c + 28) >> 2] = d.rdev
      M[(c + 32) >> 2] = 0
      R = [
        d.size >>> 0,
        ((Q = d.size),
        1 <= +Math.abs(Q)
          ? 0 < Q
            ? (Math.min(+Math.floor(Q / 4294967296), 4294967295) | 0) >>> 0
            : ~~+Math.ceil((Q - +(~~Q >>> 0)) / 4294967296) >>> 0
          : 0),
      ]
      M[(c + 40) >> 2] = R[0]
      M[(c + 44) >> 2] = R[1]
      M[(c + 48) >> 2] = 4096
      M[(c + 52) >> 2] = d.blocks
      M[(c + 56) >> 2] = (d.atime.getTime() / 1e3) | 0
      M[(c + 60) >> 2] = 0
      M[(c + 64) >> 2] = (d.mtime.getTime() / 1e3) | 0
      M[(c + 68) >> 2] = 0
      M[(c + 72) >> 2] = (d.ctime.getTime() / 1e3) | 0
      M[(c + 76) >> 2] = 0
      R = [
        d.ino >>> 0,
        ((Q = d.ino),
        1 <= +Math.abs(Q)
          ? 0 < Q
            ? (Math.min(+Math.floor(Q / 4294967296), 4294967295) | 0) >>> 0
            : ~~+Math.ceil((Q - +(~~Q >>> 0)) / 4294967296) >>> 0
          : 0),
      ]
      M[(c + 80) >> 2] = R[0]
      M[(c + 84) >> 2] = R[1]
      return 0
    }
    var Bb = void 0
    function Cb() {
      Bb += 4
      return M[(Bb - 4) >> 2]
    }
    function V(a) {
      a = T.tb(a)
      if (!a) throw new T.Za(8)
      return a
    }
    var W = {
      gb: function () {
        e.websocket = e.websocket && 'object' === typeof e.websocket ? e.websocket : {}
        e.websocket.nc = {}
        e.websocket.on = function (a, b) {
          'function' === typeof b && (this.nc[a] = b)
          return this
        }
        e.websocket.emit = function (a, b) {
          'function' === typeof this.nc[a] && this.nc[a].call(this, b)
        }
        return T.createNode(null, '/', 16895, 0)
      },
      createSocket: function (a, b, c) {
        b &= -526337
        c && assert((1 == b) == (6 == c))
        a = { family: a, type: b, protocol: c, jb: null, error: null, Yb: {}, pending: [], Ob: [], qb: W.mb }
        b = W.fc()
        c = T.createNode(W.root, b, 49152, 0)
        c.Pb = a
        b = T.Mc({ path: b, node: c, flags: 2, seekable: !1, ab: W.ab })
        a.stream = b
        return a
      },
      Bd: function (a) {
        return (a = T.tb(a)) && T.isSocket(a.node.mode) ? a.node.Pb : null
      },
      ab: {
        Nb: function (a) {
          a = a.node.Pb
          return a.qb.Nb(a)
        },
        Jb: function (a, b, c) {
          a = a.node.Pb
          return a.qb.Jb(a, b, c)
        },
        read: function (a, b, c, d) {
          a = a.node.Pb
          d = a.qb.ad(a, d)
          if (!d) return 0
          b.set(d.buffer, c)
          return d.buffer.length
        },
        write: function (a, b, c, d) {
          a = a.node.Pb
          return a.qb.cd(a, b, c, d)
        },
        close: function (a) {
          a = a.node.Pb
          a.qb.close(a)
        },
      },
      fc: function () {
        W.fc.current || (W.fc.current = 0)
        return 'socket[' + W.fc.current++ + ']'
      },
      mb: {
        $b: function (a, b, c) {
          if ('object' === typeof b) {
            var d = b
            c = b = null
          }
          if (d)
            if (d._socket) (b = d._socket.remoteAddress), (c = d._socket.remotePort)
            else {
              c = /ws[s]?:\/\/([^:]+):(\d+)/.exec(d.url)
              if (!c) throw Error('WebSocket URL must be in the format ws(s)://address:port')
              b = c[1]
              c = parseInt(c[2], 10)
            }
          else
            try {
              var f = e.websocket && 'object' === typeof e.websocket,
                g = 'ws:#'.replace('#', '//')
              f && 'string' === typeof e.websocket.url && (g = e.websocket.url)
              if ('ws://' === g || 'wss://' === g) {
                var h = b.split('/')
                g = g + h[0] + ':' + c + '/' + h.slice(1).join('/')
              }
              h = 'binary'
              f && 'string' === typeof e.websocket.subprotocol && (h = e.websocket.subprotocol)
              var n = void 0
              'null' !== h && ((h = h.replace(/^ +| +$/g, '').split(/ *, */)), (n = x ? { protocol: h.toString() } : h))
              f && null === e.websocket.subprotocol && (n = void 0)
              d = new (x ? require('ws') : WebSocket)(g, n)
              d.binaryType = 'arraybuffer'
            } catch (p) {
              throw new T.Za(23)
            }
          b = { hb: b, port: c, socket: d, ac: [] }
          W.mb.Ic(a, b)
          W.mb.Cd(a, b)
          2 === a.type &&
            'undefined' !== typeof a.Hb &&
            b.ac.push(new Uint8Array([255, 255, 255, 255, 112, 111, 114, 116, (a.Hb & 65280) >> 8, a.Hb & 255]))
          return b
        },
        bc: function (a, b, c) {
          return a.Yb[b + ':' + c]
        },
        Ic: function (a, b) {
          a.Yb[b.hb + ':' + b.port] = b
        },
        bd: function (a, b) {
          delete a.Yb[b.hb + ':' + b.port]
        },
        Cd: function (a, b) {
          function c() {
            e.websocket.emit('open', a.stream.fd)
            try {
              for (var g = b.ac.shift(); g; ) b.socket.send(g), (g = b.ac.shift())
            } catch (h) {
              b.socket.close()
            }
          }
          function d(g) {
            if ('string' === typeof g) g = new TextEncoder().encode(g)
            else {
              assert(void 0 !== g.byteLength)
              if (0 == g.byteLength) return
              g = new Uint8Array(g)
            }
            var h = f
            f = !1
            h &&
            10 === g.length &&
            255 === g[0] &&
            255 === g[1] &&
            255 === g[2] &&
            255 === g[3] &&
            112 === g[4] &&
            111 === g[5] &&
            114 === g[6] &&
            116 === g[7]
              ? ((g = (g[8] << 8) | g[9]), W.mb.bd(a, b), (b.port = g), W.mb.Ic(a, b))
              : (a.Ob.push({ hb: b.hb, port: b.port, data: g }), e.websocket.emit('message', a.stream.fd))
          }
          var f = !0
          x
            ? (b.socket.on('open', c),
              b.socket.on('message', function (g, h) {
                h.$d && d(new Uint8Array(g).buffer)
              }),
              b.socket.on('close', function () {
                e.websocket.emit('close', a.stream.fd)
              }),
              b.socket.on('error', function () {
                a.error = 14
                e.websocket.emit('error', [a.stream.fd, a.error, 'ECONNREFUSED: Connection refused'])
              }))
            : ((b.socket.onopen = c),
              (b.socket.onclose = function () {
                e.websocket.emit('close', a.stream.fd)
              }),
              (b.socket.onmessage = function (g) {
                d(g.data)
              }),
              (b.socket.onerror = function () {
                a.error = 14
                e.websocket.emit('error', [a.stream.fd, a.error, 'ECONNREFUSED: Connection refused'])
              }))
        },
        Nb: function (a) {
          if (1 === a.type && a.jb) return a.pending.length ? 65 : 0
          var b = 0,
            c = 1 === a.type ? W.mb.bc(a, a.ob, a.rb) : null
          if (
            a.Ob.length ||
            !c ||
            (c && c.socket.readyState === c.socket.CLOSING) ||
            (c && c.socket.readyState === c.socket.CLOSED)
          )
            b |= 65
          if (!c || (c && c.socket.readyState === c.socket.OPEN)) b |= 4
          if ((c && c.socket.readyState === c.socket.CLOSING) || (c && c.socket.readyState === c.socket.CLOSED)) b |= 16
          return b
        },
        Jb: function (a, b, c) {
          switch (b) {
            case 21531:
              return (b = 0), a.Ob.length && (b = a.Ob[0].data.length), (M[c >> 2] = b), 0
            default:
              return 28
          }
        },
        close: function (a) {
          if (a.jb) {
            try {
              a.jb.close()
            } catch (f) {}
            a.jb = null
          }
          for (var b = Object.keys(a.Yb), c = 0; c < b.length; c++) {
            var d = a.Yb[b[c]]
            try {
              d.socket.close()
            } catch (f) {}
            W.mb.bd(a, d)
          }
          return 0
        },
        bind: function (a, b, c) {
          if ('undefined' !== typeof a.hc || 'undefined' !== typeof a.Hb) throw new T.Za(28)
          a.hc = b
          a.Hb = c
          if (2 === a.type) {
            a.jb && (a.jb.close(), (a.jb = null))
            try {
              a.qb.listen(a, 0)
            } catch (d) {
              if (!(d instanceof T.Za)) throw d
              if (138 !== d.bb) throw d
            }
          }
        },
        connect: function (a, b, c) {
          if (a.jb) throw new T.Za(138)
          if ('undefined' !== typeof a.ob && 'undefined' !== typeof a.rb) {
            var d = W.mb.bc(a, a.ob, a.rb)
            if (d) {
              if (d.socket.readyState === d.socket.CONNECTING) throw new T.Za(7)
              throw new T.Za(30)
            }
          }
          b = W.mb.$b(a, b, c)
          a.ob = b.hb
          a.rb = b.port
          throw new T.Za(26)
        },
        listen: function (a) {
          if (!x) throw new T.Za(138)
          if (a.jb) throw new T.Za(28)
          var b = require('ws').Server
          a.jb = new b({ host: a.hc, port: a.Hb })
          e.websocket.emit('listen', a.stream.fd)
          a.jb.on('connection', function (c) {
            if (1 === a.type) {
              var d = W.createSocket(a.family, a.type, a.protocol)
              c = W.mb.$b(d, c)
              d.ob = c.hb
              d.rb = c.port
              a.pending.push(d)
              e.websocket.emit('connection', d.stream.fd)
            } else W.mb.$b(a, c), e.websocket.emit('connection', a.stream.fd)
          })
          a.jb.on('closed', function () {
            e.websocket.emit('close', a.stream.fd)
            a.jb = null
          })
          a.jb.on('error', function () {
            a.error = 23
            e.websocket.emit('error', [a.stream.fd, a.error, 'EHOSTUNREACH: Host is unreachable'])
          })
        },
        accept: function (a) {
          if (!a.jb) throw new T.Za(28)
          var b = a.pending.shift()
          b.stream.flags = a.stream.flags
          return b
        },
        he: function (a, b) {
          if (b) {
            if (void 0 === a.ob || void 0 === a.rb) throw new T.Za(53)
            b = a.ob
            a = a.rb
          } else (b = a.hc || 0), (a = a.Hb || 0)
          return { hb: b, port: a }
        },
        cd: function (a, b, c, d, f, g) {
          if (2 === a.type) {
            if (void 0 === f || void 0 === g) (f = a.ob), (g = a.rb)
            if (void 0 === f || void 0 === g) throw new T.Za(17)
          } else (f = a.ob), (g = a.rb)
          var h = W.mb.bc(a, f, g)
          if (1 === a.type) {
            if (!h || h.socket.readyState === h.socket.CLOSING || h.socket.readyState === h.socket.CLOSED)
              throw new T.Za(53)
            if (h.socket.readyState === h.socket.CONNECTING) throw new T.Za(6)
          }
          ArrayBuffer.isView(b) && ((c += b.byteOffset), (b = b.buffer))
          b = b.slice(c, c + d)
          if (2 === a.type && (!h || h.socket.readyState !== h.socket.OPEN))
            return (
              (h && h.socket.readyState !== h.socket.CLOSING && h.socket.readyState !== h.socket.CLOSED) ||
                (h = W.mb.$b(a, f, g)),
              h.ac.push(b),
              d
            )
          try {
            return h.socket.send(b), d
          } catch (n) {
            throw new T.Za(28)
          }
        },
        ad: function (a, b) {
          if (1 === a.type && a.jb) throw new T.Za(53)
          var c = a.Ob.shift()
          if (!c) {
            if (1 === a.type) {
              if ((a = W.mb.bc(a, a.ob, a.rb))) {
                if (a.socket.readyState === a.socket.CLOSING || a.socket.readyState === a.socket.CLOSED) return null
                throw new T.Za(6)
              }
              throw new T.Za(53)
            }
            throw new T.Za(6)
          }
          var d = c.data.byteLength || c.data.length,
            f = c.data.byteOffset || 0,
            g = c.data.buffer || c.data
          b = Math.min(b, d)
          var h = { buffer: new Uint8Array(g, f, b), hb: c.hb, port: c.port }
          1 === a.type && b < d && ((c.data = new Uint8Array(g, f + b, d - b)), a.Ob.unshift(c))
          return h
        },
      },
    }
    function X(a) {
      a = W.Bd(a)
      if (!a) throw new T.Za(8)
      return a
    }
    function Db(a) {
      a = a.split('.')
      for (var b = 0; 4 > b; b++) {
        var c = Number(a[b])
        if (isNaN(c)) return null
        a[b] = c
      }
      return (a[0] | (a[1] << 8) | (a[2] << 16) | (a[3] << 24)) >>> 0
    }
    function Eb(a) {
      var b,
        c,
        d = []
      if (
        !/^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i.test(
          a,
        )
      )
        return null
      if ('::' === a) return [0, 0, 0, 0, 0, 0, 0, 0]
      a = a.startsWith('::') ? a.replace('::', 'Z:') : a.replace('::', ':Z:')
      0 < a.indexOf('.')
        ? ((a = a.replace(/[.]/g, ':')),
          (a = a.split(':')),
          (a[a.length - 4] = parseInt(a[a.length - 4]) + 256 * parseInt(a[a.length - 3])),
          (a[a.length - 3] = parseInt(a[a.length - 2]) + 256 * parseInt(a[a.length - 1])),
          (a = a.slice(0, a.length - 2)))
        : (a = a.split(':'))
      for (b = c = 0; b < a.length; b++)
        if ('string' === typeof a[b])
          if ('Z' === a[b]) {
            for (c = 0; c < 8 - a.length + 1; c++) d[b + c] = 0
            --c
          } else d[b + c] = Fb(parseInt(a[b], 16))
        else d[b + c] = a[b]
      return [(d[1] << 16) | d[0], (d[3] << 16) | d[2], (d[5] << 16) | d[4], (d[7] << 16) | d[6]]
    }
    function Gb(a, b, c, d, f) {
      switch (b) {
        case 2:
          c = Db(c)
          f && (M[f >> 2] = 16)
          L[a >> 1] = b
          M[(a + 4) >> 2] = c
          L[(a + 2) >> 1] = Fb(d)
          R = [
            0,
            ((Q = 0),
            1 <= +Math.abs(Q)
              ? 0 < Q
                ? (Math.min(+Math.floor(Q / 4294967296), 4294967295) | 0) >>> 0
                : ~~+Math.ceil((Q - +(~~Q >>> 0)) / 4294967296) >>> 0
              : 0),
          ]
          M[(a + 8) >> 2] = R[0]
          M[(a + 12) >> 2] = R[1]
          break
        case 10:
          c = Eb(c)
          f && (M[f >> 2] = 28)
          M[a >> 2] = b
          M[(a + 8) >> 2] = c[0]
          M[(a + 12) >> 2] = c[1]
          M[(a + 16) >> 2] = c[2]
          M[(a + 20) >> 2] = c[3]
          L[(a + 2) >> 1] = Fb(d)
          M[(a + 4) >> 2] = 0
          M[(a + 24) >> 2] = 0
          break
        default:
          return 5
      }
      return 0
    }
    var Hb = 1,
      Ib = {},
      Jb = {}
    function Kb(a) {
      var b = Db(a)
      if (null !== b) return a
      b = Eb(a)
      if (null !== b) return a
      Ib[a]
        ? (b = Ib[a])
        : ((b = Hb++),
          assert(65535 > b, 'exceeded max address mappings of 65535'),
          (b = '172.29.' + (b & 255) + '.' + (b & 65280)),
          (Jb[b] = a),
          (Ib[a] = b))
      return b
    }
    function Lb(a) {
      return (a & 255) + '.' + ((a >> 8) & 255) + '.' + ((a >> 16) & 255) + '.' + ((a >> 24) & 255)
    }
    function Mb(a) {
      var b = '',
        c,
        d = 0,
        f = 0,
        g = 0,
        h = 0
      a = [a[0] & 65535, a[0] >> 16, a[1] & 65535, a[1] >> 16, a[2] & 65535, a[2] >> 16, a[3] & 65535, a[3] >> 16]
      var n = !0
      for (c = 0; 5 > c; c++)
        if (0 !== a[c]) {
          n = !1
          break
        }
      if (n) {
        c = Lb(a[6] | (a[7] << 16))
        if (-1 === a[5]) return '::ffff:' + c
        if (0 === a[5]) return '0.0.0.0' === c && (c = ''), '0.0.0.1' === c && (c = '1'), '::' + c
      }
      for (c = 0; 8 > c; c++) 0 === a[c] && (1 < c - f && (h = 0), (f = c), h++), h > d && ((d = h), (g = c - d + 1))
      for (c = 0; 8 > c; c++)
        1 < d && 0 === a[c] && c >= g && c < g + d
          ? c === g && ((b += ':'), 0 === g && (b += ':'))
          : ((b += Number(Nb(a[c] & 65535)).toString(16)), (b += 7 > c ? ':' : ''))
      return b
    }
    function Ob(a, b) {
      var c = L[a >> 1],
        d = Nb(Fa[(a + 2) >> 1])
      switch (c) {
        case 2:
          if (16 !== b) return { bb: 28 }
          a = M[(a + 4) >> 2]
          a = Lb(a)
          break
        case 10:
          if (28 !== b) return { bb: 28 }
          a = [M[(a + 8) >> 2], M[(a + 12) >> 2], M[(a + 16) >> 2], M[(a + 20) >> 2]]
          a = Mb(a)
          break
        default:
          return { bb: 5 }
      }
      return { family: c, hb: a, port: d }
    }
    function Pb(a, b, c) {
      if (c && 0 === a) return null
      a = Ob(a, b)
      if (a.bb) throw new T.Za(a.bb)
      b = a.hb
      a.hb = (Jb[b] ? Jb[b] : null) || a.hb
      return a
    }
    function Qb() {
      void 0 === Qb.start && (Qb.start = Date.now())
      return (1e3 * (Date.now() - Qb.start)) | 0
    }
    var Rb = {}
    function Sb() {
      if (!Tb) {
        var a = {
            USER: 'web_user',
            LOGNAME: 'web_user',
            PATH: '/',
            PWD: '/',
            HOME: '/home/web_user',
            LANG:
              (('object' === typeof navigator && navigator.languages && navigator.languages[0]) || 'C').replace(
                '-',
                '_',
              ) + '.UTF-8',
            _: ia || './this.program',
          },
          b
        for (b in Rb) void 0 === Rb[b] ? delete a[b] : (a[b] = Rb[b])
        var c = []
        for (b in a) c.push(b + '=' + a[b])
        Tb = c
      }
      return Tb
    }
    var Tb,
      Y = {}
    function Ub(a) {
      Ub.buffer ||
        ((Ub.buffer = Ca(256)),
        (Y['0'] = 'Success'),
        (Y['-1'] = "Invalid value for 'ai_flags' field"),
        (Y['-2'] = 'NAME or SERVICE is unknown'),
        (Y['-3'] = 'Temporary failure in name resolution'),
        (Y['-4'] = 'Non-recoverable failure in name res'),
        (Y['-6'] = "'ai_family' not supported"),
        (Y['-7'] = "'ai_socktype' not supported"),
        (Y['-8'] = "SERVICE not supported for 'ai_socktype'"),
        (Y['-10'] = 'Memory allocation failure'),
        (Y['-11'] = "System error returned in 'errno'"),
        (Y['-12'] = 'Argument buffer overflow'))
      var b = 'Unknown error'
      a in Y && (255 < Y[a].length ? (b = 'Message too long') : (b = Y[a]))
      K(b, Ub.buffer)
      return Ub.buffer
    }
    function Vb(a) {
      return 0 === a % 4 && (0 !== a % 100 || 0 === a % 400)
    }
    function Wb(a, b) {
      for (var c = 0, d = 0; d <= b; c += a[d++]);
      return c
    }
    var Xb = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      Yb = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    function Zb(a, b) {
      for (a = new Date(a.getTime()); 0 < b; ) {
        var c = a.getMonth(),
          d = (Vb(a.getFullYear()) ? Xb : Yb)[c]
        if (b > d - a.getDate())
          (b -= d - a.getDate() + 1),
            a.setDate(1),
            11 > c ? a.setMonth(c + 1) : (a.setMonth(0), a.setFullYear(a.getFullYear() + 1))
        else {
          a.setDate(a.getDate() + b)
          break
        }
      }
      return a
    }
    function $b(a, b, c, d) {
      a || (a = this)
      this.parent = a
      this.gb = a.gb
      this.Wb = null
      this.id = T.Kd++
      this.name = b
      this.mode = c
      this.$a = {}
      this.ab = {}
      this.rdev = d
    }
    Object.defineProperties($b.prototype, {
      read: {
        get: function () {
          return 365 === (this.mode & 365)
        },
        set: function (a) {
          a ? (this.mode |= 365) : (this.mode &= -366)
        },
      },
      write: {
        get: function () {
          return 146 === (this.mode & 146)
        },
        set: function (a) {
          a ? (this.mode |= 146) : (this.mode &= -147)
        },
      },
      Ed: {
        get: function () {
          return T.ib(this.mode)
        },
      },
      xc: {
        get: function () {
          return T.Ub(this.mode)
        },
      },
    })
    T.hd = $b
    T.Td()
    var yb
    function vb(a, b) {
      var c = Array(Aa(a) + 1)
      a = C(a, c, 0, c.length)
      b && (c.length = a)
      return c
    }
    var uc = {
      b: function (a, b, c, d) {
        B('Assertion failed: ' + H(a) + ', at: ' + [b ? H(b) : 'unknown filename', c, d ? H(d) : 'unknown function'])
      },
      la: function (a, b) {
        return ab(a, b)
      },
      ca: function (a, b) {
        return db(a, b)
      },
      ba: function (a, b) {
        return jb(a, b)
      },
      na: function (a, b, c, d) {
        try {
          for (
            var f = 0,
              g = b ? M[b >> 2] : 0,
              h = b ? M[(b + 4) >> 2] : 0,
              n = c ? M[c >> 2] : 0,
              p = c ? M[(c + 4) >> 2] : 0,
              q = d ? M[d >> 2] : 0,
              r = d ? M[(d + 4) >> 2] : 0,
              w = 0,
              z = 0,
              m = 0,
              t = 0,
              u = 0,
              E = 0,
              J = (b ? M[b >> 2] : 0) | (c ? M[c >> 2] : 0) | (d ? M[d >> 2] : 0),
              bb = (b ? M[(b + 4) >> 2] : 0) | (c ? M[(c + 4) >> 2] : 0) | (d ? M[(d + 4) >> 2] : 0),
              A = 0;
            A < a;
            A++
          ) {
            var N = 1 << A % 32
            if (32 > A ? J & N : bb & N) {
              var Oa = T.tb(A)
              if (!Oa) throw new T.Za(8)
              var Pa = 5
              Oa.ab.Nb && (Pa = Oa.ab.Nb(Oa))
              Pa & 1 && (32 > A ? g & N : h & N) && (32 > A ? (w |= N) : (z |= N), f++)
              Pa & 4 && (32 > A ? n & N : p & N) && (32 > A ? (m |= N) : (t |= N), f++)
              Pa & 2 && (32 > A ? q & N : r & N) && (32 > A ? (u |= N) : (E |= N), f++)
            }
          }
          b && ((M[b >> 2] = w), (M[(b + 4) >> 2] = z))
          c && ((M[c >> 2] = m), (M[(c + 4) >> 2] = t))
          d && ((M[d >> 2] = u), (M[(d + 4) >> 2] = E))
          return f
        } catch (mb) {
          return ('undefined' !== typeof T && mb instanceof T.Za) || B(mb), -mb.bb
        }
      },
      S: function (a, b, c) {
        try {
          var d = X(a),
            f = d.qb.accept(d)
          b && Gb(b, f.family, Kb(f.ob), f.rb, c)
          return f.stream.fd
        } catch (g) {
          return ('undefined' !== typeof T && g instanceof T.Za) || B(g), -g.bb
        }
      },
      pa: function (a, b) {
        try {
          a = H(a)
          if (b & -8) var c = -28
          else {
            var d
            ;(d = T.eb(a, { sb: !0 }).node)
              ? ((a = ''),
                b & 4 && (a += 'r'),
                b & 2 && (a += 'w'),
                b & 1 && (a += 'x'),
                (c = a && T.Bb(d, a) ? -2 : 0))
              : (c = -44)
          }
          return c
        } catch (f) {
          return ('undefined' !== typeof T && f instanceof T.Za) || B(f), -f.bb
        }
      },
      V: function (a, b, c) {
        try {
          var d = X(a),
            f = Pb(b, c)
          d.qb.bind(d, f.hb, f.port)
          return 0
        } catch (g) {
          return ('undefined' !== typeof T && g instanceof T.Za) || B(g), -g.bb
        }
      },
      U: function (a, b, c) {
        try {
          var d = X(a),
            f = Pb(b, c)
          d.qb.connect(d, f.hb, f.port)
          return 0
        } catch (g) {
          return ('undefined' !== typeof T && g instanceof T.Za) || B(g), -g.bb
        }
      },
      l: function (a, b, c) {
        Bb = c
        try {
          var d = V(a)
          switch (b) {
            case 0:
              var f = Cb()
              return 0 > f ? -28 : T.open(d.path, d.flags, 0, f).fd
            case 1:
            case 2:
              return 0
            case 3:
              return d.flags
            case 4:
              return (f = Cb()), (d.flags |= f), 0
            case 12:
              return (f = Cb()), (L[(f + 0) >> 1] = 2), 0
            case 13:
            case 14:
              return 0
            case 16:
            case 8:
              return -28
            case 9:
              return (M[cb() >> 2] = 28), -1
            default:
              return -28
          }
        } catch (g) {
          return ('undefined' !== typeof T && g instanceof T.Za) || B(g), -g.bb
        }
      },
      va: function (a, b) {
        try {
          var c = V(a)
          return Ab(T.stat, c.path, b)
        } catch (d) {
          return ('undefined' !== typeof T && d instanceof T.Za) || B(d), -d.bb
        }
      },
      ga: function (a, b, c) {
        try {
          var d = V(a)
          d.Cb || (d.Cb = T.readdir(d.path))
          a = 0
          for (var f = T.pb(d, 0, 1), g = Math.floor(f / 280); g < d.Cb.length && a + 280 <= c; ) {
            var h = d.Cb[g]
            if ('.' === h[0]) {
              var n = 1
              var p = 4
            } else {
              var q = T.vb(d.node, h)
              n = q.id
              p = T.Ub(q.mode) ? 2 : T.ib(q.mode) ? 4 : T.Db(q.mode) ? 10 : 8
            }
            R = [
              n >>> 0,
              ((Q = n),
              1 <= +Math.abs(Q)
                ? 0 < Q
                  ? (Math.min(+Math.floor(Q / 4294967296), 4294967295) | 0) >>> 0
                  : ~~+Math.ceil((Q - +(~~Q >>> 0)) / 4294967296) >>> 0
                : 0),
            ]
            M[(b + a) >> 2] = R[0]
            M[(b + a + 4) >> 2] = R[1]
            R = [
              (280 * (g + 1)) >>> 0,
              ((Q = 280 * (g + 1)),
              1 <= +Math.abs(Q)
                ? 0 < Q
                  ? (Math.min(+Math.floor(Q / 4294967296), 4294967295) | 0) >>> 0
                  : ~~+Math.ceil((Q - +(~~Q >>> 0)) / 4294967296) >>> 0
                : 0),
            ]
            M[(b + a + 8) >> 2] = R[0]
            M[(b + a + 12) >> 2] = R[1]
            L[(b + a + 16) >> 1] = 280
            F[(b + a + 18) >> 0] = p
            C(h, D, b + a + 19, 256)
            a += 280
            g += 1
          }
          T.pb(d, 280 * g, 0)
          return a
        } catch (r) {
          return ('undefined' !== typeof T && r instanceof T.Za) || B(r), -r.bb
        }
      },
      Q: function (a, b, c) {
        try {
          var d = X(a)
          if (!d.ob) return -53
          Gb(b, d.family, Kb(d.ob), d.rb, c)
          return 0
        } catch (f) {
          return ('undefined' !== typeof T && f instanceof T.Za) || B(f), -f.bb
        }
      },
      ja: function (a, b) {
        try {
          return ac(b, 0, 136), (M[b >> 2] = 1), (M[(b + 4) >> 2] = 2), (M[(b + 8) >> 2] = 3), (M[(b + 12) >> 2] = 4), 0
        } catch (c) {
          return ('undefined' !== typeof T && c instanceof T.Za) || B(c), -c.bb
        }
      },
      R: function (a, b, c) {
        try {
          k('__sys_getsockname ' + a)
          var d = X(a)
          Gb(b, d.family, Kb(d.hc || '0.0.0.0'), d.Hb, c)
          return 0
        } catch (f) {
          return ('undefined' !== typeof T && f instanceof T.Za) || B(f), -f.bb
        }
      },
      N: function (a, b, c, d, f) {
        try {
          var g = X(a)
          return 1 === b && 4 === c ? ((M[d >> 2] = g.error), (M[f >> 2] = 4), (g.error = null), 0) : -50
        } catch (h) {
          return ('undefined' !== typeof T && h instanceof T.Za) || B(h), -h.bb
        }
      },
      B: function (a, b, c) {
        Bb = c
        try {
          var d = V(a)
          switch (b) {
            case 21509:
            case 21505:
              return d.tty ? 0 : -59
            case 21510:
            case 21511:
            case 21512:
            case 21506:
            case 21507:
            case 21508:
              return d.tty ? 0 : -59
            case 21519:
              if (!d.tty) return -59
              var f = Cb()
              return (M[f >> 2] = 0)
            case 21520:
              return d.tty ? -28 : -59
            case 21531:
              return (f = Cb()), T.Jb(d, b, f)
            case 21523:
              return d.tty ? 0 : -59
            case 21524:
              return d.tty ? 0 : -59
            default:
              B('bad ioctl syscall ' + b)
          }
        } catch (g) {
          return ('undefined' !== typeof T && g instanceof T.Za) || B(g), -g.bb
        }
      },
      T: function (a, b) {
        try {
          var c = X(a)
          c.qb.listen(c, b)
          return 0
        } catch (d) {
          return ('undefined' !== typeof T && d instanceof T.Za) || B(d), -d.bb
        }
      },
      wa: function (a, b) {
        try {
          return (a = H(a)), Ab(T.lstat, a, b)
        } catch (c) {
          return ('undefined' !== typeof T && c instanceof T.Za) || B(c), -c.bb
        }
      },
      xa: function (a, b) {
        try {
          return (
            (a = H(a)), (a = lb(a)), '/' === a[a.length - 1] && (a = a.substr(0, a.length - 1)), T.mkdir(a, b, 0), 0
          )
        } catch (c) {
          return ('undefined' !== typeof T && c instanceof T.Za) || B(c), -c.bb
        }
      },
      ea: function (a, b, c, d, f, g) {
        try {
          a: {
            g <<= 12
            var h = !1
            if (0 !== (d & 16) && 0 !== a % 65536) var n = -28
            else {
              if (0 !== (d & 32)) {
                var p = bc(65536, b)
                if (!p) {
                  n = -48
                  break a
                }
                ac(p, 0, b)
                h = !0
              } else {
                var q = T.tb(f)
                if (!q) {
                  n = -8
                  break a
                }
                var r = T.Kb(q, a, b, g, c, d)
                p = r.Qd
                h = r.oc
              }
              zb[p] = { Gd: p, Fd: b, oc: h, fd: f, Pd: c, flags: d, offset: g }
              n = p
            }
          }
          return n
        } catch (w) {
          return ('undefined' !== typeof T && w instanceof T.Za) || B(w), -w.bb
        }
      },
      fa: function () {
        return 0
      },
      da: function (a, b) {
        try {
          if (-1 === (a | 0) || 0 === b) var c = -28
          else {
            var d = zb[a]
            if (d && b === d.Fd) {
              var f = T.tb(d.fd)
              if (f && d.Pd & 2) {
                var g = d.flags,
                  h = d.offset,
                  n = D.slice(a, a + b)
                T.Lb(f, n, h, b, g)
              }
              zb[a] = null
              d.oc && cc(d.Gd)
            }
            c = 0
          }
          return c
        } catch (p) {
          return ('undefined' !== typeof T && p instanceof T.Za) || B(p), -p.bb
        }
      },
      sa: function () {
        return -63
      },
      D: function (a, b, c) {
        Bb = c
        try {
          var d = H(a),
            f = c ? Cb() : 0
          return T.open(d, b, f).fd
        } catch (g) {
          return ('undefined' !== typeof T && g instanceof T.Za) || B(g), -g.bb
        }
      },
      ma: function (a, b) {
        try {
          for (var c = 0, d = 0; d < b; d++) {
            var f = a + 8 * d,
              g = L[(f + 4) >> 1],
              h = 32,
              n = T.tb(M[f >> 2])
            n && ((h = 5), n.ab.Nb && (h = n.ab.Nb(n)))
            ;(h &= g | 24) && c++
            L[(f + 6) >> 1] = h
          }
          return c
        } catch (p) {
          return ('undefined' !== typeof T && p instanceof T.Za) || B(p), -p.bb
        }
      },
      ia: function (a, b, c, d) {
        try {
          return d && ((M[d >> 2] = -1), (M[(d + 4) >> 2] = -1), (M[(d + 8) >> 2] = -1), (M[(d + 12) >> 2] = -1)), 0
        } catch (f) {
          return ('undefined' !== typeof T && f instanceof T.Za) || B(f), -f.bb
        }
      },
      O: function (a, b, c, d, f, g) {
        try {
          var h = X(a),
            n = h.qb.ad(h, c)
          if (!n) return 0
          f && Gb(f, h.family, Kb(n.hb), n.port, g)
          D.set(n.buffer, b)
          return n.buffer.byteLength
        } catch (p) {
          return ('undefined' !== typeof T && p instanceof T.Za) || B(p), -p.bb
        }
      },
      ua: function (a, b) {
        try {
          return (a = H(a)), (b = H(b)), T.rename(a, b), 0
        } catch (c) {
          return ('undefined' !== typeof T && c instanceof T.Za) || B(c), -c.bb
        }
      },
      qa: function (a) {
        try {
          return (a = H(a)), T.rmdir(a), 0
        } catch (b) {
          return ('undefined' !== typeof T && b instanceof T.Za) || B(b), -b.bb
        }
      },
      P: function (a, b, c, d, f, g) {
        try {
          var h = X(a),
            n = Pb(f, g, !0)
          return n ? h.qb.cd(h, F, b, c, n.hb, n.port) : T.write(h.stream, F, b, c)
        } catch (p) {
          return ('undefined' !== typeof T && p instanceof T.Za) || B(p), -p.bb
        }
      },
      ha: function () {
        return 0
      },
      M: function () {
        return -50
      },
      W: function (a) {
        try {
          return X(a), -52
        } catch (b) {
          return ('undefined' !== typeof T && b instanceof T.Za) || B(b), -b.bb
        }
      },
      z: function (a, b, c) {
        try {
          return W.createSocket(a, b, c).stream.fd
        } catch (d) {
          return ('undefined' !== typeof T && d instanceof T.Za) || B(d), -d.bb
        }
      },
      E: function (a, b) {
        try {
          return (a = H(a)), Ab(T.stat, a, b)
        } catch (c) {
          return ('undefined' !== typeof T && c instanceof T.Za) || B(c), -c.bb
        }
      },
      ka: function (a) {
        try {
          if (!a) return -21
          var b = { __size__: 390, domainname: 325, machine: 260, nodename: 65, release: 130, sysname: 0, version: 195 }
          K('Emscripten', a + b.sysname)
          K('emscripten', a + b.nodename)
          K('1.0', a + b.release)
          K('#1', a + b.version)
          K('wasm32', a + b.machine)
          return 0
        } catch (c) {
          return ('undefined' !== typeof T && c instanceof T.Za) || B(c), -c.bb
        }
      },
      ra: function (a) {
        try {
          return (a = H(a)), T.unlink(a), 0
        } catch (b) {
          return ('undefined' !== typeof T && b instanceof T.Za) || B(b), -b.bb
        }
      },
      Z: function () {
        throw 'longjmp'
      },
      a: function () {
        B()
      },
      ta: Qb,
      ya: ab,
      H: function () {
        B(
          "To use dlopen, you need to use Emscripten's linking support, see https://github.com/emscripten-core/emscripten/wiki/Linking",
        )
      },
      Aa: function () {
        B(
          "To use dlopen, you need to use Emscripten's linking support, see https://github.com/emscripten-core/emscripten/wiki/Linking",
        )
      },
      oa: function () {
        return D.length
      },
      X: function (a, b, c) {
        D.copyWithin(a, b, b + c)
      },
      Y: function () {
        B('OOM')
      },
      aa: function (a) {
        for (var b = $a(); $a() - b < a; );
      },
      _: function (a, b) {
        try {
          var c = 0
          Sb().forEach(function (d, f) {
            var g = b + c
            M[(a + 4 * f) >> 2] = g
            K(d, g)
            c += d.length + 1
          })
          return 0
        } catch (d) {
          return ('undefined' !== typeof T && d instanceof T.Za) || B(d), d.bb
        }
      },
      $: function (a, b) {
        try {
          var c = Sb()
          M[a >> 2] = c.length
          var d = 0
          c.forEach(function (f) {
            d += f.length + 1
          })
          M[b >> 2] = d
          return 0
        } catch (f) {
          return ('undefined' !== typeof T && f instanceof T.Za) || B(f), f.bb
        }
      },
      s: function (a) {
        da(a)
      },
      t: function (a) {
        try {
          var b = V(a)
          T.close(b)
          return 0
        } catch (c) {
          return ('undefined' !== typeof T && c instanceof T.Za) || B(c), c.bb
        }
      },
      A: function (a, b) {
        try {
          var c = V(a)
          F[b >> 0] = c.tty ? 2 : T.ib(c.mode) ? 3 : T.Db(c.mode) ? 7 : 4
          return 0
        } catch (d) {
          return ('undefined' !== typeof T && d instanceof T.Za) || B(d), d.bb
        }
      },
      C: function (a, b, c, d) {
        try {
          a: {
            for (var f = V(a), g = (a = 0); g < c; g++) {
              var h = M[(b + (8 * g + 4)) >> 2],
                n = T.read(f, F, M[(b + 8 * g) >> 2], h, void 0)
              if (0 > n) {
                var p = -1
                break a
              }
              a += n
              if (n < h) break
            }
            p = a
          }
          M[d >> 2] = p
          return 0
        } catch (q) {
          return ('undefined' !== typeof T && q instanceof T.Za) || B(q), q.bb
        }
      },
      I: function (a, b, c, d, f) {
        try {
          var g = V(a)
          a = 4294967296 * c + (b >>> 0)
          if (-9007199254740992 >= a || 9007199254740992 <= a) return -61
          T.pb(g, a, d)
          R = [
            g.position >>> 0,
            ((Q = g.position),
            1 <= +Math.abs(Q)
              ? 0 < Q
                ? (Math.min(+Math.floor(Q / 4294967296), 4294967295) | 0) >>> 0
                : ~~+Math.ceil((Q - +(~~Q >>> 0)) / 4294967296) >>> 0
              : 0),
          ]
          M[f >> 2] = R[0]
          M[(f + 4) >> 2] = R[1]
          g.Cb && 0 === a && 0 === d && (g.Cb = null)
          return 0
        } catch (h) {
          return ('undefined' !== typeof T && h instanceof T.Za) || B(h), h.bb
        }
      },
      v: function (a, b, c, d) {
        try {
          a: {
            for (var f = V(a), g = (a = 0); g < c; g++) {
              var h = T.write(f, F, M[(b + 8 * g) >> 2], M[(b + (8 * g + 4)) >> 2], void 0)
              if (0 > h) {
                var n = -1
                break a
              }
              a += h
            }
            n = a
          }
          M[d >> 2] = n
          return 0
        } catch (p) {
          return ('undefined' !== typeof T && p instanceof T.Za) || B(p), p.bb
        }
      },
      q: Ub,
      c: function () {
        return ra
      },
      o: function (a, b, c, d) {
        function f(w, z, m, t, u, E) {
          var J = 10 === w ? 28 : 16
          u = 10 === w ? Mb(u) : Lb(u)
          J = Ca(J)
          u = Gb(J, w, u, E)
          assert(!u)
          u = Ca(32)
          M[(u + 4) >> 2] = w
          M[(u + 8) >> 2] = z
          M[(u + 12) >> 2] = m
          M[(u + 24) >> 2] = t
          M[(u + 20) >> 2] = J
          M[(u + 16) >> 2] = 10 === w ? 28 : 16
          M[(u + 28) >> 2] = 0
          return u
        }
        var g = 0,
          h = 0,
          n = 0,
          p = 0,
          q = 0,
          r = 0
        c && ((n = M[c >> 2]), (p = M[(c + 4) >> 2]), (q = M[(c + 8) >> 2]), (r = M[(c + 12) >> 2]))
        q && !r && (r = 2 === q ? 17 : 6)
        !q && r && (q = 17 === r ? 2 : 1)
        0 === r && (r = 6)
        0 === q && (q = 1)
        if (!a && !b) return -2
        if (n & -1088 || (0 !== c && M[c >> 2] & 2 && !a)) return -1
        if (n & 32) return -2
        if (0 !== q && 1 !== q && 2 !== q) return -7
        if (0 !== p && 2 !== p && 10 !== p) return -6
        if (b && ((b = H(b)), (h = parseInt(b, 10)), isNaN(h))) return n & 1024 ? -2 : -8
        if (!a)
          return (
            0 === p && (p = 2),
            0 === (n & 1) && (2 === p ? (g = dc(2130706433)) : (g = [0, 0, 0, 1])),
            (a = f(p, q, r, null, g, h)),
            (M[d >> 2] = a),
            0
          )
        a = H(a)
        g = Db(a)
        if (null !== g)
          if (0 === p || 2 === p) p = 2
          else if (10 === p && n & 8) (g = [0, 0, dc(65535), g]), (p = 10)
          else return -2
        else if (((g = Eb(a)), null !== g))
          if (0 === p || 10 === p) p = 10
          else return -2
        if (null != g) return (a = f(p, q, r, a, g, h)), (M[d >> 2] = a), 0
        if (n & 4) return -2
        a = Kb(a)
        g = Db(a)
        0 === p ? (p = 2) : 10 === p && (g = [0, 0, dc(65535), g])
        a = f(p, q, r, null, g, h)
        M[d >> 2] = a
        return 0
      },
      n: function (a, b, c, d, f, g, h) {
        b = Ob(a, b)
        if (b.bb) return -6
        a = b.port
        var n = b.hb
        b = !1
        if (c && d) {
          var p
          if (h & 1 || !(p = Jb[n] ? Jb[n] : null)) {
            if (h & 8) return -2
          } else n = p
          c = C(n, D, c, d)
          c + 1 >= d && (b = !0)
        }
        f && g && ((c = C('' + a, D, f, g)), c + 1 >= g && (b = !0))
        return b ? -12 : 0
      },
      g: function (a) {
        var b = Date.now()
        M[a >> 2] = (b / 1e3) | 0
        M[(a + 4) >> 2] = ((b % 1e3) * 1e3) | 0
        return 0
      },
      j: db,
      Ca: ec,
      Ba: fc,
      e: hc,
      u: ic,
      x: jc,
      F: kc,
      w: lc,
      K: mc,
      J: nc,
      m: oc,
      p: pc,
      f: qc,
      za: rc,
      G: sc,
      L: tc,
      i: jb,
      y: function (a) {
        eb()
        var b = new Date(
            M[(a + 20) >> 2] + 1900,
            M[(a + 16) >> 2],
            M[(a + 12) >> 2],
            M[(a + 8) >> 2],
            M[(a + 4) >> 2],
            M[a >> 2],
            0,
          ),
          c = M[(a + 32) >> 2],
          d = b.getTimezoneOffset(),
          f = new Date(b.getFullYear(), 0, 1),
          g = new Date(b.getFullYear(), 6, 1).getTimezoneOffset(),
          h = f.getTimezoneOffset(),
          n = Math.min(h, g)
        0 > c
          ? (M[(a + 32) >> 2] = Number(g != h && n == d))
          : 0 < c != (n == d) && ((g = Math.max(h, g)), b.setTime(b.getTime() + 6e4 * ((0 < c ? n : g) - d)))
        M[(a + 24) >> 2] = b.getDay()
        M[(a + 28) >> 2] = ((b.getTime() - f.getTime()) / 864e5) | 0
        M[a >> 2] = b.getSeconds()
        M[(a + 4) >> 2] = b.getMinutes()
        M[(a + 8) >> 2] = b.getHours()
        M[(a + 12) >> 2] = b.getDate()
        M[(a + 16) >> 2] = b.getMonth()
        return (b.getTime() / 1e3) | 0
      },
      d: function (a) {
        ra = a
      },
      r: function () {
        return 0
      },
      h: function (a, b, c, d) {
        function f(m, t, u) {
          for (m = 'number' === typeof m ? m.toString() : m || ''; m.length < t; ) m = u[0] + m
          return m
        }
        function g(m, t) {
          return f(m, t, '0')
        }
        function h(m, t) {
          function u(J) {
            return 0 > J ? -1 : 0 < J ? 1 : 0
          }
          var E
          0 === (E = u(m.getFullYear() - t.getFullYear())) &&
            0 === (E = u(m.getMonth() - t.getMonth())) &&
            (E = u(m.getDate() - t.getDate()))
          return E
        }
        function n(m) {
          switch (m.getDay()) {
            case 0:
              return new Date(m.getFullYear() - 1, 11, 29)
            case 1:
              return m
            case 2:
              return new Date(m.getFullYear(), 0, 3)
            case 3:
              return new Date(m.getFullYear(), 0, 2)
            case 4:
              return new Date(m.getFullYear(), 0, 1)
            case 5:
              return new Date(m.getFullYear() - 1, 11, 31)
            case 6:
              return new Date(m.getFullYear() - 1, 11, 30)
          }
        }
        function p(m) {
          m = Zb(new Date(m.nb + 1900, 0, 1), m.lc)
          var t = new Date(m.getFullYear() + 1, 0, 4),
            u = n(new Date(m.getFullYear(), 0, 4))
          t = n(t)
          return 0 >= h(u, m) ? (0 >= h(t, m) ? m.getFullYear() + 1 : m.getFullYear()) : m.getFullYear() - 1
        }
        var q = M[(d + 40) >> 2]
        d = {
          Wd: M[d >> 2],
          Vd: M[(d + 4) >> 2],
          jc: M[(d + 8) >> 2],
          Zb: M[(d + 12) >> 2],
          Qb: M[(d + 16) >> 2],
          nb: M[(d + 20) >> 2],
          kc: M[(d + 24) >> 2],
          lc: M[(d + 28) >> 2],
          oe: M[(d + 32) >> 2],
          Ud: M[(d + 36) >> 2],
          Xd: q ? H(q) : '',
        }
        c = H(c)
        q = {
          '%c': '%a %b %d %H:%M:%S %Y',
          '%D': '%m/%d/%y',
          '%F': '%Y-%m-%d',
          '%h': '%b',
          '%r': '%I:%M:%S %p',
          '%R': '%H:%M',
          '%T': '%H:%M:%S',
          '%x': '%m/%d/%y',
          '%X': '%H:%M:%S',
          '%Ec': '%c',
          '%EC': '%C',
          '%Ex': '%m/%d/%y',
          '%EX': '%H:%M:%S',
          '%Ey': '%y',
          '%EY': '%Y',
          '%Od': '%d',
          '%Oe': '%e',
          '%OH': '%H',
          '%OI': '%I',
          '%Om': '%m',
          '%OM': '%M',
          '%OS': '%S',
          '%Ou': '%u',
          '%OU': '%U',
          '%OV': '%V',
          '%Ow': '%w',
          '%OW': '%W',
          '%Oy': '%y',
        }
        for (var r in q) c = c.replace(new RegExp(r, 'g'), q[r])
        var w = 'Sunday Monday Tuesday Wednesday Thursday Friday Saturday'.split(' '),
          z = 'January February March April May June July August September October November December'.split(' ')
        q = {
          '%a': function (m) {
            return w[m.kc].substring(0, 3)
          },
          '%A': function (m) {
            return w[m.kc]
          },
          '%b': function (m) {
            return z[m.Qb].substring(0, 3)
          },
          '%B': function (m) {
            return z[m.Qb]
          },
          '%C': function (m) {
            return g(((m.nb + 1900) / 100) | 0, 2)
          },
          '%d': function (m) {
            return g(m.Zb, 2)
          },
          '%e': function (m) {
            return f(m.Zb, 2, ' ')
          },
          '%g': function (m) {
            return p(m).toString().substring(2)
          },
          '%G': function (m) {
            return p(m)
          },
          '%H': function (m) {
            return g(m.jc, 2)
          },
          '%I': function (m) {
            m = m.jc
            0 == m ? (m = 12) : 12 < m && (m -= 12)
            return g(m, 2)
          },
          '%j': function (m) {
            return g(m.Zb + Wb(Vb(m.nb + 1900) ? Xb : Yb, m.Qb - 1), 3)
          },
          '%m': function (m) {
            return g(m.Qb + 1, 2)
          },
          '%M': function (m) {
            return g(m.Vd, 2)
          },
          '%n': function () {
            return '\n'
          },
          '%p': function (m) {
            return 0 <= m.jc && 12 > m.jc ? 'AM' : 'PM'
          },
          '%S': function (m) {
            return g(m.Wd, 2)
          },
          '%t': function () {
            return '\t'
          },
          '%u': function (m) {
            return m.kc || 7
          },
          '%U': function (m) {
            var t = new Date(m.nb + 1900, 0, 1),
              u = 0 === t.getDay() ? t : Zb(t, 7 - t.getDay())
            m = new Date(m.nb + 1900, m.Qb, m.Zb)
            return 0 > h(u, m)
              ? g(
                  Math.ceil(
                    (31 - u.getDate() + (Wb(Vb(m.getFullYear()) ? Xb : Yb, m.getMonth() - 1) - 31) + m.getDate()) / 7,
                  ),
                  2,
                )
              : 0 === h(u, t)
              ? '01'
              : '00'
          },
          '%V': function (m) {
            var t = new Date(m.nb + 1901, 0, 4),
              u = n(new Date(m.nb + 1900, 0, 4))
            t = n(t)
            var E = Zb(new Date(m.nb + 1900, 0, 1), m.lc)
            return 0 > h(E, u)
              ? '53'
              : 0 >= h(t, E)
              ? '01'
              : g(Math.ceil((u.getFullYear() < m.nb + 1900 ? m.lc + 32 - u.getDate() : m.lc + 1 - u.getDate()) / 7), 2)
          },
          '%w': function (m) {
            return m.kc
          },
          '%W': function (m) {
            var t = new Date(m.nb, 0, 1),
              u = 1 === t.getDay() ? t : Zb(t, 0 === t.getDay() ? 1 : 7 - t.getDay() + 1)
            m = new Date(m.nb + 1900, m.Qb, m.Zb)
            return 0 > h(u, m)
              ? g(
                  Math.ceil(
                    (31 - u.getDate() + (Wb(Vb(m.getFullYear()) ? Xb : Yb, m.getMonth() - 1) - 31) + m.getDate()) / 7,
                  ),
                  2,
                )
              : 0 === h(u, t)
              ? '01'
              : '00'
          },
          '%y': function (m) {
            return (m.nb + 1900).toString().substring(2)
          },
          '%Y': function (m) {
            return m.nb + 1900
          },
          '%z': function (m) {
            m = m.Ud
            var t = 0 <= m
            m = Math.abs(m) / 60
            return (t ? '+' : '-') + String('0000' + ((m / 60) * 100 + (m % 60))).slice(-4)
          },
          '%Z': function (m) {
            return m.Xd
          },
          '%%': function () {
            return '%'
          },
        }
        for (r in q) c.includes(r) && (c = c.replace(new RegExp(r, 'g'), q[r](d)))
        r = vb(c, !1)
        if (r.length > b) return 0
        F.set(r, a)
        return r.length - 1
      },
      k: function (a) {
        var b = (Date.now() / 1e3) | 0
        a && (M[a >> 2] = b)
        return b
      },
    }
    ;(function () {
      function a(f) {
        e.asm = f.exports
        ta = e.asm.Da
        Ea = f = ta.buffer
        e.HEAP8 = F = new Int8Array(f)
        e.HEAP16 = L = new Int16Array(f)
        e.HEAP32 = M = new Int32Array(f)
        e.HEAPU8 = D = new Uint8Array(f)
        e.HEAPU16 = Fa = new Uint16Array(f)
        e.HEAPU32 = new Uint32Array(f)
        e.HEAPF32 = Ga = new Float32Array(f)
        e.HEAPF64 = Ha = new Float64Array(f)
        O = e.asm.Ia
        Ja.unshift(e.asm.Ea)
        Ta()
      }
      function b(f) {
        a(f.instance)
      }
      function c(f) {
        return Xa()
          .then(function (g) {
            return WebAssembly.instantiate(g, d)
          })
          .then(f, function (g) {
            k('failed to asynchronously prepare wasm: ' + g)
            B(g)
          })
      }
      var d = { a: uc }
      Sa()
      if (e.instantiateWasm)
        try {
          return e.instantiateWasm(d, a)
        } catch (f) {
          return k('Module.instantiateWasm callback failed with error: ' + f), !1
        }
      ;(function () {
        return sa ||
          'function' !== typeof WebAssembly.instantiateStreaming ||
          Ua() ||
          P.startsWith('file://') ||
          'function' !== typeof fetch
          ? c(b)
          : fetch(P, { credentials: 'same-origin' }).then(function (f) {
              return WebAssembly.instantiateStreaming(f, d).then(b, function (g) {
                k('wasm streaming compile failed: ' + g)
                k('falling back to ArrayBuffer instantiation')
                return c(b)
              })
            })
      })().catch(ba)
      return {}
    })()
    e.___wasm_call_ctors = function () {
      return (e.___wasm_call_ctors = e.asm.Ea).apply(null, arguments)
    }
    var cc = (e._free = function () {
        return (cc = e._free = e.asm.Fa).apply(null, arguments)
      }),
      ac = (e._memset = function () {
        return (ac = e._memset = e.asm.Ga).apply(null, arguments)
      }),
      Ca = (e._malloc = function () {
        return (Ca = e._malloc = e.asm.Ha).apply(null, arguments)
      }),
      cb = (e.___errno_location = function () {
        return (cb = e.___errno_location = e.asm.Ja).apply(null, arguments)
      }),
      bc = (e._memalign = function () {
        return (bc = e._memalign = e.asm.Ka).apply(null, arguments)
      }),
      Nb = (e._ntohs = function () {
        return (Nb = e._ntohs = e.asm.La).apply(null, arguments)
      }),
      Fb = (e._htons = function () {
        return (Fb = e._htons = e.asm.Ma).apply(null, arguments)
      })
    e._main = function () {
      return (e._main = e.asm.Na).apply(null, arguments)
    }
    var dc = (e._htonl = function () {
        return (dc = e._htonl = e.asm.Oa).apply(null, arguments)
      }),
      ib = (e.__get_tzname = function () {
        return (ib = e.__get_tzname = e.asm.Pa).apply(null, arguments)
      }),
      hb = (e.__get_daylight = function () {
        return (hb = e.__get_daylight = e.asm.Qa).apply(null, arguments)
      }),
      gb = (e.__get_timezone = function () {
        return (gb = e.__get_timezone = e.asm.Ra).apply(null, arguments)
      }),
      G = (e.stackSave = function () {
        return (G = e.stackSave = e.asm.Sa).apply(null, arguments)
      }),
      I = (e.stackRestore = function () {
        return (I = e.stackRestore = e.asm.Ta).apply(null, arguments)
      }),
      xa = (e.stackAlloc = function () {
        return (xa = e.stackAlloc = e.asm.Ua).apply(null, arguments)
      }),
      Z = (e._setThrew = function () {
        return (Z = e._setThrew = e.asm.Va).apply(null, arguments)
      }),
      vc = (e.dynCall_vijjjid = function () {
        return (vc = e.dynCall_vijjjid = e.asm.Wa).apply(null, arguments)
      }),
      wc = (e.dynCall_iiiijj = function () {
        return (wc = e.dynCall_iiiijj = e.asm.Xa).apply(null, arguments)
      }),
      xc = (e.dynCall_iij = function () {
        return (xc = e.dynCall_iij = e.asm.Ya).apply(null, arguments)
      })
    e._ff_h264_cabac_tables = 2553548
    function hc(a, b, c) {
      var d = G()
      try {
        return O.get(a)(b, c)
      } catch (f) {
        I(d)
        if (f !== f + 0 && 'longjmp' !== f) throw f
        Z(1, 0)
      }
    }
    function oc(a, b) {
      var c = G()
      try {
        O.get(a)(b)
      } catch (d) {
        I(c)
        if (d !== d + 0 && 'longjmp' !== d) throw d
        Z(1, 0)
      }
    }
    function qc(a, b, c, d, f) {
      var g = G()
      try {
        O.get(a)(b, c, d, f)
      } catch (h) {
        I(g)
        if (h !== h + 0 && 'longjmp' !== h) throw h
        Z(1, 0)
      }
    }
    function pc(a, b, c) {
      var d = G()
      try {
        O.get(a)(b, c)
      } catch (f) {
        I(d)
        if (f !== f + 0 && 'longjmp' !== f) throw f
        Z(1, 0)
      }
    }
    function jc(a, b, c, d, f) {
      var g = G()
      try {
        return O.get(a)(b, c, d, f)
      } catch (h) {
        I(g)
        if (h !== h + 0 && 'longjmp' !== h) throw h
        Z(1, 0)
      }
    }
    function lc(a, b, c, d, f, g, h, n, p) {
      var q = G()
      try {
        return O.get(a)(b, c, d, f, g, h, n, p)
      } catch (r) {
        I(q)
        if (r !== r + 0 && 'longjmp' !== r) throw r
        Z(1, 0)
      }
    }
    function ec(a) {
      var b = G()
      try {
        return O.get(a)()
      } catch (c) {
        I(b)
        if (c !== c + 0 && 'longjmp' !== c) throw c
        Z(1, 0)
      }
    }
    function fc(a, b) {
      var c = G()
      try {
        return O.get(a)(b)
      } catch (d) {
        I(c)
        if (d !== d + 0 && 'longjmp' !== d) throw d
        Z(1, 0)
      }
    }
    function ic(a, b, c, d) {
      var f = G()
      try {
        return O.get(a)(b, c, d)
      } catch (g) {
        I(f)
        if (g !== g + 0 && 'longjmp' !== g) throw g
        Z(1, 0)
      }
    }
    function sc(a, b, c, d, f, g, h, n, p) {
      var q = G()
      try {
        O.get(a)(b, c, d, f, g, h, n, p)
      } catch (r) {
        I(q)
        if (r !== r + 0 && 'longjmp' !== r) throw r
        Z(1, 0)
      }
    }
    function kc(a, b, c, d, f, g) {
      var h = G()
      try {
        return O.get(a)(b, c, d, f, g)
      } catch (n) {
        I(h)
        if (n !== n + 0 && 'longjmp' !== n) throw n
        Z(1, 0)
      }
    }
    function rc(a, b, c, d, f, g, h) {
      var n = G()
      try {
        O.get(a)(b, c, d, f, g, h)
      } catch (p) {
        I(n)
        if (p !== p + 0 && 'longjmp' !== p) throw p
        Z(1, 0)
      }
    }
    function tc(a, b, c, d, f, g, h, n, p, q) {
      var r = G()
      try {
        vc(a, b, c, d, f, g, h, n, p, q)
      } catch (w) {
        I(r)
        if (w !== w + 0 && 'longjmp' !== w) throw w
        Z(1, 0)
      }
    }
    function mc(a, b, c, d, f, g, h, n) {
      var p = G()
      try {
        return wc(a, b, c, d, f, g, h, n)
      } catch (q) {
        I(p)
        if (q !== q + 0 && 'longjmp' !== q) throw q
        Z(1, 0)
      }
    }
    function nc(a, b, c, d) {
      var f = G()
      try {
        return xc(a, b, c, d)
      } catch (g) {
        I(f)
        if (g !== g + 0 && 'longjmp' !== g) throw g
        Z(1, 0)
      }
    }
    e.ccall = wa
    e.cwrap = function (a, b, c, d) {
      c = c || []
      var f = c.every(function (g) {
        return 'number' === g
      })
      return 'string' !== b && f && !d
        ? va(a)
        : function () {
            return wa(a, b, c, arguments, d)
          }
    }
    e.setValue = function (a, b, c) {
      c = c || 'i8'
      '*' === c.charAt(c.length - 1) && (c = 'i32')
      switch (c) {
        case 'i1':
          F[a >> 0] = b
          break
        case 'i8':
          F[a >> 0] = b
          break
        case 'i16':
          L[a >> 1] = b
          break
        case 'i32':
          M[a >> 2] = b
          break
        case 'i64':
          R = [
            b >>> 0,
            ((Q = b),
            1 <= +Math.abs(Q)
              ? 0 < Q
                ? (Math.min(+Math.floor(Q / 4294967296), 4294967295) | 0) >>> 0
                : ~~+Math.ceil((Q - +(~~Q >>> 0)) / 4294967296) >>> 0
              : 0),
          ]
          M[a >> 2] = R[0]
          M[(a + 4) >> 2] = R[1]
          break
        case 'float':
          Ga[a >> 2] = b
          break
        case 'double':
          Ha[a >> 3] = b
          break
        default:
          B('invalid type for setValue: ' + c)
      }
    }
    e.writeAsciiToMemory = K
    e.FS = T
    var yc
    function ca(a) {
      this.name = 'ExitStatus'
      this.message = 'Program terminated with exit(' + a + ')'
      this.status = a
    }
    Ra = function zc() {
      yc || Ac()
      yc || (Ra = zc)
    }
    function Ac(a) {
      function b() {
        if (!yc && ((yc = !0), (e.calledRun = !0), !ua)) {
          e.noFSInit || T.Tb.wc || T.Tb()
          T.Yc = !1
          W.root = T.gb(W, {}, null)
          Ya(Ja)
          Ya(Ka)
          aa(e)
          if (e.onRuntimeInitialized) e.onRuntimeInitialized()
          if (Bc) {
            var c = a,
              d = e._main
            c = c || []
            var f = c.length + 1,
              g = xa(4 * (f + 1))
            M[g >> 2] = Da(ia)
            for (var h = 1; h < f; h++) M[(g >> 2) + h] = Da(c[h - 1])
            M[(g >> 2) + f] = 0
            try {
              var n = d(f, g)
              da(n, !0)
            } catch (p) {
              p instanceof ca ||
                'unwind' == p ||
                ((c = p) && 'object' === typeof p && p.stack && (c = [p, p.stack]),
                k('exception thrown: ' + c),
                ja(1, p))
            } finally {
            }
          }
          if (e.postRun)
            for ('function' == typeof e.postRun && (e.postRun = [e.postRun]); e.postRun.length; )
              (c = e.postRun.shift()), La.unshift(c)
          Ya(La)
        }
      }
      a = a || ha
      if (!(0 < Na)) {
        if (e.preRun) for ('function' == typeof e.preRun && (e.preRun = [e.preRun]); e.preRun.length; ) Ma()
        Ya(Ia)
        0 < Na ||
          (e.setStatus
            ? (e.setStatus('Running...'),
              setTimeout(function () {
                setTimeout(function () {
                  e.setStatus('')
                }, 1)
                b()
              }, 1))
            : b())
      }
    }
    e.run = Ac
    function da(a, b) {
      if (!b || !(noExitRuntime || 0 < Za) || 0 !== a) {
        if (!(noExitRuntime || 0 < Za)) {
          if (e.onExit) e.onExit(a)
          ua = !0
        }
        ja(a, new ca(a))
      }
    }
    if (e.preInit)
      for ('function' == typeof e.preInit && (e.preInit = [e.preInit]); 0 < e.preInit.length; ) e.preInit.pop()()
    var Bc = !1
    e.noInitialRun && (Bc = !1)
    Ac()

    return createFFmpegCore.ready
  }
})()
if (typeof exports === 'object' && typeof module === 'object') module.exports = createFFmpegCore
else if (typeof define === 'function' && define['amd'])
  define([], function () {
    return createFFmpegCore
  })
else if (typeof exports === 'object') exports['createFFmpegCore'] = createFFmpegCore
