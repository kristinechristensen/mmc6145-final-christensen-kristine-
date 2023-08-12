import Head from "next/head";
import { search } from "../api";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Home.module.css"
import Footer from "../../components/footer";
import Hero from "../../components/hero";
import Header from "../../components/header";


/* Having a hard time with getServerSideProps 
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
*/


export async function getServerSideProps({ params }) {
  const NYT_API_KEY = "9hUvOqGGdnCBvGKg4EB3L7mGdBC8hKKJ";
 // const NYT_API_KEY = process.env.NYT_API_KEY;
  const URL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${params.query}&fq=section_name:("Travel")&api-key=${NYT_API_KEY}`;

  const results = await search(URL);
  return {
    props: {
      results,
      query: params.query,
    },
  };
}

export default function Articles({ results, query }) {
  
/* Note: looking for a way to filter out images that have undefined in the string- currently working on it */
 
  return (
    <div className={styles.container}>
    <Head>
      <title>Destination Discovery: Login</title>
      <link rel="icon" href="/favIcon.png" />
    </Head>
    <Header />
    <Hero />
    <main className={styles.main}>
      <h1>Travel News for Those Traveling to {query.toUpperCase()} </h1>
      <Link href="/safety"> Go back to Safety Page</Link>
      <div className={styles.grid}>

        {results.map((result) => {
          return (
            <p key={result.uri} className={styles.card}>
              <div className={styles.spanImage}><Image src={result.image} width="100" height="100"  /></div>
              <br />
              <Link href={result.url} target="_blank">
                {result.title}
                <br/>
              </Link>
              <p>{result.abstract} </p>
            </p>

            
          );
        })}
     </div>
    </main>
    <Footer />
    </div>
  );
}
