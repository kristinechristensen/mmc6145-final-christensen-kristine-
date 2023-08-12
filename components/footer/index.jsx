import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.center}>
      &#169; Destination Discovery | Just Travel: Meeting the World Everyday! <a href="mailto:webmaster@dd.com">Email the Web Master </a>
      </p>
    </footer>
  );
}
