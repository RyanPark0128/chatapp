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
    <div className="backgroundColor">
      <div>
        {user ? <ChatRoom /> : <SignIn />}
      </div>
    </div>
  );
}

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <div className="background">
      <img className="main-image"src="https://cdn.iconscout.com/icon/free/png-512/chatbox-457904.png" alt="chat" />
      <h1> Simple Chat App</h1>
      <div>
        <a class="btn btn-outline-dark" onClick={signInWithGoogle} role="button" style={{ textTransform: 'none' }}>
          <img width="20px" style={{ marginBottom: '3px', marginRight: '5px' }} alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
          Login with Google
          </a>
      </div>
    </div>
    // <div class="ui animated button" style={{float:'right'}} onClick={signInWithGoogle}>
    //   <div class="visible content">Sign In</div>
    //   <div class="hidden content">
    //     <i class="right arrow icon"></i>
    //   </div>
    // </div>
  )

}

function SignOut() {
  return auth.currentUser && (
    <div className="signout">
      <button onClick={() => auth.signOut()} tabindex="0" className="ui inverted basic button">Sign Out</button>
    </div>
  )
}


function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt')
  const [messages] = useCollectionData(query, { idField: 'id' });
  const [formValue, setFormValue] = useState('');

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
      <div className="chatroom">
        <header className="header">
          <div className="header-container">
            <p className="title">SimpleChatApp</p>
            <SignOut />
          </div>
        </header>
        <div className="fill">

        </div>
        <main className="content">

          {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

          <span ref={dummy}></span>

        </main>

        <form onSubmit={sendMessage}>

          <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
          <button id="sub-button" className="ui yellow button" type="submit" >Send</button>

        </form>
        <div className="bottomFill">

        </div>
      </div>
  )
}


function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<div className="message-container">
    <div className={`message ${messageClass}`}>
      <img className="messagebox" src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
      <p>{text}</p>
    </div>
  </div>)
}


export default App;
