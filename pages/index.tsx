import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Cosmos Utilities</title>
        <meta name="description" content="A series of utilities for working with cosmos networks!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Cosmos Utilities
        </h1>

        <div className={styles.grid}>
          <Link href="/address" className={styles.card}>
            <h2>Address Converter</h2>
            <p>Convert between bech32/hex addresses.</p>
          </Link>
          <Link href="/gov" className={styles.card}>
            <h2>Governance Post</h2>
            <p>A markdown editor for creating governance posts.</p>
          </Link>
          <Link href="/jackalkeplr" className={styles.card}>
            <h2>Jackal Keplr</h2>
            <p>Adding Jackal to Keplr.</p>
          </Link>
          <Link href="/terraibc" className={styles.card}>
            <h2>Terra Keplr</h2>
            <p>Adding Terra 2 to Keplr for IBC transfers.</p>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        Jackal Labs 2022
      </footer>
    </div>
  )
}
