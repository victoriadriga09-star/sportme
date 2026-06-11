const KIND = [
  "C'est pas grave, on remet ça demain ?",
  "On respire, et on repart plus fort 💪",
  "La vie arrive — ton corps t'attend, pas de pression.",
  "Pas de culpabilité : un repos choisi vaut mieux qu'une séance forcée.",
  "On reprogramme tranquille, t'es au top quand même ✨",
  "Le sport, c'est aussi savoir écouter son corps. À très vite !",
];
export function randomKindMessage() {
  return KIND[Math.floor(Math.random() * KIND.length)];
}
