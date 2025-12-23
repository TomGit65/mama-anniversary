/************************************************************
 * CONFIG (Edit only this part)
 ************************************************************/
const CONFIG = {
  yourName: "Wai Lin Thu",
  yourNickname: "Mg",
  partnerName: "Nay Chi Wink Htel",
  partnerNickname: "MaMa",

  // Relationship start date
  anniversaryStart: "2025-04-24T00:00:00",

  badgeText: "8 months, and I’d still choose you—again and again.",
  headlineHTML: `Happy 8 Month Anniversary, <span style="color: var(--accent)">MaMa</span> 💗`,
  subline: "This little website is my way of saying: you matter to me more than my words can hold.",
  mainQuote: "“မမ အတွက် ဒီစာကို ရေးပေးလိုက်ပါတယ်နော် 💝”",

  highlights: [
    { label: "April 24, 2025", title: "The day we became us", desc: "The beginning of my favorite story." },
    { label: "Month 2", title: "We learned patience", desc: "Distance didn’t win. Love stayed." },
    { label: "Month 5", title: "We grew stronger", desc: "Quiet effort, real care, real love." },
    { label: "Month 8", title: "Still you. Still me. Still us.", desc: "And I’m grateful—every single day." }
  ],

  // Make sure filenames match EXACTLY on GitHub (case-sensitive)
  galleryImages: [
    "images/Image1.jpg",
    "images/image2.jpg",
    "images/image3.jpg",
    "images/image4.jpg",
    "images/image5.jpg",
    "images/image6.jpg"
  ]
};

/************************************************************
 * Helpers
 ************************************************************/
const $ = (id) => document.getElementById(id);

function escapeHtml(str){
  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

/************************************************************
 * Inject top text
 ************************************************************/
$("badgeText").textContent = CONFIG.badgeText;
$("headline").innerHTML = CONFIG.headlineHTML;
$("subline").textContent = CONFIG.subline;
$("mainQuote").textContent = CONFIG.mainQuote;
$("fromName").textContent = CONFIG.yourNickname;
$("toName").textContent = CONFIG.partnerNickname;

/************************************************************
 * Start date text in letter
 ************************************************************/
const startDate = new Date(CONFIG.anniversaryStart);
$("startDateText").textContent = startDate.toLocaleDateString(undefined, {
  year: "numeric", month: "long", day: "numeric"
});

/************************************************************
 * Floating hearts background
 ************************************************************/
(function spawnHearts(){
  const heartsWrap = $("hearts");
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
})();

/************************************************************
 * Highlights timeline
 ************************************************************/
(function renderHighlights(){
  const timelineEl = $("timeline");
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
})();

/************************************************************
 * Gallery
 ************************************************************/
(function renderGallery(){
  const galleryEl = $("gallery");
  galleryEl.innerHTML = "";

  CONFIG.galleryImages.forEach((src, idx) => {
    const box = document.createElement("div");
    box.className = "ph";
    box.innerHTML = `<span>Photo ${idx+1}<br>add in script.js</span><img alt="photo ${idx+1}">`;

    const img = box.querySelector("img");

    if(src && src.trim()){
      img.onload = () => box.classList.add("hasImg");
      img.onerror = () => {
        // Leave placeholder if missing
        box.classList.remove("hasImg");
      };
      img.src = src.trim();
    }

    galleryEl.appendChild(box);
  });
})();

/************************************************************
 * Live counter
 ************************************************************/
(function startCounter(){
  const daysEl = $("days");
  const hoursEl = $("hours");
  const minutesEl = $("minutes");
  const secondsEl = $("seconds");
  const sinceTextEl = $("sinceText");

  function tick(){
    const now = new Date();
    const diff = Math.max(0, now - startDate);

    const totalSec = Math.floor(diff / 1000);
    const days = Math.floor(totalSec / 86400);
    const hours = Math.floor((totalSec % 86400) / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;

    daysEl.textContent = days.toLocaleString();
    hoursEl.textContent = String(hours).padStart(2,"0");
    minutesEl.textContent = String(mins).padStart(2,"0");
    secondsEl.textContent = String(secs).padStart(2,"0");
    sinceTextEl.textContent = "Since: " + startDate.toLocaleString();
  }

  tick();
  setInterval(tick, 1000);
})();

/************************************************************
 * Letter modal (fixed) + 🌸 flower celebration
 ************************************************************/
(function letterModal(){
  const modal = $("letterModal");

  $("openLetterBtn").addEventListener("click", () => {
    modal.classList.add("show");
    flowerBurst(); // 🌸 celebration
  });

  $("closeModalBtn").addEventListener("click", () => modal.classList.remove("show"));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("show");
  });
})();

/************************************************************
 * 🌸 Flower celebration function (as requested)
 ************************************************************/
function flowerBurst(){
  const wrap = $("flowers");
  if(!wrap) return;

  // clear old flowers
  wrap.innerHTML = "";

  const emojis = ["🌸","🌺","🌷","💐","🌼"];
  const count = 26;

  for(let i=0;i<count;i++){
    const f = document.createElement("div");
    f.className = "flower";
    f.textContent = emojis[Math.floor(Math.random()*emojis.length)];

    const left = Math.random()*100;
    const size = 16 + Math.random()*22;
    const duration = 2.8 + Math.random()*2.4; // 2.8s–5.2s
    const drift = (Math.random()*160 - 80) + "px";
    const delay = Math.random()*0.25;

    f.style.left = left + "vw";
    f.style.fontSize = size + "px";
    f.style.animationDuration = duration + "s";
    f.style.animationDelay = delay + "s";
    f.style.setProperty("--drift", drift);

    wrap.appendChild(f);

    // cleanup after animation ends
    setTimeout(() => f.remove(), (duration + delay) * 1000 + 200);
  }
}

/************************************************************
 * Promise board (session-only, no saving) ✅ FIXED
 ************************************************************/
(function promiseBoard(){
  const promisesEl = $("promises");
  let promises = [];

  function renderPromises(){
    promisesEl.innerHTML = "";

    if (!promises.length){
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

    promises.forEach((p, idx) => {
      const row = document.createElement("div");
      row.className = "event";
      row.innerHTML = `
        <div class="pill">Promise ${idx+1}</div>
        <div style="flex:1">
          <h4>${escapeHtml(p.title)}</h4>
          <p>${escapeHtml(p.text)}</p>
          <div class="btnRow" style="margin-top:10px;">
            <button class="danger" type="button" data-del="${idx}">Delete</button>
          </div>
        </div>
      `;
      promisesEl.appendChild(row);
    });

    promisesEl.querySelectorAll("button[data-del]").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.getAttribute("data-del"));
        promises.splice(idx, 1);
        renderPromises();
      });
    });
  }

  $("addPromiseBtn").addEventListener("click", () => {
    const title = prompt("Promise title (short):", "I promise…");
    if (title === null) return;
    const text = prompt("Write your promise:", "I will choose you with patience, every day.");
    if (text === null) return;

    promises.unshift({
      title: title.trim() || "My promise",
      text: text.trim() || "Always."
    });

    renderPromises();
    toast("Added 💗");
  });

  $("clearPromisesBtn").addEventListener("click", () => {
    if (!confirm("Clear all promises (session only)?")) return;
    promises = [];
    renderPromises();
    toast("Cleared");
  });

  renderPromises();
})();

/************************************************************
 * Confetti ✅ FIXED (real burst again)
 ************************************************************/
(function confetti(){
  const celebrateBtn = $("celebrateBtn");
  const canvas = $("confetti");
  const ctx = canvas.getContext("2d");

  let W, H;
  function resize(){
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  let pieces = [];
  let anim = null;

  function burst(){
    const count = 180;
    pieces = [];
    for(let i=0;i<count;i++){
      pieces.push({
        x: W/2 + (Math.random()*120-60),
        y: H/2 + (Math.random()*60-30),
        r: 2 + Math.random()*4,
        vx: (Math.random()*8-4),
        vy: (Math.random()*-10-2),
        g: 0.22 + Math.random()*0.08,
        life: 90 + Math.random()*70
      });
    }
    animate();
    toast("Happy 8 months! 🎉");
  }

  function animate(){
    if(anim) cancelAnimationFrame(anim);
    ctx.clearRect(0,0,W,H);

    pieces.forEach(p=>{
      p.vy += p.g;
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 1;

      const a = Math.max(0, p.life/160);
      ctx.globalAlpha = a;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fill();
    });

    pieces = pieces.filter(p => p.life > 0 && p.y < H + 40);
    ctx.globalAlpha = 1;

    if(pieces.length){
      anim = requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0,0,W,H);
    }
  }

  celebrateBtn.addEventListener("click", burst);
})();

/************************************************************
 * Toast ✅ RESTORED
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