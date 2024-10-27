"use client";
import Image from "next/image";
import styles from "./page.module.css";
import OTPForm from './components/otpForm';
import { Provider } from 'react-redux';
import { store } from './store/store';

export default function Home() {
  return (
    <div className={styles.page}>
      <h1 className={styles.secondary}>Verification Code</h1>
      <main className={styles.main}>
        <Provider store={store}>
          <OTPForm />
        </Provider>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
      </footer>
    </div>
  );
}
