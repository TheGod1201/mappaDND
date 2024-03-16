const container = document.getElementById('container');
const zoomSlider = document.getElementById('zoom-slider');
const sliderContainer = document.getElementById('slider-container');

// Genera una griglia di quadrati
const numCols = Math.ceil(window.innerWidth / 50);
const numRows = Math.ceil(window.innerHeight / 50);

for (let i = 0; i < numRows; i++) {
  for (let j = 0; j < numCols; j++) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.top = i * 50 + 'px';
    square.style.left = j * 50 + 'px';

    square.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        isMouseDown = true;
        startMouseX = e.touches[0].pageX;
        startMouseY = e.touches[0].pageY;
        startBackgroundX = parseInt(getComputedStyle(container).backgroundPositionX);
        startSfondoY = parseInt(getComputedStyle(container).backgroundPositionY);

        e.stopPropagation();
      }
    });

    square.addEventListener('touchend', () => {
      isMouseDown = false;
    });

    square.addEventListener('touchmove', (e) => {
      if (!isMouseDown) return;

      e.preventDefault();
      const moveX = e.touches[0].pageX - startMouseX;
      const moveY = e.touches[0].pageY - startMouseY;

      let backgroundPositionX = startBackgroundX + moveX;
      let backgroundPositionY = startBackgroundY + moveY;

      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
      const backgroundImageWidth = containerWidth * (zoomSlider.value / 100);
      const backgroundImageHeight = containerHeight * (zoomSlider.value / 10);
      const minBackgroundPositionX = containerWidth - backgroundImageWidth;
      const minBackgroundPositionY = containerHeight - backgroundImageHeight;

      if (backgroundPositionX > 0) backgroundPositionX = 0;
      if (backgroundPositionY > 0) backgroundPositionY = 0;
      if (backgroundPositionX < minBackgroundPositionX) backgroundPositionX = minBackgroundPositionX;
      if (backgroundPositionY < minBackgroundPositionY) backgroundPositionY = minBackgroundPositionY;

      container.style.backgroundPositionX = backgroundPositionX + 'px';
      container.style.backgroundPositionY = backgroundPositionY + 'px';
    });

    container.appendChild(square);
  }
}

let isContainerTouchDown = false;
let isMouseDown = false;
let containerStartX, containerStartY, containerStartLeft, containerStartTop;
let startMouseX, startMouseY, startBackgroundX, startBackgroundY;

sliderContainer.addEventListener('touchstart', (e) => {
  isContainerTouchDown = true;
  containerStartX = e.touches[0].clientX;
  containerStartY = e.touches[0].clientY;
  containerStartLeft = container.offsetLeft;
  containerStartTop = container.offsetTop;
}, { passive: false });

container.addEventListener('touchstart', (e) => {
  isContainerTouchDown = true;
  containerStartX = e.touches[0].clientX;
  containerStartY = e.touches[0].clientY;
  containerStartLeft = container.offsetLeft;
  containerStartTop = container.offsetTop;
}, { passive: false });

window.addEventListener('touchmove', (e) => {
    if (isContainerTouchDown) {
      e.preventDefault();
      const moveX = e.touches[0].clientX - containerStartX;
      const moveY = e.touches[0].clientY - containerStartY;
      container.style.left = containerStartLeft + moveX + 'px';
      container.style.top = containerStartTop + moveY + 'px';
    }
  }, { passive: false });
  

window.addEventListener('touchend', () => {
  isContainerTouchDown = false;
}, { passive: false });

window.addEventListener('mouseup', () => {
  isMouseDown = false;
});


window.addEventListener('mousemove', (e) => {
    if (!isMouseDown) return;
  
    e.preventDefault();
    const moveX = e.pageX - startMouseX;
    const moveY = e.pageY - startMouseY;
  
    // Determina i confini della mappa
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const backgroundImageWidth = containerWidth * (zoomSlider.value / 100);
    const backgroundImageHeight = containerHeight * (zoomSlider.value / 40);
    const minBackgroundPositionX = containerWidth - backgroundImageWidth;
    const minBackgroundPositionY = containerHeight - backgroundImageHeight;
  
    // Calcola le nuove posizioni dello sfondo in base al movimento del mouse
    let backgroundPositionX = startBackgroundX + moveX;
    let backgroundPositionY = startBackgroundY + moveY;
  
    // Applicare i confini della mappa
    if (backgroundPositionX > 0) backgroundPositionX = 0;
    if (backgroundPositionY > 0) backgroundPositionY = 0;
    if (backgroundPositionX < minBackgroundPositionX) backgroundPositionX = minBackgroundPositionX;
    if (backgroundPositionY < minBackgroundPositionY) backgroundPositionY = minBackgroundPositionY;
  
    // Aggiornare la posizione di sfondo del contenitore per riflettere le nuove posizioni
    container.style.backgroundPositionX = backgroundPositionX + 'px';
    container.style.backgroundPositionY = backgroundPositionY + 'px';
  
    // Aggiorna le coordinate di partenza del mouse
    startMouseX = e.pageX;
    startMouseY = e.pageY;
  });
  

window.addEventListener('resize', () => {
  if (!isContainerTouchDown) {
    const windowWidth = window.innerWidth;
    const sliderWidth = sliderContainer.offsetWidth;
    const windowHeight = window.innerHeight;
    const sliderHeight = sliderContainer.offsetHeight;
    sliderContainer.style.left = (windowWidth - sliderWidth) / 2 + 'px';
    sliderContainer.style.top = (windowHeight - sliderHeight) / 2 + 'px';
  }
});

zoomSlider.addEventListener('input', () => {
  const zoomValue = zoomSlider.value;
  const container = document.getElementById('container');
  container.style.backgroundSize = zoomValue + '%';
  
  if (zoomValue > zoomSlider.min) {
    
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const backgroundImageWidth = containerWidth * (zoomValue / 100);
    const backgroundImageHeight = containerHeight * (zoomValue / 100);
    const container = document.getElementById('container');
    const zoomSlider = document.getElementById('zoom-slider');
    const sliderContainer = document.getElementById('slider-container');
    
    // Genera una griglia di quadrati
    const numCols = Math.ceil(window.innerWidth / 50);
    const numRows = Math.ceil(window.innerHeight / 50);
    
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.style.top = i * 50 + 'px';
        square.style.left = j * 50 + 'px';
    
        square.addEventListener('touchstart', (e) => {
          isMouseDown = true;
          startMouseX = e.touches[0].pageX;
          startMouseY = e.touches[0].pageY;
          startBackgroundX = parseInt(getComputedStyle(container).backgroundPositionX);
          startBackgroundY = parseInt(getComputedStyle(container).backgroundPositionY);
    
          // Interrompi la propagazione dell'evento in modo da non attivare gli ascoltatori di eventi touch del contenitore
          e.stopPropagation();
        });
    
        square.addEventListener('touchend', () => {
          isMouseDown = false;
        });
    
        square.addEventListener('touchmove', (e) => {
          if (!isMouseDown) return;
    
          e.preventDefault();
          const moveX = e.touches[0].pageX - startMouseX;
          const moveY = e.touches[0].pageY - startMouseY;
    
          // Calcola le nuove posizioni dello sfondo in base al movimento del mouse
          let backgroundPositionX = startBackgroundX + moveX;
          let backgroundPositionY = startBackgroundY + moveY;
    
          // Determinare i confini della mappa
          const containerWidth = container.offsetWidth;
          const containerHeight = container.offsetHeight;
          const backgroundImageWidth = containerWidth * (zoomSlider.value / 100);
          const backgroundImageHeight = containerHeight * (zoomSlider.value / 40);
          const minBackgroundPositionX = containerWidth - backgroundImageWidth;
          const minBackgroundPositionY = containerHeight - backgroundImageHeight;
    
          // Imponiamo i confini della mappa
          if (backgroundPositionX > 0) backgroundPositionX = 0;
          if (backgroundPositionY > 0) backgroundPositionY = 0;
          if (backgroundPositionX < minBackgroundPositionX) backgroundPositionX = minBackgroundPositionX;
          if (backgroundPositionY < minBackgroundPositionY) backgroundPositionY = minBackgroundPositionY;
    
          // Aggiornare la posizione di sfondo del contenitore per riflettere le nuove posizioni
          container.style.backgroundPositionX = backgroundPositionX + 'px';
          container.style.backgroundPositionY = backgroundPositionY + 'px';
        });
        container.appendChild(square);
      }
    }
    
    // Imposta gli ascoltatori di eventi per il trascinamento e lo zoom
    let isContainerTouchDown = false;
    let isMouseDown = false;
    let containerStartX, containerStartY, containerStartLeft, containerStartTop;
    let startMouseX, startMouseY, startBackgroundX, startBackgroundY;
    
    sliderContainer.addEventListener('touchstart', (e) => {
      isContainerTouchDown = true;
      containerStartX = e.touches[0].clientX;
      containerStartY = e.touches[0].clientY;
      containerStartLeft = container.offsetLeft;
      containerStartTop = container.offsetTop;
    }, { passive: false });
    
    container.addEventListener('touchstart', (e) => {
      isContainerTouchDown = true;
      containerStartX = e.touches[0].clientX;
      containerStartY = e.touches[0].clientY;
      containerStartLeft = container.offsetLeft;
      containerStartTop = container.offsetTop;
    }, { passive: false });
    
    window.addEventListener('touchmove', (e) => {
      if (isContainerTouchDown) {
        e.preventDefault();
        const moveX = e.touches[0].clientX - containerStartX;
        const moveY = e.touches[0].clientY - containerStartY;
        container.style.left = containerStartLeft + moveX + 'px';
        container.style.top = containerStartTop + moveY + 'px';
      }
    }, { passive: false });
    
    window.addEventListener('touchend', () => {
      isContainerTouchDown = false;
    }, { passive: false });
    
    window.addEventListener('mouseup', () => {
      isMouseDown = false;
    });
    
    window.addEventListener('mousemove', (e) => {
      if (!isMouseDown) return;
    
      e.preventDefault();
      const moveX = e.pageX - startMouseX;
      const moveY = e.pageY - startMouseY;
    
      // Determina i confini della mappa
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
      const backgroundImageWidth = containerWidth * (zoomSlider.value / 100);
      const backgroundImageHeight = containerHeight * (zoomSlider.value / 40);
      const minBackgroundPositionX = containerWidth - backgroundImageWidth;
      const minBackgroundPositionY = containerHeight - backgroundImageHeight;
    
      // Calcola le nuove posizioni dello sfondo in base al movimento del mouse
      let backgroundPositionX = startBackgroundX + moveX;
      let backgroundPositionY = startBackgroundY + moveY;
    
      // Applicare i confini della mappa
      if (backgroundPositionX > 0) backgroundPositionX = 0;
      if (backgroundPositionY > 0) backgroundPositionY = 0;
      if (backgroundPositionX < minBackgroundPositionX) backgroundPositionX = minBackgroundPositionX;
      if (backgroundPositionY < minBackgroundPositionY) backgroundPositionY = minBackgroundPositionY;
    
      // Aggiornare la posizione di sfondo del contenitore per riflettere le nuove posizioni
      container.style.backgroundPositionX = backgroundPositionX + 'px';
      container.style.backgroundPositionY = backgroundPositionY + 'px';
    });
    
    window.addEventListener('resize', () => {
      if (!isContainerTouchDown) {
        const windowWidth = window.innerWidth;
        const sliderWidth = sliderContainer.offsetWidth;
        const windowHeight = window.innerHeight;
        const sliderHeight = sliderContainer.offsetHeight;
        sliderContainer.style.left = (windowWidth - sliderWidth) / 2 + 'px';
        sliderContainer.style.top = (windowHeight - sliderHeight) / 2 + 'px';
      }
    });
    
    zoomSlider.addEventListener('input', () => {
      const zoomValue = zoomSlider.value;
      container.style.backgroundSize = zoomValue + '%';
    
      if (zoomValue > zoomSlider.min) {
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;
        const backgroundImageWidth = containerWidth * (zoomValue / 100);
        const backgroundImageHeight = containerHeight * (zoomValue / 40);
        const minBackgroundPositionX = containerWidth - backgroundImageWidth;
        const minBackgroundPositionY = containerHeight - backgroundImageHeight;
    
        let backgroundPositionX = parseInt(getComputedStyle(container).backgroundPositionX);
        let backgroundPositionY = parseInt(getComputedStyle(container).backgroundPositionY);
    
        if (backgroundPositionX > 0) backgroundPositionX = 0;
        if (backgroundPositionX > 0) backgroundPositionX = 0;
        if (backgroundPositionY > 0) backgroundPositionY = 0;
        if (backgroundPositionX < minBackgroundPositionX) backgroundPositionX = minBackgroundPositionX;
        if (backgroundPositionY < minBackgroundPositionY) backgroundPositionY = minBackgroundPositionY;
    
        container.style.backgroundPositionX = backgroundPositionX + 'px';
        container.style.backgroundPositionY = backgroundPositionY + 'px';
      }
    
      if (zoomValue == zoomSlider.min) {
        container.style.backgroundPositionX = 'center';
        container.style.backgroundPositionY = 'center';
      }
    });
}
});
