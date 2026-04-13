class DictModel {
    constructor(stateModel) {
        this.stateModel = stateModel;
        const diccionario = [

    { palabras: ["vivir", "residir", "habitar"], img: "🏠", cat: "acciones", source: "ARASAAC" },
    { palabras: ["traer", "llevar", "portar"], img: "🤲", cat: "acciones", source: "ARASAAC" },
    { palabras: ["caer", "tropezar", "resbalar"], img: "🤕", cat: "acciones", source: "Plena Inclusión" },
    { palabras: ["levantar", "alzar", "elevar"], img: "🏋️", cat: "acciones", source: "Mulberry" },
    { palabras: ["tirar", "lanzar", "arrojar"], img: "🚮", cat: "acciones", source: "ARASAAC" },
    { palabras: ["empujar"], img: "🫸", cat: "acciones", source: "ARASAAC" },
    { palabras: ["jalar", "tirar", "arrastrar"], img: "🫷", cat: "acciones", source: "Mulberry" },
    { palabras: ["oler", "olfatear"], img: "👃", cat: "acciones", source: "Mulberry" },
    { palabras: ["tocar", "palpar", "acariciar"], img: "🖐️", cat: "acciones", source: "ARASAAC" },
    { palabras: ["sentir", "padecer", "experimentar"], img: "❤️", cat: "acciones", source: "ARASAAC" },
    { palabras: ["enseñar", "educar", "mostrar"], img: "👩‍🏫", cat: "acciones", source: "ARASAAC" },
    { palabras: ["olvidar", "desconocer"], img: "🤷", cat: "acciones", source: "ARASAAC" },
    { palabras: ["recordar", "acordar", "memoria"], img: "🧠", cat: "acciones", source: "ARASAAC" },
    { palabras: ["entender", "comprender", "captar"], img: "💡", cat: "acciones", source: "ARASAAC" },
    { palabras: ["saber", "conocer"], img: "🎓", cat: "acciones", source: "ARASAAC" },
    { palabras: ["creer", "suponer", "opinar"], img: "💭", cat: "acciones", source: "Mulberry" },
    { palabras: ["querer", "desear", "apetecer"], img: "🥺", cat: "acciones", source: "ARASAAC" },
    { palabras: ["necesitar", "precisar", "requerir"], img: "🆘", cat: "acciones", source: "Sclera" },
    { palabras: ["deber", "obligar", "tener"], img: "⚠️", cat: "acciones", source: "ARASAAC" },
    { palabras: ["poder", "conseguir", "lograr"], img: "💪", cat: "acciones", source: "ARASAAC" },
    { palabras: ["intentar", "probar", "tratar"], img: "🎯", cat: "acciones", source: "Plena Inclusión" },
    { palabras: ["ayudar", "socorrer", "asistir"], img: "🤝", cat: "acciones", source: "ARASAAC" },
    { palabras: ["pedir", "solicitar", "rogar"], img: "🙏", cat: "acciones", source: "Plena Inclusión" },
    { palabras: ["preguntar", "consultar", "interrogar"], img: "❓", cat: "acciones", source: "ARASAAC" },
    { palabras: ["responder", "contestar", "replicar"], img: "💬", cat: "acciones", source: "ARASAAC" },
    { palabras: ["explicar", "aclarar", "detallar"], img: "🗣️", cat: "acciones", source: "ARASAAC" },
    { palabras: ["gritar", "chillar", "vociferar"], img: "📢", cat: "acciones", source: "ARASAAC" },
    { palabras: ["susurrar", "murmurar"], img: "🤫", cat: "acciones", source: "Mulberry" },
    { palabras: ["llamar", "telefonear", "contactar"], img: "📞", cat: "acciones", source: "ARASAAC" },
    { palabras: ["escribir", "redactar", "anotar"], img: "✍️", cat: "acciones", source: "Sclera" },
    { palabras: ["leer", "revisar", "hojear"], img: "📖", cat: "acciones", source: "ARASAAC" },
    { palabras: ["dibujar", "trazar", "bosquejar"], img: "✏️", cat: "acciones", source: "ARASAAC" },
    { palabras: ["pintar", "colorear", "manchar"], img: "🎨", cat: "acciones", source: "Mulberry" },
    { palabras: ["borrar", "eliminar", "suprimir"], img: "🗑️", cat: "acciones", source: "ARASAAC" },
    { palabras: ["cortar", "talar", "seccionar"], img: "✂️", cat: "acciones", source: "Mulberry" },
    { palabras: ["pegar", "adherir", "unir"], img: "🧴", cat: "acciones", source: "ARASAAC" },
    { palabras: ["romper", "quebrar", "destrozar"], img: "💥", cat: "acciones", source: "Plena Inclusión" },
    { palabras: ["arreglar", "reparar", "componer"], img: "🔧", cat: "acciones", source: "ARASAAC" },
    { palabras: ["limpiar", "asear", "fregar"], img: "🧹", cat: "acciones", source: "ARASAAC" },
    { palabras: ["ensuciar", "manchar", "pringarse"], img: "💩", cat: "acciones", source: "ARASAAC" },
    { palabras: ["bañar", "duchar", "lavar"], img: "🚿", cat: "acciones", source: "ARASAAC" },
    { palabras: ["vestir", "poner", "abrigar"], img: "👕", cat: "acciones", source: "ARASAAC" },
    { palabras: ["desvestir", "quitar", "desnudar"], img: "🩲", cat: "acciones", source: "ARASAAC" },
    { palabras: ["peinar", "cepillar", "arreglarse"], img: "梳", cat: "acciones", source: "ARASAAC" }, // Comb emoji
    { palabras: ["dormir", "descansar", "pernoctar"], img: "🛌", cat: "acciones", source: "Plena Inclusión" },
    { palabras: ["despertar", "madrugar", "levantar"], img: "⏰", cat: "acciones", source: "ARASAAC" },
    { palabras: ["soñar", "fantasear"], img: "💭", cat: "acciones", source: "ARASAAC" },
    { palabras: ["comer", "alimentar", "tragar"], img: "🍴", cat: "acciones", source: "ARASAAC" },
    { palabras: ["beber", "tomar", "sorber"], img: "🥤", cat: "acciones", source: "ARASAAC" },
    { palabras: ["masticar", "morder"], img: "🦷", cat: "acciones", source: "ARASAAC" },
    { palabras: ["cocinar", "guisar", "preparar"], img: "👨‍🍳", cat: "acciones", source: "ARASAAC" },
    { palabras: ["comprar", "adquirir", "mercar"], img: "🛍️", cat: "acciones", source: "Sclera" },
    { palabras: ["vender", "comerciar", "despachar"], img: "🏪", cat: "acciones", source: "ARASAAC" },
    { palabras: ["pagar", "abonar", "costear"], img: "💳", cat: "acciones", source: "Mulberry" },
    { palabras: ["cobrar", "recaudar", "recibir"], img: "💶", cat: "acciones", source: "Mulberry" },
    { palabras: ["ahorrar", "guardar", "economizar"], img: "🐷", cat: "acciones", source: "Mulberry" },
    { palabras: ["gastar", "derrochar", "consumir"], img: "💸", cat: "acciones", source: "ARASAAC" },
    { palabras: ["trabajar", "laborar", "currar"], img: "🏗️", cat: "acciones", source: "ARASAAC" },
    { palabras: ["jugar", "divertir", "entretener"], img: "🧩", cat: "acciones", source: "ARASAAC" },
    { palabras: ["ganar", "vencer", "triunfar"], img: "🥇", cat: "acciones", source: "Sclera" },
    { palabras: ["perder", "fracasar", "caer"], img: "❌", cat: "acciones", source: "ARASAAC" },
    { palabras: ["empatar", "igualar"], img: "🤝", cat: "acciones", source: "Sclera" },
    { palabras: ["viajar", "desplazar", "recorrer"], img: "🧳", cat: "acciones", source: "ARASAAC" },
    { palabras: ["conducir", "manejar", "pilotar"], img: " steering_wheel ", cat: "acciones", source: "ARASAAC" },
    { palabras: ["volar", "planear", "surcar"], img: "✈️", cat: "acciones", source: "ARASAAC" },
    { palabras: ["navegar", "zarpar", "remar"], img: "⛵", cat: "acciones", source: "Mulberry" },
    { palabras: ["aparcar", "estacionar", "parquear"], img: "🅿️", cat: "acciones", source: "Mulberry" },
    { palabras: ["parar", "detener", "frenar"], img: "🛑", cat: "acciones", source: "Plena Inclusión" },
    { palabras: ["esperar", "aguardar", "permanecer"], img: "🚏", cat: "acciones", source: "ARASAAC" },
    { palabras: ["llegar", "arribar", "alcanzar"], img: "🏁", cat: "acciones", source: "Sclera" },
    { palabras: ["salir", "partir", "irse"], img: "🚪", cat: "acciones", source: "ARASAAC" },
    { palabras: ["entrar", "ingresar", "pasar"], img: "➡️", cat: "acciones", source: "Plena Inclusión" },
    { palabras: ["subir", "ascender", "escalar"], img: "⬆️", cat: "acciones", source: "Sclera" },
    { palabras: ["bajar", "descender", "caer"], img: "⬇️", cat: "acciones", source: "ARASAAC" },
    { palabras: ["saltar", "brincar", "botar"], img: "🦘", cat: "acciones", source: "ARASAAC" },
    { palabras: ["correr", "trotar", "huir"], img: "🏃", cat: "acciones", source: "ARASAAC" },
    { palabras: ["caminar", "andar", "pasear"], img: "🚶", cat: "acciones", source: "ARASAAC" },
    { palabras: ["nadar", "bucear", "chapotear"], img: "🏊", cat: "acciones", source: "ARASAAC" },
    { palabras: ["bailar", "danzar", "moverse"], img: "🕺", cat: "acciones", source: "Sclera" },
    { palabras: ["cantar", "entonar", "tararear"], img: "🎤", cat: "acciones", source: "ARASAAC" },
    { palabras: ["tocar", "pulsar", "sonar"], img: "🎹", cat: "acciones", source: "Mulberry" },
    { palabras: ["escuchar", "oir", "atender"], img: "🎧", cat: "acciones", source: "Mulberry" },
    { palabras: ["mirar", "ver", "observar"], img: "👁️", cat: "acciones", source: "ARASAAC" },
    { palabras: ["buscar", "rastrear", "indagar"], img: "🔎", cat: "acciones", source: "ARASAAC" },
    { palabras: ["encontrar", "hallar", "descubrir"], img: "🎯", cat: "acciones", source: "ARASAAC" },
    { palabras: ["esconder", "ocultar", "tapar"], img: "🙈", cat: "acciones", source: "Sclera" },
    { palabras: ["perder", "extraviar", "despistar"], img: "❓", cat: "acciones", source: "ARASAAC" },
    { palabras: ["abrir", "destapar", "desplegar"], img: "📂", cat: "acciones", source: "ARASAAC" },
    { palabras: ["cerrar", "tapar", "clausurar"], img: "📁", cat: "acciones", source: "ARASAAC" },
    { palabras: ["encender", "prender", "activar"], img: "💡", cat: "acciones", source: "ARASAAC" },
    { palabras: ["apagar", "extinguir", "desactivar"], img: "🔌", cat: "acciones", source: "ARASAAC" },
    { palabras: ["empezar", "comenzar", "iniciar"], img: "🏁", cat: "acciones", source: "Sclera" },
    { palabras: ["terminar", "acabar", "finalizar"], img: "🔚", cat: "acciones", source: "Mulberry" },
    { palabras: ["amar", "querer", "adorar"], img: "💖", cat: "acciones", source: "Plena Inclusión" },
    { palabras: ["odiar", "detestar", "aborrecer"], img: "😠", cat: "acciones", source: "ARASAAC" },
    { palabras: ["llorar", "sollozar", "lagrimear"], img: "😢", cat: "acciones", source: "ARASAAC" },
    { palabras: ["reir", "carcajear", "sonreir"], img: "😄", cat: "acciones", source: "Plena Inclusión" },
    { palabras: ["asustar", "aterrar", "espantar"], img: "👻", cat: "acciones", source: "ARASAAC" },
    { palabras: ["sorprender", "asombrar", "maravillar"], img: "😲", cat: "acciones", source: "ARASAAC" },
    { palabras: ["enfadar", "enojar", "cabrear"], img: "😡", cat: "acciones", source: "ARASAAC" },
    { palabras: ["aburrir", "cansar", "hastiar"], img: "🥱", cat: "acciones", source: "Mulberry" },
    { palabras: ["cansar", "agotar", "fatigar"], img: "😫", cat: "acciones", source: "Plena Inclusión" },
    { palabras: ["doler", "sufrir", "padecer"], img: "🤕", cat: "acciones", source: "ARASAAC" },
    { palabras: ["curar", "sanar", "remediar"], img: "🩹", cat: "acciones", source: "ARASAAC" },
    { palabras: ["enfermar", "contagiar", "empeorar"], img: "🤒", cat: "acciones", source: "ARASAAC" },
    { palabras: ["nacer", "surgir", "brotar"], img: "🐣", cat: "acciones", source: "Mulberry" },
    { palabras: ["morir", "fallecer", "perecer"], img: "💀", cat: "acciones", source: "ARASAAC" },
    { palabras: ["matar", "asesinar", "eliminar"], img: "🔫", cat: "acciones", source: "Mulberry" },
    { palabras: ["salvar", "rescatar", "liberar"], img: "🦸", cat: "acciones", source: "ARASAAC" },
    { palabras: ["ayudar", "apoyar", "auxiliar"], img: "🤝", cat: "acciones", source: "Mulberry" },
    { palabras: ["compartir", "repartir", "dividir"], img: "🍕", cat: "acciones", source: "ARASAAC" }, // Sharing pizza
    { palabras: ["pelear", "luchar", "discutir"], img: "⚔️", cat: "acciones", source: "ARASAAC" },
    { palabras: ["abrazar", "achuchar", "apretar"], img: "🫂", cat: "acciones", source: "ARASAAC" },
    { palabras: ["besar", "besuquear", "mimar"], img: "💏", cat: "acciones", source: "ARASAAC" },
    { palabras: ["acariciar", "tocar", "rozar"], img: "🐈", cat: "acciones", source: "ARASAAC" }, // Petting cat
    { palabras: ["golpear", "pegar", "chocar"], img: "🥊", cat: "acciones", source: "Mulberry" },
    { palabras: ["patear", "chutar", "dar"], img: "🦵", cat: "acciones", source: "ARASAAC" },
    { palabras: ["morder", "mascar", "dentellear"], img: "🧛", cat: "acciones", source: "ARASAAC" },
    { palabras: ["soplar", "respirar", "jadear"], img: "🌬️", cat: "acciones", source: "ARASAAC" },
    { palabras: ["respirar", "inhalar", "exhalar"], img: "🫁", cat: "acciones", source: "Mulberry" },
    { palabras: ["toser", "estornudar", "ahogar"], img: "🤧", cat: "acciones", source: "ARASAAC" },
    { palabras: ["bostezar", "desperezar", "estirar"], img: "🥱", cat: "acciones", source: "Sclera" },
    { palabras: ["pensar", "imaginar", "meditar"], img: "🤔", cat: "acciones", source: "Plena Inclusión" },


    { palabras: ["lavarse los dientes", "cepillarse los dientes"], img: "🪥", cat: "acciones", source: "ARASAAC" },
    { palabras: ["ir a dormir", "irse a dormir", "acostarse", "ir a la cama"], img: "🛌", cat: "acciones", source: "ARASAAC" },
    { palabras: ["hacer la cama", "hacer cama"], img: "🛏️", cat: "acciones", source: "Mulberry" },
    { palabras: ["dar los buenos dias", "decir buenos dias", "buenos dias"], img: "🌅", cat: "acciones", source: "ARASAAC" },
    { palabras: ["dar las buenas noches", "decir buenas noches", "buenas noches"], img: "🌃", cat: "acciones", source: "ARASAAC" },
    { palabras: ["ir al baño", "hacer pis", "hacer caca", "ir al servicio"], img: "🚽", cat: "acciones", source: "Sclera" },
    { palabras: ["lavarse las manos", "lavar manos"], img: "🧼", cat: "acciones", source: "ARASAAC" },
    { palabras: ["ponerse la ropa", "poner la ropa", "vestirse", "ponerse pijama"], img: "👕", cat: "acciones", source: "Plena Inclusión" },
    { palabras: ["quitarse la ropa", "desvestirse", "quitar ropa"], img: "🩲", cat: "acciones", source: "Plena Inclusión" },
    { palabras: ["dar un beso", "dar besos"], img: "💋", cat: "acciones", source: "ARASAAC" },
    { palabras: ["dar un abrazo", "dar abrazos"], img: "🫂", cat: "acciones", source: "ARASAAC" },
    { palabras: ["jugar con amigos", "jugar juntos"], img: "🧑‍🤝‍🧑", cat: "acciones", source: "Mulberry" },
    { palabras: ["ir al colegio", "ir a la escuela", "ir al cole"], img: "🏫", cat: "lugares", source: "ARASAAC" },
    { palabras: ["hacer los deberes", "hacer tarea", "estudiar en casa"], img: "📓", cat: "acciones", source: "ARASAAC" },
    { palabras: ["comer la comida", "hora de comer", "almorzar"], img: "🍽️", cat: "acciones", source: "ARASAAC" },
    { palabras: ["beber agua", "tomar agua"], img: "💧", cat: "acciones", source: "Sclera" },
    { palabras: ["subir al coche", "ir en coche", "viajar en coche"], img: "🚗", cat: "acciones", source: "ARASAAC" },
    { palabras: ["bajar del coche", "salir del coche"], img: "🚪", cat: "acciones", source: "ARASAAC" },
    { palabras: ["ver la tele", "ver television", "mirar la tele"], img: "📺", cat: "acciones", source: "Mulberry" },
    { palabras: ["sentirse feliz", "estar contento", "estar feliz"], img: "😊", cat: "emociones", source: "ARASAAC" },
    { palabras: ["sentirse triste", "estar triste"], img: "😢", cat: "emociones", source: "ARASAAC" },
    { palabras: ["sentirse enfadado", "estar enojado", "estar enfadado"], img: "😠", cat: "emociones", source: "Sclera" },
    { palabras: ["me duele", "tengo dolor", "sentir dolor"], img: "🤕", cat: "emociones", source: "ARASAAC" },
    { palabras: ["tener miedo", "dar miedo", "estar asustado"], img: "😨", cat: "emociones", source: "Plena Inclusión" },
    { palabras: ["habia una vez", "erase una vez", "hace mucho tiempo"], img: "📖", cat: "otros", source: "ARASAAC" },
    { palabras: ["fin del cuento", "colorin colorado"], img: "🔚", cat: "otros", source: "ARASAAC" }

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

                // Do not conjugate or pluralize multi-word phrases for safety
                if (word.includes(' ')) return;

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
