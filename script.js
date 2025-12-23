/************************************************************
 * CUSTOMIZE
 ************************************************************/
const CONFIG = {
  yourName: "Wai Lin Thu",
  yourNickname: "Mg",
  partnerName: "Nay Chi Wink Htel",
  partnerNickname: "MaMa",

  // Relationship start date: 18 April 2025
  anniversaryStart: "2025-04-18T00:00:00",

  headline: "Happy 8 Month Anniversary, MaMa 💗",
  subline: "This little website is my way of saying: you matter to me more than my words can hold.",
  badgeText: "8 months, and I’d still choose you—again and again.",
  mainQuote: "“You turned ordinary days into something I look forward to.”",

  highlights: [
    { label: "April 18, 2025", title: "The day we became us", desc: "The beginning of my favorite story." },
    { label: "Month 2", title: "Distance tried to test us", desc: "But we kept choosing each other." },
    { label: "Month 5", title: "Love became a habit", desc: "Soft, steady, real." },
    { label: "Month 8", title: "Still you. Still me. Still us.", desc: "And I’m grateful—every single day." },
  ],

  galleryImages: ["", "", "", "", "", ""],

  // Music mode: YouTube embed (audio-only style)
  musicMode: "embed",

  // ✅ YouTube embed URL (enable JS API so we can play/pause)
  embedUrl: "https://www.youtube.com/embed/V9PVRfjEBTI?enablejsapi=1&autoplay=0&controls=0&rel=0",

  localMp3File: ""
};

/************************************************************
 * Set text content
 ************************************************************/
document.getElementById("badgeText").textContent = CONFIG.badgeText;
document.getElementById("headline").innerHTML =
  `Happy 8 Month Anniversary, <span class="accent">${escapeHtml(CONFIG.partnerNickname)}</span> 💗`;
document.getElementById("subline").textContent = CONFIG.subline;

const mainQuoteEl = document.getElementById("mainQuote");
if (mainQuoteEl) mainQuoteEl.textContent = CONFIG.mainQuote;

document.getElementById("fromName").textContent = CONFIG.yourNickname;
document.getElementById("toName").textContent = CONFIG.partnerNickname;

/************************************************************
 * Hearts background
 ************************************************************/
const heartsWrap = document.getElementById("hearts");
function spawnHearts(){
  const count = 18;
  for(let i=0;i<count;i++){
    const el = document.createElement("div");
    el.className = "heart";
    el.innerHTML = "❤";
    const left = Math.random()*100;
    const size = 12 + Math.random()*18;
    const duration = 10 + Math.random()*18;
    const delay = Math.random()*-duration;
    const drift = (Math.random()*120 - 60) + "px";
    el.style.left = left + "vw";
    el.style.fontSize = size + "px";
    el.style.animationDuration = duration + "s";
    el.style.animationDelay = delay + "s";
    el.style.setProperty("--drift", drift);
    heartsWrap.appendChild(el);
  }
}
spawnHearts();

/************************************************************
 * Timeline (highlights)
 ************************************************************/
const timelineEl = document.getElementById("timeline");
function renderHighlights(){
  timelineEl.innerHTML = "";
  CONFIG.highlights.forEach(h => {
    const row = document.createElement("div");
    row.className = "event";
    row.innerHTML = `
      <div class="pill">${escapeHtml(h.label)}</div>
      <div>
        <h4>${escapeHtml(h.title)}</h4>
        <p>${escapeHtml(h.desc)}</p>
      </div>
    `;
    timelineEl.appendChild(row);
  });
}
renderHighlights();

/************************************************************
 * Gallery
 ************************************************************/
const galleryEl = document.getElementById("gallery");
function renderGallery(){
  galleryEl.innerHTML = "";
  CONFIG.galleryImages.forEach((src, idx) => {
    const box = document.createElement("div");
    box.className = "ph";
    box.innerHTML = `<span>Photo ${idx+1}<br>add URL in script.js</span><img alt="photo ${idx+1}">`;
    const img = box.querySelector("img");
    if(src && src.trim().length){
      img.src = src.trim();
      box.classList.add("hasImg");
    }
    galleryEl.appendChild(box);
  });
}
renderGallery();

/************************************************************
 * Music (YouTube audio-only style)
 ************************************************************/
const musicBtn = document.getElementById("musicBtn");
const embedWrap = document.getElementById("embedWrap");
const songEmbed = document.getElementById("songEmbed");
const audioWrap = document.getElementById("audioWrap");
const musicNote = document.getElementById("musicNote");

// Keep (not used now, but compatible)
const bgm = document.getElementById("bgm");
const bgmSource = document.getElementById("bgmSource");

let ytPlayer = null;
let musicOn = false;

function setupMusic(){
  embedWrap.style.display = "none";
  audioWrap.style.display = "none";

  // --- YouTube embed mode ---
  if (CONFIG.musicMode === "embed") {
    const url = (CONFIG.embedUrl || "").trim();

    if (!url) {
      musicNote.innerHTML =
        `Add a YouTube <b>embed URL</b> in <b>script.js</b> (CONFIG.embedUrl).`;
      musicBtn.disabled = true;
      return;
    }

    // Load hidden iframe (audio-only style via CSS)
    songEmbed.src = url;
    embedWrap.style.display = "block";
    audioWrap.style.display = "none";

    // Button becomes Play/Pause
    musicBtn.disabled = false;
    musicBtn.textContent = "Play Song 🎵";
    musicNote.textContent = "Audio only: tap Play. (Video is hidden.)";

    musicBtn.addEventListener("click", () => {
      if (!ytPlayer) {
        // If API not ready yet, try message fallback
        tryPostMessagePlay();
        return;
      }
      if (!musicOn) {
        ytPlayer.playVideo();
        musicOn = true;
        musicBtn.textContent = "Pause Song ⏸";
      } else {
        ytPlayer.pauseVideo();
        musicOn = false;
        musicBtn.textContent = "Play Song 🎵";
      }
    });

    return;
  }

  // --- Local MP3 mode (optional) ---
  if (CONFIG.musicMode === "mp3") {
    const file = (CONFIG.localMp3File || "").trim();
    if (!file) {
      musicNote.innerHTML =
        `Put your MP3 in the folder and set <b>CONFIG.localMp3File</b> in <b>script.js</b>.`;
      musicBtn.disabled = true;
      return;
    }
    bgmSource.src = file;
    bgm.load();
    audioWrap.style.display = "block";
    embedWrap.style.display = "none";
    musicBtn.disabled = false;
    musicBtn.textContent = "Music: Off ♪";

    musicBtn.addEventListener("click", async () => {
      try{
        if(!musicOn){
          await bgm.play();
          musicOn = true;
          musicBtn.textContent = "Music: On ♪";
        } else {
          bgm.pause();
          musicOn = false;
          musicBtn.textContent = "Music: Off ♪";
        }
      } catch(e){
        toast("Browser blocked autoplay — tap again.");
      }
    });
  }
}

function tryPostMessagePlay(){
  // fallback: YouTube postMessage commands (works if JS API loads)
  songEmbed.contentWindow?.postMessage(
    '{"event":"command","func":"playVideo","args":""}',
    "*"
  );
  toast("Tap again if it doesn’t start (browser policy).");
}

setupMusic();

// YouTube iframe API hook
window.onYouTubeIframeAPIReady = function () {
  // Create a controllable player
  ytPlayer = new YT.Player("songEmbed", {
    events: {
      onReady: () => {
        // Player ready
      },
      onStateChange: (e) => {
        // Sync button if user pauses/plays via other means
        if (e.data === YT.PlayerState.PLAYING) {
          musicOn = true;
          musicBtn.textContent = "Pause Song ⏸";
        }
        if (e.data === YT.PlayerState.PAUSED || e.data === YT.PlayerState.ENDED) {
          musicOn = false;
          musicBtn.textContent = "Play Song 🎵";
        }
      }
    }
  });
};

/************************************************************
 * Live counter
 ************************************************************/
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const sinceTextEl = document.getElementById("sinceText");
const start = new Date(CONFIG.anniversaryStart);

function tick(){
  const now = new Date();
  const diff = Math.max(0, now - start);

  const sec = Math.floor(diff / 1000);
  const days = Math.floor(sec / 86400);
  const hours = Math.floor((sec % 86400) / 3600);
  const mins = Math.floor((sec % 3600) / 60);
  const secs = sec % 60;

  daysEl.textContent = days.toLocaleString();
  hoursEl.textContent = hours.toString().padStart(2,"0");
  minutesEl.textContent = mins.toString().padStart(2,"0");
  secondsEl.textContent = secs.toString().padStart(2,"0");
  sinceTextEl.textContent = "Since: " + start.toLocaleString();
}
tick();
setInterval(tick, 1000);

/************************************************************
 * Letter modal + localStorage
 ************************************************************/
const letterModal = document.getElementById("letterModal");
const openLetterBtn = document.getElementById("openLetterBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const saveLetterBtn = document.getElementById("saveLetterBtn");
const copyLetterBtn = document.getElementById("copyLetterBtn");
const resetLetterBtn = document.getElementById("resetLetterBtn");
const letterArea = document.getElementById("letterArea");

const LETTER_KEY = "anniv_letter_v1";
const defaultLetter =
`MaMa,

Happy 8 month anniversary 💗
Thank you for choosing me even when distance tries to test us.
I promise to love you gently, consistently, and honestly.

I miss you — but I’m proud of us.

With my deepest love,
Mg`;

function openModal(){
  const saved = localStorage.getItem(LETTER_KEY);
  letterArea.value = saved ?? defaultLetter;
  letterModal.classList.add("show");
}
function closeModal(){ letterModal.classList.remove("show"); }

openLetterBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
letterModal.addEventListener("click", (e) => {
  if(e.target === letterModal) closeModal();
});

saveLetterBtn.addEventListener("click", () => {
  localStorage.setItem(LETTER_KEY, letterArea.value);
  toast("Saved 💗");
});

copyLetterBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(letterArea.value)
    .then(() => toast("Copied ✅"))
    .catch(() => toast("Copy blocked by browser"));
});

resetLetterBtn.addEventListener("click", () => {
  localStorage.removeItem(LETTER_KEY);
  toast("Reset done");
});

/************************************************************
 * Promises board (localStorage)
 ************************************************************/
const promisesEl = document.getElementById("promises");
const addPromiseBtn = document.getElementById("addPromiseBtn");
const clearPromisesBtn = document.getElementById("clearPromisesBtn");
const PROMISES_KEY = "anniv_promises_v1";

function loadPromises(){
  try{ return JSON.parse(localStorage.getItem(PROMISES_KEY) || "[]"); }
  catch{ return []; }
}
function savePromises(list){
  localStorage.setItem(PROMISES_KEY, JSON.stringify(list));
}

function renderPromises(){
  const list = loadPromises();
  promisesEl.innerHTML = "";
  if(!list.length){
    const empty = document.createElement("div");
    empty.className = "event";
    empty.innerHTML = `
      <div class="pill">Start</div>
      <div>
        <h4>Add your first promise</h4>
        <p>Example: “I will listen first, and love always.”</p>
      </div>
    `;
    promisesEl.appendChild(empty);
    return;
  }

  list.forEach((p, idx) => {
    const row = document.createElement("div");
    row.className = "event";
    row.innerHTML = `
      <div class="pill">Promise ${idx+1}</div>
      <div style="flex:1">
        <h4>${escapeHtml(p.title)}</h4>
        <p>${escapeHtml(p.text)}</p>
        <div class="btnRow" style="margin-top:10px;">
          <button data-del="${idx}" class="danger">Delete</button>
        </div>
      </div>
    `;
    promisesEl.appendChild(row);
  });

  promisesEl.querySelectorAll("button[data-del]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const idx = Number(btn.getAttribute("data-del"));
      const list = loadPromises();
      list.splice(idx,1);
      savePromises(list);
      renderPromises();
    });
  });
}
renderPromises();

addPromiseBtn.addEventListener("click", () => {
  const title = prompt("Promise title (short):", "I promise…");
  if(title === null) return;
  const text = prompt("Write your promise:", "I will choose you with patience, every day.");
  if(text === null) return;

  const list = loadPromises();
  list.unshift({ title: title.trim() || "My promise", text: text.trim() || "Always." });
  savePromises(list);
  renderPromises();
  toast("Added 💗");
});

clearPromisesBtn.addEventListener("click", () => {
  const ok = confirm("Clear all promises on this device?");
  if(!ok) return;
  localStorage.removeItem(PROMISES_KEY);
  renderPromises();
  toast("Cleared");
});

/************************************************************
 * Confetti celebration
 ************************************************************/
const celebrateBtn = document.getElementById("celebrateBtn");
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
let W, H;

function resize(){
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

let confetti = [];
let confettiAnim = null;

function burst(){
  const pieces = 180;
  confetti = [];
  for(let i=0;i<pieces;i++){
    confetti.push({
      x: W/2 + (Math.random()*120-60),
      y: H/2 + (Math.random()*60-30),
      r: 2 + Math.random()*4,
      vx: (Math.random()*8-4),
      vy: (Math.random()*-10-2),
      g: 0.22 + Math.random()*0.08,
      a: 1,
      life: 90 + Math.random()*70
    });
  }
  animateConfetti();
  toast("Happy 8 months! 🎉");
}

function animateConfetti(){
  if(confettiAnim) cancelAnimationFrame(confettiAnim);
  ctx.clearRect(0,0,W,H);

  confetti.forEach(p=>{
    p.vy += p.g;
    p.x += p.vx;
    p.y += p.vy;
    p.life -= 1;
    p.a = Math.max(0, p.life/160);

    ctx.globalAlpha = p.a;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fill();
  });

  confetti = confetti.filter(p => p.life > 0 && p.y < H+40);
  ctx.globalAlpha = 1;

  if(confetti.length){
    confettiAnim = requestAnimationFrame(animateConfetti);
  } else {
    ctx.clearRect(0,0,W,H);
  }
}
celebrateBtn.addEventListener("click", burst);

/************************************************************
 * Toast
 ************************************************************/
let toastTimer = null;
function toast(msg){
  let t = document.getElementById("toast");
  if(!t){
    t = document.createElement("div");
    t.id = "toast";
    t.style.position = "fixed";
    t.style.left = "50%";
    t.style.bottom = "22px";
    t.style.transform = "translateX(-50%)";
    t.style.padding = "10px 12px";
    t.style.borderRadius = "999px";
    t.style.background = "rgba(0,0,0,.5)";
    t.style.border = "1px solid rgba(255,255,255,.18)";
    t.style.backdropFilter = "blur(10px)";
    t.style.boxShadow = "0 14px 40px rgba(0,0,0,.45)";
    t.style.color = "rgba(255,255,255,.92)";
    t.style.fontSize = "13px";
    t.style.zIndex = "60";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = "1";
  if(toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> t.style.opacity="0", 1800);
}

/************************************************************
 * Utility
 ************************************************************/
function escapeHtml(str){
  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}