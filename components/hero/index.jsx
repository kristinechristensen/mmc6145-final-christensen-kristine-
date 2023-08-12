import styles from "./style.module.css";
import beach from "../../public/images/hiking2.jpg";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.image}    style={{
            backgroundImage: `url(${beach.src})`,
            width:'100%',
            height:'250px',
          }}>
        
      </div>
    </section>
  );
}
