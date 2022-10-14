import Head from 'next/head';

import styles from '@/pages/index.module.css'
import Pokedex from '@/components/Pokedex';
import Hero from '@/components/Hero';

export default function Home() {
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokedex</title>
        <link rel="icon" href="/favicon.ico" />
        {/* <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        /> */}
      </Head>
      <>
        <Hero />
        <Pokedex />
      </>
    </div>
  )
}
