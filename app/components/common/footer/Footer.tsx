"use client";

import { useTranslations } from "next-intl";
import { ContactForm } from "@/app/components/pages/homePageComponents/contactForm/ContactForm";

export default function Footer() {
  const tFooter = useTranslations("footer");

  return (
    <footer
      id="contact"
      className="flex min-h-[40vh] flex-col items-center justify-center gap-8 px-6 py-20 text-center text-foreground"
    >
      <p className="text-lg font-medium">{tFooter("cta")}</p>
      <div className="flex flex-col items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
        <a
          href={`mailto:${tFooter("email")}`}
          className="text-indigo-600 underline-offset-4 hover:underline dark:text-indigo-400"
        >
          {tFooter("email")}
        </a>
        <a
          href={`tel:${tFooter("phone").replace(/\s/g, "")}`}
          className="transition-colors hover:text-foreground"
        >
          <span dir="ltr">{tFooter("tel")}</span>
        </a>
        <a
          href={`https://wa.me/${tFooter("phone").replace(/\s/g, "")}`}
          target="_blank"
          className="transition-colors hover:text-foreground"
        >
          <span dir="ltr">{tFooter("whatsapp")}</span>
        </a>
        <span>{tFooter("location")}</span>
      </div>
      <ContactForm />
    </footer>
  );
}
