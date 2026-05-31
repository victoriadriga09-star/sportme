export function downloadIcs(opts: {
  title: string;
  description?: string;
  location?: string;
  start: Date;
  durationMinutes?: number;
}) {
  const start = opts.start;
  const end = new Date(start.getTime() + (opts.durationMinutes ?? 60) * 60_000);
  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const uid = `elan-${start.getTime()}@elan.app`;
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//ELAN//FR",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${escape(opts.title)}`,
    opts.description ? `DESCRIPTION:${escape(opts.description)}` : "",
    opts.location ? `LOCATION:${escape(opts.location)}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean).join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${opts.title.replace(/\s+/g, "-").toLowerCase()}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function escape(s: string) {
  return s.replace(/[\\,;]/g, (m) => "\\" + m).replace(/\n/g, "\\n");
}
