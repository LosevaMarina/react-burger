
import PropTypes from "prop-types";
import styles from "./page.module.css";

export const Page = (props) => {

  return (
      <section className={styles.content}>
        <div className={styles.page}>
        {props.children}
        </div>
      </section>
  );
};

Page.propTypes = {
  children: PropTypes.element.isRequired,
};
