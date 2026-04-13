class AppView {
    constructor() {
        this.synth = window.speechSynthesis;
        this.voices = [];
    }

    bindEvents(controller) {
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            if(!btn.classList.contains('help-btn') && !btn.hasAttribute('onclick')) {
                // Remove inline onclick and bind through listener
                btn.removeAttribute('onclick');
                btn.addEventListener('click', (e) => {
                    const tabId = btn.getAttribute('data-tab');
                    if(tabId) this.switchTab(tabId, e.currentTarget);
                });
            }
        });

        // Modificando el HTML temporalmente para los botones con onclick inline
        const navBtns = document.querySelectorAll('nav .tab-btn');
        const tabIds = ['generator', 'library', 'builder', 'custom', 'settings', 'help'];
        navBtns.forEach((btn, idx) => {
            if(idx < tabIds.length) {
                btn.removeAttribute('onclick');
                btn.addEventListener('click', (e) => this.switchTab(tabIds[idx], e.currentTarget));
            }
        });

        const themeToggle = document.getElementById('theme-toggle');
        if(themeToggle) {
            themeToggle.removeAttribute('onclick');
            themeToggle.addEventListener('click', () => controller.toggleTheme());
        }

        // Generator
        const textInput = document.getElementById('text-input');
        if(textInput) {
            textInput.addEventListener('input', () => controller.handleTextInput(textInput.value));

            document.getElementById('generate-btn').addEventListener('click', () => {
                controller.handleGenerateClick(textInput.value);
            });

            document.getElementById('clear-btn').addEventListener('click', () => {
                textInput.value = '';
                this.renderEmptyGenerator();
            });

            document.getElementById('speak-btn').addEventListener('click', () => {
                controller.speakText(textInput.value);
            });

            document.getElementById('save-fav-btn').addEventListener('click', () => {
                controller.handleSaveFavorite(textInput.value.trim());
            });

            document.getElementById('export-img-btn').addEventListener('click', () => {
                controller.handleExportImage('picto-output', 'mis_pictogramas');
            });

            document.getElementById('print-pdf-btn').addEventListener('click', () => {
                controller.handlePrint();
            });
        }

        // Library
        const librarySearch = document.getElementById('library-search');
        if(librarySearch) {
            librarySearch.addEventListener('input', (e) => {
                controller.handleLibraryFilter(e.target.value.toLowerCase(), this.getCurrentFilter().category, this.getCurrentFilter().source);
            });

            document.querySelectorAll('.filter-btn:not(.source-btn):not(.gram-btn):not(.num-btn)').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    document.querySelectorAll('.filter-btn:not(.source-btn):not(.gram-btn):not(.num-btn)').forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                    controller.handleLibraryFilter(
                        librarySearch.value.toLowerCase(),
                        e.target.dataset.filter,
                        this.getCurrentFilter().source,
                        this.getCurrentFilter().gramatica,
                        this.getCurrentFilter().number
                    );
                });
            });

            document.querySelectorAll('.source-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    document.querySelectorAll('.source-btn').forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                    controller.handleLibraryFilter(
                        librarySearch.value.toLowerCase(),
                        this.getCurrentFilter().category,
                        e.target.dataset.source,
                        this.getCurrentFilter().gramatica,
                        this.getCurrentFilter().number
                    );
                });
            });

            // Filtros de categoría gramatical
            document.querySelectorAll('.gram-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    document.querySelectorAll('.gram-btn').forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                    controller.handleLibraryFilter(
                        librarySearch.value.toLowerCase(),
                        this.getCurrentFilter().category,
                        this.getCurrentFilter().source,
                        e.target.dataset.gram,
                        this.getCurrentFilter().number
                    );
                });
            });

            // Filtros de número (singular/plural)
            document.querySelectorAll('.num-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    document.querySelectorAll('.num-btn').forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                    controller.handleLibraryFilter(
                        librarySearch.value.toLowerCase(),
                        this.getCurrentFilter().category,
                        this.getCurrentFilter().source,
                        this.getCurrentFilter().gramatica,
                        e.target.dataset.num
                    );
                });
            });
        }

        // Custom image upload
        const customImage = document.getElementById('custom-image');
        if(customImage) {
            customImage.addEventListener('change', (e) => controller.handleImageUpload(e));
            document.getElementById('save-custom-btn').addEventListener('click', () => controller.handleSaveCustom());
        }

        // Settings
        const contrastToggle = document.getElementById('high-contrast-toggle');
        if(contrastToggle) contrastToggle.addEventListener('change', (e) => controller.handleSettingChange('highContrast', e.target.checked));

        const showTextToggle = document.getElementById('show-text-toggle');
        if(showTextToggle) showTextToggle.addEventListener('change', (e) => controller.handleSettingChange('showText', e.target.checked));

        const voiceSelect = document.getElementById('voice-select');
        if(voiceSelect) voiceSelect.addEventListener('change', (e) => controller.handleSettingChange('voiceURI', e.target.value));

        const voiceRate = document.getElementById('voice-rate');
        if(voiceRate) voiceRate.addEventListener('input', (e) => controller.handleSettingChange('voiceRate', parseFloat(e.target.value)));

        const apiKeyInput = document.getElementById('api-key-input');
        if(apiKeyInput) apiKeyInput.addEventListener('change', (e) => controller.handleSettingChange('apiKey', e.target.value));

        const autoAiToggle = document.getElementById('auto-ai-toggle');
        if(autoAiToggle) autoAiToggle.addEventListener('change', (e) => controller.handleSettingChange('autoAI', e.target.checked));

        const resetBtn = document.getElementById('reset-data-btn');
        if(resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (confirm('⚠️ ¿Estás seguro de que quieres borrar todos tus pictogramas personalizados y frases favoritas? Esta acción no se puede deshacer.')) {
                    controller.handleResetData();
                }
            });
        }

        // Builder
        const builderClearBtn = document.getElementById('builder-clear-btn');
        if(builderClearBtn) {
            builderClearBtn.addEventListener('click', () => {
                document.getElementById('builder-board').innerHTML = '<div class="empty-state">Arrastra pictogramas aquí para construir frases 🧩</div>';
            });
        }

        const builderSpeakBtn = document.getElementById('builder-speak-btn');
        if(builderSpeakBtn) {
            builderSpeakBtn.addEventListener('click', () => {
                const pictos = document.querySelectorAll('#builder-board .pictogram .picto-label');
                const phrase = Array.from(pictos).map(p => p.textContent).join(' ');
                if (phrase) controller.speakText(phrase);
            });
        }

        const builderExportImgBtn = document.getElementById('builder-export-img-btn');
        if(builderExportImgBtn) {
            builderExportImgBtn.addEventListener('click', () => {
                controller.handleExportImage('builder-board', 'tablero_pictogramas');
            });
        }

        const builderPrintBtn = document.getElementById('builder-print-pdf-btn');
        if(builderPrintBtn) {
            builderPrintBtn.addEventListener('click', () => {
                controller.handlePrint();
            });
        }

        // Drag & Drop event bindings
        this.bindDragEvents();
    }

    bindDragEvents() {
        window.allowDrop = (ev) => ev.preventDefault();
        window.drag = (ev) => {
            const el = ev.target.closest('.pictogram');
            if (!el) return;
            const sourceArea = el.closest('.builder-board') ? 'board' : 'library';
            ev.dataTransfer.setData("text", el.id);
            ev.dataTransfer.setData("source", sourceArea);
            ev.dataTransfer.setData("html", el.outerHTML);
        };
        window.drop = (ev) => {
            ev.preventDefault();
            const source = ev.dataTransfer.getData("source");
            const targetArea = ev.target.closest('.picto-container');

            if (!targetArea || !targetArea.classList.contains('builder-board')) return;

            // Quitar empty state si existe
            const emptyState = targetArea.querySelector('.empty-state');
            if (emptyState) emptyState.remove();

            if (source === "library") {
                const htmlStr = ev.dataTransfer.getData("html");
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = htmlStr;
                const newEl = tempDiv.firstChild;

                newEl.id = "picto-" + Date.now() + Math.random().toString(36).substr(2, 9);
                newEl.ondragstart = window.drag; // Fix dropped elements losing drag events

                const removeBtn = newEl.querySelector('.remove-btn');
                if(removeBtn) {
                    removeBtn.style.display = '';
                    removeBtn.removeAttribute('onclick');
                    removeBtn.addEventListener('click', function() { this.parentElement.remove(); });
                }

                targetArea.appendChild(newEl);
            } else if (source === "board") {
                const dataId = ev.dataTransfer.getData("text");
                const draggedEl = document.getElementById(dataId);
                if (draggedEl && draggedEl.parentElement === targetArea) {
                    targetArea.appendChild(draggedEl);
                }
            }
        };
    }

    getCurrentFilter() {
        const activeCat = document.querySelector('.filter-btn.active:not(.source-btn):not(.gram-btn):not(.num-btn)');
        const activeSource = document.querySelector('.source-btn.active');
        const activeGram = document.querySelector('.gram-btn.active');
        const activeNum = document.querySelector('.num-btn.active');
        return {
            category: activeCat ? activeCat.dataset.filter : 'all',
            source: activeSource ? activeSource.dataset.source : 'all',
            gramatica: activeGram ? activeGram.dataset.gram : 'all',
            number: activeNum ? activeNum.dataset.num : 'all'
        };
    }

    switchTab(tabId, btnElement) {
        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

        const targetTab = document.getElementById(tabId);
        if(targetTab) targetTab.classList.add('active');
        if(btnElement) btnElement.classList.add('active');
    }

    applyTheme(settings) {
        document.documentElement.setAttribute('data-theme', settings.theme);
        if (settings.highContrast) {
            document.documentElement.setAttribute('data-contrast', 'high');
        } else {
            document.documentElement.removeAttribute('data-contrast');
        }
    }

    applyTextVisibility(showText) {
        if (showText) {
            document.body.classList.remove('hide-text');
        } else {
            document.body.classList.add('hide-text');
        }
    }

    initSettingsUI(settings) {
        const contrastEl = document.getElementById('high-contrast-toggle');
        if(contrastEl) contrastEl.checked = settings.highContrast;

        const showTextEl = document.getElementById('show-text-toggle');
        if(showTextEl) showTextEl.checked = settings.showText;

        const rateEl = document.getElementById('voice-rate');
        if(rateEl) rateEl.value = settings.voiceRate;

        const rateValEl = document.getElementById('rate-value');
        if(rateValEl) rateValEl.textContent = settings.voiceRate === 1 ? 'Normal' : settings.voiceRate + 'x';

        const apiKeyEl = document.getElementById('api-key-input');
        if(apiKeyEl) apiKeyEl.value = settings.apiKey;

        const autoAiEl = document.getElementById('auto-ai-toggle');
        if(autoAiEl) autoAiEl.checked = settings.autoAI;

        this.applyTheme(settings);
        this.applyTextVisibility(settings.showText);
    }

    renderEmptyGenerator() {
        const container = document.getElementById('picto-output');
        if(container) container.innerHTML = '<div class="empty-state">Escribe algo arriba y mira la magia ✨</div>';
    }

    renderGeneratorNotFound() {
        const container = document.getElementById('picto-output');
        if(container) container.innerHTML = '<div class="empty-state">No se encontraron pictogramas para este texto. Intenta con palabras más sencillas.</div>';
    }

    clearGenerator() {
        const container = document.getElementById('picto-output');
        if(container) container.innerHTML = '';
    }

    // Firma extendida: alternatives[] y onAlternativeSelect callback opcionales
    createPictogramElement(data, displayWord, id = null, isDraggable = true, alternatives = [], onAlternativeSelect = null) {
        const div = document.createElement('div');
        div.className = 'pictogram';
        div.dataset.category = data.cat;
        div.dataset.gramatica = data.gramatica || 'otro';
        div.dataset.source = data.source || 'ARASAAC';
        if (isDraggable) {
            div.draggable = true;
            div.ondragstart = window.drag;
        }
        div.id = id || "picto-" + Date.now() + Math.random().toString(36).substr(2, 9);

        // Botón eliminar
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.title = 'Eliminar';
        removeBtn.style.display = 'none';
        removeBtn.textContent = '✕';
        removeBtn.addEventListener('click', function() { this.parentElement.remove(); });

        const imgContainer = document.createElement('div');
        imgContainer.className = 'picto-img';
        if (data.isPlural) imgContainer.classList.add('plural-img');

        const renderContent = (imgSrc) => {
            if (!imgSrc) imgSrc = data.img;
            if (imgSrc.startsWith('data:image')) {
                const img = document.createElement('img');
                img.src = imgSrc;
                img.alt = displayWord;
                return img;
            } else if (imgSrc.startsWith('<svg')) {
                const svgWrap = document.createElement('div');
                svgWrap.className = 'svg-wrapper';
                svgWrap.innerHTML = imgSrc;
                return svgWrap;
            } else {
                const textNode = document.createElement('span');
                textNode.textContent = imgSrc;
                return textNode;
            }
        };

        imgContainer.appendChild(renderContent(data.img));
        if (data.isPlural) {
            imgContainer.appendChild(renderContent(data.img));
        }

        const labelContainer = document.createElement('div');
        labelContainer.className = 'picto-label';
        labelContainer.textContent = displayWord;

        div.appendChild(imgContainer);
        div.appendChild(labelContainer);

        // Selector visual de alternativas (si hay más de una fuente disponible)
        if (alternatives && alternatives.length > 1 && typeof onAlternativeSelect === 'function') {
            const altSelector = document.createElement('div');
            altSelector.className = 'alternatives-selector';
            altSelector.title = 'Elige fuente visual';

            alternatives.forEach((alt, idx) => {
                const thumb = document.createElement('span');
                thumb.className = 'alt-thumb' + (idx === 0 ? ' active' : '');
                thumb.title = alt.source;
                thumb.dataset.source = alt.source;

                // Miniatura de la alternativa
                if (alt.img.startsWith('<svg') || alt.img.startsWith('data:image')) {
                    const mini = document.createElement('span');
                    mini.innerHTML = alt.img.startsWith('<svg')
                        ? alt.img
                        : `<img src="${alt.img}" style="width:100%;height:100%;"/>`;
                    mini.style.cssText = 'display:block;width:100%;height:100%;';
                    thumb.appendChild(mini);
                } else {
                    thumb.textContent = alt.img; // emoji
                }

                thumb.addEventListener('click', (e) => {
                    e.stopPropagation();
                    // Marcar como activa
                    altSelector.querySelectorAll('.alt-thumb').forEach(t => t.classList.remove('active'));
                    thumb.classList.add('active');
                    // Actualizar imagen principal
                    onAlternativeSelect(alt.img, alt.source);
                });

                altSelector.appendChild(thumb);
            });

            div.appendChild(altSelector);
        }

        div.appendChild(removeBtn);
        return div;
    }

    appendPictogramToGenerator(el) {
        const container = document.getElementById('picto-output');
        if(container) container.appendChild(el);
    }

    // Actualiza solo la imagen de un pictograma ya renderizado
    // (usado por handleAlternativeSelect sin re-renderizar todo)
    updatePictogramImage(domElement, newImg, newSource) {
        const imgContainer = domElement.querySelector('.picto-img');
        if (!imgContainer) return;
        imgContainer.innerHTML = '';

        if (newImg.startsWith('<svg')) {
            const wrap = document.createElement('div');
            wrap.className = 'svg-wrapper';
            wrap.innerHTML = newImg;
            imgContainer.appendChild(wrap);
        } else if (newImg.startsWith('data:image')) {
            const img = document.createElement('img');
            img.src = newImg;
            imgContainer.appendChild(img);
        } else {
            const span = document.createElement('span');
            span.textContent = newImg;
            imgContainer.appendChild(span);
        }

        // Actualizar badge de fuente en el dataset
        if (newSource) domElement.dataset.source = newSource;
    }

    setAILoadingState(domElement) {
        domElement.innerHTML = `
            <div class="loading-spinner">⏳</div>
            <div class="picto-label">Generando...</div>
        `;
    }

    setAIErrorState(domElement) {
        domElement.innerHTML = `
            <div class="picto-img">❌</div>
            <div class="picto-label">Error AI</div>
        `;
    }

    updatePictogramWithSVG(domElement, svgBase64, word) {
        domElement.innerHTML = `
            <div class="picto-img"><img src="${svgBase64}" alt="${word}"></div>
            <div class="picto-label">${word}</div>
            <button class="remove-btn" title="Eliminar" style="display:none;">✕</button>
        `;
        const removeBtn = domElement.querySelector('.remove-btn');
        removeBtn.addEventListener('click', function() { this.parentElement.remove(); });
    }

    renderLibrary(dict, searchTerm = "", filter = "all", sourceFilter = "all", gramaticaFilter = "all", numberFilter = "all") {
        const grid = document.getElementById('library-grid');
        const miniGrid = document.getElementById('builder-library');

        if(!grid || !miniGrid) return;

        grid.innerHTML = '';
        miniGrid.innerHTML = '';

        const filteredDict = dict.filter(entry => {
            // Filtro de búsqueda
            const matchSearch = entry.palabras.some(p => p.toLowerCase().includes(searchTerm));
            // Filtro de categoría visual ARASAAC
            const matchFilter = filter === 'all' || entry.cat === filter;
            // Filtro de fuente
            const entrySource = entry.source || 'Personalizado';
            const matchSource = sourceFilter === 'all' || entrySource === sourceFilter;
            // Filtro de categoría gramatical
            const matchGramatica = gramaticaFilter === 'all' || (entry.gramatica || 'otro') === gramaticaFilter;
            // Filtro de número (singular/plural)
            let matchNumber = true;
            if (numberFilter === 'singular') matchNumber = !entry.isPlural;
            else if (numberFilter === 'plural') matchNumber = !!entry.isPlural;

            return matchSearch && matchFilter && matchSource && matchGramatica && matchNumber;
        });

        if (filteredDict.length === 0) {
            grid.innerHTML = '<p style="color:#888; grid-column: 1/-1; text-align: center; padding: 2rem;">No se encontraron resultados. Prueba otra búsqueda o elimina algunos filtros.</p>';
            return;
        }

        filteredDict.forEach((entry, index) => {
            const mainWord = entry.palabras[0];
            const el = this.createPictogramElement(entry, mainWord, 'lib-' + index, false);
            grid.appendChild(el);

            const miniEl = this.createPictogramElement(entry, mainWord, 'minilib-' + index, true);
            miniGrid.appendChild(miniEl);
        });
    }

    renderFavorites(favorites, loadFavCallback, removeFavCallback) {
        const container = document.getElementById('favorites-list');
        if(!container) return;

        container.innerHTML = '';

        if (favorites.length === 0) {
            container.innerHTML = '<p style="color:#888;">Aún no has guardado frases favoritas.</p>';
            return;
        }

        favorites.forEach((fav, index) => {
            const div = document.createElement('div');
            div.className = 'fav-item';

            const span = document.createElement('span');
            span.className = 'fav-text';
            span.textContent = fav;
            span.addEventListener('click', () => loadFavCallback(fav));

            const btn = document.createElement('button');
            btn.className = 'action-btn clear';
            btn.style.padding = '0.5rem 1rem';
            btn.style.fontSize = '1rem';
            btn.textContent = '🗑️';
            btn.addEventListener('click', () => removeFavCallback(index));

            div.appendChild(span);
            div.appendChild(btn);
            container.appendChild(div);
        });
    }

    renderCustomGrid(customDict, removeCustomCallback) {
        const grid = document.getElementById('custom-grid');
        if(!grid) return;

        grid.innerHTML = '';

        if (customDict.length === 0) {
            grid.innerHTML = '<p style="color:#888; grid-column: 1/-1;">No has creado ningún pictograma personalizado.</p>';
            return;
        }

        customDict.forEach((entry, index) => {
            const el = this.createPictogramElement(entry, entry.palabras[0], null, false);
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'action-btn clear';
            deleteBtn.style.marginTop = '10px';
            deleteBtn.style.width = '100%';
            deleteBtn.style.padding = '5px';
            deleteBtn.style.fontSize = '1rem';
            deleteBtn.textContent = 'Eliminar';
            deleteBtn.addEventListener('click', () => {
                if(confirm('¿Eliminar este pictograma?')) {
                    removeCustomCallback(index);
                }
            });
            el.appendChild(deleteBtn);
            grid.appendChild(el);
        });
    }

    setPreviewImage(base64) {
        const preview = document.getElementById('image-preview');
        if(preview) preview.innerHTML = `<img src="${base64}" alt="Preview">`;
    }

    clearCustomForm() {
        const wordInput = document.getElementById('custom-word');
        const imgInput = document.getElementById('custom-image');
        const preview = document.getElementById('image-preview');

        if(wordInput) wordInput.value = '';
        if(imgInput) imgInput.value = '';
        if(preview) preview.innerHTML = 'Preview de imagen';
    }

    initSpeechSynthesis(settings, saveVoiceCallback) {
        if (!('speechSynthesis' in window)) {
            console.warn('Síntesis de voz no soportada en este navegador.');
            return;
        }

        const populateVoices = () => {
            this.voices = this.synth.getVoices();
            const select = document.getElementById('voice-select');
            if(!select) return;

            select.innerHTML = '';

            let esVoices = this.voices.filter(v => v.lang.startsWith('es'));
            let displayVoices = esVoices.length > 0 ? esVoices : this.voices;

            displayVoices.forEach(voice => {
                const option = document.createElement('option');
                option.value = voice.voiceURI;
                option.textContent = `${voice.name} (${voice.lang})`;
                if (settings.voiceURI === voice.voiceURI) {
                    option.selected = true;
                }
                select.appendChild(option);
            });

            if (!settings.voiceURI && esVoices.length > 0) {
                saveVoiceCallback(esVoices[0].voiceURI);
                select.value = esVoices[0].voiceURI;
            }
        };

        populateVoices();
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = populateVoices;
        }
    }

    speak(text, settings) {
        if (!text || !('speechSynthesis' in window)) return;

        this.synth.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = settings.voiceRate;

        if (settings.voiceURI) {
            const selectedVoice = this.voices.find(v => v.voiceURI === settings.voiceURI);
            if (selectedVoice) {
                utterance.voice = selectedVoice;
            }
        }

        this.synth.speak(utterance);
    }
}
