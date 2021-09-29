import { useRouter } from "next/router";
import styles from "styles/components/ui/Navbar.module.css";

const Navbar = () => {
  const { locales, locale } = useRouter();
  const localesList = locales?.filter((loc) => loc !== locale);
  return (
    <header className={styles.navbar}>
      <div></div>
      <ul>
        {localesList?.map((loc) => (
          <li key={loc}>
            <a href={`/${loc}`}>{loc}</a>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Navbar;
