import {useRef, useState} from "react";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/NavBar";
import Image from "next/image";
import { ControlGroup } from "../components/UI/FormControlGroup";
import { Button } from "../components/UI/Button";
import SearchBar from "../components/UI/SearchBar";
import { AiOutlineArrowRight } from "react-icons/ai";
import { HiOutlineDesktopComputer, HiViewGridAdd, HiOutlineCode } from "react-icons/hi";
import GridMain from "../components/GridMain";
import GridItem from "../components/UI/GridItem";
import HeroGraphic from "../img/hero.svg";
import Blog1 from "../img/blog1.jpg";
import Blog2 from "../img/blog2.jpg";
import Blog3 from "../img/blog3.jpg";
import Blog4 from "../img/blog4.jpg";
import Blog5 from "../img/blog5.png";
import Blog6 from "../img/blog6.jpg";
import theme_Osaka from "../img/themes-osaka.jpg"
import theme_sacramento from "../img/themes-sacramento.jpg"
import theme_florida from "../img/themes-florida.jpg"
import theme_illinois from "../img/themes-illinois.jpg"
import theme_texas from "../img/themes-texas.jpeg"
import theme_toronto from "../img/themes-toronto.jpg"
import theme_toronto2 from "../img/themes-toronto-2.jpg"
import theme_tokyo from "../img/themes-tokyo.jpg"
import image_localization from "../img/globe.png";
import image_money from "../img/money.png";
import image_creditCards from "../img/credit-cards.png";
import Footer from "../components/Footer";

const Home = () => {
 
  return (<>
    <div className="landing hero">
      <div className="container">
        <Navbar />
        <div className="hero">
          <div className="heroMain">
            <h1 className="heroMainHeading">
              Lorem, Ipsum 
              <br/>
              <span>BinaryBlog.</span>
              <br/>
              Blog About Anything
            </h1>
            <h3 className="heroMainSubText">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, repellat quidem.
            </h3>
            <ControlGroup type={"email"} placeholder={"Enter Your email"} id={"heroEmailInput"} className={"heroMainInput"} />
            <Link passHref href={"/register"}>
              <Button id={"heroMainSignUpButton"} className={"heroMainSignUp"} btnText={"Sign Up"} icon={<AiOutlineArrowRight className={"innerIcon"} size={"25"}/>}/> 
            </Link>
          </div>
          <div className="heroGraphicWrapper">
            <Image
              className={"heroGraphic"}
              src={HeroGraphic}
              alt='hero graphic'
              width={700}
              height={700}
            />
          </div>
        </div>
      </div> 
    </div>
    <section className="highlights">
      <div className="container">
        <GridMain>
          <GridItem icon={<HiOutlineDesktopComputer className={"gridItemIcon"} size={"30"} />}>
            <h2 className="gridItemHeading">Blogs For Everyone</h2>
            <p className="gridItemText">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
          </GridItem>            
          <GridItem icon={<HiViewGridAdd className={"gridItemIcon"} size={30} />}>
            <h2 className="gridItemHeading">Get Inspired</h2>
            <p className="gridItemText">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
          </GridItem>            
          <GridItem icon={<HiOutlineCode className={"gridItemIcon"} size={30} />} >
            <h2 className="gridItemHeading">Developers Guide</h2>
            <p className="gridItemText">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
          </GridItem>            
        </GridMain>
      </div>
    </section>
    <section className="topBlogs">
      <h1 className="landingHeading">Top Blogs</h1>
      <h2 className="landingSubHeading">Read the Best blogs From around The world.</h2>
      <div className="container">
        <GridMain >
          <GridItem >
            <Image className="gridItemImage"  width={"550px"} height={"400px"} src={Blog1} alt={""} />
            <h2 className="gridItemHeading">Theme</h2>
            <p className="gridItemDescription">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Vel nemo eaque deserunt vitae voluptates.
            </p>
            {/*GridItemLink */}
          </GridItem>
          <GridItem >
            <Image className="gridItemImage"  width={"550px"} height={"650px"} src={Blog2} alt={""} />
            <h2 className="gridItemHeading">Theme</h2>
            <p className="gridItemDescription">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Vel nemo eaque deserunt vitae voluptates.
            </p>
            {/*GridItemLink */}
          </GridItem>
          <GridItem >
            <Image className="gridItemImage"  width={"550px"} height={"400px"} src={Blog3} alt={""} />
            <h2 className="gridItemHeading">Theme</h2>
            <p className="gridItemDescription">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Vel nemo eaque deserunt vitae voluptates.
            </p>
            {/*GridItemLink */}
          </GridItem>
          <GridItem >
            <Image className="gridItemImage" width={"550px"} height={"650px"} src={Blog4} alt={""} />
            <h2 className="gridItemHeading">Theme</h2>
            <p className="gridItemDescription">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Vel nemo eaque deserunt vitae voluptates.
            </p>
            {/*GridItemLink */}
          </GridItem>
          <GridItem >
            <Image className="gridItemImage" width={"550px"} height={"400px"} src={Blog5} alt={""} />
            <h2 className="gridItemHeading">Theme</h2>
            <p className="gridItemDescription">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Vel nemo eaque deserunt vitae voluptates.
            </p>
            {/*GridItemLink */}
          </GridItem>
          <GridItem >
            <Image className="gridItemImage" width={"550px"} height={"650px"} src={Blog6} alt={""} />
            <h2 className="gridItemHeading">Theme</h2>
            <p className="gridItemDescription">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Vel nemo eaque deserunt vitae voluptates.
            </p>
            {/*GridItemLink */}
          </GridItem>
        </GridMain>
      </div>
    </section>
    <section className="themes">
      <h1 className="landingHeading">Themes</h1>
      <h2 className="landingSubHeading">Try Our Recommented Themes to Customize Your Blog.</h2>
      <div className="container">
        <GridMain>
          <GridItem >
            <Image className="gridItemImage" width={"300px"} height={"300px"} src={theme_Osaka} alt={""} />
            <h2 className="gridItemHeading">Theme : Osaka </h2>
            {/*GridItemLink */}
          </GridItem>
          <GridItem >
            <Image className="gridItemImage" width={"300px"} height={"300px"} src={theme_florida} alt={""} />
            <h2 className="gridItemHeading">Theme : Floria </h2>
            {/*GridItemLink */}
          </GridItem>
          <GridItem >
            <Image className="gridItemImage" width={"300px"} height={"300px"} src={theme_illinois} alt={""} />
            <h2 className="gridItemHeading">Theme : Illinois </h2>
            {/*GridItemLink */}
          </GridItem>
          <GridItem>
            <Image className="gridItemImage" width={"300px"} height={"300px"} src={theme_texas} alt={""} />
            <h2 className="gridItemHeading">Theme : Texas </h2>
            {/*GridItemLink */}
          </GridItem>
          <GridItem>
            <Image className="gridItemImage" width={"300px"} height={"300px"} src={theme_tokyo} alt={""} />
            <h2 className="gridItemHeading">Theme : Tokyo </h2>
            {/*GridItemLink */}
          </GridItem>
          <GridItem>
            <Image className="gridItemImage" width={"300px"} height={"300px"} src={theme_sacramento} alt={""} />
            <h2 className="gridItemHeading">Theme : Sacramento </h2>
            {/*GridItemLink */}
          </GridItem>
          <GridItem >
            <Image className="gridItemImage" width={"300px"} height={"300px"} src={theme_toronto2} alt={""} />
            <h2 className="gridItemHeading">Theme : Toronto 2 </h2>
            {/*GridItemLink */}
          </GridItem>
          <GridItem>
            <Image className="gridItemImage" width={"300px"} height={"300px"} src={theme_Osaka} alt={""} />
            <h2 className="gridItemHeading">Theme : Osaka </h2>
            {/*GridItemLink */}
          </GridItem>
        </GridMain>
        <Button className={"landingBtn"} btnText={"Start Your Free Trial"}/>
      </div>
    </section>
    <section id="active-register-theme" className="active_reg">
      <h1 className="landingHeading">Activate Your Themes</h1>
      <h2 className="landingSubHeading">Begin Increasing Your Reputation to the world today.</h2>
      <div className="container">
        <GridMain>
          <GridItem height={"300px"}>
            <div className="gridItemImageWrapper">
              <Image id="globe" layout={"fill"} className="gridItemImage" width={"100px"} height={"100px"} src={image_localization} alt={""} />
            </div>
            <h2 className="gridItemHeading">Localisation</h2>
            {/*GridItemLink */}
          </GridItem>
          <GridItem height={"300px"}>
            <div className="gridItemImageWrapper">
              <Image id="cash" layout={"fill"} className="gridItemImage" width="100px" height="100px"  src={image_money} alt={""} />
            </div>
            <h2 className="gridItemHeading">Monetization</h2>
            {/*GridItemLink */}
          </GridItem>
          <GridItem height={"300px"}>
            <div className="gridItemImageWrapper">
              <Image id="security" layout={"fill"} className="gridItemImage" width="100px" height="100px" src={image_creditCards} alt={""} />
            </div>
            <h2 className="gridItemHeading">Security</h2>
            {/*GridItemLink */}
          </GridItem>
        </GridMain>
        <Button className={"landingBtn"} btnText={"Start Your Free Trial"}/>
      </div>
    </section>
    <section className="testimonials">
      <h1 className="landingHeading">What They&#39;ve Said</h1>
      <div className="testimonial">
        <h3 className="landingSubHeading">Ali Bravo</h3>
        <h2 className="testimonialText">We have been able to cancel so many other subscriptions since using BinaryBlog. There is no more cross-channel confusion and everyone is much more focused.</h2>
      </div>
      <Button className={"landingBtn"} btnText={"Get Started"}/>
    </section>
    <Footer />
  </>)
}
export default Home;


/* ORIGINAL VERSION
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <h2><Link href="/auth/authTest"><a>Test Auth</a></Link></h2>
        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
*/