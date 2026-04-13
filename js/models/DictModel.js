class DictModel {
    constructor(stateModel) {
        this.stateModel = stateModel;
        const diccionario = [

    { palabras: ["vivir", "residir", "habitar"], img: "🏠", cat: "acciones" },
    { palabras: ["traer", "llevar", "portar"], img: "🤲", cat: "acciones" },
    { palabras: ["caer", "tropezar", "resbalar"], img: "🤕", cat: "acciones" },
    { palabras: ["levantar", "alzar", "elevar"], img: "🏋️", cat: "acciones" },
    { palabras: ["tirar", "lanzar", "arrojar"], img: "🚮", cat: "acciones" },
    { palabras: ["empujar"], img: "🫸", cat: "acciones" },
    { palabras: ["jalar", "tirar", "arrastrar"], img: "🫷", cat: "acciones" },
    { palabras: ["oler", "olfatear"], img: "👃", cat: "acciones" },
    { palabras: ["tocar", "palpar", "acariciar"], img: "🖐️", cat: "acciones" },
    { palabras: ["sentir", "padecer", "experimentar"], img: "❤️", cat: "acciones" },
    { palabras: ["enseñar", "educar", "mostrar"], img: "👩‍🏫", cat: "acciones" },
    { palabras: ["olvidar", "desconocer"], img: "🤷", cat: "acciones" },
    { palabras: ["recordar", "acordar", "memoria"], img: "🧠", cat: "acciones" },
    { palabras: ["entender", "comprender", "captar"], img: "💡", cat: "acciones" },
    { palabras: ["saber", "conocer"], img: "🎓", cat: "acciones" },
    { palabras: ["creer", "suponer", "opinar"], img: "💭", cat: "acciones" },
    { palabras: ["querer", "desear", "apetecer"], img: "🥺", cat: "acciones" },
    { palabras: ["necesitar", "precisar", "requerir"], img: "🆘", cat: "acciones" },
    { palabras: ["deber", "obligar", "tener"], img: "⚠️", cat: "acciones" },
    { palabras: ["poder", "conseguir", "lograr"], img: "💪", cat: "acciones" },
    { palabras: ["intentar", "probar", "tratar"], img: "🎯", cat: "acciones" },
    { palabras: ["ayudar", "socorrer", "asistir"], img: "🤝", cat: "acciones" },
    { palabras: ["pedir", "solicitar", "rogar"], img: "🙏", cat: "acciones" },
    { palabras: ["preguntar", "consultar", "interrogar"], img: "❓", cat: "acciones" },
    { palabras: ["responder", "contestar", "replicar"], img: "💬", cat: "acciones" },
    { palabras: ["explicar", "aclarar", "detallar"], img: "🗣️", cat: "acciones" },
    { palabras: ["gritar", "chillar", "vociferar"], img: "📢", cat: "acciones" },
    { palabras: ["susurrar", "murmurar"], img: "🤫", cat: "acciones" },
    { palabras: ["llamar", "telefonear", "contactar"], img: "📞", cat: "acciones" },
    { palabras: ["escribir", "redactar", "anotar"], img: "✍️", cat: "acciones" },
    { palabras: ["leer", "revisar", "hojear"], img: "📖", cat: "acciones" },
    { palabras: ["dibujar", "trazar", "bosquejar"], img: "✏️", cat: "acciones" },
    { palabras: ["pintar", "colorear", "manchar"], img: "🎨", cat: "acciones" },
    { palabras: ["borrar", "eliminar", "suprimir"], img: "🗑️", cat: "acciones" },
    { palabras: ["cortar", "talar", "seccionar"], img: "✂️", cat: "acciones" },
    { palabras: ["pegar", "adherir", "unir"], img: "🧴", cat: "acciones" },
    { palabras: ["romper", "quebrar", "destrozar"], img: "💥", cat: "acciones" },
    { palabras: ["arreglar", "reparar", "componer"], img: "🔧", cat: "acciones" },
    { palabras: ["limpiar", "asear", "fregar"], img: "🧹", cat: "acciones" },
    { palabras: ["ensuciar", "manchar", "pringarse"], img: "💩", cat: "acciones" },
    { palabras: ["bañar", "duchar", "lavar"], img: "🚿", cat: "acciones" },
    { palabras: ["vestir", "poner", "abrigar"], img: "👕", cat: "acciones" },
    { palabras: ["desvestir", "quitar", "desnudar"], img: "🩲", cat: "acciones" },
    { palabras: ["peinar", "cepillar", "arreglarse"], img: "梳", cat: "acciones" }, // Comb emoji
    { palabras: ["dormir", "descansar", "pernoctar"], img: "🛌", cat: "acciones" },
    { palabras: ["despertar", "madrugar", "levantar"], img: "⏰", cat: "acciones" },
    { palabras: ["soñar", "fantasear"], img: "💭", cat: "acciones" },
    { palabras: ["comer", "alimentar", "tragar"], img: "🍴", cat: "acciones" },
    { palabras: ["beber", "tomar", "sorber"], img: "🥤", cat: "acciones" },
    { palabras: ["masticar", "morder"], img: "🦷", cat: "acciones" },
    { palabras: ["cocinar", "guisar", "preparar"], img: "👨‍🍳", cat: "acciones" },
    { palabras: ["comprar", "adquirir", "mercar"], img: "🛍️", cat: "acciones" },
    { palabras: ["vender", "comerciar", "despachar"], img: "🏪", cat: "acciones" },
    { palabras: ["pagar", "abonar", "costear"], img: "💳", cat: "acciones" },
    { palabras: ["cobrar", "recaudar", "recibir"], img: "💶", cat: "acciones" },
    { palabras: ["ahorrar", "guardar", "economizar"], img: "🐷", cat: "acciones" },
    { palabras: ["gastar", "derrochar", "consumir"], img: "💸", cat: "acciones" },
    { palabras: ["trabajar", "laborar", "currar"], img: "🏗️", cat: "acciones" },
    { palabras: ["jugar", "divertir", "entretener"], img: "🧩", cat: "acciones" },
    { palabras: ["ganar", "vencer", "triunfar"], img: "🥇", cat: "acciones" },
    { palabras: ["perder", "fracasar", "caer"], img: "❌", cat: "acciones" },
    { palabras: ["empatar", "igualar"], img: "🤝", cat: "acciones" },
    { palabras: ["viajar", "desplazar", "recorrer"], img: "🧳", cat: "acciones" },
    { palabras: ["conducir", "manejar", "pilotar"], img: " steering_wheel ", cat: "acciones" },
    { palabras: ["volar", "planear", "surcar"], img: "✈️", cat: "acciones" },
    { palabras: ["navegar", "zarpar", "remar"], img: "⛵", cat: "acciones" },
    { palabras: ["aparcar", "estacionar", "parquear"], img: "🅿️", cat: "acciones" },
    { palabras: ["parar", "detener", "frenar"], img: "🛑", cat: "acciones" },
    { palabras: ["esperar", "aguardar", "permanecer"], img: "🚏", cat: "acciones" },
    { palabras: ["llegar", "arribar", "alcanzar"], img: "🏁", cat: "acciones" },
    { palabras: ["salir", "partir", "irse"], img: "🚪", cat: "acciones" },
    { palabras: ["entrar", "ingresar", "pasar"], img: "➡️", cat: "acciones" },
    { palabras: ["subir", "ascender", "escalar"], img: "⬆️", cat: "acciones" },
    { palabras: ["bajar", "descender", "caer"], img: "⬇️", cat: "acciones" },
    { palabras: ["saltar", "brincar", "botar"], img: "🦘", cat: "acciones" },
    { palabras: ["correr", "trotar", "huir"], img: "🏃", cat: "acciones" },
    { palabras: ["caminar", "andar", "pasear"], img: "🚶", cat: "acciones" },
    { palabras: ["nadar", "bucear", "chapotear"], img: "🏊", cat: "acciones" },
    { palabras: ["bailar", "danzar", "moverse"], img: "🕺", cat: "acciones" },
    { palabras: ["cantar", "entonar", "tararear"], img: "🎤", cat: "acciones" },
    { palabras: ["tocar", "pulsar", "sonar"], img: "🎹", cat: "acciones" },
    { palabras: ["escuchar", "oir", "atender"], img: "🎧", cat: "acciones" },
    { palabras: ["mirar", "ver", "observar"], img: "👁️", cat: "acciones" },
    { palabras: ["buscar", "rastrear", "indagar"], img: "🔎", cat: "acciones" },
    { palabras: ["encontrar", "hallar", "descubrir"], img: "🎯", cat: "acciones" },
    { palabras: ["esconder", "ocultar", "tapar"], img: "🙈", cat: "acciones" },
    { palabras: ["perder", "extraviar", "despistar"], img: "❓", cat: "acciones" },
    { palabras: ["abrir", "destapar", "desplegar"], img: "📂", cat: "acciones" },
    { palabras: ["cerrar", "tapar", "clausurar"], img: "📁", cat: "acciones" },
    { palabras: ["encender", "prender", "activar"], img: "💡", cat: "acciones" },
    { palabras: ["apagar", "extinguir", "desactivar"], img: "🔌", cat: "acciones" },
    { palabras: ["empezar", "comenzar", "iniciar"], img: "🏁", cat: "acciones" },
    { palabras: ["terminar", "acabar", "finalizar"], img: "🔚", cat: "acciones" },
    { palabras: ["amar", "querer", "adorar"], img: "💖", cat: "acciones" },
    { palabras: ["odiar", "detestar", "aborrecer"], img: "😠", cat: "acciones" },
    { palabras: ["llorar", "sollozar", "lagrimear"], img: "😢", cat: "acciones" },
    { palabras: ["reir", "carcajear", "sonreir"], img: "😄", cat: "acciones" },
    { palabras: ["asustar", "aterrar", "espantar"], img: "👻", cat: "acciones" },
    { palabras: ["sorprender", "asombrar", "maravillar"], img: "😲", cat: "acciones" },
    { palabras: ["enfadar", "enojar", "cabrear"], img: "😡", cat: "acciones" },
    { palabras: ["aburrir", "cansar", "hastiar"], img: "🥱", cat: "acciones" },
    { palabras: ["cansar", "agotar", "fatigar"], img: "😫", cat: "acciones" },
    { palabras: ["doler", "sufrir", "padecer"], img: "🤕", cat: "acciones" },
    { palabras: ["curar", "sanar", "remediar"], img: "🩹", cat: "acciones" },
    { palabras: ["enfermar", "contagiar", "empeorar"], img: "🤒", cat: "acciones" },
    { palabras: ["nacer", "surgir", "brotar"], img: "🐣", cat: "acciones" },
    { palabras: ["morir", "fallecer", "perecer"], img: "💀", cat: "acciones" },
    { palabras: ["matar", "asesinar", "eliminar"], img: "🔫", cat: "acciones" },
    { palabras: ["salvar", "rescatar", "liberar"], img: "🦸", cat: "acciones" },
    { palabras: ["ayudar", "apoyar", "auxiliar"], img: "🤝", cat: "acciones" },
    { palabras: ["compartir", "repartir", "dividir"], img: "🍕", cat: "acciones" }, // Sharing pizza
    { palabras: ["pelear", "luchar", "discutir"], img: "⚔️", cat: "acciones" },
    { palabras: ["abrazar", "achuchar", "apretar"], img: "🫂", cat: "acciones" },
    { palabras: ["besar", "besuquear", "mimar"], img: "💏", cat: "acciones" },
    { palabras: ["acariciar", "tocar", "rozar"], img: "🐈", cat: "acciones" }, // Petting cat
    { palabras: ["golpear", "pegar", "chocar"], img: "🥊", cat: "acciones" },
    { palabras: ["patear", "chutar", "dar"], img: "🦵", cat: "acciones" },
    { palabras: ["morder", "mascar", "dentellear"], img: "🧛", cat: "acciones" },
    { palabras: ["soplar", "respirar", "jadear"], img: "🌬️", cat: "acciones" },
    { palabras: ["respirar", "inhalar", "exhalar"], img: "🫁", cat: "acciones" },
    { palabras: ["toser", "estornudar", "ahogar"], img: "🤧", cat: "acciones" },
    { palabras: ["bostezar", "desperezar", "estirar"], img: "🥱", cat: "acciones" },
    { palabras: ["pensar", "imaginar", "meditar"], img: "🤔", cat: "acciones" },

    ];

        const stopWords = ["el", "la", "los", "las", "un", "una", "unos", "unas", "de", "del", "a", "ante", "bajo", "cabe", "con", "contra", "desde", "en", "entre", "hacia", "hasta", "para", "por", "segun", "sin", "so", "sobre", "tras", "y", "e", "o", "u", "ni", "que", "pero", "aunque", "mas"];

        this.diccionario = this.expandDictionary(diccionario);
        this.stopWords = stopWords;
    }


    expandDictionary(baseDict) {
        const expandedDict = [];

        // Reglas simples de pluralización en español
        const pluralize = (word) => {
            if (word.endsWith('z')) return word.slice(0, -1) + 'ces';
            if (word.match(/[aeiouáéíóú]$/)) return word + 's';
            return word + 'es';
        };

        // Reglas simples de conjugación verbal (muy básicas para cubrir gerundios, participios y presentes comunes)
        const conjugateVerbs = (word) => {
            const forms = new Set([word]);

            if (word.endsWith('ar')) {
                const root = word.slice(0, -2);
                forms.add(root + 'ando'); // gerundio
                forms.add(root + 'ado'); // participio
                forms.add(root + 'ados');
                forms.add(root + 'adas');
                ['o', 'as', 'a', 'amos', 'ais', 'an', 'e', 'es', 'emos', 'en', 'aba', 'abas', 'abamos', 'aban', 'are', 'aras', 'ara', 'aremos', 'aran', 'aron', 'aste', 'o'].forEach(suffix => forms.add(root + suffix));
            } else if (word.endsWith('er')) {
                const root = word.slice(0, -2);
                forms.add(root + 'iendo');
                forms.add(root + 'ido');
                forms.add(root + 'idos');
                forms.add(root + 'idas');
                ['o', 'es', 'e', 'emos', 'eis', 'en', 'a', 'as', 'amos', 'an', 'ia', 'ias', 'iamos', 'ian', 'ere', 'eras', 'era', 'eremos', 'eran', 'ieron', 'iste', 'io'].forEach(suffix => forms.add(root + suffix));
            } else if (word.endsWith('ir')) {
                const root = word.slice(0, -2);
                forms.add(root + 'iendo');
                forms.add(root + 'ido');
                forms.add(root + 'idos');
                forms.add(root + 'idas');
                ['o', 'es', 'e', 'imos', 'is', 'en', 'a', 'as', 'amos', 'an', 'ia', 'ias', 'iamos', 'ian', 'ire', 'iras', 'ira', 'iremos', 'iran', 'ieron', 'iste', 'io'].forEach(suffix => forms.add(root + suffix));
            }

            return Array.from(forms);
        };

        baseDict.forEach(entry => {
            const newWords = new Set();

            entry.palabras.forEach(word => {
                newWords.add(word);

                if (entry.cat === 'acciones') {
                    conjugateVerbs(word).forEach(w => newWords.add(w));
                } else if (['objetos', 'personas', 'lugares', 'alimentos', 'emociones'].includes(entry.cat)) {
                    newWords.add(pluralize(word));
                }
            });

            expandedDict.push({
                ...entry,
                palabras: Array.from(newWords)
            });
        });

        return expandedDict;
    }


    getFullDict() {
        return [...this.diccionario, ...this.stateModel.customDict];
    }

    normalizeString(str) {
        return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[.,?!¡¿]/g, "");
    }

    findPictogram(word) {
        const normalizedWord = this.normalizeString(word);
        const dict = this.getFullDict();

        for (let entry of dict) {
            if (entry.palabras.some(p => this.normalizeString(p) === normalizedWord)) {
                return entry;
            }
        }
        return null;
    }

    async generateAIPictogram(word, apiKey) {
        if (!apiKey) {
            throw new Error('API_KEY_MISSING');
        }

        const prompt = `Eres un experto ilustrador de comunicación aumentativa y alternativa (CAA), estilo ARASAAC.
Genera un SVG puro, limpio, simple y minimalista que represente la palabra/concepto: "${word}".
Requisitos estrictos del SVG:
- Estilo ARASAAC: líneas gruesas negras, colores planos vivos, fondo transparente, siluetas estilizadas y fáciles de entender para niños con autismo.
- viewBox="0 0 200 200"
- NO incluyas la palabra escrita dentro de la imagen.
- NO uses sombras ni degradados ni detalles hiperrealistas.
- Devuelve SOLO el código SVG válido, sin etiquetas de markdown ni explicaciones. Debe empezar con <svg y terminar con </svg>.`;

        try {
            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'openrouter/free',
                    messages: [{ role: 'user', content: prompt }]
                })
            });

            if (!response.ok) throw new Error('Error en la API');

            const data = await response.json();
            let svgContent = data.choices[0].message.content.trim();

            if (svgContent.startsWith('```')) {
                svgContent = svgContent.replace(/```xml\n?|```svg\n?|```\n?/g, '').trim();
            }
            if (!svgContent.startsWith('<svg')) {
                const match = svgContent.match(/<svg[\s\S]*<\/svg>/);
                if (match) svgContent = match[0];
            }

            const base64SVG = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgContent)));
            return base64SVG;

        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
