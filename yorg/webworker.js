const g = (e, r) => {
    if (Array.isArray(e)) return e;
    if (Symbol.iterator in Object(e))
        return (function (e, r) {
            const n = [];
            let o = true,
                t = false,
                a = undefined;
            try {
                for (let s, l = e[Symbol.iterator](); !(o = (s = l.next()).done) && (!r || n.length !== r); o = true) {
                    n.push(s.value);
                }
            } catch (e) {
                (t = true), (a = e);
            } finally {
                try {
                    if (!o && l.return) l.return();
                } finally {
                    if (t) throw a;
                }
            }
            return n;
        })(e, r);
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
};

let l = false;
let E = null;
let R = null;
const s = 3.535;
const r = 1;
const a = [];
const h = "0";
const m = "1";
const y = "2";
const w = 256;
const N = 200;
const b = "_";

const W = (e, r) => (e.codePointAt(r) - w) / 100;

const u = (e) => {
    let r = 0;
    const n = {};
    l && console.log("[WEBWORKER] Parsing nodenet of length", e.length);
    while (r < e.length) {
        if (e[r] !== b) {
            const o = e[r++];
            const t = {};
            while (e[r] !== b && r < e.length) {
                const a = e[r++];
                const s = W(e, r++);
                t[a] = s;
            }
            n[o] = t;
        } else r += 1;
    }
    l && console.log("[WEBWORKER] Parsed net:", n);
    return n;
};

const i = (e) => {
    const t = {};
    let r, n, o;
    for (let a = 0; a < e.length; ) {
        if (e[a] !== b) {
            const s = e[a];
            const l = (n = a++);
            const u = {
                x: (o = e.codePointAt(n) - w) % N,
                y: Math.floor(o / N),
            };
            while (e[a] !== b) {
                const i = e[a++];
                if (i === h) {
                    const c = W(e, a++);
                    u.transporter = {
                        speed: c,
                    };
                } else if (i === y) {
                    const d = [];
                    const f = (r = a++);
                    const v = e.codePointAt(r) - w;
                    for (let p = 0; p < v; ++p) {
                        d.push(e[a++]);
                    }
                    u.consumer = {
                        resources: d,
                    };
                } else {
                    if (i !== m) throw new Error("Invalid component id: " + i);
                    const p = e[a++];
                    const h = W(e, a++);
                    u.emitter = {
                        resource: p,
                        spawnMaxRadius: h,
                    };
                }
            }
            t[s] = u;
        } else a += 1;
    }
    return t;
};

const c = () => Object.create(null);

const I = (e) => {
    if (!R[e]) throw (l && console.log("NODENET:", R, "REQUESTED:", e), new Error("Invalid hash: " + e));
    return R[e];
};

const O = (e, r) => Math.hypot(e.x - r.x, e.y - r.y);

const j = (e, r) => 0 <= e.consumer.resources.indexOf(r);

const x = (e, r, n = null) => {
    if (e === r) return false;
    const o = e.emitter;
    const t = O(e, r);
    if (o && r.transporter && (!n || o.resource === n) && t <= o.spawnMaxRadius) return true;
    if (o && r.consumer && j(r, o.resource) && t <= o.spawnMaxRadius) return true;
    const a = e.transporter;
    return !!(a && r.consumer && (!n || j(r, n)) && t <= s) || !!(a && r.transporter && t <= s);
};

const M = (e) => (e.transporter ? e.transporter.speed : r);

const d = (e, r, n, o) => {
    let u = r;
    let i = 999;
    const c = [];
    while (u !== e && 0 < i--) {
        const d = E[u];
        let f = null;
        let v = 1e20;
        const p = I(u);
        for (const h in d) {
            const m = I(h);
            const g = O(p, m) / ((r = m), (n = M((o = p))), (l = M(r)), p.transporter && (m.consumer || m.emitter) ? n : m.transporter && (p.consumer || p.emitter) ? l : (n + l) / 2);
            const y = n[h] + g;
            if (void 0 === t[h] || t[h] > y) {
                const w = I(h);
                x(p, w, o) && ((t[h] = y), w.transporter && c.push([h, y]), (a = e) !== (s = w) && s.consumer && j(s, a.emitter.resource) && (n[h] = y));
            }
        }
        if (null === f)
            return (
                console.error("Invalid node net, for ", u, "there are no valid children"),
                console.error("- Started from =", R[e]),
                console.error("- Target end =", R[r]),
                console.error(
                    "- Path so far =",
                    c.map(function (e) {
                        return R[e];
                    })
                ),
                console.error("- Current Entity =", R[u]),
                null
            );
        f !== r && f !== e && c.push(f), (u = f);
    }
    return c.reverse();
};

const f = (e, r) => {
    const n = R[r];
    const o = ((e, r) => {
        const n = c();
        n[r] = 0;
        const o = c();
        return (
            ((e, r, n, o) => {
                const t = [
                    [o, 0],
                ];
                while (0 < t.length) {
                    const a = t.pop();
                    const s = g(a, 2);
                    const l = s[0];
                    const u = s[1];
                    const i = E[l];
                    const c = I(l);
                    for (const d in i) {
                        const f = u + i[d];
                        if (void 0 === r[d] || r[d] > f) {
                            const v = I(d);
                            x(c, v, o) && ((r[d] = f), v.transporter && t.push([d, f]), (t = e) !== (a = v) && a.consumer && j(a, t.emitter.resource) && (n[d] = f));
                        }
                    }
                }
            })(e, n, o, r, e.emitter.resource),
            {
                travelDistances: n,
                endNodes: o,
            }
        );
    })(n, r);
    const t = o.travelDistances;
    const a = o.endNodes;
    const s = n.emitter.resource;
    const l = [];
    for (const u in a) {
        const i = d(r, u, t, s);
        i && l.push({
            entity: u,
            stops: i,
        });
    }
    return {
        uid: e,
        hash: r,
        result: l,
    };
};

self.onmessage = (e) => {
    const r = e.data.cmd;
    const n = e.data.payload;
    const o = e.data.jobId;
    if ("setVerboseLevel" === r)
        l = n && console.log("[WEBWORKER] Verbose =", l);
    else if ("onNewNodeNet" === r)
        (l && console.log("[WEBWORKER] Received node net"),
            a.push({
                cmd: "onNewNodeNet",
                jobId: o,
                payload: n,
            }));
    else if ("computeEntity" === r)
        (l && console.log("[WEBWORKER] Request entity computation", n),
            a.push({
                cmd: "computeEntity",
                jobId: o,
                payload: n,
            }));
    else if ("cancelAll" === r)
        ((a = []), l && console.log("[WEBWORKER] Received cancel all"),
            self.postMessage({
                jobId: o,
                sourceCommand: r,
                result: null,
            }));
};

setInterval(() => {
    while (0 < a.length) {
        const e = a.shift();
        l && console.log("Processing", e);
        const r = e.cmd;
        const n = e.jobId;
        const o = e.payload;
        let t = null;
        if ("onNewNodeNet" === r)
            (l && console.log("Storing new node net"),
                (E = u(o.nodeNet)),
                (R = i(o.entities)));
        else if ("computeEntity" === r)
            (l && console.log("computing entity"),
                (t = f(o.ui, o.hash)));
        self.postMessage({
            jobId: n,
            sourceCommand: r,
            result: t,
        });
    }
}, 50);
