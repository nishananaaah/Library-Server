import otpgenerator from "otp-generator";

const generateOtp = () => {
    return otpgenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });
  };
  const storeOtp = (email, otp, otpStore) => {
    return otpStore[email]={
      otp,
      expireAt:Date.now()+5*60*1000
    }
  };
  
  export  {generateOtp,storeOtp}