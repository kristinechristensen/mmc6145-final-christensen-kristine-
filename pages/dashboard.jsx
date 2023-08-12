import Head from "next/head";
import Image from "next/image";
import bags from "../public/images/bags.jpg";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";
import Header from "../components/header";
import Footer from "../components/footer/"
import useLogout from "../hooks/useLogout";
import Hero from "../components/hero"

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    const props = {};
    if (user) {
      props.user = req.session.user;
      props.isLoggedIn = true;
    } else {
      props.isLoggedIn = false;
    }
    return { props };
  },
  sessionOptions
);

export default function Dashboard(props) {
  const router = useRouter();
  const logout = useLogout();
  return (
    <div className={styles.container}>
      <Head>
      <title>Destination Discovery: Welcome!</title>
        <meta name="description" content="Welcome" />
        <link rel="icon" href="/favIcon.png" />
      </Head>

      <Header isLoggedIn={props.isLoggedIn} username={props.user.username} />
      <Hero />
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Destination Discovery!
        </h1>
        
        <div className={styles.welcomeSection}>
       <div className={styles.left}>
        <p>Embark on a world of discovery and adventure with us. Whether you're an avid explorer or a first-time traveler, we're here to guide you on unforgettable journeys. Our platform is your gateway to immersive destinations, expert travel tips, and curated experiences. Discover the world's hidden gems, unravel local secrets, and create memories that last a lifetime. Join our global community of wanderers and let's make every step of your journey truly remarkable. <strong>Your next adventure starts here!</strong></p>


        <Link className={styles.btn} href="/safety">Travel Safely</Link>

        </div>
        <div className={styles.right}>
        <Image src={bags} alt="Get Moving On Your Adventure!" width="600" height="300" />
        </div>
      </div>

        <h2 className={styles.title2}>What are You Waiting For?  Your Journeys Await!</h2>
       
      </main>

      <Footer />
        
     
      
    </div>
  );
}
