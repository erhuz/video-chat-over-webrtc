import React, { useState } from "react";
import {Initiator, Receiver} from '../../clients';

const App = () => {
    const [isReady, setIsReady] = useState(false);
    const [isInitiator, setIsInitiator] = useState(false);

    const loadInitatorClient = () => {
        setIsReady(true);
        setIsInitiator(true);
    };

    const loadRecieverClient = () => {
        setIsReady(true);
        setIsInitiator(false);
    };


    if(isReady){
        if(isInitiator){
            // Load initiator client
            return <Initiator/>
        } else {
            // Load receiver client
            return <Receiver/>
        }
    } else {
        return (
            <div>
                <h1>Client selection</h1>
                <p>Are you an initiator or receiver?</p>
                <button onClick={loadInitatorClient}>Initiator</button>
                <button onClick={loadRecieverClient}>Receiver</button>
            </div>
        )
    }



    
}

export default App;