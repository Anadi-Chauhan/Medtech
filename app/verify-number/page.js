"use client"; // Ensure this is a Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Correctly imported from next/navigation
import { toast } from 'react-toastify';

const VerifyNumber = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter(); // Use the router from next/navigation

  const handleVerify = () => {
    // Example verification logic
    if (!phoneNumber) {
      toast.error("Phone number is required");
    } else {
      // Navigate after successful verification
      toast.success("Verification successful");
      router.push("/"); // Use router.push to navigate
    }
  };

  return (
    <div>
      <h1>Verify Your Number</h1>
      <input 
        type="text" 
        value={phoneNumber} 
        onChange={(e) => setPhoneNumber(e.target.value)} 
        placeholder="Enter your phone number" 
      />
      <button onClick={handleVerify}>Verify</button>
    </div>
  );
};

export default VerifyNumber;
