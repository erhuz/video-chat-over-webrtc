import React from 'react'
import Peer from 'simple-peer'
import io from 'socket.io-client'

const Initiator = () => {
    const peer = new Peer({ initiator: true });
    const socket = io('http://localhost:3001/');
    let offer = null;

    console.log(peer);
    console.log('Initiator application initialized');
    socket.emit('initiator registration', {});

    peer.on('signal', data => {
        if(data.type === 'offer'){
            console.log('offer generated');
            offer = data;
        }
    });

    socket.on('answer request', (answer) => {
        console.log('p2p answer recieved');
        peer.signal(answer);
    });

    peer.on('connect', () => {
        console.log('Peer connected');
        // wait for 'connect' event before using the data channel
        peer.send('hey receiver, how is it going?')
    });

    peer.on('close', err => {
        console.error(err);
    });
    peer.on('error', err => {
        console.error(err);
    });
      
    const initiateCall = () => {
        console.log('p2p offer');
        
        if(offer !== null){
            console.log(offer);
            socket.emit('p2p offer', offer);
        } else {
            console.log('Initialization failed, no offer');
        }
        
    };
      

    return (
        <div>
            <h1>I am the Initiator</h1>
            <button onClick={initiateCall}>Initiate call</button>

        </div>
    )
}

export default Initiator;