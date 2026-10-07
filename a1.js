// L(tema, explicación extendida, "inglés=español|inglés=español|...")
const L = (t, e, w) => ({ t, e, w: w.split("|").map((x) => x.split("=")) });

const A1 = [
// ===== BLOQUE 1 (1-10): Primeros pasos =====
L("Saludos","Hello sirve a cualquier hora. Good morning se usa hasta el mediodía y Good night solo para despedirse de noche.","Hello=Hola|Good morning=Buenos días|Good night=Buenas noches|Goodbye=Adiós|See you later=Hasta luego"),
L("Presentarse","Para decir tu nombre usa My name is + nombre. I am (I'm) también sirve: I'm Ana.","My name is=Me llamo|I am=Yo soy|Nice to meet you=Mucho gusto|What's your name?=¿Cómo te llamas?|How are you?=¿Cómo estás?"),
L("Cortesía","Please va al pedir algo (Water, please) y Thank you al recibirlo. Responde a Thank you con You're welcome.","Please=Por favor|Thank you=Gracias|You're welcome=De nada|Excuse me=Disculpe|Sorry=Perdón"),
L("Deletrear","Los nombres se deletrean letra por letra. Pregunta: How do you spell your name?","Letter=Letra|Spell=Deletrear|How do you spell it?=¿Cómo se deletrea?|Capital letter=Mayúscula|Word=Palabra"),
L("Números 1-5","Los números se usan para edad, precios y teléfonos. Ejemplo: I have two books.","One=Uno|Two=Dos|Three=Tres|Four=Cuatro|Five=Cinco"),
L("Números 6-10","Six, seven y eight son fáciles de confundir al escuchar. Practica con el audio.","Six=Seis|Seven=Siete|Eight=Ocho|Nine=Nueve|Ten=Diez"),
L("Números 11-20","Del 13 al 19 terminan en -teen (thirteen). Cuidado: fifteen y eighteen cambian un poco.","Eleven=Once|Twelve=Doce|Fifteen=Quince|Eighteen=Dieciocho|Twenty=Veinte"),
L("Decenas","Las decenas terminan en -ty (thirty, forty). No las confundas con -teen: fifteen (15) y fifty (50).","Thirty=Treinta|Forty=Cuarenta|Fifty=Cincuenta|Eighty=Ochenta|One hundred=Cien"),
L("Colores 1","En inglés el adjetivo va antes del sustantivo: a red car (un carro rojo), no a car red.","Red=Rojo|Blue=Azul|Green=Verde|Yellow=Amarillo|Black=Negro"),
L("Colores 2","Los colores no cambian por género ni número: white shirt, white shirts.","White=Blanco|Orange=Naranja|Pink=Rosado|Purple=Morado|Brown=Café"),

// ===== BLOQUE 2 (11-20): Personas y verbo to be =====
L("Pronombres","Los pronombres sujeto siempre se escriben: I eat. No se omite como en español (Como). It es para cosas y animales.","I=Yo|You=Tú|He=Él|She=Ella|We=Nosotros"),
L("To be: afirmativo","To be significa ser o estar. I am, you are, he/she/it is, we/you/they are. Ejemplo: She is a nurse.","I am=Yo soy|You are=Tú eres|He is=Él es|She is=Ella es|They are=Ellos son"),
L("To be: negativo","Para negar agrega not después de to be: He is not (isn't) tired. I am not se contrae a I'm not.","I'm not=No soy|He isn't=Él no es|We aren't=No somos|It isn't=No es|They aren't=Ellos no son"),
L("To be: preguntas","Para preguntar, invierte el orden: You are a student → Are you a student?","Are you?=¿Eres?|Is he?=¿Es él?|Am I?=¿Soy yo?|Is she a teacher?=¿Es ella profesora?|Are they here?=¿Están aquí?"),
L("Países","Los nombres de países siempre llevan mayúscula inicial. Pregunta: Where are you from?","Colombia=Colombia|The United States=Estados Unidos|Mexico=México|Spain=España|Brazil=Brasil"),
L("Nacionalidades","Las nacionalidades también llevan mayúscula en inglés: I am Colombian. Se usan con to be.","Colombian=Colombiano|American=Estadounidense|Mexican=Mexicano|Spanish=Español|Brazilian=Brasileño"),
L("Familia 1","Mother y father son formales; mom y dad son de uso diario. Parents significa padres (papá y mamá).","Mother=Madre|Father=Padre|Sister=Hermana|Brother=Hermano|Parents=Padres"),
L("Familia 2","Cousin sirve para primo y prima. Grandparents son los abuelos en general.","Grandmother=Abuela|Grandfather=Abuelo|Aunt=Tía|Uncle=Tío|Cousin=Primo"),
L("Posesivos","Los posesivos van antes del sustantivo y no cambian con él: my book, my books.","My=Mi|Your=Tu|His=Su (de él)|Her=Su (de ella)|Our=Nuestro"),
L("Describir personas","Usa to be + adjetivo: He is tall. No se dice He has tall.","Tall=Alto|Short=Bajo|Young=Joven|Old=Viejo|Beautiful=Hermoso"),

// ===== BLOQUE 3 (21-30): Objetos, casa y lugares =====
L("Artículos a / an","Usa an antes de sonido vocálico: an apple, an egg. Usa a antes de consonante: a chair.","A book=Un libro|An apple=Una manzana|The house=La casa|An egg=Un huevo|A chair=Una silla"),
L("En el salón","Estos objetos son comunes en clase. Ejemplo: Open your notebook, please.","Table=Mesa|Chair=Silla|Pen=Esfero|Notebook=Cuaderno|Backpack=Mochila"),
L("Plurales","Normalmente se agrega -s (books). Si termina en x, s, ch o sh se agrega -es (boxes). Hay irregulares: child → children.","Books=Libros|Boxes=Cajas|Children=Niños|Men=Hombres|Women=Mujeres"),
L("This / That","This y these señalan cosas cercanas; that y those, cosas lejanas. Singular: this, that. Plural: these, those.","This=Esto/Este|That=Eso/Ese|These=Estos|Those=Esos|What is this?=¿Qué es esto?"),
L("Cosas de casa","Estas palabras se combinan con a/an: a door, a key. Pregunta: What is that?","Door=Puerta|Window=Ventana|Bed=Cama|Key=Llave|Lamp=Lámpara"),
L("Habitaciones","Living room es la sala. Bedroom es el dormitorio. Ejemplo: The kitchen is big.","Kitchen=Cocina|Bathroom=Baño|Bedroom=Dormitorio|Living room=Sala|Garden=Jardín"),
L("There is / There are","There is se usa con singular y there are con plural: There is a bed. There are two chairs.","There is a table=Hay una mesa|There are two beds=Hay dos camas|There isn't a lamp=No hay lámpara|Is there a key?=¿Hay una llave?|Are there windows?=¿Hay ventanas?"),
L("Preposiciones de lugar 1","Las preposiciones dicen dónde está algo. Ejemplo: The book is on the table.","In=En (dentro)|On=Sobre|Under=Debajo de|Next to=Al lado de|Behind=Detrás de"),
L("Preposiciones de lugar 2","In front of es lo opuesto a behind. Between se usa con dos cosas: between the bed and the door.","In front of=Delante de|Between=Entre|Near=Cerca de|Far from=Lejos de|Here=Aquí"),
L("¿Dónde está?","Para ubicar algo: Where is + sustantivo? Responde con It's + preposición + lugar.","Where is it?=¿Dónde está?|It's on the table=Está sobre la mesa|It's here=Está aquí|It's there=Está allá|Where are the keys?=¿Dónde están las llaves?"),

// ===== BLOQUE 4 (31-40): Comida y restaurante =====
L("Frutas","Las frutas contables llevan plural: one apple, two apples.","Apple=Manzana|Banana=Banano|Orange=Naranja|Grapes=Uvas|Strawberry=Fresa"),
L("Verduras","Potato en plural es potatoes y tomato es tomatoes: agregan -es.","Tomato=Tomate|Potato=Papa|Carrot=Zanahoria|Onion=Cebolla|Lettuce=Lechuga"),
L("Proteínas","Chicken, fish y cheese no se usan en plural cuando hablas de la comida en general.","Chicken=Pollo|Beef=Carne de res|Fish=Pescado|Egg=Huevo|Cheese=Queso"),
L("Bebidas","Para pedir: A coffee, please. Se puede decir a glass of water o a cup of tea.","Water=Agua|Coffee=Café|Milk=Leche|Juice=Jugo|Tea=Té"),
L("Comidas del día","Se dice have breakfast, have lunch, have dinner. No se usa el verbo take.","Breakfast=Desayuno|Lunch=Almuerzo|Dinner=Cena|Snack=Merienda|Meal=Comida"),
L("Have / Has","Have significa tener. Con he, she, it se usa has: She has a car. Para negar: I don't have.","I have=Yo tengo|She has=Ella tiene|We have=Tenemos|Do you have a pen?=¿Tienes un esfero?|I don't have time=No tengo tiempo"),
L("Like / Love","Like es gustar y love es amar o encantar. Con he/she: She likes pizza.","I like=Me gusta|I love=Me encanta|I don't like=No me gusta|She likes tea=A ella le gusta el té|Do you like fish?=¿Te gusta el pescado?"),
L("I want / I'd like","I'd like es más cortés que I want, ideal para pedir en un restaurante.","I want=Quiero|I would like=Quisiera|Can I have...?=¿Me das...?|The menu=El menú|The bill=La cuenta"),
L("En el restaurante","Estas frases te permiten pedir una mesa y comentar la comida. Ejemplo: The soup is delicious.","Waiter=Mesero|Table for two=Mesa para dos|Delicious=Delicioso|Hungry=Con hambre|Thirsty=Con sed"),
L("Some / Any / A lot of","Some va en afirmativas (I have some milk). Any va en negativas y preguntas (I don't have any milk).","Some=Algo de|Any=Nada de|A lot of=Mucho|A little=Un poco|Enough=Suficiente"),

// ===== BLOQUE 5 (41-50): Tiempo, rutina y presente simple =====
L("Días de la semana","Los días llevan mayúscula en inglés y se usan con on: on Monday.","Monday=Lunes|Tuesday=Martes|Wednesday=Miércoles|Saturday=Sábado|Sunday=Domingo"),
L("Meses","Los meses también llevan mayúscula y se usan con in: in June.","January=Enero|March=Marzo|June=Junio|September=Septiembre|December=Diciembre"),
L("La hora","Para la hora: It's + número + o'clock. Half past es y media y quarter to es menos cuarto.","What time is it?=¿Qué hora es?|It's three o'clock=Son las tres|Half past=Y media|Quarter to=Menos cuarto|Noon=Mediodía"),
L("Presente simple +","El presente simple expresa hábitos. Con he/she/it el verbo termina en -s: She works.","I work=Yo trabajo|He works=Él trabaja|We study=Estudiamos|They live=Ellos viven|She eats=Ella come"),
L("Presente simple -","Para negar usa don't (I, you, we, they) o doesn't (he, she, it) y el verbo sin -s: He doesn't work.","I don't work=No trabajo|He doesn't work=Él no trabaja|We don't study=No estudiamos|She doesn't eat meat=Ella no come carne|They don't live here=No viven aquí"),
L("Presente simple ?","Para preguntar usa Do o Does al inicio: Do you work? Does he work? El verbo queda sin -s.","Do you work?=¿Trabajas?|Does he work?=¿Él trabaja?|Where do you live?=¿Dónde vives?|What do you do?=¿A qué te dedicas?|When does it start?=¿Cuándo empieza?"),
L("Rutina de la mañana","Los verbos de rutina se usan en presente simple: I wake up at six.","Wake up=Despertarse|Get up=Levantarse|Take a shower=Ducharse|Brush my teeth=Cepillarme los dientes|Get dressed=Vestirse"),
L("Rutina de la tarde","Para hablar de tu día: I come home at six. I go to bed at ten.","Go to work=Ir al trabajo|Come home=Llegar a casa|Cook dinner=Cocinar la cena|Watch TV=Ver televisión|Go to bed=Acostarse"),
L("Frecuencia","Los adverbios de frecuencia van antes del verbo: I always eat breakfast. Con to be van después: I am never late.","Always=Siempre|Usually=Usualmente|Sometimes=A veces|Never=Nunca|Every day=Todos los días"),
L("Profesiones","Con profesiones usa a/an: She is a doctor. He is an engineer.","Teacher=Profesor|Doctor=Médico|Engineer=Ingeniero|Nurse=Enfermero|Driver=Conductor"),

// ===== BLOQUE 6 (51-60): Ciudad, transporte y clima =====
L("Lugares de la ciudad 1","Para ubicarlos usa there is / there are o where is: Where is the bank?","Bank=Banco|Hospital=Hospital|School=Colegio|Supermarket=Supermercado|Park=Parque"),
L("Lugares de la ciudad 2","Library parece librería, pero significa biblioteca. Librería se dice bookstore.","Pharmacy=Farmacia|Library=Biblioteca|Bus station=Terminal de buses|Church=Iglesia|Market=Mercado"),
L("Direcciones","Las direcciones usan el imperativo, sin sujeto: Turn left. Go straight.","Turn left=Gira a la izquierda|Turn right=Gira a la derecha|Go straight=Sigue derecho|Cross the street=Cruza la calle|Corner=Esquina"),
L("Pedir indicaciones","Empieza con Excuse me para ser cortés. Ejemplo: Excuse me, where is the bank?","Excuse me, where is...?=Disculpe, ¿dónde queda...?|How do I get to...?=¿Cómo llego a...?|It's far=Está lejos|It's close=Está cerca|Is it far?=¿Está lejos?"),
L("Transporte","Con medios de transporte usa by: by bus, by car. Excepción: on foot (a pie).","Bus=Bus|Car=Carro|Bicycle=Bicicleta|Train=Tren|Plane=Avión"),
L("Can / Can't","Can expresa habilidad o permiso. Va con el verbo sin to y no cambia: She can swim.","I can=Puedo|I can't=No puedo|Can you help me?=¿Me puedes ayudar?|She can swim=Ella sabe nadar|Can I come in?=¿Puedo entrar?"),
L("El clima","Para hablar del clima usa It's + adjetivo: It's sunny. Pregunta: What's the weather like?","Sunny=Soleado|Rainy=Lluvioso|Cloudy=Nublado|Windy=Ventoso|Cold=Frío"),
L("Estaciones","Colombia no tiene estaciones, pero en muchos países sí. Se usan con in: in summer.","Spring=Primavera|Summer=Verano|Autumn=Otoño|Winter=Invierno|Weather=Clima"),
L("Ropa 1","Pants, jeans y shoes son plurales siempre: These pants are new.","Shirt=Camisa|Pants=Pantalón|Dress=Vestido|Shoes=Zapatos|Jacket=Chaqueta"),
L("Ropa 2","Wear significa llevar puesto: She wears a coat. Para ropa se usa wear, no carry.","Socks=Medias|Hat=Sombrero|Skirt=Falda|Coat=Abrigo|Wear=Llevar puesto"),

// ===== BLOQUE 7 (61-70): Compras, cuerpo y repaso =====
L("De compras","Para preguntar precios: How much is it? (singular) o How much are they? (plural).","How much is it?=¿Cuánto cuesta?|It's cheap=Es barato|It's expensive=Es caro|Size=Talla|Pay=Pagar"),
L("Dinero","Change significa cambio o vueltas. Ejemplo: Here is your change.","Money=Dinero|Cash=Efectivo|Credit card=Tarjeta de crédito|Price=Precio|Change=Cambio"),
L("El cuerpo 1","Las partes del cuerpo suelen usar posesivo: My head hurts, no The head.","Head=Cabeza|Hand=Mano|Arm=Brazo|Leg=Pierna|Foot=Pie"),
L("El cuerpo 2","El plural de foot es feet, y el de tooth es teeth. Son irregulares.","Eye=Ojo|Ear=Oreja|Mouth=Boca|Nose=Nariz|Back=Espalda"),
L("Salud","Para el dolor usa ache: headache, stomachache. También: My head hurts.","I'm sick=Estoy enfermo|Headache=Dolor de cabeza|Fever=Fiebre|I need a doctor=Necesito un médico|Medicine=Medicina"),
L("Presente continuo +","Se forma con to be + verbo-ing y expresa lo que pasa ahora: I am eating.","I am eating=Estoy comiendo|She is reading=Ella está leyendo|They are playing=Ellos están jugando|We are studying=Estamos estudiando|He is sleeping=Él está durmiendo"),
L("Presente continuo - ?","Para negar, agrega not a to be. Para preguntar, invierte: Is he sleeping?","What are you doing?=¿Qué estás haciendo?|I'm not working=No estoy trabajando|Is he sleeping?=¿Está durmiendo?|Are they coming?=¿Vienen?|It's not raining=No está lloviendo"),
L("Pasatiempos","Después de like o love puedes usar verbo-ing: I like swimming.","Read=Leer|Swim=Nadar|Dance=Bailar|Listen to music=Escuchar música|Play soccer=Jugar fútbol"),
L("Adjetivos opuestos","Los adjetivos van antes del sustantivo y no cambian: a big house, big houses.","Big=Grande|Small=Pequeño|Fast=Rápido|Slow=Lento|Easy=Fácil"),
L("Repaso: conversar","Esta lección une todo lo de A1. Practica respondiendo en voz alta.","Where are you from?=¿De dónde eres?|I'm from Colombia=Soy de Colombia|I live in a small town=Vivo en un pueblo pequeño|I work as a teacher=Trabajo como profesor|Nice talking to you=Gusto hablar contigo"),
];