(function () {
  "use strict";

  var SVG_NS = "http://www.w3.org/2000/svg";

  // ── Project metadata ────────────────────────────────────────────────────
  // All entries map 1:1 to chip nodes (handgraph).
  var PROJECTS = [
    { id: "nvidia-litl",      glyph: "helix",    label: "Lab-in-the-Loop AI for Life Sciences",href: "projects/nvidia-litl.html",          tone: 3 },
    { id: "betting-kernels",  glyph: "stats",    label: "Statistics for ML",                   href: "projects/betting-kernels.html",      tone: 1 },
    { id: "aim-medical",      glyph: "leaf",     label: "Foundation Models for Life Sciences", href: "projects/aim-medical.html",          tone: 3 },
    { id: "caisi",            glyph: "tau",      label: "Mech Interp · Neurodegeneration",     href: "projects/caisi.html",                tone: 2 },
    { id: "nasa-lspace",      glyph: "atom",     label: "Density Functional Theory",           href: "projects/nasa-lspace.html",          tone: 4 },
    { id: "aws-neurips",      glyph: "chip",     label: "Electrical Engineering for AI",       href: "projects/aws-neurips.html",          tone: 1 },
    { id: "polymer",          glyph: "polymer",  label: "Polymer Sciences",                    href: "projects/polymer.html",              tone: 3 },
    { id: "materials-design", glyph: "lattice",  label: "PFAS Destruction Chemistry",          href: "projects/materials-design.html",     tone: 2 },
    { id: "molecular-sims",   glyph: "molecule", label: "Molecular Simulations and Modeling",  href: "projects/molecular-simulations.html",tone: 4 },
  ];

  function el(tag, attrs) {
    var e = document.createElementNS(SVG_NS, tag);
    if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }

  function makeIcon(glyph) {
    var f = document.createDocumentFragment();
    if (glyph === "tau") {
      var t = el("text", { class: "c-icon", y: 1 }); t.textContent = "τ"; f.appendChild(t);
    } else if (glyph === "stats") {
      // Gaussian bell curve sitting on an x-axis (statistics)
      f.appendChild(el("path", { class: "c-icon-path", d: "M-11,6 L11,6" }));
      f.appendChild(el("path", { class: "c-icon-path", d: "M-11,6 Q-7,6 -5,1 Q-2,-7 0,-7 Q2,-7 5,1 Q7,6 11,6" }));
    } else if (glyph === "leaf") {
      // Leaf with central vein (life sciences)
      f.appendChild(el("path", { class: "c-icon-path", d: "M0,-10 Q9,-3 5,5 Q0,10 -5,5 Q-9,-3 0,-10 Z" }));
      f.appendChild(el("path", { class: "c-icon-path", d: "M0,-9 L0,9" }));
    } else if (glyph === "atom") {
      // Nucleus + 3 orbital ellipses (DFT / quantum)
      f.appendChild(el("circle", { class: "c-icon-dot", cx: 0, cy: 0, r: 2 }));
      f.appendChild(el("ellipse", { class: "c-icon-path", cx: 0, cy: 0, rx: 10, ry: 3.6 }));
      f.appendChild(el("ellipse", { class: "c-icon-path", cx: 0, cy: 0, rx: 10, ry: 3.6, transform: "rotate(60)" }));
      f.appendChild(el("ellipse", { class: "c-icon-path", cx: 0, cy: 0, rx: 10, ry: 3.6, transform: "rotate(-60)" }));
    } else if (glyph === "chip") {
      // IC chip with 8 pins (electrical engineering)
      f.appendChild(el("rect", { class: "c-icon-path", x: -6.5, y: -6.5, width: 13, height: 13, rx: 1 }));
      [-3, 3].forEach(function (p) {
        f.appendChild(el("line", { class: "c-icon-path", x1: -10, y1: p, x2: -6.5, y2: p }));
        f.appendChild(el("line", { class: "c-icon-path", x1: 6.5, y1: p, x2: 10, y2: p }));
        f.appendChild(el("line", { class: "c-icon-path", x1: p, y1: -10, x2: p, y2: -6.5 }));
        f.appendChild(el("line", { class: "c-icon-path", x1: p, y1: 6.5, x2: p, y2: 10 }));
      });
      f.appendChild(el("circle", { class: "c-icon-dot", cx: -3, cy: -3, r: 1 }));
    } else if (glyph === "polymer") {
      // Zigzag chain of monomers (polymer sciences)
      f.appendChild(el("polyline", { class: "c-icon-path", points: "-10,-3 -6,3 -2,-3 2,3 6,-3 10,3", fill: "none" }));
      [[-10,-3],[-6,3],[-2,-3],[2,3],[6,-3],[10,3]].forEach(function (p) {
        f.appendChild(el("circle", { class: "c-icon-dot", cx: p[0], cy: p[1], r: 1.8 }));
      });
    } else if (glyph === "lattice") {
      // 3x3 crystal lattice (materials design)
      [-7,0,7].forEach(function (x) {
        [-7,0,7].forEach(function (y) {
          f.appendChild(el("circle", { class: "c-icon-dot", cx: x, cy: y, r: 1.6 }));
        });
      });
      [-7,0,7].forEach(function (v) {
        f.appendChild(el("line", { class: "c-icon-path", x1: -7, y1: v, x2: 7, y2: v }));
        f.appendChild(el("line", { class: "c-icon-path", x1: v, y1: -7, x2: v, y2: 7 }));
      });
    } else if (glyph === "molecule") {
      // Tetrahedral molecule (molecular simulations)
      f.appendChild(el("circle", { class: "c-icon-dot", cx: 0, cy: 0, r: 2.5 }));
      [[-7,-6],[7,-6],[-6,7],[6,7]].forEach(function (p) {
        f.appendChild(el("line", { class: "c-icon-path", x1: 0, y1: 0, x2: p[0], y2: p[1] }));
        f.appendChild(el("circle", { class: "c-icon-dot", cx: p[0], cy: p[1], r: 1.7 }));
      });
    } else if (glyph === "helix") {
      // Double helix (bio / lab-in-the-loop): two sine strands + base-pair rungs
      f.appendChild(el("path", { class: "c-icon-path", d: "M-9,-10 C-3,-7 3,-7 9,-10 C3,-3 -3,-3 -9,4 C-3,7 3,7 9,4 C3,10 -3,10 -9,10" }));
      f.appendChild(el("path", { class: "c-icon-path", d: "M9,-10 C3,-7 -3,-7 -9,-10 C-3,-3 3,-3 9,4 C-3,7 3,7 -9,4 C3,10 -3,10 9,10" }));
      [-6, -2, 2, 6].forEach(function (y) {
        f.appendChild(el("line", { class: "c-icon-path", x1: -5, y1: y, x2: 5, y2: y }));
      });
    } else if (glyph === "D") {
      var td = el("text", { class: "c-icon", y: 2, style: "font-family:Fraunces,serif;font-style:italic;" }); td.textContent = "D";
      f.appendChild(td);
    }
    return f;
  }

  // Resolve hrefs based on whether the current page is at root or in projects/
  function resolveHref(href) {
    if (!href) return null;
    if (href.charAt(0) === "/" || href.indexOf("://") !== -1 || href.charAt(0) === "#") return href;
    var inSubdir = /\/projects\//.test(location.pathname);
    return inSubdir ? "../" + href : href;
  }

  // ───────────────────────────────────────────────────────────────────────
  // CHIP - symmetric electrical-chip animation (re-usable on every page)
  // ───────────────────────────────────────────────────────────────────────
  function initChip(svg, labelEl) {
    if (!svg) return;

    // 8-node bilateral-symmetric layout: top + UL/UR + LL/LR + BL/BR + hub
    // PROJECTS[0..6] map to N0..N4, N6, N7 (skipping hub index 5)
    var NODES = [
      { x: 200, y:  38, proj: PROJECTS[0] },  // N0  top    - Betting
      { x:  85, y:  95, proj: PROJECTS[1] },  // N1  UL     - AIM Medical
      { x: 315, y:  95, proj: PROJECTS[2] },  // N2  UR     - CAISI
      { x:  85, y: 220, proj: PROJECTS[3] },  // N3  LL     - NASA L'SPACE
      { x: 315, y: 220, proj: PROJECTS[4] },  // N4  LR     - AWS NeurIPS
      { x: 200, y: 158, proj: { id: "diya", glyph: "D", label: "Diya Sreedhar", href: null } }, // N5 hub
      { x: 138, y: 285, proj: PROJECTS[5] },  // N6  BL     - ISEF / JSHS
      { x: 262, y: 285, proj: PROJECTS[6] },  // N7  BR     - Entrepreneurship
    ];

    // Edge types: 'h'=horizontal, 'v'=vertical, 'hv'=horiz-then-vert, 'vh'=vert-then-horiz
    var EDGES = [
      // 7 hub spokes
      { from: 0, to: 5, type: "v"  },   // top  → hub
      { from: 1, to: 5, type: "hv" },   // UL   → hub
      { from: 2, to: 5, type: "hv" },   // UR   → hub
      { from: 3, to: 5, type: "hv" },   // LL   → hub
      { from: 4, to: 5, type: "hv" },   // LR   → hub
      { from: 6, to: 5, type: "vh" },   // BL   → hub
      { from: 7, to: 5, type: "vh" },   // BR   → hub
      // perimeter buses
      { from: 1, to: 2, type: "h"  },   // upper horizontal
      { from: 3, to: 4, type: "h"  },   // mid-lower horizontal
      { from: 6, to: 7, type: "h"  },   // bottom horizontal
      { from: 1, to: 3, type: "v"  },   // left vertical bus
      { from: 2, to: 4, type: "v"  },   // right vertical bus
      // top corners (mechinterp-anchored)
      { from: 0, to: 1, type: "vh" },
      { from: 0, to: 2, type: "vh" },
      // bottom corners
      { from: 6, to: 3, type: "vh" },
      { from: 7, to: 4, type: "vh" },
    ];

    // Adjacency
    var ADJ = NODES.map(function () { return { edges: [] }; });
    EDGES.forEach(function (e, i) { ADJ[e.from].edges.push(i); ADJ[e.to].edges.push(i); });

    // Layers
    var gGrid   = el("g", { class: "chip-grid" });
    var gPads   = el("g", { class: "chip-pads" });
    var gTraces = el("g", { class: "chip-traces" });
    var gVias   = el("g", { class: "chip-vias" });
    var gPulses = el("g", { class: "chip-pulses" });
    var gNodes  = el("g", { class: "chip-nodes" });
    svg.appendChild(gGrid);
    svg.appendChild(gPads);
    svg.appendChild(gTraces);
    svg.appendChild(gVias);
    svg.appendChild(gPulses);
    svg.appendChild(gNodes);

    // Background grid
    for (var x = 20; x < 400; x += 20) {
      gGrid.appendChild(el("line", { x1: x, y1: 0, x2: x, y2: 320, class: "chip-grid-line" }));
    }
    for (var y = 20; y < 320; y += 20) {
      gGrid.appendChild(el("line", { x1: 0, y1: y, x2: 400, y2: y, class: "chip-grid-line" }));
    }

    // IC pads - symmetric pairs along left/right edges
    [50, 110, 165, 220, 280].forEach(function (py) {
      gPads.appendChild(el("rect", { x: -10, y: py - 4, width: 14, height: 8, rx: 1.5, class: "chip-pad" }));
      gPads.appendChild(el("rect", { x: 396, y: py - 4, width: 14, height: 8, rx: 1.5, class: "chip-pad" }));
    });

    // Build paths
    function buildD(e) {
      var a = NODES[e.from], b = NODES[e.to];
      if (e.type === "h" || e.type === "v") return "M" + a.x + "," + a.y + " L" + b.x + "," + b.y;
      if (e.type === "hv") return "M" + a.x + "," + a.y + " L" + b.x + "," + a.y + " L" + b.x + "," + b.y;
      return "M" + a.x + "," + a.y + " L" + a.x + "," + b.y + " L" + b.x + "," + b.y;
    }
    function cornerOf(e) {
      var a = NODES[e.from], b = NODES[e.to];
      if (e.type === "hv") return [b.x, a.y];
      if (e.type === "vh") return [a.x, b.y];
      return null;
    }

    EDGES.forEach(function (e) {
      var path = el("path", { d: buildD(e), class: "chip-trace" });
      gTraces.appendChild(path);
      var c = cornerOf(e);
      if (c) gVias.appendChild(el("circle", { cx: c[0], cy: c[1], r: 2.2, class: "chip-via" }));
      e.pathEl = path;
      e.length = path.getTotalLength();
    });

    // Pulses
    var PULSES = [];
    EDGES.forEach(function (e, i) {
      for (var p = 0; p < 2; p++) {
        var dot = el("circle", { r: 2.3, class: "chip-pulse" });
        gPulses.appendChild(dot);
        PULSES.push({
          edge: e, el: dot,
          offset: (p / 2 + i * 0.137) % 1,
          speed: 0.00020 + Math.random() * 0.00010,
        });
      }
    });

    // Nodes - square rounded-rect components
    NODES.forEach(function (n) {
      var g = el("g", { class: "c-node-g chip-node", transform: "translate(" + n.x + "," + n.y + ")" });
      var size = 16;
      var halo = el("circle", { class: "chip-node-halo", r: size + 4 });
      g.appendChild(halo);
      g.appendChild(el("rect", {
        class: "c-node-bg chip-node-bg",
        x: -size, y: -size, width: 2 * size, height: 2 * size, rx: 4,
      }));
      g.appendChild(makeIcon(n.proj.glyph));
      gNodes.appendChild(g);
      n.el = g;
      n.haloEl = halo;
    });

    // ── Hover: highlight incident edges, dim the rest ──────────────────────
    var defaultLabel = labelEl ? labelEl.textContent : "";
    if (labelEl) labelEl.dataset.defaultLabel = defaultLabel;

    function setHighlight(idx) {
      EDGES.forEach(function (e) { e.pathEl.classList.remove("is-active", "is-dim"); });
      NODES.forEach(function (n) { n.el.classList.remove("is-active", "is-dim"); });
      PULSES.forEach(function (p) { p.el.classList.remove("is-dim"); });
      if (idx == null) return;
      var related = new Set([idx]);
      ADJ[idx].edges.forEach(function (ei) {
        EDGES[ei].pathEl.classList.add("is-active");
        related.add(EDGES[ei].from); related.add(EDGES[ei].to);
      });
      NODES[idx].el.classList.add("is-active");
      EDGES.forEach(function (e) { if (!e.pathEl.classList.contains("is-active")) e.pathEl.classList.add("is-dim"); });
      NODES.forEach(function (n, i) { if (!related.has(i)) n.el.classList.add("is-dim"); });
      PULSES.forEach(function (p) { if (p.edge.pathEl.classList.contains("is-dim")) p.el.classList.add("is-dim"); });
    }

    NODES.forEach(function (n, i) {
      n.el.setAttribute("tabindex", "0");
      n.el.setAttribute("role", "link");
      if (n.proj.label) n.el.setAttribute("aria-label", n.proj.label);

      n.el.addEventListener("mouseenter", function () {
        setHighlight(i);
        if (labelEl && n.proj.label) labelEl.textContent = n.proj.label;
      });
      n.el.addEventListener("mouseleave", function () {
        setHighlight(null);
        if (labelEl) labelEl.textContent = defaultLabel;
      });
      n.el.addEventListener("focus", function () {
        setHighlight(i);
        if (labelEl && n.proj.label) labelEl.textContent = n.proj.label;
      });
      n.el.addEventListener("blur", function () {
        setHighlight(null);
        if (labelEl) labelEl.textContent = defaultLabel;
      });
      if (n.proj.href) {
        n.el.addEventListener("click", function () {
          var h = resolveHref(n.proj.href);
          if (!h) return;
          if (h.charAt(0) === "#") {
            var t = document.querySelector(h); if (t) t.scrollIntoView({ behavior: "smooth" });
          } else {
            window.location.href = h;
          }
        });
        n.el.addEventListener("keydown", function (ev) {
          if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); n.el.dispatchEvent(new MouseEvent("click")); }
        });
      }
    });

    // ── Activation wave: every ~6s, BFS from a random node ────────────────
    var waveActive = false;
    function fireWave() {
      if (waveActive) return;
      waveActive = true;
      var start = Math.floor(Math.random() * NODES.length);
      var visited = new Set([start]);
      var frontier = [{ idx: start, delay: 0 }];
      while (frontier.length) {
        var next = [];
        frontier.forEach(function (f) {
          setTimeout(function () {
            NODES[f.idx].haloEl.classList.add("chip-firing");
            setTimeout(function () { NODES[f.idx].haloEl.classList.remove("chip-firing"); }, 700);
          }, f.delay);
          ADJ[f.idx].edges.forEach(function (ei) {
            var e = EDGES[ei];
            var nb = (e.from === f.idx) ? e.to : e.from;
            if (!visited.has(nb)) {
              visited.add(nb);
              next.push({ idx: nb, delay: f.delay + 380 + Math.random() * 180 });
            }
          });
        });
        frontier = next;
      }
      setTimeout(function () { waveActive = false; }, 4000);
    }
    setTimeout(fireWave, 900);
    setInterval(fireWave, 6500);

    // ── Pulse loop ─────────────────────────────────────────────────────────
    var startTime = performance.now();
    function tick(now) {
      var elapsed = now - startTime;
      for (var i = 0; i < PULSES.length; i++) {
        var p = PULSES[i];
        var t = (elapsed * p.speed + p.offset) % 1;
        if (t < 0) t += 1;
        var pt = p.edge.pathEl.getPointAtLength(t * p.edge.length);
        p.el.setAttribute("cx", pt.x.toFixed(2));
        p.el.setAttribute("cy", pt.y.toFixed(2));
        var alpha = Math.min(1, t * 8, (1 - t) * 8);
        p.el.setAttribute("opacity", alpha.toFixed(3));
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // ───────────────────────────────────────────────────────────────────────
  // ALTERNATIVE HOMEPAGE ANIMATIONS (candidates)
  // ───────────────────────────────────────────────────────────────────────

  function attachNodeHandlers(g, proj, labelEl) {
    var defaultLabel = labelEl ? (labelEl.dataset.defaultLabel || labelEl.textContent) : "";
    if (labelEl) labelEl.dataset.defaultLabel = defaultLabel;
    g.setAttribute("tabindex", "0");
    g.setAttribute("role", "link");
    if (proj.label) g.setAttribute("aria-label", proj.label);
    if (proj.label) {
      g.addEventListener("mouseenter", function () { if (labelEl) labelEl.textContent = proj.label; });
      g.addEventListener("mouseleave", function () { if (labelEl) labelEl.textContent = defaultLabel; });
      g.addEventListener("focus",      function () { if (labelEl) labelEl.textContent = proj.label; });
      g.addEventListener("blur",       function () { if (labelEl) labelEl.textContent = defaultLabel; });
    }
    if (proj.href) {
      g.addEventListener("click", function () {
        var h = resolveHref(proj.href);
        if (h.charAt(0) === "#") {
          var t = document.querySelector(h); if (t) t.scrollIntoView({ behavior: "smooth" });
        } else { window.location.href = h; }
      });
      g.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); g.dispatchEvent(new MouseEvent("click")); }
      });
    }
  }

  // ── A. ORBITAL SYSTEM ────────────────────────────────────────────────────
  function initOrbital(svg, labelEl) {
    if (!svg) return;
    var CX = 200, CY = 160;
    var projects = PROJECTS.slice(0, 7);

    var orbits = projects.map(function (p, i) {
      var a = 58 + i * 13;
      var e = 0.18 + (i % 3) * 0.08;
      var tilt = (i * 51.43 + (i % 2 ? 22 : 0)) * Math.PI / 180;
      return {
        proj: p,
        a: a,
        b: a * Math.sqrt(1 - e * e),
        tilt: tilt,
        phase: (i / 7) * Math.PI * 2,
        speed: 0.00050 / Math.sqrt(a / 80),
      };
    });

    var gOrbits = el("g", { class: "orb-orbits" });
    var gNodes  = el("g");
    svg.appendChild(gOrbits);

    orbits.forEach(function (o) {
      gOrbits.appendChild(el("ellipse", {
        cx: CX, cy: CY, rx: o.a, ry: o.b,
        transform: "rotate(" + (o.tilt * 180 / Math.PI).toFixed(2) + " " + CX + " " + CY + ")",
        class: "orb-orbit",
      }));
    });

    // Hub
    var hubG = el("g", { class: "c-node-g orb-node orb-hub", transform: "translate(" + CX + "," + CY + ")" });
    hubG.appendChild(el("circle", { class: "orb-hub-glow", r: 22 }));
    hubG.appendChild(el("rect", { class: "orb-node-bg", x: -14, y: -14, width: 28, height: 28, rx: 4 }));
    hubG.appendChild(makeIcon("D"));
    svg.appendChild(hubG);

    svg.appendChild(gNodes);
    orbits.forEach(function (o) {
      var g = el("g", { class: "c-node-g orb-node" });
      g.appendChild(el("rect", { class: "orb-node-bg", x: -13, y: -13, width: 26, height: 26, rx: 4 }));
      g.appendChild(makeIcon(o.proj.glyph));
      gNodes.appendChild(g);
      o.el = g;
      attachNodeHandlers(g, o.proj, labelEl);
    });

    var lastT = performance.now();
    function tick(now) {
      var dt = now - lastT; lastT = now;
      orbits.forEach(function (o) {
        o.phase = (o.phase + o.speed * dt) % (Math.PI * 2);
        var cos = Math.cos(o.phase), sin = Math.sin(o.phase);
        var x = o.a * cos, y = o.b * sin;
        var tc = Math.cos(o.tilt), ts = Math.sin(o.tilt);
        var px = CX + x * tc - y * ts;
        var py = CY + x * ts + y * tc;
        o.el.setAttribute("transform", "translate(" + px.toFixed(2) + "," + py.toFixed(2) + ")");
      });
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // ── B. HAND-DRAWN KNOWLEDGE GRAPH (with jitter-on-hover + draw-in + equations) ──
  function initHandGraph(svg, labelEl) {
    if (!svg) return;

    var isFull = !svg.classList.contains("hd-mini");

    // Subtle filter for equation marginalia only - everything else stays crisp
    var sid = "sk-" + Math.random().toString(36).slice(2, 8);
    var defs = el("defs");
    defs.innerHTML =
      '<filter id="' + sid + '" x="-5%" y="-5%" width="110%" height="110%">' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves="2" seed="3"/>' +
        '<feDisplacementMap in="SourceGraphic" scale="1.4"/>' +
      '</filter>';
    svg.appendChild(defs);

    // 8 research projects arranged around an octagon
    var projects = PROJECTS.slice(0, 8);

    var positions = [
      { x: 200, y:  55, proj: projects[0] },  // N   - Statistics
      { x: 290, y: 100, proj: projects[1] },  // NE  - Foundation Models
      { x: 340, y: 165, proj: projects[2] },  // E   - Mech Interp
      { x: 290, y: 230, proj: projects[3] },  // SE  - DFT
      { x: 200, y: 280, proj: projects[4] },  // S   - EE
      { x: 110, y: 230, proj: projects[5] },  // SW  - Polymer
      { x:  60, y: 165, proj: projects[6] },  // W   - Materials
      { x: 110, y: 100, proj: projects[7] },  // NW  - Mol Sims
    ];

    // 8 perimeter edges - the octagon outline (clean, no diameters anymore)
    var edges = [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0],
    ];

    var CX = 200, CY = 165;

    // ── Decorative background rays from center ───────────────────────────
    var RAYS = 18;
    var R_INNER = 30, R_OUTER = 142;
    var gRays = el("g", { class: "hd-rays" });
    for (var ri = 0; ri < RAYS; ri++) {
      var ang = (ri / RAYS) * Math.PI * 2 - Math.PI / 2;
      var x1 = CX + Math.cos(ang) * R_INNER;
      var y1 = CY + Math.sin(ang) * R_INNER;
      var x2 = CX + Math.cos(ang) * R_OUTER;
      var y2 = CY + Math.sin(ang) * R_OUTER;
      gRays.appendChild(el("line", {
        x1: x1.toFixed(1), y1: y1.toFixed(1),
        x2: x2.toFixed(1), y2: y2.toFixed(1),
        class: "hd-ray",
      }));
    }
    svg.appendChild(gRays);

    // ── Hub spokes - clean dashed lines from center to each node ─────────
    var gSpokes = el("g", { class: "hd-spokes" });
    positions.forEach(function (p) {
      gSpokes.appendChild(el("line", {
        x1: CX, y1: CY, x2: p.x, y2: p.y,
        class: "hd-spoke",
      }));
    });
    svg.appendChild(gSpokes);

    // ── Center dot (visual anchor) ────────────────────────────────────────
    svg.appendChild(el("circle", { cx: CX, cy: CY, r: 3, class: "hd-center" }));

    var gEdges = el("g", { class: "hd-edges" });
    svg.appendChild(gEdges);

    var edgePaths = [];
    edges.forEach(function (pair) {
      var A = positions[pair[0]], B = positions[pair[1]];
      // Slight curve for organic feel, but no turbulence filter - clean lines
      var dx = B.x - A.x, dy = B.y - A.y;
      var len = Math.sqrt(dx * dx + dy * dy);
      var off = (Math.random() - 0.5) * 8;
      var cx = (A.x + B.x) / 2 + (-dy / len) * off;
      var cy = (A.y + B.y) / 2 + (dx / len) * off;
      var path = el("path", {
        d: "M" + A.x + "," + A.y + " Q" + cx.toFixed(1) + "," + cy.toFixed(1) + " " + B.x + "," + B.y,
        class: "hd-edge",
      });
      gEdges.appendChild(path);
      edgePaths.push({ el: path, a: pair[0], b: pair[1] });
    });

    // Nodes
    var gNodes = el("g");
    svg.appendChild(gNodes);
    var nodeData = [];
    positions.forEach(function (p, i) {
      var toneClass = " tone-" + (p.proj.tone || 1);
      var g = el("g", { class: "c-node-g hd-node" + toneClass, transform: "translate(" + p.x + "," + p.y + ")" });

      // Three pulse rings (rendered first → behind everything)
      var pulses = [];
      for (var pi = 0; pi < 3; pi++) {
        var pulse = el("circle", { class: "hd-pulse hd-pulse-" + (pi + 1), r: 15 });
        g.appendChild(pulse);
        pulses.push(pulse);
      }

      var circle = el("circle", { class: "hd-node-bg", r: 15 });
      g.appendChild(circle);
      g.appendChild(makeIcon(p.proj.glyph));
      gNodes.appendChild(g);
      nodeData.push({ el: g, circle: circle });

      // Highlight incident edges on hover (no more filter swap)
      g.addEventListener("mouseenter", function () {
        edgePaths.forEach(function (e) {
          if (e.a === i || e.b === i) e.el.classList.add("is-related");
        });
      });
      g.addEventListener("mouseleave", function () {
        edgePaths.forEach(function (e) {
          if (e.a === i || e.b === i) e.el.classList.remove("is-related");
        });
      });

      if (p.proj.href !== null) attachNodeHandlers(g, p.proj, labelEl);
    });

    // ── Draw-in animation ─────────────────────────────────────────────────
    var edgeStagger = isFull ? 90 : 55;
    var edgeDur     = isFull ? 720 : 520;
    edgePaths.forEach(function (e, i) {
      var L = e.el.getTotalLength();
      e.el.style.strokeDasharray  = L + "px";
      e.el.style.strokeDashoffset = L + "px";
      setTimeout(function () {
        e.el.style.transition = "stroke-dashoffset " + edgeDur + "ms cubic-bezier(0.22, 0.61, 0.36, 1)";
        e.el.style.strokeDashoffset = "0px";
      }, 120 + i * edgeStagger);
    });

    nodeData.forEach(function (n, i) {
      var circ = 2 * Math.PI * 15;
      n.circle.style.strokeDasharray  = circ + "px";
      n.circle.style.strokeDashoffset = circ + "px";
      n.el.style.opacity = "0";
      setTimeout(function () {
        n.el.style.transition = "opacity 280ms ease-out";
        n.el.style.opacity = "1";
        n.circle.style.transition = "stroke-dashoffset 420ms ease-out";
        n.circle.style.strokeDashoffset = "0px";
      }, 120 + edgePaths.length * edgeStagger + i * 70);
    });

  }

  // ─── helpers shared by the new candidate animations ────────────────────
  function _mkAnimNode(proj, labelEl, radius) {
    radius = radius || 15;
    var g = el("g", { class: "c-node-g hd-node tone-" + (proj.tone || 1) });
    for (var pi = 0; pi < 3; pi++) {
      g.appendChild(el("circle", { class: "hd-pulse hd-pulse-" + (pi + 1), r: radius }));
    }
    g.appendChild(el("circle", { class: "hd-node-bg", r: radius }));
    g.appendChild(makeIcon(proj.glyph));
    attachNodeHandlers(g, proj, labelEl);
    return g;
  }
  function _ease(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

  // ── CANDIDATE A - Drifting closed ring (akilan-ish but original) ───────
  // 8 nodes on a closed loop whose radius varies around the boundary -
  // the loop slowly shifts which "bumps" are out, producing organic flow.
  function initDriftRing(svg, labelEl) {
    if (!svg) return;
    var projects = PROJECTS.slice(0, 8);
    var CX = 200, CY = 165, R = 108, N = 8;

    var outline = el("polygon", { class: "morph-outline" });
    svg.appendChild(outline);

    var nodes = projects.map(function (p) { var g = _mkAnimNode(p, labelEl); svg.appendChild(g); return g; });

    function pointAt(t, time) {
      var a = 2 * Math.PI * t - Math.PI / 2;
      var r = R + Math.sin(a * 3 + time * 0.0007) * 14 + Math.cos(a * 5 - time * 0.0004) * 6;
      return [CX + r * Math.cos(a), CY + r * Math.sin(a)];
    }

    var SAMPLES = 96;
    function tick(now) {
      var pts = "";
      for (var k = 0; k < SAMPLES; k++) {
        var p = pointAt(k / SAMPLES, now);
        pts += p[0].toFixed(1) + "," + p[1].toFixed(1) + " ";
      }
      outline.setAttribute("points", pts);
      for (var i = 0; i < N; i++) {
        var np = pointAt(i / N, now);
        nodes[i].setAttribute("transform", "translate(" + np[0].toFixed(2) + "," + np[1].toFixed(2) + ")");
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // ── CANDIDATE B - Slow rotation + breathing radius ─────────────────────
  function initBreathingRing(svg, labelEl) {
    if (!svg) return;
    var projects = PROJECTS.slice(0, 9);
    var CX = 200, CY = 165, BASE_R = 108, N = 9;

    var outline = el("polygon", { class: "morph-outline" });
    svg.appendChild(outline);

    var nodes = projects.map(function (p, i) {
      var g = _mkAnimNode(p, labelEl);
      svg.appendChild(g);
      return { el: g, baseAngle: (i / N) * Math.PI * 2 - Math.PI / 2 };
    });

    var t0 = performance.now();
    function tick(now) {
      var t = (now - t0) / 1000;
      var rot = t * 0.16;                // ~9°/s
      var breath = 1 + Math.sin(t * 0.85) * 0.07; // 7% radius
      var R = BASE_R * breath;
      var pts = "";
      nodes.forEach(function (n) {
        var a = n.baseAngle + rot;
        var x = CX + R * Math.cos(a);
        var y = CY + R * Math.sin(a);
        n.el.setAttribute("transform", "translate(" + x.toFixed(2) + "," + y.toFixed(2) + ")");
        pts += x.toFixed(1) + "," + y.toFixed(1) + " ";
      });
      outline.setAttribute("points", pts);
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // ── CANDIDATE C - Counter-rotating concentric rings ────────────────────
  function initCounterRings(svg, labelEl) {
    if (!svg) return;
    var projects = PROJECTS.slice(0, 8);
    var CX = 200, CY = 165;
    var R_OUTER = 128, R_INNER = 64;

    // Outline rings (faint circle guides)
    svg.appendChild(el("circle", { cx: CX, cy: CY, r: R_OUTER, class: "morph-outline" }));
    svg.appendChild(el("circle", { cx: CX, cy: CY, r: R_INNER, class: "morph-outline" }));

    var outer = [], inner = [];
    projects.forEach(function (p, i) {
      var g = _mkAnimNode(p, labelEl, 14);
      svg.appendChild(g);
      var localIdx = i % 4;
      var ring = i < 4 ? outer : inner;
      ring.push({ el: g, baseAngle: (localIdx / 4) * Math.PI * 2 - Math.PI / 2 });
    });

    var t0 = performance.now();
    function tick(now) {
      var t = (now - t0) / 1000;
      var rotOuter =  t * 0.18;
      var rotInner = -t * 0.28;
      outer.forEach(function (n) {
        var a = n.baseAngle + rotOuter;
        n.el.setAttribute("transform", "translate(" + (CX + R_OUTER * Math.cos(a)).toFixed(2) + "," + (CY + R_OUTER * Math.sin(a)).toFixed(2) + ")");
      });
      inner.forEach(function (n) {
        var a = n.baseAngle + rotInner;
        n.el.setAttribute("transform", "translate(" + (CX + R_INNER * Math.cos(a)).toFixed(2) + "," + (CY + R_INNER * Math.sin(a)).toFixed(2) + ")");
      });
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // ── C. PHASE PORTRAIT ───────────────────────────────────────────────────
  function initPhasePortrait(svg, labelEl) {
    if (!svg) return;
    var W = 400, H = 320;
    var projects = PROJECTS.slice(0, 7);

    var attractors = [
      { x: 200, y:  55, proj: projects[0] },
      { x:  85, y: 110, proj: projects[1] },
      { x: 315, y: 110, proj: projects[2] },
      { x: 200, y: 165, proj: { glyph: "D", label: "Diya Sreedhar", href: null } },
      { x:  85, y: 225, proj: projects[3] },
      { x: 315, y: 225, proj: projects[4] },
      { x: 130, y: 280, proj: projects[5] },
      { x: 270, y: 280, proj: projects[6] },
    ];

    function fieldAt(x, y) {
      var fx = 0, fy = 0;
      for (var i = 0; i < attractors.length; i++) {
        var a = attractors[i];
        var dx = a.x - x, dy = a.y - y;
        var r2 = dx * dx + dy * dy + 80;
        fx += dx / r2;
        fy += dy / r2;
      }
      return [fx, fy];
    }

    // Faint background arrows
    var gField = el("g", { class: "pp-field" });
    var GRID = 24;
    for (var gx = GRID / 2; gx < W; gx += GRID) {
      for (var gy = GRID / 2; gy < H; gy += GRID) {
        var f = fieldAt(gx, gy);
        var mag = Math.hypot(f[0], f[1]);
        if (mag < 1e-6) continue;
        var L = 5;
        var nx = f[0] / mag * L, ny = f[1] / mag * L;
        gField.appendChild(el("line", {
          x1: (gx - nx / 2).toFixed(1), y1: (gy - ny / 2).toFixed(1),
          x2: (gx + nx / 2).toFixed(1), y2: (gy + ny / 2).toFixed(1),
          class: "pp-arrow",
        }));
      }
    }
    svg.appendChild(gField);

    // Tracer streamlines
    var gTracers = el("g", { class: "pp-tracers" });
    svg.appendChild(gTracers);
    var TRACERS = 22;
    var tracers = [];
    function spawn(t) {
      t.x = Math.random() * W;
      t.y = Math.random() * H;
      t.trail = [];
      t.age = 0;
      t.maxAge = 180 + Math.random() * 120;
    }
    for (var i = 0; i < TRACERS; i++) {
      var t = { polyline: el("polyline", { class: "pp-trail", fill: "none" }) };
      gTracers.appendChild(t.polyline);
      spawn(t);
      tracers.push(t);
    }

    // Project nodes
    var gNodes = el("g");
    svg.appendChild(gNodes);
    attractors.forEach(function (a) {
      var g = el("g", { class: "c-node-g pp-node", transform: "translate(" + a.x + "," + a.y + ")" });
      g.appendChild(el("circle", { class: "pp-node-halo", r: 18 }));
      g.appendChild(el("rect", { class: "pp-node-bg", x: -12, y: -12, width: 24, height: 24, rx: 4 }));
      g.appendChild(makeIcon(a.proj.glyph));
      gNodes.appendChild(g);
      if (a.proj.href !== null) attachNodeHandlers(g, a.proj, labelEl);
    });

    function tick() {
      tracers.forEach(function (t) {
        var f = fieldAt(t.x, t.y);
        var mag = Math.hypot(f[0], f[1]);
        if (mag > 1e-6) {
          t.x += f[0] / mag * 0.8;
          t.y += f[1] / mag * 0.8;
        }
        t.trail.push([t.x, t.y]);
        if (t.trail.length > 36) t.trail.shift();
        t.age++;
        var nearest = Infinity;
        attractors.forEach(function (a) {
          var d = Math.hypot(a.x - t.x, a.y - t.y);
          if (d < nearest) nearest = d;
        });
        if (nearest < 9 || t.age > t.maxAge || t.x < -5 || t.x > W + 5 || t.y < -5 || t.y > H + 5) {
          spawn(t);
        }
        t.polyline.setAttribute("points", t.trail.map(function (p) { return p[0].toFixed(1) + "," + p[1].toFixed(1); }).join(" "));
      });
      requestAnimationFrame(tick);
    }
    tick();
  }

  // ───────────────────────────────────────────────────────────────────────
  // PER-PROJECT ANIMATIONS - small thematic widgets
  // ───────────────────────────────────────────────────────────────────────

  // Multimodal fusion (AIM Medical)
  function initMultimodalFusion(svg) {
    if (!svg) return;
    var W = 320, H = 240;
    var inputs = [
      { y:  55, label: "MRI" },
      { y: 120, label: "Tx" },
      { y: 185, label: "EHR" },
    ];
    var FX = 175, FY = 120, OX = 285;

    // Edges (input → fusion, fusion → output)
    var edges = [];
    inputs.forEach(function (inp) {
      var p = el("path", {
        d: "M" + 58 + "," + inp.y + " C" + 115 + "," + inp.y + " " + 135 + "," + FY + " " + (FX - 28) + "," + FY,
        class: "mm-edge", fill: "none",
      });
      svg.appendChild(p);
      edges.push({ el: p, phase: Math.random() * Math.PI * 2 });
    });
    var outEdge = el("path", {
      d: "M" + (FX + 28) + "," + FY + " L" + (OX - 18) + "," + FY,
      class: "mm-edge mm-edge-out", fill: "none",
    });
    svg.appendChild(outEdge);
    edges.push({ el: outEdge, phase: 0 });

    // Inputs
    inputs.forEach(function (inp) {
      var g = el("g", { transform: "translate(38," + inp.y + ")" });
      g.appendChild(el("rect", { class: "mm-input", x: -20, y: -14, width: 40, height: 28, rx: 4 }));
      var t = el("text", { class: "mm-token-label", y: 4, "text-anchor": "middle" });
      t.textContent = inp.label;
      g.appendChild(t);
      svg.appendChild(g);
    });

    // Fusion block
    var fg = el("g", { transform: "translate(" + FX + "," + FY + ")" });
    fg.appendChild(el("rect", { class: "mm-fusion", x: -28, y: -28, width: 56, height: 56, rx: 8 }));
    var fl = el("text", { class: "mm-fusion-label", y: 5, "text-anchor": "middle" });
    fl.textContent = "fuse";
    fg.appendChild(fl);
    svg.appendChild(fg);

    // Output
    var og = el("g", { transform: "translate(" + OX + "," + FY + ")" });
    og.appendChild(el("rect", { class: "mm-output", x: -16, y: -14, width: 32, height: 28, rx: 4 }));
    var ol = el("text", { class: "mm-token-label", y: 4, "text-anchor": "middle" });
    ol.textContent = "ŷ";
    og.appendChild(ol);
    svg.appendChild(og);

    function tick(now) {
      edges.forEach(function (e) {
        var op = 0.20 + 0.55 * (0.5 + 0.5 * Math.sin(now * 0.0014 + e.phase));
        e.el.setAttribute("opacity", op.toFixed(3));
      });
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // NASA Lucy orbital trajectory
  function initLucyOrbit(svg) {
    if (!svg) return;
    var CX = 160, CY = 120;
    // Sun
    svg.appendChild(el("circle", { cx: CX, cy: CY, r: 5, class: "lucy-sun" }));
    // Orbit ellipse
    var a = 100, b = 65;
    svg.appendChild(el("ellipse", { cx: CX, cy: CY, rx: a, ry: b, class: "lucy-orbit" }));
    // Trojan asteroids
    var asts = [-2.4, -1.7, -1.1, -0.4, 0.4, 1.1, 1.7, 2.4, 3.0];
    asts.forEach(function (ang) {
      var x = CX + a * Math.cos(ang);
      var y = CY + b * Math.sin(ang);
      svg.appendChild(el("circle", { cx: x, cy: y, r: 1.8 + (Math.random() * 1.4), class: "lucy-asteroid" }));
    });
    // Spacecraft trail (polyline)
    var trail = el("polyline", { class: "lucy-trail", fill: "none" });
    svg.appendChild(trail);
    // Spacecraft itself (small triangle)
    var craft = el("polygon", { class: "lucy-craft", points: "0,-5 4,4 -4,4" });
    svg.appendChild(craft);

    var trailPts = [], t = 0;
    function tick() {
      t += 0.006;
      var x = CX + a * Math.cos(t);
      var y = CY + b * Math.sin(t);
      var vx = -a * Math.sin(t), vy = b * Math.cos(t);
      var ang = Math.atan2(vy, vx) * 180 / Math.PI;
      craft.setAttribute("transform", "translate(" + x.toFixed(2) + "," + y.toFixed(2) + ") rotate(" + (ang + 90).toFixed(1) + ")");
      trailPts.push([x, y]);
      if (trailPts.length > 80) trailPts.shift();
      trail.setAttribute("points", trailPts.map(function (p) { return p[0].toFixed(1) + "," + p[1].toFixed(1); }).join(" "));
      requestAnimationFrame(tick);
    }
    tick();
  }

  // AWS Trainium parallel-chip grid
  function initParallelChips(svg) {
    if (!svg) return;
    var W = 320, H = 240;
    var COLS = 6, ROWS = 4, pad = 36;
    var cellW = (W - 2 * pad) / COLS, cellH = (H - 2 * pad) / ROWS;
    var chips = [];
    for (var r = 0; r < ROWS; r++) {
      for (var c = 0; c < COLS; c++) {
        var cx = pad + c * cellW + cellW / 2;
        var cy = pad + r * cellH + cellH / 2;
        // Outer chip body
        svg.appendChild(el("rect", { x: cx - 16, y: cy - 12, width: 32, height: 24, rx: 3, class: "tp-chip-body" }));
        // Inner active region (the part that lights up)
        var inner = el("rect", { x: cx - 11, y: cy - 7, width: 22, height: 14, rx: 2, class: "tp-chip-core", opacity: 0.1 });
        svg.appendChild(inner);
        chips.push({ el: inner, c: c, r: r, target: 0.08, val: 0.08 });
      }
    }
    var step = 0;
    setInterval(function () {
      step = (step + 1) % (COLS * 2);
      chips.forEach(function (cc) {
        // Diagonal wave activation
        var phase = (cc.c + cc.r) % (COLS * 2);
        cc.target = (phase === step % (COLS * 2) || (phase + 1) % (COLS * 2) === step) ? 0.95 : 0.08;
      });
    }, 280);
    function tick() {
      chips.forEach(function (cc) { cc.val += (cc.target - cc.val) * 0.12; cc.el.setAttribute("opacity", cc.val.toFixed(3)); });
      requestAnimationFrame(tick);
    }
    tick();
  }

  // ISEF/JSHS medals
  function initMedals(svg) {
    if (!svg) return;
    var positions = [
      { x: 80,  y: 130, tier: "gold",   delay: 0    },
      { x: 160, y: 115, tier: "silver", delay: 220  },
      { x: 240, y: 130, tier: "bronze", delay: 440  },
    ];
    positions.forEach(function (p, i) {
      var g = el("g", { transform: "translate(" + p.x + "," + p.y + ")" });
      // Ribbon
      g.appendChild(el("polygon", { points: "-10,-30 -16,-18 -8,-18", class: "medal-ribbon" }));
      g.appendChild(el("polygon", { points: "10,-30 16,-18 8,-18", class: "medal-ribbon" }));
      // Halo (pulses)
      var halo = el("circle", { class: "medal-halo medal-halo-" + p.tier, r: 22 });
      g.appendChild(halo);
      // Medal body
      g.appendChild(el("circle", { class: "medal-body medal-" + p.tier, r: 21 }));
      g.appendChild(el("circle", { class: "medal-inner medal-inner-" + p.tier, r: 15 }));
      var st = el("text", { class: "medal-star", y: 6, "text-anchor": "middle" });
      st.textContent = "★";
      g.appendChild(st);
      svg.appendChild(g);
      // Pulse animation via CSS keyframes (set delay inline)
      halo.style.animationDelay = p.delay + "ms";
    });
  }

  // ───────────────────────────────────────────────────────────────────────
  // PROJECT-PAGE ANIMATIONS (small, per-project) - kept as-is
  // ───────────────────────────────────────────────────────────────────────

  function initSparseFeatures(svg) {
    if (!svg) return;
    var COLS = 14, ROWS = 11, W = 320, H = 240, pad = 12;
    var cellW = (W - 2 * pad) / COLS, cellH = (H - 2 * pad) / ROWS;
    var cells = [];
    for (var r = 0; r < ROWS; r++) for (var c = 0; c < COLS; c++) {
      var cell = el("rect", {
        x: pad + c * cellW + 1, y: pad + r * cellH + 1,
        width: cellW - 2, height: cellH - 2, rx: 1, class: "sf-cell",
      });
      svg.appendChild(cell);
      cells.push({ el: cell, active: 0, target: 0 });
    }
    function fire() {
      var k = 6 + Math.floor(Math.random() * 5);
      var idxs = new Set();
      while (idxs.size < k) idxs.add(Math.floor(Math.random() * cells.length));
      cells.forEach(function (c, i) { c.target = idxs.has(i) ? (0.6 + Math.random() * 0.4) : 0.05; });
    }
    fire();
    setInterval(fire, 1400);
    function tick() {
      for (var i = 0; i < cells.length; i++) { var c = cells[i]; c.active += (c.target - c.active) * 0.06; c.el.setAttribute("opacity", c.active.toFixed(3)); }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function initBettingCurves(svg) {
    if (!svg) return;
    var W = 320, H = 240, pad = 24, Tmax = 400;
    svg.appendChild(el("line", { x1: pad, y1: H - pad, x2: W - pad, y2: H - pad, class: "bk-axis" }));
    svg.appendChild(el("line", { x1: pad, y1: pad, x2: pad, y2: H - pad, class: "bk-axis" }));
    var thresholdY = pad + 30;
    svg.appendChild(el("line", { x1: pad, y1: thresholdY, x2: W - pad, y2: thresholdY, class: "bk-threshold" }));
    var thrLabel = el("text", { x: W - pad - 4, y: thresholdY - 4, class: "bk-thr-label" });
    thrLabel.textContent = "reject H₀"; svg.appendChild(thrLabel);
    var K = 6, paths = [];
    for (var k = 0; k < K; k++) {
      var p = el("polyline", { class: "bk-curve", fill: "none", style: "opacity:" + (0.25 + 0.1 * k).toFixed(2) });
      svg.appendChild(p);
      paths.push({ el: p, rate: 0.08 + Math.random() * 0.5, noise: 0.5 + Math.random() * 1.2, phase: Math.random() * Math.PI * 2, history: [] });
    }
    var bestIdx = 2; paths[bestIdx].rate = 1.5; paths[bestIdx].el.setAttribute("style", "opacity:1"); paths[bestIdx].el.classList.add("bk-best");
    var mixturePath = el("polyline", { class: "bk-mixture", fill: "none" }); svg.appendChild(mixturePath);
    var mixHistory = [], t = 0;
    function advance() {
      t = (t + 1) % Tmax;
      if (t === 0) { paths.forEach(function (p) { p.history = []; }); mixHistory = []; }
      var x = pad + (t / Tmax) * (W - 2 * pad), mixSum = 0;
      paths.forEach(function (p) {
        var w = Math.max(0, p.rate * t * 0.02 + Math.sin(t * 0.05 + p.phase) * p.noise);
        var y = Math.max(pad, H - pad - w * 4);
        p.history.push([x, y]);
        if (p.history.length > 400) p.history.shift();
        mixSum += w;
      });
      var mixAvg = mixSum / paths.length + (paths[bestIdx].history.length > 50 ? (t / Tmax) * 8 : 0);
      var mY = Math.max(pad, H - pad - mixAvg * 3.5);
      mixHistory.push([x, mY]); if (mixHistory.length > 400) mixHistory.shift();
      paths.forEach(function (p) { p.el.setAttribute("points", p.history.map(function (q) { return q[0].toFixed(1) + "," + q[1].toFixed(1); }).join(" ")); });
      mixturePath.setAttribute("points", mixHistory.map(function (q) { return q[0].toFixed(1) + "," + q[1].toFixed(1); }).join(" "));
      requestAnimationFrame(advance);
    }
    advance();
    var xl = el("text", { x: W / 2, y: H - 4, class: "bk-axlabel", "text-anchor": "middle" }); xl.textContent = "samples →"; svg.appendChild(xl);
    var yl = el("text", { x: 4, y: pad + 4, class: "bk-axlabel" }); yl.textContent = "wealth Wₜ"; svg.appendChild(yl);
  }

  function initCacheTree(svg) {
    if (!svg) return;
    var positions = [
      { x: 160, y: 35, id: 0 }, { x: 85, y: 90, id: 1 }, { x: 235, y: 90, id: 2 },
      { x: 45, y: 150, id: 3 }, { x: 125, y: 150, id: 4 }, { x: 195, y: 150, id: 5 }, { x: 275, y: 150, id: 6 },
      { x: 75, y: 210, id: 7 }, { x: 165, y: 210, id: 8 }, { x: 255, y: 210, id: 9 },
    ];
    var edges = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6],[3,7],[4,8],[5,8],[6,9]];
    var cached = new Set([1, 3, 5, 8]);
    edges.forEach(function (e) { var a = positions[e[0]], b = positions[e[1]]; svg.appendChild(el("line", { x1: a.x, y1: a.y, x2: b.x, y2: b.y, class: "kv-edge" })); });
    var dotEls = positions.map(function (p) { var c = el("circle", { cx: p.x, cy: p.y, r: 7, class: cached.has(p.id) ? "kv-node kv-cached" : "kv-node" }); svg.appendChild(c); return c; });
    var token = el("circle", { r: 4.5, class: "kv-token" }); svg.appendChild(token);
    function pickPath() { var current = 0, path = [0], max = 5; while (max-- > 0) { var children = edges.filter(function (e) { return e[0] === current; }); if (!children.length) break; var pick = children[Math.floor(Math.random() * children.length)]; current = pick[1]; path.push(current); } return path; }
    function animate() {
      var path = pickPath(), step = 0;
      function nextStep() {
        if (step >= path.length) { setTimeout(animate, 600); return; }
        var node = positions[path[step]];
        token.setAttribute("cx", node.x); token.setAttribute("cy", node.y);
        dotEls[path[step]].classList.add("kv-firing");
        setTimeout(function () { dotEls[path[step]].classList.remove("kv-firing"); }, 350);
        step++; setTimeout(nextStep, 280);
      }
      nextStep();
    }
    animate();
  }

  function initPasskCurves(svg) {
    if (!svg) return;
    var W = 320, H = 240, pad = 28;
    svg.appendChild(el("line", { x1: pad, y1: H - pad, x2: W - pad, y2: H - pad, class: "bk-axis" }));
    svg.appendChild(el("line", { x1: pad, y1: pad, x2: pad, y2: H - pad, class: "bk-axis" }));
    var gateX = pad + (W - 2 * pad) * 0.32;
    svg.appendChild(el("line", { x1: gateX, y1: pad, x2: gateX, y2: H - pad, class: "pk-gate" }));
    var gateLabel = el("text", { x: gateX + 5, y: pad + 12, class: "bk-axlabel" }); gateLabel.textContent = "gate"; svg.appendChild(gateLabel);
    var buckets = [
      { color: "easy", asymp: 0.95, rate: 0.45 },
      { color: "med",  asymp: 0.62, rate: 0.20 },
      { color: "hard", asymp: 0.28, rate: 0.10 },
    ];
    var paths = buckets.map(function (b) { var p = el("polyline", { class: "pk-curve pk-" + b.color, fill: "none" }); svg.appendChild(p); return { el: p, def: b, history: [] }; });
    var t = 0, Tmax = 60;
    function tick() {
      t = (t + 1) % (Tmax * 4);
      var k = (t % Tmax) / Tmax, x = pad + k * (W - 2 * pad);
      paths.forEach(function (p) {
        var ks = k * 25, passRate = p.def.asymp * (1 - Math.exp(-p.def.rate * ks));
        var y = H - pad - passRate * (H - 2 * pad);
        if ((t % Tmax) === 0) p.history = [];
        p.history.push([x, y]);
        p.el.setAttribute("points", p.history.map(function (q) { return q[0].toFixed(1) + "," + q[1].toFixed(1); }).join(" "));
      });
      requestAnimationFrame(tick);
    }
    tick();
    var xl = el("text", { x: W / 2, y: H - 4, class: "bk-axlabel", "text-anchor": "middle" }); xl.textContent = "k →"; svg.appendChild(xl);
    var yl = el("text", { x: 4, y: pad - 4, class: "bk-axlabel" }); yl.textContent = "pass@k"; svg.appendChild(yl);
  }

  function initVenn(svg) {
    if (!svg) return;
    var cx1 = 130, cx2 = 200, cy = 120, r = 70;
    svg.appendChild(el("circle", { cx: cx1, cy: cy, r: r, class: "sb-circle sb-c1" }));
    svg.appendChild(el("circle", { cx: cx2, cy: cy, r: r, class: "sb-circle sb-c2" }));
    var lbl1 = el("text", { x: cx1 - 28, y: cy - r - 8, class: "sb-label" }); lbl1.textContent = "Benchmark";
    var lbl2 = el("text", { x: cx2 + 4, y: cy - r - 8, class: "sb-label" }); lbl2.textContent = "Mathlib";
    svg.appendChild(lbl1); svg.appendChild(lbl2);
    var DOTS = 100, dots = [];
    for (var i = 0; i < DOTS; i++) { var d = el("circle", { r: 1.6, class: "sb-dot" }); svg.appendChild(d); dots.push({ el: d }); }
    function placeDots() {
      var leakRate = 0.44;
      dots.forEach(function (d) {
        var role = Math.random(), cx, region;
        if (role < leakRate * 0.5) { cx = cx1; region = "overlap"; }
        else if (role < 0.5) { cx = cx1; region = "left"; }
        else if (role < 0.5 + (1 - leakRate) * 0.5) { cx = cx2; region = "right"; }
        else { cx = cx2; region = "overlap"; }
        var ang = Math.random() * Math.PI * 2, rr = Math.sqrt(Math.random()) * (r - 10);
        var x = cx + Math.cos(ang) * rr, y = cy + Math.sin(ang) * rr;
        d.el.setAttribute("cx", x); d.el.setAttribute("cy", y);
        d.el.setAttribute("opacity", region === "overlap" ? "0.9" : "0.55");
        d.el.setAttribute("class", region === "overlap" ? "sb-dot sb-leak" : "sb-dot");
      });
    }
    placeDots(); setInterval(placeDots, 2600);
    var stat = el("text", { x: 165, y: cy + 4, class: "sb-stat", "text-anchor": "middle" }); stat.textContent = "44% leak"; svg.appendChild(stat);
  }

  // ───────────────────────────────────────────────────────────────────────
  // Bootstrap
  // ───────────────────────────────────────────────────────────────────────
  var root = document.documentElement;
  var stored = localStorage.getItem("theme");
  // Default to light mode regardless of OS preference; only honour an explicit
  // user choice persisted in localStorage.
  if (stored === "dark") root.classList.add("dark");

  var toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      root.classList.toggle("dark");
      localStorage.setItem("theme", root.classList.contains("dark") ? "dark" : "light");
    });
  }

  var revealEls = document.querySelectorAll(".reveal, .section");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealEls.forEach(function (el) { el.classList.add("reveal"); io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  var yEl = document.getElementById("year");
  if (yEl) yEl.textContent = String(new Date().getFullYear());

  // Init every chip SVG on the page (class-based, multi-instance)
  document.querySelectorAll(".chip-svg").forEach(function (svg) {
    var wrap = svg.closest(".chip-wrap");
    var label = wrap ? wrap.querySelector(".chip-label") : null;
    initChip(svg, label);
  });

  // Alternative homepage animation candidates (class-based)
  document.querySelectorAll(".orbital-svg").forEach(function (svg) {
    var wrap = svg.closest(".alt-wrap") || svg.closest(".chip-wrap");
    var label = wrap ? wrap.querySelector(".chip-label") : null;
    initOrbital(svg, label);
  });
  document.querySelectorAll(".handgraph-svg").forEach(function (svg) {
    var wrap = svg.closest(".chip-wrap") || svg.closest(".alt-wrap");
    var label = wrap ? wrap.querySelector(".chip-label") : null;
    initBreathingRing(svg, label);
  });
  document.querySelectorAll(".drift-svg").forEach(function (svg) {
    var wrap = svg.closest(".alt-wrap") || svg.closest(".chip-wrap");
    var label = wrap ? wrap.querySelector(".chip-label") : null;
    initDriftRing(svg, label);
  });
  document.querySelectorAll(".breath-svg").forEach(function (svg) {
    var wrap = svg.closest(".alt-wrap") || svg.closest(".chip-wrap");
    var label = wrap ? wrap.querySelector(".chip-label") : null;
    initBreathingRing(svg, label);
  });
  document.querySelectorAll(".rings-svg").forEach(function (svg) {
    var wrap = svg.closest(".alt-wrap") || svg.closest(".chip-wrap");
    var label = wrap ? wrap.querySelector(".chip-label") : null;
    initCounterRings(svg, label);
  });
  document.querySelectorAll(".phaseport-svg").forEach(function (svg) {
    var wrap = svg.closest(".alt-wrap") || svg.closest(".chip-wrap");
    var label = wrap ? wrap.querySelector(".chip-label") : null;
    initPhasePortrait(svg, label);
  });

  // Per-project animations (page-specific, by ID)
  initBettingCurves(document.getElementById("proj-anim-betting-kernels"));
  initSparseFeatures(document.getElementById("proj-anim-caisi"));
  initMultimodalFusion(document.getElementById("proj-anim-aim-medical"));
  initLucyOrbit(document.getElementById("proj-anim-nasa-lspace"));
  initParallelChips(document.getElementById("proj-anim-aws-neurips"));
  initMedals(document.getElementById("proj-anim-isef-jshs"));
})();
