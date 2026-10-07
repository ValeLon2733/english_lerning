const LEVELS = ["A1", "A2", "B1", "B2", "C1"];

const TOPICS = {
  A1: A1, // viene de a1.js
  A2: [
    { t: "Rutina diaria", e: "Ejemplo de A2.", w: [["I wake up","Me despierto"],["I have breakfast","Desayuno"],["I go to work","Voy al trabajo"],["I study","Estudio"],["I go to sleep","Me voy a dormir"]] },
    { t: "Compras", e: "Ejemplo de A2.", w: [["How much is it?","¿Cuánto cuesta?"],["It's cheap","Es barato"],["It's expensive","Es caro"],["I'll take it","Me lo llevo"],["Do you accept cards?","¿Aceptan tarjetas?"]] },
  ],
  B1: [
    { t: "Experiencias", e: "Ejemplo de B1.", w: [["I have never been","Nunca he ido"],["I used to live","Solía vivir"],["I've been working","He estado trabajando"],["As soon as","Tan pronto como"],["Although","Aunque"]] },
  ],
  B2: [
    { t: "Opiniones", e: "Ejemplo de B2.", w: [["In my opinion","En mi opinión"],["I strongly believe","Creo firmemente"],["On the other hand","Por otro lado"],["Regardless of","Sin importar"],["It turns out that","Resulta que"]] },
  ],
  C1: [
    { t: "Expresiones avanzadas", e: "Ejemplo de C1.", w: [["Nevertheless","Sin embargo"],["Hardly ever","Casi nunca"],["To a certain extent","Hasta cierto punto"],["Bear in mind","Ten en cuenta"],["Come to terms with","Aceptar"]] },
  ],
};

function getLesson(level, n) {
  const arr = TOPICS[level];
  const l = arr[n % arr.length];
  return { title: `Lección ${n + 1}: ${l.t}`, w: l.w, e: l.e || "Esta lección aún no tiene explicación extendida.", sample: n >= arr.length };
}
const pool = (lv) => TOPICS[lv].flatMap((x) => x.w);