//DOOM
const highlight = document.querySelector('.highlight');
const navItems = document.querySelectorAll('.navigation li');
const navLinks = document.querySelectorAll('.navigation a');
const sections = document.querySelectorAll('.section');
const toggle = document.getElementById("toggle-dark");

//Event
function setHighlight(el) {
  highlight.style.height = el.offsetHeight + 'px';
  highlight.style.left = el.offsetLeft + 'px';
  highlight.style.top = el.offsetTop + 'px';
}

function activateSection(id, li) {
  navItems.forEach(item => item.classList.remove('active'));
  sections.forEach(sec => sec.classList.remove('active'));

  li.classList.add('active');
  document.getElementById(id).classList.add('active');
  setHighlight(li);

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
    // Remove active de todas as seções
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    // Adiciona active só na seção clicada
    const section = document.getElementById(id);
    if (section) section.classList.add('active');
    // Atualiza o menu ativo
    navItems.forEach(item => item.classList.remove('active'));
    this.parentElement.classList.add('active');
    // Atualiza a posição da fumaça
    setHighlight(this.parentElement);
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

if (toggle) {
  toggle.textContent = document.body.classList.contains("dark-mode") ? "🌞 Modo Claro" : "🌙 Modo Escuro";

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    toggle.textContent = document.body.classList.contains("dark-mode") ? "🌞 Modo Claro" : "🌙 Modo Escuro";
  });
}
const albumImages = [
  'Files/album/mundoEspaco.jpg',
  'Files/album/mundoNumeros.jpg',
  'Files/album/mundoPalavra.jpg',
  'Files/album/mundoTempo.jpg',
  'Files/album/mundoVida.jpg',
  'Files/album/tematicaMundos.jpg'
];
let albumIndex = 0;
const albumImg = document.getElementById('album-img');
if (albumImg) {
  albumImg.style.opacity = 1;
  setInterval(() => {
    // Evita erro se o elemento for removido da DOM
    if (!albumImg) return;
    albumImg.style.transition = "opacity 0.5s";
    albumImg.style.opacity = 0;
    setTimeout(() => {
      albumIndex = (albumIndex + 1) % albumImages.length;
      albumImg.src = albumImages[albumIndex];
      albumImg.style.opacity = 1;
    }, 500);
  }, 4000);
}
const logoLink = document.getElementById('logo-link');
if (logoLink) {
  logoLink.addEventListener('click', function(e) {
    e.preventDefault();
    // Remove active de todas as seções
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    // Ativa a seção home
    const homeSection = document.getElementById('home');
    if (homeSection) homeSection.classList.add('active');
    // Atualiza o menu ativo
    navItems.forEach(item => item.classList.remove('active'));
    const homeNav = document.querySelector('.navigation li a[href="#home"]');
    if (homeNav && homeNav.parentElement) {
      homeNav.parentElement.classList.add('active');
      setHighlight(homeNav.parentElement);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function preencherMailto() {
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const mensagem = document.getElementById('mensagem').value;
  const mailto = `mailto:projetoconcentra@gmail.com?subject=Contato%20via%20site%20Concentra&body=Nome:%20${encodeURIComponent(nome)}%0AEmail:%20${encodeURIComponent(email)}%0AMensagem:%20${encodeURIComponent(mensagem)}`;
  window.location.href = mailto;
}