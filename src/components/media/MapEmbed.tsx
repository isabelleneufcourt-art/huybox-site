export function MapEmbed({ embedUrl, className }: { embedUrl: string; className?: string }) {
  return (
    <div className={className}>
      <iframe
        src={embedUrl}
        title="Localisation du bâtiment sur Google Maps"
        className="h-full w-full rounded-2xl border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
