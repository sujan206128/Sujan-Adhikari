/* ── CUSTOM CURSOR ── */
const cur = document.getElementById('cursor');
const crng = document.getElementById('cring');

document.addEventListener('mousemove', e => {
  cur.style.left = e.clientX + 'px';
  cur.style.top = e.clientY + 'px';
  crng.style.left = e.clientX + 'px';
  crng.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button, input, textarea').forEach(el => {
  el.addEventListener('mouseenter', () => cur.classList.add('hov'));
  el.addEventListener('mouseleave', () => cur.classList.remove('hov'));
});

/* ── NAVBAR SCROLL ── */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', scrollY > 50);
});

/* ── MOBILE MENU ── */
document.getElementById('ham').addEventListener('click', () => {
  document.getElementById('mobile-menu').classList.toggle('open');
});

function closeMM() {
  document.getElementById('mobile-menu').classList.remove('open');
}

/* ── TYPING ANIMATION ── */
const roles = [
  'HR Professional',
  'Admin & Operations Expert',
  'Process Optimizer',
  'People Operations Lead'
];
let ri = 0, ci = 0, del = false;
const tel = document.getElementById('typed');

function type() {
  const w = roles[ri];
  if (!del) {
    tel.textContent = w.slice(0, ++ci);
    if (ci === w.length) { del = true; setTimeout(type, 1800); return; }
  } else {
    tel.textContent = w.slice(0, --ci);
    if (ci === 0) { del = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(type, del ? 55 : 100);
}
type();

/* ── SKILLS DATA ── */
const skills = [
  { name: 'HR & People Operations',    val: 90 },
  { name: 'Admin & Office Management', val: 92 },
  { name: 'Payroll & HRIS',            val: 85 },
  { name: 'CRM & Account Management',  val: 82 },
  { name: 'Process & Operations',      val: 88 },
  { name: 'Documentation & Reporting', val: 86 },
];

const sb = document.getElementById('skill-bars');
skills.forEach(s => {
  sb.innerHTML += `
    <div>
      <div class="flex justify-between text-sm mb-2">
        <span class="text-gray-300">${s.name}</span>
        <span class="text-sky-400 font-medium">${s.val}%</span>
      </div>
      <div class="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div class="skill-fill h-full bg-gradient-to-r from-sky-500 to-sky-300 rounded-full" data-v="${s.val}"></div>
      </div>
    </div>`;
});

/* ── TOOLS DATA ── */
const tools = [
  'Microsoft Outlook', 'HRIS', 'CRM Systems', 'MS Office',
  'Google Workspace', 'Payroll Software', 'Attendance Systems', 'Excel', 'Data Entry'
];

const tw = document.getElementById('tools-wrap');
tools.forEach(t => {
  tw.innerHTML += `<span class="bg-white/5 border border-white/10 text-gray-300 text-sm px-4 py-2 rounded-full hover:border-sky-500/30 hover:text-sky-300 transition-colors cursor-default">${t}</span>`;
});

/* ── SCROLL REVEAL + SKILL BAR TRIGGER ── */
let skillsDone = false;

const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      if (!skillsDone && e.target.closest('#skills')) {
        skillsDone = true;
        setTimeout(() => {
          document.querySelectorAll('.skill-fill').forEach(b => {
            b.style.width = b.dataset.v + '%';
          });
        }, 300);
      }
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

/* ── CONTACT FORM ── */
function sendMsg() {
  const inputs = document.querySelectorAll('#contact input, #contact textarea');
  let ok = true;
  inputs.forEach(i => { if (!i.value.trim()) ok = false; });

  const m = document.getElementById('fmsg');
  if (!ok) {
    m.textContent = '⚠️ Please fill in all fields.';
    m.className = 'text-center text-sm text-yellow-400';
    m.classList.remove('hidden');
  } else {
    m.textContent = "✅ Message sent! I'll get back to you shortly.";
    m.className = 'text-center text-sm text-green-400';
    m.classList.remove('hidden');
    inputs.forEach(i => i.value = '');
    setTimeout(() => m.classList.add('hidden'), 4000);
  }
}

/* ── FOOTER YEAR ── */
document.getElementById('yr').textContent = new Date().getFullYear();
