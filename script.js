(() => {
  const sections = Array.from(document.querySelectorAll('.article > .section'));
  const links = Array.from(document.querySelectorAll('.sidebar nav a'));
  if (!sections.length || !links.length) return;

  let scheduled = false;
  const updateCurrentSection = () => {
    const threshold = Math.min(window.innerHeight * 0.3, 180);
    let current = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= threshold) current = section;
    }
    for (const link of links) {
      if (link.getAttribute('href') === '#' + current.id) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    }
    scheduled = false;
  };

  const scheduleUpdate = () => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(updateCurrentSection);
  };
  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  updateCurrentSection();
})();
