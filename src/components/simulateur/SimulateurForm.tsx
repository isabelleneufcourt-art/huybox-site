"use client";

import { useMemo, useState } from "react";
import { Box, Home, Warehouse, TreePine } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PhoneCTA } from "@/components/ui/PhoneCTA";
import { formatEuro, monthlyPrice } from "@/lib/utils";
import { closestBox, type BoxTypeData } from "@/lib/boxes";
import {
  LOGEMENT_OPTIONS,
  estimateVolumeM3,
  type LogementType,
  type SimulateurInput,
} from "@/lib/simulateur";

interface SimulateurFormProps {
  boxes: BoxTypeData[];
  phoneNumber: string;
  phoneNumberDisplay: string;
}

const DEFAULT_STATE: SimulateurInput = {
  logementType: "t2",
  surfaceM2: 50,
  nombrePieces: 2,
  cave: false,
  garage: false,
  grenier: false,
  jardin: false,
};

export function SimulateurForm({ boxes, phoneNumber, phoneNumberDisplay }: SimulateurFormProps) {
  const [input, setInput] = useState<SimulateurInput>(DEFAULT_STATE);
  const [submitted, setSubmitted] = useState(false);

  const estimatedVolume = useMemo(() => estimateVolumeM3(input), [input]);
  const recommendedBox = useMemo(() => closestBox(boxes, estimatedVolume), [boxes, estimatedVolume]);
  const price = monthlyPrice(recommendedBox.volumeM3, recommendedBox.pricePerM3);

  function handleLogementChange(value: LogementType) {
    const preset = LOGEMENT_OPTIONS.find((o) => o.value === value);
    setInput((prev) => ({
      ...prev,
      logementType: value,
      surfaceM2: preset?.surfaceHint ?? prev.surfaceM2,
    }));
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
        className="space-y-6 rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8"
      >
        <div>
          <label className="mb-2 block text-sm font-semibold text-neutral-800">
            Type de logement
          </label>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {LOGEMENT_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleLogementChange(option.value)}
                className={`rounded-lg border px-2 py-2 text-xs font-medium transition-colors ${
                  input.logementType === option.value
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="surface" className="mb-2 block text-sm font-semibold text-neutral-800">
              Surface (m²)
            </label>
            <input
              id="surface"
              type="number"
              min={10}
              max={400}
              value={input.surfaceM2}
              onChange={(e) => setInput((prev) => ({ ...prev, surfaceM2: Number(e.target.value) }))}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="pieces" className="mb-2 block text-sm font-semibold text-neutral-800">
              Nombre de pièces
            </label>
            <input
              id="pieces"
              type="number"
              min={1}
              max={15}
              value={input.nombrePieces}
              onChange={(e) => setInput((prev) => ({ ...prev, nombrePieces: Number(e.target.value) }))}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-neutral-800">
            Annexes disponibles
          </label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {(
              [
                { key: "cave", label: "Cave", icon: Box },
                { key: "garage", label: "Garage", icon: Warehouse },
                { key: "grenier", label: "Grenier", icon: Home },
                { key: "jardin", label: "Jardin", icon: TreePine },
              ] as const
            ).map(({ key, label, icon: Icon }) => (
              <label
                key={key}
                className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${
                  input[key] ? "border-primary bg-primary/10 text-primary" : "border-neutral-200 text-neutral-600"
                }`}
              >
                <input
                  type="checkbox"
                  checked={input[key]}
                  onChange={(e) => setInput((prev) => ({ ...prev, [key]: e.target.checked }))}
                  className="sr-only"
                />
                <Icon className="h-4 w-4" aria-hidden />
                {label}
              </label>
            ))}
          </div>
        </div>

        <Button type="submit" className="w-full" size="lg">
          Estimer mon volume
        </Button>
      </form>

      <div className="rounded-2xl border-2 border-secondary bg-secondary/5 p-6 sm:p-8">
        {!submitted ? (
          <p className="flex h-full items-center justify-center text-center text-neutral-500">
            Remplissez le formulaire pour obtenir votre estimation.
          </p>
        ) : (
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-secondary">
              Volume estimé
            </p>
            <p className="mt-1 text-4xl font-bold text-neutral-900">{estimatedVolume} m³</p>

            <div className="mt-6 rounded-xl bg-white p-5">
              <p className="text-sm text-neutral-600">Box recommandé</p>
              <p className="mt-1 text-2xl font-bold text-primary">{recommendedBox.name}</p>
              {recommendedBox.equivalence && (
                <p className="mt-1 text-sm text-neutral-600">{recommendedBox.equivalence}</p>
              )}
              <p className="mt-3 text-3xl font-bold text-neutral-900">
                {formatEuro(price)}
                <span className="text-base font-medium text-neutral-500"> /mois TVAC</span>
              </p>
            </div>

            <p className="mt-6 text-sm text-neutral-600">
              Cette estimation est indicative. Appelez-nous pour vérifier les disponibilités et
              affiner votre choix avec notre équipe.
            </p>
            <div className="mt-4">
              <PhoneCTA phoneNumber={phoneNumber} phoneNumberDisplay={phoneNumberDisplay} className="w-full" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
