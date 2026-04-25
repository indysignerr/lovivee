import type { Metadata } from "next";
import { LegalShell } from "@/components/legal-shell";

export const metadata: Metadata = {
  title: "Politique de confidentialité — L'Ovive",
  description:
    "Politique de confidentialité du site L'Ovive — collecte et traitement des données personnelles.",
  robots: { index: true, follow: false },
};

export default function PolitiqueConfidentialite() {
  return (
    <LegalShell
      title="Politique de confidentialité"
      intro="L'Ovive attache une grande importance à la protection de votre vie privée et de vos données personnelles, conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés."
    >
      <h2>Responsable du traitement</h2>
      <p>
        Le responsable du traitement des données personnelles collectées sur ce site est{" "}
        <strong>L'Ovive</strong>, 329 route d'Antibes, 06410 Biot. Vous pouvez nous contacter au{" "}
        <a href="tel:+33493650783">04 93 65 07 83</a>.
      </p>

      <h2>Données collectées</h2>
      <p>Le site lovive.fr collecte un nombre minimal de données :</p>
      <ul>
        <li>
          <strong>Aucune création de compte</strong> n'est requise pour consulter le site.
        </li>
        <li>
          <strong>Aucun formulaire de contact</strong> n'est intégré : la prise de contact se
          fait par téléphone.
        </li>
        <li>
          <strong>Avis Google</strong> : les avis sont affichés via le widget Elfsight, qui peut
          déposer ses propres cookies techniques.
        </li>
        <li>
          <strong>Plan d'accès</strong> : la carte est fournie par Google Maps via une iframe.
          Google peut collecter des données techniques (adresse IP, type de navigateur).
        </li>
      </ul>

      <h2>Cookies</h2>
      <p>
        Le site lovive.fr <strong>n'utilise aucun cookie de mesure d'audience ni publicitaire</strong>.
        Seuls les services tiers intégrés (Google Maps, Elfsight) peuvent en déposer.
      </p>
      <p>
        Vous pouvez paramétrer votre navigateur pour refuser ces cookies. Cela n'affectera pas
        votre navigation sur le reste du site.
      </p>

      <h2>Hébergement et journaux serveur</h2>
      <p>
        Le site est hébergé par <strong>Cloudflare, Inc.</strong>, qui peut conserver des
        journaux de connexion (adresse IP, horodatage, type de requête) pour des raisons de
        sécurité, pendant une durée limitée. Aucune donnée commerciale ou marketing n'est
        extraite de ces journaux par L'Ovive.
      </p>

      <h2>Vos droits</h2>
      <p>Conformément au RGPD, vous disposez des droits suivants :</p>
      <ul>
        <li>droit d'accès à vos données personnelles ;</li>
        <li>droit de rectification des données inexactes ;</li>
        <li>droit à l'effacement (« droit à l'oubli ») ;</li>
        <li>droit à la limitation du traitement ;</li>
        <li>droit à la portabilité de vos données ;</li>
        <li>droit d'opposition au traitement.</li>
      </ul>
      <p>
        Pour exercer l'un de ces droits, contactez-nous au{" "}
        <a href="tel:+33493650783">04 93 65 07 83</a> ou directement au restaurant.
      </p>

      <h2>Réclamation</h2>
      <p>
        Vous avez le droit d'introduire une réclamation auprès de la{" "}
        <strong>Commission Nationale de l'Informatique et des Libertés (CNIL)</strong> :{" "}
        <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
          www.cnil.fr
        </a>
        .
      </p>

      <h2>Modifications</h2>
      <p>
        La présente politique peut être modifiée à tout moment pour s'adapter aux évolutions
        légales ou techniques. La date de dernière mise à jour figure en bas de cette page.
      </p>

      <hr />

      <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
        Dernière mise à jour : 25 avril 2026.
      </p>
    </LegalShell>
  );
}
