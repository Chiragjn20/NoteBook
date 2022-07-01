import React, {useContext ,  useState} from "react";
import noteContext from '../Context/Notes/nodeContext'
const NodeItem = (props) => {
  const context = useContext(noteContext)
  const { deleteNote  } = context;
  const { note,updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3" >
        <div className="card-body">
          <div className="d-flex">
          <h5 className="card-title mx-2">{note.title}</h5> 
           <i onClick={()=>deleteNote(note._id)} className="fa fa-solid fa-trash mx-4"></i>
           <i className="fa fa-solid fa-pen " onClick={()=>{updateNote(note)}}></i> 
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NodeItem;
