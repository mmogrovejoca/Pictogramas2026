class StateModel {
    constructor() {
        this.settings = {
            highContrast: localStorage.getItem('highContrast') === 'true',
            showText: localStorage.getItem('showText') !== 'false',
            voiceURI: localStorage.getItem('voiceURI') || '',
            voiceRate: parseFloat(localStorage.getItem('voiceRate')) || 1.0,
            theme: localStorage.getItem('theme') || 'light',
            apiKey: localStorage.getItem('apiKey') ? atob(localStorage.getItem('apiKey')) : '',
            autoAI: localStorage.getItem('autoAI') === 'true'
        };
        this.favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        this.customDict = JSON.parse(localStorage.getItem('customDict')) || [];
    }

    saveState(key, data) {
        localStorage.setItem(key, typeof data === 'object' ? JSON.stringify(data) : data);
    }

    setSetting(key, value) {
        this.settings[key] = value;
        if (key === 'apiKey') {
            localStorage.setItem('apiKey', btoa(value));
        } else {
            this.saveState(key, value);
        }
    }

    addFavorite(text) {
        if (text && !this.favorites.includes(text)) {
            this.favorites.push(text);
            this.saveState('favorites', this.favorites);
            return true;
        }
        return false;
    }

    removeFavorite(index) {
        this.favorites.splice(index, 1);
        this.saveState('favorites', this.favorites);
    }

    addCustomPictogram(entry) {
        this.customDict.push(entry);
        this.saveState('customDict', this.customDict);
    }

    removeCustomPictogram(index) {
        this.customDict.splice(index, 1);
        this.saveState('customDict', this.customDict);
    }

    clearAll() {
        localStorage.clear();
    }
}
