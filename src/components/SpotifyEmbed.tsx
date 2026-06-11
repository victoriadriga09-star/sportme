import { ExternalLink } from "lucide-react";

type Props = {
  spotifyId?: string;
  title: string;
  artist: string;
};

/**
 * Renders Spotify's public embed iframe (30s preview without login, full track for Spotify users).
 * Falls back to an "Ouvrir sur Spotify" search link if the track ID is missing.
 */
export function SpotifyEmbed({ spotifyId, title, artist }: Props) {
  if (!spotifyId) {
    const q = encodeURIComponent(`${title} ${artist}`);
    return (
      <a
        href={`https://open.spotify.com/search/${q}`}
        target="_blank"
        rel="noreferrer"
        className="mt-4 flex items-center justify-between gap-2 pill bg-white/70 border border-black/5 px-4 py-3 text-[12px] font-semibold text-ink/80"
      >
        <span>Aperçu Spotify indisponible</span>
        <span className="inline-flex items-center gap-1 text-[#1DB954]">
          Ouvrir <ExternalLink className="size-3.5" />
        </span>
      </a>
    );
  }

  return (
    <iframe
      key={spotifyId}
      src={`https://open.spotify.com/embed/track/${spotifyId}?utm_source=elan`}
      width="100%"
      height={152}
      loading="lazy"
      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
      className="mt-4 w-full rounded-2xl border-0"
      title={`Spotify — ${title} par ${artist}`}
    />
  );
}
