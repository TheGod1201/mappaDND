

const container = document.getElementById('container');
  const zoomSlider = document.getElementById('zoom-slider');
  const sliderContainer = document.getElementById('slider-container');

  // Genera la griglia di quadrati
  const numCols = Math.ceil(window.innerWidth / 50);
  const numRows = Math.ceil(window.innerHeight / 50);

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      const square = document.createElement('div');
      square.classList.add('square');
      square.style.top = i * 50 + 'px';
      square.style.left = j * 50 + 'px';
      container.appendChild(square);
    }
  }

  // Imposta l'evento di trascinamento del container per dispositivi desktop e mobile
  let isContainerMouseDown = false;
  let containerStartX, containerStartY;

  function handleMouseDown(e) {
    isContainerMouseDown = true;
    containerStartX = e.pageX || e.touches[0].pageX - sliderContainer.offsetLeft;
    containerStartY = e.pageY || e.touches[0].pageY - sliderContainer.offsetTop;
  }

  function handleMouseUp() {
    isContainerMouseDown = false;
  }

  function handleMouseMove(e) {
    if (isContainerMouseDown) {
      e.preventDefault();
      const newX = (e.pageX || e.touches[0].pageX) - containerStartX;
      const newY = (e.pageY || e.touches[0].pageY) - containerStartY;
      sliderContainer.style.left = newX + 'px';
      sliderContainer.style.top = newY + 'px';
    }
  }

  sliderContainer.addEventListener('mousedown', handleMouseDown);
  sliderContainer.addEventListener('touchstart', handleMouseDown);

  window.addEventListener('mouseup', handleMouseUp);
  window.addEventListener('touchend', handleMouseUp);

  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('touchmove', handleMouseMove);
  
  // Imposta l'evento di trascinamento solo quando zoommato
  let isMouseDown = false;
  let startMouseX, startMouseY, startBackgroundX, startBackgroundY;

  container.addEventListener('mousedown', (e) => {
    if (parseInt(zoomSlider.value) > 100) {
      isMouseDown = true;
      startMouseX = e.pageX;
      startMouseY = e.pageY;
      startBackgroundX = parseInt(getComputedStyle(container).backgroundPositionX);
      startBackgroundY = parseInt(getComputedStyle(container).backgroundPositionY);
    }
  });

  window.addEventListener('mouseup', () => {
    isMouseDown = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const moveX = e.pageX - startMouseX;
    const moveY = e.pageY - startMouseY;

    // Limita il movimento al bordo dell'immagine di sfondo
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const backgroundImageWidth = containerWidth * (zoomSlider.value / 100);
    const backgroundImageHeight = containerHeight * (zoomSlider.value / 40);
    const minBackgroundPositionX = containerWidth - backgroundImageWidth;
    const minBackgroundPositionY = containerHeight - backgroundImageHeight;

    let backgroundPositionX = startBackgroundX + moveX;
    let backgroundPositionY = startBackgroundY + moveY;

    if (backgroundPositionX > 0) backgroundPositionX = 0;
    if (backgroundPositionY > 0) backgroundPositionY = 0;
    if (backgroundPositionX < minBackgroundPositionX) backgroundPositionX = minBackgroundPositionX;
    if (backgroundPositionY < minBackgroundPositionY) backgroundPositionY = minBackgroundPositionY;

    container.style.backgroundPositionX = backgroundPositionX + 'px';
    container.style.backgroundPositionY = backgroundPositionY + 'px';
  });

  // Zoom dell'immagine di sfondo tramite slider
  zoomSlider.addEventListener('input', () => {
    const zoomValue = zoomSlider.value;
    container.style.backgroundSize = zoomValue + '%';

    // Imposta la posizione dello sfondo solo se lo zoom non è al minimo
    if (zoomValue > zoomSlider.min) {
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
      const backgroundImageWidth = containerWidth * (zoomValue / 100);
      const backgroundImageHeight = containerHeight * (zoomValue / 100);
      const minBackgroundPositionX = containerWidth - backgroundImageWidth;
      const minBackgroundPositionY = containerHeight - backgroundImageHeight;
      
      let backgroundPositionX = parseInt(getComputedStyle(container).backgroundPositionX);
      let backgroundPositionY = parseInt(getComputedStyle(container).backgroundPositionY);
      
      if (backgroundPositionX > 0) backgroundPositionX = 0;
      if (backgroundPositionY > 0) backgroundPositionY = 0;
      if (backgroundPositionX < minBackgroundPositionX) backgroundPositionX = minBackgroundPositionX;
      if (backgroundPositionY < minBackgroundPositionY) backgroundPositionY = minBackgroundPositionY;

      container.style.backgroundPositionX = backgroundPositionX + 'px';
      container.style.backgroundPositionY = backgroundPositionY + 'px';
    }
    
    // Riporta l'immagine alla posizione iniziale se lo zoom è al minimo
  if (zoomValue == zoomSlider.min) {
  container.style.backgroundPositionX = 'center';
  container.style.backgroundPositionY = 'center';
  }
  });