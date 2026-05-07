
const themeButtons = document.querySelectorAll('#themeToggle');
const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');

function setTheme(mode){
  const dark = mode === 'dark';
  document.body.classList.toggle('dark', dark);
  localStorage.setItem('portfolio-theme', mode);
  document.querySelectorAll('.switch-thumb').forEach(el => {
    el.textContent = dark ? '🌙' : '☀️';
  });
}

setTheme(localStorage.getItem('portfolio-theme') || 'light');

themeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    setTheme(document.body.classList.contains('dark') ? 'light' : 'dark');
  });
});

if(menuToggle && siteNav){
  menuToggle.addEventListener('click', () => siteNav.classList.toggle('open'));
}

const revealObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('show');
      revealObserver.unobserve(entry.target);
    }
  });
},{threshold:.12});

document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

const counters = document.querySelectorAll('[data-count]');
let counted = false;
function runCounters(){
  if(counted) return;
  counters.forEach(counter=>{
    const target = Number(counter.dataset.count);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 42));
    const timer = setInterval(()=>{
      current += step;
      if(current >= target){
        counter.textContent = target;
        clearInterval(timer);
      }else{
        counter.textContent = current;
      }
    }, 25);
  });
  counted = true;
}
const stats = document.querySelector('.stats');
if(stats){
  const statsObserver = new IntersectionObserver((entries)=>{
    if(entries[0].isIntersecting) runCounters();
  },{threshold:.25});
  statsObserver.observe(stats);
}

const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card[data-category]');
filterBtns.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    filterBtns.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card=>{
      card.style.display = filter === 'all' || card.dataset.category === filter ? 'block' : 'none';
    });
  });
});

function handleContactSubmit(event){
  event.preventDefault();
  const form = event.target;
  const subject = encodeURIComponent('Portfolio Inquiry - ' + form.project.value);
  const body = encodeURIComponent(
    `Hi Jai,\n\nMy name is ${form.name.value}.\nEmail: ${form.email.value}\nProject Type: ${form.project.value}\n\nMessage:\n${form.message.value}`
  );
  window.location.href = `mailto:jai.jain.officials@gmail.com?subject=${subject}&body=${body}`;
  return false;
}
