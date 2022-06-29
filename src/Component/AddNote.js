import React, {useContext ,  useState} from "react";
import noteContext from '../Context/Notes/nodeContext'

function AddNote() {
  const context = useContext(noteContext)
    const { addNote} = context;

    const [note , setNote ] = useState({title : "" , description:"", tag :"default"})

    const handleClick =(e)=>{
      e.preventDefault();
        addNote(note.title , note.description , note.tag)
    }

    const onchange =(e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
  return (
    <div className="container my-3">
      <h3> Add a note</h3>
      <form>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            placeholder="Enter Title"
            onChange={onchange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            placeholder="Enter Description"
            onChange={onchange}
          />
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit"  onClick={handleClick} className="btn btn-primary">
          Add note
        </button>
      </form>
    </div>
  );
}

export default AddNote;
