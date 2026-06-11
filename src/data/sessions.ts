export type SessionStatus = "planned" | "done" | "cancelled";
export type MockSession = {
  id: string;
  sport: string;
  partnerId: string;
  partnerName: string;
  date: string;   // ISO yyyy-mm-dd
  time: string;   // "19:00"
  place: string;
  status: SessionStatus;
  score?: number; // 0..5 (done only)
};

function iso(d: Date) { return d.toISOString().slice(0, 10); }
const today = new Date(); today.setHours(0,0,0,0);
const addDays = (n: number) => { const x = new Date(today); x.setDate(today.getDate() + n); return iso(x); };

export const SESSIONS: MockSession[] = [
  // planned
  { id: "s1", sport: "Yoga Vinyasa",  partnerId: "marie", partnerName: "Marie Dupont", date: addDays(1),  time: "19:00", place: "FitZone", status: "planned" },
  { id: "s2", sport: "Running",       partnerId: "lea",   partnerName: "Léa Martin",   date: addDays(2),  time: "07:00", place: "Canal Saint-Martin", status: "planned" },
  { id: "s3", sport: "Boxe technique",partnerId: "adam",  partnerName: "Adam Bensaïd", date: addDays(5),  time: "08:00", place: "BoxLab", status: "planned" },
  { id: "s4", sport: "Padel",         partnerId: "theo",  partnerName: "Théo Lambert", date: addDays(8),  time: "10:00", place: "Padel Up", status: "planned" },

  // done (this month)
  { id: "d1", sport: "Running",   partnerId: "lea",  partnerName: "Léa Martin", date: addDays(-1),  time: "07:00", place: "Canal", status: "done", score: 5 },
  { id: "d2", sport: "Pilates",   partnerId: "ines", partnerName: "Inès Roche", date: addDays(-3),  time: "18:00", place: "Studio Mouv'", status: "done", score: 4 },
  { id: "d3", sport: "Padel",     partnerId: "theo", partnerName: "Théo Lambert", date: addDays(-6), time: "10:00", place: "Padel Up", status: "done", score: 4 },
  { id: "d4", sport: "Yoga",      partnerId: "marie",partnerName: "Marie Dupont", date: addDays(-9), time: "19:00", place: "FitZone", status: "done", score: 5 },
  { id: "d5", sport: "CrossFit",  partnerId: "yann", partnerName: "Yann Petit",   date: addDays(-12),time: "18:30", place: "CrossFit 11e", status: "done", score: 3 },
  { id: "d6", sport: "Running",   partnerId: "noa",  partnerName: "Noa Carvalho", date: addDays(-15),time: "07:00", place: "Canal", status: "done", score: 4 },

  // cancelled
  { id: "c1", sport: "Boxe",      partnerId: "adam", partnerName: "Adam Bensaïd", date: addDays(-4),  time: "08:00", place: "BoxLab", status: "cancelled" },
  { id: "c2", sport: "Yoga",      partnerId: "sofia",partnerName: "Sofia Lopez",  date: addDays(-10), time: "07:30", place: "Visio", status: "cancelled" },
];

export function countThisMonth(status: SessionStatus) {
  const now = new Date(); const m = now.getMonth(), y = now.getFullYear();
  return SESSIONS.filter((s) => {
    if (s.status !== status) return false;
    const d = new Date(s.date);
    return d.getMonth() === m && d.getFullYear() === y;
  }).length;
}
