class DictModel {
    constructor(stateModel) {
        this.stateModel = stateModel;
        const diccionario = [

    { palabras: ["perro", "perrito", "can", "cachorro", "guau"], img: "🐕", cat: "objetos" },
    { palabras: ["gato", "gatito", "felino", "miau"], img: "🐈", cat: "objetos" },
    { palabras: ["pajaro", "pajarito", "ave", "volatil"], img: "🐦", cat: "objetos" },
    { palabras: ["pez", "pececito", "pescado"], img: "🐟", cat: "objetos" },
    { palabras: ["conejo", "conejito"], img: "🐇", cat: "objetos" },
    { palabras: ["caballo", "yegua", "corcel"], img: "🐎", cat: "objetos" },
    { palabras: ["vaca", "ternero", "becerro", "toro"], img: "🐄", cat: "objetos" },
    { palabras: ["cerdo", "chancho", "puerco", "cochino", "lechón"], img: "🐖", cat: "objetos" },
    { palabras: ["oveja", "cordero"], img: "🐑", cat: "objetos" },
    { palabras: ["gallina", "pollo", "pollito", "gallo"], img: "🐔", cat: "objetos" },
    { palabras: ["pato", "patito"], img: "🦆", cat: "objetos" },
    { palabras: ["rana", "sapo"], img: "🐸", cat: "objetos" },
    { palabras: ["tortuga", "galapago"], img: "🐢", cat: "objetos" },
    { palabras: ["serpiente", "vibora", "culebra"], img: "🐍", cat: "objetos" },
    { palabras: ["oso", "osito"], img: "🐻", cat: "objetos" },
    { palabras: ["leon", "leona"], img: "🦁", cat: "objetos" },
    { palabras: ["tigre", "tigresa"], img: "🐅", cat: "objetos" },
    { palabras: ["elefante", "elefantito"], img: "🐘", cat: "objetos" },
    { palabras: ["jirafa"], img: "🦒", cat: "objetos" },
    { palabras: ["mono", "monito", "simio", "gorila"], img: "🐒", cat: "objetos" },
    { palabras: ["lobo", "lobito"], img: "🐺", cat: "objetos" },
    { palabras: ["zorro"], img: "🦊", cat: "objetos" },
    { palabras: ["raton", "ratoncito", "rata"], img: "🐁", cat: "objetos" },
    { palabras: ["murcielago"], img: "🦇", cat: "objetos" },
    { palabras: ["mariposa"], img: "🦋", cat: "objetos" },
    { palabras: ["abeja", "avispa"], img: "🐝", cat: "objetos" },
    { palabras: ["hormiga"], img: "🐜", cat: "objetos" },
    { palabras: ["arana"], img: "🕷️", cat: "objetos" },
    { palabras: ["caracol"], img: "🐌", cat: "objetos" },
    { palabras: ["gusano", "lombriz"], img: "🐛", cat: "objetos" },
    { palabras: ["cangrejo"], img: "🦀", cat: "objetos" },
    { palabras: ["delfin"], img: "🐬", cat: "objetos" },
    { palabras: ["ballena"], img: "🐳", cat: "objetos" },
    { palabras: ["tiburon"], img: "🦈", cat: "objetos" },
    { palabras: ["pulpo"], img: "🐙", cat: "objetos" },
    { palabras: ["pinguino"], img: "🐧", cat: "objetos" },
    { palabras: ["buho", "lechuza"], img: "🦉", cat: "objetos" },
    { palabras: ["cocodrilo", "caiman"], img: "🐊", cat: "objetos" },
    { palabras: ["dinosaurio", "trex"], img: "🦖", cat: "objetos" },
    { palabras: ["dragon"], img: "🐉", cat: "objetos" },

    { palabras: ["cabeza", "cabezon"], img: "👤", cat: "objetos" },
    { palabras: ["pelo", "cabello", "melena"], img: "💇", cat: "objetos" },
    { palabras: ["cara", "rostro"], img: "👦", cat: "objetos" },
    { palabras: ["ojo", "ojos"], img: "👁️", cat: "objetos" },
    { palabras: ["nariz", "narices"], img: "👃", cat: "objetos" },
    { palabras: ["boca", "labios"], img: "👄", cat: "objetos" },
    { palabras: ["oreja", "orejas", "oido"], img: "👂", cat: "objetos" },
    { palabras: ["brazo", "brazos"], img: "💪", cat: "objetos" },
    { palabras: ["mano", "manos"], img: "✋", cat: "objetos" },
    { palabras: ["dedo", "dedos"], img: "👆", cat: "objetos" },
    { palabras: ["pierna", "piernas"], img: "🦵", cat: "objetos" },
    { palabras: ["pie", "pies"], img: "🦶", cat: "objetos" },
    { palabras: ["barriga", "panza", "estomago"], img: "🤰", cat: "objetos" },
    { palabras: ["espalda"], img: "🔙", cat: "objetos" },
    { palabras: ["hueso", "esqueleto"], img: "🦴", cat: "objetos" },
    { palabras: ["diente", "dientes", "muela"], img: "🦷", cat: "objetos" },
    { palabras: ["lengua"], img: "👅", cat: "objetos" },
    { palabras: ["corazon", "corazoncito"], img: "❤️", cat: "objetos" },
    { palabras: ["cerebro", "mente"], img: "🧠", cat: "objetos" },
    { palabras: ["sangre"], img: "🩸", cat: "objetos" },

    { palabras: ["medico", "doctor", "pediatra"], img: "👨‍⚕️", cat: "personas" },
    { palabras: ["policia", "agente", "oficial"], img: "👮", cat: "personas" },
    { palabras: ["bombero"], img: "👨‍🚒", cat: "personas" },
    { palabras: ["profesor", "maestro", "profe"], img: "👨‍🏫", cat: "personas" },
    { palabras: ["cocinero", "chef"], img: "👨‍🍳", cat: "personas" },
    { palabras: ["granjero", "agricultor", "campesino"], img: "👨‍🌾", cat: "personas" },
    { palabras: ["mecanico", "reparador"], img: "👨‍🔧", cat: "personas" },
    { palabras: ["obrero", "constructor", "albañil"], img: "👷", cat: "personas" },
    { palabras: ["piloto", "aviador"], img: "👨‍✈️", cat: "personas" },
    { palabras: ["astronauta", "cosmonauta"], img: "👨‍🚀", cat: "personas" },
    { palabras: ["cientifico", "investigador"], img: "👨‍🔬", cat: "personas" },
    { palabras: ["artista", "pintor"], img: "👨‍🎨", cat: "personas" },
    { palabras: ["cantante", "musico"], img: "👨‍🎤", cat: "personas" },
    { palabras: ["estudiante", "alumno", "escolar"], img: "👨‍🎓", cat: "personas" },
    { palabras: ["juez", "magistrado"], img: "👨‍⚖️", cat: "personas" },
    { palabras: ["detective", "espia"], img: "🕵️", cat: "personas" },
    { palabras: ["rey", "monarca", "soberano"], img: "🤴", cat: "personas" },
    { palabras: ["reina"], img: "👸", cat: "personas" },
    { palabras: ["principe"], img: "🤴", cat: "personas" },
    { palabras: ["princesa"], img: "👸", cat: "personas" },

    { palabras: ["abuelo", "abuelito", "yayo"], img: "👴", cat: "personas" },
    { palabras: ["abuela", "abuelita", "yaya"], img: "👵", cat: "personas" },
    { palabras: ["tio", "tito"], img: "👨", cat: "personas" },
    { palabras: ["tia", "tita"], img: "👩", cat: "personas" },
    { palabras: ["primo", "prima"], img: "🧒", cat: "personas" },
    { palabras: ["bebe", "nene", "nena", "guagua"], img: "👶", cat: "personas" },
    { palabras: ["hermano", "hermanito"], img: "👦", cat: "personas" },
    { palabras: ["hermana", "hermanita"], img: "👧", cat: "personas" },
    { palabras: ["amigo", "amigos", "compi", "compañero"], img: "🧑‍🤝‍🧑", cat: "personas" },
    { palabras: ["familia", "familiares", "parientes"], img: "👨‍👩‍👦", cat: "personas" },

    { palabras: ["saltar", "brincar", "salto", "saltando"], img: "🦘", cat: "acciones" },
    { palabras: ["correr", "corriendo", "carrera", "trote", "trotar"], img: "🏃", cat: "acciones" },
    { palabras: ["caminar", "andar", "pasear", "andando", "caminando", "paseando", "marcha"], img: "🚶", cat: "acciones" },
    { palabras: ["nadar", "nadando", "bucear", "natacion"], img: "🏊", cat: "acciones" },
    { palabras: ["volar", "volando", "vuelo"], img: "🦅", cat: "acciones" },
    { palabras: ["bailar", "danzar", "bailando", "baile", "danza"], img: "💃", cat: "acciones" },
    { palabras: ["cantar", "cantando", "canto", "cancion"], img: "🎤", cat: "acciones" },
    { palabras: ["dibujar", "pintar", "colorear", "dibujando", "trazar", "bocetar"], img: "🖍️", cat: "acciones" },
    { palabras: ["escribir", "escribiendo", "redactar", "apuntar", "anotar"], img: "✍️", cat: "acciones" },
    { palabras: ["leer", "leyendo", "lectura"], img: "📖", cat: "acciones" },
    { palabras: ["estudiar", "aprendiendo", "aprender", "repasar", "estudio"], img: "📚", cat: "acciones" },
    { palabras: ["jugar", "jugando", "divertirse", "juego", "partida"], img: "🎲", cat: "acciones" },
    { palabras: ["dormir", "durmiendo", "descansar", "siesta", "sueño", "soñar"], img: "😴", cat: "acciones" },
    { palabras: ["comer", "comiendo", "alimentarse", "cenar", "almorzar", "desayunar"], img: "🍽️", cat: "acciones" },
    { palabras: ["beber", "tomar", "bebiendo", "tragar", "sorber"], img: "🥤", cat: "acciones" },
    { palabras: ["limpiar", "limpiando", "asear", "lavar", "fregar", "barrer"], img: "🧹", cat: "acciones" },
    { palabras: ["cocinar", "guisar", "preparar", "hornear", "freir"], img: "🍳", cat: "acciones" },
    { palabras: ["comprar", "pagar", "adquirir", "comprando", "compra", "gastar"], img: "🛒", cat: "acciones" },
    { palabras: ["vender", "vendiendo", "venta", "comerciar"], img: "💰", cat: "acciones" },
    { palabras: ["trabajar", "laborar", "currando", "currar", "trabajo", "empleo"], img: "💼", cat: "acciones" },
    { palabras: ["ayudar", "colaborar", "apoyar", "auxiliar", "socorrer", "ayuda"], img: "🤝", cat: "acciones" },
    { palabras: ["mirar", "ver", "observar", "contemplar", "viendo", "mirando", "vistazo"], img: "👀", cat: "acciones" },
    { palabras: ["escuchar", "oir", "atender", "oyendo", "escuchando"], img: "👂", cat: "acciones" },
    { palabras: ["hablar", "decir", "conversar", "charlar", "dialogar", "platicar", "comunicar"], img: "🗣️", cat: "acciones" },
    { palabras: ["llorar", "sollozar", "llanto", "lagrimas", "llorando"], img: "😭", cat: "acciones" },
    { palabras: ["reir", "sonreir", "carcajada", "risa", "riendo", "sonriendo"], img: "😂", cat: "acciones" },
    { palabras: ["gritar", "chillar", "vociferar", "grito", "alarido", "clamar"], img: "😱", cat: "acciones" },
    { palabras: ["pensar", "meditar", "reflexionar", "pensamiento", "idea", "razonar", "creer"], img: "🤔", cat: "acciones" },
    { palabras: ["abrazar", "achuchar", "abrazo", "abrazando"], img: "🫂", cat: "acciones" },
    { palabras: ["besar", "beso", "besito", "besando"], img: "💋", cat: "acciones" },
    { palabras: ["pelear", "luchar", "pelea", "discutir", "batallar", "combatir"], img: "🥊", cat: "acciones" },
    { palabras: ["ganar", "vencer", "triunfar", "victoria", "ganador"], img: "🏆", cat: "acciones" },
    { palabras: ["perder", "derrota", "fracaso", "perdedor"], img: "📉", cat: "acciones" },
    { palabras: ["abrir", "abierto", "iniciar", "destapar", "desplegar"], img: "🔓", cat: "acciones" },
    { palabras: ["cerrar", "cerrado", "terminar", "tapar", "clausurar"], img: "🔒", cat: "acciones" },
    { palabras: ["subir", "ascender", "escalar", "elevar", "montar", "trepar"], img: "⬆️", cat: "acciones" },
    { palabras: ["bajar", "descender", "descenso", "caer", "descender"], img: "⬇️", cat: "acciones" },
    { palabras: ["entrar", "ingresar", "entrada", "acceder", "pasar"], img: "🚪", cat: "acciones" },
    { palabras: ["salir", "marcharse", "salida", "partir", "abandonar", "irse"], img: "🏃‍♂️", cat: "acciones" },
    { palabras: ["dar", "entregar", "regalar", "ofrecer", "otorgar", "donar"], img: "🎁", cat: "acciones" },
    { palabras: ["recibir", "aceptar", "coger", "tomar", "obtener", "conseguir"], img: "🤲", cat: "acciones" },
    { palabras: ["buscar", "explorar", "rastrear", "indagar", "investigar", "busqueda"], img: "🔍", cat: "acciones" },
    { palabras: ["encontrar", "hallar", "descubrir", "localizar", "topar", "hallazgo"], img: "📍", cat: "acciones" },
    { palabras: ["esconder", "ocultar", "tapar", "escondite", "disimular", "guardar"], img: "🙈", cat: "acciones" },
    { palabras: ["romper", "quebrar", "destruir", "partir", "estropear", "fracturar"], img: "💥", cat: "acciones" },
    { palabras: ["arreglar", "reparar", "solucionar", "componer", "apañar"], img: "🔧", cat: "acciones" },
    { palabras: ["construir", "edificar", "armar", "fabricar", "crear"], img: "🏗️", cat: "acciones" },
    { palabras: ["cortar", "tijeretear", "rebanar", "picar", "tajar", "seccionar"], img: "✂️", cat: "acciones" },
    { palabras: ["pegar", "adherir", "unir", "juntar", "engomar"], img: "🧴", cat: "acciones" },
    { palabras: ["pintar", "colorear", "barnizar", "teñir"], img: "🖌️", cat: "acciones" },
    { palabras: ["viajar", "viaje", "turismo", "recorrer", "desplazarse"], img: "✈️", cat: "acciones" },
    { palabras: ["esperar", "aguardar", "espera"], img: "⏳", cat: "acciones" },
    { palabras: ["parar", "detener", "alto", "frenar", "pausa"], img: "🛑", cat: "acciones" },
    { palabras: ["empezar", "comenzar", "iniciar", "arrancar", "principio"], img: "▶️", cat: "acciones" },
    { palabras: ["terminar", "acabar", "finalizar", "concluir", "fin"], img: "⏹️", cat: "acciones" },

    { palabras: ["rojo", "colorado", "carmesi", "escarlata"], img: "🔴", cat: "objetos" },
    { palabras: ["azul", "celeste", "añil"], img: "🔵", cat: "objetos" },
    { palabras: ["verde", "esmeralda"], img: "🟢", cat: "objetos" },
    { palabras: ["amarillo", "dorado", "rubio"], img: "🟡", cat: "objetos" },
    { palabras: ["naranja", "anaranjado"], img: "🟠", cat: "objetos" },
    { palabras: ["morado", "lila", "violeta", "purpura"], img: "🟣", cat: "objetos" },
    { palabras: ["rosa", "rosado", "fucsia"], img: "🌸", cat: "objetos" },
    { palabras: ["marron", "cafe", "castaño", "pardo"], img: "🟤", cat: "objetos" },
    { palabras: ["negro", "oscuro", "azabache"], img: "⚫", cat: "objetos" },
    { palabras: ["blanco", "claro", "niveo", "albo"], img: "⚪", cat: "objetos" },
    { palabras: ["gris", "plateado", "plomo"], img: "🩶", cat: "objetos" },

    { palabras: ["uno", "1"], img: "1️⃣", cat: "objetos" },
    { palabras: ["dos", "2"], img: "2️⃣", cat: "objetos" },
    { palabras: ["tres", "3"], img: "3️⃣", cat: "objetos" },
    { palabras: ["cuatro", "4"], img: "4️⃣", cat: "objetos" },
    { palabras: ["cinco", "5"], img: "5️⃣", cat: "objetos" },
    { palabras: ["seis", "6"], img: "6️⃣", cat: "objetos" },
    { palabras: ["siete", "7"], img: "7️⃣", cat: "objetos" },
    { palabras: ["ocho", "8"], img: "8️⃣", cat: "objetos" },
    { palabras: ["nueve", "9"], img: "9️⃣", cat: "objetos" },
    { palabras: ["diez", "10"], img: "🔟", cat: "objetos" },

    { palabras: ["cero", "0", "nada", "vacio", "ninguno"], img: "0️⃣", cat: "objetos" },
    { palabras: ["mucho", "muchos", "montón", "bastante", "abundante", "demasiado"], img: "➕", cat: "objetos" },
    { palabras: ["poco", "pocos", "escaso", "poquito", "menos"], img: "➖", cat: "objetos" },
    { palabras: ["todo", "todos", "entero", "completo"], img: "💯", cat: "objetos" },
    { palabras: ["mitad", "medio", "partido"], img: "🌗", cat: "objetos" },

    { palabras: ["lunes"], img: "📅", cat: "objetos" },
    { palabras: ["martes"], img: "📅", cat: "objetos" },
    { palabras: ["miercoles"], img: "📅", cat: "objetos" },
    { palabras: ["jueves"], img: "📅", cat: "objetos" },
    { palabras: ["viernes"], img: "📅", cat: "objetos" },
    { palabras: ["sabado"], img: "📅", cat: "objetos" },
    { palabras: ["domingo"], img: "📅", cat: "objetos" },
    { palabras: ["semana"], img: "📆", cat: "objetos" },
    { palabras: ["mes", "meses"], img: "🗓️", cat: "objetos" },
    { palabras: ["año", "años", "anual"], img: "🎇", cat: "objetos" },

    { palabras: ["hoy", "actualmente", "ahora", "presente"], img: "👇", cat: "objetos" },
    { palabras: ["mañana", "despues", "luego", "futuro"], img: "👉", cat: "objetos" },
    { palabras: ["ayer", "antes", "pasado"], img: "👈", cat: "objetos" },
    { palabras: ["siempre", "eternamente"], img: "♾️", cat: "objetos" },
    { palabras: ["nunca", "jamas"], img: "🚫", cat: "objetos" },
    { palabras: ["pronto", "temprano", "rapido"], img: "🐇", cat: "objetos" },
    { palabras: ["tarde", "lento", "retrasado", "despacio"], img: "🐢", cat: "objetos" },
    { palabras: ["dia", "jornada", "diurno"], img: "☀️", cat: "objetos" },
    { palabras: ["noche", "nocturno", "madrugada"], img: "🌙", cat: "objetos" },
    { palabras: ["mañana", "amanecer", "alba"], img: "🌅", cat: "objetos" },
    { palabras: ["tarde", "atardecer", "ocaso"], img: "🌇", cat: "objetos" },

    { palabras: ["primavera"], img: "🌷", cat: "objetos" },
    { palabras: ["verano", "estio"], img: "🏖️", cat: "objetos" },
    { palabras: ["otoño"], img: "🍂", cat: "objetos" },
    { palabras: ["invierno"], img: "❄️", cat: "objetos" },

    { palabras: ["sol", "soleado"], img: "☀️", cat: "objetos" },
    { palabras: ["luna", "lunar"], img: "🌙", cat: "objetos" },
    { palabras: ["estrella", "estrellas", "astro", "lucero"], img: "⭐", cat: "objetos" },
    { palabras: ["nube", "nublado"], img: "☁️", cat: "objetos" },
    { palabras: ["lluvia", "llover", "chubasco", "aguacero", "tormenta"], img: "🌧️", cat: "objetos" },
    { palabras: ["nieve", "nevar", "copo"], img: "🌨️", cat: "objetos" },
    { palabras: ["viento", "aire", "brisa", "ventisca", "huracan", "tornado"], img: "🌬️", cat: "objetos" },
    { palabras: ["rayo", "relampago", "trueno"], img: "⚡", cat: "objetos" },
    { palabras: ["arcoiris"], img: "🌈", cat: "objetos" },

    { palabras: ["frio", "helado", "congelado", "gelido"], img: "🥶", cat: "emociones" },
    { palabras: ["calor", "caliente", "ardiente", "templado", "tibio"], img: "🥵", cat: "emociones" },
    { palabras: ["bueno", "bien", "correcto", "positivo", "genial", "estupendo", "fantastico", "excelente"], img: "👍", cat: "emociones" },
    { palabras: ["malo", "mal", "incorrecto", "negativo", "pesimo", "horrible", "terrible"], img: "👎", cat: "emociones" },
    { palabras: ["bonito", "hermoso", "lindo", "bello", "precioso", "guapo"], img: "✨", cat: "emociones" },
    { palabras: ["feo", "horrendo", "espantoso"], img: "🧟", cat: "emociones" },
    { palabras: ["grande", "enorme", "gigante", "inmenso", "mayusculo"], img: "🐘", cat: "objetos" },
    { palabras: ["pequeño", "chico", "diminuto", "enano", "minusculo"], img: "🐜", cat: "objetos" },
    { palabras: ["alto", "elevado", "gigante"], img: "🦒", cat: "objetos" },
    { palabras: ["bajo", "chaparro", "cortito"], img: "🐁", cat: "objetos" },
    { palabras: ["largo", "extenso", "prolongado"], img: "📏", cat: "objetos" },
    { palabras: ["corto", "breve"], img: "🤏", cat: "objetos" },
    { palabras: ["gordo", "obeso", "grueso", "ancho"], img: "🦛", cat: "objetos" },
    { palabras: ["flaco", "delgado", "fino", "estrecho"], img: "🥢", cat: "objetos" },
    { palabras: ["fuerte", "robusto", "musculoso", "vigoroso", "potente", "resistente", "duro"], img: "💪", cat: "objetos" },
    { palabras: ["debil", "flojo", "fragil", "blando"], img: "🥀", cat: "objetos" },
    { palabras: ["rapido", "veloz", "ligero", "pronto", "agil"], img: "🚀", cat: "objetos" },
    { palabras: ["lento", "despacio", "pausado", "tardo"], img: "🐌", cat: "objetos" },
    { palabras: ["pesado", "plomo", "lastre"], img: "🪨", cat: "objetos" },
    { palabras: ["ligero", "liviano", "leve"], img: "🪶", cat: "objetos" },
    { palabras: ["limpio", "aseado", "pulcro", "puro", "inmaculado"], img: "✨", cat: "objetos" },
    { palabras: ["sucio", "manchado", "pringoso", "cochino", "mugriento", "inmundo"], img: "💩", cat: "objetos" },
    { palabras: ["nuevo", "estreno", "reciente", "flamante", "moderno", "novedoso"], img: "🆕", cat: "objetos" },
    { palabras: ["viejo", "antiguo", "usado", "añejo", "anciano", "obsoleto"], img: "🏺", cat: "objetos" },
    { palabras: ["joven", "adolescente", "juvenil"], img: "🧒", cat: "personas" },
    { palabras: ["rico", "delicioso", "sabroso", "exquisito", "apetitoso", "gustoso"], img: "😋", cat: "emociones" },
    { palabras: ["dulce", "azucarado", "goloso", "meloso"], img: "🍭", cat: "alimentos" },
    { palabras: ["salado"], img: "🥨", cat: "alimentos" },
    { palabras: ["amargo"], img: "☕", cat: "alimentos" },
    { palabras: ["acido", "agrio"], img: "🍋", cat: "alimentos" },
    { palabras: ["picante"], img: "🌶️", cat: "alimentos" },
    { palabras: ["facil", "sencillo", "chupado", "simple", "elemental"], img: "✅", cat: "objetos" },
    { palabras: ["dificil", "complicado", "duro", "complejo", "arduo"], img: "🧩", cat: "objetos" },
    { palabras: ["lleno", "repleto", "colmado", "atestado", "ocupado"], img: "🈵", cat: "objetos" },
    { palabras: ["vacio", "desierto", "desocupado", "libre"], img: "🈳", cat: "objetos" },

    { palabras: ["sorprendido", "asombrado", "pasmoso", "estupefacto", "alucinado", "sorpresa", "susto"], img: "😲", cat: "emociones" },
    { palabras: ["nervioso", "ansioso", "inquieto", "tenso", "alterado"], img: "😬", cat: "emociones" },
    { palabras: ["aburrido", "hastiado", "cansado", "pesado", "monotono", "aburrimiento"], img: "🥱", cat: "emociones" },
    { palabras: ["enfermo", "malo", "pachucho", "indispuesto", "dolorido", "enfermedad", "virus", "fiebre"], img: "🤒", cat: "emociones" },
    { palabras: ["sano", "saludable", "curado", "fuerte"], img: "💪", cat: "emociones" },
    { palabras: ["loco", "chiflado", "zumbado", "majareta", "disparatado"], img: "🤪", cat: "emociones" },
    { palabras: ["enamorado", "querido", "amado", "amoroso", "cariñoso", "romantico"], img: "😍", cat: "emociones" },
    { palabras: ["confundido", "liado", "perdido", "desconcertado", "desorientado", "dudoso"], img: "😕", cat: "emociones" },
    { palabras: ["mareado", "aturdido", "vertigo"], img: "🥴", cat: "emociones" },

    { palabras: ["pizza", "pizzas"], img: "🍕", cat: "alimentos" },
    { palabras: ["hamburguesa", "burger", "hamburguesas"], img: "🍔", cat: "alimentos" },
    { palabras: ["perrito", "hotdog", "salchicha", "frankfurt"], img: "🌭", cat: "alimentos" },
    { palabras: ["patatas", "papas", "fritas"], img: "🍟", cat: "alimentos" },
    { palabras: ["pan", "bollo", "barra", "hogaza", "baguette"], img: "🥖", cat: "alimentos" },
    { palabras: ["bocadillo", "sandwich", "emparedado", "bocata"], img: "🥪", cat: "alimentos" },
    { palabras: ["queso", "quesos"], img: "🧀", cat: "alimentos" },
    { palabras: ["huevo", "huevos", "yema", "clara", "tortilla", "huevo frito"], img: "🥚", cat: "alimentos" },
    { palabras: ["carne", "chuleta", "filete", "bistec", "pollo"], img: "🥩", cat: "alimentos" },
    { palabras: ["pescado", "peces", "marisco", "salmon", "atun", "merluza"], img: "🐟", cat: "alimentos" },
    { palabras: ["sopa", "caldo", "puchero", "cocido", "pure"], img: "🥣", cat: "alimentos" },
    { palabras: ["ensalada", "lechuga", "verdura"], img: "🥗", cat: "alimentos" },
    { palabras: ["arroz", "paella"], img: "🍚", cat: "alimentos" },
    { palabras: ["pasta", "espaguetis", "macarrones", "fideos", "tallarines"], img: "🍝", cat: "alimentos" },
    { palabras: ["galleta", "galletas", "pasta"], img: "🍪", cat: "alimentos" },
    { palabras: ["pastel", "tarta", "bizcocho", "torta", "dulce"], img: "🍰", cat: "alimentos" },
    { palabras: ["helado", "polo", "cucurucho", "sorbete"], img: "🍦", cat: "alimentos" },
    { palabras: ["chocolate", "cacao", "bombon", "tableta"], img: "🍫", cat: "alimentos" },
    { palabras: ["caramelo", "chuche", "chucheria", "golosina", "dulce"], img: "🍬", cat: "alimentos" },
    { palabras: ["fruta", "frutas"], img: "🍎", cat: "alimentos" },
    { palabras: ["manzana", "manzanas"], img: "🍎", cat: "alimentos" },
    { palabras: ["platano", "banana", "platanos", "bananas"], img: "🍌", cat: "alimentos" },
    { palabras: ["naranja", "mandarina", "naranjas"], img: "🍊", cat: "alimentos" },
    { palabras: ["limon", "lima"], img: "🍋", cat: "alimentos" },
    { palabras: ["uva", "uvas", "racimo"], img: "🍇", cat: "alimentos" },
    { palabras: ["fresa", "frutilla", "fresas"], img: "🍓", cat: "alimentos" },
    { palabras: ["sandia", "melon"], img: "🍉", cat: "alimentos" },
    { palabras: ["cereza", "cerezas", "picota"], img: "🍒", cat: "alimentos" },
    { palabras: ["melocoton", "durazno"], img: "🍑", cat: "alimentos" },
    { palabras: ["pera", "peras"], img: "🍐", cat: "alimentos" },
    { palabras: ["piña", "anana"], img: "🍍", cat: "alimentos" },
    { palabras: ["kiwi", "kiwis"], img: "🥝", cat: "alimentos" },
    { palabras: ["tomate", "tomates"], img: "🍅", cat: "alimentos" },
    { palabras: ["zanahoria", "zanahorias"], img: "🥕", cat: "alimentos" },
    { palabras: ["patata", "papa", "patatas"], img: "🥔", cat: "alimentos" },
    { palabras: ["cebolla", "cebollas", "ajo"], img: "🧅", cat: "alimentos" },
    { palabras: ["maiz", "mazorca", "elote"], img: "🌽", cat: "alimentos" },
    { palabras: ["brocoli", "coliflor"], img: "🥦", cat: "alimentos" },
    { palabras: ["pepino", "calabacin"], img: "🥒", cat: "alimentos" },
    { palabras: ["pimiento", "aji", "chile"], img: "🫑", cat: "alimentos" },
    { palabras: ["champiñon", "seta", "hongo"], img: "🍄", cat: "alimentos" },
    { palabras: ["leche", "batido", "lacteo"], img: "🥛", cat: "alimentos" },
    { palabras: ["zumos", "zumo", "jugo", "refresco", "bebida"], img: "🧃", cat: "alimentos" },
    { palabras: ["cafe", "te", "infusion"], img: "☕", cat: "alimentos" },

    { palabras: ["juguete", "juguetes", "muñeco"], img: "🧸", cat: "objetos" },
    { palabras: ["pelota", "balon", "bola", "esfera"], img: "⚽", cat: "objetos" },
    { palabras: ["coche", "auto", "automovil", "carro", "vehiculo"], img: "🚗", cat: "objetos" },
    { palabras: ["camion", "furgoneta", "trailer"], img: "🚚", cat: "objetos" },
    { palabras: ["tren", "ferrocarril", "locomotora", "vagon"], img: "🚂", cat: "objetos" },
    { palabras: ["avion", "aeroplano", "aeronave"], img: "✈️", cat: "objetos" },
    { palabras: ["barco", "bote", "navio", "buque", "yate", "lancha"], img: "🚢", cat: "objetos" },
    { palabras: ["bicicleta", "bici"], img: "🚲", cat: "objetos" },
    { palabras: ["moto", "motocicleta"], img: "🏍️", cat: "objetos" },
    { palabras: ["autobus", "bus", "guagua", "colectivo", "micro"], img: "🚌", cat: "objetos" },
    { palabras: ["tractor", "excavadora"], img: "🚜", cat: "objetos" },
    { palabras: ["patinete", "monopatin", "scooter"], img: "🛴", cat: "objetos" },
    { palabras: ["libro", "cuento", "libros", "manual", "texto", "obra"], img: "📕", cat: "objetos" },
    { palabras: ["lapiz", "boligrafo", "boli", "rotulador", "pluma"], img: "✏️", cat: "objetos" },
    { palabras: ["cuaderno", "libreta", "bloc", "agenda", "diario"], img: "📓", cat: "objetos" },
    { palabras: ["tijeras", "tijera"], img: "✂️", cat: "objetos" },
    { palabras: ["pegamento", "cola"], img: "🧴", cat: "objetos" },
    { palabras: ["mochila", "cartera", "bolsa", "macuto"], img: "🎒", cat: "objetos" },
    { palabras: ["ordenador", "computadora", "pc", "portatil", "laptop"], img: "💻", cat: "objetos" },
    { palabras: ["tablet", "tableta", "ipad"], img: "📱", cat: "objetos" },
    { palabras: ["telefono", "movil", "celular", "smartphone"], img: "📱", cat: "objetos" },
    { palabras: ["television", "tele", "tv", "pantalla", "televisor"], img: "📺", cat: "objetos" },
    { palabras: ["reloj", "despertador", "cronometro"], img: "⌚", cat: "objetos" },
    { palabras: ["camara", "foto", "fotografia"], img: "📷", cat: "objetos" },
    { palabras: ["gafas", "lentes", "anteojos", "espejuelos"], img: "👓", cat: "objetos" },
    { palabras: ["ropa", "prendas", "vestimenta", "vestuario"], img: "👕", cat: "objetos" },
    { palabras: ["pantalon", "pantalones", "vaqueros", "jeans"], img: "👖", cat: "objetos" },
    { palabras: ["camiseta", "camisa", "polo", "remera", "playera"], img: "👕", cat: "objetos" },
    { palabras: ["vestido", "falda", "traje"], img: "👗", cat: "objetos" },
    { palabras: ["abrigo", "chaqueta", "cazadora", "jersey", "sueter", "chamarra"], img: "🧥", cat: "objetos" },
    { palabras: ["zapato", "zapatos", "zapatillas", "botas", "deportivas", "calzado"], img: "👞", cat: "objetos" },
    { palabras: ["calcetin", "calcetines", "medias"], img: "🧦", cat: "objetos" },
    { palabras: ["sombrero", "gorro", "gorra"], img: "🎩", cat: "objetos" },
    { palabras: ["guante", "guantes", "manoplas"], img: "🧤", cat: "objetos" },
    { palabras: ["bufanda", "pañuelo"], img: "🧣", cat: "objetos" },
    { palabras: ["dinero", "billete", "moneda", "efectivo", "pasta"], img: "💵", cat: "objetos" },
    { palabras: ["llave", "llaves"], img: "🔑", cat: "objetos" },
    { palabras: ["puerta", "porton", "entrada"], img: "🚪", cat: "objetos" },
    { palabras: ["ventana", "cristalera", "vidriera"], img: "🪟", cat: "objetos" },
    { palabras: ["cama", "lecho", "somier", "colchon"], img: "🛏️", cat: "objetos" },
    { palabras: ["mesa", "escritorio", "pupitre", "tablero"], img: "🪑", cat: "objetos" }, // Assuming a generic furniture emoji if no table
    { palabras: ["silla", "asiento", "sillon", "butaca", "sofa", "taburete"], img: "🪑", cat: "objetos" },
    { palabras: ["armario", "ropero", "closet"], img: "🚪", cat: "objetos" },
    { palabras: ["espejo", "luna", "reflejo"], img: "🪞", cat: "objetos" },
    { palabras: ["baño", "retrete", "inodoro", "wc", "vater"], img: "🚽", cat: "objetos" },
    { palabras: ["ducha", "bañera", "aseo", "bañarse"], img: "🚿", cat: "objetos" },
    { palabras: ["jabon", "gel", "champu"], img: "🧼", cat: "objetos" },
    { palabras: ["cepillo", "peine"], img: "🪥", cat: "objetos" },
    { palabras: ["papel", "hoja", "folio", "cartulina"], img: "📄", cat: "objetos" },
    { palabras: ["basura", "papelera", "cubo", "tacho", "desperdicio"], img: "🗑️", cat: "objetos" },
    { palabras: ["fuego", "lumbre", "llama", "incendio"], img: "🔥", cat: "objetos" },
    { palabras: ["agua", "liquido"], img: "💧", cat: "objetos" },

    { palabras: ["escuela", "colegio", "insti", "instituto", "guarderia"], img: "🏫", cat: "lugares" },
    { palabras: ["parque", "plaza", "jardin"], img: "🏞️", cat: "lugares" },
    { palabras: ["hospital", "centro medico", "clinica", "ambulatorio"], img: "🏥", cat: "lugares" },
    { palabras: ["tienda", "supermercado", "kiosco", "comercio", "mercado"], img: "🏪", cat: "lugares" },
    { palabras: ["casa", "hogar", "vivienda", "piso", "domicilio", "chalet"], img: "🏠", cat: "lugares" },
    { palabras: ["habitacion", "cuarto", "dormitorio", "alcoba"], img: "🛏️", cat: "lugares" },
    { palabras: ["cocina"], img: "🍳", cat: "lugares" },
    { palabras: ["baño", "lavabo", "aseo", "servicios"], img: "🚽", cat: "lugares" },
    { palabras: ["calle", "avenida", "carretera", "camino", "via", "sendero"], img: "🛣️", cat: "lugares" },
    { palabras: ["ciudad", "pueblo", "villa", "urbe", "metropoli"], img: "🏙️", cat: "lugares" },
    { palabras: ["campo", "prado", "granja", "naturaleza"], img: "🏕️", cat: "lugares" },
    { palabras: ["playa", "costa", "arena", "mar", "oceano"], img: "🏖️", cat: "lugares" },
    { palabras: ["piscina", "pileta", "alberca"], img: "🏊", cat: "lugares" },
    { palabras: ["bosque", "selva", "jungla", "monte"], img: "🌲", cat: "lugares" },
    { palabras: ["montaña", "sierra", "pico"], img: "⛰️", cat: "lugares" },
    { palabras: ["zoo", "zoologico"], img: "🦓", cat: "lugares" },
    { palabras: ["cine", "teatro"], img: "🍿", cat: "lugares" },
    { palabras: ["restaurante", "bar", "cafeteria"], img: "🍽️", cat: "lugares" },
    { palabras: ["aeropuerto"], img: "🛫", cat: "lugares" },
    { palabras: ["estacion"], img: "🚉", cat: "lugares" },

    { palabras: ["musica", "cancion", "melodia", "sonido", "ritmo"], img: "🎵", cat: "otros" },
    { palabras: ["silencio", "callar", "mudo", "chito"], img: "🤫", cat: "otros" },
    { palabras: ["ruido", "estruendo", "bullicio"], img: "🔊", cat: "otros" },
    { palabras: ["fiesta", "cumpleaños", "celebracion", "festejo", "guateque"], img: "🎉", cat: "otros" },
    { palabras: ["regalo", "obsequio", "presente", "sorpresa"], img: "🎁", cat: "otros" },
    { palabras: ["peligro", "cuidado", "atencion", "ojo", "alerta", "precaucion"], img: "⚠️", cat: "otros" },
    { palabras: ["pregunta", "duda", "cuestion", "interrogante"], img: "❓", cat: "otros" },
    { palabras: ["respuesta", "solucion", "explicacion"], img: "💡", cat: "otros" },
    { palabras: ["juego", "partida", "competicion", "torneo"], img: "🎮", cat: "otros" },
    { palabras: ["deporte", "ejercicio", "gimnasia", "entrenamiento"], img: "🏅", cat: "otros" },
    { palabras: ["arte", "pintura", "escultura", "cuadro", "obra"], img: "🎨", cat: "otros" },
    { palabras: ["pelicula", "video", "cine", "serie", "corto"], img: "🎬", cat: "otros" },
    { palabras: ["magia", "truco", "ilusion", "hechizo"], img: "✨", cat: "otros" },
    { palabras: ["fantasma", "espiritu", "espectro"], img: "👻", cat: "otros" },
    { palabras: ["monstruo", "bicho", "bestia"], img: "👹", cat: "otros" },
    { palabras: ["robot", "maquina", "androide", "autómata"], img: "🤖", cat: "otros" },
    { palabras: ["extraterrestre", "alien", "marciano"], img: "👽", cat: "otros" }

    ];

        /* =========================================================================
           2. ESTADO Y VARIABLES GLOBALES
           ========================================================================= */
        const state = {
            customDict: JSON.parse(localStorage.getItem('customDict')) || [],
            favorites: JSON.parse(localStorage.getItem('favorites')) || [],
            settings: {
                highContrast: localStorage.getItem('highContrast') === 'true',
                showText: localStorage.getItem('showText') !== 'false',
                voiceURI: localStorage.getItem('voiceURI') || '',
                voiceRate: parseFloat(localStorage.getItem('voiceRate')) || 1.0,
                theme: localStorage.getItem('theme') || 'light',
                apiKey: localStorage.getItem('apiKey') ? atob(localStorage.getItem('apiKey')) : '',
                autoAI: localStorage.getItem('autoAI') === 'true'
            }
        };

        // Utilidad para obfuscación simple de la key en localStorage
        function getObfuscatedKey(key) {
            return btoa(key);
        }

        // Combina el diccionario interno con los personalizados
        const getFullDict = () => [...diccionario, ...state.customDict];

        // Palabras vacías (Stop words) para filtrar si no tienen significado clave
        const stopWords = ["el", "la", "los", "las", "un", "una", "unos", "unas", "de", "del", "a", "ante", "bajo", "cabe", "con", "contra", "desde", "en", "entre", "hacia", "hasta", "para", "por", "segun", "sin", "so", "sobre", "tras", "y", "e", "o", "u", "ni", "que", "pero", "aunque", "mas"];


        this.diccionario = diccionario;
        this.stopWords = stopWords;
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
