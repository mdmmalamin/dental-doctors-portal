import React, { useState } from "react";
 
const containerStyle = {
    maxWidth: "400px",
    margin: "1rem",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px 0px grey",
};
 
const inputContainerStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
};
 
const labelStyle = {
    flex: "1",
};
 
const inputStyle = {
    padding: "5px",
    border: "1px solid #ccc",
    borderRadius: "3px",
};
 
const checkboxContainerStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "5px",
};
 
const buttonStyle = {
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.2s ease-in-out",
};
 
const copyButtonStyle = {
    marginLeft: "10px",
};
 
const PasswordGenerator = () => {
    const [password, setPassword] = useState("");
    const [passwordLength, setPasswordLength] = useState(12);
    const [useSymbols, setUseSymbols] = useState(true);
    const [useNumbers, setUseNumbers] = useState(true);
    const [useLowerCase, setUseLowerCase] = useState(true);
    const [useUpperCase, setUseUpperCase] = useState(true);
    const [successMessage, setSuccessMessage] = useState("");
 
      const generatePassword =()=> {
        let charset = "";
        let newPassword = "";
 
        if (useSymbols) charset += "!@#$%^&*()";
        if (useNumbers) charset += "0123456789";
        if (useLowerCase) charset += "abcdefghijklmnopqrstuvwxyz";
        if (useUpperCase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
 
        for (let i = 0; i < passwordLength; i++) {
            newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
        }
 
        setPassword(newPassword);
    };
 
     const copyToClipboard = () => {
        const el = document.createElement("textarea");
        el.value = password;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        setSuccessMessage("Password copied to clipboard!");
        setTimeout(() => setSuccessMessage(""), 2000);
        // Hide message after 2 seconds
    };
 
    return (
        <div style={containerStyle}>
            <h1
                style={{
                    color: "green",
                    textAlign: "center",
                }}
            >
                Geeksforgeeks
            </h1>
            <h3 style={{ textAlign: "center" }}>Random Password Generator</h3>
            <div style={inputContainerStyle}>
                <label style={labelStyle}>Password Length:</label>
                <input
                    type="number"
                    min="8"
                    max="32"
                    value={passwordLength}
                    onChange={(e) => setPasswordLength(e.target.value)}
                    style={inputStyle}
                />
            </div>
            <div className="flex flex-col" style={checkboxContainerStyle}>
                <label>
                    <input
                        type="checkbox"
                        checked={useSymbols}
                        onChange={() => setUseSymbols(!useSymbols)}
                    />
                    Symbols
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={useNumbers}
                        onChange={() => setUseNumbers(!useNumbers)}
                    />
                    Numbers
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={useLowerCase}
                        onChange={() => setUseLowerCase(!useLowerCase)}
                    />
                    LowerCase
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={useUpperCase}
                        onChange={() => setUseUpperCase(!useUpperCase)}
                    />
                    UpperCase
                </label>
            </div>
            <div  className="flex justify-center items-center">
            <button style={buttonStyle} onClick={generatePassword}>
                Generate Password
            </button>
            </div>
            {password && (
                <div style={inputContainerStyle}>
                    <label style={labelStyle}>Generated Password:</label>
                    <input type="text" value={password} readOnly style={inputStyle} />
                    <button
                        style={{
                            ...buttonStyle,
                            ...copyButtonStyle,
                        }}
                        onClick={copyToClipboard}
                    >
                        Copy
                    </button>
                </div>
            )}
            {successMessage && (
                <p
                    style={{
                        color: "green",
                        textAlign: "center",
                    }}
                >
                    {successMessage}
                </p>
            )}
        </div>
    );
};
 
export default PasswordGenerator;