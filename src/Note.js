import React, { Component } from 'react';
import firebase from './firebase';
import { ListGroup, ListGroupItem } from 'mdbreact'
import{Button} from 'mdbreact';

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

check(text ){

return (
  <ListGroup>
  <ListGroupItem  style = {{ textDecoration:text ? 'line-through' : 'none' }} >
    {text}
      </ListGroupItem >
  </ListGroup>

)

  // for(var i=0;i<text.length;i++){
	// 	text[i].style.setProperty("text-decoration", "line-through");
	// }
}

 render() {
   return ( 
     <div>
       
       <ul>
          {this.state.notes.map((note) => {
            return (
//               <ul>  
//  <li >{note.text}   </li>  
//               </ul>

                 <ListGroup>
                 <ListGroupItem 
                 id={note.id}  >{note.text}  
                  </ListGroupItem>

                   <ListGroupItem>
                    <Button type="button" onClick={() =>    this.check(note.text , note.id , )}>  terminar </Button>
                 <Button type="button"  onClick={() => this.deletenote(note.uid)}>eliminar</Button> 
                      </ListGroupItem>
                     
                 </ListGroup>
            )
          })}          
        </ul>
        </div>
   
   )
 }




}
export default Note;