import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import styles2 from "../styles/Form.module.css";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";
import Header from "../components/header";
import Footer from "../components/footer";
import useLogout from "../hooks/useLogout";
import Hero from "../components/hero";
import {TravelBlog} from "../db/models/blog"




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




export default function Safety(props) {
  const router = useRouter();
  const logout = useLogout();

  //post content from form below to mongo... 

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const location = document.getElementById('location').value;
    const memory = document.getElementById('story').value;
    const date = document.getElementById('date').value;

    try {
      const pushtoMongo = await TravelBlog(location,memory,date);
      console.log(pushtoMongo)

    }
    catch(err){
      console.log("didn't work!! ")
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Destination Discovery: Blog About It!</title>
        <meta name="description" content="Destination Discovery" />
        <link rel="icon" href="/favIcon.png" />
      </Head>

      <Header isLoggedIn={props.isLoggedIn} username={props.user.username} />
      <Hero />
      <main className={styles.main}>
        <h1 className={styles.title}>Blog About Your Travels!</h1>

        <div className={styles.welcomeSection}>
          
          <p>
            Explore Beyond Boundaries: Discover the Latest Travel News for Your
            Destination! Dive into a world of information as you search for
            up-to-the-minute news on your dream travel spot. Our intuitive
            search control ensures you are always in the know, whether you are
            seeking travel advisories, local events, or insider tips. Start your
            journey now and stay connected to the pulse of your next adventure!
          </p>
          
          <form onSubmit={onSubmitHandler} className={styles2.form}>
          <div className={styles2.input}>
           <label htmlFor='location'>I traveled to:</label>
           <input type='text' required id='location' />
           </div>
           <div className={styles2.input}>
           <label htmlFor='story'>I want to remember: </label>
           <textarea required id='story' rows="5"></textarea>
           </div>
           <div className={styles2.input}>
           <label htmlFor='date'>Date I traveled:</label>
           <input type='date' required id='date' />
           </div>
          <button className={styles.btn}> Submit My Memory </button> 


          </form>
        </div>

        <h2 className={styles.title3}>
        Roaming Recollections: Travel Blogging for Lifelong Memories

        </h2>
      </main>

      <Footer />
    </div>
  );
}
