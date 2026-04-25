import type { Metadata } from "next";
import { LegalShell } from "@/components/legal-shell";

export const metadata: Metadata = {
  title: "Mentions légales — L'Ovive",
  description: "Mentions légales du site L'Ovive — pizzeria et restaurant à Biot.",
  robots: { index: true, follow: false },
};

export default function MentionsLegales() {
  return (
    <LegalShell
      title="Mentions légales"
      intro="Conformément aux dispositions des articles 6-III et 19 de la Loi n° 2004-575 du 21 juin 2004 pour la Confiance dans l'économie numérique, dite L.C.E.N."
    >
      <h2>Éditeur du site</h2>
      <p>
        <strong>L'Ovive</strong>
        <br />
        329 route d'Antibes
        <br />
        06410 Biot, France
      </p>
      <p>
        Téléphone : <a href="tel:+33493650783">04 93 65 07 83</a>
        <br />
        Forme juridique et numéro SIREN : à compléter par l'établissement.
      </p>

      <h2>Directeur de la publication</h2>
      <p>Le représentant légal de L'Ovive.</p>

      <h2>Hébergement</h2>
      <p>
        Le site est hébergé par <strong>Cloudflare, Inc.</strong>
        <br />
        101 Townsend St, San Francisco, CA 94107, États-Unis
        <br />
        <a href="https://www.cloudflare.com" target="_blank" rel="noopener noreferrer">
          www.cloudflare.com
        </a>
      </p>

      <h2>Conception et réalisation</h2>
      <p>
        Site conçu et développé par <strong>Indysigner</strong> —{" "}
        <a href="https://indysigner.fr" target="_blank" rel="noopener noreferrer">
          indysigner.fr
        </a>
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L'ensemble des contenus présents sur ce site (textes, images, logo, charte graphique,
        photographies, vidéos, codes sources) est la propriété exclusive de L'Ovive ou de leurs
        ayants droit respectifs. Toute reproduction, représentation, modification, publication ou
        adaptation, totale ou partielle, est interdite sans l'autorisation écrite préalable du
        titulaire des droits.
      </p>

      <h2>Crédits photographiques</h2>
      <p>
        Photographies fournies par L'Ovive. Logo L'Ovive : tous droits réservés.
      </p>

      <h2>Liens hypertextes</h2>
      <p>
        Le site peut contenir des liens vers des sites externes. L'Ovive n'exerce aucun contrôle
        sur ces ressources et ne saurait être tenu responsable de leur contenu.
      </p>

      <h2>Limitation de responsabilité</h2>
      <p>
        Les informations diffusées sur ce site (carte, prix, horaires) sont fournies à titre
        indicatif. L'Ovive s'efforce de les tenir à jour mais ne saurait garantir leur exactitude
        absolue à un instant donné. Les prix et la disponibilité des plats sont confirmés au
        restaurant.
      </p>

      <h2>Droit applicable</h2>
      <p>
        Les présentes mentions légales sont soumises au droit français. Tout litige relatif au
        site relève de la compétence exclusive des juridictions françaises.
      </p>

      <hr />

      <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
        Dernière mise à jour : 25 avril 2026.
      </p>
    </LegalShell>
  );
}
