var g, l = this,
    m = function(a) {
        return void 0 !== a
    },
    aa = function(a, b) {
        var c = a.split("."),
            d = l;
        c[0] in d || !d.execScript || d.execScript("var " + c[0]);
        for (var e; c.length && (e = c.shift());) !c.length && m(b) ? d[e] = b : d = d[e] ? d[e] : d[e] = {}
    },
    ba = function() {
        throw Error("unimplemented abstract method");
    },
    ca = function(a) {
        a.la = function() {
            return a.Uc ? a.Uc : a.Uc = new a
        }
    },
    da = function(a) {
        var b = typeof a;
        if ("object" == b)
            if (a) {
                if (a instanceof Array) return "array";
                if (a instanceof Object) return b;
                var c = Object.prototype.toString.call(a);
                if ("[object Window]" ==
                    c) return "object";
                if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";
                if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function"
            } else return "null";
        else if ("function" == b && "undefined" == typeof a.call) return "object";
        return b
    },
    ea = function(a) {
        return "array" == da(a)
    },
    fa = function(a) {
        var b = da(a);
        return "array" ==
            b || "object" == b && "number" == typeof a.length
    },
    n = function(a) {
        return "string" == typeof a
    },
    ga = function(a) {
        var b = typeof a;
        return "object" == b && null != a || "function" == b
    },
    ha = function(a, b, c) {
        return a.call.apply(a.bind, arguments)
    },
    ia = function(a, b, c) {
        if (!a) throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function() {
                var c = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(c, d);
                return a.apply(b, c)
            }
        }
        return function() {
            return a.apply(b, arguments)
        }
    },
    p = function(a,
        b, c) {
        p = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ha : ia;
        return p.apply(null, arguments)
    },
    ja = function(a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function() {
            var b = c.slice();
            b.push.apply(b, arguments);
            return a.apply(this, b)
        }
    },
    q = Date.now || function() {
        return +new Date
    },
    r = function(a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.g = b.prototype;
        a.prototype = new c;
        a.pe = function(a, c, f) {
            for (var h = Array(arguments.length - 2), k = 2; k < arguments.length; k++) h[k - 2] = arguments[k];
            return b.prototype[c].apply(a, h)
        }
    };
var t = function() {
    this.La = this.La;
    this.Ea = this.Ea
};
t.prototype.La = !1;
t.prototype.Ka = function() {
    this.La || (this.La = !0, this.l())
};
var u = function(a, b) {
    var c = ja(ka, b);
    a.La ? m(void 0) ? c.call(void 0) : c() : (a.Ea || (a.Ea = []), a.Ea.push(m(void 0) ? p(c, void 0) : c))
};
t.prototype.l = function() {
    if (this.Ea)
        for (; this.Ea.length;) this.Ea.shift()()
};
var ka = function(a) {
    a && "function" == typeof a.Ka && a.Ka()
};
var la = function(a) {
    if (Error.captureStackTrace) Error.captureStackTrace(this, la);
    else {
        var b = Error().stack;
        b && (this.stack = b)
    }
    a && (this.message = String(a))
};
r(la, Error);
la.prototype.name = "CustomError";
var ma;
var na = function(a, b) {
        for (var c = a.split("%s"), d = "", e = Array.prototype.slice.call(arguments, 1); e.length && 1 < c.length;) d += c.shift() + e.shift();
        return d + c.join("%s")
    },
    oa = String.prototype.trim ? function(a) {
        return a.trim()
    } : function(a) {
        return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
    },
    wa = function(a) {
        if (!pa.test(a)) return a; - 1 != a.indexOf("&") && (a = a.replace(qa, "&amp;")); - 1 != a.indexOf("<") && (a = a.replace(ra, "&lt;")); - 1 != a.indexOf(">") && (a = a.replace(sa, "&gt;")); - 1 != a.indexOf('"') && (a = a.replace(ta, "&quot;")); - 1 != a.indexOf("'") &&
            (a = a.replace(ua, "&#39;")); - 1 != a.indexOf("\x00") && (a = a.replace(va, "&#0;"));
        return a
    },
    qa = /&/g,
    ra = /</g,
    sa = />/g,
    ta = /"/g,
    ua = /'/g,
    va = /\x00/g,
    pa = /[\x00&<>"']/,
    xa = String.prototype.repeat ? function(a, b) {
        return a.repeat(b)
    } : function(a, b) {
        return Array(b + 1).join(a)
    },
    ya = function(a) {
        a = m(void 0) ? a.toFixed(void 0) : String(a);
        var b = a.indexOf("."); - 1 == b && (b = a.length);
        return xa("0", Math.max(0, 2 - b)) + a
    },
    za = function(a, b) {
        return a < b ? -1 : a > b ? 1 : 0
    },
    Aa = function(a) {
        return String(a).replace(/\-([a-z])/g, function(a, c) {
            return c.toUpperCase()
        })
    },
    Ba = function(a) {
        var b = n(void 0) ? "undefined".replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08") : "\\s";
        return a.replace(new RegExp("(^" + (b ? "|[" + b + "]+" : "") + ")([a-z])", "g"), function(a, b, e) {
            return b + e.toUpperCase()
        })
    };
var Ca = function(a, b) {
    b.unshift(a);
    la.call(this, na.apply(null, b));
    b.shift()
};
r(Ca, la);
Ca.prototype.name = "AssertionError";
var Da = function(a, b, c, d) {
        var e = "Assertion failed";
        if (c) var e = e + (": " + c),
            f = d;
        else a && (e += ": " + a, f = b);
        throw new Ca("" + e, f || []);
    },
    v = function(a, b, c) {
        a || Da("", null, b, Array.prototype.slice.call(arguments, 2))
    },
    Ea = function(a, b, c) {
        "number" == typeof a || Da("Expected number but got %s: %s.", [da(a), a], b, Array.prototype.slice.call(arguments, 2));
        return a
    };
var Fa = function(a) {
    Fa[" "](a);
    return a
};
Fa[" "] = function() {};
var Ha = function(a, b) {
    var c = Ga;
    return Object.prototype.hasOwnProperty.call(c, a) ? c[a] : c[a] = b(a)
};
var Ia = Array.prototype.indexOf ? function(a, b, c) {
        v(null != a.length);
        return Array.prototype.indexOf.call(a, b, c)
    } : function(a, b, c) {
        c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
        if (n(a)) return n(b) && 1 == b.length ? a.indexOf(b, c) : -1;
        for (; c < a.length; c++)
            if (c in a && a[c] === b) return c;
        return -1
    },
    w = Array.prototype.forEach ? function(a, b, c) {
        v(null != a.length);
        Array.prototype.forEach.call(a, b, c)
    } : function(a, b, c) {
        for (var d = a.length, e = n(a) ? a.split("") : a, f = 0; f < d; f++) f in e && b.call(c, e[f], f, a)
    },
    Ja = Array.prototype.filter ? function(a,
        b, c) {
        v(null != a.length);
        return Array.prototype.filter.call(a, b, c)
    } : function(a, b, c) {
        for (var d = a.length, e = [], f = 0, h = n(a) ? a.split("") : a, k = 0; k < d; k++)
            if (k in h) {
                var O = h[k];
                b.call(c, O, k, a) && (e[f++] = O)
            } return e
    },
    Ka = Array.prototype.map ? function(a, b, c) {
        v(null != a.length);
        return Array.prototype.map.call(a, b, c)
    } : function(a, b, c) {
        for (var d = a.length, e = Array(d), f = n(a) ? a.split("") : a, h = 0; h < d; h++) h in f && (e[h] = b.call(c, f[h], h, a));
        return e
    },
    La = Array.prototype.reduce ? function(a, b, c, d) {
        v(null != a.length);
        d && (b = p(b, d));
        return Array.prototype.reduce.call(a,
            b, c)
    } : function(a, b, c, d) {
        var e = c;
        w(a, function(c, h) {
            e = b.call(d, e, c, h, a)
        });
        return e
    },
    Ma = Array.prototype.some ? function(a, b, c) {
        v(null != a.length);
        return Array.prototype.some.call(a, b, c)
    } : function(a, b, c) {
        for (var d = a.length, e = n(a) ? a.split("") : a, f = 0; f < d; f++)
            if (f in e && b.call(c, e[f], f, a)) return !0;
        return !1
    },
    Na = Array.prototype.every ? function(a, b, c) {
        v(null != a.length);
        return Array.prototype.every.call(a, b, c)
    } : function(a, b, c) {
        for (var d = a.length, e = n(a) ? a.split("") : a, f = 0; f < d; f++)
            if (f in e && !b.call(c, e[f], f, a)) return !1;
        return !0
    },
    Oa = function(a, b) {
        var c = Ia(a, b),
            d;
        if (d = 0 <= c) v(null != a.length), Array.prototype.splice.call(a, c, 1);
        return d
    },
    Pa = function(a) {
        return Array.prototype.concat.apply(Array.prototype, arguments)
    },
    Qa = function(a) {
        var b = a.length;
        if (0 < b) {
            for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
            return c
        }
        return []
    },
    Sa = function(a, b, c, d) {
        v(null != a.length);
        Array.prototype.splice.apply(a, Ra(arguments, 1))
    },
    Ra = function(a, b, c) {
        v(null != a.length);
        return 2 >= arguments.length ? Array.prototype.slice.call(a, b) : Array.prototype.slice.call(a,
            b, c)
    },
    Ta = function(a, b) {
        for (var c = b || Math.random, d = a.length - 1; 0 < d; d--) {
            var e = Math.floor(c() * (d + 1)),
                f = a[d];
            a[d] = a[e];
            a[e] = f
        }
    };
var Ua = function(a, b, c) {
        for (var d in a) b.call(c, a[d], d, a)
    },
    Va = function(a, b) {
        for (var c in a)
            if (b.call(void 0, a[c], c, a)) return !0;
        return !1
    },
    Wa = function(a) {
        var b = [],
            c = 0,
            d;
        for (d in a) b[c++] = a[d];
        return b
    },
    Xa = function(a, b) {
        return null !== a && b in a ? a[b] : void 0
    },
    Ya = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),
    Za = function(a, b) {
        for (var c, d, e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d) a[c] = d[c];
            for (var f = 0; f < Ya.length; f++) c = Ya[f], Object.prototype.hasOwnProperty.call(d,
                c) && (a[c] = d[c])
        }
    };
var $a;
a: {
    var ab = l.navigator;
    if (ab) {
        var bb = ab.userAgent;
        if (bb) {
            $a = bb;
            break a
        }
    }
    $a = ""
}
var x = function(a) {
    return -1 != $a.indexOf(a)
};
var cb = function() {
    return x("Trident") || x("MSIE")
};
var db = function() {
    return x("iPhone") && !x("iPod") && !x("iPad")
};
var eb = x("Opera"),
    y = cb(),
    fb = x("Edge"),
    z = x("Gecko") && !(-1 != $a.toLowerCase().indexOf("webkit") && !x("Edge")) && !(x("Trident") || x("MSIE")) && !x("Edge"),
    A = -1 != $a.toLowerCase().indexOf("webkit") && !x("Edge"),
    gb = x("Macintosh"),
    ib = x("Windows"),
    jb = function() {
        var a = l.document;
        return a ? a.documentMode : void 0
    },
    kb;
a: {
    var lb = "",
        mb = function() {
            var a = $a;
            if (z) return /rv\:([^\);]+)(\)|;)/.exec(a);
            if (fb) return /Edge\/([\d\.]+)/.exec(a);
            if (y) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
            if (A) return /WebKit\/(\S+)/.exec(a);
            if (eb) return /(?:Version)[ \/]?(\S+)/.exec(a)
        }();mb && (lb = mb ? mb[1] : "");
    if (y) {
        var nb = jb();
        if (null != nb && nb > parseFloat(lb)) {
            kb = String(nb);
            break a
        }
    }
    kb = lb
}
var ob = kb,
    Ga = {},
    B = function(a) {
        return Ha(a, function() {
            for (var b = 0, c = oa(String(ob)).split("."), d = oa(String(a)).split("."), e = Math.max(c.length, d.length), f = 0; 0 == b && f < e; f++) {
                var h = c[f] || "",
                    k = d[f] || "";
                do {
                    h = /(\d*)(\D*)(.*)/.exec(h) || ["", "", "", ""];
                    k = /(\d*)(\D*)(.*)/.exec(k) || ["", "", "", ""];
                    if (0 == h[0].length && 0 == k[0].length) break;
                    b = za(0 == h[1].length ? 0 : parseInt(h[1], 10), 0 == k[1].length ? 0 : parseInt(k[1], 10)) || za(0 == h[2].length, 0 == k[2].length) || za(h[2], k[2]);
                    h = h[3];
                    k = k[3]
                } while (0 == b)
            }
            return 0 <= b
        })
    },
    pb = l.document,
    qb = pb && y ? jb() || ("CSS1Compat" == pb.compatMode ? parseInt(ob, 10) : 5) : void 0;
var rb = !y || 9 <= Number(qb),
    sb = !y || 9 <= Number(qb),
    tb = y && !B("9");
!A || B("528");
z && B("1.9b") || y && B("8") || eb && B("9.5") || A && B("528");
z && !B("8") || y && B("9");
var C = function(a, b) {
    this.type = a;
    this.currentTarget = this.target = b;
    this.defaultPrevented = this.Fa = !1;
    this.jd = !0
};
C.prototype.stopPropagation = function() {
    this.Fa = !0
};
C.prototype.preventDefault = function() {
    this.defaultPrevented = !0;
    this.jd = !1
};
var ub = function(a) {
    a.preventDefault()
};
var D = function(a, b) {
    C.call(this, a ? a.type : "");
    this.relatedTarget = this.currentTarget = this.target = null;
    this.charCode = this.keyCode = this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0;
    this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
    this.ja = this.state = null;
    a && this.jb(a, b)
};
r(D, C);
var vb = [1, 4, 2];
D.prototype.jb = function(a, b) {
    var c = this.type = a.type,
        d = a.changedTouches ? a.changedTouches[0] : null;
    this.target = a.target || a.srcElement;
    this.currentTarget = b;
    var e = a.relatedTarget;
    if (e) {
        if (z) {
            var f;
            a: {
                try {
                    Fa(e.nodeName);
                    f = !0;
                    break a
                } catch (h) {}
                f = !1
            }
            f || (e = null)
        }
    } else "mouseover" == c ? e = a.fromElement : "mouseout" == c && (e = a.toElement);
    this.relatedTarget = e;
    null === d ? (this.offsetX = A || void 0 !== a.offsetX ? a.offsetX : a.layerX, this.offsetY = A || void 0 !== a.offsetY ? a.offsetY : a.layerY, this.clientX = void 0 !== a.clientX ? a.clientX :
        a.pageX, this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0) : (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX, this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY, this.screenX = d.screenX || 0, this.screenY = d.screenY || 0);
    this.button = a.button;
    this.keyCode = a.keyCode || 0;
    this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0);
    this.ctrlKey = a.ctrlKey;
    this.altKey = a.altKey;
    this.shiftKey = a.shiftKey;
    this.metaKey = a.metaKey;
    this.state = a.state;
    this.ja = a;
    a.defaultPrevented &&
        this.preventDefault()
};
D.prototype.stopPropagation = function() {
    D.g.stopPropagation.call(this);
    this.ja.stopPropagation ? this.ja.stopPropagation() : this.ja.cancelBubble = !0
};
D.prototype.preventDefault = function() {
    D.g.preventDefault.call(this);
    var a = this.ja;
    if (a.preventDefault) a.preventDefault();
    else if (a.returnValue = !1, tb) try {
        if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) a.keyCode = -1
    } catch (b) {}
};
var wb = "closure_listenable_" + (1E6 * Math.random() | 0),
    xb = function(a) {
        return !(!a || !a[wb])
    },
    yb = 0;
var zb = function(a, b, c, d, e) {
        this.listener = a;
        this.Vb = null;
        this.src = b;
        this.type = c;
        this.Ya = !!d;
        this.Fb = e;
        this.key = ++yb;
        this.Ra = this.zb = !1
    },
    Ab = function(a) {
        a.Ra = !0;
        a.listener = null;
        a.Vb = null;
        a.src = null;
        a.Fb = null
    };
var E = function(a) {
    this.src = a;
    this.F = {};
    this.tb = 0
};
E.prototype.add = function(a, b, c, d, e) {
    var f = a.toString();
    a = this.F[f];
    a || (a = this.F[f] = [], this.tb++);
    var h = Bb(a, b, d, e); - 1 < h ? (b = a[h], c || (b.zb = !1)) : (b = new zb(b, this.src, f, !!d, e), b.zb = c, a.push(b));
    return b
};
E.prototype.remove = function(a, b, c, d) {
    a = a.toString();
    if (!(a in this.F)) return !1;
    var e = this.F[a];
    b = Bb(e, b, c, d);
    return -1 < b ? (Ab(e[b]), v(null != e.length), Array.prototype.splice.call(e, b, 1), 0 == e.length && (delete this.F[a], this.tb--), !0) : !1
};
var Cb = function(a, b) {
    var c = b.type;
    c in a.F && Oa(a.F[c], b) && (Ab(b), 0 == a.F[c].length && (delete a.F[c], a.tb--))
};
E.prototype.Qa = function(a) {
    a = a && a.toString();
    var b = 0,
        c;
    for (c in this.F)
        if (!a || c == a) {
            for (var d = this.F[c], e = 0; e < d.length; e++) ++b, Ab(d[e]);
            delete this.F[c];
            this.tb--
        } return b
};
E.prototype.hb = function(a, b, c, d) {
    a = this.F[a.toString()];
    var e = -1;
    a && (e = Bb(a, b, c, d));
    return -1 < e ? a[e] : null
};
E.prototype.hasListener = function(a, b) {
    var c = m(a),
        d = c ? a.toString() : "",
        e = m(b);
    return Va(this.F, function(a) {
        for (var h = 0; h < a.length; ++h)
            if (!(c && a[h].type != d || e && a[h].Ya != b)) return !0;
        return !1
    })
};
var Bb = function(a, b, c, d) {
    for (var e = 0; e < a.length; ++e) {
        var f = a[e];
        if (!f.Ra && f.listener == b && f.Ya == !!c && f.Fb == d) return e
    }
    return -1
};
var Db = "closure_lm_" + (1E6 * Math.random() | 0),
    Eb = {},
    Fb = 0,
    Gb = function(a, b, c, d, e) {
        if (ea(b)) {
            for (var f = 0; f < b.length; f++) Gb(a, b[f], c, d, e);
            return null
        }
        c = Hb(c);
        return xb(a) ? a.a(b, c, d, e) : Ib(a, b, c, !1, d, e)
    },
    Ib = function(a, b, c, d, e, f) {
        if (!b) throw Error("Invalid event type");
        var h = !!e,
            k = Jb(a);
        k || (a[Db] = k = new E(a));
        c = k.add(b, c, d, e, f);
        if (c.Vb) return c;
        d = Kb();
        c.Vb = d;
        d.src = a;
        d.listener = c;
        if (a.addEventListener) a.addEventListener(b.toString(), d, h);
        else if (a.attachEvent) a.attachEvent(Lb(b.toString()), d);
        else throw Error("addEventListener and attachEvent are unavailable.");
        Fb++;
        return c
    },
    Kb = function() {
        var a = Mb,
            b = sb ? function(c) {
                return a.call(b.src, b.listener, c)
            } : function(c) {
                c = a.call(b.src, b.listener, c);
                if (!c) return c
            };
        return b
    },
    Nb = function(a, b, c, d, e) {
        if (ea(b)) {
            for (var f = 0; f < b.length; f++) Nb(a, b[f], c, d, e);
            return null
        }
        c = Hb(c);
        return xb(a) ? a.qc(b, c, d, e) : Ib(a, b, c, !0, d, e)
    },
    Ob = function(a, b, c, d, e) {
        if (ea(b))
            for (var f = 0; f < b.length; f++) Ob(a, b[f], c, d, e);
        else c = Hb(c), xb(a) ? a.Ia(b, c, d, e) : a && (a = Jb(a)) && (b = a.hb(b, c, !!d, e)) && Pb(b)
    },
    Pb = function(a) {
        if ("number" != typeof a && a && !a.Ra) {
            var b =
                a.src;
            if (xb(b)) Cb(b.U, a);
            else {
                var c = a.type,
                    d = a.Vb;
                b.removeEventListener ? b.removeEventListener(c, d, a.Ya) : b.detachEvent && b.detachEvent(Lb(c), d);
                Fb--;
                (c = Jb(b)) ? (Cb(c, a), 0 == c.tb && (c.src = null, b[Db] = null)) : Ab(a)
            }
        }
    },
    Lb = function(a) {
        return a in Eb ? Eb[a] : Eb[a] = "on" + a
    },
    Rb = function(a, b, c, d) {
        var e = !0;
        if (a = Jb(a))
            if (b = a.F[b.toString()])
                for (b = b.concat(), a = 0; a < b.length; a++) {
                    var f = b[a];
                    f && f.Ya == c && !f.Ra && (f = Qb(f, d), e = e && !1 !== f)
                }
        return e
    },
    Qb = function(a, b) {
        var c = a.listener,
            d = a.Fb || a.src;
        a.zb && Pb(a);
        return c.call(d, b)
    },
    Mb = function(a, b) {
        if (a.Ra) return !0;
        if (!sb) {
            var c;
            if (!(c = b)) a: {
                c = ["window", "event"];
                for (var d = l, e; e = c.shift();)
                    if (null != d[e]) d = d[e];
                    else {
                        c = null;
                        break a
                    } c = d
            }
            e = c;
            c = new D(e, this);
            d = !0;
            if (!(0 > e.keyCode || void 0 != e.returnValue)) {
                a: {
                    var f = !1;
                    if (0 == e.keyCode) try {
                        e.keyCode = -1;
                        break a
                    } catch (O) {
                        f = !0
                    }
                    if (f || void 0 == e.returnValue) e.returnValue = !0
                }
                e = [];
                for (f = c.currentTarget; f; f = f.parentNode) e.push(f);
                for (var f = a.type, h = e.length - 1; !c.Fa && 0 <= h; h--) {
                    c.currentTarget = e[h];
                    var k = Rb(e[h], f, !0, c),
                        d = d && k
                }
                for (h = 0; !c.Fa && h <
                    e.length; h++) c.currentTarget = e[h],
                k = Rb(e[h], f, !1, c),
                d = d && k
            }
            return d
        }
        return Qb(a, new D(b, this))
    },
    Jb = function(a) {
        a = a[Db];
        return a instanceof E ? a : null
    },
    Sb = "__closure_events_fn_" + (1E9 * Math.random() >>> 0),
    Hb = function(a) {
        v(a, "Listener can not be null.");
        if ("function" == da(a)) return a;
        v(a.handleEvent, "An object listener must have handleEvent method.");
        a[Sb] || (a[Sb] = function(b) {
            return a.handleEvent(b)
        });
        return a[Sb]
    };
var Tb = x("Safari") && !((x("Chrome") || x("CriOS")) && !x("Edge") || x("Coast") || x("Opera") || x("Edge") || x("Silk") || x("Android")) && !(db() || x("iPad") || x("iPod"));
var Ub = ib && Tb && !B(536.25),
    Vb = function(a, b, c) {
        var d = document.createElement("source");
        d.src = b;
        d.type = c;
        a.appendChild(d)
    },
    Wb = function(a) {
        if (Ub) return null;
        var b = document.createElement("audio");
        b && b.canPlayType && (b.canPlayType("audio/mpeg") || b.canPlayType("audio/ogg")) ? (b.controls = !1, b.hidden = !0, b.loaded = !1, Gb(b, "loadedmetadata", function() {
            b.loaded = !0;
            if (b.onloadedmetadata) b.onloadedmetadata()
        }), Vb(b, a + ".ogg", "audio/ogg"), Vb(b, a + ".mp3", "audio/mpeg")) : b = null;
        return b
    };
var Xb = function(a, b, c) {
    this.ga = {};
    this.Bd = b || "";
    this.sa = !0;
    this.Yd = c || document.body;
    if (a)
        for (var d in a) this.load(a[d])
};
r(Xb, t);
g = Xb.prototype;
g.l = function() {
    for (var a in this.ga) {
        this.stop(a);
        var b = this.ga[a];
        b.parent && b.parent.removeChild(b)
    }
    this.ga = {};
    Xb.g.l.call(this)
};
g.kb = function() {
    for (var a in this.ga)
        if (!this.ga[a].loaded) return !1;
    return !0
};
g.load = function(a) {
    var b;
    a && (b = this.ga[a], !b && (b = Wb(this.Bd + "/" + a))) && (this.Yd.appendChild(b), this.ga[a] = b);
    return b
};
g.loop = function(a) {
    if (a = this.play(a)) a.loop = !0;
    return a
};
g.play = function(a, b) {
    var c = this.load(a);
    c && c.play && this.sa && (c.autoplay = !0, c.loop = !1, c.loaded ? c.currentTime = b || 0 : b && c.addEventListener("loadedmetadata", function() {
        c.currentTime = b || 0
    }, !1), c.play());
    return c
};
g.pause = function(a) {
    if (a) {
        var b = this.ga[a];
        b && b.loaded && b.pause && (b.pause(), b.autoplay = !1, b.loop = !1)
    }
    return b
};
g.stop = function(a) {
    (a = this.pause(a)) && a.loaded && (a.currentTime = 0);
    return a
};
var F = function(a) {
    t.call(this);
    this.B = a;
    this.i = {}
};
r(F, t);
var Yb = [];
F.prototype.a = function(a, b, c, d) {
    return Zb(this, a, b, c, d)
};
var Zb = function(a, b, c, d, e, f) {
    ea(c) || (c && (Yb[0] = c.toString()), c = Yb);
    for (var h = 0; h < c.length; h++) {
        var k = Gb(b, c[h], d || a.handleEvent, e || !1, f || a.B || a);
        if (!k) break;
        a.i[k.key] = k
    }
    return a
};
F.prototype.qc = function(a, b, c, d) {
    return $b(this, a, b, c, d)
};
var $b = function(a, b, c, d, e, f) {
    if (ea(c))
        for (var h = 0; h < c.length; h++) $b(a, b, c[h], d, e, f);
    else {
        b = Nb(b, c, d || a.handleEvent, e, f || a.B || a);
        if (!b) return a;
        a.i[b.key] = b
    }
    return a
};
F.prototype.Ia = function(a, b, c, d, e) {
    if (ea(b))
        for (var f = 0; f < b.length; f++) this.Ia(a, b[f], c, d, e);
    else c = c || this.handleEvent, e = e || this.B || this, c = Hb(c), d = !!d, b = xb(a) ? a.hb(b, c, d, e) : a ? (a = Jb(a)) ? a.hb(b, c, d, e) : null : null, b && (Pb(b), delete this.i[b.key]);
    return this
};
F.prototype.Qa = function() {
    Ua(this.i, function(a, b) {
        this.i.hasOwnProperty(b) && Pb(a)
    }, this);
    this.i = {}
};
F.prototype.l = function() {
    F.g.l.call(this);
    this.Qa()
};
F.prototype.handleEvent = function() {
    throw Error("EventHandler.handleEvent not implemented");
};
var G = function() {
    t.call(this);
    this.U = new E(this);
    this.Ad = this;
    this.Rb = null
};
r(G, t);
G.prototype[wb] = !0;
g = G.prototype;
g.da = function(a) {
    this.Rb = a
};
g.addEventListener = function(a, b, c, d) {
    Gb(this, a, b, c, d)
};
g.removeEventListener = function(a, b, c, d) {
    Ob(this, a, b, c, d)
};
g.dispatchEvent = function(a) {
    ac(this);
    var b, c = this.Rb;
    if (c) {
        b = [];
        for (var d = 1; c; c = c.Rb) b.push(c), v(1E3 > ++d, "infinite loop")
    }
    c = this.Ad;
    d = a.type || a;
    if (n(a)) a = new C(a, c);
    else if (a instanceof C) a.target = a.target || c;
    else {
        var e = a;
        a = new C(d, c);
        Za(a, e)
    }
    var e = !0,
        f;
    if (b)
        for (var h = b.length - 1; !a.Fa && 0 <= h; h--) f = a.currentTarget = b[h], e = bc(f, d, !0, a) && e;
    a.Fa || (f = a.currentTarget = c, e = bc(f, d, !0, a) && e, a.Fa || (e = bc(f, d, !1, a) && e));
    if (b)
        for (h = 0; !a.Fa && h < b.length; h++) f = a.currentTarget = b[h], e = bc(f, d, !1, a) && e;
    return e
};
g.l = function() {
    G.g.l.call(this);
    this.U && this.U.Qa(void 0);
    this.Rb = null
};
g.a = function(a, b, c, d) {
    ac(this);
    return this.U.add(String(a), b, !1, c, d)
};
g.qc = function(a, b, c, d) {
    return this.U.add(String(a), b, !0, c, d)
};
g.Ia = function(a, b, c, d) {
    return this.U.remove(String(a), b, c, d)
};
var bc = function(a, b, c, d) {
    b = a.U.F[String(b)];
    if (!b) return !0;
    b = b.concat();
    for (var e = !0, f = 0; f < b.length; ++f) {
        var h = b[f];
        if (h && !h.Ra && h.Ya == c) {
            var k = h.listener,
                O = h.Fb || h.src;
            h.zb && Cb(a.U, h);
            e = !1 !== k.call(O, d) && e
        }
    }
    return e && 0 != d.jd
};
G.prototype.hb = function(a, b, c, d) {
    return this.U.hb(String(a), b, c, d)
};
G.prototype.hasListener = function(a, b) {
    return this.U.hasListener(m(a) ? String(a) : void 0, b)
};
var ac = function(a) {
    v(a.U, "Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?")
};
var cc = function(a) {
    G.call(this);
    this.K = a;
    this.Tc = !1;
    this.B = new F(this);
    u(this, this.B);
    this.Aa = new Xb([], "audio");
    u(this, this.Aa);
    this.Cc()
};
r(cc, G);
var dc = {
    ie: "flip",
    me: "shuffle",
    oe: "winscreen"
};
cc.prototype.jb = function() {
    this.Tc || (this.Tc = !0, Ua(dc, function(a) {
        var b = this.Aa.load(a);
        b && (b.volume = 0);
        a = this.Aa.play(a);
        a.pause();
        a.autoplay = !1
    }, this))
};
cc.prototype.Cc = function() {
    this.B.a(this.K, "vwyABC".split(""), function() {
        this.play("flip")
    });
    this.B.a(this.K, ["u", "x"], function() {
        this.play("shuffle")
    })
};
cc.prototype.play = function(a) {
    if (this.K.G.ic && this.Aa.kb()) {
        var b = this.Aa,
            c;
        for (c in b.ga) b.stop(c);
        this.Aa.play(a);
        if (a = this.Aa.load(a)) a.volume = 1
    }
};
var ec = {
        ce: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        10: 10,
        ke: 11,
        Q: 12,
        le: 13
    },
    fc = {
        je: "HEART",
        fe: "DIAMOND",
        ee: "CLUB",
        ne: "SPADE"
    },
    gc = function() {
        G.call(this);
        this.Bb = !1
    };
r(gc, G);
var H = function(a) {
        a.Bb || (a.Bb = !0, hc(a, "a"))
    },
    hc = function(a, b, c) {
        var d = c || a;
        setTimeout(function() {
            a.dispatchEvent(new C(b, d))
        }, 0)
    };
var ic = function(a, b) {
    gc.call(this);
    this.R = a;
    this.S = b;
    this.pa = this.sb = this.eb = this.Gb = this.ka = !1;
    this.s = this.Wa = null
};
r(ic, gc);
ic.prototype.l = function() {
    this.s = this.Wa = null;
    ic.g.l.call(this)
};
var mc = function(a, b) {
        a.R = b.R;
        a.S = b.S;
        jc(a, b.ka);
        var c = b.Gb;
        a.Gb != c && (a.Gb = c, H(a));
        kc(a, b.eb);
        lc(a, b.sb);
        a.pa = b.pa;
        a.Wa = b.Wa;
        H(a);
        c = b.s;
        a.s !== c && (a.s = c, hc(a, "c"))
    },
    kc = function(a, b) {
        a.eb != b && (a.eb = b, H(a))
    },
    lc = function(a, b) {
        a.sb != b && (a.sb = b, H(a))
    },
    jc = function(a, b) {
        a.ka != b && (a.ka = b, H(a), hc(a, "b"))
    },
    nc = function(a) {
        return "SPADE" == a.S || "CLUB" == a.S ? "BLACK" : "RED"
    };
var oc = function(a) {
    return Math.floor(Math.random() * a)
};
var I = function(a, b) {
    this.x = m(a) ? a : 0;
    this.y = m(b) ? b : 0
};
I.prototype.clone = function() {
    return new I(this.x, this.y)
};
I.prototype.toString = function() {
    return "(" + this.x + ", " + this.y + ")"
};
I.prototype.floor = function() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    return this
};
I.prototype.round = function() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this
};
var pc = function(a, b, c, d) {
    this.top = a;
    this.right = b;
    this.bottom = c;
    this.left = d
};
g = pc.prototype;
g.Da = function() {
    return this.right - this.left
};
g.fb = function() {
    return this.bottom - this.top
};
g.clone = function() {
    return new pc(this.top, this.right, this.bottom, this.left)
};
g.toString = function() {
    return "(" + this.top + "t, " + this.right + "r, " + this.bottom + "b, " + this.left + "l)"
};
g.contains = function(a) {
    return this && a ? a instanceof pc ? a.left >= this.left && a.right <= this.right && a.top >= this.top && a.bottom <= this.bottom : a.x >= this.left && a.x <= this.right && a.y >= this.top && a.y <= this.bottom : !1
};
g.floor = function() {
    this.top = Math.floor(this.top);
    this.right = Math.floor(this.right);
    this.bottom = Math.floor(this.bottom);
    this.left = Math.floor(this.left);
    return this
};
g.round = function() {
    this.top = Math.round(this.top);
    this.right = Math.round(this.right);
    this.bottom = Math.round(this.bottom);
    this.left = Math.round(this.left);
    return this
};
var qc = function(a, b) {
    this.width = a;
    this.height = b
};
qc.prototype.clone = function() {
    return new qc(this.width, this.height)
};
qc.prototype.toString = function() {
    return "(" + this.width + " x " + this.height + ")"
};
qc.prototype.floor = function() {
    this.width = Math.floor(this.width);
    this.height = Math.floor(this.height);
    return this
};
qc.prototype.round = function() {
    this.width = Math.round(this.width);
    this.height = Math.round(this.height);
    return this
};
var J = function(a, b, c, d) {
    this.left = a;
    this.top = b;
    this.width = c;
    this.height = d
};
g = J.prototype;
g.clone = function() {
    return new J(this.left, this.top, this.width, this.height)
};
g.toString = function() {
    return "(" + this.left + ", " + this.top + " - " + this.width + "w x " + this.height + "h)"
};
g.contains = function(a) {
    return a instanceof I ? a.x >= this.left && a.x <= this.left + this.width && a.y >= this.top && a.y <= this.top + this.height : this.left <= a.left && this.left + this.width >= a.left + a.width && this.top <= a.top && this.top + this.height >= a.top + a.height
};
g.lc = function() {
    return new qc(this.width, this.height)
};
g.floor = function() {
    this.left = Math.floor(this.left);
    this.top = Math.floor(this.top);
    this.width = Math.floor(this.width);
    this.height = Math.floor(this.height);
    return this
};
g.round = function() {
    this.left = Math.round(this.left);
    this.top = Math.round(this.top);
    this.width = Math.round(this.width);
    this.height = Math.round(this.height);
    return this
};
var rc = !y || 9 <= Number(qb);
!z && !y || y && 9 <= Number(qb) || z && B("1.9.1");
y && B("9");
var uc = function(a) {
        return a ? new sc(tc(a)) : ma || (ma = new sc)
    },
    vc = function(a, b) {
        return n(b) ? a.getElementById(b) : b
    },
    wc = function(a, b, c) {
        var d = document;
        c = c || d;
        var e = a && "*" != a ? a.toUpperCase() : "";
        if (c.querySelectorAll && c.querySelector && (e || b)) return c.querySelectorAll(e + (b ? "." + b : ""));
        if (b && c.getElementsByClassName) {
            a = c.getElementsByClassName(b);
            if (e) {
                c = {};
                for (var f = d = 0, h; h = a[f]; f++) e == h.nodeName && (c[d++] = h);
                c.length = d;
                return c
            }
            return a
        }
        a = c.getElementsByTagName(e || "*");
        if (b) {
            c = {};
            for (f = d = 0; h = a[f]; f++) {
                var e =
                    h.className,
                    k;
                if (k = "function" == typeof e.split) k = 0 <= Ia(e.split(/\s+/), b);
                k && (c[d++] = h)
            }
            c.length = d;
            return c
        }
        return a
    },
    yc = function(a, b) {
        Ua(b, function(b, d) {
            "style" == d ? a.style.cssText = b : "class" == d ? a.className = b : "for" == d ? a.htmlFor = b : xc.hasOwnProperty(d) ? a.setAttribute(xc[d], b) : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0) ? a.setAttribute(d, b) : a[d] = b
        })
    },
    xc = {
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        colspan: "colSpan",
        frameborder: "frameBorder",
        height: "height",
        maxlength: "maxLength",
        nonce: "nonce",
        role: "role",
        rowspan: "rowSpan",
        type: "type",
        usemap: "useMap",
        valign: "vAlign",
        width: "width"
    },
    zc = function(a) {
        var b = a.scrollingElement ? a.scrollingElement : A || "CSS1Compat" != a.compatMode ? a.body || a.documentElement : a.documentElement;
        a = a.parentWindow || a.defaultView;
        return y && B("10") && a.pageYOffset != b.scrollTop ? new I(b.scrollLeft, b.scrollTop) : new I(a.pageXOffset || b.scrollLeft, a.pageYOffset || b.scrollTop)
    },
    Bc = function(a, b, c) {
        function d(c) {
            c && b.appendChild(n(c) ? a.createTextNode(c) : c)
        }
        for (var e = 2; e < c.length; e++) {
            var f =
                c[e];
            !fa(f) || ga(f) && 0 < f.nodeType ? d(f) : w(Ac(f) ? Qa(f) : f, d)
        }
    },
    Cc = function(a) {
        a && a.parentNode && a.parentNode.removeChild(a)
    },
    tc = function(a) {
        v(a, "Node cannot be null or undefined.");
        return 9 == a.nodeType ? a : a.ownerDocument || a.document
    },
    Ac = function(a) {
        if (a && "number" == typeof a.length) {
            if (ga(a)) return "function" == typeof a.item || "string" == typeof a.item;
            if ("function" == da(a)) return "function" == typeof a.item
        }
        return !1
    },
    sc = function(a) {
        this.D = a || l.document || document
    };
g = sc.prototype;
g.b = function(a) {
    return vc(this.D, a)
};
g.getElementsByTagName = function(a, b) {
    return (b || this.D).getElementsByTagName(a)
};
g.kc = function(a, b) {
    var c = b || this.D,
        d = c || document;
    return (d.getElementsByClassName ? d.getElementsByClassName(a)[0] : d.querySelectorAll && d.querySelector ? d.querySelector("." + a) : wc("*", a, c)[0]) || null
};
g.w = function(a, b, c) {
    var d = this.D,
        e = arguments,
        f = String(e[0]),
        h = e[1];
    if (!rc && h && (h.name || h.type)) {
        f = ["<", f];
        h.name && f.push(' name="', wa(h.name), '"');
        if (h.type) {
            f.push(' type="', wa(h.type), '"');
            var k = {};
            Za(k, h);
            delete k.type;
            h = k
        }
        f.push(">");
        f = f.join("")
    }
    f = d.createElement(f);
    h && (n(h) ? f.className = h : ea(h) ? f.className = h.join(" ") : yc(f, h));
    2 < e.length && Bc(d, f, e);
    return f
};
g.createElement = function(a) {
    return this.D.createElement(String(a))
};
g.createTextNode = function(a) {
    return this.D.createTextNode(String(a))
};
g.appendChild = function(a, b) {
    a.appendChild(b)
};
var Dc = function(a, b) {
    a.insertBefore(b, a.childNodes[0] || null)
};
sc.prototype.contains = function(a, b) {
    if (!a || !b) return !1;
    if (a.contains && 1 == b.nodeType) return a == b || a.contains(b);
    if ("undefined" != typeof a.compareDocumentPosition) return a == b || !!(a.compareDocumentPosition(b) & 16);
    for (; b && a != b;) b = b.parentNode;
    return b == a
};
var Ec = function(a, b) {
    v(null != a, "goog.dom.setTextContent expects a non-null value for node");
    if ("textContent" in a) a.textContent = b;
    else if (3 == a.nodeType) a.data = b;
    else if (a.firstChild && 3 == a.firstChild.nodeType) {
        for (; a.lastChild != a.firstChild;) a.removeChild(a.lastChild);
        a.firstChild.data = b
    } else {
        for (var c; c = a.firstChild;) a.removeChild(c);
        c = tc(a);
        a.appendChild(c.createTextNode(String(b)))
    }
};
var Gc = function(a, b, c) {
        if (n(b))(b = Fc(a, b)) && (a.style[b] = c);
        else
            for (var d in b) {
                c = a;
                var e = b[d],
                    f = Fc(c, d);
                f && (c.style[f] = e)
            }
    },
    Hc = {},
    Fc = function(a, b) {
        var c = Hc[b];
        if (!c) {
            var d = Aa(b),
                c = d;
            void 0 === a.style[d] && (d = (A ? "Webkit" : z ? "Moz" : y ? "ms" : eb ? "O" : null) + Ba(d), void 0 !== a.style[d] && (c = d));
            Hc[b] = c
        }
        return c
    },
    Ic = function(a, b) {
        var c = tc(a);
        return c.defaultView && c.defaultView.getComputedStyle && (c = c.defaultView.getComputedStyle(a, null)) ? c[b] || c.getPropertyValue(b) || "" : ""
    },
    Jc = function(a, b) {
        return Ic(a, b) || (a.currentStyle ?
            a.currentStyle[b] : null) || a.style && a.style[b]
    },
    Lc = function(a, b, c) {
        var d;
        b instanceof I ? (d = b.x, b = b.y) : (d = b, b = c);
        a.style.left = Kc(d, !1);
        a.style.top = Kc(b, !1)
    },
    Mc = function(a, b, c) {
        if (b instanceof qc) c = b.height, b = b.width;
        else if (void 0 == c) throw Error("missing height argument");
        a.style.width = Kc(b, !0);
        a.style.height = Kc(c, !0)
    },
    Kc = function(a, b) {
        "number" == typeof a && (a = (b ? Math.round(a) : a) + "px");
        return a
    },
    K = function(a, b) {
        a.style.display = b ? "" : "none"
    },
    Nc = {
        thin: 2,
        medium: 4,
        thick: 6
    },
    Oc = function(a, b) {
        if ("none" == (a.currentStyle ?
                a.currentStyle[b + "Style"] : null)) return 0;
        var c = a.currentStyle ? a.currentStyle[b + "Width"] : null,
            d;
        if (c in Nc) d = Nc[c];
        else if (/^\d+px?$/.test(c)) d = parseInt(c, 10);
        else {
            d = a.style.left;
            var e = a.runtimeStyle.left;
            a.runtimeStyle.left = a.currentStyle.left;
            a.style.left = c;
            c = a.style.pixelLeft;
            a.style.left = d;
            a.runtimeStyle.left = e;
            d = c
        }
        return d
    },
    Pc = function(a) {
        if (y && !(9 <= Number(qb))) {
            var b = Oc(a, "borderLeft"),
                c = Oc(a, "borderRight"),
                d = Oc(a, "borderTop");
            a = Oc(a, "borderBottom");
            return new pc(d, c, a, b)
        }
        b = Ic(a, "borderLeftWidth");
        c = Ic(a, "borderRightWidth");
        d = Ic(a, "borderTopWidth");
        a = Ic(a, "borderBottomWidth");
        return new pc(parseFloat(d), parseFloat(c), parseFloat(a), parseFloat(b))
    };
var Qc = function() {};
ca(Qc);
Qc.prototype.Jd = 0;
var L = function(a) {
    G.call(this);
    this.c = a || uc();
    this.Ac = Rc;
    this.Ib = null;
    this.I = !1;
    this.h = null;
    this.ta = void 0;
    this.X = this.H = this.aa = null;
    this.vd = !1
};
r(L, G);
L.prototype.Fd = Qc.la();
var Rc = null,
    Sc = function(a) {
        return a.Ib || (a.Ib = ":" + (a.Fd.Jd++).toString(36))
    };
L.prototype.b = function() {
    return this.h
};
L.prototype.kc = function(a) {
    return this.h ? this.c.kc(a, this.h) : null
};
L.prototype.j = function() {
    this.ta || (this.ta = new F(this));
    return this.ta
};
var Tc = function(a, b) {
    if (a == b) throw Error("Unable to set parent component");
    var c;
    if (c = b && a.aa && a.Ib) {
        c = a.aa;
        var d = a.Ib;
        c = c.X && d ? Xa(c.X, d) || null : null
    }
    if (c && a.aa != b) throw Error("Unable to set parent component");
    a.aa = b;
    L.g.da.call(a, b)
};
L.prototype.getParent = function() {
    return this.aa
};
L.prototype.da = function(a) {
    if (this.aa && this.aa != a) throw Error("Method not supported");
    L.g.da.call(this, a)
};
L.prototype.w = function() {
    this.h = this.c.createElement("DIV")
};
var Uc = function(a, b, c) {
        if (a.I) throw Error("Component already rendered");
        a.h || a.w();
        b ? b.insertBefore(a.h, c || null) : a.c.D.body.appendChild(a.h);
        a.aa && !a.aa.I || a.A()
    },
    Vc = function(a, b) {
        if (a.I) throw Error("Component already rendered");
        if (b) {
            a.vd = !0;
            var c = tc(b);
            a.c && a.c.D == c || (a.c = uc(b));
            a.v(b);
            a.A()
        } else throw Error("Invalid element to decorate");
    };
L.prototype.v = function(a) {
    this.h = a
};
L.prototype.A = function() {
    this.I = !0;
    Wc(this, function(a) {
        !a.I && a.b() && a.A()
    })
};
var Xc = function(a) {
    Wc(a, function(a) {
        a.I && Xc(a)
    });
    a.ta && a.ta.Qa();
    a.I = !1
};
L.prototype.l = function() {
    this.I && Xc(this);
    this.ta && (this.ta.Ka(), delete this.ta);
    Wc(this, function(a) {
        a.Ka()
    });
    !this.vd && this.h && Cc(this.h);
    this.aa = this.h = this.X = this.H = null;
    L.g.l.call(this)
};
var M = function(a, b, c) {
        var d = a.H ? a.H.length : 0;
        v(!!b, "Provided element must not be null.");
        if (b.I && (c || !a.I)) throw Error("Component already rendered");
        if (0 > d || d > (a.H ? a.H.length : 0)) throw Error("Child component index out of bounds");
        a.X && a.H || (a.X = {}, a.H = []);
        if (b.getParent() == a) {
            var e = Sc(b);
            a.X[e] = b;
            Oa(a.H, b)
        } else {
            var e = a.X,
                f = Sc(b);
            if (null !== e && f in e) throw Error('The object already contains the key "' + f + '"');
            e[f] = b
        }
        Tc(b, a);
        Sa(a.H, d, 0, b);
        b.I && a.I && b.getParent() == a ? (a = a.h, d = a.childNodes[d] || null, d != b.b() &&
            a.insertBefore(b.b(), d)) : c ? (a.h || a.w(), d = a.H ? a.H[d + 1] || null : null, Uc(b, a.h, d ? d.h : null)) : a.I && !b.I && b.h && b.h.parentNode && 1 == b.h.parentNode.nodeType && b.A()
    },
    Wc = function(a, b) {
        a.H && w(a.H, b, void 0)
    };
L.prototype.removeChild = function(a, b) {
    if (a) {
        var c = n(a) ? a : Sc(a);
        a = this.X && c ? Xa(this.X, c) || null : null;
        if (c && a) {
            var d = this.X;
            c in d && delete d[c];
            Oa(this.H, a);
            b && (Xc(a), a.h && Cc(a.h));
            Tc(a, null)
        }
    }
    if (!a) throw Error("Child is not in parent component");
    return a
};
var N = function(a, b, c) {
    G.call(this);
    this.target = a;
    this.handle = b || a;
    this.Mb = c || new J(NaN, NaN, NaN, NaN);
    this.D = tc(a);
    this.Z = new F(this);
    u(this, this.Z);
    this.deltaY = this.deltaX = this.sd = this.rd = this.screenY = this.screenX = this.clientY = this.clientX = 0;
    this.sa = !0;
    this.ra = !1;
    this.dd = !0;
    this.Qc = 0;
    this.Ec = this.Gd = !1;
    Gb(this.handle, ["touchstart", "mousedown"], this.$b, !1, this)
};
r(N, G);
var Yc = l.document && l.document.documentElement && !!l.document.documentElement.setCapture,
    Zc = {
        he: "earlycancel",
        yd: "start",
        de: "beforedrag",
        ge: "drag",
        xd: "end"
    };
N.prototype.j = function() {
    return this.Z
};
N.prototype.l = function() {
    N.g.l.call(this);
    Ob(this.handle, ["touchstart", "mousedown"], this.$b, !1, this);
    this.Z.Qa();
    Yc && this.D.releaseCapture();
    this.handle = this.target = null
};
var $c = function(a) {
    m(a.Ac) || (a.Ac = "rtl" == Jc(a.target, "direction"));
    return a.Ac
};
N.prototype.$b = function(a) {
    var b = "mousedown" == a.type;
    if (!this.sa || this.ra || b && (!(rb ? 0 == a.ja.button : "click" == a.type || a.ja.button & vb[0]) || A && gb && a.ctrlKey)) this.dispatchEvent("earlycancel");
    else {
        if (0 == this.Qc)
            if (this.dispatchEvent(new ad("start", this, a.clientX, a.clientY))) this.ra = !0, this.dd && b && a.preventDefault();
            else return;
        else this.dd && b && a.preventDefault();
        var b = this.D,
            c = b.documentElement,
            d = !Yc;
        this.Z.a(b, ["touchmove", "mousemove"], this.Ed, d);
        this.Z.a(b, ["touchend", "mouseup"], this.Ba, d);
        Yc ? (c.setCapture(!1),
            this.Z.a(c, "losecapture", this.Ba)) : this.Z.a(b ? b.parentWindow || b.defaultView : window, "blur", this.Ba);
        y && this.Gd && this.Z.a(b, "dragstart", ub);
        this.Zd && this.Z.a(this.Zd, "scroll", this.Td, d);
        this.clientX = this.rd = a.clientX;
        this.clientY = this.sd = a.clientY;
        this.screenX = a.screenX;
        this.screenY = a.screenY;
        this.Lc();
        this.zc = zc(uc(this.D).D)
    }
};
N.prototype.Ba = function(a, b) {
    this.Z.Qa();
    Yc && this.D.releaseCapture();
    this.ra ? (this.ra = !1, this.dispatchEvent(new ad("end", this, a.clientX, a.clientY, 0, bd(this, this.deltaX), cd(this, this.deltaY), b || "touchcancel" == a.type))) : this.dispatchEvent("earlycancel")
};
N.prototype.Ed = function(a) {
    if (this.sa) {
        var b = (this.Ec && $c(this) ? -1 : 1) * (a.clientX - this.clientX),
            c = a.clientY - this.clientY;
        this.clientX = a.clientX;
        this.clientY = a.clientY;
        this.screenX = a.screenX;
        this.screenY = a.screenY;
        if (!this.ra) {
            var d = this.rd - this.clientX,
                e = this.sd - this.clientY;
            if (d * d + e * e > this.Qc)
                if (this.dispatchEvent(new ad("start", this, a.clientX, a.clientY))) this.ra = !0;
                else {
                    this.La || this.Ba(a);
                    return
                }
        }
        c = dd(this, b, c);
        b = c.x;
        c = c.y;
        this.ra && this.dispatchEvent(new ad("beforedrag", this, a.clientX, a.clientY,
            0, b, c)) && (ed(this, a, b, c), a.preventDefault())
    }
};
var dd = function(a, b, c) {
    var d = zc(uc(a.D).D);
    b += d.x - a.zc.x;
    c += d.y - a.zc.y;
    a.zc = d;
    a.deltaX += b;
    a.deltaY += c;
    return new I(bd(a, a.deltaX), cd(a, a.deltaY))
};
N.prototype.Td = function(a) {
    var b = dd(this, 0, 0);
    a.clientX = this.clientX;
    a.clientY = this.clientY;
    ed(this, a, b.x, b.y)
};
var ed = function(a, b, c, d) {
        a.Mc(c, d);
        a.dispatchEvent(new ad("drag", a, b.clientX, b.clientY, 0, c, d))
    },
    bd = function(a, b) {
        var c = a.Mb,
            d = isNaN(c.left) ? null : c.left,
            c = isNaN(c.width) ? 0 : c.width;
        return Math.min(null != d ? d + c : Infinity, Math.max(null != d ? d : -Infinity, b))
    },
    cd = function(a, b) {
        var c = a.Mb,
            d = isNaN(c.top) ? null : c.top,
            c = isNaN(c.height) ? 0 : c.height;
        return Math.min(null != d ? d + c : Infinity, Math.max(null != d ? d : -Infinity, b))
    };
N.prototype.Lc = function() {
    var a;
    if (this.Ec) {
        a = this.target;
        var b = a.offsetLeft,
            c = a.offsetParent;
        c || "fixed" != Jc(a, "position") || (c = tc(a).documentElement);
        if (c) {
            if (z) var d = Pc(c),
                b = b + d.left;
            else 8 <= Number(qb) && !(9 <= Number(qb)) && (d = Pc(c), b -= d.left);
            a = "rtl" == Jc(c, "direction") ? c.clientWidth - (b + a.offsetWidth) : b
        } else a = b
    } else a = this.target.offsetLeft;
    this.deltaX = a;
    this.deltaY = this.target.offsetTop
};
N.prototype.Mc = function(a, b) {
    this.Ec && $c(this) ? this.target.style.right = a + "px" : this.target.style.left = a + "px";
    this.target.style.top = b + "px"
};
var ad = function(a, b, c, d, e, f, h, k) {
    C.call(this, a);
    this.clientX = c;
    this.clientY = d;
    this.left = m(f) ? f : b.deltaX;
    this.top = m(h) ? h : b.deltaY;
    this.Cb = b;
    this.Dd = !!k
};
r(ad, C);
var fd = "StopIteration" in l ? l.StopIteration : {
        message: "StopIteration",
        stack: ""
    },
    gd = function() {};
gd.prototype.next = function() {
    throw fd;
};
gd.prototype.zd = function() {
    return this
};
var hd = function(a, b) {
    this.W = {};
    this.i = [];
    this.vb = this.o = 0;
    var c = arguments.length;
    if (1 < c) {
        if (c % 2) throw Error("Uneven number of arguments");
        for (var d = 0; d < c; d += 2) this.set(arguments[d], arguments[d + 1])
    } else a && this.addAll(a)
};
g = hd.prototype;
g.Na = function() {
    id(this);
    for (var a = [], b = 0; b < this.i.length; b++) a.push(this.W[this.i[b]]);
    return a
};
g.gb = function() {
    id(this);
    return this.i.concat()
};
g.ab = function(a) {
    return jd(this.W, a)
};
g.clear = function() {
    this.W = {};
    this.vb = this.o = this.i.length = 0
};
g.remove = function(a) {
    return jd(this.W, a) ? (delete this.W[a], this.o--, this.vb++, this.i.length > 2 * this.o && id(this), !0) : !1
};
var id = function(a) {
    if (a.o != a.i.length) {
        for (var b = 0, c = 0; b < a.i.length;) {
            var d = a.i[b];
            jd(a.W, d) && (a.i[c++] = d);
            b++
        }
        a.i.length = c
    }
    if (a.o != a.i.length) {
        for (var e = {}, c = b = 0; b < a.i.length;) d = a.i[b], jd(e, d) || (a.i[c++] = d, e[d] = 1), b++;
        a.i.length = c
    }
};
g = hd.prototype;
g.get = function(a, b) {
    return jd(this.W, a) ? this.W[a] : b
};
g.set = function(a, b) {
    jd(this.W, a) || (this.o++, this.i.push(a), this.vb++);
    this.W[a] = b
};
g.addAll = function(a) {
    var b;
    if (a instanceof hd) b = a.gb(), a = a.Na();
    else {
        b = [];
        var c = 0,
            d;
        for (d in a) b[c++] = d;
        a = Wa(a)
    }
    for (c = 0; c < b.length; c++) this.set(b[c], a[c])
};
g.forEach = function(a, b) {
    for (var c = this.gb(), d = 0; d < c.length; d++) {
        var e = c[d],
            f = this.get(e);
        a.call(b, f, e, this)
    }
};
g.clone = function() {
    return new hd(this)
};
g.zd = function(a) {
    id(this);
    var b = 0,
        c = this.vb,
        d = this,
        e = new gd;
    e.next = function() {
        if (c != d.vb) throw Error("The map has changed since the iterator was created");
        if (b >= d.i.length) throw fd;
        var e = d.i[b++];
        return a ? e : d.W[e]
    };
    return e
};
var jd = function(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b)
};
var kd = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/,
    ld = function(a, b) {
        if (a)
            for (var c = a.split("&"), d = 0; d < c.length; d++) {
                var e = c[d].indexOf("="),
                    f, h = null;
                0 <= e ? (f = c[d].substring(0, e), h = c[d].substring(e + 1)) : f = c[d];
                b(f, h ? decodeURIComponent(h.replace(/\+/g, " ")) : "")
            }
    };
var md = function(a, b) {
    this.cb = this.bc = this.Sa = "";
    this.Tb = null;
    this.Eb = this.Sb = "";
    this.P = this.Id = !1;
    var c;
    if (a instanceof md) this.P = m(b) ? b : a.P, nd(this, a.Sa), c = a.bc, P(this), this.bc = c, c = a.cb, P(this), this.cb = c, od(this, a.Tb), c = a.Sb, P(this), this.Sb = c, pd(this, a.Ga.clone()), c = a.Eb, P(this), this.Eb = c;
    else if (a && (c = String(a).match(kd))) {
        this.P = !!b;
        nd(this, c[1] || "", !0);
        var d = c[2] || "";
        P(this);
        this.bc = qd(d);
        d = c[3] || "";
        P(this);
        this.cb = qd(d, !0);
        od(this, c[4]);
        d = c[5] || "";
        P(this);
        this.Sb = qd(d, !0);
        pd(this, c[6] || "", !0);
        c = c[7] || "";
        P(this);
        this.Eb = qd(c)
    } else this.P = !!b, this.Ga = new rd(null, 0, this.P)
};
md.prototype.toString = function() {
    var a = [],
        b = this.Sa;
    b && a.push(sd(b, td, !0), ":");
    var c = this.cb;
    if (c || "file" == b) a.push("//"), (b = this.bc) && a.push(sd(b, td, !0), "@"), a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")), c = this.Tb, null != c && a.push(":", String(c));
    if (c = this.Sb) this.cb && "/" != c.charAt(0) && a.push("/"), a.push(sd(c, "/" == c.charAt(0) ? ud : vd, !0));
    (c = this.Ga.toString()) && a.push("?", c);
    (c = this.Eb) && a.push("#", sd(c, wd));
    return a.join("")
};
md.prototype.clone = function() {
    return new md(this)
};
var nd = function(a, b, c) {
        P(a);
        a.Sa = c ? qd(b, !0) : b;
        a.Sa && (a.Sa = a.Sa.replace(/:$/, ""))
    },
    od = function(a, b) {
        P(a);
        if (b) {
            b = Number(b);
            if (isNaN(b) || 0 > b) throw Error("Bad port number " + b);
            a.Tb = b
        } else a.Tb = null
    },
    pd = function(a, b, c) {
        P(a);
        b instanceof rd ? (a.Ga = b, a.Ga.Bc(a.P)) : (c || (b = sd(b, xd)), a.Ga = new rd(b, 0, a.P))
    },
    P = function(a) {
        if (a.Id) throw Error("Tried to modify a read-only Uri");
    };
md.prototype.Bc = function(a) {
    this.P = a;
    this.Ga && this.Ga.Bc(a);
    return this
};
var qd = function(a, b) {
        return a ? b ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a) : ""
    },
    sd = function(a, b, c) {
        return n(a) ? (a = encodeURI(a).replace(b, yd), c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), a) : null
    },
    yd = function(a) {
        a = a.charCodeAt(0);
        return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
    },
    td = /[#\/\?@]/g,
    vd = /[\#\?:]/g,
    ud = /[\#\?]/g,
    xd = /[\#\?@]/g,
    wd = /#/g,
    rd = function(a, b, c) {
        this.o = this.m = null;
        this.J = a || null;
        this.P = !!c
    },
    zd = function(a) {
        a.m || (a.m = new hd, a.o = 0, a.J && ld(a.J, function(b, c) {
            a.add(decodeURIComponent(b.replace(/\+/g,
                " ")), c)
        }))
    };
g = rd.prototype;
g.add = function(a, b) {
    zd(this);
    this.J = null;
    a = Ad(this, a);
    var c = this.m.get(a);
    c || this.m.set(a, c = []);
    c.push(b);
    this.o = Ea(this.o) + 1;
    return this
};
g.remove = function(a) {
    zd(this);
    a = Ad(this, a);
    return this.m.ab(a) ? (this.J = null, this.o = Ea(this.o) - this.m.get(a).length, this.m.remove(a)) : !1
};
g.clear = function() {
    this.m = this.J = null;
    this.o = 0
};
g.ab = function(a) {
    zd(this);
    a = Ad(this, a);
    return this.m.ab(a)
};
g.gb = function() {
    zd(this);
    for (var a = this.m.Na(), b = this.m.gb(), c = [], d = 0; d < b.length; d++)
        for (var e = a[d], f = 0; f < e.length; f++) c.push(b[d]);
    return c
};
g.Na = function(a) {
    zd(this);
    var b = [];
    if (n(a)) this.ab(a) && (b = Pa(b, this.m.get(Ad(this, a))));
    else {
        a = this.m.Na();
        for (var c = 0; c < a.length; c++) b = Pa(b, a[c])
    }
    return b
};
g.set = function(a, b) {
    zd(this);
    this.J = null;
    a = Ad(this, a);
    this.ab(a) && (this.o = Ea(this.o) - this.m.get(a).length);
    this.m.set(a, [b]);
    this.o = Ea(this.o) + 1;
    return this
};
g.get = function(a, b) {
    var c = a ? this.Na(a) : [];
    return 0 < c.length ? String(c[0]) : b
};
g.toString = function() {
    if (this.J) return this.J;
    if (!this.m) return "";
    for (var a = [], b = this.m.gb(), c = 0; c < b.length; c++)
        for (var d = b[c], e = encodeURIComponent(String(d)), d = this.Na(d), f = 0; f < d.length; f++) {
            var h = e;
            "" !== d[f] && (h += "=" + encodeURIComponent(String(d[f])));
            a.push(h)
        }
    return this.J = a.join("&")
};
g.clone = function() {
    var a = new rd;
    a.J = this.J;
    this.m && (a.m = this.m.clone(), a.o = this.o);
    return a
};
var Ad = function(a, b) {
    var c = String(b);
    a.P && (c = c.toLowerCase());
    return c
};
rd.prototype.Bc = function(a) {
    a && !this.P && (zd(this), this.J = null, this.m.forEach(function(a, c) {
        var d = c.toLowerCase();
        c != d && (this.remove(c), this.remove(d), 0 < a.length && (this.J = null, this.m.set(Ad(this, d), Qa(a)), this.o = Ea(this.o) + a.length))
    }, this));
    this.P = a
};
var Cd = function(a) {
    G.call(this);
    this.h = a;
    Gb(a, Bd, this.Oc, !1, this);
    Gb(a, "click", this.Nc, !1, this)
};
r(Cd, G);
var Bd = z ? "keypress" : "keydown";
Cd.prototype.Oc = function(a) {
    (13 == a.keyCode || A && 3 == a.keyCode) && Dd(this, a)
};
Cd.prototype.Nc = function(a) {
    Dd(this, a)
};
var Dd = function(a, b) {
    var c = new Ed(b);
    if (a.dispatchEvent(c)) {
        c = new Hd(b);
        try {
            a.dispatchEvent(c)
        } finally {
            b.stopPropagation()
        }
    }
};
Cd.prototype.l = function() {
    Cd.g.l.call(this);
    Ob(this.h, Bd, this.Oc, !1, this);
    Ob(this.h, "click", this.Nc, !1, this);
    delete this.h
};
var Hd = function(a) {
    D.call(this, a.ja);
    this.type = "action"
};
r(Hd, D);
var Ed = function(a) {
    D.call(this, a.ja);
    this.type = "beforeaction"
};
r(Ed, D);
var Id = function(a) {
        if (a.classList) return a.classList;
        a = a.className;
        return n(a) && a.match(/\S+/g) || []
    },
    Jd = function(a, b) {
        var c;
        a.classList ? c = a.classList.contains(b) : (c = Id(a), c = 0 <= Ia(c, b));
        return c
    },
    Kd = function(a, b) {
        a.classList ? a.classList.add(b) : Jd(a, b) || (a.className += 0 < a.className.length ? " " + b : b)
    },
    Ld = function(a, b) {
        a.classList ? a.classList.remove(b) : Jd(a, b) && (a.className = Ja(Id(a), function(a) {
            return a != b
        }).join(" "))
    },
    Md = function(a, b) {
        b ? Kd(a, "disabled") : Ld(a, "disabled")
    };
var Pd = function(a) {
        var b = new Image,
            c = Nd,
            d = "";
        b.onerror = b.onload = b.onabort = function() {
            delete Od[c]
        };
        Od[c] = b; - 1 != a.search("&ei=") || (d = "&ei=");
        a = "/gen_204?atyp=i&ct=doodle&cad=" + a + d + "&zx=" + q();
        /^http:/i.test(a) && "https:" == window.location.protocol ? delete Od[c] : (b.src = a, Nd = c + 1)
    },
    Od = [],
    Nd = 0;
var Qd, Rd = navigator.userAgent,
    Sd = -1 != Rd.indexOf("iPad") || -1 != Rd.indexOf("iPhone") || -1 != Rd.indexOf("iPod") || -1 != Rd.indexOf("Android") || -1 != Rd.indexOf("Mobile") || -1 != Rd.indexOf("Silk"),
    Td = 0 <= Rd.indexOf("MSIE"),
    Ud = Td && 0 <= Rd.indexOf("MSIE 8."),
    Vd = function(a, b) {
        for (var c = 1; c < arguments.length; c += 2) {
            var d = arguments[c],
                e = arguments[c + 1],
                f = a.style;
            f && d in f ? f[d] = e : d in a ? a[d] = e : Td && f && "opacity" == d && (a.zoom = 1, d = (f.filter || "").replace(/alpha\([^)]*\)/, ""), isNaN(parseFloat(e)) || (d += "alpha(opacity=" + 100 * e + ")"),
                f.filter = d)
        }
    },
    Wd = function(a) {
        if (window.google && window.google.log) {
            var b;
            Qd || (b = document.getElementById("hplogoved")) && (Qd = b.getAttribute("data-ved"));
            (b = Qd) && (a += "&ved=" + b);
            window.google.log("doodle", a)
        } else Pd(a)
    };
var Xd = function(a, b, c, d, e) {
    F.call(this);
    this.nd = a;
    this.ae = b;
    this.$d = c;
    this.Hd = d;
    e && (this.xb && this.Ia(this.xb, "action", this.Jc), e && (this.xb = new Cd(e), u(this, this.xb), this.Jc = p(this.show, this), this.a(this.xb, "action", this.Jc)))
};
r(Xd, F);
Xd.prototype.show = function() {
    Yd() && !cb() && window.gapi && window.gapi.load ? (window.gapi.load("share", p(this.Pc, this)), Wd("gplus,li")) : (window.open("https://plus.google.com/share?url=" + this.nd), Wd("gplus,lo"))
};
var Yd = function() {
    if (!window.gbar) return !1;
    var a = !!(window.gbar.sos && 0 < window.gbar.sos().length),
        b = !(!window.gbar.so || !window.gbar.so());
    return a || b
};
Xd.prototype.Pc = function() {
    if (window.gapi && window.gapi.share) {
        var a = {
                items: [{
                    type: "http://schema.org/WebPage",
                    id: location.protocol + "//" + location.host,
                    properties: {
                        url: [this.nd],
                        name: [this.ae],
                        image: [this.Hd]
                    }
                }]
            },
            b = window.location.toString().match(/[?&]authuser=(\d+)/),
            b = b && b[1],
            c = Yd() || !!window.google.doodle.sf;
        window.gapi.share.lightbox(a, {
            isLoggedInForGooglePlus: c,
            onLoginPopupBlocked: function() {
                Wd("gplus,popupblocked")
            },
            onLoginStateChanged: p(function() {
                aa("google.doodle.sf", !0);
                this.Pc()
            }, this),
            editorText: this.$d,
            sessionIndex: b || "",
            sourceForLogging: "doodle"
        })
    }
};
var Zd = function(a) {
    return 0 == a.indexOf("//") ? "https:" + a : a
};
var ae = function() {
        return !$d() && (x("iPod") || x("iPhone") || x("Android") || x("IEMobile"))
    },
    $d = function() {
        return x("iPad") || x("Android") && !x("Mobile") || x("Silk")
    };
var be = function(a) {
        this.Ic = a;
        this.Db = !1;
        this.cd = []
    },
    ce = function(a) {
        if (!a.Db) {
            a.Db = !0;
            for (var b = 0, c; c = a.cd[b]; b++) c()
        }
    };
be.prototype.Ub = ba;
be.prototype.kb = function() {
    return this.Db
};
var de = function(a) {
    be.call(this, a);
    this.Pa = new Image
};
r(de, be);
de.prototype.Ub = function() {
    if (!this.Pa.src) {
        var a = this;
        this.Pa.onload = function() {
            ce(a)
        };
        this.Pa.src = this.Ic;
        (this.Pa.complete || "complete" == this.Pa.readyState) && ce(this)
    }
};
var ee = function(a, b) {
        this.ib = [];
        this.nc = [];
        for (var c = 0, d; d = b[c]; c++) {
            var e = new de(a + d.filename);
            d = d.size;
            this.ib.push(e);
            this.nc.push(d)
        }
    },
    fe = function(a) {
        return "number" == typeof a ? a : a[0]
    };
g = ee.prototype;
g.Ub = function(a, b) {
    var c = this.ib[fe(a)];
    b && (c.Db ? b() : c.cd.push(b));
    c.Ub()
};
g.kb = function(a) {
    return this.ib[fe(a)].kb()
};
g.Da = function(a) {
    return a[3]
};
g.fb = function(a) {
    return a[4]
};
g.lc = function(a) {
    return {
        width: a[3],
        height: a[4]
    }
};
g.drawImage = function(a, b, c, d, e, f, h, k, O, hb) {
    var Fd = b[1],
        Gd = b[2];
    void 0 != h && (Fd += c, Gd += d);
    b = this.ib[fe(b)];
    if (!b.kb()) throw Error("Spritesheet is not loaded, can't draw.");
    a.drawImage(b.Pa, Fd, Gd, e, f, h, k, O, hb)
};
g.ia = function(a, b, c, d, e, f) {
    var h = this.Da(a),
        k = this.fb(a),
        O = h,
        hb = k;
    void 0 != e && (O *= e, hb *= e);
    f && (c -= O / 2, d -= hb / 2);
    this.drawImage(b, a, 0, 0, h, k, c, d, O, hb)
};
var ge = function(a, b) {
    var c;
    c = document.createElement("div");
    Vd(c, "position", "absolute");
    Td && !Ud && Vd(c, "background-color", "rgba(255,255,255,.01)");
    Vd(c, "userSelect", "none", "MozUserSelect", "none", "webkitUserSelect", "none", "webkitTapHighlightColor", "rgba(0,0,0,0)");
    c.unselectable = "on";
    var d = a.Da(b),
        e = a.fb(b),
        f = b[5] || 1;
    f && 1 != f && a.nc[fe(b)] && (d = Math.floor(d / f), e = Math.floor(e / f));
    Vd(c, "width", d + "px", "height", e + "px");
    d = b[5] || 1;
    e = a.nc[fe(b)];
    f = b[5] || 1;
    c = [c, "url(" + a.ib[fe(b)].Ic + ") " + (-(b[1] / f + 0) + "px " + -(b[2] /
        f + 0) + "px") + " no-repeat", d && 1 != d && e ? e[0] / d + "px " + e[1] / d + "px" : ""];
    d = c[0];
    e = c[2];
    Vd(d, "background", c[1]);
    e && Vd(d, "backgroundSize", e);
    return d
};
var ie = function() {
    ee.call(this, "./", he)
};
r(ie, ee);
var he = [{
        filename: "asset/card-sprite.png",
        size: [1678, 395]
    }],
    je = [0, 0, 0, 172, 236],
    ke = [0, 604, 239, 78, 75],
    le = [0, 1575, 0, 96, 96],
    me = [0, 1575, 99, 96, 96],
    ne = [0, 685, 239, 78, 75],
    oe = [0, 525, 0, 172, 236],
    pe = [0, 1575, 198, 96, 96];
ca(ie);
var qe = [
        [0, 1402, 308, 50, 50],
        [0, 925, 239, 50, 50],
        [0, 766, 292, 50, 50],
        [0, 872, 292, 50, 50],
        [0, 978, 292, 50, 50],
        [0, 1628, 297, 50, 50],
        [0, 1084, 308, 50, 50],
        [0, 1190, 308, 50, 50],
        [0, 1296, 308, 50, 50],
        [0, 819, 239, 50, 50],
        [0, 816, 345, 50, 50],
        [0, 922, 345, 50, 50],
        [0, 869, 345, 50, 50]
    ],
    re = [
        [0, 1349, 308, 50, 50],
        [0, 872, 239, 50, 50],
        [0, 978, 239, 50, 50],
        [0, 819, 292, 50, 50],
        [0, 925, 292, 50, 50],
        [0, 1575, 297, 50, 50],
        [0, 1031, 308, 50, 50],
        [0, 1137, 308, 50, 50],
        [0, 1243, 308, 50, 50],
        [0, 766, 239, 50, 50],
        [0, 1455, 308, 50, 50],
        [0, 604, 317, 50, 50],
        [0, 1508, 308, 50, 50]
    ],
    se = {
        CLUB: [0, 0, 239, 148, 141],
        DIAMOND: [0, 151, 239, 148, 141],
        HEART: [0, 302, 239, 148, 141],
        SPADE: [0, 453, 239, 148, 141]
    },
    te = {
        CLUB: [0, 657, 317, 50, 50],
        DIAMOND: [0, 710, 317, 50, 50],
        HEART: [0, 763, 345, 50, 50],
        SPADE: [0, 975, 345, 50, 50]
    },
    ue = {
        11: [0, 1225, 0, 172, 151],  
        12: [0, 1400, 154, 172, 151],
        13: [0, 1050, 154, 172, 151]
    },
    ve = {
        11: [0, 1050, 0, 172, 151],
        12: [0, 1225, 154, 172, 151],
        13: [0, 1400, 0, 172, 151]
    },
    we = {
        CLUB: [0, 175, 0, 172, 236],
        DIAMOND: [0, 350, 0, 172, 236],
        HEART: [0, 700, 0, 172, 236],
        SPADE: [0, 875, 0, 172, 236]
    },
    xe = function() {
        return ie.la().lc(je)
    },
    ye = function(a, b) {
        Gc(a,
            "zIndex", (parseInt(a.style.zIndex, 10) || 0) % 1E3 + 1E3 * b)
    },
    ze = function(a, b, c) {
        a.j().a(a.b(), b, function(b) {
            b.target = a;
            c && (b.type = c);
            a.dispatchEvent(b)
        })
    },
    Ae = function() {
        return window.matchMedia && window.matchMedia("(orientation: portrait)").matches ? !0 : window.innerHeight > window.innerWidth
    },
    Be = function() {
    	/*
        var a;
        a = Zd("www.google.com/search?q=solitaire");
        var b = new md("http://www.facebook.com/sharer.php"),
            c = new rd;
        c.add("u", a);
        pd(b, c);
        window.open(b.toString());
        Wd("share,2,x")
        */
    },
    Ce = function() {
    	/*
        var a;
        a = Zd("www.google.com/search?q=solitaire");
        window.open("http://twitter.com/intent/tweet?status=" + encodeURIComponent(String("Check out Google's solitaire game!\n" + a)));
        Wd("share,3,x")
        */
    },
    De = function() {
    	/*
        var a;
        a = Zd("www.google.com/search?q=solitaire");
        (new Xd(a, window.google.doodle.alt || "", "Check out Google's solitaire game!", "//www.gstatic.com/lrfactory/solitaire/cta_2x.png")).show()
        */
    },
    Ee = function() {
        return $d() || 589824 < window.innerHeight * window.innerWidth
    },
    Q = Math.round(xe().width * (Ee() ? .33 : .22)),
    R = Math.round(xe().height * (Ee() ? .33 : .22));
xe();
xe();
var Fe = Math.round(.3 * R),
    Ge = Math.round(.3 * R);
var S = function(a, b) {
    N.call(this, a.b());
    this.oa = a;
    this.Y = [a];
    this.ed = "";
    this.xa = 1;
    if (this.mb = b) this.Mb = new J(this.mb.left * this.xa, this.mb.top * this.xa, this.mb.width * this.xa, this.mb.height * this.xa);
    this.Sc = this.Rc = 0;
    this.da(a)
};
r(S, N);
var He = function(a, b) {
    a.Y = Pa(a.oa, b)
};
S.prototype.Lc = function() {
    this.deltaX = this.target.offsetLeft * this.xa;
    this.deltaY = this.target.offsetTop * this.xa;
    this.Rc = this.deltaX;
    this.Sc = this.deltaY
};
S.prototype.Mc = function(a, b) {
    var c = this.oa.b(),
        d = parseFloat(c.style.left),
        e = parseFloat(c.style.top);
    w(this.Y, function(c) {
        c = c.b();
        var h = parseFloat(c.style.top) - e;
        c.style.left = Math.floor(parseFloat(c.style.left) - d + a / this.xa) + "px";
        c.style.top = Math.floor(h + b / this.xa) + "px"
    }, this)
};
S.prototype.$b = function(a) {
    S.g.$b.call(this, a);
    this.ra && w(this.Y, function(a) {
        a = a.b();
        ye(a, 1);
        this.ed = a.style.transition;
        a.style.transition = ""
    }, this)
};
S.prototype.Ba = function(a, b) {
    w(this.Y, function(a) {
        a = a.b();
        ye(a, 0);
        a.style.transition = this.ed
    }, this);
    1 > Math.abs(this.Rc - this.deltaX) + Math.abs(this.Sc - this.deltaY) ? S.g.Ba.call(this, a, !0) : S.g.Ba.call(this, a, b)
};
var Ie = function(a) {
    a.j().qc(a.oa.b(), ["click", "touchend"], function(a) {
        a.stopPropagation()
    }, !0)
};
S.prototype.l = function() {
    this.Y = this.oa = null;
    this.da(null);
    S.g.l.call(this)
};
var Je = function(a) {
    this.ma = a;
    this.bb = a.getContext("2d");
    this.od = ie.la();
    this.O = a.width;
    this.L = a.height
};
Je.prototype.clear = function() {
    this.bb.clearRect(0, 0, this.ma.width, this.ma.height)
};
Je.prototype.ia = function(a, b, c) {
    this.od.ia(a, this.bb, b, c)
};
var T = function(a) {
    L.call(this, a);
    this.wa = null;
    this.O = Q;
    this.L = R;
    this.qa = null;
    this.wd = this.za = this.ya = 0;
    this.ma = null;
    this.jc = !1;
    this.sc = 0;
    this.C = null
};
r(T, L);
T.prototype.w = function() {
    var a = this.c.w("DIV", "card", this.c.w("CANVAS", "card-canvas"));
    this.v(a)
};
T.prototype.v = function(a) {
    this.h = a;
    this.ma = this.c.kc("card-canvas", a);
    this.ma.width = xe().width;
    this.ma.height = xe().height;
    Mc(a, this.O, this.L);
    Lc(a, this.ya, this.za);
    this.wa = new Je(this.ma)
};
T.prototype.A = function() {
    T.g.A.call(this);
    this.b().style.transition = "left 500ms, top 500ms";
    this.qa = new S(this, new J(0, 0, window.innerWidth - Q, window.innerHeight - R));
    this.qa.sa = !1;
    ze(this, "click", "d");
    ze(this, "touchstart", "e");
    ze(this, "touchend", "f")
};
var Ke = function(a, b) {
    a.C && (a.j().Ia(a.C, "a", a.Pb), a.j().Ia(a.C, "b", a.Zc), a.j().Ia(a.C, "c", a.$c));
    a.C = b;
    a.j().a(b, "a", a.Pb);
    a.j().a(b, "b", a.Zc);
    a.j().a(b, "c", a.$c);
    b.Wa = a;
    H(b)
};
g = T.prototype;
g.l = function() {
    this.qa.Ka();
    this.ma = this.qa = null;
    T.g.l.call(this)
};
g.Pb = function() {
    var a = this.C;
    if (a) {
        a.Bb = !1;
        K(this.b(), !0);
        a = this.C;
        this.wa.clear();
        if (a.ka) {
            var b = this.C,
                c = te[b.S],
                d = b.R;
            this.wa.ia("RED" == nc(b) ? qe[d - 1] : re[d - 1], 10, 12);
            this.wa.ia(c, 105, 12);
            11 <= b.R && 13 >= b.R ? (c = b.R, this.wa.ia("RED" == nc(b) ? ue[c] : ve[c], 0, 84)) : this.wa.ia(se[b.S], 15, 93)
        } else this.wa.ia(je, 2, 3);
        a.Gb && (a = this.wa, b = a.od.lc(je), a.bb.lineWidth = 5, a.bb.strokeStyle = "#FFD700", a.bb.strokeRect(2, 3, b.width, b.height));
        this.qa.sa = this.C.pa
    } else K(this.b(), !1)
};
g.Zc = function() {};
g.$c = function() {
    ye(this.b(), 1)
};
g.moveTo = function(a, b, c) {
    if (this.ya != a || this.za != b || this.wd != c || this.jc) {
        this.jc = !1;
        var d = this.b();
        this.ya = a;
        this.za = b;
        this.wd = c;
        Lc(d, a, b);
        Gc(d, "zIndex", c + 1E3 * Math.floor((parseInt(d.style.zIndex, 10) || 0) / 1E3));
        this.qa.sa = !1;
        this.sc && clearTimeout(this.sc);
        this.sc = setTimeout(p(this.Qd, this), 500)
    }
};
g.Qd = function() {
    ye(this.b(), 0);
    this.qa.sa = this.C.pa
};
var U = function() {
    gc.call(this);
    this.f = []
};
r(U, gc);
U.prototype.empty = function() {
    return 0 == this.f.length
};
U.prototype.size = function() {
    return this.f.length
};
var Le = function(a, b) {
    var c = a.f.lastIndexOf(b);
    return 0 > c ? [] : a.f.slice(c + 1)
};
g = U.prototype;
g.top = function(a) {
    a = a || 0;
    return a >= this.f.length ? null : this.f[this.f.length - 1 - a]
};
g.contains = function(a) {
    return 0 <= this.f.indexOf(a)
};
g.clear = function() {
    this.f = [];
    H(this)
};
g.accept = ba;
g.Ja = function() {
    return !1
};
g.push = function(a, b) {
    a instanceof Array || (a = [a]);
    var c = !!b;
    w(a, function(a) {
        c ? this.f.unshift(a) : this.f.push(a)
    }, this);
    this.ba();
    H(this)
};
g.pop = function(a, b) {
    for (var c = a || 1, d = !!b, e = []; c--;) {
        var f;
        f = d ? this.f.shift() : this.f.pop();
        e.push(f)
    }
    this.ba();
    H(this);
    return e
};
g.ba = function() {
    var a = this.f.length;
    w(this.f, function(b, c) {
        b.s !== this && (b.s = this, hc(b, "c"));
        lc(b, c == a - 1)
    }, this)
};
var Me = function() {
        this.Nb = 1;
        this.ic = this.hc = !0;
        this.fd = Math.random();
        this.nb = ""
    },
    Ne = function(a) {
        var b = Math.floor(1E5 * a.fd);
        return function() {
            var a = 1E4 * Math.sin(b++);
            return a - Math.floor(a)
        }
    };
var Oe = function() {
    U.call(this)
};
r(Oe, U);
Oe.prototype.ba = function() {
    Oe.g.ba.call(this);
    var a = this.f.length;
    w(this.f, function(b, c) {
        jc(b, !0);
        kc(b, c >= a - 3);
        b.pa = c == a - 1
    })
};
var Pe = function(a, b) {
    U.call(this);
    this.N = a;
    this.G = b
};
r(Pe, U);
Pe.prototype.ba = function() {
    Pe.g.ba.call(this);
    w(this.f, function(a) {
        jc(a, !1);
        kc(a, !1);
        a.pa = !1
    })
};
var Qe = function(a) {
    if (a.empty()) {
        var b = a.N.pop(a.N.size());
        a.push(b);
        a.dispatchEvent("x")
    } else b = a.G.Nb, a.size() < b && (b = a.size()), b = a.pop(b), a.N.push(b), a.dispatchEvent("v")
};
Pe.prototype.l = function() {
    this.G = this.N = null;
    Pe.g.l.call(this)
};
var Re = function(a) {
    G.call(this);
    this.Y = [];
    this.B = new F(this);
    this.K = a;
    this.B.a(this.K, Zc.xd, this.Md)
};
r(Re, G);
Re.prototype.Md = function(a) {
    if (!a.Dd && !a.defaultPrevented) {
        a.preventDefault();
        a.stopPropagation();
        var b = a.Cb;
        Ie(b);
        Ma(this.Y, function(c) {
            var d;
            if (d = c.hasListener("h")) {
                d = Se(b.target);
                var e = Se(c.b());
                d = Math.min(d.left + d.width, e.left + e.width) >= Math.max(d.left, e.left) && Math.min(d.top + d.height, e.top + e.height) >= Math.max(d.top, e.top)
            }
            return d ? c.dispatchEvent(new C("h", a.Cb)) : !1
        }, this) || this.dispatchEvent(new C("i", a.Cb))
    }
};
var Se = function(a) {
    return new J(parseFloat(a.style.left), parseFloat(a.style.top), parseFloat(a.style.width), parseFloat(a.style.height))
};
var V = function(a) {
    U.call(this);
    this.S = a
};
r(V, U);
V.prototype.ba = function() {
    V.g.ba.call(this);
    var a = this.f.length;
    w(this.f, function(b, c) {
        jc(b, !0);
        kc(b, !1);
        b.pa = c == a - 1
    })
};
V.prototype.tc = function(a) {
    if (1 != a.target.Y.length) return !1;
    a = a.target.oa.C;
    return this.Ja(a) ? (this.accept(a), !0) : !1
};
V.prototype.accept = function(a) {
    var b = a.s;
    b.pop();
    this.push(a);
    b instanceof W ? this.dispatchEvent("y") : b instanceof Oe && this.dispatchEvent("B")
};
V.prototype.Ja = function(a) {
    if (a.S == this.S && a.sb) {
        var b;
        !(b = this.empty() && 1 == a.R) && (b = !this.empty()) && (b = this.top(), b = a.R == b.R + 1);
        a = b
    } else a = !1;
    return a
};
var Te = function() {
    this.rb = {};
    this.f = null;
    this.u = 0
};
r(Te, t);
var Ue = function(a, b, c) {
        c.clear();
        c.push(a.rb[b])
    },
    Ve = function(a, b) {
        a.f = Ka(b, function(a) {
            var b = new ic(1, "SPADE");
            mc(b, a);
            return b
        })
    },
    We = function(a, b) {
        for (var c = 0; c < b.length; c++) mc(b[c], a.f[c])
    };
var Xe = function() {
    this.ea = []
};
r(Xe, t);
Xe.prototype.Dc = function() {
    var a = this.ea.pop();
    a && a.Ka();
    return 0 < this.ea.length ? this.ea[this.ea.length - 1] : null
};
Xe.prototype.clear = function() {
    this.ea = []
};
var Ye = function(a) {
    G.call(this);
    this.ac = this.u = 0;
    this.K = a;
    this.B = new F(this);
    u(this, this.B);
    this.Cc()
};
r(Ye, G);
Ye.prototype.Cc = function() {
    this.B.a(this.K, "C", function() {
        this.u += 5
    });
    this.B.a(this.K, "B", function() {
        this.u += 10
    });
    this.B.a(this.K, "y", function() {
        this.u += 15
    });
    this.B.a(this.K, "z", function() {
        this.u += 5
    });
    this.B.a(this.K, "w", function() {
        this.u -= 15
    });
    this.B.a(this.K, "x", function() {
        1 == this.K.G.Nb && (this.u = Math.max(0, this.u - 100))
    })
};
Ye.prototype.start = function() {
    this.ac = q();
    this.u = 0
};
Ye.prototype.Wb = function(a) {
    this.u = a
};
Ye.prototype.getTime = function() {
    return q() - this.ac
};
var Ze, $e = function() {
    var a = l.MessageChannel;
    "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && !x("Presto") && (a = function() {
        var a = document.createElement("IFRAME");
        a.style.display = "none";
        a.src = "";
        document.documentElement.appendChild(a);
        var b = a.contentWindow,
            a = b.document;
        a.open();
        a.write("");
        a.close();
        var c = "callImmediate" + Math.random(),
            d = "file:" == b.location.protocol ? "*" : b.location.protocol + "//" + b.location.host,
            a = p(function(a) {
                if (("*" == d || a.origin == d) &&
                    a.data == c) this.port1.onmessage()
            }, this);
        b.addEventListener("message", a, !1);
        this.port1 = {};
        this.port2 = {
            postMessage: function() {
                b.postMessage(c, d)
            }
        }
    });
    if ("undefined" !== typeof a && !cb()) {
        var b = new a,
            c = {},
            d = c;
        b.port1.onmessage = function() {
            if (m(c.next)) {
                c = c.next;
                var a = c.Kc;
                c.Kc = null;
                a()
            }
        };
        return function(a) {
            d.next = {
                Kc: a
            };
            d = d.next;
            b.port2.postMessage(0)
        }
    }
    return "undefined" !== typeof document && "onreadystatechange" in document.createElement("SCRIPT") ? function(a) {
        var b = document.createElement("SCRIPT");
        b.onreadystatechange =
            function() {
                b.onreadystatechange = null;
                b.parentNode.removeChild(b);
                b = null;
                a();
                a = null
            };
        document.documentElement.appendChild(b)
    } : function(a) {
        l.setTimeout(a, 0)
    }
};
var af = function(a, b) {
    G.call(this);
    this.Jb = a || 1;
    this.Ua = b || l;
    this.dc = p(this.be, this);
    this.pc = q()
};
r(af, G);
g = af.prototype;
g.enabled = !1;
g.M = null;
g.be = function() {
    if (this.enabled) {
        var a = q() - this.pc;
        0 < a && a < .8 * this.Jb ? this.M = this.Ua.setTimeout(this.dc, this.Jb - a) : (this.M && (this.Ua.clearTimeout(this.M), this.M = null), this.dispatchEvent("tick"), this.enabled && (this.M = this.Ua.setTimeout(this.dc, this.Jb), this.pc = q()))
    }
};
g.start = function() {
    this.enabled = !0;
    this.M || (this.M = this.Ua.setTimeout(this.dc, this.Jb), this.pc = q())
};
g.stop = function() {
    this.enabled = !1;
    this.M && (this.Ua.clearTimeout(this.M), this.M = null)
};
g.l = function() {
    af.g.l.call(this);
    this.stop();
    delete this.Ua
};
var bf = function(a, b) {
    this.O = a;
    this.L = b;
    this.ob = this.Ob = 1;
    this.pb = this.yc = this.Kb = this.Lb = 0
};
bf.prototype.Da = function() {
    return this.O
};
bf.prototype.fb = function() {
    return this.L
};
var X = function(a, b, c, d, e) {
        e = e || 1;
        d = d || 1;
        var f;
        f = 1 == a.ob ? 0 : Math.floor((a.O - 2 * a.pb - a.ob * a.Lb) / (a.ob - 1));
        var h = Math.floor((a.L - a.yc - a.Ob * a.Kb) / a.Ob);
        return new J(b * (a.Lb + f) + a.pb, c * (a.Kb + h) + a.yc, d * a.Lb + (d - 1) * f, e * a.Kb + (e - 1) * h)
    },
    cf = function(a) {
        a.top = 48 + R;
        return a
    };
var df = function() {};
ca(df);
df.prototype.jb = function() {
    this.Vc = this.ac = q()
};
df.prototype.log = function(a, b, c) {
    var d = q(),
        e = d - this.Vc;
    this.Vc = d;
    d = window.document;
    d = "CSS1Compat" == d.compatMode ? d.documentElement : d.body;
    d = new qc(d.clientWidth, d.clientHeight);
    Wd(["solitaire", "a:" + a, "ez:" + ef(b), "cs:" + (c || 0), "dt:" + e, "t:" + ef(Sd), "w:" + ef(d.width > d.height), "o:" + ("orientation" in window ? parseInt(window.orientation, 10) : "_")].join())
};
var ef = function(a) {
    return m(a) ? a ? "1" : "0" : "_"
};
var ff = df.la(),
    gf = function(a) {
        L.call(this, a);
        this.Zb = this.Xb = this.Yb = this.Ta = this.$a = this.mc = this.Hb = this.gc = this.na = null
    };
r(gf, L);
gf.prototype.v = function(a) {
    gf.g.v.call(this, a);
    this.Hb = this.c.b("solitaire-dialog-hint");
    this.na = this.c.b("solitaire-mode-dialog-close");
    this.gc = this.c.b("solitaire-easy-button");
    this.mc = this.c.b("solitaire-hard-button");
    this.$a = this.c.b("solitaire-mode-dialog-container");
    this.Ta = this.c.b("solitaire-dialog-share");
    a = ie.la();
    var b = ge(a, ke),
        c = ge(a, ne);
    Gc(b, "position", "relative");
    Gc(c, "position", "relative");
    Dc(this.gc, b);
    Dc(this.mc, c);
    this.Yb = this.c.w("DIV", "share-icons", ge(a, me));
    this.Xb = this.c.w("DIV",
        "share-icons", ge(a, le));
    this.Zb = this.c.w("DIV", "share-icons", ge(a, pe));
    hf(this.Yb);
    hf(this.Zb);
    hf(this.Xb);
    //this.c.appendChild(this.Ta, this.Yb);
    //this.c.appendChild(this.Ta, this.Xb);
    //this.c.appendChild(this.Ta, this.Zb)
};
var hf = function(a) {
    a.children[0].style.position = "relative"
};
g = gf.prototype;
g.A = function() {
    gf.g.A.call(this);
    this.j().a(this.gc, "click", this.vc);
    this.j().a(this.mc, "click", this.wc);
    this.j().a(this.na, "click", this.Ld);
    this.j().a(this.Yb, "click", De);
    this.j().a(this.Xb, "click", Be);
    this.j().a(this.Zb, "click", Ce)
};
g.openDialog = function(a, b) {
    K(this.b(), !0);
    a ? K(this.na, !1) : K(this.na, !0);
    b ? K(this.Ta, !1) : K(this.Ta, !0);
    a && !b ? Ec(this.Hb, "Play again?") : a ? Ec(this.Hb, "Choose your difficulty") : Ec(this.Hb, "Start a new game?")
};
g.Za = function() {
    K(this.b(), !1)
};
g.Ld = function() {
    this.Za();
    this.dispatchEvent("j")
};
g.vc = function() {
    this.Za();
    this.dispatchEvent("k");
    ff.log(2, !0)
};
g.wc = function() {
    this.Za();
    this.dispatchEvent("l");
    ff.log(2, !1)
};
var Y = function(a, b, c) {
    L.call(this, c);
    this.ya = b.left;
    this.za = b.top;
    this.O = b.width;
    this.L = b.height;
    this.qd = this.pd = 0;
    this.s = a
};
r(Y, L);
var jf = function(a, b) {
    a.pd = b;
    a.qd = .2
};
Y.prototype.w = function() {
    this.v(this.c.w("DIV", "pile"))
};
Y.prototype.v = function(a) {
    this.h = a;
    Mc(a, this.O, this.L);
    Lc(a, this.ya, this.za);
    a.width = this.O;
    a.height = this.L
};
Y.prototype.A = function() {
    Y.g.A.call(this);
    this.j().a(this.s, "a", this.Pb);
    ze(this, "click", "m");
    ze(this, "touchstart", "n");
    ze(this, "touchend", "o");
    H(this.s)
};
var kf = function(a) {
    return a.eb ? a.ka ? 2 : 1 : 0
};
Y.prototype.moveTo = function(a) {
    this.ya = a.left;
    this.za = a.top;
    this.O = a.width;
    this.L = a.height;
    Mc(this.b(), this.O, this.L);
    Lc(this.b(), this.ya, this.za);
    H(this.s)
};
Y.prototype.Pb = function() {
    this.s.Bb = !1;
    var a = this.s.f;
    if (0 != a.length) {
        var b = La(a, function(a, b) {
                return a + kf(b)
            }, 0, this),
            b = b - kf(a[a.length - 1]),
            c = 0,
            d = 0;
        w(a, function(a, f) {
            a.Wa.moveTo(this.ya + c + f * this.pd, this.za + d + f * this.qd, f + 1);
            a.eb && (c += Math.min(Fe, Math.floor(kf(a) / b * (this.O - Q))), d += Math.min(Ge, Math.floor(kf(a) / b * (this.L - R))))
        }, this)
    }
};
var lf = function(a, b) {
    L.call(this, b);
    this.O = Q;
    this.L = R;
    this.S = a || null
};
r(lf, L);
lf.prototype.w = function() {
    this.v(this.c.w("DIV", "placeholder"))
};
lf.prototype.v = function(a) {
    lf.g.v.call(this, a);
    Mc(a, this.O, this.L);
    var b = this.c.w("CANVAS", "card-canvas");
    b.width = xe().width;
    b.height = xe().height;
    this.c.appendChild(a, b);
    a = new Je(b);
    this.S ? a.ia(we[this.S], 0, 0) : a.ia(oe, 0, 0)
};
var mf = function(a) {
    L.call(this, a);
    this.ub = this.Xc = this.td = this.md = null
};
r(mf, L);
g = mf.prototype;
g.v = function(a) {
    mf.g.v.call(this, a);
    this.md = this.c.b("solitaire-score");
    this.Wc = this.c.b("solitaire-move");
    this.td = this.c.b("solitaire-timer");
    this.Xc = this.c.b("solitaire-new-game-side-button");
    this.ub = this.c.b("solitaire-undo-side-button")
};
g.A = function() {
    mf.g.A.call(this);
    this.j().a(this.Xc, "click", this.uc);
    this.j().a(this.ub, "click", this.xc);
    this.Wb(0);
    Ec(this.Wc, Math.max(0, 0));
    this.setTime(0)
};
g.Wb = function(a) {
    Ec(this.md, parseInt(a, 10))
};
g.setTime = function(a) {
    var b = this.td;
    a = Math.floor(a / 1E3);
    var c = a % 60;
    a = (a - c) / 60;
    var d = a % 60;
    a = (a - d) / 60 + ":" + ya(d) + ":" + ya(c);
    Ec(b, a)
};
g.uc = function() {
    this.dispatchEvent("p")
};
g.xc = function() {
    Jd(this.ub, "disabled") || this.dispatchEvent("q")
};
var W = function() {
    U.call(this)
};
r(W, U);
W.prototype.ba = function() {
    W.g.ba.call(this);
    var a = this.f.length;
    w(this.f, function(b, c) {
        c == a - 1 && (b.ka || this.dispatchEvent("z"), jc(b, !0));
        kc(b, !0);
        b.pa = b.ka
    }, this)
};
W.prototype.tc = function(a) {
    a = a.target.oa.C;
    return this.Ja(a) ? (this.accept(a), !0) : !1
};
W.prototype.accept = function(a) {
    var b = a.s,
        c = [];
    b instanceof W && (c = Le(b, a));
    b.pop(1 + c.length);
    this.push(Pa(a, c));
    b instanceof W ? this.dispatchEvent("A") : b instanceof Oe ? this.dispatchEvent("C") : b instanceof V && this.dispatchEvent("w")
};
W.prototype.Ja = function(a) {
    if (a.s === this) return !1;
    if (this.empty()) return 13 == a.R;
    var b = this.top();
    return b.R == a.R + 1 && nc(a) != nc(b)
};
var nf = function(a) {
    L.call(this, a);
    this.rc = "Easy";
    this.Fc = this.Gc = this.na = this.ud = this.Oa = this.Ma = null;
    this.Hc = !0
};
r(nf, L);
nf.prototype.v = function(a) {
    nf.g.v.call(this, a);
    this.na = this.c.b("solitaire-close");
    this.ud = this.c.b("solitaire-volume");
    this.Gc = this.c.b("solitaire-volume-up");
    this.Fc = this.c.b("solitaire-volume-off");
    var b = ie.la();
    this.Ma = ge(b, ke);
    this.Oa = ge(b, ne);
    Gc(this.Ma, "position", "relative");
    Gc(this.Oa, "position", "relative");
    Kd(this.Ma, "topbar-mode-indicator");
    Kd(this.Oa, "topbar-mode-indicator");
    Dc(a.firstElementChild, this.Ma);
    Dc(a.firstElementChild, this.Oa)
};
nf.prototype.A = function() {
    this.j().a(this.ud, "click", this.Vd);
    this.j().a(this.na, "click", this.Kd);
    of(this);
    var a = window === window.parent;
    if (0 <= window.navigator.userAgent.toLowerCase().indexOf("gsa") || a) this.na.style.display = "none"
};
nf.prototype.Vd = function() {
    (this.Hc = !this.Hc) ? (this.Gc.style.display = "inline-block", this.Fc.style.display = "none", this.dispatchEvent("r")) : (this.Gc.style.display = "none", this.Fc.style.display = "inline-block", this.dispatchEvent("s"))
};
nf.prototype.Kd = function() {
    for (var a = window; a.postMessage("lightbox-exit", "*"), a !== a.parent;) a = a.parent
};
var of = function(a) {
    "Easy" == a.rc ? (a.Ma.style.display = "inline", a.Oa.style.display = "none") : (a.Ma.style.display = "none", a.Oa.style.display = "inline")
};
var pf = function(a) {
    L.call(this, a);
    this.ld = this.$a = null;
    this.ec = [];
    this.kd = []
};
r(pf, L);
pf.prototype.v = function(a) {
    pf.g.v.call(this, a);
    this.$a = this.c.b("solitaire-final-dialog-container");
    this.ld = this.c.b("ribbon-cards");
    a = Wa(fc);
    for (var b = 0; 4 > b; ++b) {
        var c = new T,
            d = new ic(1, a[b]);
        jc(d, !0);
        Ke(c, d);
        M(this, c);
        Uc(c, this.ld);
        this.kd.push(c)
    }
};
pf.prototype.A = function() {
    pf.g.A.call(this);
    w(this.kd, function(a) {
        a.b().removeAttribute("style")
    }, this)
};
var qf = function(a, b) {
        var c = ["rgba(242, 44, 28, 1)", "rgba(250, 201, 4, 1)", "rgba(64, 123, 204, 1)", "rgba(35, 127, 63, 1)"];
        a.ec = [];
        for (var d = 0; d < b; ++d) {
            var e = a.c.w("DIV", "confetti");
            e.style.backgroundColor = c[oc(4)];
            var f = oc(20) + 10;
            e.style.width = f + "px";
            e.style.height = f + "px";
            e.style.transform = "rotate(" + oc(90) + "deg)";
            e.style.top = 400 + oc(300) + "px";
            e = a.c.w("DIV", "confetti-jar", e);
            e.style.left = oc(window.innerWidth) + "px";
            e.style.transition = "all " + (2E3 + oc(1200)) + "ms cubic-bezier(0.4, 0, 1, 1) 500ms";
            a.c.appendChild(a.b(),
                e);
            a.ec.push(e)
        }
    },
    rf = function(a) {
        w(a.ec, function(a) {
            Cc(a)
        }, a)
    };
pf.prototype.openDialog = function() {
    K(this.b(), !0);
    ae() || $d() ? db() || x("iPad") || x("iPod") || qf(this, 25) : qf(this, 50);
    var a = this;
    setTimeout(function() {
        Kd(a.b(), "win")
    }, 500);
    setTimeout(function() {
        Kd(a.$a, "win-end")
    }, 5750);
    setTimeout(function() {
        a.Za();
        a.dispatchEvent("t")
    }, 6250)
};
pf.prototype.Za = function() {
    K(this.b(), !1);
    Ld(this.b(), "win");
    Ld(this.$a, "win-end");
    rf(this)
};
var sf = df.la(),
    Z = function(a) {
        L.call(this, a);
        this.lb = !1;
        this.G = new Me;
        this.fc = new Re(this);
        u(this, this.fc);
        this.cc = new cc(this);
        u(this, this.cc);
        this.ca = new mf;
        u(this, this.ca);
        this.Va = new nf;
        u(this, this.Va);
        this.va = new gf;
        u(this, this.va);
        this.wb = new pf;
        u(this, this.wb);
        this.$ = new Ye(this);
        u(this, this.$);
        this.M = new af(100);
        this.ua = new Xe;
        u(this, this.ua);
        this.N = new Oe;
        u(this, this.N);
        this.ha = new Pe(this.N, this.G);
        u(this, this.ha);
        this.fa = [];
        for (a = 0; 7 > a; a++) {
            var b = new W;
            u(this, b);
            this.fa.push(b)
        }
        this.V = [];
        b = Wa(fc);
        for (a = 0; 4 > a; a++) {
            var c = new V(b[a]);
            u(this, c);
            this.V.push(c)
        }
        this.f = [];
        Ua(ec, function(a) {
            Ua(fc, function(b) {
                b = new ic(a, b);
                u(this, b);
                this.f.push(b)
            }, this)
        }, this);
        this.qb = [];
        this.Ab = [];
        this.yb = null;
        this.oc = !0
    };
r(Z, L);
Z.prototype.v = function(a) {
    Z.g.v.call(this, a);
    a = this.c.b("solitaire-scorebar");
    var b = this.c.b("solitaire-topbar"),
        c = this.c.b("solitaire-mode-dialog"),
        d = this.c.b("solitaire-final-dialog");
    M(this, this.ca);
    M(this, this.Va);
    M(this, this.va);
    M(this, this.wb);
    Vc(this.ca, a);
    Vc(this.Va, b);
    Vc(this.va, c);
    Vc(this.wb, d);
    this.yb = this.c.b("solitaire-board");
    tf(this, this.yb);
    w(this.qb, function(a) {
        this.fc.Y.push(a)
    }, this)
};
var uf = function(a) {
        w(a.f, function(a) {
            a.da(this)
        }, a);
        w(a.fa, function(a) {
            a.da(this)
        }, a);
        w(a.V, function(a) {
            a.da(this)
        }, a);
        a.ha.da(a);
        a.N.da(a)
    },
    vf = function(a, b, c) {
        var d = a.c.w("DIV", ["pile", "dark-box"]);
        a.c.appendChild(b, d);
        Lc(d, c.left, c.top);
        Mc(d, c.width, c.height)
    },
    xf = function(a, b) {
        var c = window.innerWidth,
            d = window.innerHeight - 56,
            e = new bf(c, d);
        e.Lb = Q;
        e.Kb = R;
        e.yc = 16;
        e.pb = Ee() ? 16 : 8;
        wf(a, b);
        if (Ae()) e.Ob = 5, e.ob = 7, vf(a, b, new J(0, 0, c, R + 32));
        else {
            e.Ob = 4;
            e.ob = 9;
            var f = X(e, 0, 0, 1, 4);
            vf(a, b, new J(0, 0, Q + 2 * f.left,
                d));
            vf(a, b, new J(c - Q - 2 * f.left, 0, Q + 2 * f.left, d))
        }
        return e
    },
    yf = function(a, b) {
        var c = xf(a, b);
        a.Xa = new Y(a.N, X(c, 0, 1, 1, 1.5));
        a.T = new Y(a.ha, X(c, 0, 0));
        jf(a.T, 0);
        a.Ha = [];
        w(a.fa, function(a, b) {
            var f = new Y(a, X(c, b + 1, 0, 1, 4));
            this.Ha.push(f)
        }, a);
        a.Ca = [];
        w(a.V, function(a, b) {
            var f = new Y(a, new J(c.Da() - c.pb - Q, 16 * (.5 * b + 1) + b * R, Q, R));
            jf(f, .2);
            this.Ca.push(f)
        }, a)
    },
    wf = function(a, b) {
        var c = wc("div", "dark-box", b);
        w(c, function(a) {
            Cc(a)
        }, a)
    },
    Af = function(a, b) {
        var c = xf(a, b);
        a.Xa.moveTo(X(c, 0, 1, 1, 1.5));
        jf(a.T, 0);
        a.T.moveTo(X(c,
            0, 0));
        w(a.Ha, function(a, b) {
            a.moveTo(X(c, b + 1, 0, 1, 4))
        }, a);
        w(a.Ca, function(a, b) {
            a.moveTo(new J(c.Da() - c.pb - Q, 16 * (.5 * b + 1) + b * R, Q, R))
        }, a);
        zf(a, c)
    },
    Bf = function(a, b) {
        var c = xf(a, b);
        a.Xa = new Y(a.N, X(c, 1, 0, 1.5, 1));
        a.T = new Y(a.ha, X(c, 0, 0));
        jf(a.T, 0);
        a.Ha = [];
        w(a.fa, function(a, b) {
            var f = new Y(a, cf(X(c, b, 1, 1, 2.5)));
            this.Ha.push(f)
        }, a);
        a.Ca = [];
        w(a.V, function(a, b) {
            var f = new Y(a, X(c, 3 + b, 0));
            jf(f, .2);
            this.Ca.push(f)
        }, a)
    },
    Cf = function(a, b) {
        var c = xf(a, b);
        a.Xa.moveTo(X(c, 1, 0, 1.5, 1));
        jf(a.T, 0);
        a.T.moveTo(X(c, 0, 0));
        w(a.Ha,
            function(a, b) {
                a.moveTo(cf(X(c, b, 1, 1, 2.5)))
            }, a);
        w(a.Ca, function(a, b) {
            jf(a, .2);
            a.moveTo(X(c, 3 + b, 0))
        }, a);
        zf(a, c)
    },
    tf = function(a, b) {
        Ae() ? Bf(a, b) : yf(a, b);
        M(a, a.Xa);
        Uc(a.Xa, b);
        a.qb.push(a.Xa);
        M(a, a.T);
        Uc(a.T, b);
        M(a.T, new lf, !0);
        a.qb.push(a.T);
        w(a.Ha, function(a) {
            M(this, a);
            Uc(a, b);
            this.qb.push(a)
        }, a);
        var c = Wa(fc);
        w(a.Ca, function(a, e) {
            M(this, a);
            Uc(a, b);
            M(a, new lf(c[e]), !0);
            this.qb.push(a)
        }, a);
        w(a.f, function() {
            var a = new T;
            M(this, a);
            Uc(a, b);
            this.Ab.push(a)
        }, a)
    };
Z.prototype.bd = function(a) {
    0 >= a || (this.oc == Ae() ? setTimeout(p(this.bd, this, a - 1), 500) : this.Qb())
};
Z.prototype.A = function() {
    Z.g.A.call(this);
    Df(this);
    var a = this.j();
    a.a(this.Va, "r", this.Xd);
    a.a(this.Va, "s", this.Wd);
    a.a(this.ca, "q", this.xc);
    a.a(this.ca, "p", this.uc);
    a.a(this.va, "k", this.vc);
    a.a(this.va, "l", this.wc);
    a.a(this.wb, "t", this.Sd);
    a = this.j();
    a.a(this, Zc.yd, this.Od);
    a.a(this.fc, "i", this.Nd);
    ae() || $d() ? (a.a(this, "o", this.ad), a.a(this, "f", this.Yc)) : (a.a(this, "m", this.ad), a.a(this, "d", this.Yc));
    a.a(window, "resize", this.Qb);
    a.a(window, "orientationchange", p(this.bd, this, 3));
    a.a(this.M, "tick",
        this.Ud);
    a = this.j();
    a.a(this, "vwxyABC".split(""), this.gd);
    a.a(this, "g", this.Rd);
    a.a(this, ["y", "B", "C", "A"], this.Cd);
    a.a(this, "D", this.Pd);
    uf(this);
    this.Qb();
    var b = a = this.Qb;
    this && (b = p(a, this));
    "function" != da(l.setImmediate) || l.Window && l.Window.prototype && !x("Edge") && l.Window.prototype.setImmediate == l.setImmediate ? (Ze || (Ze = $e()), Ze(b)) : l.setImmediate(b)
};
var Df = function(a) {
    var b = a.j();
    w(a.fa, function(a, d) {
        Zb(b, this.Ha[d], "h", a.tc, !1, a)
    }, a);
    w(a.V, function(a, d) {
        Zb(b, this.Ca[d], "h", a.tc, !1, a)
    }, a)
};
Z.prototype.start = function() {
    this.va.openDialog(!0, !0);
    this.M.start();
    this.hd();
    Ef(this)
};
var Ff = function(a) {
        a.lb && sf.log(4, "Easy" == a.G.nb, a.$.u);
        a.hd();
        a.G.fd = Math.random();
        Ef(a);
        setTimeout(function() {
            w(a.fa, function(b, c) {
                var d = a.ha.pop(c + 1);
                b.push(d)
            }, a);
            a.gd();
            a.dispatchEvent("u");
            a.$.start();
            w(a.Ab, function(a) {
                ye(a.b(), 0)
            })
        }, 1E3);
        a.lb = !0;
        a.cc.jb();
        a.$.start()
    },
    Ef = function(a) {
        var b = Qa(a.f);
        Ta(b, Ne(a.G));
        w(b, function(a, b) {
            Ke(this.Ab[b], a)
        }, a);
        a.ha.push(b)
    };
g = Z.prototype;
g.gd = function() {
    var a = new Te(this.$.getTime());
    Ve(a, this.f);
    a.rb.deck = Qa(this.ha.f);
    a.rb.waste = Qa(this.N.f);
    w(this.V, function(b, c) {
        a.rb["foundation" + c] = Qa(b.f)
    });
    w(this.fa, function(b, c) {
        a.rb["tableau" + c] = Qa(b.f)
    });
    a.u = 0 > this.ua.ea.length - 1 ? 0 : this.$.u;
    this.ua.ea.push(a);
    Md(this.ca.ub, !(1 < this.ua.ea.length))
};
g.Dc = function() {
    var a = this.ua.Dc();
    a && (Ue(a, "deck", this.ha), Ue(a, "waste", this.N), w(this.V, function(b, c) {
        Ue(a, "foundation" + c, b)
    }), w(this.fa, function(b, c) {
        Ue(a, "tableau" + c, b)
    }), this.$.Wb(a.u), We(a, this.f));
    Md(this.ca.ub, !(1 < this.ua.ea.length))
};
g.hd = function() {
    this.ua.clear();
    this.N.clear();
    this.ha.clear();
    w(this.V, function(a) {
        a.clear()
    });
    w(this.fa, function(a) {
        a.clear()
    })
};
g.xc = function() {
    this.Dc()
};
g.uc = function() {
    this.va.openDialog(!1, !0)
};
g.Sd = function() {
    this.va.openDialog(!0, !1)
};
g.Wd = function() {
    this.G.ic = !1
};
g.Xd = function() {
    this.G.ic = !0
};
g.vc = function() {
    var a = this.G;
    a.Nb = 1;
    a.hc = !0;
    a.nb = "Easy";
    Ff(this)
};
g.wc = function() {
    var a = this.G;
    a.Nb = 3;
    a.hc = !1;
    a.nb = "Hard";
    Ff(this)
};
g.Ud = function() {
    if (this.lb) {
        this.ca.Wb(this.$.u);
        Ec(this.ca.Wc, Math.max(parseInt(this.ua.ea.length - 1, 10), 0));
        this.ca.setTime(this.$.getTime());
        var a = this.Va,
            b = this.G.nb;
        a.rc != b && (a.rc = b, of(a))
    }
};
g.Od = function(a) {
    a = a.Cb;
    var b = a.oa,
        c = b.C.s;
    c instanceof W ? He(a, Ka(Le(c, b.C), function(a) {
        return a.Wa
    })) : He(a, []);
    return !0
};
g.Nd = function(a) {
    w(a.target.Y, function(a) {
        a.jc = !0;
        ye(a.b(), 1)
    });
    H(a.target.oa.C.s)
};
var zf = function(a, b) {
    w(a.Ab, function(a) {
        a.qa.Mb = new J(0, 0, b.Da() - Q, b.fb() - R)
    }, a)
};
g = Z.prototype;
g.Qb = function() {
    (this.oc = Ae()) ? Ae() && Cf(this, this.yb): Af(this, this.yb)
};
g.Yc = function(a) {
    a = a.target.C;
    var b = a.s;
    b instanceof Oe || b instanceof V ? a.sb && hc(b, "g", a) : b instanceof W ? a.ka && this.G.hc && hc(b, "g", a) : b instanceof Pe && Qe(b)
};
g.ad = function(a) {
    a = a.target.s;
    a instanceof Pe && Qe(a)
};
g.Cd = function() {
    Na(this.f, function(a) {
        return a.ka
    }) && this.dispatchEvent("D")
};
g.Pd = function() {
    if (this.lb) {
        this.lb = !1;
        this.cc.play("winscreen");
        for (var a = !1; !a;) a = !0, w(this.f, function(b) {
            lc(b, !0);
            w(this.V, function(a) {
                a.Ja(b) && a.push(b)
            }, this);
            b.s instanceof V || (a = !1)
        }, this);
        sf.log(3, "Easy" == this.G.nb, this.$.u);
        this.wb.openDialog()
    }
};
g.Rd = function(a) {
    this.play(a.target)
};
g.play = function(a, b) {
    var c = Gf(a, b ? this.V : Pa(this.V, this.fa));
    return c ? (c.accept(a), !0) : !1
};
var Gf = function(a, b) {
    var c = a.s,
        d = [];
    w(b, function(b) {
        b.Ja(a) && b !== c && d.push(b)
    });
    return 0 < d.length ? d[0] : null
};
var Hf = df.la(),
    If = null,
    Jf = function() {
        if (!If) {
            var a = vc(document, "solitaire");
            if (a) {
                var b = vc(document, "solitaire-waiting-hint");
                if (b) {
                    var c = vc(document, "solitaire-mode-dialog");
                    if (c) {
                        var d = vc(document, "solitaire-final-dialog");
                        d && (K(b, !0), K(c, !1), K(d, !1), ie.la().Ub(0, function() {
                            a.style.display = "block";
                            If = new Z;
                            Vc(If, a);
                            K(b, !1);
                            If.start()
                        }), Hf.jb(), Hf.log(1))
                    }
                }
            }
        }
    };
aa("gws.lrfactory.solitaire.start", function() {
    Gb(window, "load", function() {
        Jf()
    })
});