export type Partner = {
  id: string;
  name: string;
  age: number;
  sport: string;
  level: "Débutant" | "Intermédiaire" | "Avancé" | "Expert";
  distanceKm: number;
  place: string;
  when: string;
  bio: string;
  rating: number;
  sessions: number;
  online?: boolean;
  reliability: number;
  tone: "lime" | "lavender" | "ink";
};

export const PARTNERS: Partner[] = [
  { id: "lea",  name: "Léa Martin",     age: 26, sport: "Running",    level: "Intermédiaire", distanceKm: 0.8, place: "Parc des Buttes", when: "Ce soir 19h",  bio: "J'adore courir le matin dans le parc. Je cherche quelqu'un pour me motiver les jours où Netflix gagne.", rating: 4.9, sessions: 41, online: true, reliability: 96, tone: "lime" },
  { id: "adam", name: "Adam Bensaïd",   age: 31, sport: "Boxe",       level: "Avancé",         distanceKm: 1.5, place: "BoxLab Belleville",when: "Demain 7h",     bio: "Boxe technique, pas de cogneurs. Cherche partenaire régulier pour shadow + sparring léger.",            rating: 4.7, sessions: 88, online: false, reliability: 92, tone: "lavender" },
  { id: "ines", name: "Inès Roche",     age: 24, sport: "Pilates",    level: "Intermédiaire", distanceKm: 2.1, place: "Studio Mouv'",    when: "Ce soir 20h",   bio: "Pilates reformer + tapis. Bonne énergie, séances posées mais exigeantes.",                              rating: 4.8, sessions: 23, online: true,  reliability: 94, tone: "ink" },
  { id: "theo", name: "Théo Lambert",   age: 29, sport: "Padel",      level: "Intermédiaire", distanceKm: 3.4, place: "Padel Up Paris",  when: "Sam. 10h",      bio: "Toujours partant pour un double. Niveau correct, esprit chill, on joue pour s'amuser d'abord.",         rating: 4.6, sessions: 56, online: false, reliability: 88, tone: "lime" },
  { id: "marie",name: "Marie Dupont",   age: 28, sport: "Yoga",       level: "Avancé",         distanceKm: 1.2, place: "Salle FitZone",   when: "Demain 19h",    bio: "Vinyasa, ashtanga. Je guide parfois. Cherche quelqu'un de régulier sur des créneaux du soir.",          rating: 4.9, sessions: 102, online: true,  reliability: 98, tone: "lavender" },
  { id: "yann", name: "Yann Petit",     age: 33, sport: "CrossFit",   level: "Avancé",         distanceKm: 4.0, place: "CrossFit 11e",    when: "Jeu. 18h",      bio: "WOD, force, gymnastique. J'aime pousser sans se prendre au sérieux.",                                    rating: 4.5, sessions: 71, online: false, reliability: 85, tone: "ink" },
];

export const SPORTS = [
  { emoji: "🏃", label: "Running" },
  { emoji: "🏋️", label: "Musculation" },
  { emoji: "🧘", label: "Yoga" },
  { emoji: "🤸", label: "Pilates" },
  { emoji: "🥊", label: "Boxe" },
  { emoji: "🏊", label: "Natation" },
  { emoji: "🚴", label: "Cycling" },
  { emoji: "💃", label: "Danse" },
  { emoji: "🥾", label: "Randonnée" },
  { emoji: "🎾", label: "Tennis" },
  { emoji: "⚽", label: "Football" },
  { emoji: "🏀", label: "Basketball" },
  { emoji: "🧗", label: "Escalade" },
  { emoji: "🔥", label: "CrossFit" },
  { emoji: "🧎", label: "Stretching" },
  { emoji: "🥋", label: "Arts martiaux" },
];

export const POSTS = [
  { id: "p1", author: "Julie",  when: "Il y a 2h",   sport: "Boxe",    text: "Première séance de boxe avec @Marie — trop bien, on remet ça mercredi !", likes: 24, comments: 5, bg: "lime" },
  { id: "p2", author: "Karim",  when: "Il y a 5h",   sport: "Running", text: "10k matinal sous la pluie 💦 Qui se joint demain 7h au canal ?",          likes: 12, comments: 3, bg: "lavender" },
  { id: "p3", author: "Camille",when: "Hier",         sport: "Yoga",    text: "Séance restorative parfaite après une semaine intense. Recommandé.",     likes: 18, comments: 2, bg: "ink" },
];

export const CONVERSATIONS = [
  { id: "marie", name: "Marie Dupont",   preview: "Super, on se retrouve à FitZone demain 19h ?", when: "15 min", unread: 2, online: true },
  { id: "adam",  name: "Adam Bensaïd",   preview: "Ok pour samedi matin, je confirme.",            when: "1 h",     unread: 0, online: false },
  { id: "lea",   name: "Léa Martin",     preview: "Tu m'as bien démolie hier 😅",                  when: "Hier",    unread: 0, online: true },
  { id: "ines",  name: "Inès Roche",     preview: "Photo de la séance 📸",                         when: "Lun.",    unread: 0, online: false },
];

export const NOTIFICATIONS = [
  { id: "n1", type: "request", title: "Marie veut s'entraîner avec toi !", body: "Yoga · Demain 19h · 1.2 km",            when: "5 min",  unread: true },
  { id: "n2", type: "match",   title: "C'est un match !",                   body: "Léa et toi : Running demain 7h",          when: "1 h",     unread: true },
  { id: "n3", type: "message", title: "Adam",                                body: "Ok pour samedi matin, je confirme.",     when: "1 h",     unread: false },
  { id: "n4", type: "streak",  title: "3 jours d'affilée ! Continue.",      body: "Tu es en feu cette semaine.",            when: "Hier",    unread: false },
  { id: "n5", type: "reminder",title: "Ta séance commence dans 1h",         body: "Pilates avec Inès à 19h",                when: "Hier",    unread: false },
];
