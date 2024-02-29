import React, { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';

// interface Props {}
let currentOTPIdx = 0;
const OTPInput = () => {
  const [otp, setOTP] = useState(new Array(6).fill(''));
  const [activeOTPIdx, setActiveOTPIdx] = useState(0);

  const inputRef = useRef(null);

  // SignIn with Phone Number Start
  const { recaptcha, signInPhone } = useContext(AuthContext);
  const [phone, setPhone] = useState('');
  // const [OTP, setOtp] = useState('');
  const [logger, setLogger] = useState(null);
  const [showOtp, setShowOtp] = useState(false);

  const sendOtp = async() => {
      try{
          let recaptchaVerifier = await recaptcha('recaptcha', {
              'size': 'invisible',
              'callback': (response) => {
                  // reCAPTCHA solved, allow signInWithPhoneNumber.
                  // onSignInSubmit();
              }
          });
          let confirmation = await signInPhone(phone, recaptchaVerifier);
          console.log(confirmation);
          setLogger(confirmation);
          setShowOtp(true);
      }catch(err){
          console.log(err)
      }
  }

  const verifyOtp = async() => {
      await logger.confirm(otp.toString());
  }


  // SignIn with Phone Number End

  const handleOnChange = ({target}) => {
    const {value} = target;
    const newOTP = [...otp];
    newOTP[currentOTPIdx] = value.substring(value.length -1);

    !value ? setActiveOTPIdx(currentOTPIdx - 1) : setActiveOTPIdx(currentOTPIdx + 1);

    setOTP(newOTP);

    console.log(newOTP)
  };

  const handleOnKeyDown = ({key}, idx) => {
    currentOTPIdx = idx;
    key === 'Backspace' ? setActiveOTPIdx(currentOTPIdx - 1) : <></>;
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOTPIdx]);

  return (
    <div className='h-screen flex justify-center items-center space-x-2'>
      {
        showOtp?
            // Phone Login Start 
            <>
                {/* <input name='otp' type="number" value={otp} onChange={e=> setOtp(e.target.value)} placeholder="OTP" className="input input-bordered w-full" /> */}
                {
                  otp.map((_, idx) => {
                    return (
                      <Fragment key={idx}>
                        <input 
                          ref={idx === activeOTPIdx ? inputRef : null}
                          type='number'
                          className='otp-input'
                          onChange={handleOnChange}
                          onKeyDown={e => handleOnKeyDown(e, idx)}
                          value={otp[idx]}
                        />
                        {idx === otp.length - 1 ? null : (
                          <span className="w-2 py-0.5 bg-accent" />
                        )}
                      </Fragment>
                    )
                  })
                }
                <button className='btn' onClick={verifyOtp}>Confirm OTP</button>
            </>
        : 
            <>
                <input name='phone' type="Phone" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone Number" className="input input-bordered w-full" />
                <button className='btn' onClick={sendOtp}>Send OTP</button>
            </>
      }
      <div id='recaptcha'></div>

      {/* {
        otp.map((_, idx) => {
          return (
            <Fragment key={idx}>
              <input 
                ref={idx === activeOTPIdx ? inputRef : null}
                type='number'
                className='otp-input'
                onChange={handleOnChange}
                onKeyDown={e => handleOnKeyDown(e, idx)}
                value={otp[idx]}
              />
              {idx === otp.length - 1 ? null : (
                <span className="w-2 py-0.5 bg-accent" />
              )}
            </Fragment>
          )
        })
      } */}
    </div>
  );
};

export default OTPInput;