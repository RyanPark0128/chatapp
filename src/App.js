import React from 'react';
import { useState, useRef, useEffect } from 'react';
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
    <div>
      <div id="bg" alt="chat" />
      {user ? <ChatRoom /> : <SignIn />}
    </div>
  );
}

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <div>
      <div className="header">
        <div className="logo">SimplyChat</div>
        <button onClick={signInWithGoogle} className="signin">Sign In</button>
      </div>

      <div className="contents">
        <div className="title">
          Chat, and have fun
        </div>
        <div className="subtitle">
          Simply sign in and start chatting
        </div>
        <div className="google">
          <div>
            <a id="google-button" className="btn btn-outline-dark" onClick={signInWithGoogle} role="button">
              <img width="20px" style={{ backgroundColor: "white", marginBottom: '3px', marginRight: '5px' }} alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
              Sign In with Google
            </a>
          </div>
        </div>
      </div>
    </div>
  )

}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()} className="signin">Sign Out</button>
  )
}


function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt')
  const [messages] = useCollectionData(query, { idField: 'id' });
  const [formValue, setFormValue] = useState('');

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  });

  const sendMessage = async (e) => {
    e.preventDefault();
    if (formValue.length < 1) {
      return
    } else {

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

  }

  return (
    <div>
      <div className="header">
        <div className="logo">SimplyChat</div>
        <SignOut />
      </div>
      <div className="chat-container">

        <div className="chat-room">

          {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

          <span ref={dummy}></span>

        </div>

        <form className="form" onSubmit={sendMessage}>

          <input className="input-text" value={formValue} onChange={(e) => setFormValue(e.target.value)} />
          <button className="submit-button" type="submit" >Send</button>

        </form>
      </div>
    </div>
  )
}


function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<div>
    <div className={`message ${messageClass}`}>
      <img className="messagebox" src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
      <p className="message-text">{text}</p>
    </div>
    </div>
    )
}


export default App;
