!function t(e, i, l) {
    function a(s, h) {
        if (! i[s]) {
            if (! e[s]) {
                var o = "function" == typeof require && require;
                if (! h && o) 
                    return o(s, !0);
                
                if (n) 
                    return n(s, !0);
                
                var r = new Error("Cannot find module '" + s + "'");
                throw r.code = "MODULE_NOT_FOUND",
                r
            }
            var d = i[s] = {
                exports: {}
            };
            e[s][0].call(d.exports, (function (t) {
                return a(e[s][1][t] || t)
            }), d, d.exports, t, e, i, l)
        }
        return i[s].exports
    }
    for (var n = "function" == typeof require && require, s = 0; s < l.length; s++) 
        a(l[s]);
    
    return a
}({
    1: [function (t, e, i) {
                "use strict";
                Object.defineProperty(i, "__esModule", {
                    value: !0
                });
                const l = 0,
            a = 1,
            n = 2,
            s = 3,
            h = 4;
                let o;
                let r,
            d,
            u,
            y,
            g,
            w,
            x,
            c = 0,
            m = 0,
            f = !1,
            p = !1,
            b = window.requestAnimationFrame,
            v = !1,
            k = 1,
            S = 1,
            D = (window.cancelAnimationFrame, []),
            T = {
                        x: 0,
                        y: 0
                    },
            M = !1,
            A = !1,
            C = {
                        shadow: {
                            x: 2,
                            y: 2,
                            width: 38,
                            height: 30
                        },
                        snowball: {
                            snowball: {
                                x: 0,
                                y: 0,
                                width: 10,
                                height: 10
                            },
                            splash: {
                                x: 0,
                                y: 0,
                                width: 18,
                                height: 14
                            },
                            sink: {
                                x: 0,
                                y: 0,
                                width: 16,
                                height: 7
                            },
                            puddle: {
                                x: 0,
                                y: 0,
                                width: 20,
                                height: 14
                            }
                        },
                        player: {
                            walking: {
                                x: 15,
                                y: 19,
                                width: 24,
                                height: 34
                            },
                            walkingAlt: {
                                x: 59,
                                y: 18,
                                width: 30,
                                height: 35
                            },
                            standing: {
                                x: 148,
                                y: 19,
                                width: 26,
                                height: 34
                            },
                            cocked: {
                                x: 84,
                                y: 99,
                                width: 31,
                                height: 35
                            },
                            throwing: {
                                x: 150,
                                y: 98,
                                width: 23,
                                height: 36
                            },
                            hit: {
                                x: 199,
                                y: 24,
                                width: 35,
                                height: 30
                            },
                            hit1: {
                                x: 258,
                                y: 11,
                                width: 32,
                                height: 43
                            },
                            hit2: {
                                x: 312,
                                y: 10,
                                width: 36,
                                height: 44
                            },
                            hit3: {
                                x: 368,
                                y: 13,
                                width: 35,
                                height: 40
                            },
                            normalDeath: {
                                x: 208,
                                y: 109,
                                width: 71,
                                height: 32
                            },
                            hardDeath: {
                                x: 290,
                                y: 101,
                                width: 68,
                                height: 48
                            },
                            wipedOut: {
                                x: 376,
                                y: 98,
                                width: 51,
                                height: 53
                            }
                        },
                        enemy: {
                            gathering: {
                                x: 292,
                                y: 23,
                                width: 24,
                                height: 31
                            },
                            cocked: {
                                x: 332,
                                y: 19,
                                width: 34,
                                height: 35
                            },
                            throwing: {
                                x: 393,
                                y: 20,
                                width: 24,
                                height: 34
                            },
                            walking: {
                                x: 133,
                                y: 18,
                                width: 30,
                                height: 36
                            },
                            walkingAlt: {
                                x: 186,
                                y: 18,
                                width: 27,
                                height: 34
                            },
                            hit: {
                                x: 26,
                                y: 75,
                                width: 25,
                                height: 35
                            },
                            guard: {
                                x: 74,
                                y: 75,
                                width: 29,
                                height: 35
                            },
                            brushOff: {
                                x: 124,
                                y: 75,
                                width: 29,
                                height: 35
                            },
                            stunned: {
                                x: 170,
                                y: 76,
                                width: 35,
                                height: 34
                            },
                            normalDeath: {
                                x: 44,
                                y: 145,
                                width: 66,
                                height: 42
                            },
                            hardDeath: {
                                x: 137,
                                y: 142,
                                width: 54,
                                height: 46
                            },
                            wipedOut: {
                                x: 220,
                                y: 145,
                                width: 69,
                                height: 42
                            },
                            minorDeath: {
                                x: 317,
                                y: 145,
                                width: 49,
                                height: 38
                            },
                            victory1: {
                                x: 244,
                                y: 78,
                                width: 42,
                                height: 35
                            },
                            victory2: {
                                x: 312,
                                y: 77,
                                width: 40,
                                height: 37
                            },
                            victory3: {
                                x: 380,
                                y: 76,
                                width: 42,
                                height: 37
                            }
                        }
                    },
            I = {
                        easyColor: "rgba(55,139,41,1)",
                        medColor: "rgba(55,139,41,1)",
                        hardColar: "rgba(55,139,41,1)"
                    },
            O = {
                        iterations: 0,
                        playColor: "rgba(55,139,41,1)"
                    },
            Y = "images/player.png",
            X = "images/shadow.png",
            E = "images/enemy.png",
            L = "images/playField.png",
            H = "images/snowball.png",
            F = "images/snowball_shadow.png",
            q = "images/splash.png",
            B = "images/sink.png",
            N = "images/puddle.png",
            R = "images/smallHand.png",
            _ = {
                        player: new Image,
                        enemy: new Image,
                        playField: new Image,
                        shadow: new Image,
                        snowball: new Image,
                        snowballShadow: new Image,
                        splash: new Image,
                        sink: new Image,
                        puddle: new Image,
                        hand: new Image
                    },
            P = {
                        shadow: {
                            active: null,
                            status: null,
                            x: 0,
                            y: 0,
                            initialX: 0,
                            initialY: 0,
                            width: 0,
                            height: 0,
                            finalX: null,
                            finalY: null,
                            value: null,
                            xDirection: null,
                            yDirection: null,
                            type: s
                        },
                        playField: {
                            status: null,
                            active: !0,
                            x: 0,
                            y: 0,
                            initialX: 0,
                            initialY: 0,
                            width: 0,
                            height: 0,
                            finalX: null,
                            finalY: null,
                            value: null,
                            xDirection: null,
                            yDirection: null,
                            type: h
                        }
                    },
            W = 100,
            K = 5,
            U = 5,
            j = 3,
            G = !1,
            z = {
                        level: 1,
                        enemies: 1,
                        players: 3,
                        points: 0,
                        soundsEnabled: !0,
                        selectingDifficulty: !0
                    },
            J = "sounds/throw.mp3",
            Q = "sounds/hit1.mp3",
            V = "sounds/hit2.mp3",
            Z = "sounds/hit3.mp3",
            $ = "sounds/deathHit.mp3",
            tt = "sounds/intro.mp3",
            et = "";
                document.addEventListener("DOMContentLoaded", (function () {
                    lt()
                }));
                const it = () => {
                        const t = u.getBoundingClientRect();
                        T = {
                            x: t.left,
                            y: t.top
                        }
                    },
            lt = () => {
                        u = document.getElementById("gameCanvas"),
                        y = u.getContext("2d"),
                        it(),
                        ie(),
                        st()
                    },
            at = t => {
                        z.selectingDifficulty = !1,
                        z.gameOver = !1,
                        z.gameStarted = !0,
                        z.difficulty = t,
                        z.level = 1,
                        z.enemyHealth = 1 === t
                            ? 1
                            : 2 === t
                                ? 3
                                : 4,
                        z.playerHealth = 4,
                        rt()
                    },
            nt = () => {
                        z.audioLoaded && z.imagesLoaded && (d = b(xt))
                    },
            st = () => {
                        ht(),
                        ot()
                    },
            ht = () => {
                        const t = new Audio;
                        t.src = tt;
                        (new Audio).src = J;
                        (new Audio).src = Q;
                        (new Audio).src = V;
                        (new Audio).src = Z;
                        (new Audio).src = $;
                        (new Audio).src = et,
                        t.oncanplaythrough = () => {
                            z.audioLoaded = !0,
                            nt()
                        }
                    },
            ot = () => {
                        _.player.src = Y,
                        _.enemy.src = E,
                        _.playField.src = L,
                        _.shadow.src = X,
                        _.snowball.src = H,
                        _.splash.src = q,
                        _.sink.src = B,
                        _.puddle.src = N,
                        _.snowballShadow.src = F,
                        _.hand.src = R,
                        _.playField.onload = () => {
                            z.imagesLoaded = !0,
                            k = u.width / u.clientWidth,
                            nt()
                        }
                    },
            rt = () => {
                        1 === z.level
                            ? (
                                z.loading =! 0,
                                O.iterations = 0,
                                p || (_t(et, !0, .4), p =! 0),
                                z.points = 0,
                                z.enemies = 1 === z.difficulty
                                    ? 1
                                    : 2 === z.difficulty
                                        ? 3
                                        : 5
                            )
                            : z.enemies = z.enemies + z.difficulty,
                        M = !1,
                        x = null,
                        P.enemySnowballs = [],
                        P.playerSnowballs = [],
                        P.enemies = [],
                        P.players = [],
                        P.deadSprites = [],
                        yt(),
                        gt(),
                        wt(),
                        z.level ++
                    },
            dt = (t, e, i, l) => {
                        var a = .5 * (- i.y * l.x + e.y * (- i.x + l.x) + e.x * (i.y - l.y) + i.x * l.y),
                            n = a < 0
                                ? -1
                                : 1,
                            s = (e.y * l.x - e.x * l.y + (l.y - e.y) * t.x + (e.x - l.x) * t.y) * n,
                            h = (e.x * i.y - e.y * i.x + (e.y - i.y) * t.x + (i.x - e.x) * t.y) * n;
                        return s > 0 && h > 0 && s + h < 2 * a * n
                    },
            ut = (t, e, i) => {
                        const l = {
                            x: Math.round(Math.random() * u.width / j) * j,
                            y: Math.round(Math.random() * u.height / j) * j
                        };
                        return dt(l, {
                            x: t.x,
                            y: t.y
                        }, {
                            x: e.x,
                            y: e.y
                        }, {
                            x: i.x,
                            y: i.y
                        })
                            ? l
                            : ut(t, e, i)
                    },
            yt = () => {
                        for (var t = 0; t < z.enemies; t++) {
                            const t = ut({
                                    x: 0,
                                    y: 0
                                }, {
                                    x: 0,
                                    y: u.height / 2
                                }, {
                                    x: .6 *u.width,
                                    y: 0
                                }),
                                e = {
                                    status: "walking",
                                    active: !0,
                                    x: t.x,
                                    y: t.y,
                                    initialX: t.x,
                                    initialY: t.y,
                                    width: C
                                        .enemy
                                        .walking
                                        .width,
                                    height: C
                                        .enemy
                                        .walking
                                        .height,
                                    finalX: null,
                                    finalY: null,
                                    xDirection: null,
                                    yDirection: null,
                                    value: z.enemyHealth,
                                    type: a
                                };
                            P.enemies.push(e)
                        }
                    },
            gt = () => {
                        for (var t = 0; t < z.players; t++) {
                            const t = ut({
                                x: u.width - C
                                    .player
                                    .standing
                                    .width,
                                y: u.height / 2
                            }, {
                                x: .4 *u.width,
                                y: u.height - C
                                    .player
                                    .standing
                                    .height
                            }, {
                                x: u.width - C
                                    .player
                                    .standing
                                    .width,
                                y: u.height - C
                                    .player
                                    .standing
                                    .height
                            });
                            P.players.push({
                                status: "standing",
                                active: !0,
                                x: t.x,
                                y: t.y,
                                initialX: null,
                                initialY: null,
                                width: null,
                                height: null,
                                finalX: null,
                                finalY: null,
                                xDirection: null,
                                yDirection: null,
                                value: z.playerHealth,
                                type: l
                            })
                        }
                    },
            wt = () => {
                        let t = P.players.length;
                        for (; t--;) {
                            const e = P.players[t];
                            e.initialY = e.y,
                            e.initialX = e.x,
                            e.y = e.y + (u.height - e.y) + 60
                        }
                        for (t = P.enemies.length; t--;) {
                            const e = P.enemies[t];
                            e.finalX = e.x,
                            e.finalY = e.y,
                            e.x = e.finalX - 102,
                            e.y = e.finalY - 102,
                            e.xDirection = 1,
                            e.yDirection = 1
                        }
                        v = !0
                    },
            xt = t => {
                        if (t - c < 8.333333333333334) 
                            b(xt);
                         else {
                            if (! f) {
                                if (
                                    m = 60 === m
                                        ? 0
                                        : m + 1,
                                    null != r
                                ) {
                                    const t = (performance.now() - r) / 1e3;
                                    o = 1 / t
                                } else 
                                    o = 0;
                                 r = performance.now(),
                                v && Ut().then((() => {
                                    jt()
                                })),
                                z.gameStarted && Gt(),
                                y.clearRect(0, 0, u.width, u.height),
                                y.drawImage(_.playField, 0, 0, u.width, u.height),
                                St(),
                                bt(),
                                kt(),
                                vt(),
                                Dt(),
                                pt(),
                                ft(),
                                mt(),
                                ct()
                            }
                            c = t,
                            b(xt)
                        }
                    },
            ct = () => {
                        G && (y.font = "12px Arial", y.fillStyle = "green", y.textAlign = "left", y.fillText(o.toFixed(2) + "fps", 5, 15))
                    },
            mt = () => {
                        A && ! x && y.drawImage(_.hand, Math.round(g), Math.round(w), 28, 30)
                    },
            ft = () => {
                        z.selectingDifficulty && (y.font = "700 28px 'Mountains of Christmas'", y.textAlign = "center", y.textBaseline = "middle", y.fillStyle = I.easyColor, y.strokeStyle = "rgba(255,255,255,.7)", y.lineWidth = 15, y.strokeText("Easy", u.width / 2, u.height / 2 - 45), y.fillText("Easy", u.width / 2, u.height / 2 - 45), y.fillStyle = I.medColor, y.strokeText("Normal", u.width / 2, u.height / 2), y.fillText("Normal", u.width / 2, u.height / 2), y.fillStyle = I.hardColar, y.strokeText("Hard", u.width / 2, u.height / 2 + 45), y.fillText("Hard", u.width / 2, u.height / 2 + 45))
                    },
            pt = () => {
                        if (y.textBaseline = "middle", M && null != x && (y.font = "8px Arial", y.fillStyle = "red", y.fillText(S + "", x.x + 25, x.y + .9 * x.height)), z.loading && (y.font = "100 36px 'Mountains of Christmas'", y.strokeStyle = "rgba(255,255,255,.7)", y.lineWidth = 15, y.strokeText("Drag the Red Kids to Throw!", u.width / 2, u.height / 2), y.fillStyle = "rgba(255,0,0,1)", y.textAlign = "center", y.fillText("Drag the Red Kids to Throw!", u.width / 2, u.height / 2)), y.font = "900 20px Mountains of Christmas", y.fillStyle = "rgba(0,0,255,1)", y.textAlign = "center", y.fillText("" /*"SCORE: " + z.points*/, u.width / 2, .94 * u.height), z.gameOver && ! z.selectingDifficulty) {
                            const t = O.iterations / 100;
                            y.font = "100 36px 'Mountains of Christmas'",
                            y.strokeStyle = "rgba(255,255,255,.7)",
                            y.lineWidth = 15,
                            y.strokeText("Happy Holidays from Nicholson NY", u.width / 2, u.height / 2),
                            y.fillStyle = "rgba(255,0,0," + .7 * t + ")",
                            y.textAlign = "center",
                            y.fillText("Happy Holidays from Nicholson NY", u.width / 2, u.height / 2),
                            y.shadowBlur = y.shadowColor = y.shadowOffsetX = y.shadowOffsetY = null,
                            O.iterations ++,
                            y.font = "700 20px Mountains of Christmas",
                            y.fillStyle = O.playColor,
                            y.textAlign = "right",
                            y.fillText("PLAY AGAIN", .98 * u.width, .94 * u.height)
                        }
                    },
            bt = () => {
                        if (null != P.deadSprites) {
                            let t = P.deadSprites.length;
                            for (; t--;) {
                                const e = P.deadSprites[t];
                                At(e)
                            }
                        }
                    },
            vt = () => {
                        if (null != P.players) {
                            const i = P.players.sort(((t, e) => t.y - e.y));
                            for (var t = 0, e = i.length; t < e; t++) 
                                It(i[t])
                            
                        }
                    },
            kt = () => {
                        if (null != P.enemies) {
                            const i = P.enemies.sort(((t, e) => t.y - e.y));
                            for (var t = 0, e = i.length; t < e; t++) 
                                Ct(i[t])
                            
                        }
                    },
            St = () => {
                        if (null != P.players) {
                            let t = P.players.length;
                            for (; t--;) {
                                const e = P.players[t];
                                Mt(e)
                            }
                            for (t = P.enemies.length; t--;) {
                                const e = P.enemies[t];
                                Mt(e)
                            }
                        }
                    },
            Dt = () => {
                        if (null != P.enemySnowballs && null != P.playerSnowballs) {
                            let t = P.playerSnowballs.length;
                            for (; t--;) {
                                const e = P.playerSnowballs[t];
                                Bt(e, P.enemies, "enemies"),
                                Tt(e)
                            }
                            for (t = P.enemySnowballs.length; t--;) {
                                const e = P.enemySnowballs[t];
                                Bt(e, P.players, "players"),
                                Tt(e)
                            }
                        }
                    },
            Tt = t => {
                        "snowball" === t.status && y.drawImage(_.snowballShadow, C
                            .snowball
                            .snowball
                            .x, C
                            .snowball
                            .snowball
                            .y, C
                            .snowball
                            .snowball
                            .width, C
                            .snowball
                            .snowball
                            .height, t.x, t.value, C
                            .snowball
                            .snowball
                            .width, C
                            .snowball
                            .snowball
                            .height),
                        "puddle" === t.status && (y.globalAlpha = t.value);
                        const e = "snowball" === t.status || "splash" === t.status
                            ? t.y
                            : "sink" === t.status
                                ? t.y + 2
                                : t.y;
                        y.drawImage(_[t.status], C.snowball[t.status].x, C.snowball[t.status].y, C.snowball[t.status].width, C.snowball[t.status].height, t.x, e, C.snowball[t.status].width, C.snowball[t.status].height),
                        y.globalAlpha = 1
                    },
            Mt = t => {
                        y.drawImage(_.shadow, C.shadow.x, C.shadow.y, C.shadow.width, C.shadow.height, t.x + 2, t.y + 10, C.shadow.width, C.shadow.height)
                    },
            At = t => {
                        let e,
                            i,
                            s = t.x,
                            h = t.y;
                        switch (t.type) {
                            case l: e = "player",
                                s = "normalDeath" == t.status
                                    ? t.x - 20
                                    : t.x,
                                h = "normalDeath" == t.status
                                    ? t.y + 15
                                    : t.y,
                                i = _.player;
                                break;
                            case a: e = "enemy",
                                i = _.enemy;
                                break;
                            case n: e = "snowball",
                                i = _[t.status]
                        }
                        y.drawImage(i, C[e][t.status].x, C[e][t.status].y, C[e][t.status].width, C[e][t.status].height, s, h, C[e][t.status].width, C[e][t.status].height)
                    },
            Ct = t => {
                        y.drawImage(_.enemy, C.enemy[t.status].x, C.enemy[t.status].y, C.enemy[t.status].width, C.enemy[t.status].height, t.x, t.y, C.enemy[t.status].width, C.enemy[t.status].height),
                        t.width = C.enemy[t.status].width,
                        t.height = C.enemy[t.status].height
                    },
            It = t => {
                        const e = "hit1" == t.status || "hit2" == t.status || "hit3" == t.status
                                ? t.x - 5
                                : "normalDeath" == t.status
                                    ? t.x - 20
                                    : t.x,
                            i = "hit1" == t.status || "hit2" == t.status || "hit3" == t.status
                                ? t.y - 7
                                : "normalDeath" == t.status
                                    ? t.y + 15
                                    : t.y;
                        y.drawImage(_.player, C.player[t.status].x, C.player[t.status].y, C.player[t.status].width, C.player[t.status].height, e, i, C.player[t.status].width, C.player[t.status].height),
                        t.width = C.player[t.status].width,
                        t.height = C.player[t.status].height
                    },
            Ot = (t, e, i, l) => {
                        null != e && (t.x = Math.round(e - t.width / 2)),
                        null != i && (t.y = Math.round(i - t.height / 2)),
                        t.status = l
                    },
            Yt = (t, e) => {
                        let i = e.length;
                        for (; i--;) {
                            const l = e[i];
                            if (l.type === n && l.x === t.x && l.y === t.y) {
                                e.splice(i, 1);
                                break
                            }
                        }
                    },
            Xt = () => {
                        switch (Math.floor(4 * Math.random() + 1)) {
                            case 4:
                                _t(Q);
                                break;
                            case 3:
                                _t(V);
                                break;
                            case 2:
                                _t(Z);
                                break;
                            case 1:
                                _t($)
                        }
                    },
            Et = (t, e = 0) => {
                        if (null != x && x.x === t.x && x.y === t.y && (M =! 1, x = null), 1 === ++ e && (Xt(), t.value --), t.active =! 1, t.value > 0) 
                            if (e < 5) {
                                let i = 0;
                                1 === e
                                    ? t.status = "hit"
                                    : i = -250,
                                setTimeout((() => {
                                    t.status = "hit1"
                                }), i + 250),
                                setTimeout((() => {
                                    t.status = "hit2"
                                }), i + 325),
                                setTimeout((() => {
                                    t.status = "hit3"
                                }), i + 450),
                                setTimeout((() => Et(t, e)), i + 575)
                            }
                         else 
                            t.status = "standing",
                            t.active = !0;
                        
                    
                 else 
                    Ft(t, P.players, "normalDeath"),
                    qt(P.players).then((t => {
                        t && Lt()
                    }))
                
            },
    Lt = () => {
                z.gameOver = !0,
                (() => {
                    let t;
                    if (null != D) {
                        let e = D.length;
                        for (; e--;) {
                            const i = D[e];
                            if (i.path.indexOf("music") > -1) {
                                t = i;
                                break
                            }
                        }
                        null != t && (Pt(t), p =! 1)
                    }
                })(),
                Jt(0)
            },
    Ht = t => {
                if (t.active =! 1, Xt(), t.value > 2) 
                    t.value --,
                    t.status = "hit",
                    setTimeout((() => {
                        t.status = "guard"
                    }), 100),
                    setTimeout((() => {
                        t.status = "brushOff"
                    }), 175),
                    setTimeout((() => {
                        t.status = "walking",
                        t.active = !0
                    }), 600);
                 else if (2 === t.value) 
                    t.value --,
                    t.status = "stunned",
                    setTimeout((() => {
                        t.status = "walking",
                        t.active = !0
                    }), 1200);
                 else {
                    const e = 1 === z.difficulty
                        ? 10
                        : 2 === z.difficulty
                            ? 50
                            : 100;
                    z.points = z.points + e,
                    Ft(t, P.enemies, "normalDeath"),
                    qt(P.enemies).then((t => {
                        t && setTimeout((() => {
                            rt()
                        }), 2e3)
                    }))
                }
            },
    Ft = (t, e, i) => {
                t.active = !1,
                t.value --,
                t.status = i;
                let l = e.length;
                for (; l--;) {
                    const i = e[l];
                    if (i.x === t.x && i.y === t.y && i.value === t.value) {
                        e.splice(l, 1),
                        P.deadSprites.push(t);
                        break
                    }
                }
            },
    qt = t => new Promise(
                ((e, i) => {
                    let l = t.length,
                        a = 0;
                    for (; l--;) {
                        0 === t[l].value && a++
                    }
                    a === t.length
                        ? e(!0)
                        : e(!1)
                })
            ),
    Bt = (t, e, i) => {
                let l = e.length;
                for (; l--;) {
                    const a = e[l];
                    if (a.active && t.active && t.x > a.x - t.width && t.x<a.x+a.width&&t.y>a.y - t.height && t.y<a.y+a.height){"enemies"===i?(Ht(a), Yt(t, P.playerSnowballs)):(Et(a), Yt(t, P.enemySnowballs));break}}}, Nt=(t, e, i, l)=> {
                        var a = 1 - t;
                        return a * a * e + 2 * a * t * i + t * t * l
                }, Rt =( t, e, i, l, a, n, s, h, o = null, r = null) => {
                    if (null != t && (t.x < 0 || t.y < 0 || t.x > u.width || t.y > u.height)) {
                        const e = "enemies" === h
                            ? P.enemySnowballs
                            : P.playerSnowballs;
                        Yt(t, e)
                    } else if (null != t && 1 !== Math.round(s)) {
                        let o,
                            r,
                            d,
                            u,
                            y,
                            g,
                            w = .006;
                        "enemies" === h
                            ? (o = e, r = i, d = e + a, u = i + a + 30, y = e + .6 * a, g = i + .6 * a - n)
                            : (o = e, r = i, d = e - a, u = i - a + 30, y = e - .6 * a, g = i - .6 * a - n);
                        let x = ((t, e, i, l, a, n, s) => ({
                            x: Nt(s, t, i, a),
                            y: Nt(s, e, l, n)
                        }))(o, r, y, g, d, u, s);
                        s = (s + w) % 1,
                        t.x = Math.round(x.x),
                        t.y = Math.round(x.y),
                        t.value = (t.x - o) / (d - o) * (u - r) + r,
                        setTimeout((() => {
                            Rt(t, e, i, l, a, n, s, h, d, u)
                        }), 1)
                    } else {
                        const e = "enemies" === h
                            ? P.enemySnowballs
                            : P.playerSnowballs;
                        Ft(t, e, "splash"),
                        setTimeout((() => {
                            t.status = "sink"
                        }), 75),
                        setTimeout((() => {
                            t.status = "puddle";
                            let e = 0;
                            const i = setInterval((() => {
                                e++,
                                t.value = (500 - 50 * e) / 500,
                                10 === e && (clearInterval(i), Yt(t, P.deadSprites))
                            }), 50)
                        }), 150)
                    }
                }, _t =( t, e = !1, i = 1) => {
                    if (! f && z.soundsEnabled) {
                        const l = new Audio(t),
                            a = {
                                id: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function (t) {
                                    var e = 16 * Math.random() | 0;
                                    return(
                                        "x" == t
                                            ? e
                                            : 3 & e | 8
                                    ).toString(16)
                                })),
                                audio: l,
                                path: t
                            };
                        D.push(a),
                        l.volume = i,
                        l.play(),
                        l.onended = () => {
                            e
                                ? z.gameOver
                                    ? Pt(a)
                                    : l.play()
                                : Pt(a)
                        }
                    }
                }, Pt = t => {
                    t.audio.src = "";
                    let e = D.length;
                    for (; e--;) {
                        if (D[e].id == t.id) {
                            D.splice(e, 1);
                            break
                        }
                    }
                }, Wt =( t, e, i, l) => {
                    _t(J);
                    let a = {
                        status: "snowball",
                        active: !0,
                        initialX: t,
                        initialY: e,
                        x: t,
                        y: e,
                        width: C
                            .snowball
                            .snowball
                            .width,
                        height: C
                            .snowball
                            .snowball
                            .height,
                        finalX: null,
                        finalY: null,
                        value: null,
                        xDirection: null,
                        yDirection: null,
                        type: n
                    };
                    "players" === l
                        ? P.playerSnowballs.push(a)
                        : P.enemySnowballs.push(a);
                    let s = K * i;
                    a.value = a.y,
                    Rt(a, a.x, a.y, 2, s, S, 0, l)
                }, Kt = t => {
                    let e = Math.round(200 * Math.random() / j) * j,
                        i = e,
                        l = Math.round(Math.random());
                    if (0 === l && (e = - e), t.xDirection = l, l = Math.round(Math.random()), 0 === l && (i = - i), t.yDirection = l, t.finalX = t.x + e, t.finalY = t.y + i, a =
                        { x: t.finalX,
                        y: t.finalY
                    }, ! dt(a, {
                        x: 0,
                        y: 0
                    }, {
                        x: 0,
                        y: u.height - C
                            .enemy
                            .walking
                            .height
                    }, {
                        x: u.width - C
                            .enemy
                            .walking
                            .width,
                        y: 0
                    })) 
                        return Kt(t);
                    
                    var a
                }, Ut =() => new Promise(((t, e) => {
                    if (m % U == 0) {
                        let e = !1,
                            i = P.players.length;
                        for (; i--;) {
                            const t = P.players[i];
                            t.x > t.initialX || t.y > t.initialY
                                ? (
                                    t.active =! 1,
                                    t.x = t.x - j,
                                    t.y = t.y - j,
                                    e =! 0,
                                    t.status = "walking" === t.status
                                        ? "walkingAlt"
                                        : "walking"
                                )
                                : (t.active =! 0, t.status = "standing")
                        }
                        e || t(!0)
                    }
                })), jt =() => {
                    let t = P.enemies.length;
                    for (; t--;) {
                        const e = P.enemies[t];
                        Kt(e)
                    }
                    v = !1,
                    z.loading = !1
                }, Gt =() => {
                    if (m % U == 0) {
                        let t = P.enemies.length;
                        for (; t--;) {
                            const e = P.enemies[t];
                            let i = !1;
                            if (e.active) {
                                if (Math.round(e.x) !== e.finalX) {
                                    i = !0;
                                    const t = 0 === e.xDirection
                                        ? - j
                                        : j;
                                    e.x = e.x + t
                                }
                                if (Math.round(e.y) !== e.finalY) {
                                    i = !0;
                                    const t = 0 === e.yDirection
                                        ? - j
                                        : j;
                                    e.y = e.y + t
                                }
                                i
                                    ? e.status = "walking" == e.status
                                        ? "walkingAlt"
                                        : "walking"
                                    : zt(e)
                            }
                        }
                    }
                }, zt = t => {
                    v
                        ? (t.status = "walking", t.active =! 0)
                        : (t.status = "gathering", t.active =! 1, setTimeout((() => {
                            t.status = "cocked"
                        }), 150), setTimeout((() => {
                            t.status = "throwing";
                            const e = Math.round(Math.random() * (.8 * W - 30) + 30);
                            Wt(t.x + 5, t.y, e, "enemies"),
                            setTimeout((() => {
                                t.status = "walking",
                                t.active = !0,
                                Kt(t)
                            }), 500)
                        }), 375))
                }, Jt = t => {
                    if (z.gameOver) {
                        const e = 0 === t
                            ? "victory1"
                            : 1 === t
                                ? "victory2"
                                : "victory3";
                        let i = P.enemies.length;
                        for (; i--;) {
                            const t = P.enemies[i];
                            t.active = !1,
                            t.status = e
                        }
                        2 === t
                            ? t = 0
                            : t++;
                        const l = Math.round(200 * Math.random() + 100);
                        setTimeout((() => {
                            Jt(t)
                        }), l)
                    }
                }, Qt =() => {
                    M && setTimeout((() => {
                        S < W && S++,
                        Qt()
                    }), 30)
                }, Vt =( t, e, i, l, a) => t > i.x && t < i.x + l && e > i.y && e < i.y + a, Zt =( t, e) => {
                    const i = {
                        x: u.width / 2 - 50,
                        y: u.height / 2 - 60
                    };
                    return !(z.gameStarted || !Vt(t, e, i, 100, 40))
                }, $t =( t, e) => {
                    const i = {
                        x: u.width / 2 - 50,
                        y: u.height / 2 - 10
                    };
                    return !(z.gameStarted || !Vt(t, e, i, 100, 30))
                }, te =( t, e) => {
                    const i = {
                        x: u.width / 2 - 50,
                        y: u.height / 2 + 30
                    };
                    return !(z.gameStarted || !Vt(t, e, i, 100, 30))
                }, ee =( t, e) => {
                    const i = {
                        x: .87 *u.width,
                        y: .9 *u.height
                    };
                    return !(! z.gameOver || !Vt(t, e, i, .2 * u.width, .2 * u.height))
                }, ie =() => {
                    u.addEventListener("mousedown", (t => {
                        t.preventDefault(),
                        it(),
                        M = !0,
                        g = (t.clientX - T.x) * k,
                        w = (t.clientY - T.y) * k,
                        z.gameOver && ee(g, w) && (z.selectingDifficulty =! 0, z.gameStarted =! 1),
                        z.gameStarted || (Zt(g, w) && at(1), $t(g, w) && at(2), te(g, w) && at(3)),
                        v || (Qt(), x =(( t, e) => {
                            if (null != P.players) {
                                let i = P.players.length;
                                for (; i--;) {
                                    const l = P.players[i];
                                    if (l.active && t >= l.x && t<=l.x+l.width&&e>= l.y && e <= l.y + l.height) 
                                        return l
                                    
                                }
                                return null
                            }
                        })(g, w), null != x && (x.status = "cocked"))
                    })),
                    window.addEventListener("mouseup", (t => {
                        t.preventDefault(),
                        it(),
                        M = !1,
                        null != x && (Ot(x, null, null, "standing"), Wt(x.x + 5, x.y, S, "players"), x = null),
                        S = 1
                    })),
                    u.addEventListener("mousemove", (t => {
                        t.preventDefault(),
                        it(),
                        A = !0,
                        g = (t.clientX - T.x) * k,
                        w = (t.clientY - T.y) * k,
                        z.gameOver && (
                            ee(g, w)
                                ? O.playColor = "rgba(116,214,128,1)"
                                : O.playColor = "rgba(55,139,41,1)"
                        ),
                        z.gameStarted || (
                            Zt(g, w)
                                ? I.easyColor = "rgba(116,214,128,1)"
                                : I.easyColor = "rgba(55,139,41,1)",
                            $t(g, w)
                                ? I.medColor = "rgba(116,214,128,1)"
                                : I.medColor = "rgba(55,139,41,1)",
                            te(g, w)
                                ? I.hardColar = "rgba(116,214,128,1)"
                                : I.hardColar = "rgba(55,139,41,1)"
                        ),
                        M && null != x && Ot(x, g, w, "cocked")
                    })),
                    window.addEventListener("blur", (() => {
                        f = !0,
                        (() => {
                            let t = D.length;
                            for (; t--;) 
                                D[t].audio.pause()
                            
                        })()
                    })),
                    window.addEventListener("focus", (() => {
                        f = !1,
                        (() => {
                            let t = D.length;
                            for (; t--;) 
                                D[t].audio.play()
                            
                        })()
                    }))
                }}, {}
                ]
    },
    {},
    [1]
);