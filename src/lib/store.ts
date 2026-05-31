import { useEffect, useState, useCallback } from "react";

// ---------- generic localStorage hook ----------
function useLocal<T>(key: string, initial: T): [T, (v: T | ((p: T) => T)) => void] {
  const [v, setV] = useState<T>(initial);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setV(JSON.parse(raw));
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const set = useCallback((nv: T | ((p: T) => T)) => {
    setV((prev) => {
      const next = typeof nv === "function" ? (nv as (p: T) => T)(prev) : nv;
      try { localStorage.setItem(key, JSON.stringify(next)); } catch {}
      return next;
    });
  }, [key]);
  return [v, set];
}

// ---------- user profile ----------
export type UserProfile = {
  prenom: string;
  city: string;
  sports: string[];
  gender: string;
};

const DEFAULT_USER: UserProfile = {
  prenom: "Viki",
  city: "Paris 11e",
  sports: ["Yoga", "Running"],
  gender: "Femme",
};

export function useUser() {
  return useLocal<UserProfile>("elan.user", DEFAULT_USER);
}

export function saveUser(u: Partial<UserProfile>) {
  try {
    const raw = localStorage.getItem("elan.user");
    const prev = raw ? JSON.parse(raw) : DEFAULT_USER;
    localStorage.setItem("elan.user", JSON.stringify({ ...prev, ...u }));
  } catch {}
}

// ---------- session filters ----------
export type Filters = {
  sport: string;
  when: string;
  duration: string;
  durationCustom?: string;
  radius: number;
  city: string;
  level: string;
  gender: string;
  mode: "Tous" | "Présentiel" | "Visio";
};

export const DEFAULT_FILTERS: Filters = {
  sport: "Yoga",
  when: "Demain",
  duration: "45 min",
  radius: 5,
  city: "Paris 11e",
  level: "Tous",
  gender: "Peu importe",
  mode: "Tous",
};

export function useFilters() {
  return useLocal<Filters>("elan.filters", DEFAULT_FILTERS);
}

// ---------- favorites ----------
export function useFavorites() {
  const [favs, setFavs] = useLocal<string[]>("elan.favs", []);
  const toggle = useCallback((id: string) => {
    setFavs((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  }, [setFavs]);
  return { favs, toggle, isFav: (id: string) => favs.includes(id) };
}
