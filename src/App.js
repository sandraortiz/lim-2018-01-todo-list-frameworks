import React, { Component } from 'react';
import firebase from './firebase';

class App extends Component {
 constructor(props) {
  super(props);
  this.state = { messages: [] };
}

componentWillMount(){
  firebase.database().ref('posts').orderByKey().on('child_added', snapshot => {
    let message = { text:snapshot.val().text , id: snapshot.keyposts ,  };
    this.setState({ messages: [message].concat(this.state.messages)
    });
   })
}


addMessage(e){
  e.preventDefault();
  // firebase.database().ref('posts').push( this.inputEl.value );
  // this.inputEl.value = '';
  
  const dbRef = firebase.database().ref().child('posts').push().key;
  const record = {
    keyposts : dbRef ,

    text: this.postContent.value,
  }
  const updates = {};
  updates['/posts/' + dbRef] = record;

  return firebase.database().ref().update(updates);
 }
 deleteMessage() {
   
  firebase.database().ref().child(`/posts/${this.postContent.key}`).remove();
 }

 render() {
  return (
   <form onSubmit={this.addMessage.bind(this)}>
    <input type="text" ref={ el => this.postContent = el }/>
    <input type="submit"/>
    <ul>
     {
      this.state.messages.map( message => <li
      key={message.id}>{message.text}     <button onClick={this.deleteMessage}> eliminar </button>
   </li> )
     }
    </ul>
   </form>
 );}}
 
 export default App;