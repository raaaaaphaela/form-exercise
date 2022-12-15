import React, {useState} from 'react';
import './App.css';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

type User = {
    firstName: string;
    lastName: string;
    email: string;
    age: number;
}

function App() {

    const initialState = {
        firstName: "",
        lastName: "",
        email: "",
        age: 0
    }
    const [user, setUser] = useState<User>(initialState);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser(initialState);

        const targetName = e.target.name;
        const targetValue = e.target.value;

        setUser({
            ...user,
            [targetName]: targetValue
        })
    }
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    const showToastMessage = () => {

        /* check for empty input fields */
        let wrongInput = (user.firstName === "" || user.lastName === "" || user.email === "" || user.age === 0);

        /* set up toast message */
        wrongInput ? toast.error("Felder dürfen nicht leer sein!") : toast.success("Daten erfolgreich übermittelt!") ;

        /* if success -> set input fields to initial state */
        !wrongInput && setUser(initialState);
    }

    return (
        <div className="App">
            <form onSubmit={onSubmit} className="user-form">
                <input type="text" name="firstName" value={user.firstName} onChange={onChange}/>
                <input type="text" name="lastName" value={user.lastName} onChange={onChange}/>
                <input type="email" name="email" value={user.email} onChange={onChange}/>
                <input type="number" name="age" value={user.age} onChange={onChange}/>
                <button type={"submit"} onClick={showToastMessage}>Abschicken</button>
            </form>
            <h2>User:</h2>
            <p>Name: {user.firstName} {user.lastName}</p>
            <p>Email: {user.email}</p>
            <p>Age: {user.age}</p>

            <ToastContainer position={"bottom-center"} hideProgressBar={true}/>
        </div>
    );
}

export default App;
