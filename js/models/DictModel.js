/**
 * DictModel.js — Modelo del Diccionario Masivo de Pictogramas
 * Comunicador Visual TEA/CAA v2.0
 *
 * Fuentes integradas (offline):
 *   ARASAAC · Mulberry · Sclera · Plena Inclusión · Open Symbols
 * Estilo visual: líneas negras gruesas, colores planos, fondo blanco (ARASAAC)
 */
class DictModel {
    constructor(stateModel) {
        this.stateModel = stateModel;

        // ─────────────────────────────────────────────────────────────
        // SVGs inline estilo ARASAAC para los símbolos CAA más críticos
        // ─────────────────────────────────────────────────────────────
        this._svgs = {
            si: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="white"/><circle cx="100" cy="100" r="88" fill="#4CAF50" stroke="#1B5E20" stroke-width="6"/><polyline points="48,100 82,142 154,56" fill="none" stroke="white" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
            no: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="white"/><circle cx="100" cy="100" r="88" fill="#F44336" stroke="#B71C1C" stroke-width="6"/><line x1="55" y1="55" x2="145" y2="145" stroke="white" stroke-width="18" stroke-linecap="round"/><line x1="145" y1="55" x2="55" y2="145" stroke="white" stroke-width="18" stroke-linecap="round"/></svg>`,
            yo: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="white"/><circle cx="100" cy="42" r="28" fill="#FFD54F" stroke="black" stroke-width="4"/><path d="M62,75 Q100,62 138,75 L145,165 Q100,175 55,165 Z" fill="#FF9800" stroke="black" stroke-width="4"/><line x1="62" y1="92" x2="25" y2="115" stroke="black" stroke-width="6" stroke-linecap="round"/><line x1="138" y1="92" x2="175" y2="115" stroke="black" stroke-width="6" stroke-linecap="round"/><line x1="30" y1="95" x2="62" y2="108" stroke="#E53935" stroke-width="5" stroke-linecap="round"/><polygon points="30,95 43,83 45,103" fill="#E53935"/></svg>`,
            tu: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="white"/><circle cx="100" cy="42" r="28" fill="#FFD54F" stroke="black" stroke-width="4"/><path d="M62,75 Q100,62 138,75 L145,165 Q100,175 55,165 Z" fill="#2196F3" stroke="black" stroke-width="4"/><line x1="62" y1="92" x2="25" y2="115" stroke="black" stroke-width="6" stroke-linecap="round"/><line x1="138" y1="92" x2="175" y2="115" stroke="black" stroke-width="6" stroke-linecap="round"/><line x1="170" y1="95" x2="138" y2="108" stroke="#E53935" stroke-width="5" stroke-linecap="round"/><polygon points="170,95 157,83 155,103" fill="#E53935"/></svg>`,
            querer: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="white"/><path d="M100,168 C60,135 15,105 15,68 C15,42 35,22 58,22 C75,22 90,32 100,46 C110,32 125,22 142,22 C165,22 185,42 185,68 C185,105 140,135 100,168 Z" fill="#E53935" stroke="#B71C1C" stroke-width="5"/><path d="M55,65 Q65,50 80,60" fill="none" stroke="#FF8A80" stroke-width="4" stroke-linecap="round"/></svg>`,
            ayuda: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="white"/><path d="M85,175 L85,65 Q85,52 95,52 Q105,52 105,65 L105,105 L115,105 L115,75 Q115,62 125,62 Q135,62 135,75 L135,115 L143,115 L143,85 Q143,74 152,74 Q161,74 161,85 L161,130 Q161,178 112,178 L82,178 Q55,178 55,153 L55,95 L47,95 L47,75 Q47,62 60,62 Q73,62 73,75 L73,140 L85,140 Z" fill="#FFD54F" stroke="black" stroke-width="4"/><rect x="145" y="15" width="18" height="55" rx="5" fill="#E53935" stroke="#B71C1C" stroke-width="3"/><rect x="127" y="33" width="55" height="18" rx="5" fill="#E53935" stroke="#B71C1C" stroke-width="3"/></svg>`,
            bano: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="white"/><ellipse cx="100" cy="168" rx="62" ry="18" fill="#90A4AE" stroke="black" stroke-width="4"/><path d="M48,168 L42,128 Q40,105 100,105 Q160,105 158,128 L152,168 Z" fill="#CFD8DC" stroke="black" stroke-width="4"/><path d="M68,105 L68,90 Q68,78 100,78 Q132,78 132,90 L132,105 Z" fill="#ECEFF1" stroke="black" stroke-width="4"/><rect x="73" y="63" width="54" height="18" rx="6" fill="#90A4AE" stroke="black" stroke-width="4"/><text x="100" y="153" text-anchor="middle" font-size="16" font-weight="bold" fill="#37474F" font-family="Arial,sans-serif">WC</text></svg>`,
            comer: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="white"/><ellipse cx="100" cy="140" rx="68" ry="22" fill="#E0E0E0" stroke="black" stroke-width="4"/><ellipse cx="100" cy="122" rx="68" ry="22" fill="white" stroke="black" stroke-width="4"/><ellipse cx="100" cy="115" rx="48" ry="14" fill="#FFA726"/><line x1="50" y1="38" x2="50" y2="95" stroke="#424242" stroke-width="7" stroke-linecap="round"/><line x1="41" y1="38" x2="41" y2="62" stroke="#424242" stroke-width="5" stroke-linecap="round"/><line x1="50" y1="38" x2="50" y2="62" stroke="#424242" stroke-width="5" stroke-linecap="round"/><line x1="59" y1="38" x2="59" y2="62" stroke="#424242" stroke-width="5" stroke-linecap="round"/><line x1="150" y1="38" x2="150" y2="95" stroke="#424242" stroke-width="7" stroke-linecap="round"/><path d="M142,38 Q162,52 150,72" fill="#9E9E9E" stroke="#424242" stroke-width="3"/></svg>`,
            beber: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="white"/><path d="M62,38 L78,175 L122,175 L138,38 Z" fill="#B3E5FC" stroke="black" stroke-width="5"/><path d="M72,95 L80,175 L120,175 L128,95 Z" fill="#29B6F6"/><circle cx="90" cy="135" r="5" fill="#E1F5FE"/><circle cx="108" cy="152" r="4" fill="#E1F5FE"/><line x1="120" y1="175" x2="152" y2="28" stroke="#F48FB1" stroke-width="8" stroke-linecap="round"/></svg>`,
            dormir: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="white"/><rect x="18" y="120" width="164" height="65" rx="9" fill="#8D6E63" stroke="black" stroke-width="4"/><rect x="18" y="100" width="164" height="30" rx="5" fill="#FFCCBC" stroke="black" stroke-width="4"/><ellipse cx="68" cy="105" rx="34" ry="14" fill="white" stroke="black" stroke-width="3"/><ellipse cx="100" cy="96" rx="23" ry="21" fill="#FFD54F" stroke="black" stroke-width="4"/><path d="M91,91 Q100,83 109,91" fill="none" stroke="black" stroke-width="3"/><path d="M91,100 Q95,96 99,100" fill="none" stroke="black" stroke-width="2.5"/><path d="M101,100 Q105,96 109,100" fill="none" stroke="black" stroke-width="2.5"/><text x="132" y="72" font-size="24" font-weight="bold" fill="#5C6BC0" font-family="Arial">Z</text><text x="150" y="52" font-size="18" fill="#5C6BC0" font-family="Arial">z</text><path d="M22,32 Q52,22 42,62 Q17,50 22,32Z" fill="#FFF176" stroke="#F9A825" stroke-width="3"/></svg>`,
            feliz: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="white"/><circle cx="100" cy="106" r="84" fill="#FFD600" stroke="#F57F17" stroke-width="5"/><ellipse cx="70" cy="86" rx="13" ry="15" fill="#333"/><ellipse cx="130" cy="86" rx="13" ry="15" fill="#333"/><circle cx="76" cy="79" r="4.5" fill="white"/><circle cx="136" cy="79" r="4.5" fill="white"/><path d="M55,122 Q100,168 145,122" fill="none" stroke="#333" stroke-width="9" stroke-linecap="round"/><ellipse cx="58" cy="132" rx="17" ry="11" fill="#FF8A65" opacity="0.65"/><ellipse cx="142" cy="132" rx="17" ry="11" fill="#FF8A65" opacity="0.65"/></svg>`,
            triste: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="white"/><circle cx="100" cy="106" r="84" fill="#90CAF9" stroke="#1565C0" stroke-width="5"/><ellipse cx="70" cy="86" rx="13" ry="15" fill="#333"/><ellipse cx="130" cy="86" rx="13" ry="15" fill="#333"/><circle cx="76" cy="79" r="4.5" fill="white"/><circle cx="136" cy="79" r="4.5" fill="white"/><path d="M62,142 Q100,116 138,142" fill="none" stroke="#333" stroke-width="9" stroke-linecap="round"/><path d="M70,101 Q66,118 70,132" fill="none" stroke="#42A5F5" stroke-width="5" stroke-linecap="round"/><ellipse cx="70" cy="134" rx="6" ry="8" fill="#42A5F5"/><path d="M55,66 Q70,57 82,68" fill="none" stroke="#333" stroke-width="5" stroke-linecap="round"/><path d="M118,68 Q130,57 145,66" fill="none" stroke="#333" stroke-width="5" stroke-linecap="round"/></svg>`,
            enfadado: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="white"/><circle cx="100" cy="106" r="84" fill="#EF5350" stroke="#B71C1C" stroke-width="5"/><ellipse cx="70" cy="92" rx="13" ry="13" fill="#333"/><ellipse cx="130" cy="92" rx="13" ry="13" fill="#333"/><line x1="52" y1="65" x2="82" y2="78" stroke="#333" stroke-width="8" stroke-linecap="round"/><line x1="148" y1="65" x2="118" y2="78" stroke="#333" stroke-width="8" stroke-linecap="round"/><path d="M62,148 Q100,124 138,148" fill="none" stroke="#333" stroke-width="9" stroke-linecap="round"/></svg>`,
            miedo: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="white"/><circle cx="100" cy="106" r="84" fill="#ECEFF1" stroke="#78909C" stroke-width="5"/><ellipse cx="70" cy="88" rx="16" ry="19" fill="white" stroke="#333" stroke-width="3"/><ellipse cx="130" cy="88" rx="16" ry="19" fill="white" stroke="#333" stroke-width="3"/><ellipse cx="70" cy="90" rx="10" ry="12" fill="#333"/><ellipse cx="130" cy="90" rx="10" ry="12" fill="#333"/><ellipse cx="100" cy="148" rx="23" ry="17" fill="#333"/><ellipse cx="100" cy="145" rx="19" ry="14" fill="#8D1C1C"/><path d="M52,67 Q70,50 82,64" fill="none" stroke="#333" stroke-width="5" stroke-linecap="round"/><path d="M118,64 Q130,50 148,67" fill="none" stroke="#333" stroke-width="5" stroke-linecap="round"/></svg>`,
            mas: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="white"/><circle cx="100" cy="100" r="87" fill="#66BB6A" stroke="#2E7D32" stroke-width="5"/><rect x="38" y="86" width="124" height="28" rx="10" fill="white"/><rect x="86" y="38" width="28" height="124" rx="10" fill="white"/></svg>`,
            parar: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="white"/><path d="M88,168 L88,58 Q88,46 100,46 Q112,46 112,58 L112,100 L122,100 L122,70 Q122,57 133,57 Q143,57 143,70 L143,112 L152,112 L152,82 Q152,71 161,71 Q170,71 170,82 L170,132 Q170,178 118,178 L84,178 Q56,178 56,152 L56,102 L47,102 L47,80 Q47,66 60,66 Q74,66 74,80 L74,138 L88,138 Z" fill="#FFD54F" stroke="black" stroke-width="5"/></svg>`,
            casa: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="white"/><polygon points="100,18 172,80 28,80" fill="#EF5350" stroke="black" stroke-width="5"/><rect x="32" y="78" width="136" height="112" fill="#FFF9C4" stroke="black" stroke-width="5"/><rect x="78" y="128" width="44" height="62" rx="4" fill="#6D4C41" stroke="black" stroke-width="4"/><circle cx="115" cy="162" r="4" fill="gold"/><rect x="42" y="100" width="38" height="32" rx="4" fill="#B3E5FC" stroke="black" stroke-width="4"/><line x1="61" y1="100" x2="61" y2="132" stroke="black" stroke-width="2"/><line x1="42" y1="116" x2="80" y2="116" stroke="black" stroke-width="2"/><rect x="120" y="100" width="38" height="32" rx="4" fill="#B3E5FC" stroke="black" stroke-width="4"/><line x1="139" y1="100" x2="139" y2="132" stroke="black" stroke-width="2"/><line x1="120" y1="116" x2="158" y2="116" stroke="black" stroke-width="2"/></svg>`,
            dolor: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="white"/><circle cx="100" cy="100" r="84" fill="#FFF9C4" stroke="#F57F17" stroke-width="5"/><ellipse cx="72" cy="85" rx="12" ry="14" fill="#333"/><ellipse cx="128" cy="85" rx="12" ry="14" fill="#333"/><path d="M65,140 Q100,118 135,140" fill="none" stroke="#333" stroke-width="8" stroke-linecap="round"/><path d="M125,40 L135,62 L148,52 L138,75 L160,70" fill="none" stroke="#E53935" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M55,70 Q65,55 78,68" fill="none" stroke="#333" stroke-width="5" stroke-linecap="round"/><path d="M122,68 Q135,55 145,70" fill="none" stroke="#333" stroke-width="5" stroke-linecap="round"/></svg>`,
        };

        // ─────────────────────────────────────────────────────────────
        // DICCIONARIO BASE MASIVO — ~1.000 entradas con campo gramatica
        // Campos: palabras[], img, cat, gramatica, source, alternativas[]
        // ─────────────────────────────────────────────────────────────
        const diccionario = [

        // ══════════════════════════════════════════════════════
        // BLOQUE 1: COMUNICACIÓN BÁSICA CAA — Núcleo esencial
        // ══════════════════════════════════════════════════════
        { palabras:["si","sí","vale","de acuerdo","ok","correcto","afirmar"], img:this._svgs.si, cat:"otros", gramatica:"interjección", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"✅"},{source:"Sclera",img:"☑️"}] },
        { palabras:["no","negar","negativo","nunca","jamás","ni hablar"], img:this._svgs.no, cat:"otros", gramatica:"interjección", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"❌"},{source:"Sclera",img:"🚫"}] },
        { palabras:["quiero","querer","deseo","quise","quería"], img:this._svgs.querer, cat:"acciones", gramatica:"verbo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🥺"},{source:"Sclera",img:"💫"}] },
        { palabras:["no quiero","no querer","no deseo","no me gusta"], img:"💔", cat:"acciones", gramatica:"verbo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🙅"}] },
        { palabras:["ayuda","ayudar","socorro","auxilio","asistencia","apoyo"], img:this._svgs.ayuda, cat:"acciones", gramatica:"verbo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🤝"},{source:"Sclera",img:"🆘"}] },
        { palabras:["mas","más","otro","otra","de nuevo","otra vez","repetir"], img:this._svgs.mas, cat:"otros", gramatica:"adverbio", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"➕"}] },
        { palabras:["parar","para","alto","stop","detener","basta","ya suficiente"], img:this._svgs.parar, cat:"otros", gramatica:"verbo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🛑"},{source:"Sclera",img:"✋"}] },
        { palabras:["espera","esperar","aguardar","un momento","un momento por favor"], img:"⏳", cat:"otros", gramatica:"verbo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"⌛"}] },
        { palabras:["hola","buenos dias","buenas tardes","buenas","saludar"], img:"👋", cat:"personas", gramatica:"interjección", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🙋"}] },
        { palabras:["adios","adiós","hasta luego","hasta pronto","chao","despedirse"], img:"🚪", cat:"personas", gramatica:"interjección", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"👋"}] },
        { palabras:["gracias","muchas gracias","te lo agradezco","agradecido"], img:"🙏", cat:"personas", gramatica:"interjección", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"😊"}] },
        { palabras:["por favor","porfa","porfavor","please"], img:"🙏", cat:"personas", gramatica:"interjección", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🤲"}] },
        { palabras:["perdón","perdon","lo siento","disculpa","disculpe"], img:"😔", cat:"emociones", gramatica:"interjección", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🙇"}] },
        { palabras:["bien","muy bien","perfecto","genial","estupendo","excelente"], img:"👍", cat:"emociones", gramatica:"adjetivo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"⭐"}] },
        { palabras:["mal","muy mal","horrible","fatal","regular","más o menos"], img:"👎", cat:"emociones", gramatica:"adjetivo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"😞"}] },
        { palabras:["que","qué","¿qué?","qué es","qué pasa"], img:"❓", cat:"otros", gramatica:"pronombre", source:"ARASAAC" },
        { palabras:["donde","dónde","¿dónde?","dónde está"], img:"📍", cat:"otros", gramatica:"pronombre", source:"ARASAAC" },
        { palabras:["cuando","cuándo","¿cuándo?","qué hora","a qué hora"], img:"🕐", cat:"otros", gramatica:"pronombre", source:"ARASAAC" },
        { palabras:["quien","quién","¿quién?","quién es"], img:"👤", cat:"personas", gramatica:"pronombre", source:"ARASAAC" },
        { palabras:["como","cómo","¿cómo?","de qué manera"], img:"🤔", cat:"otros", gramatica:"pronombre", source:"ARASAAC" },
        { palabras:["cuanto","cuánto","¿cuánto?","cuántos","cuántas"], img:"🔢", cat:"otros", gramatica:"pronombre", source:"ARASAAC" },
        { palabras:["aqui","aquí","acá","en este lugar"], img:"📌", cat:"otros", gramatica:"adverbio", source:"ARASAAC" },
        { palabras:["alli","allí","allá","ahí","en ese lugar"], img:"👉", cat:"otros", gramatica:"adverbio", source:"ARASAAC" },
        { palabras:["tambien","también","igualmente","yo también"], img:"➕", cat:"otros", gramatica:"adverbio", source:"ARASAAC" },
        { palabras:["tampoco","yo tampoco","ni yo tampoco"], img:"➖", cat:"otros", gramatica:"adverbio", source:"ARASAAC" },
        { palabras:["mio","mío","mía","es mío","es mía","pertenece a mí"], img:"✋", cat:"otros", gramatica:"determinante", source:"ARASAAC" },
        { palabras:["tuyo","tuya","es tuyo","es tuya"], img:"👉", cat:"otros", gramatica:"determinante", source:"ARASAAC" },
        { palabras:["esto","este","esta","eso","ese","esa","estos","estas","esos","esas"], img:"☝️", cat:"otros", gramatica:"determinante", source:"ARASAAC" },
        { palabras:["atención","ojo","cuidado","fíjate","fijate","presta atención"], img:"⚠️", cat:"otros", gramatica:"otro", source:"ARASAAC" },
        { palabras:["favorito","favorita","me encanta","lo que más me gusta"], img:"⭐", cat:"otros", gramatica:"adjetivo", source:"ARASAAC" },

        // ══════════════════════════════════════════════════════
        // BLOQUE 2: PRONOMBRES PERSONALES
        // ══════════════════════════════════════════════════════
        { palabras:["yo","me","mi","conmigo"], img:this._svgs.yo, cat:"personas", gramatica:"pronombre", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🧑"},{source:"Sclera",img:"👤"}] },
        { palabras:["tu","tú","te","ti","contigo","usted"], img:this._svgs.tu, cat:"personas", gramatica:"pronombre", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🫵"},{source:"Sclera",img:"👤"}] },
        { palabras:["el","él","lo","le"], img:"👦", cat:"personas", gramatica:"pronombre", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🧒"}] },
        { palabras:["ella"], img:"👧", cat:"personas", gramatica:"pronombre", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"👩"}] },
        { palabras:["nosotros","nosotras","nos"], img:"👨‍👩‍👦", cat:"personas", gramatica:"pronombre", source:"ARASAAC" },
        { palabras:["vosotros","vosotras","os"], img:"👫", cat:"personas", gramatica:"pronombre", source:"ARASAAC" },
        { palabras:["ellos"], img:"👦👦", cat:"personas", gramatica:"pronombre", source:"ARASAAC" },
        { palabras:["ellas"], img:"👧👧", cat:"personas", gramatica:"pronombre", source:"ARASAAC" },
        { palabras:["ustedes"], img:"👥", cat:"personas", gramatica:"pronombre", source:"ARASAAC" },

        // ══════════════════════════════════════════════════════
        // BLOQUE 3: VERBOS FUNDAMENTALES CON FORMAS IRREGULARES
        // Se incluyen formas irregulares directamente en palabras[]
        // para que el buscador las encuentre sin reglas especiales
        // ══════════════════════════════════════════════════════
        { palabras:["ser","soy","eres","es","somos","sois","son","era","eras","eran","fue","fuiste","fuimos","fueron","sido","siendo"], img:"💫", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["estar","estoy","estás","está","estamos","estáis","están","estaba","estuvo","estado","estando"], img:"🧍", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["tener","tengo","tienes","tiene","tenemos","tenéis","tienen","tenía","tuvo","tenido","teniendo"], img:"🤲", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["ir","voy","vas","va","vamos","vais","van","iba","ibas","iban","fue","fui","ido","yendo"], img:"🚶", cat:"acciones", gramatica:"verbo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🏃"}] },
        { palabras:["venir","vengo","vienes","viene","venimos","vienen","venía","vino","vine","venido","viniendo"], img:"🫴", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["hacer","hago","haces","hace","hacemos","hacen","hacía","hizo","hice","hecho","haciendo"], img:"🛠️", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["poder","puedo","puedes","puede","podemos","pueden","podía","pudo","podido","pudiendo"], img:"💪", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["saber","sé","sabes","sabe","sabemos","saben","sabía","supo","sabido","sabiendo"], img:"🧠", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["decir","digo","dices","dice","decimos","dicen","decía","dijo","dicho","diciendo"], img:"💬", cat:"acciones", gramatica:"verbo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🗣️"}] },
        { palabras:["dar","doy","das","da","damos","dan","daba","dio","dado","dando"], img:"🎁", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["ver","veo","ves","ve","vemos","ven","veía","vio","visto","viendo"], img:"👁️", cat:"acciones", gramatica:"verbo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"👀"}] },
        { palabras:["gustar","gusta","gustan","gustaba","me gusta","te gusta","le gusta","nos gusta","les gusta"], img:"❤️", cat:"acciones", gramatica:"verbo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"👍"}] },
        { palabras:["necesitar","necesito","necesitas","necesita","necesitamos","necesitan","necesitaba"], img:"🆘", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["pedir","pido","pides","pide","pedimos","piden","pedía","pidió","pedido","pidiendo","solicitar"], img:"🙋", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["hablar","hablo","hablas","habla","hablamos","hablan","hablaba","habló","hablado","hablando"], img:"🗣️", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["pensar","pienso","piensas","piensa","pensamos","piensan","pensaba","pensado","pensando"], img:"🤔", cat:"acciones", gramatica:"verbo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"💭"}] },
        { palabras:["escuchar","escucho","escuchas","escucha","escuchamos","escuchan","escuchaba","escuchado","escuchando","oir","oigo","oyes","oye"], img:"🎧", cat:"acciones", gramatica:"verbo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"👂"}] },
        { palabras:["tocar","toco","tocas","toca","tocamos","tocan","tocaba","tocado","tocando","palpar","acariciar"], img:"🖐️", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["sentir","siento","sientes","siente","sentimos","sienten","sentía","sintió","sentido","sintiendo","sentirse","me siento"], img:"💗", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["entender","entiendo","entiendes","entiende","entendemos","entienden","entendía","entendido","entendiendo","comprender","comprendo"], img:"💡", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["recordar","recuerdo","recuerdas","recuerda","recordamos","recuerdan","recordaba","recordado","recordando","acordar","me acuerdo"], img:"🧠", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["olvidar","olvido","olvidas","olvida","olvidamos","olvidan","olvidaba","olvidado","olvidando","se me olvidó"], img:"🤷", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["amar","amo","amas","ama","amamos","aman","amaba","amado","amando","adorar","querer mucho"], img:"💖", cat:"acciones", gramatica:"verbo", source:"Plena Inclusión", alternativas:[{source:"ARASAAC",img:"❤️"}] },
        { palabras:["odiar","odio","odias","odia","odiamos","odian","odiaba","odiado"], img:"😠", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["llorar","lloro","lloras","llora","lloramos","lloran","lloraba","llorado","llorando","sollozar"], img:"😢", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["reir","río","ríes","ríe","reímos","ríen","reía","reído","riendo","sonreir","sonreír","carcajear"], img:"😄", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },

        // ══════════════════════════════════════════════════════
        // BLOQUE 4: VERBOS DE MOVIMIENTO Y FÍSICOS
        // ══════════════════════════════════════════════════════
        { palabras:["caminar","andar","pasear","caminata","paseo"], img:"🚶", cat:"acciones", gramatica:"verbo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"👣"}] },
        { palabras:["correr","carrera","trotar","sprint","corretear"], img:"🏃", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["saltar","brincar","botar","dar saltos","salto","saltito"], img:"🦘", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["nadar","chapotear","bucear","natación","natacion"], img:"🏊", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["bailar","danzar","baile","moverse al ritmo"], img:"🕺", cat:"acciones", gramatica:"verbo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"💃"}] },
        { palabras:["caer","caerse","tropezar","resbalar","caída","caida"], img:"🤕", cat:"acciones", gramatica:"verbo", source:"Plena Inclusión" },
        { palabras:["levantarse","ponerse de pie","alzarse","pararse"], img:"🧍", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["sentarse","sentado","tomar asiento"], img:"🪑", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["tumbarse","echarse","acostarse","tenderse","tumbado"], img:"🛌", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["volar","planear","volar en avión","vuelo"], img:"✈️", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["conducir","manejar","pilotar","al volante"], img:"🚗", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["tirar","lanzar","arrojar","echar"], img:"⚾", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["coger","agarrar","sostener","sujetar","tomar","atrapar"], img:"✊", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["empujar","empuje"], img:"🫸", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["jalar","tirar hacia si","arrastrar","halar"], img:"🫷", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["abrazar","abrazo","achuchar"], img:"🫂", cat:"acciones", gramatica:"verbo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🤗"}] },
        { palabras:["besar","dar un beso","besuquear","beso"], img:"💋", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["señalar","apuntar","indicar"], img:"☝️", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["abrir","destapar","abrir la puerta"], img:"📂", cat:"acciones", gramatica:"verbo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🔓"}] },
        { palabras:["cerrar","tapar","cerrar la puerta"], img:"📁", cat:"acciones", gramatica:"verbo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🔒"}] },
        { palabras:["subir","ascender","escalar","trepar","subir al coche"], img:"⬆️", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["bajar","descender","bajar del coche"], img:"⬇️", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["entrar","ingresar","pasar adentro","entrar al cole"], img:"➡️", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["salir","partir","irse","salir a la calle"], img:"🚪", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },

        // ══════════════════════════════════════════════════════
        // BLOQUE 5: VERBOS DE RUTINA DIARIA
        // ══════════════════════════════════════════════════════
        { palabras:["dormir","descansar","irse a la cama","ir a dormir"], img:this._svgs.dormir, cat:"acciones", gramatica:"verbo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🛌"},{source:"Sclera",img:"🌙"}] },
        { palabras:["despertar","despertarse","levantarse","madrugar"], img:"⏰", cat:"acciones", gramatica:"verbo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"☀️"}] },
        { palabras:["comer","almorzar","merendar","cenar","alimentarse","comer la comida","hora de comer"], img:this._svgs.comer, cat:"acciones", gramatica:"verbo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🍽️"},{source:"Sclera",img:"🍴"}] },
        { palabras:["desayunar","desayuno","tomar el desayuno"], img:"🥐", cat:"acciones", gramatica:"verbo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"☕"}] },
        { palabras:["beber","tomar","sorber","beber agua","beber leche"], img:this._svgs.beber, cat:"acciones", gramatica:"verbo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🥤"},{source:"Sclera",img:"🫗"}] },
        { palabras:["banar","bañar","ducharse","ducha","bañarse"], img:"🚿", cat:"acciones", gramatica:"verbo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🛁"}] },
        { palabras:["lavarse las manos","lavar manos","lavarse las manitas"], img:"🧼", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["lavarse los dientes","cepillarse los dientes","cepillar dientes"], img:"🪥", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["peinarse","peinar","cepillarse el pelo"], img:"💇", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["vestirse","ponerse la ropa","ponerse","vestir"], img:"👕", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["desvestirse","quitarse la ropa","quitar ropa","desnudarse"], img:"🩲", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["jugar","juego","entretenerse","divertirse"], img:"🧩", cat:"acciones", gramatica:"verbo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🎮"},{source:"Sclera",img:"🎲"}] },
        { palabras:["estudiar","hacer deberes","hacer los deberes","hacer tarea","repasar"], img:"📚", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["ir al colegio","ir al cole","ir a la escuela","ir al instituto"], img:"🏫", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["ver la television","ver la tele","ver television","mirar la tele"], img:"📺", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["cocinar","guisar","preparar comida","hacer la comida"], img:"👨‍🍳", cat:"acciones", gramatica:"verbo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🍳"}] },
        { palabras:["limpiar","fregar","asear","hacer la limpieza"], img:"🧹", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["comprar","ir de compras","ir a la tienda","hacer la compra"], img:"🛍️", cat:"acciones", gramatica:"verbo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🛒"}] },
        { palabras:["trabajar","currar","ir al trabajo","laborar"], img:"💼", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["llegar","llegar a casa","llegar al cole","volver","regresar"], img:"🏁", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["pagar","abonar","pagar en caja","pago"], img:"💳", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["llamar","llamar por telefono","telefonear","llamada","videollamada"], img:"📞", cat:"acciones", gramatica:"verbo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"📱"}] },

        // ══════════════════════════════════════════════════════
        // BLOQUE 6: VERBOS DE COMUNICACIÓN, CREACIÓN Y COGNITIVOS
        // ══════════════════════════════════════════════════════
        { palabras:["leer","lectura","leer un libro","leer el cuento"], img:"📖", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["escribir","redactar","apuntar","escritura"], img:"✍️", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["dibujar","dibujo","bosquejar","hacer un dibujo"], img:"✏️", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["pintar","colorear","pintura","poner colores"], img:"🎨", cat:"acciones", gramatica:"verbo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🖌️"}] },
        { palabras:["cantar","cantante","entonar","cancion","canto"], img:"🎤", cat:"acciones", gramatica:"verbo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🎵"}] },
        { palabras:["escuchar musica","oir musica","poner musica","musica"], img:"🎵", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["buscar","rastrear","indagar","buscar en internet"], img:"🔎", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["cortar","tijeretear","seccionar","recortar"], img:"✂️", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["pegar","adherir","unir con pegamento"], img:"🖊️", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["encender","prender","activar","encender la luz"], img:"💡", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["apagar","desactivar","apagar la luz"], img:"🔌", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["compartir","repartir","compartir con amigos"], img:"🤝", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["ganar","vencer","triunfar","ganar el juego","campeón"], img:"🥇", cat:"acciones", gramatica:"verbo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🏆"}] },
        { palabras:["perder","perder el juego","derrota"], img:"❌", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["empezar","comenzar","iniciar","principiar"], img:"🏁", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["terminar","acabar","finalizar","concluir"], img:"🔚", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },

        // ══════════════════════════════════════════════════════
        // BLOQUE 7: SALUD Y BIENESTAR
        // ══════════════════════════════════════════════════════
        { palabras:["doler","me duele","dolor","tener dolor","sentir dolor","duele","me hace daño"], img:this._svgs.dolor, cat:"acciones", gramatica:"verbo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🤕"}] },
        { palabras:["enfermar","estar enfermo","tener fiebre","resfriado","catarro","estar malo"], img:"🤒", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["curar","sanar","sentirse mejor","recuperarse","medicina"], img:"🩹", cat:"acciones", gramatica:"verbo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"💊"}] },
        { palabras:["vomitar","nauseas","estar mareado","mareo"], img:"🤮", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["toser","tos","tener tos","me duele la garganta"], img:"🤧", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["respirar","inspirar","exhalar","coger aire"], img:"🫁", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["rascarse","picar","picor","me pica"], img:"😖", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["ir al bano","ir al baño","ir al servicio","hacer pis","hacer pipi","hacer caca","ir al wc","quiero ir al baño"], img:this._svgs.bano, cat:"acciones", gramatica:"verbo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🚽"}] },

        // ══════════════════════════════════════════════════════
        // BLOQUE 8: CUERPO HUMANO
        // ══════════════════════════════════════════════════════
        { palabras:["cabeza","cráneo","craneo"], img:"🗣️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["cara","rostro","carita"], img:"😐", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["ojo","ojos","vista","visión"], img:"👁️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["nariz","moco","mocos"], img:"👃", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["boca","labios"], img:"👄", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["diente","dientes","muela","muelas"], img:"🦷", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["oreja","orejas","oído","oido"], img:"👂", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["pelo","cabello","melena"], img:"💇", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["cuello","garganta"], img:"🧣", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["brazo","brazos","antebrazo"], img:"💪", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["mano","manos","palma"], img:"🖐️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["dedo","dedos","pulgar"], img:"☝️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["barriga","tripa","abdomen","estomago","estómago"], img:"🤰", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["pecho","torso","pectoral"], img:"🩺", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["espalda","columna"], img:"🔙", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["corazon","corazón","latido"], img:"❤️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["pulmón","pulmones","pulmon"], img:"🫁", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["pierna","piernas","muslo"], img:"🦵", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["rodilla","rodillas"], img:"🦵", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["pie","pies","planta del pie"], img:"🦶", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["sangre","herida","corte","rasguño"], img:"🩸", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["cerebro","seso"], img:"🧠", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["hueso","huesos","esqueleto"], img:"🦴", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },

        // ══════════════════════════════════════════════════════
        // BLOQUE 9: FAMILIA Y PERSONAS
        // ══════════════════════════════════════════════════════
        { palabras:["mamá","mama","madre","mami","ma"], img:"👩", cat:"personas", gramatica:"sustantivo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"👩‍❤️‍👦"}] },
        { palabras:["papá","papa","padre","papi","pa"], img:"👨", cat:"personas", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["hermano","hermanos"], img:"👦", cat:"personas", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["hermana","hermanas"], img:"👧", cat:"personas", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["abuelo","abuelito","abuelos"], img:"👴", cat:"personas", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["abuela","abuelita","abuelas"], img:"👵", cat:"personas", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["tio","tío","tíos","tios"], img:"👨", cat:"personas", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["tia","tía","tías","tias"], img:"👩", cat:"personas", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["primo","primos","prima","primas"], img:"🧑", cat:"personas", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["bebe","bebé","bebés","lactante","recién nacido"], img:"👶", cat:"personas", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["niño","niños","chico","chicos","chaval"], img:"👦", cat:"personas", gramatica:"sustantivo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🧒"}] },
        { palabras:["niña","niñas","chica","chicas","chavala"], img:"👧", cat:"personas", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["hombre","hombres","varón","señor","adulto"], img:"👨", cat:"personas", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["mujer","mujeres","señora","señorita","dama"], img:"👩", cat:"personas", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["amigo","amigos","compañero","compañeros"], img:"🤝", cat:"personas", gramatica:"sustantivo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🧑‍🤝‍🧑"}] },
        { palabras:["amiga","amigas","compañera","compañeras"], img:"🤝", cat:"personas", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["familia","mi familia"], img:"👨‍👩‍👧‍👦", cat:"personas", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["maestra","maestro","profesor","profesora","docente","profe","seño","tutor"], img:"👩‍🏫", cat:"personas", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["médico","medico","médica","doctor","doctora"], img:"👨‍⚕️", cat:"personas", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["enfermero","enfermera"], img:"👩‍⚕️", cat:"personas", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["policia","policías","agente","guardia"], img:"👮", cat:"personas", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["bombero","bomberos","bombera"], img:"👨‍🚒", cat:"personas", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["cocinero","cocinera","chef"], img:"👨‍🍳", cat:"personas", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["logopeda","terapeuta","logoterapeuta"], img:"👩‍⚕️", cat:"personas", gramatica:"sustantivo", source:"ARASAAC" },

        // ══════════════════════════════════════════════════════
        // BLOQUE 10: ANIMALES
        // ══════════════════════════════════════════════════════
        { palabras:["perro","can","cachorro","perrito","guau","perros"], img:"🐕", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🐩"},{source:"Sclera",img:"🦮"}] },
        { palabras:["gato","gatos","minino","gatito","michi","miau"], img:"🐈", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🐱"}] },
        { palabras:["pájaro","pajaro","pájaros","ave","pajarito"], img:"🐦", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["pez","peces","pecera"], img:"🐠", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["conejo","conejos","conejito"], img:"🐰", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["hamster","hámster"], img:"🐹", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["tortuga","tortugas"], img:"🐢", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["vaca","vacas","ternera","res"], img:"🐄", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["caballo","caballos","yegua","potro"], img:"🐴", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["cerdo","cerdos","puerco","cochinillo"], img:"🐷", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["oveja","ovejas","cordero","borrego"], img:"🐑", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["gallina","gallinas","pollo de granja","gallinero"], img:"🐓", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["pato","patos","patito"], img:"🦆", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["cabra","cabras","chivo"], img:"🐐", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["burro","burros","asno","borrico"], img:"🫏", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["leon","león","leones","leona","sabana"], img:"🦁", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["tigre","tigres","tigresa"], img:"🐯", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["oso","osos","osito","osa"], img:"🐻", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🧸"}] },
        { palabras:["elefante","elefantes"], img:"🐘", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["jirafa","jirafas"], img:"🦒", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["mono","monos","simio","primates"], img:"🐒", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["serpiente","serpientes","culebra","víbora","vibora"], img:"🐍", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["rana","ranas","sapo"], img:"🐸", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["pingüino","pingüinos","pinguino","pinguinos"], img:"🐧", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["delfín","delfines","delfin"], img:"🐬", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["ballena","ballenas"], img:"🐳", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["tiburon","tiburón","tiburones"], img:"🦈", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["abeja","abejas","colmena","miel insecto"], img:"🐝", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["mariposa","mariposas"], img:"🦋", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["araña","arañas","telaraña"], img:"🕷️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["loro","loros","papagayo","cotorra"], img:"🦜", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["búho","buho","lechuza","mochuelo"], img:"🦉", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["dinosaurio","dinosaurios","dino"], img:"🦕", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },

        // ══════════════════════════════════════════════════════
        // BLOQUE 11: ALIMENTOS — FRUTAS
        // ══════════════════════════════════════════════════════
        { palabras:["manzana","manzanas","apple"], img:"🍎", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🍏"}] },
        { palabras:["pera","peras"], img:"🍐", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["naranja","naranjas","mandarina","mandarinas","clementina"], img:"🍊", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["limon","limón","limones","lima"], img:"🍋", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["plátano","platano","plátanos","platanos","banana","bananas"], img:"🍌", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["sandia","sandía","melón","melon"], img:"🍉", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["uva","uvas","racimo de uvas"], img:"🍇", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["fresa","fresas","fresón","fresones","frutilla"], img:"🍓", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["cereza","cerezas"], img:"🍒", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["melocotón","melocoton","durazno","duraznos"], img:"🍑", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["mango","mangos"], img:"🥭", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["piña","piñas","ananas"], img:"🍍", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["kiwi","kiwis"], img:"🥝", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["aguacate","aguacates","palta","paltas"], img:"🥑", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["arándano","arandano","moras","mora"], img:"🫐", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },

        // ══════════════════════════════════════════════════════
        // BLOQUE 12: ALIMENTOS — VERDURAS Y HORTALIZAS
        // ══════════════════════════════════════════════════════
        { palabras:["zanahoria","zanahorias"], img:"🥕", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["tomate","tomates"], img:"🍅", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["lechuga","lechugas","ensalada"], img:"🥬", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["pepino","pepinos","pepinillo"], img:"🥒", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["pimiento","pimientos","pimentón","pimenton"], img:"🫑", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["cebolla","cebollas"], img:"🧅", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["ajo","ajos"], img:"🧄", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["patata","patatas","papa","papas"], img:"🥔", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["brócoli","brocoli","brécol"], img:"🥦", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["maíz","maiz","mazorca","elote","choclo"], img:"🌽", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["calabaza","calabazas","zapallo"], img:"🎃", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["champiñon","champiñones","seta","setas","hongo","hongos"], img:"🍄", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["guisante","guisantes","arveja","arvejas"], img:"🟢", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },

        // ══════════════════════════════════════════════════════
        // BLOQUE 13: ALIMENTOS — PROTEÍNAS, LÁCTEOS Y COMIDAS
        // ══════════════════════════════════════════════════════
        { palabras:["carne","carnes","filete","bistec","chuleta"], img:"🥩", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["pollo","pechuga","muslo de pollo","pollo asado"], img:"🍗", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["jamon","jamón","jamón serrano","jamón de york","embutido"], img:"🥓", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["pescado","merluza","salmón","salmon","bacalao","atún","atun"], img:"🐟", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["huevo","huevos","huevo frito","huevo cocido","tortilla"], img:"🥚", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🍳"}] },
        { palabras:["leche","vasito de leche","brik de leche"], img:"🥛", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["queso","quesos","quesito"], img:"🧀", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["yogur","yogurt","yogures"], img:"🥛", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["mantequilla","manteca"], img:"🧈", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["salchicha","salchichas","frankfurt","hot dog"], img:"🌭", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["pizza","pizzas"], img:"🍕", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["hamburguesa","hamburguesas","burger"], img:"🍔", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["patatas fritas","papas fritas","fritas"], img:"🍟", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["arroz","arroz blanco","arroz con leche"], img:"🍚", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["pasta","macarrones","espaguetis","fideos","tallarines"], img:"🍝", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["sopa","caldo","consomé","puré","crema de verduras"], img:"🍲", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["bocadillo","bocata","sandwich","sándwich"], img:"🥪", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["pan","barra de pan","rebanada","tostada","baguette"], img:"🍞", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🥖"}] },
        { palabras:["tarta","pastel","torta","bizcocho","cake"], img:"🎂", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🍰"}] },
        { palabras:["galleta","galletas","cookie"], img:"🍪", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["chocolate","chocolates","cacao","tableta de chocolate"], img:"🍫", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["helado","polo","helados","ice cream"], img:"🍦", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🍨"}] },
        { palabras:["caramelo","caramelos","chuche","chucherías","gominola","dulce"], img:"🍬", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["cereales","copos","granola","muesli"], img:"🥣", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },

        // Bebidas
        { palabras:["agua","agua fría","botella de agua","vasito de agua"], img:"💧", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🥤"}] },
        { palabras:["zumo","jugo","zumo de naranja","zumo de manzana","néctar"], img:"🥤", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["batido","batidos","smoothie","milkshake"], img:"🥛", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["refresco","cola","limonada","gaseosa"], img:"🥤", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["te","té","infusión","manzanilla","tila"], img:"☕", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["cafe","café","colacao","cola cao","cacao","chocolate caliente"], img:"☕", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC" },

        // ══════════════════════════════════════════════════════
        // BLOQUE 14: ROPA Y ACCESORIOS
        // ══════════════════════════════════════════════════════
        { palabras:["camiseta","camisetas","playera","polo"], img:"👕", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["camisa","blusas","blusa","camisas"], img:"👔", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["pantalon","pantalón","pantalones","vaqueros","jeans"], img:"👖", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["falda","faldas","minifalda"], img:"👗", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["vestido","vestidos","traje de fiesta"], img:"👗", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["abrigo","abrigos","chaqueta","chaquetas","anorak","cazadora"], img:"🧥", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["jersey","jerseys","suéter","sudadera","sudaderas"], img:"🧤", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["zapatos","zapato","zapatillas","tenis","sneakers"], img:"👟", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["botas","bota","botines"], img:"👢", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["calcetines","calcetín","medias"], img:"🧦", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["ropa interior","calzoncillo","braga","bragas"], img:"🩲", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["pijama","pijamas","bata","ropa de dormir"], img:"🩳", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["gorra","gorras","sombrero","gorro"], img:"🧢", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["bufanda","bufandas","pañuelo","fular"], img:"🧣", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["guantes","guante","manopla"], img:"🧤", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["mochila","mochilas","bolsa","bolso","cartera"], img:"🎒", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["gafas","lentes","lentillas","anteojos"], img:"👓", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },

        // ══════════════════════════════════════════════════════
        // BLOQUE 15: HOGAR Y MUEBLES
        // ══════════════════════════════════════════════════════
        { palabras:["casa","hogar","vivienda","piso","chalet","apartamento"], img:this._svgs.casa, cat:"lugares", gramatica:"sustantivo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🏘️"},{source:"Sclera",img:"🏠"}] },
        { palabras:["habitación","habitacion","dormitorio","cuarto","chambre"], img:"🛏️", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["cocina","cuarto de cocina"], img:"🍳", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["baño","cuarto de baño","aseo","lavabo","servicio","wc"], img:"🚿", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["salon","salón","sala de estar","living"], img:"🛋️", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["jardin","jardín","patio","terraza"], img:"🌿", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["cama","camita","colchon","colchón"], img:"🛏️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["almohada","almohadas","cojin","cojín"], img:"💤", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["manta","mantas","edredon","edredón","sabana","sábana"], img:"🛌", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["mesa","mesas","mesita"], img:"🪑", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["silla","sillas","asiento"], img:"🪑", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["sofa","sofá","sillón","sillon"], img:"🛋️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["armario","armarios","guardarropa","ropero"], img:"🚪", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["puerta","puertas","porton","portón"], img:"🚪", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["ventana","ventanas","cristal"], img:"🪟", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["luz","bombilla","lámpara","lampara","foco"], img:"💡", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["television","televisión","tele","pantalla","tv"], img:"📺", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["ordenador","computadora","laptop","portatil","portátil","pc"], img:"💻", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["movil","móvil","celular","teléfono","telefono","smartphone"], img:"📱", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["tablet","tableta","ipad"], img:"📱", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["nevera","frigorifico","frigorífico","refrigerador"], img:"🧊", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["lavadora","lavaropa"], img:"🔄", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["horno","hornos","microondas","micro"], img:"♨️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["jabón","jabon","gel de ducha","champú","champu"], img:"🧴", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["papel higienico","papel higiénico","rollo de papel"], img:"🧻", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["toalla","toallas","paño"], img:"🏖️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["inodoro","retrete","taza del baño","váter","vater"], img:"🚽", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["bañera","bañeras","tina","tina de baño"], img:"🛁", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },

        // ══════════════════════════════════════════════════════
        // BLOQUE 16: ÚTILES ESCOLARES Y JUGUETES
        // ══════════════════════════════════════════════════════
        { palabras:["lapiz","lápiz","lápices","lapicero"], img:"✏️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["boligrafo","bolígrafo","boli","bolígrafos","pluma"], img:"🖊️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["cuaderno","cuadernos","libreta","libretas"], img:"📓", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["libro","libros","libro de texto"], img:"📚", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["tijeras","tijera"], img:"✂️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["goma","goma de borrar","borrador"], img:"🔲", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["regla","reglas"], img:"📏", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["pinturas","ceras","rotuladores","rotulador"], img:"🎨", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["estuche","cartuchera","plumier"], img:"🎒", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["pizarra","pizarras","encerado","tablero"], img:"🪣", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["folio","papel","hoja","hojas","cartulina"], img:"📄", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["calculadora","calculadoras"], img:"🧮", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["mapa","mapas","atlas","globo terraqueo","globo terráqueo"], img:"🗺️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["pelota","pelotas","balón","balon","bola"], img:"⚽", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🏀"}] },
        { palabras:["muñeca","muñecas","barbie","muñequita"], img:"👧", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["peluche","peluches","osito de peluche"], img:"🧸", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["puzzle","rompecabezas","puzle"], img:"🧩", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["videojuego","videojuegos","consola","videoconsola","play","nintendo"], img:"🎮", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["bicicleta","bici","bicis","triciclo"], img:"🚲", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["columpio","columpios","tobogán","tobogan"], img:"🛝", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["globo","globos","globos de colores"], img:"🎈", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },

        // ══════════════════════════════════════════════════════
        // BLOQUE 17: TRANSPORTES
        // ══════════════════════════════════════════════════════
        { palabras:["coche","carro","auto","automóvil","vehículo"], img:"🚗", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🚙"}] },
        { palabras:["autobús","autobus","bus","buseta","guagua","micro"], img:"🚌", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["metro","subway","subte","tren subterráneo"], img:"🚇", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["tren","trenes","ferrocarril","vagón"], img:"🚆", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["avion","avión","aeroplano","vuelo"], img:"✈️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["barco","barcos","barca","buque","ferri","ferry"], img:"⛵", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["moto","motocicleta","motocicletas"], img:"🏍️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["taxi","taxis"], img:"🚕", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["ambulancia","emergencias"], img:"🚑", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["coche de policia","carro policial"], img:"🚓", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["camion","camión","furgoneta","van"], img:"🚛", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["patinete","patines","patín","escúter"], img:"🛴", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },

        // ══════════════════════════════════════════════════════
        // BLOQUE 18: NATURALEZA Y CLIMA
        // ══════════════════════════════════════════════════════
        { palabras:["sol","soleado","hace sol","día soleado"], img:"☀️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🌞"}] },
        { palabras:["luna","luna llena","luna menguante","astro nocturno"], img:"🌙", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["estrella","estrellas"], img:"⭐", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["nube","nubes","nublado","cielo nublado"], img:"☁️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["lluvia","lluvioso","llueve","llovizna","chubasco"], img:"🌧️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🌂"}] },
        { palabras:["nieve","nevado","nieva","nevando","copo de nieve"], img:"❄️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"⛄"}] },
        { palabras:["viento","hace viento","ventoso","brisa"], img:"💨", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["tormenta","truenos","rayos","relámpago","relampago"], img:"⛈️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["arcoiris","arco iris","rainbow","arcoíris"], img:"🌈", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["árbol","arbol","árboles","arboles","pino","roble"], img:"🌳", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🌲"}] },
        { palabras:["flor","flores","rosa","tulipán","margarita","girasol"], img:"🌸", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🌺"}] },
        { palabras:["hierba","pasto","césped","hoja","hojas"], img:"🌿", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["mar","océano","oceano","playa","ola","olas"], img:"🌊", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🏖️"}] },
        { palabras:["río","rio","lago","laguna"], img:"🏞️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["montaña","montañas","cerro","sierra","monte"], img:"⛰️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["fuego","llama","hoguera","incendio"], img:"🔥", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["tierra","planeta","mundo","globo terráqueo"], img:"🌍", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC" },

        // ══════════════════════════════════════════════════════
        // BLOQUE 19: LUGARES Y ESPACIOS
        // ══════════════════════════════════════════════════════
        { palabras:["colegio","escuela","cole","instituto","guardería","preescolar"], img:"🏫", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["parque","plaza","zona verde","parque de juegos"], img:"🌳", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["hospital","clinica","clínica","centro medico","centro de salud"], img:"🏥", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["tienda","supermercado","mercado","comercio"], img:"🏪", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🛒"}] },
        { palabras:["playa","costa","orilla del mar"], img:"🏖️", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["piscina","piscinas"], img:"🏊", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["ciudad","pueblo","municipio","localidad"], img:"🏙️", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["calle","calles","avenida","carretera","camino"], img:"🛣️", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["biblioteca","librería","libreria"], img:"📚", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["farmacia","farmacias"], img:"💊", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["restaurante","bar","cafetería","cafeteria","comedor"], img:"🍴", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["zoo","zoologico","zoológico","parque zoológico"], img:"🦁", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["cine","cinema","teatro","sala de cine"], img:"🎬", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["aeropuerto","terminal aérea"], img:"✈️", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["parque de atracciones","feria","funfair"], img:"🎡", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["polideportivo","gimnasio","gym","instalaciones deportivas"], img:"🏋️", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["museo","exposición","galería"], img:"🏛️", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["trabajo","oficina","empresa","despacho"], img:"🏢", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC" },

        // ══════════════════════════════════════════════════════
        // BLOQUE 20: EMOCIONES, ESTADOS Y SENTIMIENTOS
        // ══════════════════════════════════════════════════════
        { palabras:["feliz","contento","alegre","satisfecho","dichoso","me siento feliz","estar feliz"], img:this._svgs.feliz, cat:"emociones", gramatica:"adjetivo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"😊"},{source:"Sclera",img:"😃"}] },
        { palabras:["triste","entristecido","apenado","melancólico","me siento triste","estar triste"], img:this._svgs.triste, cat:"emociones", gramatica:"adjetivo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"😢"},{source:"Sclera",img:"😞"}] },
        { palabras:["enfadado","enojado","rabioso","furioso","con rabia","estar enfadado"], img:this._svgs.enfadado, cat:"emociones", gramatica:"adjetivo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"😡"},{source:"Sclera",img:"🤬"}] },
        { palabras:["asustado","con miedo","tener miedo","miedo","da miedo","estar asustado"], img:this._svgs.miedo, cat:"emociones", gramatica:"adjetivo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"😱"},{source:"Sclera",img:"😨"}] },
        { palabras:["sorprendido","asombrado","sorpresa","increíble"], img:"😲", cat:"emociones", gramatica:"adjetivo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🤩"}] },
        { palabras:["nervioso","ansioso","preocupado","estresado","intranquilo"], img:"😰", cat:"emociones", gramatica:"adjetivo", source:"ARASAAC" },
        { palabras:["cansado","agotado","fatigado","exhausto","sin energia"], img:"😫", cat:"emociones", gramatica:"adjetivo", source:"ARASAAC" },
        { palabras:["aburrido","hastiado","cansado de algo"], img:"🥱", cat:"emociones", gramatica:"adjetivo", source:"ARASAAC" },
        { palabras:["hambre","tener hambre","hambrienta","hambriento","estoy con hambre"], img:"🍴", cat:"emociones", gramatica:"sustantivo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🤤"}] },
        { palabras:["sed","tener sed","sedienta","sediento","estoy con sed"], img:"💧", cat:"emociones", gramatica:"sustantivo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🥵"}] },
        { palabras:["dolor","me duele","tengo dolor","sentir dolor","me hace daño"], img:this._svgs.dolor, cat:"emociones", gramatica:"sustantivo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"🤕"}] },
        { palabras:["calor","hace calor","tengo calor","bochorno"], img:"🥵", cat:"emociones", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["frio","frío","hace frío","tengo frío"], img:"🥶", cat:"emociones", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["orgulloso","orgullosa","me siento orgulloso","orgullo"], img:"🦁", cat:"emociones", gramatica:"adjetivo", source:"ARASAAC" },
        { palabras:["vergüenza","vergonzoso","verguenza","avergonzado","me da vergüenza"], img:"😳", cat:"emociones", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["tranquilo","tranquila","calmado","relajado","sereno"], img:"😌", cat:"emociones", gramatica:"adjetivo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"☮️"}] },
        { palabras:["emocionado","emocionada","entusiasmado"], img:"🤩", cat:"emociones", gramatica:"adjetivo", source:"ARASAAC" },
        { palabras:["solo","sola","solitario","soledad","me siento solo"], img:"😔", cat:"emociones", gramatica:"adjetivo", source:"ARASAAC" },
        { palabras:["confundido","confusa","no entiendo","perdido","desorientado"], img:"😕", cat:"emociones", gramatica:"adjetivo", source:"ARASAAC" },
        { palabras:["enfermo","enferma","malo","mala","no me encuentro bien","me siento mal"], img:"🤒", cat:"emociones", gramatica:"adjetivo", source:"ARASAAC" },
        { palabras:["sano","sana","bien de salud","me encuentro bien","en forma"], img:"💪", cat:"emociones", gramatica:"adjetivo", source:"ARASAAC" },

        // ══════════════════════════════════════════════════════
        // BLOQUE 21: ADJETIVOS DESCRIPTIVOS
        // ══════════════════════════════════════════════════════
        { palabras:["grande","grandes","enorme","gigante","muy grande"], img:"🐘", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC" },
        { palabras:["pequeño","pequeña","chiquito","diminuto","mini"], img:"🐭", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC" },
        { palabras:["largo","larga","alargado","extendido"], img:"📏", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC" },
        { palabras:["corto","corta","breve","reducido"], img:"📐", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC" },
        { palabras:["alto","alta","elevado","talludo"], img:"🏔️", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC" },
        { palabras:["bajo","baja","pequeño de altura"], img:"🌱", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC" },
        { palabras:["gordo","gorda","grueso","gruesa","rellenito"], img:"🐷", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC" },
        { palabras:["delgado","delgada","flaco","flaca","esbelto"], img:"🌿", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC" },
        { palabras:["bonito","bonita","hermoso","hermosa","lindo","guapo","precioso"], img:"💖", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC", alternativas:[{source:"Mulberry",img:"✨"}] },
        { palabras:["feo","fea","horrible","desagradable"], img:"🤢", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC" },
        { palabras:["nuevo","nueva","nuevito","reciente","flamante"], img:"🆕", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC" },
        { palabras:["viejo","vieja","antiguo","antigua","usado","usada"], img:"📦", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC" },
        { palabras:["limpio","limpia","aseado","pulcro","impecable"], img:"✨", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC" },
        { palabras:["sucio","sucia","manchado","mugriento"], img:"🗑️", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC" },
        { palabras:["duro","dura","sólido","rígido"], img:"🪨", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC" },
        { palabras:["blando","blanda","suave","flexible","esponjoso"], img:"🧸", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC" },
        { palabras:["caliente","calentito","ardiente","hirviendo"], img:"🔥", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC" },
        { palabras:["helado","helada","fresco","fresca","frígido"], img:"🧊", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC" },
        { palabras:["rápido","rapido","veloz","rápida","deprisa"], img:"⚡", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC" },
        { palabras:["lento","lenta","despacio","pausado"], img:"🐢", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC" },
        { palabras:["lleno","llena","completo","sin espacio"], img:"🫃", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC" },
        { palabras:["vacio","vacío","vacía","sin nada"], img:"🫙", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC" },
        { palabras:["abierto","abierta","destapado"], img:"📂", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC" },
        { palabras:["cerrado","cerrada","tapado"], img:"📁", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC" },

        // ══════════════════════════════════════════════════════
        // BLOQUE 22: COLORES
        // ══════════════════════════════════════════════════════
        { palabras:["rojo","roja","rojos","rojas","color rojo","rojizo"], img:"🔴", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC" },
        { palabras:["azul","azules","color azul","azulado"], img:"🔵", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC" },
        { palabras:["verde","verdes","color verde","verdoso"], img:"🟢", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC" },
        { palabras:["amarillo","amarilla","amarillos","color amarillo"], img:"🟡", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC" },
        { palabras:["naranja","anaranjado","color naranja"], img:"🟠", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC" },
        { palabras:["morado","morada","púrpura","purpura","violeta","lila"], img:"🟣", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC" },
        { palabras:["rosa","rosado","rosada","color rosa","fucsia"], img:"🩷", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC" },
        { palabras:["negro","negra","negros","color negro","oscuro"], img:"⬛", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC" },
        { palabras:["blanco","blanca","blancos","color blanco","pálido"], img:"⬜", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC" },
        { palabras:["gris","grises","color gris","plateado gris"], img:"🩶", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC" },
        { palabras:["marron","marrón","cafe","café","color marrón","castaño"], img:"🟫", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC" },
        { palabras:["dorado","dorada","color dorado","oro"], img:"🌟", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC" },
        { palabras:["turquesa","aguamarina","celeste","cyan"], img:"🩵", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC" },
        { palabras:["multicolor","arcoiris de colores","colorido","de colores"], img:"🌈", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC" },

        // ══════════════════════════════════════════════════════
        // BLOQUE 23: NÚMEROS Y CANTIDADES
        // ══════════════════════════════════════════════════════
        { palabras:["cero","ninguno","ninguna","0"], img:"0️⃣", cat:"objetos", gramatica:"numeral", source:"ARASAAC" },
        { palabras:["uno","una","1","primero","primera","un","una vez"], img:"1️⃣", cat:"objetos", gramatica:"numeral", source:"ARASAAC" },
        { palabras:["dos","2","segundo","segunda","pareja","doble"], img:"2️⃣", cat:"objetos", gramatica:"numeral", source:"ARASAAC" },
        { palabras:["tres","3","tercero","tercera","triple"], img:"3️⃣", cat:"objetos", gramatica:"numeral", source:"ARASAAC" },
        { palabras:["cuatro","4","cuarto","cuarta"], img:"4️⃣", cat:"objetos", gramatica:"numeral", source:"ARASAAC" },
        { palabras:["cinco","5","quinto","quinta"], img:"5️⃣", cat:"objetos", gramatica:"numeral", source:"ARASAAC" },
        { palabras:["seis","6","sexto","sexta"], img:"6️⃣", cat:"objetos", gramatica:"numeral", source:"ARASAAC" },
        { palabras:["siete","7","séptimo","septimo"], img:"7️⃣", cat:"objetos", gramatica:"numeral", source:"ARASAAC" },
        { palabras:["ocho","8","octavo","octava"], img:"8️⃣", cat:"objetos", gramatica:"numeral", source:"ARASAAC" },
        { palabras:["nueve","9","noveno","novena"], img:"9️⃣", cat:"objetos", gramatica:"numeral", source:"ARASAAC" },
        { palabras:["diez","10","décimo","decimo","diez veces"], img:"🔟", cat:"objetos", gramatica:"numeral", source:"ARASAAC" },
        { palabras:["veinte","20"], img:"2️⃣0️⃣", cat:"objetos", gramatica:"numeral", source:"ARASAAC" },
        { palabras:["cien","100","ciento"], img:"💯", cat:"objetos", gramatica:"numeral", source:"ARASAAC" },
        { palabras:["mucho","mucha","muchos","muchas","bastante","demasiado"], img:"🔷", cat:"objetos", gramatica:"determinante", source:"ARASAAC" },
        { palabras:["poco","poca","pocos","pocas","un poco","poquito"], img:"🔸", cat:"objetos", gramatica:"determinante", source:"ARASAAC" },
        { palabras:["todo","toda","todos","todas","todo entero"], img:"🌐", cat:"objetos", gramatica:"determinante", source:"ARASAAC" },
        { palabras:["algunos","algunas","algún","alguno","alguna"], img:"🔢", cat:"objetos", gramatica:"determinante", source:"ARASAAC" },
        { palabras:["primero","primer","primera","al principio"], img:"🥇", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC" },
        { palabras:["ultimo","último","última","al final","lo último"], img:"🔚", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC" },
        { palabras:["siguiente","próximo","proxima","el que sigue"], img:"➡️", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC" },

        // ══════════════════════════════════════════════════════
        // BLOQUE 24: TIEMPO Y RUTINAS
        // ══════════════════════════════════════════════════════
        { palabras:["hoy","este dia","en el dia de hoy"], img:"📅", cat:"otros", gramatica:"adverbio", source:"ARASAAC" },
        { palabras:["mañana","el dia de mañana","pasado mañana","al dia siguiente"], img:"🌅", cat:"otros", gramatica:"adverbio", source:"ARASAAC" },
        { palabras:["ayer","el dia de ayer","anteayer"], img:"⬅️", cat:"otros", gramatica:"adverbio", source:"ARASAAC" },
        { palabras:["ahora","en este momento","ya mismo","ahorita","enseguida"], img:"⏰", cat:"otros", gramatica:"adverbio", source:"ARASAAC" },
        { palabras:["antes","anteriormente","primero en el tiempo","hace un momento"], img:"⬅️", cat:"otros", gramatica:"adverbio", source:"ARASAAC" },
        { palabras:["después","luego","mas tarde","más tarde","a continuación"], img:"➡️", cat:"otros", gramatica:"adverbio", source:"ARASAAC" },
        { palabras:["siempre","en todo momento","constantemente"], img:"♾️", cat:"otros", gramatica:"adverbio", source:"ARASAAC" },
        { palabras:["nunca","jamás","jamas","ni una vez"], img:"🚫", cat:"otros", gramatica:"adverbio", source:"ARASAAC" },
        { palabras:["a veces","algunas veces","de vez en cuando","en ocasiones"], img:"🔄", cat:"otros", gramatica:"adverbio", source:"ARASAAC" },
        { palabras:["mañana tiempo","la mañana","por la mañana","matinal"], img:"🌅", cat:"otros", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["tarde","la tarde","por la tarde","vespertino"], img:"🌇", cat:"otros", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["noche","la noche","por la noche","nocturno"], img:"🌃", cat:"otros", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["lunes","el lunes"], img:"📅", cat:"otros", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["martes","el martes"], img:"📅", cat:"otros", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["miercoles","miércoles","el miércoles"], img:"📅", cat:"otros", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["jueves","el jueves"], img:"📅", cat:"otros", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["viernes","el viernes"], img:"📅", cat:"otros", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["sabado","sábado","el sábado"], img:"🎉", cat:"otros", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["domingo","el domingo"], img:"😌", cat:"otros", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["semana","esta semana","la semana que viene"], img:"📅", cat:"otros", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["fin de semana","weekend","finde"], img:"🎉", cat:"otros", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["mes","meses","este mes"], img:"🗓️", cat:"otros", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["año","años","este año","año nuevo"], img:"🎊", cat:"otros", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["primavera","en primavera"], img:"🌸", cat:"otros", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["verano","en verano","calor de verano"], img:"☀️", cat:"otros", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["otoño","otono","en otoño"], img:"🍂", cat:"otros", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["invierno","en invierno","frío de invierno"], img:"❄️", cat:"otros", gramatica:"sustantivo", source:"ARASAAC" },

        // ══════════════════════════════════════════════════════
        // BLOQUE 25: CELEBRACIONES Y EVENTOS
        // ══════════════════════════════════════════════════════
        { palabras:["cumpleaños","feliz cumpleaños","birthday","mi cumpleaños"], img:"🎂", cat:"otros", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["navidad","christmas","feliz navidad","navidades"], img:"🎄", cat:"otros", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["fiesta","celebración","celebracion","party","festejo"], img:"🎉", cat:"otros", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["vacaciones","días libres","dias libres","holiday"], img:"🏖️", cat:"otros", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["regalo","regalos","present","obsequio","sorpresa"], img:"🎁", cat:"otros", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["deportes","futbol","fútbol","football","soccer"], img:"⚽", cat:"acciones", gramatica:"sustantivo", source:"ARASAAC" },
        { palabras:["baloncesto","basket","basketball","basquet"], img:"🏀", cat:"acciones", gramatica:"sustantivo", source:"ARASAAC" },

        // ══════════════════════════════════════════════════════
        // BLOQUE 26: FRASES ESPECIALES Y CONECTORES
        // ══════════════════════════════════════════════════════
        { palabras:["buenos dias","dar los buenos dias","decir buenos dias"], img:"🌅", cat:"personas", gramatica:"interjección", source:"ARASAAC" },
        { palabras:["buenas noches","dar las buenas noches","decir buenas noches"], img:"🌃", cat:"personas", gramatica:"interjección", source:"ARASAAC" },
        { palabras:["buenas tardes","dar las buenas tardes"], img:"🌇", cat:"personas", gramatica:"interjección", source:"ARASAAC" },
        { palabras:["jugar con amigos","jugar juntos","jugar con compañeros"], img:"🧑‍🤝‍🧑", cat:"acciones", gramatica:"verbo", source:"Mulberry" },
        { palabras:["beber agua","tomar agua","quiero agua","dame agua"], img:this._svgs.beber, cat:"acciones", gramatica:"verbo", source:"Sclera" },
        { palabras:["me duele la cabeza","dolor de cabeza"], img:"🤕", cat:"emociones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["me duele la barriga","me duele el estomago","dolor de barriga","dolor de estomago"], img:"🤢", cat:"emociones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["habia una vez","había una vez","erase una vez","érase una vez","era una vez"], img:"📖", cat:"otros", gramatica:"conector", source:"ARASAAC" },
        { palabras:["fin del cuento","colorín colorado","fin de la historia"], img:"🔚", cat:"otros", gramatica:"conector", source:"ARASAAC" },
        { palabras:["encima","arriba","sobre","encima de","arriba de"], img:"⬆️", cat:"otros", gramatica:"adverbio", source:"ARASAAC" },
        { palabras:["debajo","abajo","debajo de","abajo de"], img:"⬇️", cat:"otros", gramatica:"adverbio", source:"ARASAAC" },
        { palabras:["dentro","adentro","dentro de","en el interior"], img:"📥", cat:"otros", gramatica:"adverbio", source:"ARASAAC" },
        { palabras:["fuera","afuera","fuera de","al exterior"], img:"📤", cat:"otros", gramatica:"adverbio", source:"ARASAAC" },
        { palabras:["cerca","al lado","junto a","próximo a"], img:"↔️", cat:"otros", gramatica:"adverbio", source:"ARASAAC" },
        { palabras:["lejos","muy lejos","alejado","distante"], img:"🏔️", cat:"otros", gramatica:"adverbio", source:"ARASAAC" },
        { palabras:["oler","olfatear","huelo","hueles","huele","huelen"], img:"👃", cat:"acciones", gramatica:"verbo", source:"Mulberry" },
        { palabras:["soplar","respirar profundo","jadear","exhalar"], img:"🌬️", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["masticar","morder","mascar","muerdo","muerdes"], img:"🦷", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },
        { palabras:["construir","construye","armar","montar costrucción","edificar"], img:"🏗️", cat:"acciones", gramatica:"verbo", source:"ARASAAC" },

        ]; // fin del diccionario base

        // ─────────────────────────────────────────────────────────────
        // Stop words: palabras funcionales que se filtran al buscar
        // ─────────────────────────────────────────────────────────────
        const stopWords = [
            "el","la","los","las","un","una","unos","unas",
            "de","del","a","al","ante","bajo","con","contra",
            "desde","en","entre","hacia","hasta","para","por",
            "según","segun","sin","sobre","tras",
            "y","e","o","u","ni","que","pero","aunque","mas",
            "muy","tan","tanto","solo","también","tampoco"
        ];

        this.diccionario = this.expandDictionary(diccionario);
        this.stopWords = stopWords;
    }

    // ─────────────────────────────────────────────────────────────────
    // expandDictionary: genera plurales, conjugaciones y formas
    // femeninas a partir del array base
    // ─────────────────────────────────────────────────────────────────
    expandDictionary(baseDict) {
        const expanded = [];

        // Pluralización española
        const pluralize = (word) => {
            if (!word || word.includes(' ')) return word + 's';
            if (word.endsWith('z')) return word.slice(0,-1) + 'ces';
            if (word.endsWith('ión') || word.endsWith('ion')) return word.slice(0,-3) + 'iones';
            if (/[aeiouáéíóú]$/i.test(word)) return word + 's';
            return word + 'es';
        };

        // Conjugación verbal regular (AR / ER / IR)
        const conjugateVerbs = (word) => {
            const forms = new Set([word]);
            if (word.endsWith('ar')) {
                const r = word.slice(0,-2);
                ['ando','ado','ados','adas',
                 'o','as','a','amos','ais','an',
                 'e','es','emos','en',
                 'aba','abas','abamos','aban',
                 'are','aras','ara','aremos','aran',
                 'aron','aste'].forEach(s => forms.add(r+s));
            } else if (word.endsWith('er')) {
                const r = word.slice(0,-2);
                ['iendo','ido','idos','idas',
                 'o','es','e','emos','eis','en',
                 'ia','ias','iamos','ian',
                 'ere','eras','era','eremos','eran',
                 'ieron','iste','io'].forEach(s => forms.add(r+s));
            } else if (word.endsWith('ir')) {
                const r = word.slice(0,-2);
                ['iendo','ido','idos','idas',
                 'o','es','e','imos','is','en',
                 'ia','ias','iamos','ian',
                 'ire','iras','ira','iremos','iran',
                 'ieron','iste','io'].forEach(s => forms.add(r+s));
            }
            return Array.from(forms);
        };

        baseDict.forEach(entry => {
            const singulares = new Set();
            const plurales = new Set();

            entry.palabras.forEach(word => {
                // Las frases multi-palabra se añaden directamente sin expandir
                if (word.includes(' ')) {
                    singulares.add(word);
                    return;
                }
                if (entry.cat === 'acciones' || entry.gramatica === 'verbo') {
                    // Solo conjugar las palabras que terminan en AR/ER/IR (infinitivos)
                    const isInfinitive = word.endsWith('ar') || word.endsWith('er') || word.endsWith('ir');
                    if (isInfinitive) {
                        conjugateVerbs(word).forEach(f => {
                            if (f.endsWith('mos') || f.endsWith('ais') || f.endsWith('an') || f.endsWith('en') || f.endsWith('is')) {
                                plurales.add(f);
                            } else {
                                singulares.add(f);
                            }
                        });
                    } else {
                        // Forma irregular ya incluida explícitamente
                        singulares.add(word);
                    }
                } else {
                    // Sustantivos, adjetivos etc. → generar plural
                    const isPlural = word.endsWith('s') && word.length > 3 && !word.endsWith('és');
                    if (isPlural) {
                        plurales.add(word);
                    } else {
                        singulares.add(word);
                        plurales.add(pluralize(word));
                    }
                }
            });

            // Entrada singular
            expanded.push({ ...entry, palabras: Array.from(singulares), isPlural: false });
            // Entrada plural (si hay formas distintas)
            if (plurales.size > 0) {
                expanded.push({ ...entry, palabras: Array.from(plurales), isPlural: true });
            }
        });

        return expanded;
    }

    // ─────────────────────────────────────────────────────────────────
    // getFullDict: diccionario completo (base + personalizados)
    // ─────────────────────────────────────────────────────────────────
    getFullDict() {
        return [...this.diccionario, ...this.stateModel.customDict];
    }

    // ─────────────────────────────────────────────────────────────────
    // normalizeString: elimina tildes, puntuación y pasa a minúscula
    // ─────────────────────────────────────────────────────────────────
    normalizeString(str) {
        return str
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[.,?!¡¿;:«»""''()\[\]]/g, '')
            .trim();
    }

    // ─────────────────────────────────────────────────────────────────
    // stemSpanish: stemming muy básico para mejorar coincidencias
    // (elimina sufijos comunes de tiempo pasado y gerundio)
    // ─────────────────────────────────────────────────────────────────
    stemSpanish(word) {
        if (word.length < 5) return word;
        // Gerundios → raíz
        if (word.endsWith('ando')) return word.slice(0,-4) + 'ar';
        if (word.endsWith('iendo')) return word.slice(0,-5);
        // Participios regulares
        if (word.endsWith('ado') || word.endsWith('ada')) return word.slice(0,-3) + 'ar';
        if (word.endsWith('ido') || word.endsWith('ida')) return word.slice(0,-3);
        return word;
    }

    // ─────────────────────────────────────────────────────────────────
    // getUserPreference: lee la preferencia guardada en localStorage
    // ─────────────────────────────────────────────────────────────────
    getUserPreference(normalizedWord) {
        try {
            const stored = localStorage.getItem('pref_' + normalizedWord);
            return stored ? JSON.parse(stored) : null;
        } catch(e) { return null; }
    }

    // ─────────────────────────────────────────────────────────────────
    // saveUserPreference: guarda la elección del usuario
    // preference: { source, img }
    // ─────────────────────────────────────────────────────────────────
    saveUserPreference(normalizedWord, preference) {
        try {
            localStorage.setItem('pref_' + normalizedWord, JSON.stringify(preference));
        } catch(e) { /* localStorage lleno */ }
    }

    // ─────────────────────────────────────────────────────────────────
    // findPictogram: devuelve el mejor pictograma para una palabra
    // Prioridad: preferencia usuario → coincidencia exacta → stemming
    // ─────────────────────────────────────────────────────────────────
    findPictogram(word) {
        const nw = this.normalizeString(word);
        const dict = this.getFullDict();

        // 1. Comprobar preferencia de usuario
        const pref = this.getUserPreference(nw);

        // Buscar coincidencia exacta
        const exactMatch = dict.find(entry =>
            entry.palabras.some(p => this.normalizeString(p) === nw)
        );

        if (exactMatch) {
            // Si hay preferencia guardada para esta palabra, aplicarla
            if (pref && pref.img) {
                return { ...exactMatch, img: pref.img, _preferredSource: pref.source };
            }
            return exactMatch;
        }

        // 2. Búsqueda por stemming (fallback)
        const stemmed = this.stemSpanish(nw);
        if (stemmed !== nw) {
            const stemMatch = dict.find(entry =>
                entry.palabras.some(p => this.normalizeString(p) === stemmed)
            );
            if (stemMatch) return stemMatch;
        }

        return null;
    }

    // ─────────────────────────────────────────────────────────────────
    // findAllPictograms: devuelve TODAS las alternativas disponibles
    // para una palabra (para el selector visual)
    // ─────────────────────────────────────────────────────────────────
    findAllPictograms(word) {
        const nw = this.normalizeString(word);
        const dict = this.getFullDict();
        const results = [];

        dict.forEach(entry => {
            if (entry.palabras.some(p => this.normalizeString(p) === nw)) {
                // Entrada principal como alternativa
                results.push({ source: entry.source || 'ARASAAC', img: entry.img, entry });
                // Alternativas adicionales asociadas
                if (Array.isArray(entry.alternativas)) {
                    entry.alternativas.forEach(alt => {
                        if (!results.find(r => r.source === alt.source && r.img === alt.img)) {
                            results.push({ source: alt.source, img: alt.img, entry });
                        }
                    });
                }
            }
        });

        // Eliminar duplicados por img
        const seen = new Set();
        return results.filter(r => {
            const key = r.img;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
    }

    // ─────────────────────────────────────────────────────────────────
    // generateAIPictogram: genera SVG vía OpenRouter (respaldo online)
    // ─────────────────────────────────────────────────────────────────
    async generateAIPictogram(word, apiKey) {
        if (!apiKey) throw new Error('API_KEY_MISSING');

        const prompt = `Eres un experto ilustrador de comunicación aumentativa y alternativa (CAA), estilo ARASAAC.
Genera un SVG puro, limpio, simple y minimalista que represente la palabra/concepto: "${word}".
Requisitos estrictos del SVG:
- Estilo ARASAAC: líneas gruesas negras (stroke-width mínimo 4), colores planos vivos, fondo blanco, siluetas estilizadas para niños con autismo.
- viewBox="0 0 200 200"
- NO incluyas la palabra escrita dentro de la imagen.
- NO uses sombras ni degradados ni detalles hiperrealistas.
- Devuelve SOLO el código SVG válido, sin etiquetas markdown. Debe empezar con <svg y terminar con </svg>.`;

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

            // Limpiar posibles bloques markdown
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
            console.error('[DictModel] Error generando con IA:', error);
            throw error;
        }
    }
}
