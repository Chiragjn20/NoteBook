import React, {useContext ,  useState} from "react";
import noteContext from '../Context/Notes/nodeContext'

function AddNote() {
  const context = useContext(noteContext)
    const { addNote} = context;

    const [note , setNote ] = useState({title : "" , description:"", tag :""})

    const handleClick =(e)=>{
      e.preventDefault();
        addNote(note.title , note.description , note.tag)
        setNote({title : "" , description:"", tag :""})
    }

    const onchange =(e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
  return (
    <div className="container my-3">
      <h3> Add a note</h3>
      <form>
        <div className="form-group my-1">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            placeholder="Enter Title"
            onChange={onchange}
            minLength={5} required
            value={note.title}
          />
        </div>
        <div className="form-group my-1">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            placeholder="Enter Description"
            onChange={onchange}
            minLength={5} required
            value={note.description}
          />
        </div>

        <div className="form-group my-1">
          <label htmlFor="tag">Tag</label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            placeholder="Enter tag"
            onChange={onchange}
            minLength={5} required
            value={note.tag}
          />
        </div>
       
        <button type="submit"  onClick={handleClick} className="btn btn-primary">
          Add note
        </button>
      </form>
    </div>
  );
}

export default AddNote;
