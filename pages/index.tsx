import type { NextPage } from "next";
import PageSeo from "components/seo/PageSeo";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import styles from "styles/Home.module.css";
import tools from "lib/mock/tools";

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["home"])),
    },
  };
}

const Home: NextPage = () => {
  const { t } = useTranslation();
  const tTools: any = t("home:tools", { returnObjects: true });
  return (
    <>
      <PageSeo title="Next.js starter" description="A Next.js Starter" />
      <></>

      <main className={styles.main}>
        <h1 className={styles.title}>{t("home:title")}</h1>
        <p className={styles.description}>{t("home:description")}</p>
        <ul className={styles.grid}>
          {tools.map((tool: any) => {
            return (
              <li key={tool.name} className={styles.card}>
                <a href={tool.url}>
                  <h2>{tool.name}</h2>
                  <p>{tTools[tool.key]}</p>
                </a>
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
};

export default Home;
