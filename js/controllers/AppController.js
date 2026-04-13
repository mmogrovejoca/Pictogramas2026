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
        // Debounce de 500 ms para análisis en tiempo real
        this.debounceTimer = setTimeout(() => {
            this.handleGenerateClick(text);
        }, 500);
    }

    handleGenerateClick(text) {
        if (!text.trim()) {
            this.view.renderEmptyGenerator();
            return;
        }

        this.view.clearGenerator();

        const wordsRaw = text.split(/\s+/).map(w => w.replace(/[.,?!¡¿]/g, ""));
        const tokensToProcess = [];

        let i = 0;
        // Ventana deslizante para encontrar frases (n-gramas) hasta 6 palabras
        while (i < wordsRaw.length) {
            let foundMatch = false;

            // Intentar coincidencias de 6, 5, 4, 3, 2 y 1 palabra
            for (let windowSize = 6; windowSize > 0; windowSize--) {
                if (i + windowSize <= wordsRaw.length) {
                    const phrase = wordsRaw.slice(i, i + windowSize).join(" ");
                    const cleanPhrase = this.dictModel.normalizeString(phrase);

                    const pictoData = this.dictModel.findPictogram(cleanPhrase);

                    if (pictoData) {
                        // Obtener todas las alternativas disponibles para el selector visual
                        const alternatives = this.dictModel.findAllPictograms(cleanPhrase);
                        tokensToProcess.push({ word: phrase, data: pictoData, alternatives });
                        i += windowSize;
                        foundMatch = true;
                        break;
                    }
                }
            }

            if (!foundMatch) {
                // Si no hay coincidencia y no es stop word, agregar como desconocido para IA
                const singleWord = wordsRaw[i];
                const cleanW = this.dictModel.normalizeString(singleWord);
                if (cleanW && !this.dictModel.stopWords.includes(cleanW)) {
                    tokensToProcess.push({ word: singleWord, data: null, alternatives: [] });
                }
                i++;
            }
        }

        if (tokensToProcess.length === 0) {
            this.view.renderGeneratorNotFound();
            return;
        }

        tokensToProcess.forEach(token => {
            if (token.data) {
                // Crear pictograma con selector de alternativas si hay más de una fuente
                const el = this.view.createPictogramElement(
                    token.data,
                    token.word,
                    null,
                    true,
                    token.alternatives || [],
                    (altImg, altSource) => this.handleAlternativeSelect(token.word, altImg, altSource, el)
                );
                this.view.appendPictogramToGenerator(el);
            } else {
                const cleanWord = token.word;
                const unknownData = { img: "❓", cat: "otros", palabras: [cleanWord], source: "Desconocido", gramatica: "otro" };
                const el = this.view.createPictogramElement(unknownData, cleanWord, null, true, [], null);

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

        // Disparar carga progresiva ARASAAC en segundo plano
        const genContainer = document.getElementById('pictogram-output');
        requestAnimationFrame(() => this.triggerArasaacLoading(genContainer));
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

    // ─────────────────────────────────────────────────────────────
    // handleAlternativeSelect: guarda la preferencia visual del usuario
    // y actualiza la imagen en el pictograma activo
    // ─────────────────────────────────────────────────────────────
    handleAlternativeSelect(word, altImg, altSource, domElement) {
        const normalizedWord = this.dictModel.normalizeString(word);
        // Guardar preferencia en localStorage
        this.dictModel.saveUserPreference(normalizedWord, { img: altImg, source: altSource });
        // Actualizar imagen en el DOM sin re-renderizar todo
        this.view.updatePictogramImage(domElement, altImg, altSource);
    }

    // ─────────────────────────────────────────────────────────────
    // triggerArasaacLoading
    // Para cada pictograma en el contenedor que aún no tenga imagen ARASAAC:
    // 1. Muestra spinner sutil
    // 2. Consulta la API pública de ARASAAC (12.000+ pictogramas)
    // 3. Actualiza la imagen de forma progresiva sin parpadeos
    // 4. Guarda en localStorage para la próxima vez (funciona offline)
    // ─────────────────────────────────────────────────────────────
    async triggerArasaacLoading(container) {
        if (!navigator.onLine) return;  // sin conexión, mantener emojis

        const elements = container
            ? container.querySelectorAll('.pictogram[data-arasaac-query]:not([data-arasaac-loaded])')
            : document.querySelectorAll('.pictogram[data-arasaac-query]:not([data-arasaac-loaded])');

        // Procesar en lotes pequeños para no saturar la API
        const BATCH_SIZE = 5;
        const arr = Array.from(elements);

        for (let i = 0; i < arr.length; i += BATCH_SIZE) {
            const batch = arr.slice(i, i + BATCH_SIZE);
            await Promise.all(batch.map(async (el) => {
                const query = el.dataset.arasaacQuery;
                el.dataset.arasaacLoaded = 'pending';

                // Añadir spinner de carga sutil
                const spinner = document.createElement('div');
                spinner.className = 'arasaac-loading-indicator';
                el.appendChild(spinner);

                const imgUrl = await this.dictModel.loadArasaacImage(query);

                spinner.remove();

                if (imgUrl) {
                    this.view.updatePictogramWithArasaac(el, imgUrl);
                    el.dataset.arasaacLoaded = 'true';
                    el.dataset.source = 'ARASAAC';
                } else {
                    el.dataset.arasaacLoaded = 'offline';
                }
            }));

            // Pequeña pausa entre lotes para respetar rate limits de la API
            if (i + BATCH_SIZE < arr.length) {
                await new Promise(res => setTimeout(res, 200));
            }
        }

        // Después de cargar ARASAAC, lanzar carga multi-fuente en background
        // (Open Symbols: Mulberry + Sclera + SymbolStix + más)
        setTimeout(() => this.triggerMultiSourceLoading(container), 1500);
    }

    // ─────────────────────────────────────────────────────────────────
    // triggerMultiSourceLoading
    // Carga alternativas visuales desde Open Symbols API para cada
    // pictograma renderizado, dando acceso a:
    //  • Mulberry Symbols (~3.500 SVGs escalables, CC BY-SA 2.0)
    //  • Sclera Pictograms (~13.000 pictogramas B&N, CC BY)
    //  • SymbolStix (pictogramas de personas, comercial-free tier)
    //  • Open Symbols (repositorio global agregado)
    // ─────────────────────────────────────────────────────────────────
    async triggerMultiSourceLoading(container) {
        if (!navigator.onLine) return;

        const elements = container
            ? container.querySelectorAll('.pictogram[data-arasaac-query]')
            : document.querySelectorAll('.pictogram[data-arasaac-query]');

        const arr = Array.from(elements);
        if (arr.length === 0) return;

        // Ocultar el indicador de multi-fuente (se añade abajo)
        const statusEl = document.getElementById('typing-status');
        if (statusEl) statusEl.textContent = `Cargando alternativas Mulberry + Sclera...`;

        let loadedCount = 0;

        // Procesar de a dos para no sobrecargar la API pública
        const BATCH = 2;
        for (let i = 0; i < arr.length; i += BATCH) {
            const batch = arr.slice(i, i + BATCH);
            await Promise.all(batch.map(async (el) => {
                // No recargar si ya tenemos alternativas de otras fuentes
                if (el.dataset.multiSrcLoaded) return;
                el.dataset.multiSrcLoaded = 'pending';

                const query = el.dataset.arasaacQuery;

                // Consultar Open Symbols + Global Symbols en paralelo
                // para máxima cobertura de fuentes
                const [openSymAlts, globalAlts] = await Promise.all([
                    this.dictModel.loadOpenSymbolsImages(query),
                    this.dictModel.loadGlobalSymbolsImages(query),
                ]);

                // Combinar ambas listas sin duplicar por imgUrl
                const seenUrls = new Set();
                const alts = [...openSymAlts, ...globalAlts].filter(a => {
                    if (!a.imgUrl || seenUrls.has(a.imgUrl)) return false;
                    seenUrls.add(a.imgUrl);
                    return true;
                });

                if (alts && alts.length > 0) {
                    this.view.addAlternativesToPictogram(el, alts, (altImg, altSource) => {
                        this.handleAlternativeSelect(query, altImg, altSource, el);
                    });
                    el.dataset.multiSrcLoaded = 'true';
                    loadedCount++;
                } else {
                    el.dataset.multiSrcLoaded = 'none';
                }
            }));

            // Respetar rate limits de Open Symbols (free tier)
            if (i + BATCH < arr.length) {
                await new Promise(res => setTimeout(res, 300));
            }
        }

        if (statusEl) {
            statusEl.textContent = loadedCount > 0
                ? `✓ ${loadedCount} alternativas Mulberry/Sclera cargadas`
                : `12.000+ pictogramas disponibles`;
            setTimeout(() => {
                if (statusEl) statusEl.textContent = `12.000+ pictogramas disponibles`;
            }, 3000);
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

    handleLibraryFilter(searchTerm, filter, source, gramatica, number) {
        this.view.renderLibrary(this.dictModel.getFullDict(), searchTerm, filter, source, gramatica, number);
    }

    updateLibrary() {
        const filters = this.view.getCurrentFilter();
        this.view.renderLibrary(this.dictModel.getFullDict(), "", filters.category, filters.source, filters.gramatica, filters.number);
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
