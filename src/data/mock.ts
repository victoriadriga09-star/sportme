export type Partner = {
  id: string;
  name: string;
  age: number;
  gender: "Femme" | "Homme" | "Non-binaire";
  sport: string;
  level: "Débutant" | "Intermédiaire" | "Avancé" | "Expert";
  distanceKm: number;
  place: string;
  when: string;
  timeShort: string;
  mode: "Présentiel" | "Visio";
  bio: string;
  rating: number;
  sessions: number;
  online?: boolean;
  reliability: number;
  tone: "lime" | "lavender" | "ink";
};

export const PARTNERS: Partner[] = [
  { id: "lea",  name: "Léa Martin",     age: 26, gender: "Femme",       sport: "Running",    level: "Intermédiaire", distanceKm: 0.8, place: "Parc des Buttes", when: "Ce soir 19h",  timeShort: "19:00", mode: "Présentiel", bio: "J'adore courir le matin dans le parc. Je cherche quelqu'un pour me motiver les jours où Netflix gagne.", rating: 4.9, sessions: 41, online: true, reliability: 96, tone: "lime" },
  { id: "adam", name: "Adam Bensaïd",   age: 31, gender: "Homme",       sport: "Boxe",       level: "Avancé",         distanceKm: 1.5, place: "BoxLab Belleville",when: "Demain 7h",     timeShort: "07:00", mode: "Présentiel", bio: "Boxe technique, pas de cogneurs. Cherche partenaire régulier pour shadow + sparring léger.",            rating: 4.7, sessions: 88, online: false, reliability: 92, tone: "lavender" },
  { id: "ines", name: "Inès Roche",     age: 24, gender: "Femme",       sport: "Pilates",    level: "Intermédiaire", distanceKm: 2.1, place: "Studio Mouv'",    when: "Ce soir 20h",   timeShort: "20:00", mode: "Présentiel", bio: "Pilates reformer + tapis. Bonne énergie, séances posées mais exigeantes.",                              rating: 4.8, sessions: 23, online: true,  reliability: 94, tone: "ink" },
  { id: "theo", name: "Théo Lambert",   age: 29, gender: "Homme",       sport: "Padel",      level: "Intermédiaire", distanceKm: 3.4, place: "Padel Up Paris",  when: "Sam. 10h",      timeShort: "10:00", mode: "Présentiel", bio: "Toujours partant pour un double. Niveau correct, esprit chill, on joue pour s'amuser d'abord.",         rating: 4.6, sessions: 56, online: false, reliability: 88, tone: "lime" },
  { id: "marie",name: "Marie Dupont",   age: 28, gender: "Femme",       sport: "Yoga",       level: "Avancé",         distanceKm: 1.2, place: "Salle FitZone",   when: "Demain 19h",    timeShort: "19:00", mode: "Présentiel", bio: "Vinyasa, ashtanga. Je guide parfois. Cherche quelqu'un de régulier sur des créneaux du soir.",          rating: 4.9, sessions: 102, online: true,  reliability: 98, tone: "lavender" },
  { id: "yann", name: "Yann Petit",     age: 33, gender: "Homme",       sport: "CrossFit",   level: "Avancé",         distanceKm: 4.0, place: "CrossFit 11e",    when: "Jeu. 18h",      timeShort: "18:00", mode: "Présentiel", bio: "WOD, force, gymnastique. J'aime pousser sans se prendre au sérieux.",                                    rating: 4.5, sessions: 71, online: false, reliability: 85, tone: "ink" },
  { id: "sofia",name: "Sofia Lopez",    age: 27, gender: "Femme",       sport: "Yoga",       level: "Intermédiaire", distanceKm: 0.6, place: "À la maison",     when: "Maintenant",    timeShort: "live",  mode: "Visio",      bio: "Sessions visio le matin avant le boulot. Hatha doux, 30 min top chrono.",                                rating: 4.8, sessions: 35, online: true,  reliability: 95, tone: "lavender" },
  { id: "noa",  name: "Noa Carvalho",   age: 30, gender: "Non-binaire", sport: "Running",    level: "Avancé",         distanceKm: 2.8, place: "Canal Saint-Martin", when: "Demain 7h", timeShort: "07:00", mode: "Présentiel", bio: "10k tempo, allure 4'30. Cherche partenaire constant·e pour les sorties longues du dimanche.",            rating: 4.7, sessions: 64, online: false, reliability: 90, tone: "lime" },

  // Musculation
  { id: "hugo", name: "Hugo Bernard",   age: 28, gender: "Homme",       sport: "Musculation",level: "Avancé",         distanceKm: 1.1, place: "Basic-Fit Voltaire",when: "Ce soir 19h", timeShort: "19:00", mode: "Présentiel", bio: "Push/Pull/Legs, je cherche un binôme sérieux pour pousser plus lourd en sécurité.",                     rating: 4.6, sessions: 120, online: true,  reliability: 91, tone: "ink" },
  { id: "lena", name: "Léna Garcia",    age: 25, gender: "Femme",       sport: "Musculation",level: "Intermédiaire", distanceKm: 2.4, place: "Neoness Bastille", when: "Demain 18h",   timeShort: "18:00", mode: "Présentiel", bio: "Full body 3x/sem. Bonne humeur obligatoire, pas de mansplaining please.",                                  rating: 4.8, sessions: 47, online: false, reliability: 93, tone: "lavender" },

  // Natation
  { id: "paul", name: "Paul Mercier",   age: 32, gender: "Homme",       sport: "Natation",   level: "Avancé",         distanceKm: 1.8, place: "Piscine Cour des Lions", when: "Sam. 8h", timeShort: "08:00", mode: "Présentiel", bio: "Crawl 2km, je vise les eaux libres cet été. Cherche quelqu'un de régulier.",                              rating: 4.7, sessions: 58, online: false, reliability: 92, tone: "lime" },
  { id: "lila", name: "Lila Chen",      age: 26, gender: "Femme",       sport: "Natation",   level: "Intermédiaire", distanceKm: 3.0, place: "Piscine Pontoise",when: "Mar. 7h",       timeShort: "07:00", mode: "Présentiel", bio: "Brasse + dos. Je débute le crawl, super open aux conseils.",                                              rating: 4.9, sessions: 19, online: true,  reliability: 95, tone: "lavender" },

  // Cycling
  { id: "samy", name: "Samy Diallo",    age: 29, gender: "Homme",       sport: "Cycling",    level: "Avancé",         distanceKm: 0.9, place: "Bois de Vincennes",when: "Dim. 8h",       timeShort: "08:00", mode: "Présentiel", bio: "Sorties 80-120km le week-end. Allure 30km/h, esprit groupe avant tout.",                                  rating: 4.6, sessions: 73, online: false, reliability: 88, tone: "ink" },
  { id: "anaelle", name: "Anaëlle Roy", age: 27, gender: "Femme",       sport: "Cycling",    level: "Intermédiaire", distanceKm: 2.2, place: "Canal de l'Ourcq",when: "Sam. 10h",       timeShort: "10:00", mode: "Présentiel", bio: "Gravel et balades. Pause café obligatoire à mi-parcours.",                                                  rating: 4.8, sessions: 31, online: true,  reliability: 94, tone: "lime" },

  // Danse
  { id: "elia", name: "Elia Moreau",    age: 24, gender: "Femme",       sport: "Danse",      level: "Intermédiaire", distanceKm: 1.3, place: "Studio Harmonic",  when: "Jeu. 20h",      timeShort: "20:00", mode: "Présentiel", bio: "Hip-hop et contemporain. Cherche partenaire pour battles freestyle du jeudi.",                            rating: 4.7, sessions: 52, online: true,  reliability: 90, tone: "lavender" },
  { id: "kev",  name: "Kévin Tran",     age: 30, gender: "Homme",       sport: "Danse",      level: "Avancé",         distanceKm: 2.7, place: "Centre Momboye",   when: "Mer. 19h",      timeShort: "19:00", mode: "Présentiel", bio: "Salsa cubaine et bachata. J'adore guider, viens même débutant·e.",                                         rating: 4.9, sessions: 96, online: false, reliability: 97, tone: "ink" },

  // Randonnée
  { id: "juliette", name: "Juliette Faure", age: 31, gender: "Femme",   sport: "Randonnée",  level: "Intermédiaire", distanceKm: 5.0, place: "Forêt de Fontainebleau", when: "Dim. 9h", timeShort: "09:00", mode: "Présentiel", bio: "Sorties 15-20km, pause pique-nique au sommet. Pas pressée mais constante.",                                rating: 4.8, sessions: 38, online: true,  reliability: 96, tone: "lime" },
  { id: "marc", name: "Marc Lefèvre",   age: 35, gender: "Homme",       sport: "Randonnée",  level: "Avancé",         distanceKm: 6.4, place: "Vallée de Chevreuse",when: "Sam. 8h",    timeShort: "08:00", mode: "Présentiel", bio: "Dénivelé +1000m, j'adore les trails techniques. Bonnes chaussures requises.",                              rating: 4.6, sessions: 64, online: false, reliability: 89, tone: "lavender" },

  // Tennis
  { id: "rom",  name: "Romain Dubois",  age: 28, gender: "Homme",       sport: "Tennis",     level: "Intermédiaire", distanceKm: 1.7, place: "TC Roquette",     when: "Sam. 11h",      timeShort: "11:00", mode: "Présentiel", bio: "Classé 30/2. Cherche partenaire régulier pour matchs amicaux le week-end.",                              rating: 4.5, sessions: 44, online: true,  reliability: 87, tone: "ink" },
  { id: "amel", name: "Amel Saïd",      age: 26, gender: "Femme",       sport: "Tennis",     level: "Avancé",         distanceKm: 3.2, place: "Jean Bouin",      when: "Dim. 10h",      timeShort: "10:00", mode: "Présentiel", bio: "Classée 15/4. Échanges propres en fond de court, jeu placé.",                                              rating: 4.9, sessions: 81, online: false, reliability: 95, tone: "lime" },

  // Football
  { id: "moh",  name: "Mohamed Aït",    age: 27, gender: "Homme",       sport: "Football",   level: "Intermédiaire", distanceKm: 1.0, place: "City Stade Léon Blum", when: "Mer. 20h",  timeShort: "20:00", mode: "Présentiel", bio: "Foot 5 le mercredi soir. On cherche toujours 1-2 joueurs pour compléter.",                                rating: 4.4, sessions: 110, online: true,  reliability: 86, tone: "lime" },
  { id: "lucas",name: "Lucas Petit",    age: 24, gender: "Homme",       sport: "Football",   level: "Avancé",         distanceKm: 2.5, place: "Le Five Italie",  when: "Ven. 21h",      timeShort: "21:00", mode: "Présentiel", bio: "Milieu créatif, bon technique. Foot 7 le vendredi, niveau correct demandé.",                              rating: 4.6, sessions: 76, online: false, reliability: 91, tone: "ink" },

  // Basketball
  { id: "tony", name: "Tony Okafor",    age: 25, gender: "Homme",       sport: "Basketball", level: "Avancé",         distanceKm: 1.4, place: "Playground Léon Blum",when: "Sam. 16h",  timeShort: "16:00", mode: "Présentiel", bio: "5x5, jeu de transition. Toujours en mode street ball le samedi.",                                          rating: 4.7, sessions: 68, online: true,  reliability: 90, tone: "lavender" },
  { id: "zoe",  name: "Zoé Martin",     age: 23, gender: "Femme",       sport: "Basketball", level: "Intermédiaire", distanceKm: 2.9, place: "Halle Carpentier", when: "Mer. 19h",      timeShort: "19:00", mode: "Présentiel", bio: "Shooteuse, manie le crossover. Cherche du monde pour shoot-around régulier.",                              rating: 4.5, sessions: 29, online: false, reliability: 88, tone: "lime" },

  // Escalade
  { id: "max",  name: "Max Royer",      age: 29, gender: "Homme",       sport: "Escalade",   level: "Avancé",         distanceKm: 2.0, place: "Arkose Nation",   when: "Mar. 19h",      timeShort: "19:00", mode: "Présentiel", bio: "Bloc surtout, 7a max. Cherche binôme curieux, on partage les solutions.",                                  rating: 4.8, sessions: 92, online: true,  reliability: 94, tone: "ink" },
  { id: "clara",name: "Clara Vidal",    age: 26, gender: "Femme",       sport: "Escalade",   level: "Intermédiaire", distanceKm: 3.5, place: "Climb Up Aubervilliers", when: "Jeu. 18h", timeShort: "18:00", mode: "Présentiel", bio: "Voie + bloc, 6b. J'adore les jours techniques sur dalle.",                                                  rating: 4.7, sessions: 41, online: false, reliability: 92, tone: "lavender" },

  // CrossFit (already has Yann)
  { id: "fanny",name: "Fanny Léger",    age: 28, gender: "Femme",       sport: "CrossFit",   level: "Intermédiaire", distanceKm: 1.6, place: "CrossFit République",when: "Ce soir 18h",timeShort: "18:00", mode: "Présentiel", bio: "WOD du soir, j'adore les Hero WODs. Esprit de groupe avant la perf.",                                      rating: 4.8, sessions: 53, online: true,  reliability: 95, tone: "lavender" },

  // Stretching
  { id: "emma", name: "Emma Charpentier",age: 31, gender: "Femme",      sport: "Stretching", level: "Intermédiaire", distanceKm: 0.7, place: "Studio Apaisée",  when: "Demain 8h",     timeShort: "08:00", mode: "Présentiel", bio: "30 min de stretching matinal pour bien démarrer. Programmes guidés.",                                      rating: 4.9, sessions: 87, online: true,  reliability: 97, tone: "lavender" },
  { id: "raph", name: "Raphaël Noël",   age: 33, gender: "Homme",       sport: "Stretching", level: "Avancé",         distanceKm: 2.6, place: "À la maison",     when: "Dim. 11h",      timeShort: "11:00", mode: "Visio",      bio: "Mobilité hanches/épaules, ex-danseur. Sessions visio sympa et précises.",                                  rating: 4.7, sessions: 48, online: false, reliability: 93, tone: "ink" },

  // Arts martiaux
  { id: "kenji",name: "Kenji Yamamoto", age: 30, gender: "Homme",       sport: "Arts martiaux",level: "Avancé",       distanceKm: 2.3, place: "Dojo Saint-Maur", when: "Mar. 20h",      timeShort: "20:00", mode: "Présentiel", bio: "Karaté shotokan, 2e dan. Cherche un partenaire pour kumite technique.",                                    rating: 4.8, sessions: 134, online: false, reliability: 96, tone: "ink" },
  { id: "nina", name: "Nina Kovac",     age: 27, gender: "Femme",       sport: "Arts martiaux",level: "Intermédiaire",distanceKm: 1.9, place: "Académie BJJ Paris",when: "Sam. 14h",   timeShort: "14:00", mode: "Présentiel", bio: "BJJ ceinture bleue. Rolling technique, j'adore les guards modernes.",                                      rating: 4.9, sessions: 62, online: true,  reliability: 94, tone: "lavender" },

  // Padel (already has Théo) — add one more
  { id: "diego",name: "Diego Alvarez",  age: 32, gender: "Homme",       sport: "Padel",      level: "Avancé",         distanceKm: 2.8, place: "Casa Padel",      when: "Dim. 15h",      timeShort: "15:00", mode: "Présentiel", bio: "Joueur expérimenté, bon revers vibora. Cherche doubles compétitifs.",                                     rating: 4.7, sessions: 105, online: false, reliability: 92, tone: "lime" },
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
