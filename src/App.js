import React from 'react';
import { useState, useRef } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import './App.css';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  // config
  apiKey: "AIzaSyDMt1FTJpotoKCZmeZEvKIz1FRUfMDfR4Q",
  authDomain: "chatapp-8588d.firebaseapp.com",
  databaseURL: "https://chatapp-8588d.firebaseio.com",
  projectId: "chatapp-8588d",
  storageBucket: "chatapp-8588d.appspot.com",
  messagingSenderId: "40495559035",
  appId: "1:40495559035:web:32f4200f0473b22326cdde",
  measurementId: "G-0JX7M6Z06V"
})

const auth = firebase.auth();
const firestore = firebase.firestore();


function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>ChatApp</h1>
        <SignOut />
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>

    </div>
  );
}

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <div class="ui animated button" onClick={signInWithGoogle}>
      <div class="visible content">Sign In</div>
      <div class="hidden content">
        <i class="right arrow icon"></i>
      </div>
    </div>
  )

}

function SignOut() {
  return auth.currentUser && (
    <div class="ui animated button" onClick={() => auth.signOut()} tabindex="0">
      <div class="visible content">Sign Out</div>
      <div class="hidden content">
        <i class="right arrow icon"></i>
      </div>
    </div>
  )
}


function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<div>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

      <button type="submit" disabled={!formValue}>🕊️</button>

    </form>
  </div>)
}


function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
      <p>{text}</p>
    </div>
  </>)
}


export default App;
