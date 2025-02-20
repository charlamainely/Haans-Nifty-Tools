document.addEventListener('DOMContentLoaded', function () {
  // ***********************
  // Canvas and Default Background Setup
  // ***********************
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  let defaultBackgroundLoaded = false;
  const defaultBgImage = new Image();
  defaultBgImage.src = 'assets/none.png'; // Default background if none is chosen.
  defaultBgImage.onload = function () {
    defaultBackgroundLoaded = true;
    renderCanvas();
  };

  // ***********************
  // Decoration State and Category Management
  // ***********************
  // This object holds the currently selected asset for each category.
  const decorations = {};
  
  // Define the drawing order (first drawn is the farthest back)
  const drawOrder = ["Background", "Table", "Decor", "Gift","Box","Chocolate","Note"];
  
  // Available categories for the left-panel menu.
  const categories = ["Box","Chocolate","Note","Gift","Decor","Table","Background"];
  let currentCategoryIndex = 0;
  const currentCategoryDisplay = document.getElementById('menu-category');

  const previewItems = document.querySelectorAll('.preview-item');

  // Update preview items based on the selected category.
  function updatePreviewList(category) {
    previewItems.forEach(item => {
      item.style.display = (item.getAttribute('data-category') === category) ? 'flex' : 'none';
    });
  }

  // Update the menu category display.
  function updateMenuCategory() {
    const currentCategory = categories[currentCategoryIndex];
    currentCategoryDisplay.textContent = currentCategory;
    updatePreviewList(currentCategory);
  }
  updateMenuCategory();

  // ***********************
  // Event Listeners for Menu Arrows (Desktop)
  // ***********************
  document.getElementById('menu-prev').addEventListener('click', function () {
    currentCategoryIndex = (currentCategoryIndex - 1 + categories.length) % categories.length;
    updateMenuCategory();
  });
  document.getElementById('menu-next').addEventListener('click', function () {
    currentCategoryIndex = (currentCategoryIndex + 1) % categories.length;
    updateMenuCategory();
  });

  // ***********************
  // Event Listeners for Menu Arrows (Mobile)
  // ***********************
  document.getElementById('mobile-menu-prev').addEventListener('click', function () {
    currentCategoryIndex = (currentCategoryIndex - 1 + categories.length) % categories.length;
    updateMenuCategory();
  });
  document.getElementById('mobile-menu-next').addEventListener('click', function () {
    currentCategoryIndex = (currentCategoryIndex + 1) % categories.length;
    updateMenuCategory();
  });

  // ***********************
  // Render Function: Draw Canvas Using PNG Assets
  // ***********************
  function renderCanvas() {
    // Clear the canvas.
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the background asset to cover the entire canvas.
    if (decorations["Background"] && decorations["Background"].image) {
      ctx.drawImage(decorations["Background"].image, 0, 0, canvas.width, canvas.height);
    } else if (defaultBackgroundLoaded) {
      ctx.drawImage(defaultBgImage, 0, 0, canvas.width, canvas.height);
    }
    
    // Draw decoration asset, if any.
    if (decorations["Table"] && decorations["Table"].image) {
      ctx.drawImage(decorations["Table"].image, 0, 0, canvas.width, canvas.height);
    }
    
    // Draw hats asset, if any.
    if (decorations["Decor"] && decorations["Decor"].image) {
      ctx.drawImage(decorations["Decor"].image, 0, 0, canvas.width, canvas.height);
    }
    
    // Draw eyes asset, if any.
    if (decorations["Gift"] && decorations["Gift"].image) {
      ctx.drawImage(decorations["Gift"].image, 0, 0, canvas.width, canvas.height);
    }

    // Draw eyes asset, if any.
    if (decorations["Box"] && decorations["Box"].image) {
      ctx.drawImage(decorations["Box"].image, 0, 0, canvas.width, canvas.height);
    }

    // Draw eyes asset, if any.
    if (decorations["Chocolate"] && decorations["Chocolate"].image) {
      ctx.drawImage(decorations["Chocolate"].image, 0, 0, canvas.width, canvas.height);
    }

    // Draw eyes asset, if any.
    if (decorations["Note"] && decorations["Note"].image) {
      ctx.drawImage(decorations["Note"].image, 0, 0, canvas.width, canvas.height);
    }
  }

  // ***********************
  // Event Listener for Preview Items (Asset Selection)
  // ***********************
  previewItems.forEach(item => {
    item.addEventListener('click', function () {
      const category = item.getAttribute('data-category');
      const type = item.getAttribute('data-type');
      const src = item.getAttribute('data-src');
      
      // If the preview item has a PNG asset source, load that image.
      if (src) {
        const assetImg = new Image();
        assetImg.src = src;
        assetImg.onload = function () {
          decorations[category] = { type: type, image: assetImg };
          renderCanvas();
        };
      } else {
        // Optionally handle items without a src attribute.
      }
    });
  });

  // ***********************
  // Randomize Button Functionality
  // ***********************
  document.getElementById('randomize-btn').addEventListener('click', function () {
    categories.forEach(category => {
      const items = Array.from(document.querySelectorAll(`.preview-item[data-category="${category}"]`));
      if (items.length > 0) {
        const randomIndex = Math.floor(Math.random() * items.length);
        const randomItem = items[randomIndex];
        const type = randomItem.getAttribute('data-type');
        const src = randomItem.getAttribute('data-src');
        if (src) {
          const assetImg = new Image();
          assetImg.src = src;
          assetImg.onload = function () {
            decorations[category] = { type: type, image: assetImg };
            renderCanvas();
          };
        }
      }
    });
  });

  // ***********************
  // Randomize Button Functionality (Mobile)
  // ***********************
  document.getElementById('mobile-randomize-btn').addEventListener('click', function () {
    categories.forEach(category => {
      const items = Array.from(document.querySelectorAll(`.preview-item[data-category="${category}"]`));
      if (items.length > 0) {
        const randomIndex = Math.floor(Math.random() * items.length);
        const randomItem = items[randomIndex];
        const type = randomItem.getAttribute('data-type');
        const src = randomItem.getAttribute('data-src');
        if (src) {
          const assetImg = new Image();
          assetImg.src = src;
          assetImg.onload = function () {
            decorations[category] = { type: type, image: assetImg };
            renderCanvas();
          };
        }
      }
    });
  });

  // ***********************
  // Text Panel Setup (Unchanged)
  // ***********************
  let selectedTextBackground = "none";
  let selectedTextColor = "black";
  let selectedTextSize = 24; // Default: Medium (24px)

  const textColorItems = document.querySelectorAll('.text-color-item');
  textColorItems.forEach(item => {
    item.addEventListener('click', function () {
      textColorItems.forEach(i => i.classList.remove('selected'));
      item.classList.add('selected');
      selectedTextColor = item.getAttribute('data-value');
    });
  });

  const textSizeItems = document.querySelectorAll('.text-size-item');
  textSizeItems.forEach(item => {
    item.addEventListener('click', function () {
      textSizeItems.forEach(i => i.classList.remove('selected'));
      item.classList.add('selected');
      selectedTextSize = parseInt(item.getAttribute('data-value'));
    });
  });



  // ***********************
  // Helper Function for Text Wrapping (Unchanged)
  // ***********************
  function getLines(context, text, maxWidth) {
    const words = text.split(' ');
    let lines = [];
    let currentLine = '';
    for (let i = 0; i < words.length; i++) {
      let word = words[i];
      let testLine = currentLine ? currentLine + ' ' + word : word;
      let testWidth = context.measureText(testLine).width;
      if (context.measureText(word).width > maxWidth) {
        if (currentLine) {
          lines.push(currentLine);
          currentLine = '';
        }
        let partialWord = '';
        for (let char of word) {
          let testPartial = partialWord + char;
          if (context.measureText(testPartial).width > maxWidth) {
            lines.push(partialWord);
            partialWord = char;
          } else {
            partialWord = testPartial;
          }
        }
        currentLine = partialWord;
        continue;
      }
      if (testWidth > maxWidth && currentLine !== '') {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      lines.push(currentLine);
    }
    return lines;
  }

  // ***********************
  // Event Listener for "Add Text" Button (Unchanged)
  // ***********************
  document.getElementById('add-text').addEventListener('click', function () {
    renderCanvas();
    const text = document.getElementById('text-input').value;
    ctx.font = `${selectedTextSize}px 'Pacifico', sans-serif`;
    const lineHeight = selectedTextSize * 1.05;
    const textAreaWidth = canvas.width * 0.6;
    const textAreaHeight = canvas.height * 0.35;
    const textAreaX = canvas.height * 0.05 + canvas.width * 0.005;
    const textAreaY = canvas.height - textAreaHeight + canvas.height * 0.07;
    const lines = getLines(ctx, text, textAreaWidth);
    const maxLines = Math.floor(textAreaHeight / lineHeight);
    const drawnLines = lines.slice(0, maxLines);
    if (selectedTextBackground !== 'none') {
      ctx.fillStyle = selectedTextBackground;
      ctx.fillRect(textAreaX, textAreaY, textAreaWidth, textAreaHeight);
    }
    ctx.fillStyle = selectedTextColor;
    drawnLines.forEach((line, index) => {
      const yPosition = textAreaY + lineHeight * (index + 1);
      ctx.fillText(line, textAreaX + 5, yPosition);
    });
  });


// ***********************
  // Event Listener for "Add Text" Button (Mobile)
  // ***********************
  document.getElementById('mobile-add-text').addEventListener('click', function () {
    renderCanvas();
    const text = document.getElementById('mobile-text-input').value;
    ctx.font = `${selectedTextSize}px 'Pacifico', sans-serif`;
    const lineHeight = selectedTextSize * 1.05;
    const textAreaWidth = canvas.width * 0.6;
    const textAreaHeight = canvas.height * 0.35;
    const textAreaX = canvas.height * 0.05 + canvas.width * 0.005;
    const textAreaY = canvas.height - textAreaHeight + canvas.height * 0.07;
    const lines = getLines(ctx, text, textAreaWidth);
    const maxLines = Math.floor(textAreaHeight / lineHeight);
    const drawnLines = lines.slice(0, maxLines);
    if (selectedTextBackground !== 'none') {
      ctx.fillStyle = selectedTextBackground;
      ctx.fillRect(textAreaX, textAreaY, textAreaWidth, textAreaHeight);
    }
    ctx.fillStyle = selectedTextColor;
    drawnLines.forEach((line, index) => {
      const yPosition = textAreaY + lineHeight * (index + 1);
      ctx.fillText(line, textAreaX + 5, yPosition);
    });
  });

  // ***********************
  // Mobile Tabs Functionality
  // ***********************
  const tabDecoration = document.getElementById('tab-decoration');
  const tabText = document.getElementById('tab-text');
  const mobileDecoration = document.getElementById('mobile-decoration');
  const mobileText = document.getElementById('mobile-text');

  function activateDecorationTab() {
    tabDecoration.classList.add('active');
    tabText.classList.remove('active');
    mobileDecoration.classList.add('active');
    mobileText.classList.remove('active');
  }
  function activateTextTab() {
    tabText.classList.add('active');
    tabDecoration.classList.remove('active');
    mobileText.classList.add('active');
    mobileDecoration.classList.remove('active');
  }
  activateDecorationTab();
  tabDecoration.addEventListener('click', activateDecorationTab);
  tabText.addEventListener('click', activateTextTab);

  // ***********************
  // Save Image Functionality
  // ***********************
  document.getElementById('save-image').addEventListener('click', function () {
    const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    const link = document.createElement('a');
    link.download = 'decorated-image.png';
    link.href = image;
    link.click();
  });
});
