import React, { Component } from 'react';
import firebase from './firebase';

class Note extends Component {
constructor (props) {
  super(props);
  this.state = {
    notes : [] 
 }
}
componentWillMount(){
  let messagesRef = firebase.database().ref('todo').orderByKey();
  messagesRef.on('value', snapshot => {
  let message =  snapshot.val() ;
     
if ( message == null ) {
this.setState({notes: []});
}
  else {
    let notes = Object.values(message);
  this.setState({ notes})
  }
 })
  }

deletenote(id) {
  firebase.database().ref('todo').child(id).remove();
}

 render() {
   return ( 
     <div>
       
       <ul>
          {this.state.notes.map((note, id) => {
            return (
              <ul>  
 <li key={note.id}>{note.text} </li>               
 <button type="button" onClick={() => this.checkIngredient(note.uid)}>  terminar </button>
                <button type="button"  onClick={() => this.deletenote(note.uid)}>eliminar</button>
              </ul>
            )
          })}          
        </ul>
        </div>
   
   )
 }




}
export default Note;