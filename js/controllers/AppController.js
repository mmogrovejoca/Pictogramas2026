class AppController {
    constructor(stateModel, dictModel, view) {
        this.stateModel = stateModel;
        this.dictModel = dictModel;
        this.view = view;
        this.debounceTimer = null;
        this.currentBase64 = null;
    }

    init() {
        this.view.initSettingsUI(this.stateModel.settings);
        this.view.initSpeechSynthesis(this.stateModel.settings, (uri) => this.handleSettingChange('voiceURI', uri));
        this.view.bindEvents(this);

        this.updateLibrary();
        this.updateCustomGrid();
        this.updateFavorites();
    }

    toggleTheme() {
        const newTheme = this.stateModel.settings.theme === 'light' ? 'dark' : 'light';
        this.handleSettingChange('theme', newTheme);
    }

    handleSettingChange(key, value) {
        this.stateModel.setSetting(key, value);
        if(key === 'theme' || key === 'highContrast') this.view.applyTheme(this.stateModel.settings);
        if(key === 'showText') this.view.applyTextVisibility(this.stateModel.settings.showText);
    }

    handleResetData() {
        this.stateModel.clearAll();
        location.reload();
    }

    handleTextInput(text) {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => {
            this.handleGenerateClick(text);
        }, 600);
    }

    handleGenerateClick(text) {
        if (!text.trim()) {
            this.view.renderEmptyGenerator();
            return;
        }

        this.view.clearGenerator();

        const wordsRaw = text.split(/\s+/);
        const wordsToProcess = [];

        wordsRaw.forEach(w => {
            const cleanW = this.dictModel.normalizeString(w);
            if (cleanW && (!this.dictModel.stopWords.includes(cleanW) || this.dictModel.findPictogram(cleanW))) {
                wordsToProcess.push(w);
            }
        });

        if (wordsToProcess.length === 0) {
            this.view.renderGeneratorNotFound();
            return;
        }

        wordsToProcess.forEach(word => {
            const cleanWord = word.replace(/[.,?!¡¿]/g, "");
            const pictoData = this.dictModel.findPictogram(cleanWord);

            if (pictoData) {
                const el = this.view.createPictogramElement(pictoData, cleanWord);
                this.view.appendPictogramToGenerator(el);
            } else {
                const unknownData = { img: "❓", cat: "otros", palabras: [cleanWord] };
                const el = this.view.createPictogramElement(unknownData, cleanWord);

                if (this.stateModel.settings.apiKey && this.stateModel.settings.autoAI) {
                    this.triggerAIGeneration(cleanWord, el);
                } else {
                    const aiBtn = document.createElement('button');
                    aiBtn.className = 'ai-generate-btn';
                    aiBtn.textContent = '✨ Generar con IA';
                    aiBtn.addEventListener('click', () => {
                        if (!this.stateModel.settings.apiKey) {
                            alert('Por favor, ve a la pestaña "Ajustes" e introduce tu API Key de Open Router primero.');
                            this.view.switchTab('settings');
                            return;
                        }
                        this.triggerAIGeneration(cleanWord, el);
                    });
                    el.appendChild(aiBtn);
                }
                this.view.appendPictogramToGenerator(el);
            }
        });
    }

    async triggerAIGeneration(word, domElement) {
        if (!this.stateModel.settings.apiKey) {
            alert('Por favor, configura tu API Key de Open Router en Ajustes.');
            return;
        }

        this.view.setAILoadingState(domElement);

        try {
            const base64SVG = await this.dictModel.generateAIPictogram(word, this.stateModel.settings.apiKey);

            const newEntry = {
                palabras: [word.toLowerCase()],
                img: base64SVG,
                cat: 'otros'
            };

            this.stateModel.addCustomPictogram(newEntry);
            this.updateLibrary();
            this.updateCustomGrid();

            this.view.updatePictogramWithSVG(domElement, base64SVG, word);

        } catch (error) {
            this.view.setAIErrorState(domElement);
        }
    }

    speakText(text) {
        this.view.speak(text, this.stateModel.settings);
    }

    handleSaveFavorite(text) {
        if(this.stateModel.addFavorite(text)) {
            this.updateFavorites();
            alert('⭐ Frase guardada en favoritos');
        }
    }

    loadFavorite(text) {
        const textInput = document.getElementById('text-input');
        if(textInput) textInput.value = text;
        this.handleGenerateClick(text);
        this.view.switchTab('generator');
    }

    removeFavorite(index) {
        this.stateModel.removeFavorite(index);
        this.updateFavorites();
    }

    handleLibraryFilter(searchTerm, filter) {
        this.view.renderLibrary(this.dictModel.getFullDict(), searchTerm, filter);
    }

    updateLibrary() {
        this.view.renderLibrary(this.dictModel.getFullDict(), "", this.view.getCurrentFilter());
    }

    updateCustomGrid() {
        this.view.renderCustomGrid(this.stateModel.customDict, (idx) => {
            this.stateModel.removeCustomPictogram(idx);
            this.updateCustomGrid();
            this.updateLibrary();
        });
    }

    updateFavorites() {
        this.view.renderFavorites(this.stateModel.favorites, (text) => this.loadFavorite(text), (idx) => this.removeFavorite(idx));
    }

    handleImageUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            this.currentBase64 = event.target.result;
            this.view.setPreviewImage(this.currentBase64);
        };
        reader.readAsDataURL(file);
    }

    handleSaveCustom() {
        const wordEl = document.getElementById('custom-word');
        const catEl = document.getElementById('custom-category');

        if(!wordEl || !catEl) return;

        const wordInput = wordEl.value.trim();
        const category = catEl.value;

        if (!wordInput) {
            alert('Por favor, escribe una palabra o frase.');
            return;
        }
        if (!this.currentBase64) {
            alert('Por favor, selecciona una imagen.');
            return;
        }

        const palabras = wordInput.split(',').map(p => p.trim());

        const newEntry = {
            palabras: palabras,
            img: this.currentBase64,
            cat: category
        };

        this.stateModel.addCustomPictogram(newEntry);

        this.view.clearCustomForm();
        this.currentBase64 = null;

        alert('✅ Pictograma guardado con éxito!');
        this.updateCustomGrid();
        this.updateLibrary();
    }

    handlePrint() {
        window.print();
    }

    handleExportImage(containerId, filenameBase) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const pictograms = container.querySelectorAll('.pictogram');
        if (pictograms.length === 0) {
            alert('No hay pictogramas para exportar.');
            return;
        }

        // Configuración del canvas
        const columns = Math.ceil(Math.sqrt(pictograms.length));
        const rows = Math.ceil(pictograms.length / columns);
        const padding = 20;
        const pictoWidth = 180;
        const pictoHeight = 220;
        const gap = 15;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = (columns * pictoWidth) + ((columns - 1) * gap) + (padding * 2);
        canvas.height = (rows * pictoHeight) + ((rows - 1) * gap) + (padding * 2);

        // Fondo blanco
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        let loadedImages = 0;
        let totalImagesToLoad = 0;

        const drawPictogram = (pictoElement, col, row, onComplete) => {
            const x = padding + (col * (pictoWidth + gap));
            const y = padding + (row * (pictoHeight + gap));

            // Draw background and border
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(x, y, pictoWidth, pictoHeight);

            const borderColor = window.getComputedStyle(pictoElement).borderColor;
            ctx.strokeStyle = borderColor;
            ctx.lineWidth = 4;
            // Draw rounded rect manually or just rect for simplicity
            ctx.beginPath();
            ctx.roundRect(x, y, pictoWidth, pictoHeight, 20);
            ctx.stroke();

            // Draw Label
            const labelEl = pictoElement.querySelector('.picto-label');
            if (labelEl) {
                ctx.fillStyle = '#000000';
                ctx.font = 'bold 18px Nunito, Arial';
                ctx.textAlign = 'center';
                // Simple word wrap simulation (just first line for now)
                ctx.fillText(labelEl.textContent.substring(0, 15), x + (pictoWidth/2), y + pictoHeight - 15);

                // Draw top line for label
                ctx.beginPath();
                ctx.moveTo(x + 10, y + pictoHeight - 40);
                ctx.lineTo(x + pictoWidth - 10, y + pictoHeight - 40);
                ctx.strokeStyle = '#eeeeee';
                ctx.lineWidth = 2;
                ctx.stroke();
            }

            // Draw Image/Emoji
            const imgContainer = pictoElement.querySelector('.picto-img');
            if (imgContainer) {
                const imgEl = imgContainer.querySelector('img');
                const svgEl = imgContainer.querySelector('svg');

                if (imgEl && imgEl.src) {
                    const imgObj = new Image();
                    imgObj.crossOrigin = 'anonymous';
                    imgObj.onload = () => {
                        // Keep aspect ratio
                        const size = 110;
                        const imgRatio = imgObj.width / imgObj.height;
                        let drawW = size, drawH = size;
                        if(imgRatio > 1) { drawH = size / imgRatio; }
                        else { drawW = size * imgRatio; }

                        ctx.drawImage(imgObj, x + (pictoWidth - drawW)/2, y + 20 + (size - drawH)/2, drawW, drawH);
                        onComplete();
                    };
                    imgObj.onerror = onComplete;
                    imgObj.src = imgEl.src;
                } else if (svgEl) {
                    // Try to render inline SVG
                    const svgData = new XMLSerializer().serializeToString(svgEl);
                    const imgObj = new Image();
                    imgObj.onload = () => {
                        ctx.drawImage(imgObj, x + 35, y + 20, 110, 110);
                        onComplete();
                    };
                    imgObj.onerror = onComplete;
                    imgObj.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
                } else {
                    // It's an emoji text
                    const emoji = imgContainer.textContent.trim();
                    if (emoji && emoji !== '❌' && emoji !== '⏳') {
                        ctx.font = '80px Arial';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(emoji, x + (pictoWidth/2), y + 75);
                    }
                    onComplete();
                }
            } else {
                onComplete();
            }
        };

        const trySave = () => {
            loadedImages++;
            if (loadedImages >= totalImagesToLoad) {
                const link = document.createElement('a');
                link.download = `${filenameBase}_${new Date().getTime()}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
            }
        };

        // Count images
        totalImagesToLoad = pictograms.length;

        let col = 0;
        let row = 0;
        pictograms.forEach((picto) => {
            drawPictogram(picto, col, row, trySave);
            col++;
            if (col >= columns) {
                col = 0;
                row++;
            }
        });
    }
}
