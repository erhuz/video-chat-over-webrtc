import React, { useEffect, useRef } from 'react'
import Peer from 'simple-peer'
import io from 'socket.io-client'

const Receiver = () => {
    const peer = new Peer({ initiator: false });
    const socket = io('http://localhost:3001/');
    let answer = null;

    console.log('Receiver application initialized');
    socket.emit('receiver registration', {});

    socket.on('offer request', (receivedOffer) => {
        console.log('Offer request received');
        peer.signal(receivedOffer);
    });

    peer.on('signal', (data) => {
        console.log('peer signaling');
        if(data.type === 'answer'){
            answer = data;
        }
    });

    peer.on('connect', () => {
        console.log('Peer connected');
    });

    peer.on('data', data => {
        // got a data channel message
        console.log('Message from peer: $data ');
        console.log('got a message from initiator: ' + data)
    });

    peer.on('close', err => {
        console.error(err);
    });
    peer.on('error', err => {
        console.error(err);
    });

    const answerCall = () => {
        console.log('p2p answer');
        if(answer !== null) {
            console.log(answer);
            socket.emit('p2p answer', answer);
        } else {
            console.log('Answer failed, no signaling');
        }
    };

    return (
        <div>
            <h1>I am the Receiver</h1>
            <button onClick={answerCall}>Answer</button>
        </div>
    )
}

export default Receiver;