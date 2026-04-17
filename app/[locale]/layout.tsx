import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { QueryProvider } from "../components/common/queryProvider/QueryProvider";
import { LocaleThemeToggle } from "../components/common/cvAndThemeToggler/CvAndThemeToggler";

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const dir = locale === "ar" ? "rtl" : "ltr";
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <QueryProvider>
        <LocaleThemeToggle />
        <div className="relative z-10" dir={dir}>
          {children}
        </div>
      </QueryProvider>
    </NextIntlClientProvider>
  );
}
