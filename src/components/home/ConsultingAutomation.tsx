import { t, type Locale, type Localized } from "@/content/localized";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import "./consulting.css";

export const heading: Localized = {
  pt: "Consultoria e automação",
  en: "Consulting and automation",
};

export const consultingCopy = {
  intro: {
    pt: "Cada empresa trabalha de um jeito, e não existe fórmula mágica. Adapto a IA à necessidade real de cada time, focando em resultado.",
    en: "Every company works differently, and there is no magic formula. I adapt AI to each team's real needs, focused on results.",
  },
  offers: [
    {
      pt: "Fluxos de processos e automações",
      en: "Process and automation flows",
    },
    { pt: "Integração entre ferramentas", en: "Tool integration" },
    {
      pt: "Treinamento de equipes para usar IA no trabalho",
      en: "Team training to use AI at work",
    },
  ] satisfies Localized[],
  realCase: {
    pt: "Caso real: automatizei a rotina operacional de uma fintech, liberando o time para o trabalho que exige decisão.",
    en: "Real case: I automated the operational routine of a fintech, freeing the team for work that requires judgment.",
  },
  action: { pt: "Falar sobre automação", en: "Talk about automation" },
  whatsappMessage: {
    pt: "Olá, Iago! Gostaria de conversar sobre automação e IA para o meu time.",
    en: "Hi Iago! I'd like to talk about automation and AI for my team.",
  },
};

export function ConsultingAutomation({ locale }: { locale: Locale }) {
  return (
    <section id="consulting" className="section" aria-labelledby="consulting-heading">
      <h2 id="consulting-heading" className="section__title">
        {t(heading, locale)}
      </h2>
      <div className="consulting">
        <p className="consulting__intro">{t(consultingCopy.intro, locale)}</p>
        <ul className="consulting__list">
          {consultingCopy.offers.map((o) => (
            <li key={o.en} className="consulting__item">
              {t(o, locale)}
            </li>
          ))}
        </ul>
        <p className="consulting__case">{t(consultingCopy.realCase, locale)}</p>
        <WhatsAppButton locale={locale} message={consultingCopy.whatsappMessage}>
          {t(consultingCopy.action, locale)}
        </WhatsAppButton>
      </div>
    </section>
  );
}
