/**
 * Extrait les couleurs dominantes d'un logo (PNG/JPG) et affiche les
 * variables CSS HSL prêtes à coller dans src/app/globals.css.
 *
 * Usage : npm run extract-colors -- chemin/vers/logo.png
 */
import getPixels from "get-pixels";
// @ts-expect-error — pas de types publiés pour ce paquet
import quantize from "quantize";

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

async function main() {
  const logoPath = process.argv[2];
  if (!logoPath) {
    console.error("Usage: npm run extract-colors -- chemin/vers/logo.png");
    process.exit(1);
  }

  getPixels(logoPath, (err: Error | null, pixels: { shape: number[]; data: Uint8Array }) => {
    if (err) {
      console.error("Impossible de lire l'image :", err);
      process.exit(1);
    }

    const [width, height] = pixels.shape;
    const samplePixels: [number, number, number][] = [];

    for (let x = 0; x < width; x += 2) {
      for (let y = 0; y < height; y += 2) {
        const idx = (y * width + x) * 4;
        const a = pixels.data[idx + 3];
        if (a < 200) continue; // ignore les pixels transparents
        samplePixels.push([pixels.data[idx], pixels.data[idx + 1], pixels.data[idx + 2]]);
      }
    }

    const colorMap = quantize(samplePixels, 5);
    if (!colorMap) {
      console.error("Palette introuvable — image trop uniforme ?");
      return;
    }

    const palette = colorMap.palette() as [number, number, number][];
    console.log("\nCouleurs dominantes détectées :\n");
    palette.forEach(([r, g, b], i) => {
      const [h, s, l] = rgbToHsl(r, g, b);
      console.log(`  ${i + 1}. rgb(${r}, ${g}, ${b})  ->  --color-x: ${h} ${s}% ${l}%;`);
    });

    console.log(
      "\nCopie les valeurs choisies dans src/app/globals.css (:root) à la place de\n" +
        "--color-primary / --color-secondary / --color-accent, en gardant le\n" +
        "format 'H S% L%'. Vérifie ensuite le contraste texte/fond (WCAG AA).\n"
    );
  });
}

main();
