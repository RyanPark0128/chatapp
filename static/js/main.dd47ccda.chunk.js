(this.webpackJsonpchatapp=this.webpackJsonpchatapp||[]).push([[0],{28:function(e,t,a){},29:function(e,t,a){"use strict";a.r(t);var c=a(2),s=a(4),n=a.n(s),r=a(13),i=a.n(r),o=a(12),d=a.n(o),l=a(14),u=a(9),j=a(8),p=(a(23),a(26),a(28),a(15)),b=a(16);j.a.initializeApp({apiKey:"AIzaSyDMt1FTJpotoKCZmeZEvKIz1FRUfMDfR4Q",authDomain:"chatapp-8588d.firebaseapp.com",databaseURL:"https://chatapp-8588d.firebaseio.com",projectId:"chatapp-8588d",storageBucket:"chatapp-8588d.appspot.com",messagingSenderId:"40495559035",appId:"1:40495559035:web:32f4200f0473b22326cdde",measurementId:"G-0JX7M6Z06V"});var h=j.a.auth(),m=j.a.firestore();function x(){return Object(c.jsxs)("div",{className:"background",children:[Object(c.jsx)("img",{src:"https://cdn.iconscout.com/icon/free/png-512/chatbox-457904.png",alt:"chat"}),Object(c.jsx)("h1",{children:" Simple Chat App"}),Object(c.jsx)("div",{children:Object(c.jsxs)("a",{class:"btn btn-outline-dark",onClick:function(){var e=new j.a.auth.GoogleAuthProvider;h.signInWithPopup(e)},role:"button",style:{textTransform:"none"},children:[Object(c.jsx)("img",{width:"20px",style:{marginBottom:"3px",marginRight:"5px"},alt:"Google sign-in",src:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"}),"Login with Google"]})})]})}function O(){return h.currentUser&&Object(c.jsx)("div",{className:"signout",children:Object(c.jsx)("button",{onClick:function(){return h.signOut()},tabindex:"0",className:"ui inverted basic button",children:"Sign Out"})})}function g(){var e=Object(s.useRef)(),t=m.collection("messages"),a=t.orderBy("createdAt"),n=Object(b.a)(a,{idField:"id"}),r=Object(u.a)(n,1)[0],i=Object(s.useState)(""),o=Object(u.a)(i,2),p=o[0],x=o[1],g=function(){var a=Object(l.a)(d.a.mark((function a(c){var s,n,r;return d.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return c.preventDefault(),s=h.currentUser,n=s.uid,r=s.photoURL,a.next=4,t.add({text:p,createdAt:j.a.firestore.FieldValue.serverTimestamp(),uid:n,photoURL:r});case 4:x(""),e.current.scrollIntoView({behavior:"smooth"});case 6:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}();return Object(c.jsxs)("div",{className:"chatroom",children:[Object(c.jsx)("header",{className:"header",children:Object(c.jsxs)("div",{className:"header-container",children:[Object(c.jsx)("p",{className:"title",children:"SimpleChatApp"}),Object(c.jsx)(O,{})]})}),Object(c.jsx)("div",{className:"fill"}),Object(c.jsxs)("main",{className:"content",children:[r&&r.map((function(e){return Object(c.jsx)(v,{message:e},e.id)})),Object(c.jsx)("span",{ref:e})]}),Object(c.jsxs)("form",{onSubmit:g,children:[Object(c.jsx)("input",{value:p,onChange:function(e){return x(e.target.value)}}),Object(c.jsx)("button",{style:{width:"5%",borderRadius:"0px"},className:"ui yellow button",type:"submit",children:"Send"})]}),Object(c.jsx)("div",{className:"bottomFill"})]})}function v(e){var t=e.message,a=t.text,s=t.uid,n=t.photoURL,r=s===h.currentUser.uid?"sent":"received";return Object(c.jsx)("div",{className:"message-container",children:Object(c.jsxs)("div",{className:"message ".concat(r),children:[Object(c.jsx)("img",{className:"messagebox",src:n||"https://api.adorable.io/avatars/23/abott@adorable.png"}),Object(c.jsx)("p",{children:a})]})})}var f=function(){var e=Object(p.a)(h),t=Object(u.a)(e,1)[0];return Object(c.jsx)("div",{className:"backgroundColor",children:Object(c.jsx)("div",{children:t?Object(c.jsx)(g,{}):Object(c.jsx)(x,{})})})};i.a.render(Object(c.jsx)(n.a.StrictMode,{children:Object(c.jsx)(f,{})}),document.getElementById("root"))}},[[29,1,2]]]);
//# sourceMappingURL=main.dd47ccda.chunk.js.map