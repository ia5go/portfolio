"use client";

import type { Locale } from "@/content/localized";
import { About } from "./home/About";
import { Contact } from "./home/Contact";
import { ConsultingAutomation } from "./home/ConsultingAutomation";
import { ContactStrip } from "./home/ContactStrip";
import { Experience } from "./home/Experience";
import { FeaturedProjects } from "./home/FeaturedProjects";
import { FormationCourses } from "./home/FormationCourses";
import { Hero } from "./home/Hero";
import { Skills } from "./home/Skills";
import { useLocale } from "./site/LocaleProvider";
import { Nav } from "./site/Nav";

/**
 * Section order is fixed by the spec. Each section lives in its own slot file in ./home.
 * A client component so every text follows an in-place language switch; `locale` is the
 * language the route was served in.
 */
export function HomePage({ locale: served }: { locale: Locale }) {
  const locale = useLocale(served);
  return (
    <>
      <Nav locale={locale} page="home" />
      <main className="home">
        <Hero locale={locale} />
        <FeaturedProjects locale={locale} />
        <ContactStrip locale={locale} />
        <About locale={locale} />
        <Skills locale={locale} />
        <Experience locale={locale} />
        <ConsultingAutomation locale={locale} />
        <FormationCourses locale={locale} />
        <Contact locale={locale} />
      </main>
    </>
  );
}
