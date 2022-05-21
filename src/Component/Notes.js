import React , {useContext, useEffect} from 'react'
import noteContext from '../Context/Notes/nodeContext'
import AddNote from './AddNote';
import NoteItem from './NoteItem';

const Notes = () => {
    const context = useContext(noteContext)
    const {notes , getNotes} = context;
     useEffect(()=>{
      getNotes()
    },[])
  return (<>
      <AddNote/>
    <div className="row my-3">
      <h3> Your notes</h3>
      {notes.map((note)=>{
        return <NoteItem note ={note}/>
      })}
      </div>
      </>
  )
}

export default Notes