const highlight = document.querySelector('.highlight');
const navItems = document.querySelectorAll('.navigation li');
const navLinks = document.querySelectorAll('.navigation a');
const sections = document.querySelectorAll('.section');

function setHighlight(el) {
  highlight.style.height = el.offsetHeight + 'px';
  highlight.style.left = el.offsetLeft + 'px';
  highlight.style.top = el.offsetTop + 'px';
}

function loadTwitchPlayer() {
    const embed = document.getElementById('twitch-embed');
    embed.innerHTML = ""; // Limpa o container antes de criar o player
    const script = document.createElement('script');
    script.src = "https://player.twitch.tv/js/embed/v1.js";
    script.onload = function() {
        new Twitch.Player("twitch-embed", {
            video: "2459683679", // ou use channel: "ybaianoo"
            width: 800,
            height: 500,
            parent: ["localhost"]
        });
    };
    document.body.appendChild(script);
}

function activateSection(id, li) {
  navItems.forEach(item => item.classList.remove('active'));
  sections.forEach(sec => sec.classList.remove('active'));

  li.classList.add('active');
  document.getElementById(id).classList.add('active');
  setHighlight(li);

  // Deixa a aba serviços muda até ser acionada
  if (id === "servicos") {
    loadTwitchPlayer();
  } else {
    // Limpa o player ao sair da aba serviços
    const embed = document.getElementById('twitch-embed');
    if (embed) embed.innerHTML = "";
  }

  const titles = {
    home: 'Home',
    sobre: 'Sobre',
    servicos: 'Serviços',
    portifolio: 'Portifolio',
    'mundo-dos-saberes': 'Mundo dos Saberes',
    contato: 'Contato'
  };
  document.getElementById('main-title').textContent = titles[id] || '';
}

// Evento de clique nos links
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const id = this.getAttribute('href').replace('#', '');
    activateSection(id, this.parentElement);
  });
});

// Inicializa highlight e seção ativa ao carregar
window.addEventListener('DOMContentLoaded', () => {
  const li = document.querySelector('.navigation li.active');
  if (li) setHighlight(li);
});

// Ajusta o highlight ao redimensionar a janela
window.addEventListener('resize', () => {
  const li = document.querySelector('.navigation li.active');
  if (li) setHighlight(li);
});

// Slideshow automático para a aba Sobre
document.addEventListener("DOMContentLoaded", function() {
  const slides = document.querySelectorAll('.sobre-slideshow .slide-img');
  let idx = 0;
  setInterval(() => {
    slides[idx].classList.remove('active');
    idx = (idx + 1) % slides.length;
    slides[idx].classList.add('active');
  }, 3500);
});