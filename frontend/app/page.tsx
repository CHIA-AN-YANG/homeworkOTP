"use client";
import OTPForm from './components/otpForm';
import { Provider } from 'react-redux';
import { store } from './store/store';

export default function Home() {
  return (
    <div className="page">
      <h1 className="secondary">Enter Verification</h1>
      <main className="main">
        <Provider store={store}>
          <OTPForm />
        </Provider>
      </main>
    </div>
  );
}
