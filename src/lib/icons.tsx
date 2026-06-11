import {
  Dumbbell, Trees, Home, Video, Sunrise, Sun, Sunset, Moon,
  Heart, Flame, Sparkles, Users, PartyPopper, Wind,
  CalendarDays, Shuffle, MapPin, type LucideIcon,
  Footprints, Flower2, Activity, Swords, Waves,
  Bike, Music2, Mountain, CircleDot, Volleyball, Target,
  Shield,
} from "lucide-react";

export const LIEU_ICONS: Record<string, LucideIcon> = {
  Salle: Dumbbell, Extérieur: Trees, Maison: Home, Visio: Video,
};

export const CRENEAU_ICONS: Record<string, LucideIcon> = {
  "Tôt le matin": Sunrise, "Le midi": Sun, "Fin de journée": Sunset, "Le soir": Moon,
};

export const GOAL_ICONS: Record<string, LucideIcon> = {
  "Me remettre en forme": Heart,
  "Perdre du poids": Flame,
  "Gagner en souplesse": Wind,
  "Trouver un·e partenaire d'entraînement": Users,
  "Rejoindre une communauté": Sparkles,
  "Juste découvrir et m'amuser": PartyPopper,
};

export const RYTHME_ICONS: Record<string, LucideIcon> = {
  "Toujours les mêmes jours": CalendarDays,
  "Ça change chaque semaine": Shuffle,
};

// One unique icon per sport
export const SPORT_ICONS: Record<string, LucideIcon> = {
  Running: Footprints,
  Musculation: Dumbbell,
  Yoga: Flower2,
  Pilates: Activity,
  Boxe: Swords,
  Natation: Waves,
  Cycling: Bike,
  Danse: Music2,
  Randonnée: Trees,
  Tennis: CircleDot,
  Football: Volleyball,
  Basketball: Target,
  Escalade: Mountain,
  CrossFit: Flame,
  Stretching: Wind,
  "Arts martiaux": Shield,
};

export { MapPin };
