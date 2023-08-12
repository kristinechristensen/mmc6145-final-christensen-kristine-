import styles from "./style.module.css";
import Link from "next/link";
import useLogout from "../../hooks/useLogout";
import Image from "next/image";
import logo from "../../public/images/logo.png"


//why doesn't the welcome show the user's name when you first sign in?
export default function Header(props) {
  const logout = useLogout();
  return (
    <header className={styles.container}>
      {props.isLoggedIn ? (
        <>
          <p className={styles.logo}><a href="dashboard"><Image src={logo} /></a></p>
          <div>
            <nav className={styles.navigation}>
            <Link href="">Welcome, {props.username}!</Link>
            <Link href="dashboard">Home</Link>
            <Link href="safety">Safety</Link>
            <Link href="" onClick={logout} style={{ cursor: "pointer" }}>Logout</Link>
            </nav>
          </div>
        </>
      ) : (
        <>
       <p className={styles.logo}><a href="/"><Image src={logo} style={{}} /></a></p>
        <nav className={styles.navigation}>
          <p>
            <Link href="/">Home</Link>
            <Link href="/login">Login</Link>
          </p>
          </nav>
        </>
      )}
    </header>
  );
}



