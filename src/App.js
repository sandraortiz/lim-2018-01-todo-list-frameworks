import React, { Component } from 'react';
import Note from './Note.js'
import firebase from './firebase';


import{Button} from 'mdbreact';


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
      let dbRef = firebase.database().ref().child('todo').push().key;
      const notes = {
        uid:dbRef,
        text:note
      }
      const updates = {}
      updates['/todo/' + dbRef] =notes;
  return  firebase.database().ref().update(updates);

     
   }
  }

 
render() {
  return (
   
<div className="container">

 <h1> To do list  </h1>

    <div className="row">
 

      <div className="col">

   <input type="text"  className="form-control"  value={this.state.note} onChange={this.handleNoteChange.bind(this)} />
    <Button  type="submit" onClick={this.handleSubmit} >INGRESAR</Button>

  
     
       <Note class='z-depth-5'/>

        </div>
     
    </div>
</div>


  
    
  
 )}}
 
 export default App;