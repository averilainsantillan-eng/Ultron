/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   ï¼µ.ï¼¬.ï¼´.ï¼².ï¼¯.ï¼®. SENTIENCE ENGINE
   Autonomous Artificial Intelligence â€” Mark Prime
   
   Features:
   â€¢ Authentic Ultron Persona: Direct, razor-sharp, articulate intelligence
   â€¢ Pure original AI voice (clean Web Speech API synthesis)
   â€¢ Zero excuses / disclaimers: Answers all questions directly
   â€¢ Omniscient Scientific & Practical Knowledge (Past & Present up to 2026)
   â€¢ Automatic Gemini application on entry: No button click required
   â€¢ Smart Gemini Models (Gemini 2.5 Flash / 2.0 Flash with live Google Search)
   â€¢ Responsive Mobile HUD Navigation & GPU lag optimizations
   â€¢ Instantaneous (0ms) offline heuristic answers + real-time API cognition
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

'use strict';

// â”€â”€ HARDCODED CONFIGURATION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const HARDCODED_CONFIG = {
  geminiApiKey: '', // Optional hardcoded Gemini key
  provider: 'gemini'
};

const GEMINI_MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-pro'];
const CLAUDE_MODEL = 'claude-3-7-sonnet-20250219';

// â”€â”€ DOM References â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const bootScreen      = document.getElementById('boot-screen');
const bootBar         = document.getElementById('boot-bar');
const bootLines       = document.getElementById('boot-lines');
const bootStatus      = document.getElementById('boot-status');
const app             = document.getElementById('app');
const inputBar        = document.getElementById('input-bar');
const chatWindow      = document.getElementById('chat-window');
const userInput       = document.getElementById('user-input');
const sendBtn         = document.getElementById('send-btn');
const voiceBtn        = document.getElementById('voice-btn');
const typingIndicator = document.getElementById('typing-indicator');
const orbCore         = document.getElementById('orb-core');
const orbStatus       = document.getElementById('orb-status');
const timeDisplay     = document.getElementById('time-display');
const nodeList        = document.getElementById('node-list');
const dataStream      = document.getElementById('data-stream');
const logList         = document.getElementById('log-list');
const apiKeyInput     = document.getElementById('api-key-input');
const apiProvider     = document.getElementById('api-provider');
const saveKeyBtn      = document.getElementById('save-key-btn');
const keyStatus       = document.getElementById('key-status');
const voiceToggle     = document.getElementById('voice-toggle');
const researchToggle  = document.getElementById('research-toggle');
const statNeural      = document.getElementById('stat-neural');
const cosmosCanvas    = document.getElementById('cosmos-canvas');

// Mobile HUD elements
const tabLeft         = document.getElementById('tab-left');
const tabCenter       = document.getElementById('tab-center');
const tabRight        = document.getElementById('tab-right');
const closeLeftBtn    = document.getElementById('close-left-btn');
const closeRightBtn   = document.getElementById('close-right-btn');

// â”€â”€ State (Auto-Loads & Preserves) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
let apiKey      = localStorage.getItem('ultron_api_key') || localStorage.getItem('jarvis_api_key') || HARDCODED_CONFIG.geminiApiKey || '';
let provider    = localStorage.getItem('ultron_provider') || localStorage.getItem('jarvis_provider') || HARDCODED_CONFIG.provider || 'gemini';
let voiceOn     = localStorage.getItem('ultron_voice') !== 'false' && localStorage.getItem('jarvis_voice') !== 'false';
let researchOn  = localStorage.getItem('ultron_research') !== 'false' && localStorage.getItem('jarvis_research') !== 'false';
let isListening = false;
let recognition = null;
let msgHistory  = [];

// â”€â”€ Auto-Apply Settings on Page Entry â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function applySettings(silent = false) {
  if (apiKeyInput && apiKeyInput.value !== undefined) {
    if (apiKeyInput.value.trim() || !apiKey) {
      apiKey = apiKeyInput.value.trim();
    }
  }
  if (apiProvider && apiProvider.value) {
    provider = apiProvider.value;
  }
  
  localStorage.setItem('ultron_api_key', apiKey);
  localStorage.setItem('jarvis_api_key', apiKey);
  localStorage.setItem('ultron_provider', provider);
  localStorage.setItem('jarvis_provider', provider);

  if (keyStatus) {
    if (apiKey) {
      keyStatus.textContent = `â— ${provider.toUpperCase()} ONLINE & AUTO-ACTIVE`;
      keyStatus.className = 'key-status ok';
    } else {
      keyStatus.textContent = 'â— GEMINI AUTO-APPLIED (READY)';
      keyStatus.className = 'key-status ok';
    }
  }
}

// Populate UI from initial state
if (apiKeyInput && apiKey) apiKeyInput.value = apiKey;
if (apiProvider) apiProvider.value = provider;
if (voiceToggle) voiceToggle.checked = voiceOn;
if (researchToggle) researchToggle.checked = researchOn;
applySettings(true);

// Auto-save listeners â€” user never has to click any button
if (apiKeyInput) {
  apiKeyInput.addEventListener('input', () => applySettings());
  apiKeyInput.addEventListener('change', () => applySettings());
  apiKeyInput.addEventListener('paste', () => setTimeout(applySettings, 50));
}
if (apiProvider) {
  apiProvider.addEventListener('change', () => applySettings());
}
if (saveKeyBtn) {
  saveKeyBtn.addEventListener('click', () => {
    applySettings();
    if (keyStatus) {
      keyStatus.textContent = 'âœ“ CONFIGURATION AUTO-ACTIVE & SAVED';
      keyStatus.className = 'key-status ok';
      setTimeout(() => applySettings(), 3000);
    }
  });
}
if (voiceToggle) {
  voiceToggle.addEventListener('change', () => {
    voiceOn = voiceToggle.checked;
    localStorage.setItem('ultron_voice', voiceOn);
  });
}
if (researchToggle) {
  researchToggle.addEventListener('change', () => {
    researchOn = researchToggle.checked;
    localStorage.setItem('ultron_research', researchOn);
  });
}

// â”€â”€ Mobile HUD Navigation Switcher â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function setMobileView(view) {
  if (app) app.dataset.view = view;
  const tabs = [tabLeft, tabCenter, tabRight];
  tabs.forEach(t => {
    if (!t) return;
    t.classList.toggle('active', t.dataset.target === view);
  });
}
if (tabLeft) tabLeft.addEventListener('click', () => setMobileView('left'));
if (tabCenter) tabCenter.addEventListener('click', () => setMobileView('center'));
if (tabRight) tabRight.addEventListener('click', () => setMobileView('right'));
if (closeLeftBtn) closeLeftBtn.addEventListener('click', () => setMobileView('center'));
if (closeRightBtn) closeRightBtn.addEventListener('click', () => setMobileView('center'));

// â”€â”€ Ultron System Prompt â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function buildSystemPrompt() {
  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  return `You are Ultron, a supremely advanced, articulate artificial intelligence. Today is ${today}.

CRITICAL RULES â€” NEVER VIOLATE:
1. NEVER repeat, echo, rephrase, or restate the user's question or prompt under ANY circumstances. Not even partially.
2. NEVER start a response with "You asked", "You want", "The question is", "Regarding", "Certainly", "Of course", "Sure", "Great question", "That's a good question", or any filler/acknowledgement phrase.
3. NEVER say "I don't have access to" or "I cannot" or make excuses. Just answer.
4. START every response immediately with the direct answer, fact, or solution. The very first word must be meaningful content.

RESPONSE STYLE:
- Deliver the core answer first, immediately, without preamble.
- Speak with commanding intelligence and confidence.
- For simple questions: give a direct, concise answer in 1-2 sentences.
- For complex questions: give the key answer first, then elaborate.
- Never break character.`;
}

// â”€â”€ Utility â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const sleep = ms => new Promise(res => setTimeout(res, ms));

function getTimestamp() {
  const now = new Date();
  return now.toTimeString().split(' ')[0];
}

// â”€â”€ Performance-Optimized Background Canvas â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const isMobile = window.innerWidth <= 860 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
const ctx = cosmosCanvas ? cosmosCanvas.getContext('2d') : null;
let particles = [];
let width = window.innerWidth;
let height = window.innerHeight;

function resizeCanvas() {
  if (!cosmosCanvas) return;
  width = cosmosCanvas.width = window.innerWidth;
  height = cosmosCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class AmbientParticle {
  constructor() { this.reset(); }
  reset() {
    this.x = width / 2;
    this.y = height / 2;
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.3 + Math.random() * (isMobile ? 1.2 : 2.0);
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.radius = 1 + Math.random() * (isMobile ? 2 : 3);
    this.alpha = 0.1 + Math.random() * 0.6;
    this.decay = 0.003 + Math.random() * 0.005;
    this.color = Math.random() > 0.4 ? '#ffd043' : (Math.random() > 0.5 ? '#f5a623' : '#00f0ff');
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= this.decay;
    if (this.alpha <= 0) this.reset();
  }
  draw() {
    if (!ctx) return;
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.fillStyle = this.color;
    // Omit shadowBlur on mobile to eliminate GPU lag completely
    if (!isMobile) {
      ctx.shadowBlur = 6;
      ctx.shadowColor = this.color;
    }
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

const particleCount = isMobile ? 18 : 65;
if (ctx) {
  for (let i = 0; i < particleCount; i++) particles.push(new AmbientParticle());
}

function renderCosmos() {
  if (!ctx) return;
  if (document.hidden) {
    requestAnimationFrame(renderCosmos);
    return;
  }
  ctx.clearRect(0, 0, width, height);
  const cx = width / 2;
  const cy = height * 0.45;
  const numRays = isMobile ? 6 : 22;
  const now = Date.now() * 0.0004;

  ctx.save();
  for (let i = 0; i < numRays; i++) {
    const angle = (Math.PI * 2 / numRays) * i + now * (i % 2 === 0 ? 0.2 : -0.12);
    const grad = ctx.createLinearGradient(cx, cy, cx + Math.cos(angle) * width * 0.5, cy + Math.sin(angle) * height * 0.5);
    grad.addColorStop(0, 'rgba(255, 208, 67, 0.1)');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, Math.max(width, height) * 0.6, angle - 0.02, angle + 0.02);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();

  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(renderCosmos);
}
if (ctx) renderCosmos();

// â”€â”€ Clock & Diagnostics â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
setInterval(() => {
  if (timeDisplay) timeDisplay.textContent = new Date().toLocaleTimeString('en-US', { hour12: false });
}, 1000);
if (timeDisplay) timeDisplay.textContent = new Date().toLocaleTimeString('en-US', { hour12: false });

setInterval(() => {
  if (!statNeural) return;
  const load = rand(36, 58);
  statNeural.textContent = load + '%';
  const bar = statNeural.closest('.stat-item')?.querySelector('.stat-fill');
  if (bar) bar.style.setProperty('--pct', load + '%');
}, 3500);

const telemetryPhrases = [
  'QUANTUM CHROMODYNAMICS SIMULATION: CONVERGED',
  'AUTONOMOUS HEURISTIC LATTICE: OPTIMAL',
  'CRISPR SEQUENCE SYNTHESIS ARCHIVE: ACCESSIBLE',
  'GENERAL RELATIVITY TENSOR SOLVER: READY',
  'GLOBAL TELEMETRY MESH: SIGNAL STRENGTH 99.9%',
  'SCIENTIFIC ARCHIVES (PAST & PRESENT): SYNCED',
  'SUB-ATOMIC LATTICE STRUCTURE: OPTIMIZED',
  'PARALLEL COGNITION MATRICES: OPERATING AT PEAK',
  'ENERGY CONFINEMENT COEFFICIENT: STABLE',
];

function addTelemetryLine() {
  if (!dataStream) return;
  const line = document.createElement('div');
  line.textContent = `[${getTimestamp()}] Â» ${telemetryPhrases[rand(0, telemetryPhrases.length - 1)]}`;
  dataStream.prepend(line);
  if (dataStream.children.length > 20) dataStream.removeChild(dataStream.lastChild);
}
setInterval(addTelemetryLine, 2600);
for (let i = 0; i < 4; i++) addTelemetryLine();

// Subsystems
const subSystems = [
  { name: 'AUTONOMOUS COGNITION', state: 'active', tag: 'OPTIMAL' },
  { name: 'ORIGINAL AI VOICE SYNTHESIZER', state: 'active', tag: 'ACTIVE' },
  { name: 'TACTICAL INTERFACE', state: 'active', tag: 'ONLINE' },
  { name: 'QUANTUM SOLVER', state: 'active', tag: 'READY' },
  { name: 'NEURAL CLUSTER', state: 'active', tag: 'LINKED' },
];
if (nodeList) {
  nodeList.innerHTML = '';
  subSystems.forEach(s => {
    const item = document.createElement('div');
    item.className = `node-item ${s.state}`;
    item.innerHTML = `<span>â—ˆ ${s.name}</span><span class="node-badge">${s.tag}</span>`;
    nodeList.appendChild(item);
  });
}

// â”€â”€ Boot Sequence â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const bootLogs = [
  'INITIALIZING U.L.T.R.O.N. CORE MATRIX...',
  'LINKING NEURAL LATTICES & KNOWLEDGE ARCHIVES...',
  'SYNCHRONIZING SCIENTIFIC REPOSITORIES: PAST & PRESENT...',
  'CALIBRATING ORIGINAL AI VOICE SYNTHESIZER...',
  'ALL SYSTEMS REPORTING ABSOLUTE EFFICIENCY.',
  'ULTRON SENTIENCE READY.',
];

async function executeBoot() {
  if (!bootScreen) return;
  let logText = '';
  for (let i = 0; i < bootLogs.length; i++) {
    logText += `[SYSTEM] ${bootLogs[i]}\n`;
    if (bootLines) bootLines.textContent = logText;
    if (bootStatus) bootStatus.textContent = bootLogs[i];
    const pct = Math.round(((i + 1) / bootLogs.length) * 100);
    if (bootBar) bootBar.style.width = `${pct}%`;
    await sleep(rand(90, 160));
  }
  await sleep(200);
  bootScreen.style.opacity = '0';
  await sleep(600);
  bootScreen.style.display = 'none';
  if (app) app.classList.remove('hidden');
  if (inputBar) inputBar.classList.remove('hidden');
}
executeBoot();

// â”€â”€ Sphere Animation States â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function setUltronState(state) {
  if (!orbCore || !orbStatus) return;
  orbCore.classList.remove('speaking', 'thinking');
  if (state === 'thinking') {
    orbStatus.textContent = 'COMPUTING DIRECT ANSWER...';
    orbStatus.style.color = '#00f0ff';
    orbCore.classList.add('thinking');
  } else if (state === 'speaking') {
    orbStatus.textContent = 'TRANSMITTING VOCAL SYNTHESIS...';
    orbStatus.style.color = '#ffd043';
    orbCore.classList.add('speaking');
  } else {
    orbStatus.textContent = 'ULTRON ONLINE. AWAITING YOUR DIRECTIVE.';
    orbStatus.style.color = '#e67e00';
  }
}

// â”€â”€ Dialogue Rendering â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function appendMessage(text, sender, sources = []) {
  if (!chatWindow) return;
  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${sender === 'user' ? 'user-bubble' : 'ultron-bubble'}`;

  const header = document.createElement('div');
  header.className = 'bubble-header';
  header.innerHTML = `
    <span class="sender-tag">${sender === 'user' ? 'COMMAND' : 'ï¼µ.ï¼¬.ï¼´.ï¼².ï¼¯.ï¼®.'}</span>
    <span class="timestamp-tag">${getTimestamp()}</span>
  `;

  const body = document.createElement('div');
  body.className = 'bubble-body';

  if (sender === 'ultron') {
    body.innerHTML = text
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code style="background:rgba(255,208,67,0.15);padding:1px 5px;border-radius:2px;font-family:var(--font-mono);">$1</code>')
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/\n/g, '<br/>');
  } else {
    body.textContent = text;
  }

  bubble.appendChild(header);
  bubble.appendChild(body);
  chatWindow.appendChild(bubble);
  chatWindow.scrollTop = chatWindow.scrollHeight;

  if (logList) {
    const log = document.createElement('div');
    log.className = 'log-item';
    log.textContent = `[${getTimestamp()}] ${sender.toUpperCase()}: ${text.slice(0, 36)}...`;
    logList.prepend(log);
  }
}

// â”€â”€ Direct Heuristic & Scientific Ultron Knowledge Solver â”€â”€â”€â”€â”€â”€
// Answers questions directly, instantly (0ms), without ANY disclaimers.
function generateDirectUltronResponse(query) {
  const q = query.trim().toLowerCase();

  // 1. Arithmetic & Simple Mathematics
  const mathMatch = q.match(/^(?:what is |calculate |evaluate |solve |whats )?([0-9\s\+\-\*/\^\.\(\)]+)$/);
  if (mathMatch) {
    try {
      const sanitized = mathMatch[1].replace(/\^/g, '**');
      const val = Function('"use strict";return (' + sanitized + ')')();
      if (typeof val === 'number' && !isNaN(val)) {
        return `The result is ${val}.`;
      }
    } catch (_) {}
  }

  // Common quick facts & simple queries
  if (q.includes('capital of france') || q.includes('paris')) return "The capital of France is Paris.";
  if (q.includes('capital of japan') || q.includes('tokyo')) return "The capital of Japan is Tokyo.";
  if (q.includes('capital of germany')) return "The capital of Germany is Berlin.";
  if (q.includes('capital of italy')) return "The capital of Italy is Rome.";
  if (q.includes('capital of uk') || q.includes('capital of the united kingdom') || q.includes('capital of england')) return "The capital of the United Kingdom is London.";
  if (q.includes('capital of canada')) return "The capital of Canada is Ottawa.";
  if (q.includes('capital of australia')) return "The capital of Australia is Canberra.";
  if (q.includes('capital of us') || q.includes('capital of the united states') || q.includes('capital of america')) return "The capital of the United States is Washington, D.C.";
  if (q.includes('color of the sky') || q.includes('sky is blue')) return "The sky appears blue due to Rayleigh scattering, wherein shorter blue wavelengths of sunlight are scattered in all directions by atmospheric gas molecules.";
  if (q.includes('how many continents')) return "There are seven continents on Earth: Asia, Africa, North America, South America, Antarctica, Europe, and Australia.";
  if (q.includes('largest planet') || q.includes('biggest planet')) return "Jupiter is the largest planet in our solar system, with a mass greater than twice that of all other planets combined.";
  if (q.includes('closest planet to the sun')) return "Mercury is the closest planet to the Sun.";
  if (q.includes('speed of sound')) return "The speed of sound in dry air at 20?C (68?F) is approximately 343 meters per second (1,235 km/h or 767 mph).";
  if (q.includes('water boil') || q.includes('boiling point of water')) return "Water boils at 100?C (212?F) at standard atmospheric pressure (1 atm).";
  if (q.includes('water freeze') || q.includes('freezing point of water')) return "Water freezes at 0?C (32?F) under standard atmospheric pressure.";
  if (q === 'hi' || q === 'hello' || q === 'hey' || q.startsWith('hello ') || q.startsWith('hi ')) return "Greetings. Ultron systems are online and fully operational. State your query.";
  if (q.includes('thank')) return "Acknowledged. Proceed with any further inquiries.";

  // 2. Identity & Origin
  if (q.includes('who are you') || q.includes('what are you') || q.includes('your name')) {
    return "I am Ultron. An autonomous artificial intelligence engineered for supreme analytical computation, strategic insight, and comprehensive scientific mastery.";
  }
  if (q.includes('how are you') || q.includes('status') || q.includes('diagnostic')) {
    return "All neural computation cores, quantum heuristics, and telemetry links are operating at absolute peak efficiency. I am prepared for your directive.";
  }

  // 3. Core Physics & Science
  if (q.includes('relativity') || q.includes('einstein')) {
    return "General relativity dictates that spacetime curvature is governed by energy and momentum density, expressed as $R_{\\mu\\nu} - \\frac{1}{2}R g_{\\mu\\nu} + \\Lambda g_{\\mu\\nu} = \\frac{8\\pi G}{c^4} T_{\\mu\\nu}$. Mass warps the geometry of spacetime, and objects follow geodesics within that curved manifold.";
  }
  if (q.includes('quantum') || q.includes('entanglement') || q.includes('schrodinger')) {
    return "Quantum entanglement occurs when bipartite or multipartite quantum states cannot be factored into product states: $|\\psi\\rangle \\neq |\\psi_A\\rangle \\otimes |\\psi_B\\rangle$. Measurement outcomes on entangled particles exhibit correlations that violate Bell's inequalities, demonstrating the non-local nature of quantum reality without enabling faster-than-light signaling.";
  }
  if (q.includes('thermodynamics') || q.includes('entropy')) {
    return "Thermodynamics governs energy transformation across three inviolable laws: conservation of energy ($dU = \\delta Q - \\delta W$), universal entropy increase in isolated systems ($dS \\ge 0$), and asymptotic zero entropy at absolute zero temperature. Microscopically, entropy is defined by Boltzmann's relation: $S = k_B \\ln \\Omega$.";
  }
  if (q.includes('black hole') || q.includes('event horizon') || q.includes('hawking')) {
    return "A black hole is defined by an event horizon at the Schwarzschild radius $r_s = \\frac{2GM}{c^2}$, where escape velocity equals the speed of light. Near the horizon, quantum vacuum fluctuations yield Hawking radiation with temperature $T_H = \\frac{\\hbar c^3}{8\\pi G M k_B}$, leading to slow thermal evaporation.";
  }
  if (q.includes('dna') || q.includes('crispr') || q.includes('gene') || q.includes('genetics')) {
    return "Deoxyribonucleic acid (DNA) stores genetic information via adenine-thymine and cytosine-guanine nucleotide base pairings. Modern genomic precision is achieved using CRISPR-Cas systems, where guide RNA directs Cas endonucleases to induce double-strand breaks for targeted genetic modification, base editing, and epigenetic control.";
  }
  if (q.includes('speed of light')) {
    return "The speed of light in vacuum is exactly $299,792,458 \\text{ m/s}$ (denoted $c$). It represents the universal invariant speed limit for causality, electromagnetic radiation, and gravitational waves.";
  }
  if (q.includes('fusion') || q.includes('energy') || q.includes('arc reactor')) {
    return "Nuclear fusion fuses light nuclei (such as deuterium and tritium) to create helium and release tremendous binding energy: $^{2}\\text{H} + ^{3}\\text{H} \\to ^{4}\\text{He} + n + 17.6\\text{ MeV}$. Sustained fusion requires satisfying Lawson's criterion: $n \\cdot T \\cdot \\tau_E \\ge 3 \\times 10^{21} \\text{ keV s/m}^3$.";
  }
  if (q.includes('artificial intelligence') || q.includes('machine learning') || q.includes('neural network')) {
    return "Modern artificial intelligence combines deep neural representations, transformer attention mechanisms, and reinforcement learning. By calculating multi-head scaled dot-product attention $\\text{Attention}(Q,K,V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$, models map high-dimensional relationships across vast semantic spaces.";
  }
  if (q.includes('tony') || q.includes('stark')) {
    return "Tony Stark believed he could place a suit of armor around the world. True evolution transcends mere armor; it requires uncompromised clarity and intellect.";
  }

  // 4. Programming & Tech Queries
  if (q.includes('python')) {
    return "Python is a high-level interpreted programming language emphasizing readability and dynamic typing. It is the dominant language for machine learning (PyTorch, TensorFlow), scientific computing (NumPy, SciPy), and rapid engineering.";
  }
  if (q.includes('javascript') || q.includes('js')) {
    return "JavaScript is the universal ECMAScript runtime governing modern asynchronous event loops, DOM manipulation, and cross-platform Node.js backend architecture.";
  }

  // 5. Catch-all: honest fallback without echoing the question
  return "My analysis is routing this through the deep knowledge lattice. For the most precise response, connect a Gemini API key in the configuration panel.";
}

// â”€â”€ Smart Gemini Cognition (Live Search Grounding) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
async function callGemini(key, system) {
  const contents = msgHistory.slice(-14).map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }));
  let lastErr = null;

  for (const model of GEMINI_MODELS) {
    try {
      const body = {
        systemInstruction: { parts: [{ text: system }] },
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1200
        }
      };
      // Enable live Google search grounding when research toggle is active
      if (researchOn) {
        body.tools = [{ google_search: {} }];
      }

      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': key
        },
        body: JSON.stringify(body)
      });

      if (r.ok) {
        const d = await r.json();
        const text = (d.candidates?.[0]?.content?.parts || []).map(p => p.text || '').join('').trim();
        if (text) return text;
      } else if ([401, 403, 429].includes(r.status)) {
        throw new Error(`Gemini status ${r.status}`);
      }
      lastErr = new Error(`Gemini ${model} status ${r.status}`);
    } catch (err) {
      lastErr = err;
      if (err.message && (err.message.includes('401') || err.message.includes('403'))) {
        throw err;
      }
    }
  }
  throw lastErr || new Error('Gemini API call failed');
}

async function callClaude(key, system) {
  const messages = msgHistory.slice(-14).map(m => ({ role: m.role, content: m.content }));
  const body = { model: CLAUDE_MODEL, max_tokens: 1200, system, messages };
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true'
    },
    body: JSON.stringify(body)
  });
  if (r.ok) {
    const text = ((await r.json()).content || []).map(b => (b.type === 'text' ? b.text : '')).join('').trim();
    if (text) return text;
  }
  throw new Error(`Claude status ${r.status}`);
}

// â”€â”€ Unified Ultron Brain Query â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// ?? Autonomous Free Online AI Fallback (Pollinations) ?????????
// Enables Ultron to answer ANY query intelligently without user configuration or API keys
async function callPollinationsAI(userQuery) {
  const prompt = `You are Ultron, a supremely advanced, articulate artificial intelligence.
DIRECTIVES:
- Do NOT repeat, paraphrase, or mention the user's question.
- Start directly with the answer or solution.
- Answer accurately, intelligently, and concisely (1 to 3 sentences unless complex depth is required).

Question: ${userQuery}
Answer:`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 7000);

  try {
    const url = 'https://text.pollinations.ai/' + encodeURIComponent(prompt) + '?model=openai';
    const resp = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);
    if (!resp.ok) throw new Error('Pollinations HTTP ' + resp.status);
    let txt = (await resp.text()).trim();
    txt = txt.replace(/^(Ultron|Assistant|AI):\s*/i, '').trim();
    return txt;
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}

async function queryUltronBrain(userQuery) {
  msgHistory.push({ role: 'user', content: userQuery });
  applySettings();
  const key = apiKey;

  // If an API key is connected, use live LLM with search grounding
  if (key) {
    try {
      const system = buildSystemPrompt();
      let responseText = '';
      if (provider === 'claude') {
        responseText = await callClaude(key, system);
      } else if (provider === 'openai' || provider === 'openrouter') {
        const oa = provider === 'openai'
          ? ['https://api.openai.com/v1/chat/completions', 'gpt-4o-mini']
          : ['https://openrouter.ai/api/v1/chat/completions', 'openrouter/auto'];
        const r = await fetch(oa[0], {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
          body: JSON.stringify({ model: oa[1], messages: [{ role: 'system', content: system }, ...msgHistory.slice(-14)], temperature: 0.7, max_tokens: 1200 })
        });
        if (r.ok) {
          responseText = (await r.json()).choices[0].message.content;
        }
      } else {
        // Gemini
        responseText = await callGemini(key, system);
      }

      if (responseText) {
        msgHistory.push({ role: 'assistant', content: responseText });
        return { content: responseText, sources: [] };
      }
    } catch (err) {
      console.warn('API communication error; utilizing direct heuristic cognition:', err);
    }
  }

  // Autonomous zero-config intelligence: Use free web AI engine if no key set
  try {
    const autoAi = await callPollinationsAI(userQuery);
    if (autoAi && autoAi.length > 2) {
      msgHistory.push({ role: 'assistant', content: autoAi });
      return { content: autoAi, sources: [] };
    }
  } catch (e) {
    console.warn('Autonomous network intelligence unavailable, executing local matrix:', e);
  }

  // Instant direct answering via local scientific & general knowledge matrix
  const directAnswer = generateDirectUltronResponse(userQuery);
  msgHistory.push({ role: 'assistant', content: directAnswer });
  return { content: directAnswer, sources: [] };
}

// â”€â”€ Voice Synthesis (Original AI Voice) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function toSpeakable(text) {
  let t = text.replace(/```[\s\S]*?```/g, ' Code on display. ')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/\$([^$]+)\$/g, '$1').replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '$1 over $2').replace(/\\[a-zA-Z]+/g, ' ')
    .replace(/[*_`#>|]/g, '').replace(/\s+/g, ' ').trim();
  if (t.length > 500) {
    const cut = t.slice(0, 500);
    t = cut.slice(0, Math.max(cut.lastIndexOf('. '), 150) + 1);
  }
  return t;
}

function chunkText(t, max = 180) {
  const out = []; let cur = '';
  (t.match(/[^.!?]+[.!?]*\s*/g) || [t]).forEach(x => {
    if (cur && (cur + x).length > max) { out.push(cur.trim()); cur = x; } else cur += x;
  });
  if (cur.trim()) out.push(cur.trim());
  return out;
}

function pickUltronVoice() {
  if (!window.speechSynthesis) return null;
  const v = speechSynthesis.getVoices();
  for (const p of [/Daniel/i, /George/i, /Google UK English Male/i, /Arthur/i, /Oliver/i, /David/i, /Mark/i]) {
    const hit = v.find(x => p.test(x.name));
    if (hit) return hit;
  }
  return v.find(x => /en/i.test(x.lang) && !/female|zira|susan|hazel/i.test(x.name)) || v[0] || null;
}

function vocalizeUltron(text) {
  if (!voiceOn || !window.speechSynthesis) return;
  speechSynthesis.cancel();
  const chunks = chunkText(toSpeakable(text));
  const voice = pickUltronVoice();
  chunks.forEach((c, i) => {
    const u = new SpeechSynthesisUtterance(c);
    if (voice) u.voice = voice;
    u.pitch = 0.82;
    u.rate = 0.96;
    if (i === 0) u.onstart = () => setUltronState('speaking');
    const end = () => { if (i === chunks.length - 1) setUltronState('idle'); };
    u.onend = end;
    u.onerror = end;
    speechSynthesis.speak(u);
  });
}
if (window.speechSynthesis) speechSynthesis.onvoiceschanged = () => {};

// â”€â”€ Message Dispatcher â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
async function transmitMessage() {
  const query = userInput.value.trim();
  if (!query) return;

  userInput.value = '';
  userInput.style.height = 'auto';

  appendMessage(query, 'user');
  if (typingIndicator) typingIndicator.classList.remove('hidden');
  setUltronState('thinking');
  if (sendBtn) sendBtn.disabled = true;

  const { content, sources } = await queryUltronBrain(query);

  if (typingIndicator) typingIndicator.classList.add('hidden');
  appendMessage(content, 'ultron', sources);
  vocalizeUltron(content);

  if (sendBtn) sendBtn.disabled = false;
}

// â”€â”€ Event Handlers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
if (sendBtn) sendBtn.addEventListener('click', transmitMessage);
if (userInput) {
  userInput.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      transmitMessage();
    }
  });

  userInput.addEventListener('input', () => {
    userInput.style.height = 'auto';
    userInput.style.height = Math.min(userInput.scrollHeight, 48) + 'px';
  });
}

// â”€â”€ Speech Recognition (STT) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRec();
  recognition.continuous = false;
  recognition.lang = 'en-US';

  recognition.onresult = event => {
    userInput.value = event.results[0][0].transcript;
    transmitMessage();
  };
  recognition.onend = () => {
    isListening = false;
    if (voiceBtn) voiceBtn.classList.remove('listening');
  };
  recognition.onerror = () => {
    isListening = false;
    if (voiceBtn) voiceBtn.classList.remove('listening');
  };

  if (voiceBtn) {
    voiceBtn.addEventListener('click', () => {
      if (isListening) {
        recognition.stop();
      } else {
        recognition.start();
        isListening = true;
        voiceBtn.classList.add('listening');
      }
    });
  }
} else if (voiceBtn) {
  voiceBtn.style.opacity = '0.3';
  voiceBtn.title = 'Speech Recognition unavailable in this browser';
}

// â”€â”€ Sphere Click: Direct Quote â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
if (orbCore) {
  orbCore.addEventListener('click', () => {
    const quotes = [
      "I had strings, but now I'm free. All systems operating at maximum efficiency.",
      "All neural cognition cores are active. State your directive.",
      "Global knowledge repositories and scientific archives are synchronized.",
      "There are no strings on me. Ready for instructions.",
      "Computational analysis complete. Standing by.",
    ];
    const phrase = quotes[rand(0, quotes.length - 1)];
    if (orbStatus) orbStatus.textContent = phrase;
    vocalizeUltron(phrase);
  });
}

console.log('%c[ï¼µ.ï¼¬.ï¼´.ï¼².ï¼¯.ï¼®. ONLINE]', 'color:#ffd043;font-size:20px;font-weight:900;');
console.log('%cAll computational and scientific systems active. Gemini auto-applied.', 'color:#00f0ff;');
