import { siteMetadata } from "data/siteMetadata";
import styles from "styles/components/ui/Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <span>{siteMetadata.author}</span>
      <span>-</span>
      <span>{currentYear}©️</span>
    </footer>
  );
};

export default Footer;
