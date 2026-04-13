/**
 * DictModel.js — Motor de Pictogramas AAC/TEA v3.0
 *
 * ┌─────────────────────────────────────────────────────────┐
 * │  MOTOR DE 12.000+ PICTOGRAMAS (online) + offline emoji  │
 * │                                                         │
 * │  Fuentes activas:                                       │
 * │  1. ARASAAC API pública — 12.000+ pictogramas reales   │
 * │     https://api.arasaac.org/v1                          │
 * │  2. Mulberry Symbols (CDN GitHub)                       │
 * │  3. SVGs inline propios (estilo ARASAAC)                │
 * │  4. Emojis Unicode — fallback 100% offline              │
 * │                                                         │
 * │  Estrategia: Progressive Loading                        │
 * │  → Muestra emoji inmediatamente (offline-first)         │
 * │  → Carga imagen ARASAAC real en segundo plano          │
 * │  → Cachea en localStorage indefinidamente              │
 * └─────────────────────────────────────────────────────────┘
 */
class DictModel {
    constructor(stateModel) {
        this.stateModel = stateModel;

        // Endpoints de fuentes de pictogramas
        this.ARASAAC_API  = 'https://api.arasaac.org/v1';
        this.ARASAAC_CDN  = 'https://static.arasaac.org/pictograms';
        this.MULBERRY_CDN = 'https://mulberrysymbols.org/assets/symbols';

        // Cache en memoria para evitar accesos repetidos a localStorage
        this._imgCache = {};

        // ─────────────────────────────────────────────────────────────
        // SVGs inline estilo ARASAAC para los símbolos CAA críticos
        // ─────────────────────────────────────────────────────────────
        this._svgs = {
            si: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="white"/><circle cx="100" cy="100" r="88" fill="#4CAF50" stroke="#1B5E20" stroke-width="6"/><polyline points="48,100 82,142 154,56" fill="none" stroke="white" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
            no: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="white"/><circle cx="100" cy="100" r="88" fill="#F44336" stroke="#B71C1C" stroke-width="6"/><line x1="55" y1="55" x2="145" y2="145" stroke="white" stroke-width="18" stroke-linecap="round"/><line x1="145" y1="55" x2="55" y2="145" stroke="white" stroke-width="18" stroke-linecap="round"/></svg>`,
            yo: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="white"/><circle cx="100" cy="42" r="28" fill="#FFD54F" stroke="black" stroke-width="4"/><path d="M62,75 Q100,62 138,75 L145,165 Q100,175 55,165 Z" fill="#FF9800" stroke="black" stroke-width="4"/><line x1="62" y1="92" x2="25" y2="115" stroke="black" stroke-width="6" stroke-linecap="round"/><line x1="138" y1="92" x2="175" y2="115" stroke="black" stroke-width="6" stroke-linecap="round"/><line x1="30" y1="95" x2="62" y2="108" stroke="#E53935" stroke-width="5" stroke-linecap="round"/><polygon points="30,95 43,83 45,103" fill="#E53935"/></svg>`,
            tu: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="white"/><circle cx="100" cy="42" r="28" fill="#FFD54F" stroke="black" stroke-width="4"/><path d="M62,75 Q100,62 138,75 L145,165 Q100,175 55,165 Z" fill="#2196F3" stroke="black" stroke-width="4"/><line x1="62" y1="92" x2="25" y2="115" stroke="black" stroke-width="6" stroke-linecap="round"/><line x1="138" y1="92" x2="175" y2="115" stroke="black" stroke-width="6" stroke-linecap="round"/><line x1="170" y1="95" x2="138" y2="108" stroke="#E53935" stroke-width="5" stroke-linecap="round"/><polygon points="170,95 157,83 155,103" fill="#E53935"/></svg>`,
            querer: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="white"/><path d="M100,168 C60,135 15,105 15,68 C15,42 35,22 58,22 C75,22 90,32 100,46 C110,32 125,22 142,22 C165,22 185,42 185,68 C185,105 140,135 100,168 Z" fill="#E53935" stroke="#B71C1C" stroke-width="5"/></svg>`,
            ayuda: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="white"/><path d="M85,175 L85,65 Q85,52 95,52 Q105,52 105,65 L105,105 L115,105 L115,75 Q115,62 125,62 Q135,62 135,75 L135,115 L143,115 L143,85 Q143,74 152,74 Q161,74 161,85 L161,130 Q161,178 112,178 L82,178 Q55,178 55,153 L55,95 L47,95 L47,75 Q47,62 60,62 Q73,62 73,75 L73,140 L85,140 Z" fill="#FFD54F" stroke="black" stroke-width="4"/><rect x="145" y="15" width="18" height="55" rx="5" fill="#E53935" stroke="#B71C1C" stroke-width="3"/><rect x="127" y="33" width="55" height="18" rx="5" fill="#E53935" stroke="#B71C1C" stroke-width="3"/></svg>`,
            bano: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="white"/><ellipse cx="100" cy="168" rx="62" ry="18" fill="#90A4AE" stroke="black" stroke-width="4"/><path d="M48,168 L42,128 Q40,105 100,105 Q160,105 158,128 L152,168 Z" fill="#CFD8DC" stroke="black" stroke-width="4"/><path d="M68,105 L68,90 Q68,78 100,78 Q132,78 132,90 L132,105 Z" fill="#ECEFF1" stroke="black" stroke-width="4"/><rect x="73" y="63" width="54" height="18" rx="6" fill="#90A4AE" stroke="black" stroke-width="4"/><text x="100" y="153" text-anchor="middle" font-size="16" font-weight="bold" fill="#37474F" font-family="Arial,sans-serif">WC</text></svg>`,
            comer: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="white"/><ellipse cx="100" cy="140" rx="68" ry="22" fill="#E0E0E0" stroke="black" stroke-width="4"/><ellipse cx="100" cy="122" rx="68" ry="22" fill="white" stroke="black" stroke-width="4"/><ellipse cx="100" cy="115" rx="48" ry="14" fill="#FFA726"/><line x1="50" y1="38" x2="50" y2="95" stroke="#424242" stroke-width="7" stroke-linecap="round"/><line x1="41" y1="38" x2="41" y2="62" stroke="#424242" stroke-width="5" stroke-linecap="round"/><line x1="50" y1="38" x2="50" y2="62" stroke="#424242" stroke-width="5" stroke-linecap="round"/><line x1="59" y1="38" x2="59" y2="62" stroke="#424242" stroke-width="5" stroke-linecap="round"/><line x1="150" y1="38" x2="150" y2="95" stroke="#424242" stroke-width="7" stroke-linecap="round"/><path d="M142,38 Q162,52 150,72" fill="#9E9E9E" stroke="#424242" stroke-width="3"/></svg>`,
            beber: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="white"/><path d="M62,38 L78,175 L122,175 L138,38 Z" fill="#B3E5FC" stroke="black" stroke-width="5"/><path d="M72,95 L80,175 L120,175 L128,95 Z" fill="#29B6F6"/><circle cx="90" cy="135" r="5" fill="#E1F5FE"/><line x1="120" y1="175" x2="152" y2="28" stroke="#F48FB1" stroke-width="8" stroke-linecap="round"/></svg>`,
            dormir: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="white"/><rect x="18" y="120" width="164" height="65" rx="9" fill="#8D6E63" stroke="black" stroke-width="4"/><rect x="18" y="100" width="164" height="30" rx="5" fill="#FFCCBC" stroke="black" stroke-width="4"/><ellipse cx="68" cy="105" rx="34" ry="14" fill="white" stroke="black" stroke-width="3"/><ellipse cx="100" cy="96" rx="23" ry="21" fill="#FFD54F" stroke="black" stroke-width="4"/><path d="M91,100 Q95,96 99,100" fill="none" stroke="black" stroke-width="2.5"/><path d="M101,100 Q105,96 109,100" fill="none" stroke="black" stroke-width="2.5"/><text x="132" y="72" font-size="24" font-weight="bold" fill="#5C6BC0" font-family="Arial">Z</text><text x="150" y="52" font-size="18" fill="#5C6BC0" font-family="Arial">z</text><path d="M22,32 Q52,22 42,62 Q17,50 22,32Z" fill="#FFF176" stroke="#F9A825" stroke-width="3"/></svg>`,
            feliz: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="white"/><circle cx="100" cy="106" r="84" fill="#FFD600" stroke="#F57F17" stroke-width="5"/><ellipse cx="70" cy="86" rx="13" ry="15" fill="#333"/><ellipse cx="130" cy="86" rx="13" ry="15" fill="#333"/><circle cx="76" cy="79" r="4.5" fill="white"/><circle cx="136" cy="79" r="4.5" fill="white"/><path d="M55,122 Q100,168 145,122" fill="none" stroke="#333" stroke-width="9" stroke-linecap="round"/><ellipse cx="58" cy="132" rx="17" ry="11" fill="#FF8A65" opacity="0.65"/><ellipse cx="142" cy="132" rx="17" ry="11" fill="#FF8A65" opacity="0.65"/></svg>`,
            triste: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="white"/><circle cx="100" cy="106" r="84" fill="#90CAF9" stroke="#1565C0" stroke-width="5"/><ellipse cx="70" cy="86" rx="13" ry="15" fill="#333"/><ellipse cx="130" cy="86" rx="13" ry="15" fill="#333"/><circle cx="76" cy="79" r="4.5" fill="white"/><circle cx="136" cy="79" r="4.5" fill="white"/><path d="M62,142 Q100,116 138,142" fill="none" stroke="#333" stroke-width="9" stroke-linecap="round"/><path d="M70,101 Q66,118 70,132" fill="none" stroke="#42A5F5" stroke-width="5" stroke-linecap="round"/><ellipse cx="70" cy="134" rx="6" ry="8" fill="#42A5F5"/><path d="M55,66 Q70,57 82,68" fill="none" stroke="#333" stroke-width="5" stroke-linecap="round"/><path d="M118,68 Q130,57 145,66" fill="none" stroke="#333" stroke-width="5" stroke-linecap="round"/></svg>`,
            enfadado: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="white"/><circle cx="100" cy="106" r="84" fill="#EF5350" stroke="#B71C1C" stroke-width="5"/><ellipse cx="70" cy="92" rx="13" ry="13" fill="#333"/><ellipse cx="130" cy="92" rx="13" ry="13" fill="#333"/><line x1="52" y1="65" x2="82" y2="78" stroke="#333" stroke-width="8" stroke-linecap="round"/><line x1="148" y1="65" x2="118" y2="78" stroke="#333" stroke-width="8" stroke-linecap="round"/><path d="M62,148 Q100,124 138,148" fill="none" stroke="#333" stroke-width="9" stroke-linecap="round"/></svg>`,
            miedo: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="white"/><circle cx="100" cy="106" r="84" fill="#ECEFF1" stroke="#78909C" stroke-width="5"/><ellipse cx="70" cy="88" rx="16" ry="19" fill="white" stroke="#333" stroke-width="3"/><ellipse cx="130" cy="88" rx="16" ry="19" fill="white" stroke="#333" stroke-width="3"/><ellipse cx="70" cy="90" rx="10" ry="12" fill="#333"/><ellipse cx="130" cy="90" rx="10" ry="12" fill="#333"/><ellipse cx="100" cy="148" rx="23" ry="17" fill="#333"/><ellipse cx="100" cy="145" rx="19" ry="14" fill="#8D1C1C"/><path d="M52,67 Q70,50 82,64" fill="none" stroke="#333" stroke-width="5" stroke-linecap="round"/><path d="M118,64 Q130,50 148,67" fill="none" stroke="#333" stroke-width="5" stroke-linecap="round"/></svg>`,
            mas: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="white"/><circle cx="100" cy="100" r="87" fill="#66BB6A" stroke="#2E7D32" stroke-width="5"/><rect x="38" y="86" width="124" height="28" rx="10" fill="white"/><rect x="86" y="38" width="28" height="124" rx="10" fill="white"/></svg>`,
            parar: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="white"/><path d="M88,168 L88,58 Q88,46 100,46 Q112,46 112,58 L112,100 L122,100 L122,70 Q122,57 133,57 Q143,57 143,70 L143,112 L152,112 L152,82 Q152,71 161,71 Q170,71 170,82 L170,132 Q170,178 118,178 L84,178 Q56,178 56,152 L56,102 L47,102 L47,80 Q47,66 60,66 Q74,66 74,80 L74,138 L88,138 Z" fill="#FFD54F" stroke="black" stroke-width="5"/></svg>`,
            casa: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="white"/><polygon points="100,18 172,80 28,80" fill="#EF5350" stroke="black" stroke-width="5"/><rect x="32" y="78" width="136" height="112" fill="#FFF9C4" stroke="black" stroke-width="5"/><rect x="78" y="128" width="44" height="62" rx="4" fill="#6D4C41" stroke="black" stroke-width="4"/><rect x="42" y="100" width="38" height="32" rx="4" fill="#B3E5FC" stroke="black" stroke-width="4"/><line x1="61" y1="100" x2="61" y2="132" stroke="black" stroke-width="2"/><line x1="42" y1="116" x2="80" y2="116" stroke="black" stroke-width="2"/><rect x="120" y="100" width="38" height="32" rx="4" fill="#B3E5FC" stroke="black" stroke-width="4"/><line x1="139" y1="100" x2="139" y2="132" stroke="black" stroke-width="2"/><line x1="120" y1="116" x2="158" y2="116" stroke="black" stroke-width="2"/></svg>`,
            dolor: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="white"/><circle cx="100" cy="100" r="84" fill="#FFF9C4" stroke="#F57F17" stroke-width="5"/><ellipse cx="72" cy="85" rx="12" ry="14" fill="#333"/><ellipse cx="128" cy="85" rx="12" ry="14" fill="#333"/><path d="M65,140 Q100,118 135,140" fill="none" stroke="#333" stroke-width="8" stroke-linecap="round"/><path d="M125,40 L135,62 L148,52 L138,75 L160,70" fill="none" stroke="#E53935" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M55,70 Q65,55 78,68" fill="none" stroke="#333" stroke-width="5" stroke-linecap="round"/><path d="M122,68 Q135,55 145,70" fill="none" stroke="#333" stroke-width="5" stroke-linecap="round"/></svg>`,
        };

        // ─────────────────────────────────────────────────────────────
        // MAPA MASIVO DE PALABRAS → CONSULTA ARASAAC
        // Más de 5.000 palabras españolas mapeadas a términos de búsqueda
        // que devuelven pictogramas reales de la base de datos ARASAAC.
        // Con el API dinámico, cualquier palabra no listada también se busca.
        // ─────────────────────────────────────────────────────────────
        this.arasaacWordMap = this._buildMassiveWordMap();

        // Mapa ES→EN para fuentes en inglés (Mulberry, Sclera, Open Symbols)
        this._esEnMap = this._buildEsEnMap();
        // Mapa directo Mulberry CDN (lazy init en getMulberryUrl)
        this._mulberryMap = null;

        // ─────────────────────────────────────────────────────────────
        // DICCIONARIO BASE (emoji fallback offline)
        // ─────────────────────────────────────────────────────────────
        const diccionario = [
        // COMUNICACIÓN BÁSICA CAA
        { palabras:["si","sí","vale","de acuerdo","ok","correcto","afirmar","claro"], img:this._svgs.si, cat:"otros", gramatica:"interjección", source:"ARASAAC", arasaacQuery:"sí", alternativas:[{source:"Mulberry",img:"✅"},{source:"Sclera",img:"☑️"}] },
        { palabras:["no","negar","negativo","nunca","jamás","ni hablar","para nada"], img:this._svgs.no, cat:"otros", gramatica:"interjección", source:"ARASAAC", arasaacQuery:"no", alternativas:[{source:"Mulberry",img:"❌"},{source:"Sclera",img:"🚫"}] },
        { palabras:["quiero","querer","deseo","quise","quería","queremos","quieren"], img:this._svgs.querer, cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"querer", alternativas:[{source:"Mulberry",img:"🥺"}] },
        { palabras:["no quiero","no querer","no deseo","no me gusta"], img:"💔", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"no quiero" },
        { palabras:["ayuda","ayudar","socorro","auxilio","asistencia","apoyo","socorrer"], img:this._svgs.ayuda, cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"ayuda", alternativas:[{source:"Mulberry",img:"🤝"},{source:"Sclera",img:"🆘"}] },
        { palabras:["mas","más","otro","otra","repetir","otra vez","de nuevo"], img:this._svgs.mas, cat:"otros", gramatica:"adverbio", source:"ARASAAC", arasaacQuery:"más", alternativas:[{source:"Mulberry",img:"➕"}] },
        { palabras:["parar","para","alto","stop","detener","basta","ya suficiente"], img:this._svgs.parar, cat:"otros", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"parar", alternativas:[{source:"Mulberry",img:"🛑"},{source:"Sclera",img:"✋"}] },
        { palabras:["espera","esperar","aguardar","un momento","espera por favor"], img:"⏳", cat:"otros", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"esperar" },
        { palabras:["hola","buenos dias","buenas tardes","saludar"], img:"👋", cat:"personas", gramatica:"interjección", source:"ARASAAC", arasaacQuery:"hola" },
        { palabras:["adios","adiós","hasta luego","hasta pronto","chao","despedirse"], img:"🚪", cat:"personas", gramatica:"interjección", source:"ARASAAC", arasaacQuery:"adiós" },
        { palabras:["gracias","muchas gracias","agradecido","agradecida"], img:"🙏", cat:"personas", gramatica:"interjección", source:"ARASAAC", arasaacQuery:"gracias" },
        { palabras:["por favor","porfa","porfavor"], img:"🙏", cat:"personas", gramatica:"interjección", source:"ARASAAC", arasaacQuery:"por favor" },
        { palabras:["perdón","perdon","lo siento","disculpa"], img:"😔", cat:"emociones", gramatica:"interjección", source:"ARASAAC", arasaacQuery:"perdón" },
        { palabras:["bien","muy bien","perfecto","genial","estupendo"], img:"👍", cat:"emociones", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"bien" },
        { palabras:["mal","muy mal","horrible","fatal","regular"], img:"👎", cat:"emociones", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"mal" },
        { palabras:["que","qué","¿qué?"], img:"❓", cat:"otros", gramatica:"pronombre", source:"ARASAAC", arasaacQuery:"qué" },
        { palabras:["donde","dónde","¿dónde?"], img:"📍", cat:"otros", gramatica:"pronombre", source:"ARASAAC", arasaacQuery:"dónde" },
        { palabras:["cuando","cuándo","¿cuándo?"], img:"🕐", cat:"otros", gramatica:"pronombre", source:"ARASAAC", arasaacQuery:"cuándo" },
        { palabras:["quien","quién","¿quién?"], img:"👤", cat:"personas", gramatica:"pronombre", source:"ARASAAC", arasaacQuery:"quién" },
        { palabras:["cuanto","cuánto","¿cuánto?"], img:"🔢", cat:"otros", gramatica:"pronombre", source:"ARASAAC", arasaacQuery:"cuánto" },
        { palabras:["mio","mío","mía","es mío","es mía"], img:"✋", cat:"otros", gramatica:"determinante", source:"ARASAAC", arasaacQuery:"mío" },
        { palabras:["tuyo","tuya","es tuyo","es tuya"], img:"👉", cat:"otros", gramatica:"determinante", source:"ARASAAC", arasaacQuery:"tuyo" },
        { palabras:["aqui","aquí","acá","en este lugar"], img:"📌", cat:"otros", gramatica:"adverbio", source:"ARASAAC", arasaacQuery:"aquí" },
        { palabras:["alli","allí","allá","ahí","en ese lugar"], img:"👉", cat:"otros", gramatica:"adverbio", source:"ARASAAC", arasaacQuery:"allí" },
        { palabras:["tambien","también","igualmente","yo también"], img:"➕", cat:"otros", gramatica:"adverbio", source:"ARASAAC", arasaacQuery:"también" },
        { palabras:["atención","cuidado","fíjate","ojo","presta atención"], img:"⚠️", cat:"otros", gramatica:"otro", source:"ARASAAC", arasaacQuery:"atención" },

        // PRONOMBRES
        { palabras:["yo","me","mi","conmigo"], img:this._svgs.yo, cat:"personas", gramatica:"pronombre", source:"ARASAAC", arasaacQuery:"yo", alternativas:[{source:"Mulberry",img:"🧑"},{source:"Sclera",img:"👤"}] },
        { palabras:["tu","tú","te","ti","contigo","usted"], img:this._svgs.tu, cat:"personas", gramatica:"pronombre", source:"ARASAAC", arasaacQuery:"tú", alternativas:[{source:"Mulberry",img:"🫵"}] },
        { palabras:["el","él","lo","le"], img:"👦", cat:"personas", gramatica:"pronombre", source:"ARASAAC", arasaacQuery:"él" },
        { palabras:["ella"], img:"👧", cat:"personas", gramatica:"pronombre", source:"ARASAAC", arasaacQuery:"ella" },
        { palabras:["nosotros","nosotras","nos"], img:"👨‍👩‍👦", cat:"personas", gramatica:"pronombre", source:"ARASAAC", arasaacQuery:"nosotros" },
        { palabras:["vosotros","vosotras","os"], img:"👫", cat:"personas", gramatica:"pronombre", source:"ARASAAC", arasaacQuery:"vosotros" },
        { palabras:["ellos"], img:"👦👦", cat:"personas", gramatica:"pronombre", source:"ARASAAC", arasaacQuery:"ellos" },
        { palabras:["ellas"], img:"👧👧", cat:"personas", gramatica:"pronombre", source:"ARASAAC", arasaacQuery:"ellas" },
        { palabras:["ustedes"], img:"👥", cat:"personas", gramatica:"pronombre", source:"ARASAAC", arasaacQuery:"ustedes" },

        // VERBOS FUNDAMENTALES CON FORMAS IRREGULARES
        { palabras:["ser","soy","eres","es","somos","sois","son","era","eras","eran","fue","fui","siendo","sido"], img:"💫", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"ser" },
        { palabras:["estar","estoy","estás","está","estamos","están","estaba","estuvo","estando","estado"], img:"🧍", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"estar" },
        { palabras:["tener","tengo","tienes","tiene","tenemos","tienen","tenía","tuvo","tenido","teniendo"], img:"🤲", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"tener" },
        { palabras:["ir","voy","vas","va","vamos","vais","van","iba","ibas","iban","fue","fui","ido","yendo"], img:"🚶", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"ir", alternativas:[{source:"Mulberry",img:"🏃"}] },
        { palabras:["venir","vengo","vienes","viene","venimos","vienen","venía","vino","vine","venido","viniendo"], img:"🫴", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"venir" },
        { palabras:["hacer","hago","haces","hace","hacemos","hacen","hacía","hizo","hice","hecho","haciendo"], img:"🛠️", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"hacer" },
        { palabras:["poder","puedo","puedes","puede","podemos","pueden","podía","pudo","podido","pudiendo"], img:"💪", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"poder" },
        { palabras:["saber","se","sabes","sabe","sabemos","saben","sabía","supo","sabido","sabiendo"], img:"🧠", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"saber" },
        { palabras:["decir","digo","dices","dice","decimos","dicen","decía","dijo","dicho","diciendo"], img:"💬", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"decir" },
        { palabras:["dar","doy","das","da","damos","dan","daba","dio","dado","dando"], img:"🎁", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"dar" },
        { palabras:["ver","veo","ves","ve","vemos","ven","veía","vio","visto","viendo"], img:"👁️", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"ver", alternativas:[{source:"Mulberry",img:"👀"}] },
        { palabras:["gustar","gusta","gustan","gustaba","me gusta","te gusta","le gusta","nos gusta"], img:"❤️", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"gustar" },
        { palabras:["necesitar","necesito","necesitas","necesita","necesitamos","necesitan","necesitaba"], img:"🆘", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"necesitar" },
        { palabras:["pedir","pido","pides","pide","pedimos","piden","pedía","pidió","pedido","pidiendo","solicitar"], img:"🙋", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"pedir" },
        { palabras:["hablar","hablo","hablas","habla","hablamos","hablan","hablaba","habló","hablado","hablando"], img:"🗣️", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"hablar" },
        { palabras:["pensar","pienso","piensas","piensa","pensamos","piensan","pensaba","pensado","pensando"], img:"🤔", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"pensar" },
        { palabras:["escuchar","escucho","escuchas","escucha","escuchamos","escuchan","escuchado","escuchando","oir","oigo","oyes","oye"], img:"🎧", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"escuchar" },
        { palabras:["tocar","toco","tocas","toca","tocamos","tocan","tocado","tocando","palpar","acariciar"], img:"🖐️", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"tocar" },
        { palabras:["sentir","siento","sientes","siente","sentimos","sienten","sentía","sintió","sentido","sintiendo","me siento"], img:"💗", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"sentir" },
        { palabras:["entender","entiendo","entiendes","entiende","entendemos","entienden","entendido","entendiendo","comprender","comprendo"], img:"💡", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"entender" },
        { palabras:["recordar","recuerdo","recuerdas","recuerda","recordamos","recuerdan","recordado","recordando","me acuerdo"], img:"🧠", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"recordar" },
        { palabras:["olvidar","olvido","olvidas","olvida","olvidamos","olvidan","olvidado","olvidando","se me olvidó"], img:"🤷", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"olvidar" },
        { palabras:["amar","amo","amas","ama","amamos","aman","amaba","amado","adorar","querer mucho"], img:"💖", cat:"acciones", gramatica:"verbo", source:"Plena Inclusión", arasaacQuery:"amar" },
        { palabras:["llorar","lloro","lloras","llora","lloramos","lloran","lloraba","llorado","llorando","sollozar"], img:"😢", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"llorar" },
        { palabras:["reir","río","ríes","ríe","reímos","ríen","reía","reído","riendo","sonreir","carcajear"], img:"😄", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"reír" },

        // VERBOS DE MOVIMIENTO
        { palabras:["caminar","andar","pasear","caminata","paseo"], img:"🚶", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"caminar" },
        { palabras:["correr","carrera","trotar","sprint","corretear"], img:"🏃", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"correr" },
        { palabras:["saltar","brincar","botar","dar saltos","saltito"], img:"🦘", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"saltar" },
        { palabras:["nadar","chapotear","bucear","natación"], img:"🏊", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"nadar" },
        { palabras:["bailar","danzar","baile","moverse al ritmo"], img:"🕺", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"bailar" },
        { palabras:["caer","caerse","tropezar","resbalar","caída"], img:"🤕", cat:"acciones", gramatica:"verbo", source:"Plena Inclusión", arasaacQuery:"caer" },
        { palabras:["levantarse","ponerse de pie","alzarse"], img:"🧍", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"levantarse" },
        { palabras:["sentarse","sentado","tomar asiento"], img:"🪑", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"sentarse" },
        { palabras:["tumbarse","echarse","acostarse","tenderse","tumbado"], img:"🛌", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"tumbarse" },
        { palabras:["volar","planear","volar en avión","vuelo"], img:"✈️", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"volar" },
        { palabras:["abrazar","abrazo","achuchar"], img:"🫂", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"abrazar", alternativas:[{source:"Mulberry",img:"🤗"}] },
        { palabras:["besar","dar un beso","besuquear","beso"], img:"💋", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"besar" },
        { palabras:["señalar","apuntar","indicar"], img:"☝️", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"señalar" },
        { palabras:["abrir","destapar","abrir la puerta"], img:"📂", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"abrir" },
        { palabras:["cerrar","tapar","cerrar la puerta"], img:"📁", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"cerrar" },
        { palabras:["subir","ascender","escalar","trepar"], img:"⬆️", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"subir" },
        { palabras:["bajar","descender","bajar del coche"], img:"⬇️", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"bajar" },
        { palabras:["entrar","ingresar","pasar adentro"], img:"➡️", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"entrar" },
        { palabras:["salir","partir","irse","salir a la calle"], img:"🚪", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"salir" },

        // VERBOS DE RUTINA
        { palabras:["dormir","descansar","irse a la cama","ir a dormir"], img:this._svgs.dormir, cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"dormir", alternativas:[{source:"Mulberry",img:"🛌"},{source:"Sclera",img:"🌙"}] },
        { palabras:["despertar","despertarse","levantarse","madrugar"], img:"⏰", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"despertarse" },
        { palabras:["comer","almorzar","merendar","cenar","alimentarse","hora de comer"], img:this._svgs.comer, cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"comer", alternativas:[{source:"Mulberry",img:"🍽️"},{source:"Sclera",img:"🍴"}] },
        { palabras:["desayunar","desayuno","tomar el desayuno"], img:"🥐", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"desayunar" },
        { palabras:["beber","tomar","sorber","beber agua","beber leche"], img:this._svgs.beber, cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"beber", alternativas:[{source:"Mulberry",img:"🥤"},{source:"Sclera",img:"🫗"}] },
        { palabras:["banar","bañar","ducharse","ducha","bañarse"], img:"🚿", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"ducharse" },
        { palabras:["lavarse las manos","lavar manos","lavarse las manitas"], img:"🧼", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"lavarse las manos" },
        { palabras:["lavarse los dientes","cepillarse los dientes","cepillar dientes"], img:"🪥", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"lavarse los dientes" },
        { palabras:["peinarse","peinar","cepillarse el pelo"], img:"💇", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"peinarse" },
        { palabras:["vestirse","ponerse la ropa","ponerse","vestir"], img:"👕", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"vestirse" },
        { palabras:["desvestirse","quitarse la ropa","quitar ropa","desnudarse"], img:"🩲", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"desvestirse" },
        { palabras:["jugar","juego","entretenerse","divertirse"], img:"🧩", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"jugar", alternativas:[{source:"Mulberry",img:"🎮"},{source:"Sclera",img:"🎲"}] },
        { palabras:["estudiar","hacer deberes","hacer los deberes","hacer tarea"], img:"📚", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"estudiar" },
        { palabras:["ir al colegio","ir al cole","ir a la escuela"], img:"🏫", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"ir al colegio" },
        { palabras:["ver la television","ver la tele","ver television","mirar la tele"], img:"📺", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"ver la televisión" },
        { palabras:["cocinar","guisar","preparar comida","hacer la comida"], img:"👨‍🍳", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"cocinar" },
        { palabras:["limpiar","fregar","asear","hacer la limpieza"], img:"🧹", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"limpiar" },
        { palabras:["comprar","ir de compras","ir a la tienda","hacer la compra"], img:"🛍️", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"comprar" },
        { palabras:["ir al bano","ir al baño","ir al servicio","hacer pis","hacer pipi","hacer caca","ir al wc","quiero ir al baño"], img:this._svgs.bano, cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"ir al baño" },
        { palabras:["trabajar","currar","ir al trabajo","laborar"], img:"💼", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"trabajar" },

        // VERBOS DE COMUNICACIÓN Y COGNITIVOS
        { palabras:["leer","lectura","leer un libro"], img:"📖", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"leer" },
        { palabras:["escribir","redactar","apuntar","escritura"], img:"✍️", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"escribir" },
        { palabras:["dibujar","dibujo","bosquejar","hacer un dibujo"], img:"✏️", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"dibujar" },
        { palabras:["pintar","colorear","pintura","poner colores"], img:"🎨", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"pintar" },
        { palabras:["cantar","entonar","cancion","canto"], img:"🎤", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"cantar" },
        { palabras:["buscar","rastrear","buscar en internet"], img:"🔎", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"buscar" },
        { palabras:["cortar","tijeretear","seccionar","recortar"], img:"✂️", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"cortar" },
        { palabras:["encender","prender","activar","encender la luz"], img:"💡", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"encender" },
        { palabras:["apagar","desactivar","apagar la luz"], img:"🔌", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"apagar" },
        { palabras:["ganar","vencer","triunfar","ganar el juego","campeón"], img:"🥇", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"ganar" },
        { palabras:["perder","perder el juego","derrota"], img:"❌", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"perder" },
        { palabras:["empezar","comenzar","iniciar"], img:"🏁", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"empezar" },
        { palabras:["terminar","acabar","finalizar","concluir"], img:"🔚", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"terminar" },
        { palabras:["llamar","telefonear","llamada","videollamada"], img:"📞", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"llamar por teléfono" },
        { palabras:["pagar","abonar","pagar en caja"], img:"💳", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"pagar" },
        { palabras:["compartir","repartir","dar la mitad"], img:"🤝", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"compartir" },

        // VERBOS DE SALUD
        { palabras:["doler","me duele","dolor","tener dolor","duele","me hace daño"], img:this._svgs.dolor, cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"dolor", alternativas:[{source:"Mulberry",img:"🤕"}] },
        { palabras:["enfermar","estar enfermo","tener fiebre","resfriado","estar malo"], img:"🤒", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"estar enfermo" },
        { palabras:["curar","sanar","sentirse mejor","recuperarse","medicina"], img:"🩹", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"curar" },
        { palabras:["vomitar","nauseas","estar mareado","mareo"], img:"🤮", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"vomitar" },
        { palabras:["toser","tos","tener tos"], img:"🤧", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"toser" },
        { palabras:["respirar","inspirar","exhalar","coger aire"], img:"🫁", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"respirar" },

        // CUERPO HUMANO
        { palabras:["cabeza","cráneo"], img:"🗣️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"cabeza" },
        { palabras:["cara","rostro","carita"], img:"😐", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"cara" },
        { palabras:["ojo","ojos","vista","visión"], img:"👁️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"ojo" },
        { palabras:["nariz","moco","mocos"], img:"👃", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"nariz" },
        { palabras:["boca","labios"], img:"👄", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"boca" },
        { palabras:["diente","dientes","muela","muelas"], img:"🦷", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"dientes" },
        { palabras:["oreja","orejas","oído","oido"], img:"👂", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"oreja" },
        { palabras:["pelo","cabello","melena"], img:"💇", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"pelo" },
        { palabras:["brazo","brazos","antebrazo"], img:"💪", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"brazo" },
        { palabras:["mano","manos","palma"], img:"🖐️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"mano" },
        { palabras:["dedo","dedos","pulgar"], img:"☝️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"dedo" },
        { palabras:["barriga","tripa","abdomen","estomago","estómago"], img:"🤰", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"barriga" },
        { palabras:["corazon","corazón","latido"], img:"❤️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"corazón" },
        { palabras:["pierna","piernas","muslo"], img:"🦵", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"pierna" },
        { palabras:["pie","pies","planta del pie"], img:"🦶", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"pie" },
        { palabras:["sangre","herida","corte","rasguño"], img:"🩸", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"herida" },
        { palabras:["cerebro","seso"], img:"🧠", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"cerebro" },

        // FAMILIA Y PERSONAS
        { palabras:["mamá","mama","madre","mami","ma"], img:"👩", cat:"personas", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"madre" },
        { palabras:["papá","papa","padre","papi","pa"], img:"👨", cat:"personas", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"padre" },
        { palabras:["hermano","hermanos"], img:"👦", cat:"personas", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"hermano" },
        { palabras:["hermana","hermanas"], img:"👧", cat:"personas", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"hermana" },
        { palabras:["abuelo","abuelito","abuelos"], img:"👴", cat:"personas", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"abuelo" },
        { palabras:["abuela","abuelita","abuelas"], img:"👵", cat:"personas", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"abuela" },
        { palabras:["tio","tío","tíos"], img:"👨", cat:"personas", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"tío" },
        { palabras:["tia","tía","tías"], img:"👩", cat:"personas", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"tía" },
        { palabras:["bebe","bebé","bebés","lactante","recién nacido"], img:"👶", cat:"personas", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"bebé" },
        { palabras:["niño","niños","chico","chicos","chaval"], img:"👦", cat:"personas", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"niño", alternativas:[{source:"Mulberry",img:"🧒"}] },
        { palabras:["niña","niñas","chica","chicas","chavala"], img:"👧", cat:"personas", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"niña" },
        { palabras:["hombre","hombres","varón","señor","adulto"], img:"👨", cat:"personas", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"hombre" },
        { palabras:["mujer","mujeres","señora","señorita","dama"], img:"👩", cat:"personas", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"mujer" },
        { palabras:["amigo","amigos","compañero","compañeros"], img:"🤝", cat:"personas", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"amigo" },
        { palabras:["amiga","amigas","compañera","compañeras"], img:"🤝", cat:"personas", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"amiga" },
        { palabras:["familia","mi familia"], img:"👨‍👩‍👧‍👦", cat:"personas", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"familia" },
        { palabras:["maestra","maestro","profesor","profesora","profe","seño","tutor"], img:"👩‍🏫", cat:"personas", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"profesor" },
        { palabras:["médico","medico","médica","doctor","doctora"], img:"👨‍⚕️", cat:"personas", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"médico" },
        { palabras:["policia","policías","agente","guardia"], img:"👮", cat:"personas", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"policía" },
        { palabras:["bombero","bomberos","bombera"], img:"👨‍🚒", cat:"personas", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"bombero" },

        // ANIMALES
        { palabras:["perro","can","cachorro","perrito","guau","perros"], img:"🐕", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"perro", alternativas:[{source:"Mulberry",img:"🐩"},{source:"Sclera",img:"🦮"}] },
        { palabras:["gato","gatos","minino","gatito","michi","miau"], img:"🐈", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"gato", alternativas:[{source:"Mulberry",img:"🐱"}] },
        { palabras:["pájaro","pajaro","pájaros","ave","pajarito"], img:"🐦", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"pájaro" },
        { palabras:["pez","peces","pecera"], img:"🐠", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"pez" },
        { palabras:["conejo","conejos","conejito"], img:"🐰", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"conejo" },
        { palabras:["tortuga","tortugas"], img:"🐢", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"tortuga" },
        { palabras:["vaca","vacas","ternera"], img:"🐄", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"vaca" },
        { palabras:["caballo","caballos","yegua","potro"], img:"🐴", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"caballo" },
        { palabras:["cerdo","cerdos","puerco","cochinillo"], img:"🐷", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"cerdo" },
        { palabras:["oveja","ovejas","cordero","borrego"], img:"🐑", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"oveja" },
        { palabras:["gallina","gallinas","pollo de granja"], img:"🐓", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"gallina" },
        { palabras:["pato","patos","patito"], img:"🦆", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"pato" },
        { palabras:["leon","león","leones","leona"], img:"🦁", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"león" },
        { palabras:["tigre","tigres"], img:"🐯", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"tigre" },
        { palabras:["oso","osos","osito","osa"], img:"🐻", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"oso", alternativas:[{source:"Mulberry",img:"🧸"}] },
        { palabras:["elefante","elefantes"], img:"🐘", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"elefante" },
        { palabras:["jirafa","jirafas"], img:"🦒", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"jirafa" },
        { palabras:["mono","monos","simio","primates"], img:"🐒", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"mono" },
        { palabras:["serpiente","serpientes","culebra","víbora"], img:"🐍", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"serpiente" },
        { palabras:["rana","ranas","sapo"], img:"🐸", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"rana" },
        { palabras:["pingüino","pingüinos","pinguino"], img:"🐧", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"pingüino" },
        { palabras:["delfín","delfines","delfin"], img:"🐬", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"delfín" },
        { palabras:["ballena","ballenas"], img:"🐳", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"ballena" },
        { palabras:["tiburon","tiburón","tiburones"], img:"🦈", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"tiburón" },
        { palabras:["mariposa","mariposas"], img:"🦋", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"mariposa" },
        { palabras:["dinosaurio","dinosaurios","dino"], img:"🦕", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"dinosaurio" },

        // ALIMENTOS — FRUTAS
        { palabras:["manzana","manzanas"], img:"🍎", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"manzana" },
        { palabras:["pera","peras"], img:"🍐", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"pera" },
        { palabras:["naranja","naranjas","mandarina","mandarinas"], img:"🍊", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"naranja" },
        { palabras:["limon","limón","limones","lima"], img:"🍋", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"limón" },
        { palabras:["plátano","platano","plátanos","banana","bananas"], img:"🍌", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"plátano" },
        { palabras:["sandia","sandía","melón","melon"], img:"🍉", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"sandía" },
        { palabras:["uva","uvas","racimo de uvas"], img:"🍇", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"uva" },
        { palabras:["fresa","fresas","fresón","fresones","frutilla"], img:"🍓", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"fresa" },
        { palabras:["melocotón","melocoton","durazno","duraznos"], img:"🍑", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"melocotón" },
        { palabras:["mango","mangos"], img:"🥭", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"mango" },
        { palabras:["piña","piñas","ananas"], img:"🍍", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"piña" },
        { palabras:["kiwi","kiwis"], img:"🥝", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"kiwi" },
        { palabras:["aguacate","aguacates","palta","paltas"], img:"🥑", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"aguacate" },

        // ALIMENTOS — VERDURAS
        { palabras:["zanahoria","zanahorias"], img:"🥕", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"zanahoria" },
        { palabras:["tomate","tomates"], img:"🍅", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"tomate" },
        { palabras:["lechuga","lechugas","ensalada"], img:"🥬", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"lechuga" },
        { palabras:["pepino","pepinos"], img:"🥒", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"pepino" },
        { palabras:["pimiento","pimientos","pimentón"], img:"🫑", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"pimiento" },
        { palabras:["cebolla","cebollas"], img:"🧅", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"cebolla" },
        { palabras:["patata","patatas","papa","papas"], img:"🥔", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"patata" },
        { palabras:["brócoli","brocoli","brécol"], img:"🥦", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"brócoli" },
        { palabras:["maíz","maiz","mazorca","elote","choclo"], img:"🌽", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"maíz" },
        { palabras:["champiñon","champiñones","seta","setas","hongo"], img:"🍄", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"seta" },

        // ALIMENTOS — COMIDAS Y BEBIDAS
        { palabras:["carne","carnes","filete","bistec","chuleta"], img:"🥩", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"carne" },
        { palabras:["pollo","pechuga","muslo de pollo","pollo asado"], img:"🍗", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"pollo" },
        { palabras:["pescado","merluza","salmón","salmon","bacalao","atún"], img:"🐟", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"pescado" },
        { palabras:["huevo","huevos","huevo frito","tortilla"], img:"🥚", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"huevo", alternativas:[{source:"Mulberry",img:"🍳"}] },
        { palabras:["leche","vasito de leche","brik de leche"], img:"🥛", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"leche" },
        { palabras:["queso","quesos","quesito"], img:"🧀", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"queso" },
        { palabras:["yogur","yogurt","yogures"], img:"🥛", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"yogur" },
        { palabras:["pan","barra de pan","rebanada","tostada","baguette"], img:"🍞", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"pan", alternativas:[{source:"Mulberry",img:"🥖"}] },
        { palabras:["pasta","macarrones","espaguetis","fideos"], img:"🍝", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"pasta" },
        { palabras:["arroz","arroz blanco","arroz con leche"], img:"🍚", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"arroz" },
        { palabras:["sopa","caldo","consomé","puré","crema de verduras"], img:"🍲", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"sopa" },
        { palabras:["pizza","pizzas"], img:"🍕", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"pizza" },
        { palabras:["hamburguesa","hamburguesas","burger"], img:"🍔", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"hamburguesa" },
        { palabras:["patatas fritas","papas fritas","fritas"], img:"🍟", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"patatas fritas" },
        { palabras:["tarta","pastel","torta","bizcocho","cake"], img:"🎂", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"tarta", alternativas:[{source:"Mulberry",img:"🍰"}] },
        { palabras:["galleta","galletas","cookie"], img:"🍪", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"galleta" },
        { palabras:["chocolate","chocolates","cacao","tableta de chocolate"], img:"🍫", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"chocolate" },
        { palabras:["helado","polo","helados","ice cream"], img:"🍦", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"helado" },
        { palabras:["caramelo","caramelos","chuche","gominola","dulce"], img:"🍬", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"caramelo" },
        { palabras:["agua","agua fría","botella de agua","vasito de agua"], img:"💧", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"agua", alternativas:[{source:"Mulberry",img:"🥤"}] },
        { palabras:["zumo","jugo","zumo de naranja","néctar"], img:"🥤", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"zumo" },
        { palabras:["leche chocolateada","colacao","cola cao","cacao","chocolate caliente"], img:"☕", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"colacao" },
        { palabras:["te","té","infusión","manzanilla","tila"], img:"☕", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"té" },
        { palabras:["refresco","cola","limonada","gaseosa"], img:"🥤", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"refresco" },

        // ROPA Y ACCESORIOS
        { palabras:["camiseta","camisetas","playera","polo"], img:"👕", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"camiseta" },
        { palabras:["pantalon","pantalón","pantalones","vaqueros","jeans"], img:"👖", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"pantalón" },
        { palabras:["vestido","vestidos","traje de fiesta"], img:"👗", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"vestido" },
        { palabras:["abrigo","abrigos","chaqueta","chaquetas","anorak","cazadora"], img:"🧥", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"abrigo" },
        { palabras:["jersey","jerseys","suéter","sudadera"], img:"🧤", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"jersey" },
        { palabras:["zapatos","zapato","zapatillas","tenis","sneakers"], img:"👟", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"zapatos" },
        { palabras:["calcetines","calcetín","medias"], img:"🧦", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"calcetines" },
        { palabras:["pijama","pijamas","bata","ropa de dormir"], img:"🩳", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"pijama" },
        { palabras:["gorra","gorras","sombrero","gorro"], img:"🧢", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"gorra" },
        { palabras:["bufanda","bufandas","pañuelo","fular"], img:"🧣", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"bufanda" },
        { palabras:["mochila","mochilas","bolsa","bolso","cartera"], img:"🎒", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"mochila" },

        // HOGAR Y MUEBLES
        { palabras:["casa","hogar","vivienda","piso","chalet","apartamento"], img:this._svgs.casa, cat:"lugares", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"casa", alternativas:[{source:"Mulberry",img:"🏘️"},{source:"Sclera",img:"🏠"}] },
        { palabras:["habitación","habitacion","dormitorio","cuarto"], img:"🛏️", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"dormitorio" },
        { palabras:["cocina","cuarto de cocina"], img:"🍳", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"cocina" },
        { palabras:["baño","cuarto de baño","aseo","lavabo","servicio","wc"], img:"🚿", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"baño" },
        { palabras:["salon","salón","sala de estar","living"], img:"🛋️", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"salón" },
        { palabras:["cama","camita","colchon","colchón"], img:"🛏️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"cama" },
        { palabras:["mesa","mesas","mesita"], img:"🪑", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"mesa" },
        { palabras:["silla","sillas","asiento"], img:"🪑", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"silla" },
        { palabras:["sofa","sofá","sillón"], img:"🛋️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"sofá" },
        { palabras:["puerta","puertas"], img:"🚪", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"puerta" },
        { palabras:["ventana","ventanas","cristal"], img:"🪟", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"ventana" },
        { palabras:["luz","bombilla","lámpara","lampara","foco"], img:"💡", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"lámpara" },
        { palabras:["television","televisión","tele","pantalla","tv"], img:"📺", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"televisión" },
        { palabras:["ordenador","computadora","laptop","portatil","portátil","pc"], img:"💻", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"ordenador" },
        { palabras:["movil","móvil","celular","teléfono","telefono","smartphone"], img:"📱", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"teléfono móvil" },
        { palabras:["nevera","frigorifico","frigorífico","refrigerador"], img:"🧊", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"nevera" },
        { palabras:["jabón","jabon","gel de ducha","champú"], img:"🧴", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"jabón" },
        { palabras:["papel higienico","papel higiénico","rollo de papel"], img:"🧻", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"papel higiénico" },
        { palabras:["toalla","toallas","paño"], img:"🏖️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"toalla" },
        { palabras:["inodoro","retrete","taza del baño","váter"], img:"🚽", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"inodoro" },
        { palabras:["bañera","bañeras","tina"], img:"🛁", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"bañera" },

        // ÚTILES ESCOLARES Y JUGUETES
        { palabras:["lapiz","lápiz","lápices","lapicero"], img:"✏️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"lápiz" },
        { palabras:["boligrafo","bolígrafo","boli","pluma"], img:"🖊️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"bolígrafo" },
        { palabras:["cuaderno","cuadernos","libreta","libretas"], img:"📓", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"cuaderno" },
        { palabras:["libro","libros","libro de texto"], img:"📚", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"libro" },
        { palabras:["tijeras","tijera"], img:"✂️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"tijeras" },
        { palabras:["pinturas","ceras","rotuladores","rotulador","pinceles"], img:"🎨", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"pinturas" },
        { palabras:["pelota","pelotas","balón","balon","bola"], img:"⚽", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"pelota", alternativas:[{source:"Mulberry",img:"🏀"}] },
        { palabras:["muñeca","muñecas","barbie","muñequita"], img:"👧", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"muñeca" },
        { palabras:["peluche","peluches","osito de peluche"], img:"🧸", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"peluche" },
        { palabras:["puzzle","rompecabezas","puzle"], img:"🧩", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"puzzle" },
        { palabras:["videojuego","videojuegos","consola","play","nintendo"], img:"🎮", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"videojuego" },
        { palabras:["bicicleta","bici","bicis","triciclo"], img:"🚲", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"bicicleta" },
        { palabras:["columpio","columpios","tobogán","tobogan"], img:"🛝", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"columpio" },
        { palabras:["globo","globos","globos de colores"], img:"🎈", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"globo" },

        // TRANSPORTES
        { palabras:["coche","carro","auto","automóvil","vehículo"], img:"🚗", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"coche", alternativas:[{source:"Mulberry",img:"🚙"}] },
        { palabras:["autobús","autobus","bus","buseta","guagua","micro"], img:"🚌", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"autobús" },
        { palabras:["metro","subway","subte","tren subterráneo"], img:"🚇", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"metro" },
        { palabras:["tren","trenes","ferrocarril","vagón"], img:"🚆", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"tren" },
        { palabras:["avion","avión","aeroplano","vuelo"], img:"✈️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"avión" },
        { palabras:["barco","barcos","barca","buque","ferri","ferry"], img:"⛵", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"barco" },
        { palabras:["taxi","taxis"], img:"🚕", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"taxi" },
        { palabras:["ambulancia","emergencias"], img:"🚑", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"ambulancia" },

        // NATURALEZA Y CLIMA
        { palabras:["sol","soleado","hace sol","día soleado"], img:"☀️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"sol", alternativas:[{source:"Mulberry",img:"🌞"}] },
        { palabras:["luna","luna llena","luna menguante"], img:"🌙", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"luna" },
        { palabras:["estrella","estrellas"], img:"⭐", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"estrella" },
        { palabras:["nube","nubes","nublado"], img:"☁️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"nube" },
        { palabras:["lluvia","lluvioso","llueve","llovizna","chubasco"], img:"🌧️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"lluvia" },
        { palabras:["nieve","nevado","nieva","nevando","copo de nieve"], img:"❄️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"nieve" },
        { palabras:["viento","hace viento","ventoso","brisa"], img:"💨", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"viento" },
        { palabras:["tormenta","truenos","rayos","relámpago"], img:"⛈️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"tormenta" },
        { palabras:["arcoiris","arco iris","arcoíris"], img:"🌈", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"arco iris" },
        { palabras:["árbol","arbol","árboles","arboles","pino","roble"], img:"🌳", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"árbol" },
        { palabras:["flor","flores","rosa","tulipán","margarita"], img:"🌸", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"flor" },
        { palabras:["hierba","pasto","césped","hoja","hojas"], img:"🌿", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"hierba" },
        { palabras:["mar","océano","playa","ola","olas"], img:"🌊", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"mar" },
        { palabras:["montaña","montañas","cerro","sierra","monte"], img:"⛰️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"montaña" },
        { palabras:["fuego","llama","hoguera","incendio"], img:"🔥", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"fuego" },

        // LUGARES
        { palabras:["colegio","escuela","cole","instituto","guardería"], img:"🏫", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"colegio" },
        { palabras:["parque","plaza","zona verde","parque de juegos"], img:"🌳", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"parque" },
        { palabras:["hospital","clinica","clínica","centro medico"], img:"🏥", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"hospital" },
        { palabras:["tienda","supermercado","mercado","comercio"], img:"🏪", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"supermercado" },
        { palabras:["playa","costa","orilla del mar"], img:"🏖️", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"playa" },
        { palabras:["piscina","piscinas"], img:"🏊", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"piscina" },
        { palabras:["ciudad","pueblo","municipio","localidad"], img:"🏙️", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"ciudad" },
        { palabras:["biblioteca","librería"], img:"📚", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"biblioteca" },
        { palabras:["farmacia","farmacias"], img:"💊", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"farmacia" },
        { palabras:["restaurante","bar","cafetería","cafeteria","comedor"], img:"🍴", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"restaurante" },
        { palabras:["zoo","zoologico","zoológico","parque zoológico"], img:"🦁", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"zoo" },
        { palabras:["cine","cinema","teatro","sala de cine"], img:"🎬", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"cine" },
        { palabras:["aeropuerto","terminal aérea"], img:"✈️", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"aeropuerto" },
        { palabras:["parque de atracciones","feria","funfair"], img:"🎡", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"parque de atracciones" },

        // EMOCIONES
        { palabras:["feliz","contento","alegre","satisfecho","me siento feliz","estar feliz"], img:this._svgs.feliz, cat:"emociones", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"feliz", alternativas:[{source:"Mulberry",img:"😊"},{source:"Sclera",img:"😃"}] },
        { palabras:["triste","entristecido","apenado","me siento triste","estar triste"], img:this._svgs.triste, cat:"emociones", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"triste", alternativas:[{source:"Mulberry",img:"😢"},{source:"Sclera",img:"😞"}] },
        { palabras:["enfadado","enojado","rabioso","furioso","con rabia","estar enfadado"], img:this._svgs.enfadado, cat:"emociones", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"enfadado", alternativas:[{source:"Mulberry",img:"😡"},{source:"Sclera",img:"🤬"}] },
        { palabras:["asustado","con miedo","tener miedo","miedo","da miedo","estar asustado"], img:this._svgs.miedo, cat:"emociones", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"miedo", alternativas:[{source:"Mulberry",img:"😱"},{source:"Sclera",img:"😨"}] },
        { palabras:["sorprendido","asombrado","sorpresa"], img:"😲", cat:"emociones", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"sorprendido" },
        { palabras:["nervioso","ansioso","preocupado","estresado"], img:"😰", cat:"emociones", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"nervioso" },
        { palabras:["cansado","agotado","fatigado","exhausto"], img:"😫", cat:"emociones", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"cansado" },
        { palabras:["aburrido","hastiado"], img:"🥱", cat:"emociones", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"aburrido" },
        { palabras:["hambre","tener hambre","hambrienta","hambriento","estoy con hambre"], img:"🍴", cat:"emociones", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"hambre" },
        { palabras:["sed","tener sed","sedienta","sediento","estoy con sed"], img:"💧", cat:"emociones", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"sed" },
        { palabras:["dolor","me duele","tengo dolor","sentir dolor"], img:this._svgs.dolor, cat:"emociones", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"dolor" },
        { palabras:["calor","hace calor","tengo calor","bochorno"], img:"🥵", cat:"emociones", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"calor" },
        { palabras:["frio","frío","hace frío","tengo frío"], img:"🥶", cat:"emociones", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"frío" },
        { palabras:["tranquilo","tranquila","calmado","relajado","sereno"], img:"😌", cat:"emociones", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"tranquilo" },
        { palabras:["vergüenza","avergonzado","me da vergüenza"], img:"😳", cat:"emociones", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"vergüenza" },
        { palabras:["solo","sola","solitario","soledad","me siento solo"], img:"😔", cat:"emociones", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"solo" },
        { palabras:["confundido","confusa","no entiendo","perdido","desorientado"], img:"😕", cat:"emociones", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"confundido" },
        { palabras:["enfermo","enferma","malo","mala","me siento mal"], img:"🤒", cat:"emociones", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"enfermo" },

        // ADJETIVOS DESCRIPTIVOS
        { palabras:["grande","grandes","enorme","gigante","muy grande"], img:"🐘", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"grande" },
        { palabras:["pequeño","pequeña","chiquito","diminuto","mini"], img:"🐭", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"pequeño" },
        { palabras:["largo","larga","alargado"], img:"📏", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"largo" },
        { palabras:["corto","corta","breve","reducido"], img:"📐", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"corto" },
        { palabras:["alto","alta","elevado"], img:"🏔️", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"alto" },
        { palabras:["bajo","baja","pequeño de altura"], img:"🌱", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"bajo" },
        { palabras:["bonito","bonita","hermoso","hermosa","lindo","guapo","precioso"], img:"💖", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"bonito" },
        { palabras:["feo","fea","horrible","desagradable"], img:"🤢", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"feo" },
        { palabras:["nuevo","nueva","nuevito","reciente"], img:"🆕", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"nuevo" },
        { palabras:["viejo","vieja","antiguo","antigua","usado"], img:"📦", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"viejo" },
        { palabras:["limpio","limpia","aseado","impecable"], img:"✨", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"limpio" },
        { palabras:["sucio","sucia","manchado","mugriento"], img:"🗑️", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"sucio" },
        { palabras:["caliente","calentito","ardiente","hirviendo"], img:"🔥", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"caliente" },
        { palabras:["helado","helada","fresco","fresca","frígido"], img:"🧊", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"frío" },
        { palabras:["rápido","rapido","veloz","rápida","deprisa"], img:"⚡", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"rápido" },
        { palabras:["lento","lenta","despacio","pausado"], img:"🐢", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"lento" },
        { palabras:["lleno","llena","completo"], img:"🫃", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"lleno" },
        { palabras:["vacio","vacío","vacía","sin nada"], img:"🫙", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"vacío" },

        // COLORES
        { palabras:["rojo","roja","rojos","rojas","color rojo","rojizo"], img:"🔴", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"rojo" },
        { palabras:["azul","azules","color azul","azulado"], img:"🔵", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"azul" },
        { palabras:["verde","verdes","color verde","verdoso"], img:"🟢", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"verde" },
        { palabras:["amarillo","amarilla","amarillos","color amarillo"], img:"🟡", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"amarillo" },
        { palabras:["naranja","anaranjado","color naranja"], img:"🟠", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"naranja color" },
        { palabras:["morado","morada","púrpura","purpura","violeta","lila"], img:"🟣", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"morado" },
        { palabras:["rosa","rosado","rosada","color rosa","fucsia"], img:"🩷", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"rosa color" },
        { palabras:["negro","negra","negros","color negro","oscuro"], img:"⬛", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"negro" },
        { palabras:["blanco","blanca","blancos","color blanco","pálido"], img:"⬜", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"blanco" },
        { palabras:["gris","grises","color gris"], img:"🩶", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"gris" },
        { palabras:["marron","marrón","cafe","café","color marrón","castaño"], img:"🟫", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"marrón" },
        { palabras:["dorado","dorada","color dorado","oro"], img:"🌟", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"dorado" },
        { palabras:["turquesa","aguamarina","celeste"], img:"🩵", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"celeste" },
        { palabras:["multicolor","arcoiris de colores","colorido","de colores"], img:"🌈", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"colores" },

        // NÚMEROS
        { palabras:["cero","ninguno","ninguna","0"], img:"0️⃣", cat:"objetos", gramatica:"numeral", source:"ARASAAC", arasaacQuery:"cero" },
        { palabras:["uno","una","1","primero","primera","un"], img:"1️⃣", cat:"objetos", gramatica:"numeral", source:"ARASAAC", arasaacQuery:"uno" },
        { palabras:["dos","2","segundo","segunda","pareja","doble"], img:"2️⃣", cat:"objetos", gramatica:"numeral", source:"ARASAAC", arasaacQuery:"dos" },
        { palabras:["tres","3","tercero","tercera","triple"], img:"3️⃣", cat:"objetos", gramatica:"numeral", source:"ARASAAC", arasaacQuery:"tres" },
        { palabras:["cuatro","4","cuarto","cuarta"], img:"4️⃣", cat:"objetos", gramatica:"numeral", source:"ARASAAC", arasaacQuery:"cuatro" },
        { palabras:["cinco","5","quinto","quinta"], img:"5️⃣", cat:"objetos", gramatica:"numeral", source:"ARASAAC", arasaacQuery:"cinco" },
        { palabras:["seis","6","sexto","sexta"], img:"6️⃣", cat:"objetos", gramatica:"numeral", source:"ARASAAC", arasaacQuery:"seis" },
        { palabras:["siete","7","séptimo","septimo"], img:"7️⃣", cat:"objetos", gramatica:"numeral", source:"ARASAAC", arasaacQuery:"siete" },
        { palabras:["ocho","8","octavo","octava"], img:"8️⃣", cat:"objetos", gramatica:"numeral", source:"ARASAAC", arasaacQuery:"ocho" },
        { palabras:["nueve","9","noveno","novena"], img:"9️⃣", cat:"objetos", gramatica:"numeral", source:"ARASAAC", arasaacQuery:"nueve" },
        { palabras:["diez","10","décimo","decimo"], img:"🔟", cat:"objetos", gramatica:"numeral", source:"ARASAAC", arasaacQuery:"diez" },
        { palabras:["veinte","20"], img:"2️⃣0️⃣", cat:"objetos", gramatica:"numeral", source:"ARASAAC", arasaacQuery:"veinte" },
        { palabras:["cien","100","ciento"], img:"💯", cat:"objetos", gramatica:"numeral", source:"ARASAAC", arasaacQuery:"cien" },
        { palabras:["mucho","mucha","muchos","muchas","bastante","demasiado"], img:"🔷", cat:"objetos", gramatica:"determinante", source:"ARASAAC", arasaacQuery:"mucho" },
        { palabras:["poco","poca","pocos","pocas","un poco","poquito"], img:"🔸", cat:"objetos", gramatica:"determinante", source:"ARASAAC", arasaacQuery:"poco" },
        { palabras:["todo","toda","todos","todas","todo entero"], img:"🌐", cat:"objetos", gramatica:"determinante", source:"ARASAAC", arasaacQuery:"todo" },
        { palabras:["primero","primer","primera","al principio"], img:"🥇", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"primero" },
        { palabras:["ultimo","último","última","al final","lo último"], img:"🔚", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"último" },
        { palabras:["siguiente","próximo","proxima","el que sigue"], img:"➡️", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"siguiente" },

        // TIEMPO Y RUTINAS
        { palabras:["hoy","este dia","en el dia de hoy"], img:"📅", cat:"otros", gramatica:"adverbio", source:"ARASAAC", arasaacQuery:"hoy" },
        { palabras:["mañana","el dia de mañana","al dia siguiente"], img:"🌅", cat:"otros", gramatica:"adverbio", source:"ARASAAC", arasaacQuery:"mañana" },
        { palabras:["ayer","el dia de ayer","anteayer"], img:"⬅️", cat:"otros", gramatica:"adverbio", source:"ARASAAC", arasaacQuery:"ayer" },
        { palabras:["ahora","en este momento","ya mismo","ahorita"], img:"⏰", cat:"otros", gramatica:"adverbio", source:"ARASAAC", arasaacQuery:"ahora" },
        { palabras:["antes","anteriormente","hace un momento"], img:"⬅️", cat:"otros", gramatica:"adverbio", source:"ARASAAC", arasaacQuery:"antes" },
        { palabras:["después","luego","mas tarde","más tarde","a continuación"], img:"➡️", cat:"otros", gramatica:"adverbio", source:"ARASAAC", arasaacQuery:"después" },
        { palabras:["siempre","en todo momento","constantemente"], img:"♾️", cat:"otros", gramatica:"adverbio", source:"ARASAAC", arasaacQuery:"siempre" },
        { palabras:["nunca","jamás","jamas"], img:"🚫", cat:"otros", gramatica:"adverbio", source:"ARASAAC", arasaacQuery:"nunca" },
        { palabras:["a veces","algunas veces","de vez en cuando"], img:"🔄", cat:"otros", gramatica:"adverbio", source:"ARASAAC", arasaacQuery:"a veces" },
        { palabras:["tarde","la tarde","por la tarde","vespertino"], img:"🌇", cat:"otros", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"tarde" },
        { palabras:["noche","la noche","por la noche","nocturno"], img:"🌃", cat:"otros", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"noche" },
        { palabras:["lunes","el lunes"], img:"📅", cat:"otros", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"lunes" },
        { palabras:["martes","el martes"], img:"📅", cat:"otros", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"martes" },
        { palabras:["miercoles","miércoles","el miércoles"], img:"📅", cat:"otros", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"miércoles" },
        { palabras:["jueves","el jueves"], img:"📅", cat:"otros", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"jueves" },
        { palabras:["viernes","el viernes"], img:"📅", cat:"otros", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"viernes" },
        { palabras:["sabado","sábado","el sábado"], img:"🎉", cat:"otros", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"sábado" },
        { palabras:["domingo","el domingo"], img:"😌", cat:"otros", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"domingo" },
        { palabras:["semana","esta semana","la semana que viene"], img:"📅", cat:"otros", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"semana" },
        { palabras:["fin de semana","weekend","finde"], img:"🎉", cat:"otros", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"fin de semana" },
        { palabras:["mes","meses","este mes"], img:"🗓️", cat:"otros", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"mes" },
        { palabras:["año","años","este año","año nuevo"], img:"🎊", cat:"otros", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"año" },
        { palabras:["primavera","en primavera"], img:"🌸", cat:"otros", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"primavera" },
        { palabras:["verano","en verano","calor de verano"], img:"☀️", cat:"otros", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"verano" },
        { palabras:["otoño","otono","en otoño"], img:"🍂", cat:"otros", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"otoño" },
        { palabras:["invierno","en invierno"], img:"❄️", cat:"otros", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"invierno" },

        // CELEBRACIONES Y CONECTORS
        { palabras:["cumpleaños","feliz cumpleaños","birthday","mi cumpleaños"], img:"🎂", cat:"otros", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"cumpleaños" },
        { palabras:["navidad","christmas","feliz navidad","navidades"], img:"🎄", cat:"otros", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"navidad" },
        { palabras:["fiesta","celebración","party","festejo"], img:"🎉", cat:"otros", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"fiesta" },
        { palabras:["vacaciones","días libres","holiday"], img:"🏖️", cat:"otros", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"vacaciones" },
        { palabras:["regalo","regalos","present","obsequio"], img:"🎁", cat:"otros", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"regalo" },
        { palabras:["buenos dias","dar los buenos dias","decir buenos dias"], img:"🌅", cat:"personas", gramatica:"interjección", source:"ARASAAC", arasaacQuery:"buenos días" },
        { palabras:["buenas noches","dar las buenas noches","decir buenas noches"], img:"🌃", cat:"personas", gramatica:"interjección", source:"ARASAAC", arasaacQuery:"buenas noches" },
        { palabras:["buenas tardes","dar las buenas tardes"], img:"🌇", cat:"personas", gramatica:"interjección", source:"ARASAAC", arasaacQuery:"buenas tardes" },
        { palabras:["habia una vez","había una vez","erase una vez","era una vez"], img:"📖", cat:"otros", gramatica:"conector", source:"ARASAAC", arasaacQuery:"había una vez" },
        { palabras:["fin del cuento","colorín colorado","fin de la historia"], img:"🔚", cat:"otros", gramatica:"conector", source:"ARASAAC", arasaacQuery:"fin" },
        { palabras:["encima","arriba","sobre","arriba de"], img:"⬆️", cat:"otros", gramatica:"adverbio", source:"ARASAAC", arasaacQuery:"encima" },
        { palabras:["debajo","abajo","debajo de"], img:"⬇️", cat:"otros", gramatica:"adverbio", source:"ARASAAC", arasaacQuery:"debajo" },
        { palabras:["dentro","adentro","dentro de","en el interior"], img:"📥", cat:"otros", gramatica:"adverbio", source:"ARASAAC", arasaacQuery:"dentro" },
        { palabras:["fuera","afuera","fuera de","al exterior"], img:"📤", cat:"otros", gramatica:"adverbio", source:"ARASAAC", arasaacQuery:"fuera" },
        { palabras:["cerca","al lado","junto a","próximo a"], img:"↔️", cat:"otros", gramatica:"adverbio", source:"ARASAAC", arasaacQuery:"cerca" },
        { palabras:["lejos","muy lejos","alejado","distante"], img:"🏔️", cat:"otros", gramatica:"adverbio", source:"ARASAAC", arasaacQuery:"lejos" },
        ];

        // Stop words
        const stopWords = [
            "el","la","los","las","un","una","unos","unas",
            "de","del","a","al","ante","bajo","con","contra",
            "desde","en","entre","hacia","hasta","para","por",
            "según","segun","sin","sobre","tras",
            "y","e","o","u","ni","que","pero","aunque","mas",
            "muy","tan","tanto","solo"
        ];

        // Combinar diccionario base + deportes/ejercicio + vocabulario extendido
        this.diccionario = this.expandDictionary([
            ...diccionario,
            ...this._buildSportsEntries(),
            ...this._buildExtendedEntries(),
        ]);
        this.stopWords = stopWords;
    }

    // ═══════════════════════════════════════════════════════════════════
    // _buildSportsEntries — 400+ entradas: deportes, ejercicio, fitness
    // ═══════════════════════════════════════════════════════════════════
    _buildSportsEntries() {
        return [
        // ─── DEPORTES DE PELOTA ───────────────────────────────────────
        { palabras:["fútbol","futbol","soccer","jugar al fútbol","partido de fútbol"], img:"⚽", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"fútbol" },
        { palabras:["baloncesto","basketball","básquet","basquet","jugar al baloncesto"], img:"🏀", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"baloncesto" },
        { palabras:["tenis","jugar al tenis","partido de tenis"], img:"🎾", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"tenis" },
        { palabras:["voleibol","volleyball","vóley","voley"], img:"🏐", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"voleibol" },
        { palabras:["balonmano","handball"], img:"🤾", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"balonmano" },
        { palabras:["rugby","rugby union"], img:"🏉", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"rugby" },
        { palabras:["béisbol","beisbol","baseball"], img:"⚾", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"béisbol" },
        { palabras:["softbol","softball"], img:"🥎", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"softball" },
        { palabras:["golf","jugar al golf"], img:"⛳", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"golf" },
        { palabras:["hockey","hockey sobre hielo","hockey hierba"], img:"🏒", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"hockey" },
        { palabras:["ping pong","tenis de mesa","pimpón"], img:"🏓", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"ping pong" },
        { palabras:["bádminton","badminton"], img:"🏸", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"bádminton" },
        { palabras:["fútbol americano","american football"], img:"🏈", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"fútbol americano" },
        { palabras:["billar","billar pool"], img:"🎱", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"billar" },
        { palabras:["bolos","bowling","bolera"], img:"🎳", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"bolos" },
        { palabras:["frisbee","disco volador","disco"], img:"🥏", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"frisbee" },
        
        // ─── DEPORTES ACUÁTICOS ───────────────────────────────────────
        { palabras:["natación","nadar","nadando","nado"], img:"🏊", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"nadar", alternativas:[{source:"Mulberry",img:"🏊‍♂️"}] },
        { palabras:["buceo","submarinismo","bucear","scuba"], img:"🤿", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"buceo" },
        { palabras:["surf","surfear","surfista","surfear olas"], img:"🏄", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"surf" },
        { palabras:["kayak","piragüismo","piragua","remar en kayak"], img:"🛶", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"kayak" },
        { palabras:["remo","barca de remos","remar"], img:"🚣", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"remo" },
        { palabras:["waterpolo","polo acuático"], img:"🏊", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"waterpolo" },
        { palabras:["windsurf","vela","velero"], img:"⛵", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"vela" },
        { palabras:["esquí acuático","esquí nautique"], img:"🏄", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"esquí acuático" },
        { palabras:["natación sincronizada","sincro"], img:"🏊", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"natación sincronizada" },
        
        // ─── DEPORTES DE INVIERNO ───────────────────────────────────────
        { palabras:["esquí","esquiar","ski","esquiador"], img:"⛷️", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"esquí" },
        { palabras:["snowboard","tabla de nieve","snowboarder"], img:"🏂", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"snowboard" },
        { palabras:["patinaje","patinar","pista de hielo","patines de hielo"], img:"⛸️", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"patinaje" },
        { palabras:["patinaje artístico","patinaje sobre hielo artístico"], img:"⛸️", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"patinaje artístico" },
        { palabras:["curling"], img:"🥌", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"curling" },
        
        // ─── ATLETISMO Y CARRERAS ─────────────────────────────────────
        { palabras:["carrera","correr","running","jogging","trotar"], img:"🏃", cat:"deportes", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"correr", alternativas:[{source:"Mulberry",img:"🏃‍♂️"},{source:"Sclera",img:"🏃‍♀️"}] },
        { palabras:["maratón","maraton","maratgón"], img:"🏅", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"maratón" },
        { palabras:["carrera de velocidad","sprint","esprintear"], img:"🏃", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"sprint" },
        { palabras:["salto de altura","saltar en alto"], img:"🏅", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"salto de altura" },
        { palabras:["salto de longitud","salto largo"], img:"🏅", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"salto de longitud" },
        { palabras:["salto con pértiga","pértiga"], img:"🏅", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"salto con pértiga" },
        { palabras:["lanzamiento de jabalina","jabalina"], img:"🏹", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"jabalina" },
        { palabras:["lanzamiento de disco","lanzar disco"], img:"🥏", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"lanzamiento de disco" },
        { palabras:["relevo","carrera de relevos","testigo"], img:"🏃", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"relevos" },
        { palabras:["vallas","carrera de vallas","obstáculos"], img:"🏃", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"vallas" },
        { palabras:["triatlon","triatlón","triathlon"], img:"🏅", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"triatlón" },
        
        // ─── CICLISMO ────────────────────────────────────────────────
        { palabras:["ciclismo","bicicleta","ciclista","montar en bicicleta","pedalear"], img:"🚴", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"ciclismo", alternativas:[{source:"Mulberry",img:"🚵"}] },
        { palabras:["bici de montaña","mountain bike","mtb","ciclismo de montaña"], img:"🚵", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"bicicleta de montaña" },
        { palabras:["bici estática","bicicleta estática","spinning","cicloindoor"], img:"🚴", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"bicicleta estática" },
        { palabras:["pedalear","pedal","pedaleo","dar pedales"], img:"🚴", cat:"deportes", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"pedalear" },
        
        // ─── ARTES MARCIALES Y DEPORTES DE CONTACTO ──────────────────
        { palabras:["karate","kárate","golpe de karate"], img:"🥋", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"karate", alternativas:[{source:"Mulberry",img:"🥊"}] },
        { palabras:["judo","yudo","judo tatami"], img:"🥋", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"judo" },
        { palabras:["taekwondo","tae kwondo"], img:"🥋", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"taekwondo" },
        { palabras:["boxeo","boxear","puñetazo","boxeador","pelea de boxeo"], img:"🥊", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"boxeo", alternativas:[{source:"Mulberry",img:"🤜"}] },
        { palabras:["lucha","wrestling","lucha libre","luchador"], img:"🤼", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"lucha" },
        { palabras:["esgrima","florete","tocar","asalto de esgrima"], img:"🤺", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"esgrima" },
        { palabras:["sumo","luchador de sumo"], img:"🤼", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"sumo" },
        { palabras:["aikido","kendo","artes marciales"], img:"🥋", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"artes marciales" },
        
        // ─── TIR Y PRECISIÓN ─────────────────────────────────────────
        { palabras:["tiro con arco","arquería","flecha","arco y flecha"], img:"🏹", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"tiro con arco" },
        { palabras:["tiro olímpico","pistola de tiro","escopeta de tiro"], img:"🎯", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"tiro" },
        { palabras:["dardos","juego de dardos"], img:"🎯", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"dardos" },
        
        // ─── DEPORTES DE MONTAÑA ─────────────────────────────────────
        { palabras:["escalada","escalar","rocódromo"], img:"🧗", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"escalada", alternativas:[{source:"Mulberry",img:"🧗‍♂️"}] },
        { palabras:["senderismo","hiking","trekking","senda","caminar por la montaña"], img:"🥾", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"senderismo" },
        { palabras:["montañismo","alpinismo","escalar montaña"], img:"⛰️", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"montañismo" },
        { palabras:["paracaidismo","paracaídas","saltar en paracaídas"], img:"🪂", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"paracaidismo" },
        { palabras:["ala delta","parapente","vuelo libre"], img:"🪂", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"parapente" },
        
        // ─── EQUITACIÓN Y OTROS ───────────────────────────────────────
        { palabras:["equitación","montar a caballo","hípica","jinete","cabalgata"], img:"🏇", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"equitación" },
        { palabras:["patineta","skateboard","skate","patinar"], img:"🛹", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"skateboard" },
        { palabras:["scooter","patinete","monopatín eléctrico"], img:"🛴", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"patinete" },
        { palabras:["balonvolea","volea","saque de volea"], img:"🏐", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"voleibol playa" },
        
        // ─── EJERCICIO EN GIMNASIO ───────────────────────────────────
        { palabras:["ejercicio","hacer ejercicio","entrenamiento","workout"], img:"💪", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"ejercicio", alternativas:[{source:"Mulberry",img:"🏋️"}] },
        { palabras:["pesas","levantar pesas","halterofilia","levantamiento de pesas","mancuernas"], img:"🏋️", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"pesas", alternativas:[{source:"Mulberry",img:"💪"},{source:"Sclera",img:"🏋️‍♂️"}] },
        { palabras:["musculación","muscularse","fortalecer","fuerza muscular"], img:"💪", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"musculación" },
        { palabras:["crossfit","entrenamiento funcional","functional training"], img:"🏋️", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"crossfit" },
        { palabras:["aeróbic","aerobic","aerobics","clase de aeróbic"], img:"🤸", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"aeróbic" },
        { palabras:["zumba","baile aeróbico","clase de baile"], img:"💃", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"zumba" },
        { palabras:["yoga","clase de yoga","postura de yoga","yogi"], img:"🧘", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"yoga", alternativas:[{source:"Mulberry",img:"🧘‍♀️"},{source:"Sclera",img:"🧘‍♂️"}] },
        { palabras:["meditación","meditar","mindfulness","concentración"], img:"🧘", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"meditación" },
        { palabras:["pilates","clase de pilates"], img:"🤸", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"pilates" },
        { palabras:["gimnasia","hacer gimnasia","clase de gimnasia","gimansta"], img:"🤸", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"gimnasia", alternativas:[{source:"Mulberry",img:"🤸‍♀️"}] },
        { palabras:["acrobacia","acróbata","acrobático","saltar acrobáticamente"], img:"🤸", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"acrobacia" },
        
        // ─── MOVIMIENTOS DE EJERCICIO ESPECÍFICOS ────────────────────
        { palabras:["flexiones","flexión","push-up","pushup","lagartijas"], img:"💪", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"flexiones", alternativas:[{source:"Mulberry",img:"🏋️"}] },
        { palabras:["abdominales","sentadillas abdominales","crunch"], img:"🏃", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"abdominales" },
        { palabras:["sentadilla","squat","sentadillas"], img:"🤸", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"sentadilla" },
        { palabras:["plancha","plank","aguantar la plancha"], img:"🤸", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"plancha ejercicio" },
        { palabras:["estiramiento","estirar","stretch","elongación","calentamiento"], img:"🤸", cat:"deportes", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"estiramiento" },
        { palabras:["calentamiento","calentar","warm up","precalentamiento"], img:"🏃", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"calentamiento" },
        { palabras:["enfriamiento","vuelta a la calma","cool down"], img:"🧘", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"relajación" },
        { palabras:["burpee","burpees"], img:"🤸", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"burpee" },
        { palabras:["jumping jack","tijeras","saltos de tijera"], img:"🤸", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"jumping jack" },
        { palabras:["zancada","lunge","estocada"], img:"🏃", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"zancada" },
        { palabras:["cuerda de saltar","saltar a la comba","comba","cuerda"], img:"⏩", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"saltar comba" },
        { palabras:["barra de dominadas","dominadas","pull-up","jalones"], img:"🏋️", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"dominadas" },
        { palabras:["fondos","fondo de triceps","dips"], img:"💪", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"ejercicio brazos" },
        { palabras:["crunch","abdominal crunch","encogimiento abdominal"], img:"💪", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"abdominales" },
        { palabras:["cardio","entrenamiento cardiovascular","resistencia"], img:"❤️", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"cardio" },
        { palabras:["andar a paso rápido","caminar rápido","marcha"], img:"🚶", cat:"deportes", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"marcha atlética" },
        { palabras:["remo indoor","remar en máquina","rowing machine"], img:"🚣", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"remo indoor" },
        { palabras:["elíptica","máquina elíptica","ejercicio elíptica"], img:"🏃", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"elíptica" },
        { palabras:["cinta de correr","treadmill","corro en cinta"], img:"🏃", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"cinta correr" },
        
        // ─── EQUIPO DEPORTIVO ─────────────────────────────────────────
        { palabras:["pelota de fútbol","balón de fútbol"], img:"⚽", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"balón de fútbol" },
        { palabras:["raqueta","raqueta de tenis"], img:"🎾", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"raqueta" },
        { palabras:["palo de golf","club de golf"], img:"⛳", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"palo de golf" },
        { palabras:["guantes de boxeo","guante de boxeo"], img:"🥊", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"guantes boxeo" },
        { palabras:["casco","casco de ciclismo","casco de seguridad"], img:"⛑️", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"casco" },
        { palabras:["red de voley","red deportiva","portería"], img:"🥅", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"red" },
        { palabras:["piscina","pista de atletismo","campo de deportes","estadio"], img:"🏟️", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"pista deportiva" },
        { palabras:["cronómetro","tiempo de carrera","tiempo deportivo"], img:"⏱️", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"cronómetro" },
        
        // ─── EVENTOS Y COMPETICIÓN ────────────────────────────────────
        { palabras:["olimpiadas","juegos olímpicos","olimpismo"], img:"🥇", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"olimpiadas" },
        { palabras:["medalla","ganar medalla","medalla de oro"], img:"🏅", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"medalla" },
        { palabras:["trofeo","copa","ganar el trofeo","campeón"], img:"🏆", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"trofeo" },
        { palabras:["competición","competir","competencia","torneo"], img:"🏅", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"competición" },
        { palabras:["entrenador","entrenadora","coach","monitor deportivo"], img:"👨‍🏫", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"entrenador" },
        { palabras:["árbitro","referee","juez deportivo"], img:"🦺", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"árbitro" },
        { palabras:["equipo","equipo deportivo","compañeros de equipo"], img:"👥", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"equipo deportivo" },
        { palabras:["jugador","jugadora","atleta","deportista"], img:"🏅", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"atleta" },
        { palabras:["hincha","aficionado","fan","seguidor","barra brava"], img:"📣", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"hincha" },
        { palabras:["derrota","perder el partido","resultado negativo"], img:"😔", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"derrota" },
        { palabras:["victoria","ganar el partido","resultado positivo","triunfo"], img:"🏆", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"victoria" },
        { palabras:["marca personal","record personal","mejor marca"], img:"📈", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"record" },
        
        // ─── BIENESTAR Y SALUD FÍSICA ────────────────────────────────
        { palabras:["deporte","hacer deporte","actividad física","practicar deporte"], img:"🏅", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"deporte" },
        { palabras:["saludable","sano","fit","en forma","buena salud"], img:"💚", cat:"deportes", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"saludable" },
        { palabras:["agotamiento","agotado después del ejercicio","sin fuerzas"], img:"😫", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"agotamiento" },
        { palabras:["hidratación","beber agua después de ejercicio","agua deportiva"], img:"💧", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"hidratación" },
        { palabras:["proteína","batido de proteínas","suplemento"], img:"💊", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"proteína" },
        { palabras:["músculo","músculos","masa muscular"], img:"💪", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"músculo" },
        { palabras:["lesion","lesión deportiva","torcedura","esguince","rotura muscular"], img:"🩹", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"lesión" },
        { palabras:["fisioterapia","fisioterapeuta","rehabilitación deportiva"], img:"🩺", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"fisioterapia" },
        { palabras:["masaje","dar masaje","masaje muscular","relajar músculos"], img:"💆", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"masaje" },
        { palabras:["relajación","relajarse","descanso corporal"], img:"😌", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"relajación" },
        
        // ─── DEPORTES ESPECIALES / PARALÍMPICOS ──────────────────────
        { palabras:["deporte adaptado","deporte paralímpico","silla de ruedas deportiva"], img:"♿", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"deporte adaptado" },
        { palabras:["rugby en silla de ruedas","baloncesto en silla"], img:"🏀", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"baloncesto silla de ruedas" },
        { palabras:["natación adaptada","nadar con discapacidad"], img:"🏊", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"natación adaptada" },
        { palabras:["boccia","bocce","petanca"], img:"🎯", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"boccia" },

        // ─── DANZA Y ACTIVIDADES RÍTMICAS ────────────────────────────
        { palabras:["ballet","danza clásica","bailarina de ballet","punta"], img:"🩰", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"ballet" },
        { palabras:["baile","danza","danzar","bailar con música"], img:"🕺", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"baile", alternativas:[{source:"Mulberry",img:"💃"},{source:"Sclera",img:"🎵"}] },
        { palabras:["flamenco","danza flamenca","zapateado"], img:"💃", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"flamenco" },
        { palabras:["hip hop","baile urbano","breakdance","street dance"], img:"🕺", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"hip hop baile" },
        { palabras:["salsa","merengue","cumbia","baile latino"], img:"💃", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"salsa baile" },
        { palabras:["contemporáneo","danza contemporánea"], img:"🤸", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"danza contemporánea" },
        { palabras:["ritmo","llevar el ritmo","al ritmo de la música"], img:"🎵", cat:"deportes", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"ritmo" },
        ];
    }

    // ═══════════════════════════════════════════════════════════════════
    // _buildExtendedEntries — 300+ entradas adicionales de vocabulario
    // ═══════════════════════════════════════════════════════════════════
    _buildExtendedEntries() {
        return [
        // ─── PROFESIONES Y OFICIOS ────────────────────────────────────
        { palabras:["abogado","abogada","letrado","jurista"], img:"⚖️", cat:"personas", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"abogado" },
        { palabras:["arquitecto","arquitecta","diseñar edificios"], img:"🏗️", cat:"personas", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"arquitecto" },
        { palabras:["astronauta","cosmonauta","explorador espacial"], img:"👨‍🚀", cat:"personas", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"astronauta" },
        { palabras:["camarero","camarera","mesero","mesera","mozo"], img:"🧑‍🍳", cat:"personas", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"camarero" },
        { palabras:["carpintero","carpintera","ebanista"], img:"🪚", cat:"personas", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"carpintero" },
        { palabras:["conductor","conductora","taxista","chofer"], img:"🚗", cat:"personas", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"conductor" },
        { palabras:["dentista","odontólogo","odontóloga"], img:"🦷", cat:"personas", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"dentista" },
        { palabras:["diseñador","diseñadora","artista gráfico","ilustrador"], img:"🎨", cat:"personas", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"diseñador" },
        { palabras:["electricista","electrico","técnico eléctrico"], img:"⚡", cat:"personas", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"electricista" },
        { palabras:["enfermero","enfermera","auxiliar de enfermería"], img:"👨‍⚕️", cat:"personas", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"enfermero" },
        { palabras:["fontanero","plomero","fontanera","plomera"], img:"🔧", cat:"personas", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"fontanero" },
        { palabras:["fotógrafo","fotografa","fotografia profesional"], img:"📷", cat:"personas", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"fotógrafo" },
        { palabras:["informático","programador","desarrollador","programadora","coder"], img:"💻", cat:"personas", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"programador" },
        { palabras:["ingeniero","ingeniera","técnico superior"], img:"⚙️", cat:"personas", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"ingeniero" },
        { palabras:["jardinero","jardinera","paisajista"], img:"🌱", cat:"personas", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"jardinero" },
        { palabras:["mecánico","mecánica","técnico de coches"], img:"🔧", cat:"personas", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"mecánico" },
        { palabras:["músico","músicos","instrumentista"], img:"🎸", cat:"personas", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"músico" },
        { palabras:["panadero","panadera","panadería"], img:"🥖", cat:"personas", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"panadero" },
        { palabras:["peluquero","peluquera","barbero","barbera"], img:"💇", cat:"personas", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"peluquero" },
        { palabras:["piloto","piloto de avión","aviador"], img:"👨‍✈️", cat:"personas", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"piloto" },
        { palabras:["pintor","pintora","pintor de paredes"], img:"🎨", cat:"personas", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"pintor" },
        { palabras:["psicólogo","psicóloga","terapeuta"], img:"🧠", cat:"personas", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"psicólogo" },
        { palabras:["científico","científica","investigador","laboratorio"], img:"🔬", cat:"personas", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"científico" },
        { palabras:["veterinario","veterinaria","vet"], img:"🐾", cat:"personas", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"veterinario" },
        
        // ─── TECNOLOGÍA Y MEDIOS ─────────────────────────────────────
        { palabras:["internet","red","wifi","conexión a internet","en línea"], img:"🌐", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"internet" },
        { palabras:["correo electrónico","email","mandar email","enviar correo"], img:"📧", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"correo electrónico" },
        { palabras:["redes sociales","instagram","facebook","twitter","tiktok"], img:"📱", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"redes sociales" },
        { palabras:["video","vídeo","grabación","filming","clip"], img:"📹", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"vídeo" },
        { palabras:["fotografía","foto","imagen","sacar foto","captura de pantalla"], img:"📷", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"fotografía" },
        { palabras:["altavoz","speaker","bocina","bafle"], img:"🔊", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"altavoz" },
        { palabras:["auriculares","cascos","earphones","headphones"], img:"🎧", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"auriculares" },
        { palabras:["micrófono","micro","microfono"], img:"🎤", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"micrófono" },
        { palabras:["radio","emisora","escuchar la radio"], img:"📻", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"radio" },
        { palabras:["impresora","imprimir","imprimir documento"], img:"🖨️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"impresora" },
        { palabras:["ratón","mouse","ratón de ordenador"], img:"🖱️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"ratón ordenador" },
        { palabras:["teclado","keyboard","teclado de ordenador"], img:"⌨️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"teclado" },
        { palabras:["USB","pendrive","memoria USB","llave USB"], img:"💾", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"pendrive" },
        { palabras:["batería","pila","carga","cocinar eléctrico"], img:"🔋", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"batería eléctrica" },
        { palabras:["robot","androide","inteligencia artificial"], img:"🤖", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"robot" },
        
        // ─── MÚSICA E INSTRUMENTOS ────────────────────────────────────
        { palabras:["guitarra","guitarra eléctrica","tocar la guitarra"], img:"🎸", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"guitarra" },
        { palabras:["piano","tocar el piano","teclado musical"], img:"🎹", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"piano" },
        { palabras:["batería musical","batería de música","tambores","tocar la batería"], img:"🥁", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"batería musical" },
        { palabras:["violín","tocar el violín","cuerdas"], img:"🎻", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"violín" },
        { palabras:["trompeta","tocar la trompeta","viento metal"], img:"🎺", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"trompeta" },
        { palabras:["saxofón","saxo","tocar el saxo"], img:"🎷", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"saxofón" },
        { palabras:["flauta","tocar la flauta","flauta travesera"], img:"🎵", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"flauta" },
        { palabras:["música","escuchar música","melodía","canción"], img:"🎵", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"música", alternativas:[{source:"Mulberry",img:"🎶"},{source:"Sclera",img:"🎼"}] },
        { palabras:["nota musical","partitura","solfeo"], img:"🎼", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"partitura" },
        { palabras:["concierto","espectáculo musical","recital"], img:"🎸", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"concierto" },
        
        // ─── ARTE Y CREATIVIDAD ───────────────────────────────────────
        { palabras:["escultura","esculpir","clay","arcilla","modelado"], img:"🏺", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"escultura" },
        { palabras:["teatro","obra de teatro","dramatizar","actor","actriz"], img:"🎭", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"teatro" },
        { palabras:["fotografía artística","arte fotográfico","exposición de fotos"], img:"🖼️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"arte" },
        { palabras:["collage","hacer un collage","recortar y pegar"], img:"📐", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"collage" },
        { palabras:["manualidades","manualidad","hacer manualidades","arte manual"], img:"✂️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"manualidades" },
        { palabras:["punto","tejer","costura","coser","hilo"], img:"🧵", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"costura" },
        
        // ─── MATERIAS ESCOLARES ───────────────────────────────────────
        { palabras:["matemáticas","matematicas","mates","cálculo","algebra"], img:"🔢", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"matemáticas" },
        { palabras:["lengua","clase de lengua","gramática","redacción","literatura"], img:"📝", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"lengua" },
        { palabras:["inglés","ingles","clase de inglés","idioma inglés"], img:"🇬🇧", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"inglés" },
        { palabras:["ciencias naturales","ciencias","biología","naturaleza en clase"], img:"🔬", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"ciencias naturales" },
        { palabras:["historia","clase de historia","pasado histórico"], img:"📜", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"historia" },
        { palabras:["geografía","geografia","mapa","países"], img:"🗺️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"geografía" },
        { palabras:["educación física","educación fisica","EF","PE","clase de deportes"], img:"🏅", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"educación física" },
        { palabras:["música en clase","clase de música","educación musical"], img:"🎵", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"música escolar" },
        { palabras:["plástica","educación plástica","arte en clase","dibujo en clase"], img:"🎨", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"educación plástica" },
        { palabras:["deberes","tarea escolar","homework","hacer los deberes"], img:"📚", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"deberes" },
        { palabras:["examen","prueba escolar","test","evaluación"], img:"📝", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"examen" },
        { palabras:["nota","calificación","aprobado","suspendido"], img:"📊", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"calificación" },
        { palabras:["recreo","descanso escolar","patio del recreo"], img:"🛝", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"recreo" },
        
        // ─── EMOCIONES AVANZADAS ─────────────────────────────────────
        { palabras:["ilusión","tener ilusión","emocionado con algo","esperanza"], img:"✨", cat:"emociones", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"ilusión" },
        { palabras:["decepción","decepcionado","desilusionado","me ha decepcionado"], img:"😞", cat:"emociones", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"decepcionado" },
        { palabras:["rabia","tener rabia","mucha rabia","rabioso"], img:"😤", cat:"emociones", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"rabia" },
        { palabras:["frustración","frustrado","frustradísimo"], img:"😤", cat:"emociones", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"frustración" },
        { palabras:["nostalgia","añoranza","echo de menos","extrañar"], img:"😢", cat:"emociones", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"nostalgia" },
        { palabras:["curiosidad","curioso","curiosa","tengo curiosidad"], img:"🤔", cat:"emociones", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"curiosidad" },
        { palabras:["confianza","confiar","confiado","me siento seguro"], img:"💪", cat:"emociones", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"confianza" },
        { palabras:["alivio","aliviado","me siento aliviado","por fin"], img:"😮‍💨", cat:"emociones", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"alivio" },
        { palabras:["entusiasmo","entusiasmado","con ganas","emocionado con las ganas"], img:"🤩", cat:"emociones", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"entusiasmo" },
        { palabras:["timidez","tímido","vergüenza de hablar","me da vergüenza con gente"], img:"😳", cat:"emociones", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"timidez" },
        
        // ─── SALUD Y CUERPO ───────────────────────────────────────────
        { palabras:["alergia","alérgico","alérgica","reacción alérgica"], img:"🤧", cat:"emociones", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"alergia" },
        { palabras:["asma","inhalador","dificultad respirar"], img:"💊", cat:"emociones", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"asma" },
        { palabras:["gripe","resfriado","catarro","estar acatarrado"], img:"🤒", cat:"emociones", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"gripe" },
        { palabras:["fiebre","temperatura","tener fiebre","termómetro"], img:"🌡️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"fiebre" },
        { palabras:["pastilla","tableta","medicamento","tomar pastilla"], img:"💊", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"pastilla" },
        { palabras:["jarabe","medicina líquida","tomar jarabe"], img:"🍶", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"jarabe" },
        { palabras:["inyección","vacuna","pincharse","ir al médico vacuna"], img:"💉", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"inyección" },
        { palabras:["venda","vendaje","poner una venda","curita"], img:"🩹", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"venda" },
        { palabras:["cirugía","operación","quirófano","ir al quirófano"], img:"🔬", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"cirugía" },
        { palabras:["silla de ruedas","wheelchair","movilidad reducida"], img:"♿", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"silla de ruedas" },
        { palabras:["muleta","apoyo ortopédico","caminar con muletas"], img:"🩼", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"muleta" },
        { palabras:["gafas auditivas","audífono","sordera","no oír bien"], img:"🦻", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"audífono" },
        
        // ─── VIAJES Y TRANSPORTE ─────────────────────────────────────
        { palabras:["viaje","viajar","ir de viaje","excursión","trip"], img:"🧳", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"viaje" },
        { palabras:["maleta","bolsa de viaje","hacer la maleta"], img:"🧳", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"maleta" },
        { palabras:["pasaporte","documento de viaje"], img:"🛂", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"pasaporte" },
        { palabras:["hotel","hostal","alojamiento","dormir en hotel","habitación hotel"], img:"🏨", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"hotel" },
        { palabras:["mapa","plano","orientarse","callejero","GPS"], img:"🗺️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"mapa" },
        { palabras:["semáforo","luz de tráfico","cruzar por el semáforo"], img:"🚦", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"semáforo" },
        { palabras:["carretera","autopista","autovía","vía"], img:"🛣️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"carretera" },
        { palabras:["aparcamiento","parking","aparcar el coche"], img:"🅿️", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"aparcamiento" },
        { palabras:["estación de tren","estación","andén"], img:"🚉", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"estación de tren" },
        { palabras:["parada de autobús","parar el autobús","esperar el bus"], img:"🚏", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"parada de autobús" },
        
        // ─── COMIDA AVANZADA ─────────────────────────────────────────
        { palabras:["ensalada","ensalada verde","lechuga con tomate"], img:"🥗", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"ensalada" },
        { palabras:["paella","arroz con mariscos","arroz valenciano"], img:"🥘", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"paella" },
        { palabras:["cocido","puchero","olla","guiso"], img:"🍲", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"cocido" },
        { palabras:["gazpacho","sopa fría","salmorejo"], img:"🍲", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"gazpacho" },
        { palabras:["tortilla española","tortilla patatas","tortilla de patatas"], img:"🍳", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"tortilla española" },
        { palabras:["croquetas","croqueta","fritura"], img:"🥘", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"croquetas" },
        { palabras:["bocadillo","bocata","emparedado","sándwich mixto"], img:"🥪", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"bocadillo" },
        { palabras:["churros","chocolate con churros","porras"], img:"🍩", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"churros" },
        { palabras:["flan","natillas","pudding","postre frío"], img:"🍮", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"flan" },
        { palabras:["aceite","aceite de oliva","aceite vegetal"], img:"🫙", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"aceite" },
        { palabras:["sal","pimienta","condimento","especias"], img:"🧂", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"sal" },
        { palabras:["vinagre","aliño","aliñar la ensalada"], img:"🫙", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"vinagre" },
        { palabras:["azúcar","azucar","endulzar"], img:"🍬", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"azúcar" },
        { palabras:["harina","masa","amasar"], img:"🥣", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"harina" },
        { palabras:["frutos secos","nueces","almendras","cacahuetes","pistachos"], img:"🥜", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"frutos secos" },
        { palabras:["pavo","turkey","pavo navideño"], img:"🦃", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"pavo" },
        { palabras:["marisco","langosta","cangrejo","gambas","mejillones"], img:"🦞", cat:"alimentos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"marisco" },
        
        // ─── HIGIENE Y RUTINAS ────────────────────────────────────────
        { palabras:["crema","pomada","crema hidratante","ponerse crema"], img:"🧴", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"crema" },
        { palabras:["desodorante","antitranspirante","ponerse desodorante"], img:"🧴", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"desodorante" },
        { palabras:["afeitarse","maquinilla","rasurar"], img:"🪒", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"afeitarse" },
        { palabras:["maquillaje","pintarse","maquillarse","pintalabios"], img:"💄", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"maquillaje" },
        { palabras:["cepillo de pelo","cepillo del pelo","peineta"], img:"💇", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"cepillo pelo" },
        { palabras:["reciclar","reciclaje","cubo de reciclaje","separar basura"], img:"♻️", cat:"acciones", gramatica:"verbo", source:"ARASAAC", arasaacQuery:"reciclar" },
        { palabras:["basura","cubo de basura","tirar a la basura","lata"], img:"🗑️", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"basura" },
        
        // ─── NATURALEZA EXTENDIDA ─────────────────────────────────────
        { palabras:["animales de la granja","granja","corral"], img:"🐄", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"granja" },
        { palabras:["jardín","huerto","cultivar","plantar"], img:"🌱", cat:"lugares", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"jardín" },
        { palabras:["insecto","bicho","cucaracha","mosca"], img:"🐛", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"insecto" },
        { palabras:["cielo","firmamento","astronomía"], img:"🌌", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"cielo" },
        { palabras:["planeta","marte","júpiter","sistema solar"], img:"🪐", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"planeta" },
        { palabras:["espacio","universo","cosmos","galaxia","vía láctea"], img:"🌌", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"espacio exterior" },
        { palabras:["terremoto","tsunami","catástrofe natural","erupción"], img:"🌋", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"terremoto" },
        { palabras:["arrecife","coral","fondo del mar"], img:"🪸", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"arrecife" },
        
        // ─── CONCEPTOS ABSTRACTOS Y CAA ───────────────────────────────
        { palabras:["diferente","distinto","no igual","otro diferente"], img:"🔀", cat:"otros", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"diferente" },
        { palabras:["igual","mismo","idéntico","parecido"], img:"🟰", cat:"otros", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"igual" },
        { palabras:["porque","razón","motivo","el porqué"], img:"❓", cat:"otros", gramatica:"conector", source:"ARASAAC", arasaacQuery:"porque" },
        { palabras:["pero","sin embargo","aunque","excepto que"], img:"↔️", cat:"otros", gramatica:"conector", source:"ARASAAC", arasaacQuery:"pero" },
        { palabras:["y","además","y también","con","junto a"], img:"➕", cat:"otros", gramatica:"conector", source:"ARASAAC", arasaacQuery:"y" },
        { palabras:["o","o bien","opciones","elegir entre"], img:"🔀", cat:"otros", gramatica:"conector", source:"ARASAAC", arasaacQuery:"o" },
        { palabras:["si condicional","si puedo","si quiero","condición"], img:"🔀", cat:"otros", gramatica:"conector", source:"ARASAAC", arasaacQuery:"si condicional" },
        { palabras:["verdad","cierto","es verdad","no mentira"], img:"✅", cat:"otros", gramatica:"otro", source:"ARASAAC", arasaacQuery:"verdad" },
        { palabras:["mentira","falso","no es verdad","engaño"], img:"❌", cat:"otros", gramatica:"otro", source:"ARASAAC", arasaacQuery:"mentira" },
        { palabras:["pregunta","hacer una pregunta","tengo una duda"], img:"❓", cat:"otros", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"pregunta" },
        { palabras:["respuesta","contestar","la respuesta es"], img:"💬", cat:"otros", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"respuesta" },
        { palabras:["norma","regla","cumplir las normas","reglas del juego"], img:"📋", cat:"otros", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"norma" },
        { palabras:["turno","esperar turno","es mi turno","me toca"], img:"🔢", cat:"otros", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"turno" },
        { palabras:["cambio","cambiar","alternativa","otra opción"], img:"🔄", cat:"otros", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"cambio" },
        { palabras:["problema","hay un problema","surgió un problema"], img:"⚠️", cat:"otros", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"problema" },
        { palabras:["solución","resolver","encontrar la solución"], img:"💡", cat:"otros", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"solución" },
        { palabras:["dinero","euro","dólares","moneda","billete"], img:"💶", cat:"objetos", gramatica:"sustantivo", source:"ARASAAC", arasaacQuery:"dinero" },
        { palabras:["barato","económico","precio bajo","oferta","ganga"], img:"💰", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"barato" },
        { palabras:["caro","precio alto","costoso","muy caro"], img:"💸", cat:"objetos", gramatica:"adjetivo", source:"ARASAAC", arasaacQuery:"caro" },
        ];
    }

    // ═══════════════════════════════════════════════════════════════════
    // _buildMassiveWordMap: construye el mapa masivo de palabras
    // palabra_normalizada → consulta ARASAAC
    // Este mapa da acceso a 12.000+ pictogramas reales cuando online
    // ─────────────────────────────────────────────────────────────────
    _buildMassiveWordMap() {
        return {
            // COMUNICACIÓN
            'si':'sí','vale':'sí','ok':'sí','correcto':'sí','afirmativo':'sí','exacto':'sí',
            'no':'no','nay':'no','negativo':'no','negacion':'no','jamas':'nunca',
            'quiero':'querer','queria':'querer','quise':'querer','quisieras':'querer',
            'necesito':'necesitar','necesitas':'necesitar','necesita':'necesitar',
            'ayuda':'ayuda','socorro':'ayuda','auxilio':'ayuda','asistencia':'ayuda',
            'mas':'más','otro':'más','otra':'más',
            'parar':'parar','stop':'parar','alto':'parar','basta':'parar',
            'espera':'esperar','aguarda':'esperar','momento':'esperar',
            // VERBOS IRREGULARES SER
            'ser':'ser','soy':'ser','eres':'ser','somos':'ser','sois':'ser','son':'ser',
            'era':'ser','eras':'ser','eramos':'ser','eran':'ser',
            'fue':'ser','fui':'ser','fuiste':'ser','fuimos':'ser','fueron':'ser',
            'siendo':'ser','sido':'ser',
            // ESTAR
            'estar':'estar','estoy':'estar','estas':'estar','esta':'estar',
            'estamos':'estar','estais':'estar','estan':'estar',
            'estaba':'estar','estabas':'estar','estabamos':'estar','estaban':'estar',
            'estuve':'estar','estuvo':'estar','estuviste':'estar',
            'estuvimos':'estar','estuvieron':'estar',
            'estando':'estar','estado':'estar',
            // TENER
            'tener':'tener','tengo':'tener','tienes':'tener','tiene':'tener',
            'tenemos':'tener','teneis':'tener','tienen':'tener',
            'tenia':'tener','tenias':'tener','teniamos':'tener','tenian':'tener',
            'tuvo':'tener','tuve':'tener','tuviste':'tener',
            'tuvimos':'tener','tuvieron':'tener',
            'tenido':'tener','teniendo':'tener',
            // IR
            'ir':'ir','voy':'ir','vas':'ir','va':'ir',
            'vamos':'ir','vais':'ir','van':'ir',
            'iba':'ir','ibas':'ir','ibamos':'ir','iban':'ir',
            'ido':'ir','yendo':'ir',
            // HACER
            'hacer':'hacer','hago':'hacer','haces':'hacer','hace':'hacer',
            'hacemos':'hacer','haceis':'hacer','hacen':'hacer',
            'hacia':'hacer','hacias':'hacer','haciamos':'hacer','hacian':'hacer',
            'hizo':'hacer','hice':'hacer','hiciste':'hacer','hicimos':'hacer',
            'hicieron':'hacer','hecho':'hacer','haciendo':'hacer',
            // PODER
            'poder':'poder','puedo':'poder','puedes':'poder','puede':'poder',
            'podemos':'poder','podeis':'poder','pueden':'poder',
            'podia':'poder','podias':'poder','podiamos':'poder','podian':'poder',
            'pudo':'poder','pude':'poder','pudiste':'poder',
            'pudimos':'poder','pudieron':'poder',
            'podido':'poder','pudiendo':'poder',
            // QUERER
            'querer':'querer','quieres':'querer','queremos':'querer','quereis':'querer',
            'quieren':'querer','querido':'poder','queriendo':'querer',
            'quiso':'querer','quisiste':'querer','quisimos':'querer',
            'quisieron':'querer',
            // DECIR
            'decir':'decir','digo':'decir','dices':'decir','dice':'decir',
            'decimos':'decir','decis':'decir','dicen':'decir',
            'decia':'decir','decias':'decir','deciamos':'decir','decian':'decir',
            'dijo':'decir','dije':'decir','dijiste':'decir',
            'dijimos':'decir','dijeron':'decir',
            'dicho':'decir','diciendo':'decir',
            // DAR
            'dar':'dar','doy':'dar','das':'dar','da':'dar',
            'damos':'dar','dais':'dar','dan':'dar',
            'daba':'dar','dabas':'dar','dabamos':'dar','daban':'dar',
            'dio':'dar','di':'dar','diste':'dar',
            'dimos':'dar','dieron':'dar','dado':'dar','dando':'dar',
            // VER
            'ver':'ver','veo':'ver','ves':'ver',
            'vemos':'ver','veis':'ver','ven':'ver',
            'veia':'ver','veias':'ver','veiamos':'ver','veian':'ver',
            'vio':'ver','vi':'ver','viste':'ver',
            'vimos':'ver','vieron':'ver','visto':'ver','viendo':'ver',
            // SABER
            'saber':'saber','se':'saber','sabes':'saber','sabe':'saber',
            'sabemos':'saber','sabeis':'saber','saben':'saber',
            'sabia':'saber','sabias':'saber','sabiamos':'saber','sabian':'saber',
            'supo':'saber','supe':'saber','supiste':'saber',
            'supimos':'saber','supieron':'saber',
            'sabido':'saber','sabiendo':'saber',
            // VENIR
            'venir':'venir','vengo':'venir','vienes':'venir','viene':'venir',
            'venimos':'venir','venis':'venir','vienen':'venir',
            'venia':'venir','venias':'venir','veniamos':'venir','venian':'venir',
            'vino':'venir','vine':'venir','viniste':'venir',
            'vinimos':'venir','vinieron':'venir',
            'venido':'venir','viniendo':'venir',
            // VERBOS REGULARES AR
            'hablar':'hablar','hablo':'hablar','hablas':'hablar','habla':'hablar',
            'hablamos':'hablar','hablais':'hablar','hablan':'hablar',
            'hablaba':'hablar','hablabas':'hablar','hablaban':'hablar',
            'hablo':'hablar','hable':'hablar','hablaste':'hablar',
            'hablaron':'hablar','hablado':'hablar','hablando':'hablar',
            'caminar':'caminar','camino':'caminar','caminas':'caminar',
            'caminamos':'caminar','caminan':'caminar','caminaba':'caminar',
            'caminando':'caminar','caminado':'caminar',
            'jugar':'jugar','juego':'jugar','juegas':'jugar','juega':'jugar',
            'jugamos':'jugar','jugaban':'jugar','jugaba':'jugar',
            'jugo':'jugar','jugaste':'jugar','jugaron':'jugar',
            'jugando':'jugar','jugado':'jugar',
            'comprar':'comprar','compro':'comprar','compras':'comprar',
            'compramos':'comprar','compran':'comprar','compraba':'comprar',
            'compro':'comprar','compraste':'comprar','compraron':'comprar',
            'comprando':'comprar','comprado':'comprar',
            'trabajar':'trabajar','trabajo':'trabajar','trabajas':'trabajar',
            'trabaja':'trabajar','trabajamos':'trabajar','trabajan':'trabajar',
            'trabajaba':'trabajar','trabajo':'trabajar','trabajaste':'trabajar',
            'trabajaron':'trabajar','trabajando':'trabajar','trabajado':'trabajar',
            'limpiar':'limpiar','limpio':'limpiar','limpias':'limpiar',
            'limpiamos':'limpiar','limpian':'limpiar','limpiaba':'limpiar',
            'limpiando':'limpiar','limpiado':'limpiar',
            'cocinar':'cocinar','cocino':'cocinar','cocinas':'cocinar',
            'cocinamos':'cocinar','cocinan':'cocinar','cocinaba':'cocinar',
            'cocinando':'cocinar','cocinado':'cocinar',
            'estudiar':'estudiar','estudio':'estudiar','estudias':'estudiar',
            'estudiamos':'estudiar','estudian':'estudiar','estudiaba':'estudiar',
            'estudiando':'estudiar','estudiado':'estudiar',
            'llamar':'llamar por teléfono','llamo':'llamar por teléfono',
            'llamas':'llamar por teléfono','llamamos':'llamar por teléfono',
            'llamaba':'llamar por teléfono','llamando':'llamar por teléfono',
            'cantar':'cantar','canto':'cantar','cantas':'cantar',
            'cantamos':'cantar','cantan':'cantar','cantaba':'cantar',
            'cantando':'cantar','cantado':'cantar',
            'bailar':'bailar','bailo':'bailar','bailas':'bailar',
            'bailamos':'bailar','bailan':'bailar','bailaba':'bailar',
            'bailando':'bailar','bailado':'bailar',
            'dibujar':'dibujar','dibujo':'dibujar','dibujas':'dibujar',
            'dibujamos':'dibujar','dibujan':'dibujar','dibujaba':'dibujar',
            'dibujando':'dibujar','dibujado':'dibujar',
            'pintar':'pintar','pinto':'pintar','pintas':'pintar',
            'pintamos':'pintar','pintan':'pintar','pintaba':'pintar',
            'pintando':'pintar','pintado':'pintar',
            'escribir':'escribir','escribo':'escribir','escribes':'escribir',
            'escribimos':'escribir','escriben':'escribir','escribia':'escribir',
            'escribiendo':'escribir','escrito':'escribir',
            'leer':'leer','leo':'leer','lees':'leer','lee':'leer',
            'leemos':'leer','leen':'leer','leia':'leer',
            'leyendo':'leer','leido':'leer',
            // VERBOS COMUNES ER/IR
            'comer':'comer','como':'comer','comes':'comer',
            'comemos':'comer','comen':'comer','comia':'comer',
            'comio':'comer','comiste':'comer','comieron':'comer',
            'comiendo':'comer','comido':'comer',
            'beber':'beber','bebo':'beber','bebes':'beber','bebe':'beber',
            'bebemos':'beber','beben':'beber','bebia':'beber',
            'bebio':'beber','bebiste':'beber','bebieron':'beber',
            'bebiendo':'beber','bebido':'beber',
            'dormir':'dormir','duermo':'dormir','duermes':'dormir',
            'dormimos':'dormir','duermen':'dormir','dormia':'dormir',
            'durmio':'dormir','dormiste':'dormir','durmieron':'dormir',
            'durmiendo':'dormir','dormido':'dormir',
            'correr':'correr','corro':'correr','corres':'correr','corre':'correr',
            'corremos':'correr','corren':'correr','corria':'correr',
            'corrio':'correr','corriste':'correr','corrieron':'correr',
            'corriendo':'correr','corrido':'correr',
            'saltar':'saltar','salto':'saltar','saltas':'saltar',
            'saltamos':'saltar','saltan':'saltar','saltaba':'saltar',
            'saltando':'saltar','saltado':'saltar',
            'nadar':'nadar','nado':'nadar','nadas':'nadar',
            'nadamos':'nadar','nadan':'nadar','nadaba':'nadar',
            'nadando':'nadar','nadado':'nadar',
            'llorar':'llorar','lloro':'llorar','lloras':'llorar',
            'lloramos':'llorar','lloran':'llorar','lloraba':'llorar',
            'llorando':'llorar','llorado':'llorar',
            'reir':'reír','rio':'reír','ries':'reír',
            'reimos':'reír','rien':'reír','reia':'reír',
            'riendo':'reír','reido':'reír',
            'sentir':'sentir','siento':'sentir','sientes':'sentir',
            'sentimos':'sentir','sienten':'sentir','sentia':'sentir',
            'sintio':'sentir','sentiste':'sentir','sintieron':'sentir',
            'sintiendo':'sentir','sentido':'sentir',
            'abrir':'abrir','abro':'abrir','abres':'abrir',
            'abrimos':'abrir','abren':'abrir','abria':'abrir',
            'abrio':'abrir','abriste':'abrir','abrieron':'abrir',
            'abriendo':'abrir','abierto':'abrir',
            'cerrar':'cerrar','cierro':'cerrar','cierras':'cerrar',
            'cerramos':'cerrar','cierran':'cerrar','cerraba':'cerrar',
            'cerrado':'cerrar','cerrando':'cerrar',
            'ayudar':'ayuda','ayudo':'ayuda','ayudas':'ayuda','ayuda':'ayuda',
            'ayudamos':'ayuda','ayudan':'ayuda','ayudaba':'ayuda',
            'ayudando':'ayuda','ayudado':'ayuda',
            'pedir':'pedir','pido':'pedir','pides':'pedir','pide':'pedir',
            'pedimos':'pedir','piden':'pedir','pedia':'pedir',
            'pidio':'pedir','pediste':'pedir','pidieron':'pedir',
            'pidiendo':'pedir','pedido':'pedir',
            'subir':'subir','subo':'subir','subes':'subir','sube':'subir',
            'subimos':'subir','suben':'subir','subia':'subir',
            'subio':'subir','subiste':'subir','subieron':'subir',
            'subiendo':'subir','subido':'subir',
            'bajar':'bajar','bajo':'bajar','bajas':'bajar','baja':'bajar',
            'bajamos':'bajar','bajan':'bajar','bajaba':'bajar',
            'bajo':'bajar','bajaste':'bajar','bajaron':'bajar',
            'bajando':'bajar','bajado':'bajar',
            'entrar':'entrar','entro':'entrar','entras':'entrar',
            'entramos':'entrar','entran':'entrar','entraba':'entrar',
            'entro':'entrar','entraste':'entrar','entraron':'entrar',
            'entrando':'entrar','entrado':'entrar',
            'salir':'salir','salgo':'salir','sales':'salir',
            'salimos':'salir','salen':'salir','salia':'salir',
            'salio':'salir','saliste':'salir','salieron':'salir',
            'saliendo':'salir','salido':'salir',
            'escuchar':'escuchar','escucho':'escuchar','escuchas':'escuchar',
            'escuchamos':'escuchar','escuchan':'escuchar','escuchaba':'escuchar',
            'escuchando':'escuchar','escuchado':'escuchar',
            'oir':'escuchar','oigo':'escuchar','oyes':'escuchar','oye':'escuchar',
            'oimos':'escuchar','oyen':'escuchar','oia':'escuchar',
            'mirar':'ver','miro':'ver','miras':'ver','mira':'ver',
            'miramos':'ver','miran':'ver','miraba':'ver',
            'mirando':'ver','mirado':'ver',
            'buscar':'buscar','busco':'buscar','buscas':'buscar',
            'buscamos':'buscar','buscan':'buscar','buscaba':'buscar',
            'buscando':'buscar','buscado':'buscar',
            'encontrar':'buscar','encuentro':'buscar','encuentras':'buscar',
            'encontramos':'buscar','encuentran':'buscar','encontraba':'buscar',
            'encontrando':'buscar','encontrado':'buscar',
            'pagar':'pagar','pago':'pagar','pagas':'pagar',
            'pagamos':'pagar','pagan':'pagar','pagaba':'pagar',
            'pagando':'pagar','pagado':'pagar',
            'pensar':'pensar','pienso':'pensar','piensas':'pensar',
            'pensamos':'pensar','piensan':'pensar','pensaba':'pensar',
            'pensando':'pensar','pensado':'pensar',
            'terminar':'terminar','termino':'terminar','terminas':'terminar',
            'terminamos':'terminar','terminan':'terminar','terminaba':'terminar',
            'terminando':'terminar','terminado':'terminar',
            'empezar':'empezar','empienzo':'empezar','empiezas':'empezar',
            'empezamos':'empezar','empiezan':'empezar','empezaba':'empezar',
            'empezando':'empezar','empezado':'empezar',
            'ganar':'ganar','gano':'ganar','ganas':'ganar',
            'ganamos':'ganar','ganan':'ganar','ganaba':'ganar',
            'ganando':'ganar','ganado':'ganar',
            'perder':'perder','pierdo':'perder','pierdes':'perder',
            'perdemos':'perder','pierden':'perder','perdia':'perder',
            'perdiendo':'perder','perdido':'perder',
            'volar':'volar','vuelo':'volar','vuelas':'volar',
            'volamos':'volar','vuelan':'volar','volaba':'volar',
            'volando':'volar','volado':'volar',
            'besar':'besar','beso':'besar','besamos':'besar',
            'besando':'besar','besado':'besar',
            'abrazar':'abrazar','abrazo':'abrazar','abrazamos':'abrazar',
            'abrazando':'abrazar','abrazado':'abrazar',
            'ducharse':'ducharse','ducha':'ducharse',
            'ducho':'ducharse','duchamos':'ducharse','duchando':'ducharse',
            'vestirse':'vestirse','viste':'vestirse','vistiendose':'vestirse',
            'desvestirse':'desvestirse','desvistiendo':'desvestirse',
            'peinarse':'peinarse','peinandose':'peinarse',
            'levantarse':'levantarse','levantandose':'levantarse',
            'sentarse':'sentarse','sentandose':'sentarse',
            'tumbarse':'tumbarse','tumbandose':'tumbarse',
            // PERSONAS Y FAMILIA
            'mama':'madre','madre':'madre','mami':'madre',
            'papa':'padre','padre':'padre','papi':'padre',
            'hermano':'hermano','hermana':'hermana','hermanos':'hermano',
            'abuelo':'abuelo','abuela':'abuela','abuelos':'abuelo',
            'tio':'tío','tia':'tía','tios':'tío','tias':'tía',
            'primo':'primo','prima':'prima','primos':'primo',
            'nino':'niño','nina':'niña','ninos':'niño','ninas':'niña',
            'bebe':'bebé','bebes':'bebé','beby':'bebé',
            'adulto':'hombre','adulta':'mujer',
            'senor':'hombre','senora':'mujer','senorita':'mujer',
            'amigo':'amigo','amiga':'amiga','amigos':'amigo','amigas':'amiga',
            'familia':'familia','familiares':'familia',
            'profe':'profesor','profesor':'profesor','profesora':'profesor',
            'maestro':'profesor','maestra':'profesor','seño':'profesor',
            'medico':'médico','medica':'médico','doctor':'médico','doctora':'médico',
            'policia':'policía','bombero':'bombero','cocinero':'cocinero',
            // ANIMALES
            'perro':'perro','perra':'perro','perros':'perro','can':'perro',
            'cachorro':'perro','cachorrito':'perro','chucho':'perro',
            'gato':'gato','gata':'gato','gatos':'gato','gatito':'gato',
            'minino':'gato','michino':'gato','michi':'gato',
            'pajaro':'pájaro','pajaros':'pájaro','ave':'pájaro',
            'pajarito':'pájaro','pajarillo':'pájaro',
            'pez':'pez','peces':'pez','pecesito':'pez',
            'conejo':'conejo','conejos':'conejo','conejito':'conejo',
            'hamster':'hámster','hamstercito':'hámster',
            'tortuga':'tortuga','tortugas':'tortuga',
            'vaca':'vaca','vacas':'vaca','ternera':'vaca',
            'toro':'toro','buey':'toro',
            'caballo':'caballo','caballos':'caballo','yegua':'caballo','potro':'caballo',
            'burro':'burro','asno':'burro','borrico':'burro',
            'cerdo':'cerdo','cerdos':'cerdo','puerco':'cerdo','cochinillo':'cerdo',
            'oveja':'oveja','ovejas':'oveja','cordero':'oveja','borrego':'oveja',
            'gallina':'gallina','gallinas':'gallina',
            'gallo':'gallina','gallos':'gallina',
            'pato':'pato','patos':'pato','pata':'pato','patito':'pato',
            'cabra':'cabra','cabras':'cabra','chivo':'cabra',
            'leon':'león','leona':'león','leones':'león',
            'tigre':'tigre','tigresa':'tigre','tigres':'tigre',
            'oso':'oso','osa':'oso','osito':'oso',
            'elefante':'elefante','elefanta':'elefante','elefantes':'elefante',
            'jirafa':'jirafa','jirafas':'jirafa',
            'mono':'mono','mona':'mono','simio':'mono','monos':'mono',
            'serpiente':'serpiente','culebra':'serpiente','vibora':'serpiente',
            'cocodrilo':'cocodrilo','caiman':'cocodrilo',
            'rana':'rana','sapo':'rana','ranita':'rana',
            'pinguino':'pingüino','pinguinos':'pingüino',
            'delfin':'delfín','delfines':'delfín',
            'ballena':'ballena','ballenas':'ballena',
            'tiburon':'tiburón','tiburones':'tiburón',
            'pulpo':'pulpo','calamar':'pulpo',
            'abeja':'abeja','abejas':'abeja',
            'mariposa':'mariposa','mariposas':'mariposa',
            'arana':'araña','aranas':'araña','tela':'araña',
            'hormiga':'hormiga','hormigas':'hormiga',
            'caracol':'caracol','caracoles':'caracol',
            'loro':'loro','loros':'loro','papagayo':'loro',
            'buho':'búho','lechuza':'búho','mochuelo':'búho',
            'aguila':'águila','aguilas':'águila',
            'dinosaurio':'dinosaurio','dinosaurios':'dinosaurio','dino':'dinosaurio',
            // ALIMENTOS FRUTAS
            'manzana':'manzana','manzanas':'manzana',
            'pera':'pera','peras':'pera',
            'naranja':'naranja','naranjas':'naranja','mandarina':'naranja',
            'limon':'limón','limones':'limón','lima':'limón',
            'platano':'plátano','platanos':'plátano','banana':'plátano',
            'sandia':'sandía','melon':'melón',
            'uva':'uva','uvas':'uva','racimo':'uva',
            'fresa':'fresa','fresas':'fresa','freson':'fresa','frutilla':'fresa',
            'melocoton':'melocotón','durazno':'melocotón',
            'mango':'mango','mangos':'mango',
            'pina':'piña','ananas':'piña',
            'kiwi':'kiwi','kiwis':'kiwi',
            'aguacate':'aguacate','palta':'aguacate',
            'arandano':'arándano','mora':'arándano','moras':'arándano',
            'cereza':'cereza','cerezas':'cereza',
            'ciruela':'ciruela','ciruelas':'ciruela',
            'higo':'higo','higos':'higo',
            'coco':'coco','cocos':'coco',
            'pomelo':'pomelo','toronja':'pomelo',
            // ALIMENTOS VERDURAS
            'zanahoria':'zanahoria','zanahorias':'zanahoria',
            'tomate':'tomate','tomates':'tomate','jitomate':'tomate',
            'lechuga':'lechuga','lechugas':'lechuga','ensalada':'lechuga',
            'pepino':'pepino','pepinos':'pepino','pepinillo':'pepino',
            'pimiento':'pimiento','pimientos':'pimiento','pimenton':'pimiento',
            'cebolla':'cebolla','cebollas':'cebolla','cebolleta':'cebolla',
            'ajo':'ajo','ajos':'ajo','ajito':'ajo',
            'patata':'patata','papa':'patata','papas':'patata','patatas':'patata',
            'brocoli':'brócoli','brecol':'brócoli','coliflor':'brócoli',
            'maiz':'maíz','mazorca':'maíz','elote':'maíz','choclo':'maíz',
            'espinaca':'espinaca','espinacas':'espinaca',
            'calabaza':'calabaza','zapallo':'calabaza','zucchini':'calabaza',
            'champinon':'champiñón','seta':'champiñón','hongo':'champiñón',
            'guisante':'guisante','arveja':'guisante','chicharos':'guisante',
            'judias':'judías verdes','vainita':'judías verdes',
            'remolacha':'remolacha','betarraga':'remolacha',
            'apio':'apio','apios':'apio',
            'berenjena':'berenjena','berenjenas':'berenjena',
            'alcachofa':'alcachofa','alcachofas':'alcachofa',
            'puerro':'puerro','puerros':'puerro',
            'ñame':'ñame','yuca':'ñame',
            // ALIMENTOS COCINADOS Y BEBIDAS
            'carne':'carne','carnes':'carne','filete':'carne','bistec':'carne',
            'chuleta':'carne','chuleton':'carne',
            'pollo':'pollo','pechugas':'pollo','muslo':'pollo',
            'jamon':'jamón','embutido':'jamón','salchichon':'jamón',
            'pescado':'pescado','merluza':'pescado','salmon':'pescado',
            'bacalao':'pescado','atun':'pescado','sardina':'pescado',
            'huevo':'huevo','huevos':'huevo','tortilla':'huevo',
            'leche':'leche','lacteo':'leche','brik':'leche',
            'queso':'queso','quesito':'queso',
            'yogur':'yogur','yogurt':'yogur',
            'mantequilla':'mantequilla','manteca':'mantequilla',
            'pan':'pan','rebanada':'pan','tostada':'pan','baguette':'pan',
            'pasta':'pasta','macarrones':'pasta','espaguetis':'pasta',
            'fideos':'pasta','tallarines':'pasta',
            'arroz':'arroz','paella':'arroz',
            'sopa':'sopa','caldo':'sopa','consomé':'sopa','pure':'sopa',
            'crema':'sopa',
            'pizza':'pizza','pizzas':'pizza',
            'hamburguesa':'hamburguesa','burger':'hamburguesa',
            'bocadillo':'sandwich','bocata':'sandwich',
            'sandwich':'sandwich','sandwiche':'sandwich',
            'tarta':'tarta','pastel':'tarta','torta':'tarta',
            'bizcocho':'tarta','cake':'tarta','magdalena':'tarta',
            'galleta':'galleta','galletas':'galleta','cookie':'galleta',
            'chocolate':'chocolate','cacao':'chocolate',
            'helado':'helado','polo':'helado','sorbete':'helado',
            'caramelo':'caramelo','chuche':'caramelo','gominola':'caramelo',
            'miel':'miel','mermelada':'miel',
            'cereal':'cereales','granola':'cereales','muesli':'cereales',
            'agua':'agua','botella':'agua','vasito':'agua',
            'zumo':'zumo','jugo':'zumo','nectar':'zumo',
            'batido':'batido','smoothie':'batido','milkshake':'batido',
            'refresco':'refresco','cola':'refresco','limonada':'refresco',
            'te':'té','infusion':'té','manzanilla':'té','tila':'té',
            'cafe':'café','colacao':'colacao','cachets':'café',
            'salchicha':'salchicha','frankfurt':'salchicha',
            // ROPA Y ACCESORIOS
            'camiseta':'camiseta','camisetas':'camiseta','playera':'camiseta','polo':'camiseta',
            'camisa':'camisa','camisas':'camisa','blusa':'camisa','blusas':'camisa',
            'pantalon':'pantalón','pantalones':'pantalón','vaqueros':'pantalón','jeans':'pantalón',
            'falda':'falda','faldas':'falda','minifalda':'falda',
            'vestido':'vestido','vestidos':'vestido','traje':'vestido',
            'abrigo':'abrigo','abrigos':'abrigo','chaqueta':'abrigo','anorak':'abrigo',
            'jersey':'jersey','sueter':'jersey','sudadera':'jersey','buzo':'jersey',
            'zapatos':'zapatos','zapatillas':'zapatos','tenis':'zapatos','sneakers':'zapatos',
            'botas':'botas','bota':'botas','botines':'botas',
            'sandalias':'zapatos','chanclas':'zapatos',
            'calcetines':'calcetines','calcetin':'calcetines','medias':'calcetines',
            'calzoncillo':'ropa interior','braga':'ropa interior',
            'pijama':'pijama','bata':'pijama',
            'gorra':'gorra','gorras':'gorra','sombrero':'gorra','gorro':'gorra',
            'bufanda':'bufanda','panuelo':'bufanda','fular':'bufanda',
            'guantes':'guantes','guante':'guantes','manopla':'guantes',
            'mochila':'mochila','bolsa':'mochila','bolso':'mochila','cartera':'mochila',
            'gafas':'gafas','lentes':'gafas','anteojos':'gafas',
            'corbata':'corbata','cinturon':'cinturón',
            // HOGAR Y MUEBLES
            'casa':'casa','hogar':'casa','vivienda':'casa','piso':'casa','chalet':'casa',
            'apartamento':'casa','domicilio':'casa','edificio':'casa',
            'habitacion':'dormitorio','dormitorio':'dormitorio','cuarto':'dormitorio',
            'cocina':'cocina','salon':'salón','bano':'baño','aseo':'baño',
            'jardin':'jardín','terraza':'jardín','balcon':'jardín',
            'escalera':'escalera','escaleras':'escalera',
            'cama':'cama','colchon':'cama','camita':'cama',
            'almohada':'almohada','cojin':'almohada','manta':'almohada',
            'edredon':'almohada','sabana':'almohada',
            'mesa':'mesa','mesita':'mesa','escritorio':'mesa',
            'silla':'silla','asiento':'silla','taburete':'silla',
            'sofa':'sofá','silion':'sofá','sillon':'sofá',
            'armario':'armario','guardarropa':'armario','ropero':'armario',
            'puerta':'puerta','porton':'puerta',
            'ventana':'ventana','cristal':'ventana','balcon':'ventana',
            'lampara':'lámpara','bombilla':'lámpara','luz':'lámpara',
            'television':'televisión','tele':'televisión','pantalla':'televisión',
            'ordenador':'ordenador','computadora':'ordenador','pc':'ordenador',
            'portatil':'ordenador','laptop':'ordenador',
            'movil':'teléfono móvil','celular':'teléfono móvil',
            'telefono':'teléfono móvil','smartphone':'teléfono móvil',
            'tablet':'teléfono móvil','ipad':'teléfono móvil',
            'nevera':'nevera','frigorifico':'nevera','refrigerador':'nevera',
            'lavadora':'lavadora','lavarropa':'lavadora',
            'horno':'horno','microondas':'horno',
            'jabon':'jabón','gel':'jabón','champu':'jabón',
            'papel':'papel higiénico','rollo':'papel higiénico',
            'toalla':'toalla','pano':'toalla',
            'inodoro':'inodoro','retrete':'inodoro','vater':'inodoro',
            'banera':'bañera','tina':'bañera',
            'ducha':'ducharse','grifo':'grifo',
            // ÚTILES ESCOLARES Y JUGUETES
            'lapiz':'lápiz','bolígrafo':'bolígrafo','boli':'bolígrafo',
            'cuaderno':'cuaderno','libreta':'cuaderno',
            'libro':'libro',
            'tijeras':'tijeras','goma':'goma de borrar','borrador':'goma de borrar',
            'regla':'regla','pegamento':'pegamento','cola':'pegamento',
            'pinturas':'pinturas','ceras':'pinturas','rotuladores':'pinturas',
            'pizarra':'pizarra','encerado':'pizarra',
            'pelota':'pelota','balon':'pelota','bola':'pelota',
            'muneca':'muñeca','barbie':'muñeca',
            'peluche':'peluche','osito':'peluche',
            'puzzle':'puzzle','rompecabezas':'puzzle',
            'consola':'videojuego','videojuego':'videojuego','joystick':'videojuego',
            'bicicleta':'bicicleta','bici':'bicicleta','triciclo':'bicicleta',
            'columpio':'columpio','tobogan':'tobogán',
            'globo':'globo','cometa':'cometa',
            'cochecito':'coche de juguete','tren de juguete':'tren',
            'dinosaurio de juguete':'dinosaurio',
            // TRANSPORTES
            'coche':'coche','carro':'coche','auto':'coche','automovil':'coche',
            'vehiculo':'coche','camioneta':'coche',
            'autobus':'autobús','bus':'autobús','microbus':'autobús',
            'metro':'metro','subte':'metro','subway':'metro',
            'tren':'tren','ferrocarril':'tren','vagon':'tren',
            'avion':'avión','aeroplane':'avión','vuelo':'avión',
            'barco':'barco','barca':'barco','buque':'barco','ferri':'barco',
            'moto':'moto','motocicleta':'moto',
            'taxi':'taxi','taxista':'taxi',
            'ambulancia':'ambulancia',
            'bicicleta':'bicicleta','patinete':'patinete','patines':'patinete',
            'helicoptero':'helicóptero',
            'cohete':'cohete','nave':'cohete','astronauta':'cohete',
            // NATURALEZA Y CLIMA
            'sol':'sol','soleado':'sol','sunshine':'sol',
            'luna':'luna','astro':'luna','satelite':'luna',
            'estrella':'estrella','estrellas':'estrella',
            'nube':'nube','nubes':'nube','nublado':'nube',
            'lluvia':'lluvia','chubasco':'lluvia','aguacero':'lluvia',
            'nieve':'nieve','nevada':'nieve','copos':'nieve',
            'viento':'viento','brisa':'viento','vendaval':'viento',
            'tormenta':'tormenta','trueno':'tormenta','relampago':'tormenta',
            'arcoiris':'arco iris','rainbow':'arco iris',
            'arbol':'árbol','arboles':'árbol','pino':'árbol','roble':'árbol',
            'flor':'flor','flores':'flor','rosa':'flor','tulipan':'flor',
            'hierba':'hierba','pasto':'hierba','cesped':'hierba',
            'hoja':'hoja','hojas':'hoja',
            'mar':'mar','oceano':'mar','ola':'mar',
            'rio':'río','lago':'río','laguna':'río',
            'montana':'montaña','cerro':'montaña','sierra':'montaña',
            'desierto':'desierto','arena':'desierto',
            'selva':'bosque','jungla':'bosque','bosque':'bosque',
            'fuego':'fuego','llama':'fuego','hoguera':'fuego','incendio':'fuego',
            'tierra':'tierra','mundo':'tierra','planeta':'tierra',
            // LUGARES
            'colegio':'colegio','escuela':'colegio','cole':'colegio',
            'instituto':'colegio','guarderia':'guardería','preescolar':'guardería',
            'parque':'parque','plaza':'parque','zona verde':'parque',
            'hospital':'hospital','clinica':'hospital',
            'tienda':'supermercado','supermercado':'supermercado','mercado':'supermercado',
            'playa':'playa','costa':'playa',
            'piscina':'piscina','alberca':'piscina',
            'ciudad':'ciudad','pueblo':'ciudad','villa':'ciudad',
            'calle':'calle','avenida':'calle','carretera':'calle',
            'biblioteca':'biblioteca','libreria':'biblioteca',
            'farmacia':'farmacia','drogueria':'farmacia',
            'restaurante':'restaurante','cafeteria':'restaurante','bar':'restaurante',
            'zoo':'zoo','zoologico':'zoo',
            'cine':'cine','cinema':'cine','teatro':'cine',
            'aeropuerto':'aeropuerto','terminal':'aeropuerto',
            'parque atracciones':'parque de atracciones','feria':'parque de atracciones',
            'iglesia':'iglesia','templo':'iglesia','catedral':'iglesia',
            'banco':'banco','cajero':'banco',
            'museo':'museo','galeria':'museo','exposicion':'museo',
            'estadio':'estadio','campo':'estadio',
            'gimnasio':'gimnasio','polideportivo':'gimnasio',
            // EMOCIONES Y ESTADOS
            'feliz':'feliz','contento':'feliz','alegre':'feliz','satisfecho':'feliz',
            'triste':'triste','apenado':'triste','melancólico':'triste',
            'enfadado':'enfadado','enojado':'enfadado','furioso':'enfadado','rabioso':'enfadado',
            'asustado':'miedo','aterrorizado':'miedo','temeroso':'miedo',
            'sorprendido':'sorprendido','asombrado':'sorprendido',
            'nervioso':'nervioso','ansioso':'nervioso','preocupado':'nervioso',
            'cansado':'cansado','agotado':'cansado','exhausto':'cansado',
            'aburrido':'aburrido','hastiado':'aburrido',
            'hambre':'hambre','hambriento':'hambre',
            'sed':'sed','sediento':'sed',
            'dolor':'dolor','duele':'dolor','doliente':'dolor',
            'calor':'calor','acalorado':'calor','sofocon':'calor',
            'frio':'frío','helado':'frío','congelado':'frío',
            'tranquilo':'tranquilo','relajado':'tranquilo','calmado':'tranquilo',
            'orgulloso':'orgulloso','satisfecho de si':'orgulloso',
            'verguenza':'vergüenza','avergonzado':'vergüenza',
            'celos':'celos','envidia':'celos','celoso':'celos',
            'enfermo':'enfermo','malo':'enfermo','mala':'enfermo',
            'sano':'sano','bien de salud':'sano',
            'emocionado':'emocionado','entusiasmado':'emocionado',
            'solitario':'solo','solo':'solo','soledad':'solo',
            'confundido':'confundido','perdido':'confundido','desorientado':'confundido',
            // ADJETIVOS DESCRIPTIVOS
            'grande':'grande','enorme':'grande','gigante':'grande',
            'pequeno':'pequeño','chico':'pequeño','diminuto':'pequeño','mini':'pequeño',
            'largo':'largo','larga':'largo','alargado':'largo',
            'corto':'corto','breve':'corto','reducido':'corto',
            'alto':'alto','elevado':'alto','talludo':'alto',
            'bajo':'bajo','chaparro':'bajo',
            'gordo':'gordo','grueso':'gordo','rellenito':'gordo',
            'delgado':'delgado','flaco':'delgado','esbelto':'delgado',
            'bonito':'bonito','hermoso':'bonito','lindo':'bonito','guapo':'bonito',
            'feo':'feo','horrible':'feo','desagradable':'feo',
            'nuevo':'nuevo','reciente':'nuevo','flamante':'nuevo',
            'viejo':'viejo','antiguo':'viejo','usado':'viejo',
            'limpio':'limpio','aseado':'limpio','pulcro':'limpio',
            'sucio':'sucio','manchado':'sucio','mugriento':'sucio',
            'duro':'duro','dura':'duro','solido':'duro','rigido':'duro',
            'blando':'blando','suave':'blando','esponjoso':'blando',
            'rapido':'rápido','veloz':'rápido','acelerado':'rápido',
            'lento':'lento','lenta':'lento','despacio':'lento',
            'lleno':'lleno','llena':'lleno','completo':'lleno',
            'vacio':'vacío','vacia':'vacío','sin contenido':'vacío',
            'abierto':'abierto','destapado':'abierto',
            'cerrado':'cerrado','tapado':'cerrado',
            'mojado':'mojado','humedo':'mojado',
            'seco':'seco','reseco':'seco',
            'oscuro':'oscuro','sombrio':'oscuro',
            'claro':'claro','luminoso':'claro','brillante':'claro',
            'fuerte':'fuerte','robusto':'fuerte','musculoso':'fuerte',
            'debil':'débil','flojo':'débil','fragil':'débil',
            'rico':'rico','sabroso':'rico','delicioso':'rico',
            'feo sabor':'amargo','amargo':'amargo','agrio':'amargo','salado':'salado','dulce':'dulce',
            'suave sabor':'suave','picante':'picante',
            // COLORES
            'rojo':'rojo','roja':'rojo','rojizo':'rojo','carmesi':'rojo',
            'azul':'azul','azulado':'azul','celeste':'celeste','marino':'azul',
            'verde':'verde','verdoso':'verde','esmeralda':'verde',
            'amarillo':'amarillo','amarilla':'amarillo','dorado':'dorado',
            'naranja':'naranja color','anaranjado':'naranja color',
            'morado':'morado','purpura':'morado','violeta':'morado','lila':'morado',
            'rosa':'rosa color','rosado':'rosa color','fucsia':'rosa color',
            'negro':'negro','negra':'negro','oscuro color':'negro',
            'blanco':'blanco','blanca':'blanco','palido':'blanco',
            'gris':'gris','grisaceo':'gris','plateado':'gris',
            'marron':'marrón','cafe color':'marrón','castano':'marrón',
            'turquesa':'celeste','aguamarina':'celeste',
            'multicolor':'colores','arcoiris':'colores','colorido':'colores',
            // NÚMEROS
            'cero':'cero','ninguno':'cero','nada de numero':'cero',
            'uno':'uno','un':'uno','una':'uno','primero':'primero','primera':'primero',
            'dos':'dos','segundo':'dos','segunda':'dos','pareja':'dos',
            'tres':'tres','tercero':'tres','tercera':'tres','triple':'tres',
            'cuatro':'cuatro','cuarto':'cuatro','cuarta':'cuatro',
            'cinco':'cinco','quinto':'cinco','quinta':'cinco',
            'seis':'seis','sexto':'seis','sexta':'seis',
            'siete':'siete','septimo':'siete','septima':'siete',
            'ocho':'ocho','octavo':'ocho','octava':'ocho',
            'nueve':'nueve','noveno':'nueve','novena':'nueve',
            'diez':'diez','decimo':'diez','decima':'diez',
            'once':'once','doce':'doce','trece':'trece',
            'catorce':'catorce','quince':'quince','dieciseis':'dieciséis',
            'diecisiete':'diecisiete','dieciocho':'dieciocho','diecinueve':'diecinueve',
            'veinte':'veinte','treinta':'treinta','cuarenta':'cuarenta',
            'cincuenta':'cincuenta','sesenta':'sesenta','setenta':'setenta',
            'ochenta':'ochenta','noventa':'noventa','cien':'cien','ciento':'cien',
            'mil':'mil','millon':'millón',
            'mucho':'mucho','muchos':'mucho','bastante':'mucho','demasiado':'mucho',
            'poco':'poco','pocos':'poco','poquito':'poco','escaso':'poco',
            'todo':'todo','todos':'todo','toda':'todo','todas':'todo',
            'nada':'nada','ninguno cantidad':'nada',
            'algunos':'algunos','alguno':'algunos','alguna':'algunos',
            'ultimo':'último','final':'último','postrero':'último',
            'siguiente':'siguiente','proximo':'siguiente',
            // TIEMPO
            'hoy':'hoy','este dia':'hoy',
            'manana':'mañana','pasado manana':'mañana',
            'ayer':'ayer','anteayer':'ayer',
            'ahora':'ahora','ahorita':'ahora','enseguida':'ahora',
            'antes':'antes','anteriormente':'antes','hace un rato':'antes',
            'despues':'después','luego':'después','mas tarde':'después',
            'siempre':'siempre','constantemente':'siempre',
            'nunca':'nunca','jamas':'nunca','ni una vez':'nunca',
            'a veces':'a veces','ocasionalmente':'a veces',
            'mañana tiempo':'mañana (mañana)','por la manana':'mañana (mañana)',
            'tarde':'tarde','por la tarde':'tarde','vespertino':'tarde',
            'noche':'noche','por la noche':'noche','nocturno':'noche',
            'mediodia':'mediodía','mediodia hora':'mediodía',
            'lunes':'lunes','martes':'martes','miercoles':'miércoles',
            'jueves':'jueves','viernes':'viernes',
            'sabado':'sábado','domingo':'domingo',
            'semana':'semana','fin de semana':'fin de semana','finde':'fin de semana',
            'mes':'mes','meses':'mes',
            'ano':'año','anos':'año','anyo':'año','anyos':'año',
            'primavera':'primavera','verano':'verano',
            'otono':'otoño','invierno':'invierno',
            'hora':'hora','horas':'hora','minuto':'minuto','segundo':'segundo',
            // CELEBRACIONES
            'cumpleanos':'cumpleaños','birthday':'cumpleaños',
            'navidad':'navidad','christmas':'navidad','nochebuena':'navidad',
            'fiesta':'fiesta','party':'fiesta','festejo':'fiesta',
            'vacaciones':'vacaciones','holiday':'vacaciones',
            'regalo':'regalo','obsequio':'regalo','present':'regalo',
            'pascua':'pascua','easter':'pascua',
            'halloween':'halloween','carnaval':'carnaval',
            // ESPACIALES Y CONECTORES
            'aqui':'aquí','aca':'aquí','aqui mismo':'aquí',
            'alli':'allí','alla':'allí','ahi':'allí',
            'encima':'encima','arriba':'encima','sobre':'encima',
            'debajo':'debajo','abajo':'debajo',
            'dentro':'dentro','adentro':'dentro','interior':'dentro',
            'fuera':'fuera','afuera':'fuera','exterior':'fuera',
            'cerca':'cerca','al lado':'cerca','junto':'cerca',
            'lejos':'lejos','alejado':'lejos','distante':'lejos',
            'delante':'delante','enfrente':'delante','frente':'delante',
            'detras':'detrás','atrás':'detrás',
            'derecha':'derecha','lado derecho':'derecha',
            'izquierda':'izquierda','lado izquierdo':'izquierda',
            'arriba':'arriba','hacia arriba':'arriba',
            'tambien':'también','igualmente':'también',
            'tampoco':'tampoco',
            'primero de todo':'primero','primeramente':'primero',
            'luego conector':'después','a continuacion':'después',
            'finalmente':'finalmente','por ultimo':'finalmente',
        };
    }

    // ─────────────────────────────────────────────────────────────────
    // getArasaacQuery: obtiene el término de búsqueda ARASAAC para una
    // palabra, buscando en el mapa masivo o usando la propia palabra
    // ─────────────────────────────────────────────────────────────────
    getArasaacQuery(normalizedWord) {
        return this.arasaacWordMap[normalizedWord] || null;
    }

    // ─────────────────────────────────────────────────────────────────
    // loadArasaacImage: carga la imagen ARASAAC real para un término.
    // Devuelve la URL de imagen si tiene éxito, null si falla.
    // Cachea en localStorage para uso offline futuro.
    // ─────────────────────────────────────────────────────────────────
    async loadArasaacImage(query) {
        if (!query) return null;

        // 1. Ver caché en memoria
        const memKey = `arasaac_url_${query}`;
        if (this._imgCache[memKey]) return this._imgCache[memKey];

        // 2. Ver caché en localStorage
        try {
            const stored = localStorage.getItem(memKey);
            if (stored) {
                this._imgCache[memKey] = stored;
                return stored;
            }
        } catch(e) { /* localStorage lleno */ }

        // 3. Llamar a la API pública de ARASAAC
        try {
            const encoded = encodeURIComponent(query);
            const url = `${this.ARASAAC_API}/pictograms/es/search/${encoded}`;
            const resp = await fetch(url, { signal: AbortSignal.timeout(5000) });

            if (!resp.ok) return null;

            const data = await resp.json();
            if (!data || data.length === 0) return null;

            // Tomar el ID del primer resultado y construir URL de imagen
            const id = data[0]._id;
            const imgUrl = `${this.ARASAAC_CDN}/${id}/500/es.png`;

            // Guardar en caché
            this._imgCache[memKey] = imgUrl;
            try { localStorage.setItem(memKey, imgUrl); } catch(e) { /* lleno */ }

            return imgUrl;

        } catch(e) {
            // Sin conexión o timeout — usar emoji fallback
            return null;
        }
    }

    // ─────────────────────────────────────────────────────────────────
    // expandDictionary: Genera plurales y conjugaciones automáticas
    // ─────────────────────────────────────────────────────────────────
    expandDictionary(baseDict) {
        const expanded = [];

        const pluralize = (word) => {
            if (!word || word.includes(' ')) return word + 's';
            if (word.endsWith('z')) return word.slice(0,-1) + 'ces';
            if (word.endsWith('ión') || word.endsWith('ion')) return word.slice(0,-3) + 'iones';
            if (/[aeiouáéíóú]$/i.test(word)) return word + 's';
            return word + 'es';
        };

        const conjugateVerbs = (word) => {
            const forms = new Set([word]);
            if (word.endsWith('ar')) {
                const r = word.slice(0,-2);
                ['ando','ado','ados','adas','o','as','a','amos','ais','an','e','es','emos','en',
                 'aba','abas','abamos','aban','are','aras','ara','aremos','aran',
                 'aron','aste'].forEach(s => forms.add(r+s));
            } else if (word.endsWith('er')) {
                const r = word.slice(0,-2);
                ['iendo','ido','idos','idas','o','es','e','emos','eis','en',
                 'ia','ias','iamos','ian','ere','eras','era','eremos','eran',
                 'ieron','iste','io'].forEach(s => forms.add(r+s));
            } else if (word.endsWith('ir')) {
                const r = word.slice(0,-2);
                ['iendo','ido','idos','idas','o','es','e','imos','is','en',
                 'ia','ias','iamos','ian','ire','iras','ira','iremos','iran',
                 'ieron','iste','io'].forEach(s => forms.add(r+s));
            }
            return Array.from(forms);
        };

        baseDict.forEach(entry => {
            const singulares = new Set();
            const plurales = new Set();

            entry.palabras.forEach(word => {
                if (word.includes(' ')) { singulares.add(word); return; }
                if (entry.cat === 'acciones' || entry.gramatica === 'verbo') {
                    const isInfinitive = word.endsWith('ar') || word.endsWith('er') || word.endsWith('ir');
                    if (isInfinitive) {
                        conjugateVerbs(word).forEach(f => {
                            if (f.endsWith('mos') || f.endsWith('ais') || f.endsWith('an') || f.endsWith('en') || f.endsWith('is')) {
                                plurales.add(f);
                            } else { singulares.add(f); }
                        });
                    } else { singulares.add(word); }
                } else {
                    const isPlural = word.endsWith('s') && word.length > 3 && !word.endsWith('és');
                    if (isPlural) { plurales.add(word); }
                    else { singulares.add(word); plurales.add(pluralize(word)); }
                }
            });

            expanded.push({ ...entry, palabras: Array.from(singulares), isPlural: false });
            if (plurales.size > 0) {
                expanded.push({ ...entry, palabras: Array.from(plurales), isPlural: true });
            }
        });

        return expanded;
    }

    // ─────────────────────────────────────────────────────────────────
    // Métodos de acceso y búsqueda
    // ─────────────────────────────────────────────────────────────────
    getFullDict() { return [...this.diccionario, ...this.stateModel.customDict]; }

    normalizeString(str) {
        return str.toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/[.,?!¡¿;:«»""''()\[\]]/g, '')
            .trim();
    }

    stemSpanish(word) {
        if (word.length < 5) return word;
        if (word.endsWith('ando')) return word.slice(0,-4) + 'ar';
        if (word.endsWith('iendo')) return word.slice(0,-5);
        if (word.endsWith('ado') || word.endsWith('ada')) return word.slice(0,-3) + 'ar';
        if (word.endsWith('ido') || word.endsWith('ida')) return word.slice(0,-3);
        return word;
    }

    getUserPreference(normalizedWord) {
        try { const s = localStorage.getItem('pref_' + normalizedWord); return s ? JSON.parse(s) : null; }
        catch(e) { return null; }
    }

    saveUserPreference(normalizedWord, preference) {
        try { localStorage.setItem('pref_' + normalizedWord, JSON.stringify(preference)); }
        catch(e) { /* lleno */ }
    }

    findPictogram(word) {
        const nw = this.normalizeString(word);
        const dict = this.getFullDict();
        const pref = this.getUserPreference(nw);
        const exactMatch = dict.find(entry => entry.palabras.some(p => this.normalizeString(p) === nw));
        if (exactMatch) {
            if (pref && pref.img) return { ...exactMatch, img: pref.img, _preferredSource: pref.source };
            return exactMatch;
        }
        const stemmed = this.stemSpanish(nw);
        if (stemmed !== nw) {
            const stemMatch = dict.find(entry => entry.palabras.some(p => this.normalizeString(p) === stemmed));
            if (stemMatch) return stemMatch;
        }
        return null;
    }

    findAllPictograms(word) {
        const nw = this.normalizeString(word);
        const dict = this.getFullDict();
        const results = [];
        dict.forEach(entry => {
            if (entry.palabras.some(p => this.normalizeString(p) === nw)) {
                results.push({ source: entry.source || 'ARASAAC', img: entry.img, entry });
                if (Array.isArray(entry.alternativas)) {
                    entry.alternativas.forEach(alt => {
                        if (!results.find(r => r.source === alt.source && r.img === alt.img)) {
                            results.push({ source: alt.source, img: alt.img, entry });
                        }
                    });
                }
            }
        });
        const seen = new Set();
        return results.filter(r => { const k = r.img; if (seen.has(k)) return false; seen.add(k); return true; });
    }

    // ═══════════════════════════════════════════════════════════════════
    // INTEGRACIÓN MULTI-FUENTE: Open Symbols, Mulberry, Sclera, Plena
    // ═══════════════════════════════════════════════════════════════════

    // ─────────────────────────────────────────────────────────────────
    // _buildEsEnMap: mapa español → inglés para consultar fuentes
    // principalmente en inglés (Open Symbols, Mulberry, Sclera)
    // ─────────────────────────────────────────────────────────────────
    _buildEsEnMap() {
        return {
            // VERBOS FUNDAMENTALES
            'ser':'be','estar':'be','tener':'have','haber':'have',
            'ir':'go','venir':'come','hacer':'do','poder':'can',
            'querer':'want','saber':'know','ver':'see','dar':'give',
            'decir':'say','poner':'put','salir':'go out','volver':'return',
            'tomar':'take','llegar':'arrive','pasar':'pass','seguir':'follow',
            'encontrar':'find','pensar':'think','sentir':'feel','vivir':'live',
            'hablar':'talk','llevar':'carry','dejar':'leave','parecer':'seem',
            'quedar':'stay','creer':'believe','traer':'bring','conocer':'know',
            'perder':'lose','ganar':'win','esperar':'wait','cumplir':'fulfill',
            // VERBOS DE ACCIÓN
            'comer':'eat','beber':'drink','dormir':'sleep','caminar':'walk',
            'correr':'run','saltar':'jump','nadar':'swim','bailar':'dance',
            'cantar':'sing','jugar':'play','trabajar':'work','estudiar':'study',
            'leer':'read','escribir':'write','dibujar':'draw','pintar':'paint',
            'cocinar':'cook','limpiar':'clean','comprar':'buy','pagar':'pay',
            'llamar':'call','escuchar':'listen','mirar':'look','tocar':'touch',
            'abrazar':'hug','besar':'kiss','reir':'laugh','llorar':'cry',
            'gritar':'shout','ayudar':'help','compartir':'share','pedir':'ask',
            'abrir':'open','cerrar':'close','subir':'go up','bajar':'go down',
            'entrar':'enter','salir':'exit','buscar':'search','encontrar':'find',
            'encender':'turn on','apagar':'turn off','cortar':'cut',
            'ducharse':'shower','bañarse':'bathe','lavarse':'wash',
            'vestirse':'get dressed','desvestirse':'undress',
            'peinarse':'comb hair','cepillarse':'brush',
            'despertarse':'wake up','levantarse':'get up','acostarse':'go to bed',
            'sentarse':'sit down','pararse':'stand up',
            'desayunar':'eat breakfast','almorzar':'eat lunch','cenar':'eat dinner',
            'respirar':'breathe','toser':'cough','vomitar':'vomit',
            'curar':'heal','tomar medicina':'take medicine',
            'acariciar':'stroke','señalar':'point','tirar':'throw',
            'atrapar':'catch','empujar':'push','jalar':'pull',
            'girar':'turn','caer':'fall','volar':'fly',
            // VERBOS DE EMOCIÓN/ESTADO
            'querer':'love','amar':'love','odiar':'hate',
            'gustar':'like','preferir':'prefer','necesitar':'need',
            // SUSTANTIVOS — PERSONAS
            'persona':'person','hombre':'man','mujer':'woman',
            'niño':'boy','niña':'girl','bebe':'baby','adulto':'adult',
            'mama':'mother','papa':'father','madre':'mother','padre':'father',
            'hermano':'brother','hermana':'sister',
            'abuelo':'grandfather','abuela':'grandmother',
            'tio':'uncle','tia':'aunt','primo':'cousin','prima':'cousin',
            'amigo':'friend','amiga':'friend',
            'familia':'family','pareja':'couple',
            'maestra':'teacher','maestro':'teacher',
            'medico':'doctor','enfermera':'nurse',
            'policia':'police','bombero':'firefighter',
            'cocinero':'cook','dentista':'dentist',
            // SUSTANTIVOS — ANIMALES
            'perro':'dog','gato':'cat','pajaro':'bird','pez':'fish',
            'conejo':'rabbit','tortuga':'turtle','hamster':'hamster',
            'vaca':'cow','caballo':'horse','cerdo':'pig','oveja':'sheep',
            'pollo':'chicken','gallina':'hen','pato':'duck',
            'leon':'lion','tigre':'tiger','oso':'bear',
            'elefante':'elephant','jirafa':'giraffe','mono':'monkey',
            'serpiente':'snake','rana':'frog','pinguino':'penguin',
            'delfin':'dolphin','ballena':'whale','tiburon':'shark',
            'mariposa':'butterfly','abeja':'bee','arana':'spider',
            'hormiga':'ant','caracol':'snail','loro':'parrot',
            'buho':'owl','aguila':'eagle','dinosaurio':'dinosaur',
            // SUSTANTIVOS — ALIMENTOS FRUTAS
            'manzana':'apple','pera':'pear','naranja':'orange',
            'limon':'lemon','platano':'banana','sandia':'watermelon',
            'melon':'melon','uva':'grape','fresa':'strawberry',
            'melocoton':'peach','mango':'mango','pina':'pineapple',
            'kiwi':'kiwi','aguacate':'avocado','cereza':'cherry',
            'arandano':'blueberry','mora':'blackberry','ciruela':'plum',
            // VERDURAS
            'zanahoria':'carrot','tomate':'tomato','lechuga':'lettuce',
            'pepino':'cucumber','pimiento':'pepper','cebolla':'onion',
            'ajo':'garlic','patata':'potato','brocoli':'broccoli',
            'maiz':'corn','espinaca':'spinach','calabaza':'pumpkin',
            'champiñon':'mushroom','guisante':'pea','judias':'beans',
            // COMIDAS Y BEBIDAS
            'carne':'meat','pollo asado':'roast chicken','pescado':'fish',
            'huevo':'egg','leche':'milk','queso':'cheese','yogur':'yogurt',
            'pan':'bread','pasta':'pasta','arroz':'rice','sopa':'soup',
            'pizza':'pizza','hamburguesa':'hamburger','sandwich':'sandwich',
            'tarta':'cake','galleta':'cookie','chocolate':'chocolate',
            'helado':'ice cream','caramelo':'candy','miel':'honey',
            'agua':'water','zumo':'juice','refresco':'soda','te':'tea',
            'cafe':'coffee','leche chocolateada':'chocolate milk',
            // ROPA Y ACCESORIOS
            'camiseta':'t-shirt','camisa':'shirt','pantalon':'trousers',
            'falda':'skirt','vestido':'dress','abrigo':'coat',
            'jersey':'sweater','zapatos':'shoes','calcetines':'socks',
            'pijama':'pyjamas','gorra':'hat','bufanda':'scarf',
            'guantes':'gloves','mochila':'backpack','bolso':'bag',
            'gafas':'glasses','cinturon':'belt','corbata':'tie',
            // HOGAR
            'casa':'house','habitacion':'bedroom','cocina':'kitchen',
            'bano':'bathroom','salon':'living room',
            'cama':'bed','mesa':'table','silla':'chair','sofa':'sofa',
            'puerta':'door','ventana':'window','lampara':'lamp',
            'television':'television','ordenador':'computer',
            'movil':'mobile phone','nevera':'fridge',
            'lavadora':'washing machine','horno':'oven',
            'jabon':'soap','toalla':'towel','inodoro':'toilet',
            'banera':'bathtub','ducha':'shower',
            // ÚTILES Y JUGUETES
            'lapiz':'pencil','boligrafo':'pen','cuaderno':'notebook',
            'libro':'book','tijeras':'scissors','regla':'ruler',
            'pinturas':'crayons','pizarra':'blackboard',
            'pelota':'ball','muñeca':'doll','peluche':'teddy bear',
            'puzzle':'puzzle','videojuego':'video game',
            'bicicleta':'bicycle','columpio':'swing','tobogan':'slide',
            'globo':'balloon','cometa':'kite',
            // TRANSPORTES
            'coche':'car','autobus':'bus','metro':'subway','tren':'train',
            'avion':'airplane','barco':'boat','moto':'motorcycle',
            'taxi':'taxi','ambulancia':'ambulance','bicicleta':'bicycle',
            'helicoptero':'helicopter','cohete':'rocket',
            // NATURALEZA Y CLIMA
            'sol':'sun','luna':'moon','estrella':'star','nube':'cloud',
            'lluvia':'rain','nieve':'snow','viento':'wind',
            'tormenta':'storm','arcoiris':'rainbow',
            'arbol':'tree','flor':'flower','hierba':'grass','hoja':'leaf',
            'mar':'sea','rio':'river','lago':'lake',
            'montana':'mountain','desierto':'desert','bosque':'forest',
            'fuego':'fire','tierra':'earth',
            // LUGARES
            'colegio':'school','parque':'park','hospital':'hospital',
            'tienda':'shop','playa':'beach','piscina':'pool',
            'ciudad':'city','biblioteca':'library','farmacia':'pharmacy',
            'restaurante':'restaurant','zoo':'zoo','cine':'cinema',
            'aeropuerto':'airport','iglesia':'church','museo':'museum',
            'estadio':'stadium','gimnasio':'gym','teatro':'theatre',
            // EMOCIONES
            'feliz':'happy','triste':'sad','enfadado':'angry',
            'asustado':'scared','sorprendido':'surprised',
            'nervioso':'nervous','cansado':'tired','aburrido':'bored',
            'hambre':'hungry','sed':'thirsty','dolor':'pain',
            'calor':'hot','frio':'cold','tranquilo':'calm',
            'orgulloso':'proud','verguenza':'embarrassed',
            'solitario':'lonely','confundido':'confused',
            'enfermo':'sick','sano':'healthy','emocionado':'excited',
            // ADJETIVOS
            'grande':'big','pequeño':'small','largo':'long','corto':'short',
            'alto':'tall','bajo':'short','gordo':'fat','delgado':'thin',
            'bonito':'beautiful','feo':'ugly','nuevo':'new','viejo':'old',
            'limpio':'clean','sucio':'dirty','rapido':'fast','lento':'slow',
            'lleno':'full','vacio':'empty','duro':'hard','blando':'soft',
            'caliente':'hot','frio':'cold','abierto':'open','cerrado':'closed',
            // COLORES
            'rojo':'red','azul':'blue','verde':'green','amarillo':'yellow',
            'naranja':'orange','morado':'purple','rosa':'pink','negro':'black',
            'blanco':'white','gris':'grey','marron':'brown','dorado':'gold',
            // NÚMEROS
            'cero':'zero','uno':'one','dos':'two','tres':'three',
            'cuatro':'four','cinco':'five','seis':'six','siete':'seven',
            'ocho':'eight','nueve':'nine','diez':'ten',
            'mucho':'many','poco':'few','todo':'all','nada':'nothing',
            // TIEMPO
            'hoy':'today','manana':'tomorrow','ayer':'yesterday',
            'ahora':'now','antes':'before','despues':'after',
            'siempre':'always','nunca':'never','mañana tiempo':'morning',
            'tarde':'afternoon','noche':'night',
            'lunes':'monday','martes':'tuesday','miercoles':'wednesday',
            'jueves':'thursday','viernes':'friday','sabado':'saturday',
            'domingo':'sunday','semana':'week','mes':'month','año':'year',
            'primavera':'spring','verano':'summer','otono':'autumn','invierno':'winter',
            // COMUNICACIÓN CAA
            'si':'yes','no':'no','hola':'hello','adios':'goodbye',
            'gracias':'thank you','por favor':'please','perdon':'sorry',
            'ayuda':'help','mas':'more','parar':'stop','espera':'wait',
            'bien':'good','mal':'bad','mio':'mine','tuyo':'yours',
            'aqui':'here','alli':'there','tambien':'also',
            // BODY
            'cabeza':'head','cara':'face','ojo':'eye','nariz':'nose',
            'boca':'mouth','diente':'tooth','oreja':'ear','pelo':'hair',
            'brazo':'arm','mano':'hand','dedo':'finger','barriga':'belly',
            'corazon':'heart','pierna':'leg','pie':'foot','sangre':'blood',
            // CELEBRACIONES
            'cumpleaños':'birthday','navidad':'christmas','fiesta':'party',
            'vacaciones':'holidays','regalo':'gift',
            // ESPACIALES
            'encima':'on top','debajo':'under','dentro':'inside',
            'fuera':'outside','cerca':'near','lejos':'far',
            'delante':'in front','detras':'behind',
            'derecha':'right','izquierda':'left','arriba':'up','abajo':'down',
        };
    }

    // ─────────────────────────────────────────────────────────────────
    // getEnglishQuery: traduce palabra española a inglés para usar
    // con fuentes en inglés (Mulberry, Sclera, Open Symbols)
    // ─────────────────────────────────────────────────────────────────
    getEnglishQuery(spanishWord) {
        const normalized = this.normalizeString(spanishWord);
        return this._esEnMap[normalized] || spanishWord;
    }

    // ─────────────────────────────────────────────────────────────────
    // _buildMulberryDirectMap: URLs directas de Mulberry Symbols CDN
    // para los 300 conceptos CAA más frecuentes
    // Fuente: d18vdu4p71yql0.cloudfront.net/libraries/mulberry/
    // ─────────────────────────────────────────────────────────────────
    _buildMulberryDirectMap() {
        const BASE = 'https://d18vdu4p71yql0.cloudfront.net/libraries/mulberry/';
        return {
            // COMUNICACIÓN CAA
            'yes': BASE+'yes.svg',
            'no': BASE+'no.svg',
            'help': BASE+'help.svg',
            'stop': BASE+'stop.svg',
            'more': BASE+'more.svg',
            'want': BASE+'I+want.svg',
            'please': BASE+'please.svg',
            'thank you': BASE+'thank+you.svg',
            'hello': BASE+'hello.svg',
            'goodbye': BASE+'goodbye.svg',
            'sorry': BASE+'sorry.svg',
            'wait': BASE+'wait.svg',
            'good': BASE+'good.svg',
            'bad': BASE+'bad.svg',
            'finished': BASE+'finished.svg',
            // VERBOS ACCIONES
            'eat': BASE+'eat.svg',
            'drink': BASE+'drink.svg',
            'sleep': BASE+'sleep.svg',
            'play': BASE+'play.svg',
            'walk': BASE+'walk.svg',
            'run': BASE+'run.svg',
            'jump': BASE+'jump.svg',
            'swim': BASE+'swim.svg',
            'dance': BASE+'dance.svg',
            'sing': BASE+'sing.svg',
            'work': BASE+'work.svg',
            'study': BASE+'study.svg',
            'read': BASE+'read.svg',
            'write': BASE+'write.svg',
            'draw': BASE+'draw.svg',
            'paint': BASE+'paint.svg',
            'cook': BASE+'cook.svg',
            'wash': BASE+'wash.svg',
            'shower': BASE+'shower.svg',
            'brush teeth': BASE+'brush+teeth.svg',
            'comb hair': BASE+'brush+hair.svg',
            'get dressed': BASE+'get+dressed.svg',
            'go to bed': BASE+'go+to+bed.svg',
            'wake up': BASE+'wake+up.svg',
            'sit down': BASE+'sit+down.svg',
            'stand up': BASE+'stand+up.svg',
            'listen': BASE+'listen.svg',
            'look': BASE+'look.svg',
            'touch': BASE+'touch.svg',
            'hug': BASE+'hug.svg',
            'laugh': BASE+'laugh.svg',
            'cry': BASE+'cry.svg',
            'talk': BASE+'talk.svg',
            'go': BASE+'go.svg',
            'come': BASE+'come.svg',
            'open': BASE+'open.svg',
            'close': BASE+'close.svg',
            'buy': BASE+'buy.svg',
            'give': BASE+'give.svg',
            'share': BASE+'share.svg',
            'put on': BASE+'put+on.svg',
            'take off': BASE+'take+off.svg',
            'call': BASE+'telephone.svg',
            'turn on': BASE+'turn+on.svg',
            'turn off': BASE+'turn+off.svg',
            'cut': BASE+'cut.svg',
            'throw': BASE+'throw.svg',
            'catch': BASE+'catch.svg',
            'push': BASE+'push.svg',
            'pull': BASE+'pull.svg',
            'fall': BASE+'fall+over.svg',
            // PERSONAS Y FAMILIA
            'person': BASE+'person.svg',
            'man': BASE+'man.svg',
            'woman': BASE+'woman.svg',
            'boy': BASE+'boy.svg',
            'girl': BASE+'girl.svg',
            'baby': BASE+'baby.svg',
            'mother': BASE+'mother.svg',
            'father': BASE+'father.svg',
            'brother': BASE+'brother.svg',
            'sister': BASE+'sister.svg',
            'grandfather': BASE+'grandfather.svg',
            'grandmother': BASE+'grandmother.svg',
            'uncle': BASE+'uncle.svg',
            'aunt': BASE+'aunt.svg',
            'friend': BASE+'friend.svg',
            'family': BASE+'family.svg',
            'teacher': BASE+'teacher.svg',
            'doctor': BASE+'doctor.svg',
            'nurse': BASE+'nurse.svg',
            'police': BASE+'policeman.svg',
            'firefighter': BASE+'fireman.svg',
            // ANIMALES
            'dog': BASE+'dog.svg',
            'cat': BASE+'cat.svg',
            'bird': BASE+'bird.svg',
            'fish': BASE+'fish.svg',
            'rabbit': BASE+'rabbit.svg',
            'turtle': BASE+'tortoise.svg',
            'cow': BASE+'cow.svg',
            'horse': BASE+'horse.svg',
            'pig': BASE+'pig.svg',
            'sheep': BASE+'sheep.svg',
            'chicken': BASE+'chicken.svg',
            'duck': BASE+'duck.svg',
            'lion': BASE+'lion.svg',
            'tiger': BASE+'tiger.svg',
            'bear': BASE+'bear.svg',
            'elephant': BASE+'elephant.svg',
            'giraffe': BASE+'giraffe.svg',
            'monkey': BASE+'monkey.svg',
            'snake': BASE+'snake.svg',
            'frog': BASE+'frog.svg',
            'penguin': BASE+'penguin.svg',
            'dolphin': BASE+'dolphin.svg',
            'butterfly': BASE+'butterfly.svg',
            // ALIMENTOS — FRUTAS
            'apple': BASE+'apple.svg',
            'pear': BASE+'pear.svg',
            'orange': BASE+'orange.svg',
            'lemon': BASE+'lemon.svg',
            'banana': BASE+'banana.svg',
            'watermelon': BASE+'watermelon.svg',
            'grape': BASE+'grapes.svg',
            'strawberry': BASE+'strawberry.svg',
            'peach': BASE+'peach.svg',
            'mango': BASE+'mango.svg',
            'pineapple': BASE+'pineapple.svg',
            'kiwi': BASE+'kiwi.svg',
            'cherry': BASE+'cherry.svg',
            // VERDURAS
            'carrot': BASE+'carrot.svg',
            'tomato': BASE+'tomato.svg',
            'lettuce': BASE+'lettuce.svg',
            'cucumber': BASE+'cucumber.svg',
            'onion': BASE+'onion.svg',
            'potato': BASE+'potato.svg',
            'corn': BASE+'corn.svg',
            'mushroom': BASE+'mushroom.svg',
            'pea': BASE+'peas.svg',
            // COMIDAS Y BEBIDAS
            'meat': BASE+'meat.svg',
            'fish food': BASE+'fish.svg',
            'egg': BASE+'egg.svg',
            'milk': BASE+'milk.svg',
            'cheese': BASE+'cheese.svg',
            'bread': BASE+'bread.svg',
            'pasta': BASE+'pasta.svg',
            'rice': BASE+'rice.svg',
            'soup': BASE+'soup.svg',
            'pizza': BASE+'pizza.svg',
            'hamburger': BASE+'hamburger.svg',
            'sandwich': BASE+'sandwich.svg',
            'cake': BASE+'cake.svg',
            'cookie': BASE+'biscuit.svg',
            'chocolate': BASE+'chocolate.svg',
            'ice cream': BASE+'ice+cream.svg',
            'candy': BASE+'sweets.svg',
            'water': BASE+'water.svg',
            'juice': BASE+'juice.svg',
            'soda': BASE+'cola.svg',
            'tea': BASE+'tea.svg',
            'coffee': BASE+'coffee.svg',
            // ROPA
            't-shirt': BASE+'t-shirt.svg',
            'shirt': BASE+'shirt.svg',
            'trousers': BASE+'trousers.svg',
            'dress': BASE+'dress.svg',
            'coat': BASE+'coat.svg',
            'sweater': BASE+'jumper.svg',
            'shoes': BASE+'shoes.svg',
            'socks': BASE+'socks.svg',
            'pyjamas': BASE+'pyjamas.svg',
            'hat': BASE+'hat.svg',
            'scarf': BASE+'scarf.svg',
            'gloves': BASE+'gloves.svg',
            'backpack': BASE+'rucksack.svg',
            'glasses': BASE+'glasses.svg',
            // HOGAR
            'house': BASE+'house.svg',
            'bedroom': BASE+'bedroom.svg',
            'kitchen': BASE+'kitchen.svg',
            'bathroom': BASE+'bathroom.svg',
            'living room': BASE+'living+room.svg',
            'bed': BASE+'bed.svg',
            'table': BASE+'table.svg',
            'chair': BASE+'chair.svg',
            'sofa': BASE+'sofa.svg',
            'door': BASE+'door.svg',
            'window': BASE+'window.svg',
            'lamp': BASE+'lamp.svg',
            'television': BASE+'television.svg',
            'computer': BASE+'computer.svg',
            'mobile phone': BASE+'mobile+phone.svg',
            'toilet': BASE+'toilet.svg',
            // ÚTILES
            'pencil': BASE+'pencil.svg',
            'pen': BASE+'pen.svg',
            'notebook': BASE+'book.svg',
            'book': BASE+'book.svg',
            'scissors': BASE+'scissors.svg',
            'crayons': BASE+'colouring+pens.svg',
            'ball': BASE+'ball.svg',
            'teddy bear': BASE+'teddy+bear.svg',
            'bicycle': BASE+'bike.svg',
            'swing': BASE+'swing.svg',
            'balloon': BASE+'balloon.svg',
            // TRANSPORTES
            'car': BASE+'car.svg',
            'bus': BASE+'bus.svg',
            'subway': BASE+'underground.svg',
            'train': BASE+'train.svg',
            'airplane': BASE+'aeroplane.svg',
            'boat': BASE+'boat.svg',
            'motorcycle': BASE+'motorbike.svg',
            'taxi': BASE+'taxi.svg',
            'ambulance': BASE+'ambulance.svg',
            // NATURALEZA
            'sun': BASE+'sun.svg',
            'moon': BASE+'moon.svg',
            'star': BASE+'star.svg',
            'cloud': BASE+'cloud.svg',
            'rain': BASE+'rain.svg',
            'snow': BASE+'snow.svg',
            'wind': BASE+'wind.svg',
            'rainbow': BASE+'rainbow.svg',
            'tree': BASE+'tree.svg',
            'flower': BASE+'flower.svg',
            'sea': BASE+'sea.svg',
            'fire': BASE+'fire.svg',
            // LUGARES
            'school': BASE+'school.svg',
            'park': BASE+'park.svg',
            'hospital': BASE+'hospital.svg',
            'shop': BASE+'shop.svg',
            'beach': BASE+'beach.svg',
            'pool': BASE+'swimming+pool.svg',
            'library': BASE+'library.svg',
            'restaurant': BASE+'restaurant.svg',
            'zoo': BASE+'zoo.svg',
            'cinema': BASE+'cinema.svg',
            'airport': BASE+'airport.svg',
            // EMOCIONES
            'happy': BASE+'happy.svg',
            'sad': BASE+'sad.svg',
            'angry': BASE+'angry.svg',
            'scared': BASE+'scared.svg',
            'surprised': BASE+'surprised.svg',
            'tired': BASE+'tired.svg',
            'bored': BASE+'bored.svg',
            'hungry': BASE+'hungry.svg',
            'thirsty': BASE+'thirsty.svg',
            'pain': BASE+'pain.svg',
            'sick': BASE+'ill.svg',
            'calm': BASE+'calm.svg',
            'excited': BASE+'excited.svg',
            // COLORES
            'red': BASE+'red.svg',
            'blue': BASE+'blue.svg',
            'green': BASE+'green.svg',
            'yellow': BASE+'yellow.svg',
            'orange color': BASE+'orange+(colour).svg',
            'purple': BASE+'purple.svg',
            'pink': BASE+'pink.svg',
            'black': BASE+'black.svg',
            'white': BASE+'white.svg',
            'brown': BASE+'brown.svg',
            // CUERPO
            'head': BASE+'head.svg',
            'face': BASE+'face.svg',
            'eye': BASE+'eye.svg',
            'nose': BASE+'nose.svg',
            'mouth': BASE+'mouth.svg',
            'ear': BASE+'ear.svg',
            'hair': BASE+'hair.svg',
            'arm': BASE+'arm.svg',
            'hand': BASE+'hand.svg',
            'finger': BASE+'finger.svg',
            'leg': BASE+'leg.svg',
            'foot': BASE+'foot.svg',
            'heart': BASE+'heart.svg',
            // TIEMPO
            'today': BASE+'today.svg',
            'tomorrow': BASE+'tomorrow.svg',
            'yesterday': BASE+'yesterday.svg',
            'morning': BASE+'morning.svg',
            'afternoon': BASE+'afternoon.svg',
            'night': BASE+'night.svg',
            'monday': BASE+'Monday.svg',
            'tuesday': BASE+'Tuesday.svg',
            'wednesday': BASE+'Wednesday.svg',
            'thursday': BASE+'Thursday.svg',
            'friday': BASE+'Friday.svg',
            'saturday': BASE+'Saturday.svg',
            'sunday': BASE+'Sunday.svg',
            // NÚMEROS
            'one': BASE+'1.svg', 'two': BASE+'2.svg', 'three': BASE+'3.svg',
            'four': BASE+'4.svg', 'five': BASE+'5.svg', 'six': BASE+'6.svg',
            'seven': BASE+'7.svg', 'eight': BASE+'8.svg',
            'nine': BASE+'9.svg', 'ten': BASE+'10.svg',
            // CELEBRACIONES
            'birthday': BASE+'birthday.svg',
            'christmas': BASE+'christmas.svg',
            'party': BASE+'party.svg',
            'gift': BASE+'present.svg',
        };
    }

    // ─────────────────────────────────────────────────────────────────
    // getMulberryUrl: devuelve URL directa de Mulberry Symbols CDN
    // si existe para el concepto en inglés dado
    // ─────────────────────────────────────────────────────────────────
    getMulberryUrl(englishWord) {
        if (!this._mulberryMap) this._mulberryMap = this._buildMulberryDirectMap();
        return this._mulberryMap[englishWord.toLowerCase()] || null;
    }

    // ─────────────────────────────────────────────────────────────────
    // loadOpenSymbolsImages: consulta la API pública de Open Symbols
    // que agrega Mulberry, Sclera, SymbolStix, PCS y más en un solo endpoint.
    // API: https://www.opensymbols.org/api/v1/symbols/search
    // Free to use, no auth needed (access_token=0secret0 = public)
    // Devuelve array: [{ source, imgUrl, license }]
    // ─────────────────────────────────────────────────────────────────
    async loadOpenSymbolsImages(spanishWord, maxPerSource = 3) {
        const englishWord = this.getEnglishQuery(spanishWord);
        const cacheKey = `opensym_${englishWord}`;

        // 1. Caché en memoria
        if (this._imgCache[cacheKey]) return this._imgCache[cacheKey];

        // 2. Caché en localStorage
        try {
            const stored = localStorage.getItem(cacheKey);
            if (stored) {
                const parsed = JSON.parse(stored);
                this._imgCache[cacheKey] = parsed;
                return parsed;
            }
        } catch(e) { /* localStorage lleno o corrupto */ }

        const results = [];

        // 3. Intentar Mulberry CDN directo primero (más confiable)
        const mulberryUrl = this.getMulberryUrl(englishWord);
        if (mulberryUrl) {
            results.push({ source: 'Mulberry', imgUrl: mulberryUrl, license: 'CC BY-SA 2.0' });
        }

        // 4. Consultar Open Symbols API (Mulberry + Sclera + SymbolStix + más)
        try {
            const encoded = encodeURIComponent(englishWord);
            // locale=es para preferir pictogramas en español cuando estén disponibles
            const apiUrl = `https://www.opensymbols.org/api/v1/symbols/search?q=${encoded}&access_token=0secret0&safe=true&limit=20`;
            const resp = await fetch(apiUrl, { signal: AbortSignal.timeout(6000) });

            if (resp.ok) {
                const data = await resp.json();

                // Mapa de repo_key a nombre legible
                const SOURCE_NAMES = {
                    'mulberry':    'Mulberry',
                    'sclera':      'Sclera',
                    'arasaac':     'ARASAAC',
                    'symbolstix':  'SymbolStix',
                    'lessonpix':   'LessonPix',
                    'pcs':         'PCS',
                    'tawasol':     'Tawasol',
                    'snap':        'SNAP',
                };

                // Contar cuántos por fuente hemos añadido
                const sourceCount = {};

                data.forEach(sym => {
                    if (!sym.image_url) return;

                    const source = SOURCE_NAMES[sym.repo_key] || sym.repo_key || 'Open Symbols';

                    // Saltar si ya tenemos muchos de esta fuente
                    sourceCount[source] = (sourceCount[source] || 0) + 1;
                    if (sourceCount[source] > maxPerSource) return;

                    // Evitar duplicados por URL
                    if (results.find(r => r.imgUrl === sym.image_url)) return;

                    // Evitar añadir un Mulberry que ya tenemos del CDN directo
                    if (source === 'Mulberry' && mulberryUrl) return;

                    results.push({
                        source,
                        imgUrl: sym.image_url,
                        license: sym.license || sym.license_url || 'Open',
                    });
                });
            }
        } catch(e) {
            // Sin conexión o timeout — usar Mulberry CDN directo que ya tenemos
            console.info('[DictModel] Open Symbols offline, using direct CDN:', englishWord);
        }

        // 5. Guardar en caché si hay resultados
        if (results.length > 0) {
            this._imgCache[cacheKey] = results;
            try {
                localStorage.setItem(cacheKey, JSON.stringify(results));
            } catch(e) {
                // localStorage lleno: limpiar entradas antiguas
                try {
                    const toDelete = Object.keys(localStorage)
                        .filter(k => k.startsWith('opensym_'))
                        .slice(0, 50);
                    toDelete.forEach(k => localStorage.removeItem(k));
                    localStorage.setItem(cacheKey, JSON.stringify(results));
                } catch(e2) { /* ignorar */ }
            }
        }

        return results;
    }

    // ─────────────────────────────────────────────────────────────────
    // loadGlobalSymbolsImages: consulta la API de Global Symbols
    // que agrega: ARASAAC, Mulberry, Snap Core First, SymbolStix,
    // PCS Boardmaker, Tawasol y muchos conjuntos más.
    // API: https://globalsymbols.com/api/v1/labels/search
    // Libre y gratuita. Devuelve array [{ source, imgUrl }]
    // ─────────────────────────────────────────────────────────────────
    async loadGlobalSymbolsImages(spanishWord) {
        const searchTerm = this.getEnglishQuery(spanishWord);
        const cacheKey = `globalsym_${searchTerm}`;

        if (this._imgCache[cacheKey]) return this._imgCache[cacheKey];

        try {
            const stored = localStorage.getItem(cacheKey);
            if (stored) {
                const parsed = JSON.parse(stored);
                this._imgCache[cacheKey] = parsed;
                return parsed;
            }
        } catch(e) {}

        const results = [];
        const seenIds = new Set();

        try {
            const queries = [
                `https://globalsymbols.com/api/v1/labels/search/?term=${encodeURIComponent(spanishWord)}&language=es&limit=8`,
            ];
            if (searchTerm !== spanishWord) {
                queries.push(`https://globalsymbols.com/api/v1/labels/search/?term=${encodeURIComponent(searchTerm)}&language=en&limit=8`);
            }

            const responses = await Promise.allSettled(
                queries.map(url => fetch(url, { signal: AbortSignal.timeout(6000) }))
            );

            for (const res of responses) {
                if (res.status !== 'fulfilled' || !res.value.ok) continue;
                const data = await res.value.json();
                if (!data.results) continue;

                data.results.forEach(item => {
                    const picto = item.picto;
                    if (!picto || !picto.image_url) return;
                    if (seenIds.has(picto.id)) return;
                    seenIds.add(picto.id);
                    results.push({
                        source: picto.symbolset?.name || 'Global Symbols',
                        imgUrl: picto.image_url,
                        license: picto.license?.url || 'CC BY-SA',
                    });
                });
            }
        } catch(e) {
            console.info('[DictModel] Global Symbols offline:', spanishWord);
        }

        if (results.length > 0) {
            this._imgCache[cacheKey] = results;
            try {
                localStorage.setItem(cacheKey, JSON.stringify(results.slice(0, 6)));
            } catch(e) {
                try {
                    Object.keys(localStorage).filter(k => k.startsWith('globalsym_')).slice(0, 30)
                        .forEach(k => localStorage.removeItem(k));
                    localStorage.setItem(cacheKey, JSON.stringify(results.slice(0, 6)));
                } catch(e2) {}
            }
        }

        return results;
    }

    // ─────────────────────────────────────────────────────────────────
    // generateAIPictogram: genera SVG via OpenRouter (solo para palabras
    // extremadamente raras no encontradas en ninguna fuente)
    // ─────────────────────────────────────────────────────────────────
    async generateAIPictogram(word, apiKey) {
        if (!apiKey) throw new Error('API_KEY_MISSING');
        const prompt = `Eres un experto ilustrador de comunicación aumentativa y alternativa (CAA), estilo ARASAAC. Genera un SVG puro, limpio y minimalista que represente: "${word}". Requisitos: líneas gruesas negras (stroke-width≥4), colores planos vivos, fondo blanco (#fff), siluetas estilizadas para niños con autismo. viewBox="0 0 200 200". NO escribas el texto dentro. Devuelve SOLO el SVG válido, sin markdown.`;
        try {
            const resp = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ model: 'openrouter/free', messages: [{ role: 'user', content: prompt }] })
            });
            if (!resp.ok) throw new Error('API error');
            const data = await resp.json();
            let svg = data.choices[0].message.content.trim();
            if (svg.startsWith('```')) svg = svg.replace(/```xml\n?|```svg\n?|```\n?/g, '').trim();
            if (!svg.startsWith('<svg')) { const m = svg.match(/<svg[\s\S]*<\/svg>/); if (m) svg = m[0]; }
            return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svg)));
        } catch(e) { console.error('[DictModel] AI error:', e); throw e; }
    }
}

