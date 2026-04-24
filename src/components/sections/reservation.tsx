"use client";

import { useState } from "react";
import { Phone } from "lucide-react";
import { MagneticButton } from "@/components/magnetic-button";
import type { GeneralSettings } from "@/lib/content";

const TIMES = ["12h00", "12h30", "13h00", "13h30", "19h00", "19h30", "20h00", "20h30", "21h00"];

export function Reservation({ settings }: { settings: GeneralSettings }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    const subject = encodeURIComponent(`Demande de réservation — ${data.get("firstname")} ${data.get("lastname")}`);
    const body = encodeURIComponent(
      `Prénom : ${data.get("firstname")}\n` +
      `Nom : ${data.get("lastname")}\n` +
      `Téléphone : ${data.get("phone")}\n` +
      `Date : ${data.get("date")}\n` +
      `Heure : ${data.get("time")}\n` +
      `Couverts : ${data.get("guests")}\n` +
      `Message : ${data.get("message") || "—"}`
    );
    window.location.href = `mailto:contact@lovive.fr?subject=${subject}&body=${body}`;
    setTimeout(() => setStatus("sent"), 600);
  };

  const today = new Date().toISOString().slice(0, 10);

  return (
    <section
      id="reservation"
      className="relative overflow-hidden bg-turquoise py-24 text-cream md:py-32"
      aria-label="Réservation"
    >
      <svg
        className="absolute -bottom-32 -left-24 opacity-10"
        width="600"
        height="600"
        viewBox="0 0 600 600"
        aria-hidden
      >
        <circle cx="300" cy="300" r="260" stroke="#FAF8F3" strokeWidth="60" fill="none" />
      </svg>

      <div className="relative mx-auto max-w-[1100px] px-6 lg:px-10">
        <div className="text-center reveal">
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-cream/80">
            Réserver
          </span>
          <h2 className="mt-4 font-display text-display-lg font-semibold italic text-cream">
            Une table ce soir ?
          </h2>
          <p className="mt-5 font-display text-lg italic text-cream/85 md:text-xl">
            Appelez-nous ou envoyez une demande.
          </p>
        </div>

        <div className="mt-12 flex flex-col items-center gap-8 reveal" data-delay="120">
          <a
            href={`tel:${settings.phoneRaw}`}
            data-cursor="hover"
            className="font-display font-semibold italic text-cream transition-opacity hover:opacity-80"
            style={{ fontSize: "clamp(2.4rem, 6vw, 3.5rem)" }}
          >
            {settings.phone}
          </a>
          <div className="flex items-center gap-4">
            <span className="block h-px w-16 bg-cream/40" />
            <span className="font-display text-base italic text-cream/80">ou</span>
            <span className="block h-px w-16 bg-cream/40" />
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="reveal mt-10 bg-cream p-8 text-night shadow-wave md:p-12"
          style={{ borderRadius: "32px 4px 32px 4px" }}
          data-delay="200"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Field name="firstname" label="Prénom" required />
            <Field name="lastname" label="Nom" required />
            <Field name="phone" label="Téléphone" type="tel" required />
            <Field name="date" label="Date" type="date" required min={today} />
            <SelectField
              name="time"
              label="Heure"
              required
              options={TIMES}
            />
            <SelectField
              name="guests"
              label="Couverts"
              required
              options={Array.from({ length: 10 }, (_, i) => `${i + 1}`)}
            />
            <div className="md:col-span-2">
              <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-muted">
                Message (optionnel)
              </label>
              <textarea
                name="message"
                rows={3}
                className="w-full rounded-2xl border border-night/10 bg-cream px-4 py-3 font-sans text-base text-night transition-colors focus:border-turquoise focus:outline-none focus:ring-2 focus:ring-turquoise/30"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-4">
            <MagneticButton
              as="button"
              type="submit"
              disabled={status !== "idle"}
              className="bg-night px-8 py-4 text-[15px] text-cream shadow-card-soft hover:bg-night/90 disabled:opacity-60"
            >
              {status === "sent"
                ? "Demande envoyée"
                : status === "sending"
                ? "Envoi…"
                : "Envoyer la demande"}
            </MagneticButton>
            <p className="text-center text-xs italic text-muted">
              La réservation sera confirmée par le restaurant.
            </p>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-cream/80">
          <Phone size={14} strokeWidth={2} className="mr-2 inline-block align-middle" />
          Plus rapide par téléphone — réponse immédiate aux heures d'ouverture.
        </p>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  min,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  min?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-muted">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        min={min}
        className="w-full rounded-2xl border border-night/10 bg-cream px-4 py-3 font-sans text-base text-night transition-colors focus:border-turquoise focus:outline-none focus:ring-2 focus:ring-turquoise/30"
      />
    </div>
  );
}

function SelectField({
  name,
  label,
  required,
  options,
}: {
  name: string;
  label: string;
  required?: boolean;
  options: string[];
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-muted">
        {label}
      </label>
      <select
        name={name}
        required={required}
        defaultValue=""
        className="w-full rounded-2xl border border-night/10 bg-cream px-4 py-3 font-sans text-base text-night transition-colors focus:border-turquoise focus:outline-none focus:ring-2 focus:ring-turquoise/30"
      >
        <option value="" disabled>
          Choisir…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
