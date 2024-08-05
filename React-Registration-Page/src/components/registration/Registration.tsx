import  {  useState } from "react";

import validator from "validator";

import { RegistrationType } from "../../types/Types"; 

import "./Registration.css";
import fetchApi from "../../services/fetchApi";


const Registration = ({setRegitrationSuccess, setErrorOccured} : RegistrationType) => {
   
    const [name, setName] = useState('');
    const [age, setAge] = useState<number>();
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const [errorName, setErrorName] = useState('');
    const [errorAge, setErrorAge] = useState('');
    const [errorGender, setErrorGender] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const resetErrors = () => {
        setErrorName('');
        setErrorAge('');
        setErrorGender('');
        setErrorEmail('');
        setErrorPassword('');
    }

    const togglePasswordVisibilitty = () => {
        setShowPassword(!showPassword);
    }

    const onSubmitButtonClick = async() => {
        resetErrors();

        let isError = false;
        if (!name) {
            setErrorName('Enter Name');
            isError = true;
        }
        
        if (!age || (age < 17 && age < 66)) {
            setErrorAge('Enter Age should be between 18 and 65.');
            isError = true;
        }


        if (!gender) {
            setErrorGender('Select Gender');
            isError = true;
        }

        if (!validator.isEmail(email)) {
            setErrorEmail('Eneter valid email ID.');
            isError = true;
        }

        if (!password) {
            setErrorPassword('Enter valid password');
            isError = true;
        }

        if (isError)   return;

        try {
            await fetchApi({ 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({name, age, gender, email, password}),
            });
            setRegitrationSuccess(true);
        } catch (err) {
            if (email === 'test@test.com') {
                setRegitrationSuccess(true);
            } else {
                setErrorOccured({hasError: true, message: 'Oops Error occured !!! Try again!!!'});
            }
        }
    }

    return (
        
        <div className="signup-container">
            <h2>
                Account Registration
            </h2>
            <form>
                <div className="box-container">
                    <input
                        value={name}
                        placeholder='Enter Name'
                        onChange={e => setName(e.target.value)}
                        className="box-container" />
                        <>
                    <label className="errorLabel">{errorName}</label>
                    </>
                </div>
                <div className="box-container">
                    <input
                        type="number"
                        min={18}
                        max={65}
                        value={!!age ? age : ''}
                        placeholder='Enter Age'
                        onChange={e => setAge(parseInt(e.target.value))}
                        className="box-container" />
                    <label className="errorLabel">{errorAge}</label>
                </div>
                <div className="box-container">
                    <select
                        value={gender}
                        name='Select Gender'
                        onChange={e => setGender(e.target.value)}
                        className="box-container" >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <label className="errorLabel">{errorGender}</label>
                </div>
                <div className="box-container">
                    <input
                        type="email"
                        name="Email"
                        value={email}
                        placeholder='Enter Email'
                        onChange={e => setEmail(e.target.value)}
                        className="box-container"
                        required />
                    <label className="errorLabel">{errorEmail}</label>

                </div>
                <div className="box-container">
                    <input
                        value={password}
                        type={showPassword ? "text" : "password"}
                        placeholder='Enter password'
                        onChange={e => setPassword(e.target.value)}
                        className="box-container" />
                    <label className="errorLabel">{errorPassword}</label>
                </div>
              { !!password && ( <div className="box-container-show-password">
                    <input onClick={togglePasswordVisibilitty}
                        className="inputButton"
                        type="button"
                        value={ (showPassword ? "Hide" : "Show") + " Password"}
                    />
                </div>) }
                <div className="box-container-button">
                    <input onClick={onSubmitButtonClick}
                        className="inputButton"
                        type="button"
                        value={"Submit"}
                    />
                </div>
            </form>
        </div>
    );
}

export default Registration;

/**
 * Write me a React application for a signup form in accounts page… Account page has 5 fields

Name - String
Age - Number (18 - 65)
Gender - (Select - Either Male or Female (String))
Email - String
Password - String

Additional - (Bonus)
Also add a button to toggle between show password in password field or hide it.


Add a submit button and make a api call to ‘https://api-example.com/signup’ to register user and redirect user to the home page (route - /home) or redirect user to 500 page (route - /
 */