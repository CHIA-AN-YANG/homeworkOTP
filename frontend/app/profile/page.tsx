"use client";
import Image from "next/image";
import styles from "./page.module.css";
import UserProfile from '../components/userProfile';
import { Provider } from 'react-redux';
import { store } from '../store/store';
export default function ProfilePage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>User Profile</h1>
        <Provider store={store}>
          <UserProfile />
        </Provider>
      </main>
    </div>
  );
}