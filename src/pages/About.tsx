import Link from '../Link';
import { RoutedPageProps } from '../Router';

const i18n = {
  en: {
    title: 'About',
    description:
      'This is dev inc. the company behind the great My React Router component.',
    link: 'Go to /home',
  },
  es: {
    title: 'Acerca de',
    description:
      'Esta es dev inc. la compañía detrás del gran componente My React Router.',
    link: 'Ir a /home',
  },
};

type LangKey = keyof typeof i18n;

const isLangKey = (key: string): key is LangKey => {
  return Object.keys(i18n).includes(key);
};

const useI18n = (langKey: string) => {
  if (isLangKey(langKey)) {
    return i18n[langKey];
  }
  return i18n.en;
};

export default function AboutPage({ routeParams: { lang } }: RoutedPageProps) {
  const i18n = useI18n(lang);
  return (
    <>
      <h1>{i18n.title}</h1>
      <p>{i18n.description}</p>
      <Link href="/">{i18n.link}</Link>
    </>
  );
}
