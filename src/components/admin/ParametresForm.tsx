"use client";

import { useFormState, useFormStatus } from "react-dom";
import { CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";
import type { SiteSettingsData } from "@/lib/settings";
import {
  updateSiteSettingsAction,
  type SaveSettingsState,
} from "@/app/admin/(protected)/parametres/actions";

const inputClass =
  "w-full rounded-lg border border-neutral-300 px-3 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";
const labelClass = "mb-1.5 block text-sm font-medium text-neutral-800";

const initialState: SaveSettingsState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-60"
    >
      {pending && <Loader2 className="h-4 w-4 animate-spin" />}
      Enregistrer les paramètres
    </button>
  );
}

export function ParametresForm({ settings }: { settings: SiteSettingsData }) {
  const [state, formAction] = useFormState(updateSiteSettingsAction, initialState);

  return (
    <form action={formAction} className="mt-6 space-y-8">
      {state.status === "ok" && (
        <div className="flex items-center gap-2 rounded-xl bg-accent/10 px-4 py-3 text-sm font-medium text-accent">
          <CheckCircle2 className="h-4 w-4" /> Paramètres enregistrés avec succès.
        </div>
      )}
      {state.status === "error" && (
        <div className="flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            Échec de l&apos;enregistrement.
            {state.message && <span className="block font-normal text-red-600">{state.message}</span>}
          </span>
        </div>
      )}

      <fieldset className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-6">
        <legend className="px-1 text-sm font-semibold text-neutral-900">Téléphone & coordonnées</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="phoneNumber" className={labelClass}>
              Numéro (format international, ex. +32 2 000 00 00)
            </label>
            <input id="phoneNumber" name="phoneNumber" required defaultValue={settings.phoneNumber} className={inputClass} />
          </div>
          <div>
            <label htmlFor="phoneNumberDisplay" className={labelClass}>
              Numéro affiché (format lisible)
            </label>
            <input id="phoneNumberDisplay" name="phoneNumberDisplay" required defaultValue={settings.phoneNumberDisplay} className={inputClass} />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="addressStreet" className={labelClass}>
              Rue et numéro
            </label>
            <input id="addressStreet" name="addressStreet" required defaultValue={settings.addressStreet} className={inputClass} />
          </div>
          <div>
            <label htmlFor="addressCity" className={labelClass}>
              Code postal et ville
            </label>
            <input id="addressCity" name="addressCity" required defaultValue={settings.addressCity} className={inputClass} />
          </div>
          <div>
            <label htmlFor="addressCountry" className={labelClass}>
              Pays
            </label>
            <input id="addressCountry" name="addressCountry" required defaultValue={settings.addressCountry} className={inputClass} />
          </div>
        </div>
        <div>
          <label htmlFor="openingHours" className={labelClass}>
            Horaires d&apos;accès
          </label>
          <input id="openingHours" name="openingHours" required defaultValue={settings.openingHours} className={inputClass} />
        </div>
        <div>
          <label htmlFor="googleMapsEmbedUrl" className={labelClass}>
            URL d&apos;intégration Google Maps (embed)
          </label>
          <input id="googleMapsEmbedUrl" name="googleMapsEmbedUrl" required defaultValue={settings.googleMapsEmbedUrl} className={inputClass} />
        </div>
      </fieldset>

      <fieldset className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-6">
        <legend className="px-1 text-sm font-semibold text-neutral-900">Page d&apos;accueil</legend>
        <div>
          <label htmlFor="heroTitle" className={labelClass}>
            Titre principal (hero)
          </label>
          <input id="heroTitle" name="heroTitle" required defaultValue={settings.heroTitle} className={inputClass} />
        </div>
        <div>
          <label htmlFor="heroSubtitle" className={labelClass}>
            Sous-titre (hero)
          </label>
          <input id="heroSubtitle" name="heroSubtitle" required defaultValue={settings.heroSubtitle} className={inputClass} />
        </div>
      </fieldset>

      <fieldset className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-6">
        <legend className="px-1 text-sm font-semibold text-neutral-900">Visite virtuelle vidéo</legend>
        <div>
          <label htmlFor="virtualTourVideoUrl" className={labelClass}>
            URL d&apos;intégration vidéo (YouTube/Vimeo &quot;embed&quot;) — laisser vide tant qu&apos;il
            n&apos;y a pas de vraie vidéo
          </label>
          <input
            id="virtualTourVideoUrl"
            name="virtualTourVideoUrl"
            defaultValue={settings.virtualTourVideoUrl}
            className={inputClass}
            placeholder="https://www.youtube.com/embed/…"
          />
        </div>
        <div>
          <label htmlFor="virtualTourThumbnail" className={labelClass}>
            Miniature (URL image, optionnel)
          </label>
          <input id="virtualTourThumbnail" name="virtualTourThumbnail" defaultValue={settings.virtualTourThumbnail ?? ""} className={inputClass} />
        </div>
        <label className="flex items-center gap-2 text-sm font-medium text-neutral-800">
          <input type="checkbox" name="virtualTourEnabled" defaultChecked={settings.virtualTourEnabled} className="h-4 w-4 rounded border-neutral-300" />
          Afficher la visite virtuelle sur le site
        </label>
      </fieldset>

      <fieldset className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-6">
        <legend className="px-1 text-sm font-semibold text-neutral-900">Analytics</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="ga4Id" className={labelClass}>
              ID Google Analytics 4 (optionnel)
            </label>
            <input id="ga4Id" name="ga4Id" defaultValue={settings.ga4Id ?? ""} className={inputClass} placeholder="G-XXXXXXX" />
          </div>
          <div>
            <label htmlFor="gtmId" className={labelClass}>
              ID Google Tag Manager (optionnel)
            </label>
            <input id="gtmId" name="gtmId" defaultValue={settings.gtmId ?? ""} className={inputClass} placeholder="GTM-XXXXXXX" />
          </div>
        </div>
        <p className="text-xs text-neutral-500">
          Ces scripts ne se chargent qu&apos;après acceptation du bandeau cookies par le visiteur.
        </p>
      </fieldset>

      <SubmitButton />
    </form>
  );
}
