import React, { useState } from 'react';
import './App.css';
import Person from './Person';

// first letter of var name must be capital
const TheApp = (props) => {
    const [personState, setPersonState] = useState({
        persons: [
            { name: 'Vincent', age: 25 },
            { name: 'Ben', age: 24 },
            { name: 'Shelly', age: 48 }
        ]
    });

    const [otherState, setOtherState] = useState('some other value');

    console.log(personState, otherState, setOtherState);

    const switchNameHandler = () => {
        // Replace the upper state instead of merging with it, 
        // compared with previous class method
        setPersonState({
            persons: [
                { name: 'Zhenyuan', age: 25 },
                { name: 'Ben', age: 24 },
                { name: 'Shelly', age: 47 }
            ]
        })
    }

    return (
        <div className="App">
            <h1>Hi, I'm a React App~</h1>
            <p>This is really working~~</p>
            <button onClick={switchNameHandler}>Switch Name</button>
            <Person name={personState.persons[0].name}
                age={personState.persons[0].age} />
            <Person name={personState.persons[1].name}
                age={personState.persons[1].age}>My hobby: Music</Person>
            <Person name={personState.persons[2].name}
                age={personState.persons[2].age} />
        </div>
    );
}

export default TheApp;
