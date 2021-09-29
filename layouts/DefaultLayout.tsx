import type { ReactElement } from "react";
import { NextComponentType } from "next";

import Navbar from "components/ui/Navbar";
import Footer from "components/ui/Footer";
import { ContainerLayout } from "components/ui/containers";

import styles from "styles/layouts/DefaultLayout.module.css";

type Layout = {
  children: ReactElement;
};

const DefaultLayout: NextComponentType<Layout> = ({ children }) => {
  return (
    <ContainerLayout>
      <Navbar />
      <main className={styles.container}>{children}</main>
      <Footer />
    </ContainerLayout>
  );
};

export default DefaultLayout;
