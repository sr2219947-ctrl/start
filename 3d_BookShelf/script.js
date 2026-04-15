const CARDS = [
  {
    id: 1, topic: "Technology", icon: "💻", name: "The Rise of Computing",
    tag: "Hardware", tagColor: "#2a3a5c",
    grad: ["#1a2a4a","#243656"], spine: "#3a5a8a",
    tagline: "From room-sized machines to pocket supercomputers in 75 years.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400",
    overview: "Computing began with massive vacuum-tube machines in the 1940s. Transistors replaced tubes, microchips replaced transistors, and Moore's Law described how chip density doubled roughly every two years — a trend that shaped the modern world. Today a smartphone holds billions of transistors and more computing power than NASA used for the Moon landings.",
    chips: ["Transistors","Moore's Law","Microprocessors","Von Neumann","Quantum bits"],
    note: "The first hard drive (1956) weighed over a ton and stored just 5 MB. A modern microSD card the size of a fingernail stores 1 million times more."
  },
  {
    id: 2, topic: "Artificial Intelligence", icon: "🤖", name: "Minds of Silicon",
    tag: "AI / ML", tagColor: "#2a1a4a",
    grad: ["#1e1233","#2a1a45"], spine: "#6a3ab0",
    tagline: "Teaching machines to learn, reason, and create.",
    overview: "Artificial Intelligence started as rule-based systems in the 1950s. The deep learning revolution of the 2010s — powered by neural networks, large datasets, and GPUs — unlocked breakthroughs in vision, language, and games. Large Language Models (LLMs) learn statistical patterns across billions of text tokens to generate fluent, contextual responses.",
    chips: ["Neural Networks","Transformers","Backpropagation","Reinforcement Learning","LLMs"],
    note: "GPT-4 was trained on roughly 1 trillion words — reading that would take a human over 31,000 years at 8 hours a day."
  },
  {
    id: 3, topic: "Science Fiction", icon: "🚀", name: "Imagining Tomorrow",
    tag: "Literature", tagColor: "#1a3a2a",
    grad: ["#0f2820","#163322"], spine: "#2a8a5a",
    tagline: "Fiction that became a blueprint for the future.",
    overview: "Science fiction is humanity's sandbox for testing ideas before technology catches up. Jules Verne described submarines and moon rockets a century before they existed. Arthur C. Clarke invented the geostationary communications satellite in 1945 — before the space age. Today, concepts like neural interfaces, autonomous vehicles, and space tourism mirror decades-old SF tropes.",
    chips: ["Cyberpunk","Space Opera","Dystopia","Hard SF","Transhumanism"],
    note: "William Gibson coined 'cyberspace' in 1984. He wrote Neuromancer on a manual typewriter, imagining a networked virtual world he had never seen."
  },
  {
    id: 4, topic: "Technology", icon: "🌐", name: "How the Internet Works",
    tag: "Networking", tagColor: "#2a3520",
    grad: ["#1a2a14","#22341c"], spine: "#5a8a30",
    tagline: "A global mesh of wires, light, and shared protocols.",
    overview: "The internet is a network of networks connected by the TCP/IP protocol suite. Data is broken into packets, routed through dozens of hops via BGP, reassembled at the destination. Undersea fiber-optic cables carry 95% of intercontinental traffic, moving light-speed signals across oceans. DNS translates human-readable names into numerical IP addresses billions of times per second.",
    chips: ["TCP/IP","DNS","BGP Routing","HTTP/3","Fiber Optics"],
    note: "There are over 400 undersea fiber-optic cables stretching more than 1.3 million kilometers — enough to wrap Earth 32 times."
  },
  {
    id: 5, topic: "Artificial Intelligence", icon: "🧠", name: "How Neural Nets Learn",
    tag: "Deep Learning", tagColor: "#3a1a3a",
    grad: ["#2a1028","#331433"], spine: "#9a30a0",
    tagline: "Billions of tiny adjustments, one gradient at a time.",
    overview: "A neural network is a graph of layers — each layer transforms its input via weighted sums and nonlinear activations. Training is gradient descent: the model predicts, measures error via a loss function, and backpropagates gradients to nudge every weight slightly toward better predictions. Repeat millions of times and the network learns to generalize from examples.",
    chips: ["Gradient Descent","Backprop","Activation Fn","Attention","Dropout"],
    note: "GPT-3 has 175 billion parameters — if each were a human, you'd need 22 planet Earths to stand them all, shoulder-to-shoulder."
  },
  {
    id: 6, topic: "Science Fiction", icon: "⚡", name: "Cyberpunk Worlds",
    tag: "Genre", tagColor: "#3a2010",
    grad: ["#2a1408","#33180a"], spine: "#c04010",
    tagline: "High tech, low life — the neon-soaked future of inequality.",
    overview: "Cyberpunk envisions futures where advanced technology coexists with social collapse, corporate megapower, and street-level struggle. Pioneered by Philip K. Dick and defined by William Gibson's Neuromancer, the genre explores themes of identity, surveillance, transhumanism, and the commodification of consciousness. Blade Runner, Ghost in the Shell, and Neuromancer are canonical texts.",
    chips: ["Megacorp","Hackers","Augmentation","Surveillance","Noir"],
    note: "Blade Runner (1982) is set in November 2019. Filmmakers expected replicants and flying cars by then — we got ride-sharing apps and algorithmic feeds instead."
  }
];

const TOPICS = [...new Set(CARDS.map(c => c.topic))];
let activeFilter = "All";
let currentIdx = 0;
let filtered = [...CARDS];
const angleStep = () => 360 / filtered.length;

function getFiltered() {
  return activeFilter === "All" ? CARDS : CARDS.filter(c => c.topic === activeFilter);
}

function buildFilters() {
  const row = document.getElementById("filter-row");
  row.innerHTML = "";
  ["All", ...TOPICS].forEach(t => {
    const b = document.createElement("button");
    b.className = "filter-btn" + (t === activeFilter ? " active" : "");
    b.textContent = t;
    b.onclick = () => { activeFilter = t; currentIdx = 0; render(); };
    row.appendChild(b);
  });
}

function render() {
  filtered = getFiltered();
  buildFilters();
  document.getElementById("count-label").textContent = filtered.length + " cards";

  const carousel = document.getElementById("carousel");
  carousel.innerHTML = "";
  const step = 360 / filtered.length;
  const radius = Math.max(220, filtered.length * 48);

  filtered.forEach((card, i) => {
    const el = document.createElement("div");
    el.className = "card3d";
    const angle = i * step;
    el.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
    el.style.background = `linear-gradient(145deg, ${card.grad[0]}, ${card.grad[1]})`;
    el.style.boxShadow = `0 8px 32px rgba(0,0,0,0.55)`;
    el.innerHTML = `
      <div class="card-spine" style="background:${card.spine}"></div>
      <div class="card-face">
        <div class="card-icon">${card.icon}</div>
        <div class="card-topic">${card.topic}</div>
        <div class="card-name">${card.name}</div>
        <span class="card-tag" style="background:${card.tagColor};color:rgba(255,255,255,0.7)">${card.tag}</span>
      </div>`;
    el.onclick = () => openReader(card);
    carousel.appendChild(el);
  });

  // Rotate to current
  const targetAngle = -(currentIdx * step);
  carousel.style.transform = `rotateY(${targetAngle}deg)`;

  // Dots
  const dots = document.getElementById("dots");
  dots.innerHTML = "";
  filtered.forEach((_, i) => {
    const d = document.createElement("div");
    d.className = "dot" + (i === currentIdx ? " on" : "");
    d.onclick = () => { currentIdx = i; render(); };
    dots.appendChild(d);
  });
}

function rotateTo(idx) {
  currentIdx = ((idx % filtered.length) + filtered.length) % filtered.length;
  const step = 360 / filtered.length;
  document.getElementById("carousel").style.transform = `rotateY(${-currentIdx * step}deg)`;
  document.querySelectorAll(".dot").forEach((d, i) => {
    d.className = "dot" + (i === currentIdx ? " on" : "");
  });
}

document.getElementById("prev").onclick = () => rotateTo(currentIdx - 1);
document.getElementById("next").onclick = () => rotateTo(currentIdx + 1);

function openReader(card) {
  document.getElementById("r-icon").textContent = card.icon;
  document.getElementById("r-cat").textContent = card.topic;
  document.getElementById("r-title").textContent = card.name;
  document.getElementById("r-tagline").textContent = card.tagline;
  document.getElementById("r-overview").textContent = card.overview;
  document.getElementById("r-note").textContent = card.note;
  document.getElementById("reader-hero").style.background = `linear-gradient(135deg, ${card.grad[0]}, ${card.grad[1]})`;

  const chips = document.getElementById("r-chips");
  chips.innerHTML = card.chips.map(ch => `<span class="chip">${ch}</span>`).join("");

  document.getElementById("ask-more-btn").onclick = () => {
    closeReader();
    if (typeof sendPrompt === "function") sendPrompt("Tell me more about: " + card.name);
  };

  document.getElementById("reader").classList.add("open");
}

function closeReader() {
  document.getElementById("reader").classList.remove("open");
}

document.getElementById("close-btn").onclick = closeReader;
document.getElementById("reader").onclick = (e) => {
  if (e.target === document.getElementById("reader")) closeReader();
};

// Keyboard
document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") rotateTo(currentIdx - 1);
  if (e.key === "ArrowRight") rotateTo(currentIdx + 1);
  if (e.key === "Escape") closeReader();
});

render();
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});