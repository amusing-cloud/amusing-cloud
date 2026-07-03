/* ============================================================
   AMUSING CLOUD — script.js
   Funcionalidades interativas do site
   ============================================================ */


/* ============================================================
   1. ANO AUTOMÁTICO NO RODAPÉ
   Atualiza o copyright sem precisares de editar manualmente
   ============================================================ */
document.getElementById('year').textContent = new Date().getFullYear();


/* ============================================================
   2. MENU HAMBÚRGUER (MOBILE)
   Abre e fecha o menu de navegação em ecrãs pequenos
   ============================================================ */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  // Alterna a classe 'open' que mostra/esconde o menu (definida no CSS)
  navLinks.classList.toggle('open');
});

// Fecha o menu quando o utilizador clica num link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});


/* ============================================================
   3. NAVBAR COM SOMBRA AO FAZER SCROLL
   Adiciona sombra à barra de navegação quando a página desce
   ============================================================ */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    // Com scroll: sombra mais visível
    navbar.style.boxShadow = '0 4px 24px rgba(0,0,0,0.14)';
  } else {
    // No topo: sombra suave padrão
    navbar.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
  }
});


/* ============================================================
   4. ANIMAÇÃO DE ENTRADA AO FAZER SCROLL (FADE IN)
   Os elementos entram suavemente quando aparecem no ecrã.
   Para adicionar a animação a um elemento, basta adicionar
   a classe CSS "fade-in" no HTML.
   ============================================================ */

// Adiciona a classe 'fade-in' a todos os cards e secções automaticamente
// (assim não precisas de editar o HTML manualmente)
const animatedSelectors = [
  '.card-stat',
  '.problem-card',
  '.solution-card',
  '.service-card',
  '.caso-card',
  '.timeline-item',
  '.contact-item',
  'section h2',
  '.section-label'
];

animatedSelectors.forEach(selector => {
  document.querySelectorAll(selector).forEach(el => {
    el.classList.add('fade-in');
  });
});

// Injeta o CSS da animação diretamente via JavaScript
// (alternativa: podes mover este bloco para o style.css se preferires)
const style = document.createElement('style');
style.textContent = `
  .fade-in {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);

// Observador que deteta quando os elementos entram no ecrã
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Pequeno atraso escalonado para os elementos aparecerem em sequência
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 60); // 60ms entre cada elemento
        observer.unobserve(entry.target); // Para de observar após animar
      }
    });
  },
  {
    threshold: 0.1,    // Dispara quando 10% do elemento está visível
    rootMargin: '0px 0px -40px 0px' // Margem inferior para animar um pouco antes
  }
);

// Aplica o observador a todos os elementos com 'fade-in'
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));


/* ============================================================
   5. LINK ATIVO NA NAVEGAÇÃO
   Destaca o link do menu correspondente à secção visível
   ============================================================ */
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--green)' : '';
          a.style.fontWeight = a.getAttribute('href') === `#${id}` ? '700' : '';
        });
      }
    });
  },
  {
    threshold: 0.4 // Considera ativa quando 40% da secção está visível
  }
);

sections.forEach(s => sectionObserver.observe(s));
