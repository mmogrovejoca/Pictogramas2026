class DictModel {
    constructor(stateModel) {
        this.stateModel = stateModel;
        const diccionario = [

            // PERSONAS Y PRONOMBRES (Naranja)
            { palabras: ["yo", "mi", "me", "conmigo"], img: "🧍", cat: "personas" },
            { palabras: ["tu", "tú", "te", "ti", "contigo"], img: "👉", cat: "personas" },
            { palabras: ["el", "él", "ella", "le", "lo", "la"], img: "👤", cat: "personas" },
            { palabras: ["nosotros", "nosotras", "nos"], img: "👥", cat: "personas" },
            { palabras: ["vosotros", "vosotras", "ustedes", "os"], img: "👉👥", cat: "personas" },
            { palabras: ["ellos", "ellas", "les", "los", "las"], img: "🗣️", cat: "personas" },
            { palabras: ["mama", "mamá", "madre", "mami"], img: "👩", cat: "personas" },
            { palabras: ["papa", "papá", "padre", "papi"], img: "👨", cat: "personas" },
            { palabras: ["hermano", "hermana", "hermanos"], img: "👦", cat: "personas" },
            { palabras: ["abuela", "abuelo", "abuelos"], img: "👵", cat: "personas" },
            { palabras: ["bebe", "bebé", "nene", "nena"], img: "👶", cat: "personas" },
            { palabras: ["amigo", "amiga", "amigos", "compañero"], img: "🧑‍🤝‍🧑", cat: "personas" },
            { palabras: ["profesor", "profesora", "maestro", "profe"], img: "👨‍🏫", cat: "personas" },
            { palabras: ["medico", "médico", "doctor", "doctora"], img: "👨‍⚕️", cat: "personas" },
            { palabras: ["policia", "policía"], img: "👮", cat: "personas" },
            { palabras: ["bombero"], img: "👨‍🚒", cat: "personas" },
            { palabras: ["niño", "niña", "niños", "chico", "chica"], img: "🧒", cat: "personas" },
            { palabras: ["hombre", "señor"], img: "👨", cat: "personas" },
            { palabras: ["mujer", "señora"], img: "👩", cat: "personas" },
            { palabras: ["familia"], img: "👪", cat: "personas" },

            // ACCIONES Y VERBOS COMPLETOS (Azul)
            { palabras: ["querer", "quiero", "quiere", "queremos", "quise", "queria", "quería"], img: "👐", cat: "acciones" },
            { palabras: ["tener", "tengo", "tiene", "tenemos", "tuve", "tenia", "tenía", "teniendo"], img: "🤲", cat: "acciones" },
            { palabras: ["ir", "voy", "vamos", "fue", "fui", "yendo", "iremos", "va", "van"], img: "🚶", cat: "acciones" },
            { palabras: ["venir", "ven", "vengo", "viene", "viniendo", "vinieron", "vino"], img: "🏃", cat: "acciones" },
            { palabras: ["estar", "estoy", "esta", "está", "estamos", "estuve", "estaba", "estando", "estan", "están"], img: "📍", cat: "acciones" },
            { palabras: ["ser", "soy", "es", "somos", "fui", "era", "siendo", "son"], img: "👤", cat: "acciones" },
            { palabras: ["hacer", "hago", "hace", "hacemos", "hice", "haciendo", "hacen"], img: "🛠️", cat: "acciones" },
            { palabras: ["ver", "veo", "mirar", "miro", "ve", "vimos", "viendo", "mira", "mirando"], img: "👁️", cat: "acciones" },
            { palabras: ["escuchar", "escucho", "oir", "oigo", "escucha", "escuchando", "oye", "oyendo"], img: "👂", cat: "acciones" },
            { palabras: ["comer", "como", "come", "comiendo", "comemos", "comi", "comí", "comeran", "comio"], img: "🍽️", cat: "acciones" },
            { palabras: ["beber", "bebo", "bebe", "tomar", "tomo", "toma", "bebiendo", "tomando"], img: "🚰", cat: "acciones" },
            { palabras: ["dormir", "duermo", "duerme", "dormimos", "durmiendo", "durmio"], img: "💤", cat: "acciones" },
            { palabras: ["jugar", "juego", "juega", "jugamos", "jugando", "jugue"], img: "🎮", cat: "acciones" },
            { palabras: ["correr", "corro", "corre", "corriendo", "corremos", "corri"], img: "🏃‍♂️", cat: "acciones" },
            { palabras: ["saltar", "salto", "salta", "saltando", "saltamos"], img: "🦘", cat: "acciones" },
            { palabras: ["caminar", "camino", "andar", "pasear", "camina", "caminando", "paseando"], img: "🚶‍♂️", cat: "acciones" },
            { palabras: ["hablar", "hablo", "decir", "digo", "habla", "hablando", "dice", "diciendo"], img: "🗣️", cat: "acciones" },
            { palabras: ["leer", "leo", "lee", "leyendo", "leemos", "lei"], img: "📖", cat: "acciones" },
            { palabras: ["escribir", "escribo", "escribe", "escribiendo", "escribimos"], img: "✍️", cat: "acciones" },
            { palabras: ["dibujar", "dibujo", "pintar", "pinto", "dibuja", "dibujando", "pinta", "pintando"], img: "🎨", cat: "acciones" },
            { palabras: ["cantar", "canto", "canta", "cantando", "cantamos"], img: "🎤", cat: "acciones" },
            { palabras: ["bailar", "bailo", "baila", "bailando", "bailamos"], img: "💃", cat: "acciones" },
            { palabras: ["dar", "doy", "da", "dame", "dando", "dimos", "dio"], img: "🎁", cat: "acciones" },
            { palabras: ["tomar", "coger", "agarro", "coge", "cogiendo", "agarrando", "agarra"], img: "✊", cat: "acciones" },
            { palabras: ["poner", "pongo", "pone", "poniendo", "pon", "puso"], img: "📥", cat: "acciones" },
            { palabras: ["quitar", "quito", "quita", "sacar", "quitando", "saca", "sacando"], img: "📤", cat: "acciones" },
            { palabras: ["abrir", "abro", "abre", "abriendo", "abrimos"], img: "👐", cat: "acciones" },
            { palabras: ["cerrar", "cierro", "cierra", "cerrando", "cerramos"], img: "🚪", cat: "acciones" },
            { palabras: ["entrar", "entro", "entra", "entrando", "entramos"], img: "🚶‍♂️➡️", cat: "acciones" },
            { palabras: ["salir", "salgo", "sale", "saliendo", "salimos", "salio"], img: "🚪🏃", cat: "acciones" },
            { palabras: ["subir", "subo", "sube", "subiendo", "subimos"], img: "⬆️", cat: "acciones" },
            { palabras: ["bajar", "bajo", "baje", "baja", "bajando", "bajamos"], img: "⬇️", cat: "acciones" },
            { palabras: ["esperar", "espero", "espera", "esperando", "esperamos"], img: "⏳", cat: "acciones" },
            { palabras: ["parar", "paro", "para", "detener", "parando", "deteniendo"], img: "🛑", cat: "acciones" },
            { palabras: ["ayudar", "ayudo", "ayuda", "ayudame", "ayudando", "ayudamos"], img: "🤝", cat: "acciones" },
            { palabras: ["gustar", "gusta", "gusto", "agradar", "gustan"], img: "👍", cat: "acciones" },
            { palabras: ["pensar", "pienso", "piensa", "pensando", "pensamos"], img: "💭", cat: "acciones" },
            { palabras: ["saber", "se", "sé", "sabe", "sabiendo", "sabemos", "supo"], img: "💡", cat: "acciones" },
            { palabras: ["aprender", "aprendo", "aprende", "aprendiendo", "aprendemos"], img: "🧠", cat: "acciones" },
            { palabras: ["lavar", "lavo", "lava", "limpiar", "limpia", "lavando", "limpiando"], img: "🧼", cat: "acciones" },
            { palabras: ["bañar", "baño", "duchar", "ducho", "bañando", "duchando", "baña"], img: "🛀", cat: "acciones" },
            { palabras: ["vestir", "visto", "ropa", "ponerse", "vistiendo", "viste"], img: "👕", cat: "acciones" },
            { palabras: ["comprar", "compro", "compra", "comprando", "compramos"], img: "🛒", cat: "acciones" },
            { palabras: ["pagar", "pago", "paga", "pagando", "pagamos"], img: "💵", cat: "acciones" },
            { palabras: ["llorar", "lloro", "llora", "llorando", "lloramos"], img: "😢", cat: "acciones" },
            { palabras: ["reir", "rio", "rie", "sonreir", "riendo", "sonriendo", "sonrie"], img: "😄", cat: "acciones" },
            { palabras: ["gritar", "grito", "grita", "gritando", "gritamos"], img: "😫", cat: "acciones" },
            { palabras: ["abrazar", "abrazo", "abraza", "abrazando", "abrazamos"], img: "🫂", cat: "acciones" },
            { palabras: ["besar", "beso", "besa", "besando", "besamos"], img: "💋", cat: "acciones" },
            { palabras: ["doler", "duele", "lastimar", "doliendo", "duelen"], img: "🤕", cat: "acciones" },
            { palabras: ["terminar", "termino", "acabar", "fin", "terminando", "termina"], img: "🏁", cat: "acciones" },
            { palabras: ["caer", "caigo", "cae", "cayendo", "cayo", "caí"], img: "💥", cat: "acciones" },
            { palabras: ["romper", "rompo", "rompe", "rompiendo", "roto"], img: "🔨", cat: "acciones" },
            { palabras: ["trabajar", "trabajo", "trabaja", "trabajando"], img: "💼", cat: "acciones" },
            { palabras: ["estudiar", "estudio", "estudia", "estudiando"], img: "📚", cat: "acciones" },
            { palabras: ["ganar", "gano", "gana", "ganando"], img: "🏆", cat: "acciones" },
            { palabras: ["perder", "pierdo", "pierde", "perdiendo"], img: "❌", cat: "acciones" },
            { palabras: ["volar", "vuelo", "vuela", "volando"], img: "🦅", cat: "acciones" },
            { palabras: ["nadar", "nado", "nada", "nadando"], img: "🏊", cat: "acciones" },
            { palabras: ["pelear", "peleo", "pelea", "peleando", "luchar"], img: "🥊", cat: "acciones" },
            { palabras: ["esconder", "escondo", "esconde", "escondiendo"], img: "🙈", cat: "acciones" },
            { palabras: ["buscar", "busco", "busca", "buscando"], img: "🔍", cat: "acciones" },
            { palabras: ["encontrar", "encuentro", "encuentra", "encontrando"], img: "🎯", cat: "acciones" },
            { palabras: ["cocinar", "cocino", "cocina", "cocinando"], img: "🍳", cat: "acciones" },
            { palabras: ["cortar", "corto", "corta", "cortando"], img: "✂️", cat: "acciones" },
            { palabras: ["peinar", "peino", "peina", "peinando"], img: "🪮", cat: "acciones" },
            { palabras: ["cepillar", "cepillo", "cepilla", "cepillando"], img: "🪥", cat: "acciones" },
            { palabras: ["despertar", "despierto", "despierta", "despertando"], img: "⏰", cat: "acciones" },
            { palabras: ["levantar", "levanto", "levanta", "levantando"], img: "⬆️", cat: "acciones" },
            { palabras: ["sentar", "siento", "sienta", "sentando"], img: "🪑", cat: "acciones" },
            { palabras: ["acostar", "acuesto", "acuesta", "acostando"], img: "🛏️", cat: "acciones" },

            // OBJETOS (Amarillo)
            { palabras: ["agua", "aguas"], img: "💧", cat: "objetos" },
            { palabras: ["juguete", "juguetes"], img: "🧸", cat: "objetos" },
            { palabras: ["pelota", "balon", "bola"], img: "⚽", cat: "objetos" },
            { palabras: ["coche", "auto", "carro", "vehiculo"], img: "🚗", cat: "objetos" },
            { palabras: ["tren", "ferrocarril"], img: "🚂", cat: "objetos" },
            { palabras: ["avion", "avión"], img: "✈️", cat: "objetos" },
            { palabras: ["barco", "bote", "lancha"], img: "⛵", cat: "objetos" },
            { palabras: ["bicicleta", "bici"], img: "🚲", cat: "objetos" },
            { palabras: ["libro", "cuento", "libros"], img: "📚", cat: "objetos" },
            { palabras: ["lapiz", "lápiz", "boli", "boligrafo", "lapicero"], img: "✏️", cat: "objetos" },
            { palabras: ["papel", "hoja", "folio"], img: "📄", cat: "objetos" },
            { palabras: ["tijeras", "tijera"], img: "✂️", cat: "objetos" },
            { palabras: ["pegamento", "cola"], img: "🧴", cat: "objetos" },
            { palabras: ["mesa", "escritorio", "pupitre"], img: "🪑", cat: "objetos" },
            { palabras: ["silla", "asiento", "sillon"], img: "🪑", cat: "objetos" },
            { palabras: ["cama", "camita"], img: "🛏️", cat: "objetos" },
            { palabras: ["sofa", "sofá"], img: "🛋️", cat: "objetos" },
            { palabras: ["puerta"], img: "🚪", cat: "objetos" },
            { palabras: ["ventana", "cristal"], img: "🪟", cat: "objetos" },
            { palabras: ["television", "tv", "tele", "televisor"], img: "📺", cat: "objetos" },
            { palabras: ["ordenador", "computadora", "pc", "portatil"], img: "💻", cat: "objetos" },
            { palabras: ["tablet", "ipad", "tableta"], img: "📱", cat: "objetos" },
            { palabras: ["telefono", "movil", "celular", "smartphone"], img: "📱", cat: "objetos" },
            { palabras: ["auriculares", "cascos", "audifonos"], img: "🎧", cat: "objetos" },
            { palabras: ["reloj"], img: "⌚", cat: "objetos" },
            { palabras: ["gafas", "lentes", "anteojos"], img: "👓", cat: "objetos" },
            { palabras: ["ropa", "prendas"], img: "👕", cat: "objetos" },
            { palabras: ["pantalon", "pantalón", "pantalones"], img: "👖", cat: "objetos" },
            { palabras: ["camiseta", "playera", "remera"], img: "👕", cat: "objetos" },
            { palabras: ["zapatos", "zapatillas", "calzado"], img: "👟", cat: "objetos" },
            { palabras: ["calcetines", "medias"], img: "🧦", cat: "objetos" },
            { palabras: ["abrigo", "chaqueta", "chamarra", "sueter"], img: "🧥", cat: "objetos" },
            { palabras: ["sombrero", "gorra", "gorro"], img: "🧢", cat: "objetos" },
            { palabras: ["mochila", "bolso", "cartera"], img: "🎒", cat: "objetos" },
            { palabras: ["dinero", "monedas", "billetes"], img: "💰", cat: "objetos" },
            { palabras: ["llaves", "llave"], img: "🔑", cat: "objetos" },
            { palabras: ["cepillo"], img: "🪥", cat: "objetos" },
            { palabras: ["peine"], img: "🪮", cat: "objetos" },
            { palabras: ["jabon", "jabón", "gel"], img: "🧼", cat: "objetos" },
            { palabras: ["toalla"], img: "🧖", cat: "objetos" },
            { palabras: ["papel higienico", "vater"], img: "🧻", cat: "objetos" },
            { palabras: ["plato", "vajilla"], img: "🍽️", cat: "objetos" },
            { palabras: ["vaso", "taza", "copa"], img: "🥛", cat: "objetos" },
            { palabras: ["cubiertos", "cuchara", "tenedor", "cuchillo"], img: "🍴", cat: "objetos" },
            { palabras: ["basura", "papelera", "cubo"], img: "🗑️", cat: "objetos" },
            { palabras: ["regalo", "obsequio"], img: "🎁", cat: "objetos" },
            { palabras: ["foto", "fotografia", "camara"], img: "📷", cat: "objetos" },
            { palabras: ["lluvia", "paraguas"], img: "☂️", cat: "objetos" },
            { palabras: ["sol", "soleado"], img: "☀️", cat: "objetos" },
            { palabras: ["luna", "noche"], img: "🌙", cat: "objetos" },
            { palabras: ["estrella"], img: "⭐", cat: "objetos" },
            { palabras: ["fuego", "lumbre"], img: "🔥", cat: "objetos" },
            { palabras: ["flor", "flores", "planta"], img: "🌸", cat: "objetos" },
            { palabras: ["arbol", "árbol"], img: "🌳", cat: "objetos" },

            // LUGARES (Verde)
            { palabras: ["casa", "hogar", "vivienda"], img: "🏠", cat: "lugares" },
            { palabras: ["colegio", "escuela", "cole", "instituto"], img: "🏫", cat: "lugares" },
            { palabras: ["parque", "plaza"], img: "🏞️", cat: "lugares" },
            { palabras: ["calle", "carretera", "avenida"], img: "🛣️", cat: "lugares" },
            { palabras: ["tienda", "supermercado", "comercio", "mercado"], img: "🏪", cat: "lugares" },
            { palabras: ["hospital", "clinica", "ambulatorio"], img: "🏥", cat: "lugares" },
            { palabras: ["restaurante", "bar", "cafeteria"], img: "🍽️", cat: "lugares" },
            { palabras: ["cine", "teatro"], img: "🎬", cat: "lugares" },
            { palabras: ["playa", "mar", "arena"], img: "🏖️", cat: "lugares" },
            { palabras: ["piscina", "pileta"], img: "🏊", cat: "lugares" },
            { palabras: ["campo", "bosque", "montaña"], img: "🌲", cat: "lugares" },
            { palabras: ["ciudad", "pueblo", "urbe"], img: "🏙️", cat: "lugares" },
            { palabras: ["habitacion", "cuarto", "dormitorio", "pieza"], img: "🛏️", cat: "lugares" },
            { palabras: ["baño", "aseo", "servicio", "lavabo"], img: "🚽", cat: "lugares" },
            { palabras: ["cocina"], img: "🍳", cat: "lugares" },
            { palabras: ["salon", "salón", "comedor", "sala"], img: "🛋️", cat: "lugares" },
            { palabras: ["patio", "jardin", "terraza"], img: "🪴", cat: "lugares" },
            { palabras: ["iglesia", "templo"], img: "⛪", cat: "lugares" },
            { palabras: ["banco"], img: "🏦", cat: "lugares" },

            // EMOCIONES Y ADJETIVOS (Rojo)
            { palabras: ["feliz", "contento", "alegre", "bien", "felicidad", "alegria"], img: "😀", cat: "emociones" },
            { palabras: ["triste", "pena", "mal", "tristeza", "lloroso"], img: "😢", cat: "emociones" },
            { palabras: ["enfadado", "enojado", "rabia", "furioso", "molesto"], img: "😠", cat: "emociones" },
            { palabras: ["asustado", "miedo", "temor", "susto"], img: "😨", cat: "emociones" },
            { palabras: ["sorprendido", "sorpresa", "asombro"], img: "😲", cat: "emociones" },
            { palabras: ["cansado", "sueño", "agotado", "fatiga"], img: "🥱", cat: "emociones" },
            { palabras: ["enfermo", "malo", "pachucho", "malito"], img: "🤒", cat: "emociones" },
            { palabras: ["aburrido", "aburrimiento"], img: "😒", cat: "emociones" },
            { palabras: ["calor", "caliente", "ardiendo", "quemando"], img: "🥵", cat: "emociones" },
            { palabras: ["frio", "frío", "helado", "congelado"], img: "🥶", cat: "emociones" },
            { palabras: ["hambre", "hambriento"], img: "🤤", cat: "emociones" },
            { palabras: ["sed", "sediento"], img: "🥵", cat: "emociones" },
            { palabras: ["bueno", "bien", "genial", "excelente", "estupendo"], img: "👍", cat: "emociones" },
            { palabras: ["malo", "mal", "pesimo", "horrible"], img: "👎", cat: "emociones" },
            { palabras: ["grande", "enorme", "gigante"], img: "🐘", cat: "emociones" },
            { palabras: ["pequeño", "chico", "diminuto", "enano"], img: "🐁", cat: "emociones" },
            { palabras: ["bonito", "lindo", "hermoso", "precioso", "guapo"], img: "✨", cat: "emociones" },
            { palabras: ["feo", "horrendo"], img: "💩", cat: "emociones" },
            { palabras: ["limpio", "aseado", "puro"], img: "✨", cat: "emociones" },
            { palabras: ["sucio", "manchado", "guarro"], img: "💩", cat: "emociones" },
            { palabras: ["rapido", "rápido", "deprisa", "veloz"], img: "🐇", cat: "emociones" },
            { palabras: ["lento", "despacio", "pausado"], img: "🐢", cat: "emociones" },
            { palabras: ["fuerte", "musculoso", "duro"], img: "💪", cat: "emociones" },
            { palabras: ["debil", "débil", "flojo"], img: "🥀", cat: "emociones" },
            { palabras: ["roto", "estropeado", "dañado", "descompuesto"], img: "💔", cat: "emociones" },
            { palabras: ["nuevo", "estrenar"], img: "🆕", cat: "emociones" },
            { palabras: ["viejo", "antiguo", "anciano"], img: "👴", cat: "emociones" },
            { palabras: ["si", "sí", "afirmativo", "claro", "ok", "vale"], img: "✅", cat: "emociones" },
            { palabras: ["no", "negativo", "prohibido", "nunca", "jamas"], img: "❌", cat: "emociones" },
            { palabras: ["mas", "más", "mucho", "bastante"], img: "➕", cat: "emociones" },
            { palabras: ["menos", "poco", "poquito"], img: "➖", cat: "emociones" },
            { palabras: ["todo", "todos", "entero"], img: "💯", cat: "emociones" },
            { palabras: ["nada", "vacio", "ninguno"], img: "🕳️", cat: "emociones" },
            { palabras: ["igual", "mismo"], img: "🟰", cat: "emociones" },
            { palabras: ["diferente", "distinto"], img: "≠", cat: "emociones" },
            { palabras: ["arriba", "encima", "alto"], img: "⬆️", cat: "emociones" },
            { palabras: ["abajo", "debajo", "bajo"], img: "⬇️", cat: "emociones" },
            { palabras: ["dentro", "adentro", "interior"], img: "📥", cat: "emociones" },
            { palabras: ["fuera", "afuera", "exterior"], img: "📤", cat: "emociones" },

            // ALIMENTOS (Marrón)
            { palabras: ["comida", "alimento", "comer"], img: "🍲", cat: "alimentos" },
            { palabras: ["pan", "bollo", "baguette"], img: "🥖", cat: "alimentos" },
            { palabras: ["leche", "lacteo"], img: "🥛", cat: "alimentos" },
            { palabras: ["queso"], img: "🧀", cat: "alimentos" },
            { palabras: ["huevo", "huevos", "tortilla"], img: "🥚", cat: "alimentos" },
            { palabras: ["carne", "filete", "chuleta"], img: "🥩", cat: "alimentos" },
            { palabras: ["pollo", "pavo", "ave"], img: "🍗", cat: "alimentos" },
            { palabras: ["pescado", "pez", "marisco", "atun"], img: "🐟", cat: "alimentos" },
            { palabras: ["arroz", "paella"], img: "🍚", cat: "alimentos" },
            { palabras: ["pasta", "espaguetis", "macarrones", "fideos"], img: "🍝", cat: "alimentos" },
            { palabras: ["fruta", "frutas"], img: "🍎", cat: "alimentos" },
            { palabras: ["manzana"], img: "🍎", cat: "alimentos" },
            { palabras: ["platano", "plátano", "banana"], img: "🍌", cat: "alimentos" },
            { palabras: ["naranja", "mandarina"], img: "🍊", cat: "alimentos" },
            { palabras: ["uva", "uvas"], img: "🍇", cat: "alimentos" },
            { palabras: ["fresa", "frutilla"], img: "🍓", cat: "alimentos" },
            { palabras: ["sandia", "sandía"], img: "🍉", cat: "alimentos" },
            { palabras: ["melon", "melón"], img: "🍈", cat: "alimentos" },
            { palabras: ["verdura", "vegetales", "ensalada"], img: "🥦", cat: "alimentos" },
            { palabras: ["tomate", "jitomate"], img: "🍅", cat: "alimentos" },
            { palabras: ["zanahoria"], img: "🥕", cat: "alimentos" },
            { palabras: ["patata", "papa", "patatas", "papas", "puré"], img: "🥔", cat: "alimentos" },
            { palabras: ["cebolla"], img: "🧅", cat: "alimentos" },
            { palabras: ["ajo"], img: "🧄", cat: "alimentos" },
            { palabras: ["sopa", "caldo", "pure"], img: "🥣", cat: "alimentos" },
            { palabras: ["pizza"], img: "🍕", cat: "alimentos" },
            { palabras: ["hamburguesa"], img: "🍔", cat: "alimentos" },
            { palabras: ["bocadillo", "sandwich", "emparedado"], img: "🥪", cat: "alimentos" },
            { palabras: ["galleta", "galletas", "pasta"], img: "🍪", cat: "alimentos" },
            { palabras: ["pastel", "tarta", "torta", "bizcocho"], img: "🍰", cat: "alimentos" },
            { palabras: ["helado", "polo"], img: "🍦", cat: "alimentos" },
            { palabras: ["chocolate", "cacao", "bombones"], img: "🍫", cat: "alimentos" },
            { palabras: ["caramelo", "chuche", "dulce", "golosina"], img: "🍬", cat: "alimentos" },
            { palabras: ["zumo", "jugo", "refresco"], img: "🧃", cat: "alimentos" },
            { palabras: ["agua", "bebida"], img: "💧", cat: "alimentos" },
            { palabras: ["cafe", "café"], img: "☕", cat: "alimentos" },
            { palabras: ["te", "té", "infusion"], img: "🍵", cat: "alimentos" },
            { palabras: ["sal", "pimienta"], img: "🧂", cat: "alimentos" },
            { palabras: ["azucar", "miel"], img: "🍯", cat: "alimentos" },
            { palabras: ["aceite", "vinagre"], img: "🫙", cat: "alimentos" },

            // ANIMALES (Amarillo / Objetos)
            { palabras: ["animal", "animales", "bicho", "mascota"], img: "🐾", cat: "objetos" },
            { palabras: ["perro", "perrito", "can"], img: "🐶", cat: "objetos" },
            { palabras: ["gato", "gatito", "minino"], img: "🐱", cat: "objetos" },
            { palabras: ["pajaro", "pájaro", "ave", "pajarito"], img: "🐦", cat: "objetos" },
            { palabras: ["pez", "peces", "pescado"], img: "🐟", cat: "objetos" },
            { palabras: ["caballo", "yegua", "potro"], img: "🐴", cat: "objetos" },
            { palabras: ["vaca", "toro", "ternero"], img: "🐮", cat: "objetos" },
            { palabras: ["cerdo", "chancho", "puerco"], img: "🐷", cat: "objetos" },
            { palabras: ["oveja", "cordero", "cabra"], img: "🐑", cat: "objetos" },
            { palabras: ["gallina", "pollo", "gallo", "pollito"], img: "🐔", cat: "objetos" },
            { palabras: ["pato", "oca"], img: "🦆", cat: "objetos" },
            { palabras: ["leon", "león", "leona"], img: "🦁", cat: "objetos" },
            { palabras: ["tigre"], img: "🐯", cat: "objetos" },
            { palabras: ["elefante"], img: "🐘", cat: "objetos" },
            { palabras: ["mono", "simio", "gorila"], img: "🐵", cat: "objetos" },
            { palabras: ["oso", "panda"], img: "🐻", cat: "objetos" },
            { palabras: ["rana", "sapo"], img: "🐸", cat: "objetos" },
            { palabras: ["tortuga"], img: "🐢", cat: "objetos" },
            { palabras: ["serpiente", "culebra", "vibora"], img: "🐍", cat: "objetos" },
            { palabras: ["insecto", "bicho", "mosca", "mosquito"], img: "🪰", cat: "objetos" },
            { palabras: ["araña"], img: "🕷️", cat: "objetos" },
            { palabras: ["mariposa", "oruga"], img: "🦋", cat: "objetos" },
            { palabras: ["abeja", "avispa"], img: "🐝", cat: "objetos" },
            { palabras: ["hormiga"], img: "🐜", cat: "objetos" },
            { palabras: ["caracol"], img: "🐌", cat: "objetos" },
            { palabras: ["raton", "ratón", "rata"], img: "🐭", cat: "objetos" },
            { palabras: ["conejo", "liebre"], img: "🐰", cat: "objetos" },
            { palabras: ["jirafa"], img: "🦒", cat: "objetos" },
            { palabras: ["cebra"], img: "🦓", cat: "objetos" },
            { palabras: ["delfin", "ballena", "tiburon"], img: "🐬", cat: "objetos" },
            { palabras: ["pinguino", "pingüino"], img: "🐧", cat: "objetos" },
            { palabras: ["dinosaurio", "dino"], img: "🦖", cat: "objetos" }

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
                    model: 'anthropic/claude-3-haiku',
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
