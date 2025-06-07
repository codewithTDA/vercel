import React, { useRef, useState } from 'react'

export default function Otp({ length = 6 }) {
    const inputs = useRef([])
    const [otp, setOtp] = useState(new Array(length).fill(''));
    const handleInput = (e, index) => {
        const value = e.target.value.replace(/[^0-9]/g, "")
        e.target.value = value;
        if (value && index < length - 1) {
            inputs.current[index + 1].focus()
        }
    }
    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
            inputs.current[index - 1].focus()
        }

    }
    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, length);
        console.log(pastedData);

        const newOtp = [...otp];
        for (let i = 0; i < pastedData.length; i++) {
            inputs.current[i].value = pastedData[i]
            newOtp[i] = pastedData[i];
        }
        setOtp(newOtp);
        const nextIndex = Math.min(pastedData.length, length - 1);
        inputs.current[nextIndex].focus();
    };
    return (
        <>
            < >
                {
                    Array.from({ length }).map((_, i) => (

                        <input type="text" key={i} style={{ width: "22px", height: "22px", padding: "5px", margin: "7px", color: "purple", borderBlockColor: "green" }} maxLength={1} inputMode='numeric'
                            ref={(el) => { inputs.current[i] = el }}
                            onChange={(e) => handleInput(e, i)}
                            onKeyDown={(e) => handleKeyDown(e, i)}
                            onPaste={handlePaste}
                        />
                    ))
                }
                <h1>snadeep</h1>
            </>
        </>
    )
}
