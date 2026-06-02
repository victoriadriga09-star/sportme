import {
  Dumbbell, Trees, Home, Video, Sunrise, Sun, Sunset, Moon,
  Heart, Flame, Sparkles, Users, PartyPopper, Wind,
  CalendarDays, Shuffle, MapPin, type LucideIcon,
  PersonStanding, Bike, Waves,
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

export const SPORT_ICONS: Record<string, LucideIcon> = {
  Yoga: PersonStanding, Running: PersonStanding, Musculation: Dumbbell,
  Pilates: PersonStanding, Boxe: Dumbbell, Natation: Waves,
  Cycling: Bike, Danse: PersonStanding, Randonnée: Trees,
  Tennis: PersonStanding, Football: PersonStanding, Basketball: PersonStanding,
  Escalade: PersonStanding, CrossFit: Flame, Stretching: Wind, "Arts martiaux": Flame,
};

export { MapPin };
