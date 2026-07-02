const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const replayBtn = document.getElementById('replayBtn');
const jobRows = Array.from(document.querySelectorAll('.job-row'));
const queueButtons = Array.from(document.querySelectorAll('.queue'));

function replayTriage() {
  jobRows.forEach((row, index) => {
    row.classList.remove('pulse');
    row.style.opacity = '0';
    row.style.transform = 'translateY(18px)';
    setTimeout(() => {
      row.style.opacity = '';
      row.style.transform = '';
      row.classList.add('pulse');
    }, index * 220);
  });
}

if (replayBtn) {
  replayBtn.addEventListener('click', replayTriage);
}

queueButtons.forEach((button) => {
  button.addEventListener('click', () => {
    queueButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;

    jobRows.forEach((row) => {
      if (filter === 'all') {
        row.classList.remove('is-hidden');
        return;
      }
      const types = row.dataset.type || '';
      row.classList.toggle('is-hidden', !types.includes(filter));
    });
  });
});

setTimeout(replayTriage, 800);
