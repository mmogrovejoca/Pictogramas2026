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
}
