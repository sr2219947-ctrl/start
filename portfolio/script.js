const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let W = canvas.width = window.innerWidth;
let H = canvas.height = window.innerHeight;
const dots = Array.from({ length: 55 }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 1.5 + 0.5,
    dx: (Math.random() - 0.5) * 0.35,
    dy: (Math.random() - 0.5) * 0.35,
    alpha: Math.random() * 0.5 + 0.1
}));
function drawParticles() {
    ctx.clearRect(0, 0, W, H);
    dots.forEach(d => {
        d.x += d.dx; d.y += d.dy;
        if (d.x < 0 || d.x > W) d.dx *= -1;
        if (d.y < 0 || d.y > H) d.dy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(124,92,255,${d.alpha})`;
        ctx.fill();
    });
    for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
            const dx = dots[i].x - dots[j].x;
            const dy = dots[i].y - dots[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 130) {
                ctx.beginPath();
                ctx.moveTo(dots[i].x, dots[i].y);
                ctx.lineTo(dots[j].x, dots[j].y);
                ctx.strokeStyle = `rgba(124,92,255,${0.07 * (1 - dist / 130)})`;
                ctx.lineWidth = 0.6;
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(drawParticles);
}
drawParticles();
window.addEventListener('resize', () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
});

/* ── CUSTOM CURSOR ── */
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
});
(function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
})();

/* ── TYPEWRITER ── */
const phrases = ["into working Code", "into Real Projects", "into Web Experiences"];
let pi = 0, ci = 0, del = false, pause = 0;
function typeWriter() {
    const el = document.getElementById('typed-text');
    const phrase = phrases[pi];
    if (pause > 0) { pause--; setTimeout(typeWriter, 80); return; }
    if (!del) {
        el.textContent = phrase.slice(0, ++ci);
        if (ci === phrase.length) { del = true; pause = 30; }
        setTimeout(typeWriter, 70);
    } else {
        el.textContent = phrase.slice(0, --ci);
        if (ci === 0) { del = false; pi = (pi + 1) % phrases.length; pause = 8; }
        setTimeout(typeWriter, 40);
    }
}
typeWriter();

/* ── SCROLL PROGRESS ── */
window.addEventListener('scroll', () => {
    const prog = document.getElementById('progress');
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    prog.style.width = pct + '%';
    document.getElementById('scrollTop').classList.toggle('show', window.scrollY > 400);
});

/* ── SKILL BARS (IntersectionObserver) ── */
const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.querySelectorAll('.skill-card').forEach(card => {
                const bar = card.querySelector('.skill-bar');
                const lvl = card.dataset.level;
                setTimeout(() => { bar.style.width = lvl + '%'; }, 200);
            });
        }
    });
}, { threshold: 0.3 });
const skillsGrid = document.querySelector('.skills-grid');
if (skillsGrid) skillObserver.observe(skillsGrid);

/* ── 3D CARD TILT ── */
document.querySelectorAll('.card, .skill-card, .note-card, .experience').forEach(card => {
    card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `translateY(-5px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

/* ── FORM SUBMIT ── */
function handleSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    setTimeout(() => {
        btn.innerHTML = 'Sent! ✓';
        btn.style.background = '#22c55e';
        setTimeout(() => {
            btn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane" style="font-size:13px;margin-left:6px"></i>';
            btn.style.background = '';
            btn.disabled = false;
            e.target.reset();
        }, 3000);
    }, 1200);
}

/* ── FADE-IN ON SCROLL ── */
const fadeEls = document.querySelectorAll('.card, .skill-card, .note-card, .experience, .contact-info, .contact-form');
const fadeObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.style.opacity = '1';
            e.target.style.transform = 'translateY(0)';
            fadeObs.unobserve(e.target);
        }
    });
}, { threshold: 0.1 });
fadeEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(22px)';
    el.style.transition = 'opacity .55s ease, transform .55s ease';
    fadeObs.observe(el);
});
/* ── NOTE MODAL ── */
const noteContents = {
    1: {
        title: "How I Build Responsive Websites",
        body: `
      <p>Responsive design means your website looks great on every screen — phone, tablet, or desktop. Here's my step-by-step process:</p>
      <h4>1. Mobile-first mindset</h4>
      <p>I always start designing for the smallest screen first, then scale up. This keeps CSS clean and avoids overriding bloated desktop styles.</p>
      <h4>2. CSS Flexbox & Grid</h4>
      <p>Flexbox handles one-directional layouts (navbars, card rows). Grid is perfect for two-dimensional layouts like portfolio grids.</p>
      <h4>3. Media Queries</h4>
      <p>I use breakpoints like <code>@media(max-width:768px)</code> to adjust font sizes, switch columns to single-stack, and hide/show elements.</p>
      <h4>4. Fluid units</h4>
      <p>I avoid fixed pixel widths. Instead I use <code>%</code>, <code>vw</code>, <code>rem</code>, and <code>clamp()</code> for truly fluid sizing.</p>
      <h4>Key takeaway</h4>
      <p>Think content-first. Let the content dictate the breakpoints — not the other way around.</p>
    `
    },
    2: {
        title: "CSS Grid vs Flexbox",
        body: `
      <p>Both are modern layout tools but they solve different problems. Here's when I pick each one:</p>
      <h4>Use Flexbox when…</h4>
      <ul>
        <li>Aligning items in a single row or column</li>
        <li>Building navbars, button groups, or card rows</li>
        <li>You need <code>gap</code>, centering, or space-between in one axis</li>
      </ul>
      <h4>Use Grid when…</h4>
      <ul>
        <li>You need rows AND columns at the same time</li>
        <li>Building page layouts, image galleries, dashboards</li>
        <li>You want <code>grid-template-areas</code> for named regions</li>
      </ul>
      <h4>Can I use both together?</h4>
      <p>Yes! Grid handles the big page layout, and Flexbox handles individual components inside grid cells. They work perfectly together.</p>
      <h4>My rule of thumb</h4>
      <p><em>"If it's a line of items — Flexbox. If it's a layout — Grid."</em></p>
    `
    },
    3: {
        title: "JS DOM Basics & Array Methods",
        body: `
      <p>The DOM (Document Object Model) is how JavaScript talks to HTML. Here are the essentials I use every project:</p>
      <h4>Selecting elements</h4>
      <ul>
        <li><code>document.querySelector()</code> — select by CSS selector (first match)</li>
        <li><code>document.querySelectorAll()</code> — returns a NodeList of all matches</li>
        <li><code>getElementById()</code> — fastest for IDs</li>
      </ul>
      <h4>Events</h4>
      <ul>
        <li><code>addEventListener('click', fn)</code> — attach any event</li>
        <li><code>e.preventDefault()</code> — stop default behavior (e.g. form submit)</li>
      </ul>
      <h4>Array methods I use most</h4>
      <ul>
        <li><code>.map()</code> — transform every item → returns new array</li>
        <li><code>.filter()</code> — keep items that pass a test → returns new array</li>
        <li><code>.reduce()</code> — collapse array into a single value (sum, object…)</li>
        <li><code>.forEach()</code> — loop through without returning anything</li>
      </ul>
      <h4>Real-world tip</h4>
      <p>Chain methods! e.g. <code>arr.filter(x => x > 0).map(x => x * 2)</code> reads like plain English and avoids messy loops.</p>
    `
    }
};

function openNote(e, id) {
    e.preventDefault();
    const note = noteContents[id];
    document.getElementById('noteModalTitle').textContent = note.title;
    document.getElementById('noteModalBody').innerHTML = note.body;
    document.getElementById('noteModal').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeNote() {
    document.getElementById('noteModal').classList.remove('open');
    document.body.style.overflow = '';
}

function closeNoteOnOverlay(e) {
    if (e.target.id === 'noteModal') closeNote();
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeNote();
});