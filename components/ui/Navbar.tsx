import { useRouter } from "next/router";
import styles from "styles/components/ui/Navbar.module.css";
import Link from "next/link";
import { namespace } from "public/locales/namespace";

const Navbar = () => {
  const { asPath, locale, locales, defaultLocale } = useRouter();

  const langs = locales
    ?.map((loc: string) => {
      const { flag }: any = namespace[loc];

      return {
        route: defaultLocale !== loc ? `/${loc}${asPath}` : asPath,
        loc,
        flag,
      };
    })
    .filter(({ loc }) => loc !== locale);

  return (
    <header className={styles.navbar}>
      <div></div>
      <ul>
        {langs?.map(({ route, loc, flag }) => (
          <Link key={route} href={route} locale={loc}>
            {flag}
          </Link>
        ))}
      </ul>
    </header>
  );
};

export default Navbar;
