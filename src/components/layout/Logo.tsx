/**
 * Reconstitution du logo HUYBOX (cube isométrique bleu marine/rouge +
 * wordmark) en SVG inline, aux couleurs de marque définies dans
 * globals.css. À remplacer par le fichier logo officiel du client dès
 * qu'il est fourni (ex. /public/logo.svg, importé ici à la place du SVG).
 */
export function Logo({ className, showWordmark = true }: { className?: string; showWordmark?: boolean }) {
  return (
    <svg
      viewBox={showWordmark ? "0 0 260 60" : "0 0 60 60"}
      className={className}
      role="img"
      aria-label="HUYBOX"
    >
      {/* Cube isométrique */}
      <g transform="translate(0, 4)">
        <polygon points="26,0 52,13 26,26 0,13" className="fill-primary" />
        <polygon points="0,13 26,26 26,52 0,39" className="fill-secondary" />
        <polygon points="52,13 26,26 26,52 52,39" className="fill-primary" />
      </g>
      {showWordmark && (
        <text
          x="68"
          y="40"
          className="fill-primary"
          style={{ font: "700 34px var(--font-heading, sans-serif)", letterSpacing: "0.5px" }}
        >
          HUYBOX
        </text>
      )}
    </svg>
  );
}
