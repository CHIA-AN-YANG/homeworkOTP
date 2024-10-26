"use client";

import React, { useState, useRef, ChangeEvent, useEffect } from 'react';
import axios from 'axios';
import { getAuth, verifyCode } from '../api/otp';
import router from 'next/router';
import { get } from 'http';

const OTPForm: React.FC = () => {
  const [inputs, setInputs] = useState<string[]>(['', '', '', '']);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string, e: ChangeEvent) => {
    console.log(e, index);
    // Allow only digits between 0 and 9
    if (/^[0-9]{0,1}$/.test(value)) {
      const newInputs = [...inputs];
      newInputs[index] = value;
      setInputs(newInputs);
    }
  };

  const handleKeyUp = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    const newInputs = [...inputs];
    if (event.key !== 'Backspace' || 'Delete' || 'ArrowLeft' || 'ArrowRight') {
      if (index < inputs.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
      if (index === inputs.length - 1 && newInputs.every(val => val !== '')) {
        submitCode();
      }
    }
  }

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowRight' && index < inputs.length - 1) {
      event.preventDefault();
      inputRefs.current[index + 1]?.focus();
    } else if ((event.key === 'ArrowLeft' || 'Delete') && index > 0) {
      event.preventDefault();
      inputRefs.current[index - 1]?.focus();
    }
  };

  const getInputClass = (index: number) => {
    if (document.activeElement === inputRefs.current[index]) {
      return ' input-focused';
    }
    return '';
  };

  const isInputDisabled = (index: number) => {
    return index > 0 && inputs[index - 1] === '';
  };

  const submitCode = async () => {
    const code = inputs.map(Number).filter(num => !isNaN(num)).join('');

    if (code.length === 4) {
      try {
        const response = await verifyCode(code);
        if (response.status === 200 && response.data.valid === true) {
          const userInformation = await getAuth(response.data.token);
          if (userInformation.status === 200) {
            localStorage.setItem('token', response.data.token);
            router.push('/dashboard');
          }
        }

        console.log(response.data); // Handle success response as needed
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setErrorMessage(error.response.data.message || 'An error occurred');
        } else {
          setErrorMessage('An unexpected error occurred');
        }
      }
    } else {
      alert('Please enter values in all input fields.');
    }
  };


  return (
    <div>
      {inputs.map((inputValue, index) => (
        <input
          key={index}
          type="text"
          value={inputValue}
          ref={el => {
            inputRefs.current[index] = el;
          }}
          onChange={(e) => handleChange(index, e.target.value, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onKeyUp={(e) => handleKeyUp(index, e)}
          maxLength={1}
          style={{ width: '50px', height: '100px', margin: '5px' }}
          disabled={isInputDisabled(index)}
        />
      ))}
      {inputs.map((inputValue, index) => (
        <div
          className={'input-selections' + getInputClass(index)}
        ></div>))}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default OTPForm;