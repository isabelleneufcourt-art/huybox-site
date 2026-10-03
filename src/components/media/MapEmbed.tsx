/**
 * Un lien de partage Google Maps (maps.app.goo.gl, google.com/maps/place…)
 * ne peut pas être affiché dans une iframe ("google.com n'autorise pas la
 * connexion"). Seules les URL d'intégration le peuvent. Si l'URL fournie n'en
 * est pas une, on construit la carte à partir de l'adresse.
 */
function toEmbedUrl(embedUrl: string, address: string) {
  const isEmbeddable = embedUrl.includes("/maps/embed") || embedUrl.includes("output=embed");
  if (isEmbeddable) return embedUrl;
  return `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
}

export function MapEmbed({
  embedUrl,
  address,
  className,
}: {
  embedUrl: string;
  address: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <iframe
        src={toEmbedUrl(embedUrl, address)}
        title="Localisation du bâtiment sur Google Maps"
        className="h-full w-full rounded-2xl border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
