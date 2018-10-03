import React, { Component } from 'react';
import Note from './Note.js'
import firebase from './firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
     note: ''
    } 
  }

  handleNoteChange(e) {
    this.setState({  note: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let  note = this.state.note;
    if(  note.length !== 0 &&   note.trim() !== '' ) {
      let uid = firebase.database().ref().child('todo').push().key;
      firebase.database().ref('todo/'+uid).set({
        uid: uid,
       text:  note,
      });
   }
  }

 
render() {
  return (
   
  <div>     
 <form onSubmit={this.handleSubmit}>
          <input  value={this.state.note} onChange={this.handleNoteChange.bind(this)}  />
              <button type="submit" >añadir</button>
         </form> 
        <Note />
</div>
    
  
 )}}
 
 export default App;