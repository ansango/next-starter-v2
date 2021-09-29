import { NextComponentType } from "next";
import { ReactElement } from "react";
import styles from "styles/components/ui/containers/ContainerLayout.module.css";
type Container = {
  children: ReactElement;
};
const ContainerLayout: NextComponentType<Container> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default ContainerLayout;
