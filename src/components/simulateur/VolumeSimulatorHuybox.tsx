"use client";

import { useEffect, useRef } from "react";
import "@/app/(site)/simulateur/huybox-simulator.css";
import { initHuyboxSimulator } from "./simulateur-huybox-init";

/**
 * Simulateur de volume "objet par objet" fourni par le client (fichier
 * simulateurvolumehuybox.html) : catalogue d'objets par pièce, compteurs,
 * recommandation de box et aperçu isométrique du remplissage.
 *
 * Intégré tel quel (markup + logique JS d'origine, voir
 * simulateur-huybox-init.js) plutôt que réécrit en React, pour rester fidèle
 * au prototype — seule la mise en page a changé : l'en-tête et le pied de
 * page maison du fichier d'origine sont retirés au profit du menu et du
 * footer du site (déjà présents sur toutes les pages), pour qu'on puisse
 * toujours revenir au reste du site normalement.
 */
export function VolumeSimulatorHuybox() {
  const initialized = useRef(false);

  useEffect(() => {
    // Garde-fou pour le double rendu des effets en développement (React
    // StrictMode) : la logique d'origine attache des écouteurs sur des
    // éléments qui persistent entre deux passages de l'effet (ex. le bouton
    // "Réinitialiser"), il ne faut l'exécuter qu'une fois par montage réel.
    if (initialized.current) return;
    initialized.current = true;
    initHuyboxSimulator();
  }, []);

  return (
    <div className="huybox-sim-page">
      <section className="hero">
        <div className="hero-inner">
          <span className="eyebrow">Simulateur gratuit</span>
          <h1>Simulateur de volume</h1>
          <p>
            Calculez en quelques clics le volume et la taille de box Huybox dont vous avez
            réellement besoin, objet par objet.
          </p>
        </div>
      </section>

      <div className="wrap">
        <div className="card">
          <div className="tabs" id="tabs" />
          <div className="panel" id="panel" />
        </div>

        <aside className="card summary">
          <div>
            <h3>Volume total estimé</h3>
            <div className="vol-total">
              <span className="num" id="volRaw">
                0
              </span>
              <span className="unit">m³</span>
            </div>
            <div className="vol-sub" id="volSubtext">
              Ajoutez des objets pour commencer
            </div>
          </div>

          <div className="gauge">
            <div className="gauge-track">
              <div className="gauge-fill" id="gaugeFill" />
            </div>
            <div className="gauge-labels">
              <span>0 m³</span>
              <span>20 m³ +</span>
            </div>
          </div>

          <div className="reco-card">
            <div className="reco-label">Box conseillé</div>
            <div className="reco-name" id="recoName">
              —
            </div>
            <div className="reco-m2" id="recoM2">
              Ajoutez des objets pour voir une recommandation
            </div>
            <div className="reco-price" id="recoPrice" />
          </div>

          <div className="fillviz-section">
            <h3>Aperçu du remplissage</h3>
            <div className="iso-room-wrap">
              <svg id="isoRoom" viewBox="0 0 220 260" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="isoShadow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#000000" stopOpacity="0.32" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <g id="isoRoomShell" />
                <g id="isoItems" />
              </svg>
            </div>
            <div className="iso-caption" id="isoCaption">
              Ajoutez des objets pour visualiser le remplissage de votre box.
            </div>
          </div>

          <div className="breakdown" id="breakdown" />

          <div className="summary-actions">
            <button className="reset-link" id="resetBtn" type="button">
              Réinitialiser la simulation
            </button>
          </div>

          <div className="disclaimer">
            Estimation indicative incluant une marge de 15% pour l&apos;accès et la circulation
            dans le box. Box Huybox disponibles en 8, 10 et 15 m³ (hauteur sous plafond 2,5 m) — un
            conseiller confirmera la solution idéale, y compris en combinant plusieurs box si
            besoin.
          </div>
        </aside>
      </div>

      <section className="tiers-section">
        <h2>Nos tailles de box, en un coup d&apos;œil</h2>
        <p>
          Nos box mesurent 2,5 m de hauteur sous plafond, au tarif de 8 €/m³/mois. Au-delà de
          15 m³, nous combinons plusieurs box pour couvrir votre besoin.
        </p>
        <div className="tiers-grid" id="tiersGrid" />
      </section>
    </div>
  );
}
