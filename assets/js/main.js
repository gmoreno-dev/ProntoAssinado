document.querySelectorAll('.toggle').forEach((toggle) => {
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('on');
  });
});

function startDancingFavicon() {
  let favicon = document.getElementById('animated-favicon');
  if (!favicon) {
    favicon = document.createElement('link');
    favicon.id = 'animated-favicon';
    favicon.rel = 'icon';
    favicon.type = 'image/png';

    document.querySelectorAll('link[rel~="icon"]').forEach((link) => link.remove());
    document.head.appendChild(favicon);
  }

  const mascot = new Image();
  mascot.src = './assets/images/logos/logo-mascote.svg';

  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return;
  }

  let frame = 0;
  let lastTick = 0;
  const frameIntervalMs = 90;

  const renderFrame = () => {
    const angle = Math.sin(frame * 0.55) * (Math.PI / 14);
    const bobY = Math.sin(frame * 0.55) * 1.2;
    const mascotSize = 56;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2 + bobY);
    ctx.rotate(angle);
    ctx.drawImage(mascot, -mascotSize / 2, -mascotSize / 2, mascotSize, mascotSize);
    ctx.restore();

    favicon.href = canvas.toDataURL('image/png');
    frame += 1;
  };

  mascot.onload = () => {
    const tick = (timestamp) => {
      if (!document.hidden && timestamp - lastTick >= frameIntervalMs) {
        renderFrame();
        lastTick = timestamp;
      }

      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  mascot.onerror = () => {
    favicon.href = './assets/images/logos/favicon.ico';
  };
}

startDancingFavicon();
