"use client";

import React, { useState, useRef, ChangeEvent, useEffect } from 'react';
import { getAuth } from '../store/features/user/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store/store';
import { selectError, selectStatus } from '../store/features/user/selectors/authSelectors';
import { useRouter } from 'next/navigation';
import { EntityStatus } from '../model/model';
interface CustomInput {
  val: string;
  disabled: boolean;
  focus: boolean
}
const defaultInputs: CustomInput[] = [
  { val: '', disabled: false, focus: true },
  { val: '', disabled: true, focus: false },
  { val: '', disabled: true, focus: false },
  { val: '', disabled: true, focus: false }
];

const OTPForm: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [inputs, setInputs] = useState<CustomInput[]>(defaultInputs);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector(selectStatus) as string;
  const apiErrorMsg = useSelector(selectError) as string;
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const focusIndex = inputs.findIndex(element => element.focus);
    inputRefs.current[focusIndex]?.focus();
  }, [inputs]);

  useEffect(() => {
    if (status === EntityStatus.SUCCESS) {
      router.push('/profile');
    }
  }, [status, router]);

  useEffect(() => {
    if (apiErrorMsg && apiErrorMsg.includes('401')) {
      setErrorMessage("The code you enter is not valid.");
    }
  }, [apiErrorMsg]);

  const handleChange = (index: number, event: ChangeEvent) => {
    if (inputs.every(element => element.val !== '')) {
      try {
        const code = inputs.map(el => Number(el.val)).filter(num => !isNaN(num)).join('');
        submitCode(event, code);
      } catch (error: unknown) {
        setErrorMessage('Input values should be numbers.');
        return error;
      }
    }
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    const isNumber = /^[0-9]{1}$/.test(event.key);
    let newInputs = JSON.parse(JSON.stringify(inputs)) as CustomInput[];
    let focusIndex = index;
    // set value
    if (isNumber) {
      if (newInputs[index]) {
        newInputs[index].val = event.key;
      }
    }
    if (event.key === 'Backspace') {
      newInputs[index].val = '';
    }
    // check disabled
    newInputs.forEach((element, i) => {
      element.disabled = (i > 0 && newInputs[i - 1].val === '');
      if (!element.disabled && i > 0) {
        newInputs[i - 1].disabled = false;
      }
    });
    // set focus
    if (((event.key === 'ArrowRight') || isNumber) && index < newInputs.length - 1) {
      focusIndex++;
      newInputs = setInputFocus(newInputs, focusIndex);
    }
    if ((event.key === 'ArrowLeft') || (event.key === 'Backspace') && index > 0) {
      focusIndex--;
      newInputs = setInputFocus(newInputs, focusIndex);
    }
    setInputs(newInputs);

  };

  const handlePaste = (e: React.ClipboardEvent, index: number) => {
    const paste = e.clipboardData.getData('text');
    const pasteArr = paste.split('');
    let newInputs = JSON.parse(JSON.stringify(inputs)) as CustomInput[];
    let focusIndex = index;
    newInputs.forEach((element, i) => {
      if (pasteArr[i]) {
        element.val = pasteArr[i];
      }
      element.disabled = (i > 0 && newInputs[i - 1].val === '');
    });
    focusIndex = pasteArr.length - 1;
    newInputs = setInputFocus(newInputs, focusIndex);
    setInputs(newInputs);
  };

  const submitCode = async (event: React.FormEvent, code: string) => {
    dispatch(getAuth(code));
  };

  const setInputFocus = (prevInputs: CustomInput[], index: number) => {
    const nextInputs = [...prevInputs];
    if (nextInputs[index].disabled !== true) {
      nextInputs.forEach((element, i) => { element.focus = (i === index); });
    }
    return nextInputs;
  };

  if (status === EntityStatus.LOADING || status === EntityStatus.SUCCESS) {
    return (
      <>
        <div className="loader"></div>
        <p className="loading-msg">{
          (status === EntityStatus.LOADING) ? `${EntityStatus.LOADING}...` : "code authenticated..."
        }</p>
      </>);
  }

  if (!isClient) return null;

  return (
    <div>
      {inputs.map((data, index) => (
        <input
          key={index}
          ref={(el) => { inputRefs.current[index] = el }}
          type="text"
          value={data.val}
          autoFocus={data.focus}
          disabled={data.disabled}
          onChange={(event) => handleChange(index, event)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={(e) => handlePaste(e, index)}
          style={{ width: '50px', height: '100px', margin: '5px' }}
        />
      ))}
      <p className='error-msg'>{errorMessage || apiErrorMsg}</p>
    </div>
  );
};

export default OTPForm;