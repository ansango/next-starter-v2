import type { GetStaticProps, NextPage } from "next";
import PageSeo from "components/seo/PageSeo";

import styles from "styles/Home.module.css";
import tools from "lib/mock/tools";
import { useI18n } from "next-localization";

const Doc: NextPage = () => {
  const { t } = useI18n();
  const tTools = t("tools");
  return (
    <>
      <PageSeo title="Next.js starter" description="A Next.js Starter" />

      <main className={styles.main}>
        <h1 className={styles.title}>{t("title")}</h1>
        <p className={styles.description}>{t("description")}</p>
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

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const language = await import(`../public/locales/${locale}/home.json`);

  return {
    props: {
      lngDict: language.default,
    },
  };
};

export default Doc;
