import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import bags from "../public/images/bags.jpg";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import styles2 from "../styles/Safety.module.css";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";
import Header from "../components/header";
import Footer from "../components/footer";
import useLogout from "../hooks/useLogout";
import Hero from "../components/hero";


//I'm trying to fetch an API call and this is preventing me from doing so - are we only allowed one getServerSideProps call?
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

  /*  Search Travel Articles from the NYT */
  const [query, getQuery] = useState();
  const onChangeHandler = (e) => getSearch(e.target.value);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    router.push(`${search}`);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Destination Discovery: Safety Tips & Tricks</title>
        <meta name="description" content="Destination Discovery" />
        <link rel="icon" href="/favIcon.png" />
      </Head>

      <Header isLoggedIn={props.isLoggedIn} username={props.user.username} />
      <Hero />
      <main className={styles.main}>
        <h1 className={styles.title}>Safety Trips for Travelers</h1>

        <div className={styles.welcomeSection}>
          <div className={styles2.left}>
            <h2 className={styles2.title2b}>It is important to stay safe!</h2>
            <p>
              When it comes to ensuring your safety while traveling, a few
              simple precautions can go a long way. First and foremost, research
              your destination thoroughly before you go. Familiarize yourself
              with local customs, laws, and potential risks. Keep your valuable
              belongings secure by using a money belt or an anti-theft bag. Be
              cautious when sharing personal information with strangers, and
              avoid displaying signs of wealth. Stay in well-reviewed
              accommodations and be aware of your surroundings, especially at
              night. Trust your instincts—if a situation feels uncomfortable,
              remove yourself from it. Stay connected with loved ones by sharing
              your itinerary and checking in regularly. Finally, invest in
              travel insurance to cover unexpected emergencies. By staying
              vigilant, prepared, and informed, you can greatly enhance your
              safety while exploring new horizons.
            </p>
            <ul className={styles2.list}>
              <li>
                Plan Ahead:
                <ul>
                  <li>
                    Research your destination thoroughly, including cultural
                    norms, weather, local customs, and attractions.
                  </li>
                  <li>Create an itinerary to make the most of your time.</li>
                  <li>
                    Check travel advisories and entry requirements for your
                    destination.
                  </li>
                </ul>
              </li>

              <li>
                Pack Smart:
                <ul>
                  <li>
                    Make a packing list to ensure you do not forget important
                    items.
                  </li>
                  <li>
                    Pack versatile clothing suitable for the weather and
                    activities.
                  </li>
                  <li>
                    Roll your clothes to save space and minimize wrinkles.
                  </li>
                  <li>Pack essential medications and a basic first aid kit.</li>
                </ul>
              </li>

              <li>
                Travel Documents:
                <ul>
                  <li>
                    Carry multiple copies of important documents like your
                    passport, ID, visas, and travel insurance.
                  </li>
                  <li>
                    Store digital copies of these documents in a secure cloud
                    storage.
                  </li>
                </ul>
              </li>

              <li>
                Health and Safety:
                <ul>
                  <li>Stay hydrated and carry a reusable water bottle.</li>
                  <li>
                    Use sunscreen and insect repellent to protect your skin.
                  </li>
                  <li>
                    Learn basic phrases in the local language, including
                    emergency phrases.
                  </li>
                  <li>
                    Keep an eye on your belongings and be cautious in crowded
                    areas.
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className={styles2.right}>
            <h2 className={styles2.title2}> Keep Informed!</h2>
            <p>
              Explore Beyond Boundaries: Discover the Latest Travel News for
              Your Destination! Dive into a world of information as you search
              for up-to-the-minute news on your dream travel spot. Our intuitive
              search control ensures you are always in the know, whether you are
              seeking travel advisories, local events, or insider tips. Start
              your journey now and stay connected to the pulse of your next
              adventure!
            </p>
            <h3>
             
              City News Search: Stay Updated on Your Desired Destinations{" "}
            </h3>
            <p> Type in your favorite city, and press enter! </p>
            <form onSubmit={onSubmitHandler}>
              <input
                type="text"
                onChange={onChangeHandler}
                className={styles2.formInput}
              />
              <button className={styles.btn}>  Search </button>
            </form>
          </div>
        </div>

        <h2 className={styles2.title2}>
          Adventures Await: Stay Smart, Stay Safe!
        </h2>
      </main>

      <Footer />
    </div>
  );
}
