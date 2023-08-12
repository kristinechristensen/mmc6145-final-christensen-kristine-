import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";
import styles from "../styles/Home.module.css";
import Header from "../components/header";
import Footer from "../components/footer";
import Hero from "../components/hero";
import useLogout from "../hooks/useLogout";

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

export default function Home(props) {
  const router = useRouter();
  const logout = useLogout();
  return (
    <div className={styles.container}>
      <Head>
        <title>Destination Discovery: Home</title>
        <link rel="icon" href="/favIcon.png" />
      </Head>

      <Header isLoggedIn={props.isLoggedIn} username={props?.user?.username} className={styles.header} />
      <Hero />
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Destination Discovery
        </h1>
        <p className={styles.section}>
        Embark on a world of discovery and adventure with us. Whether you are an avid explorer or a first-time traveler, we are here to guide you on unforgettable journeys. Our platform is your gateway to immersive destinations, expert travel tips, and curated experiences. Discover the worlds hidden gems, unravel local secrets, and create memories that last a lifetime. Join our global community of wanderers and let us make every step of your journey truly remarkable. <strong>Your next adventure starts here!</strong></p>
                <h2 className={styles.title2}>What are You Waiting For?  Your Journeys Await!</h2>
        <h3 className={styles.title3}><Link href="/">  Start Your Adventure! </Link></h3>
        
        {/* <p className={styles.description}>
          Current Location: <code className={styles.code}>{router.asPath}</code>
          <br />
          Status:{" "}
          <code className={styles.code}>
            {!props.isLoggedIn && " Not"} Logged In
          </code>
        </p> */}

        <div className={styles.grid}>
          {props.isLoggedIn ? (
            <>
              <Link href="/dashboard" className={styles.card}>
                <h2>Welcome to Destination Discovery! </h2>
                <p>This page is only visible if you are logged in.</p>
              </Link>
              <div
                onClick={logout}
                style={{ cursor: "pointer" }}
                className={styles.card}
              >
                <h2>Logout &rarr;</h2>
                <p>Click here to log out.</p>
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className={styles.card}>
                <h2>Login &rarr;</h2>
                <p>Visit the login page.</p>
              </Link>

              <Link href="/signup" className={styles.card}>
                <h2>Create Account &rarr;</h2>
                <p>Create an account.</p>
              </Link>
            </>
          )}
        </div>
      </main>

    <Footer />
    </div>
  );
}
