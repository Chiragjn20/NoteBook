
import React ,{ useState } from "react";
import NoteContext from "./nodeContext";
const NoteState = (props)=>{
  const host = "http://localhost:3000"
    const notesInitial =[]
      

    const getNotes = async () => {
      // API Call 
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI0ZWM3M2Y1YzVhODhmZWIzNjZiOWY2In0sImlhdCI6MTY0OTk2MTA3MX0.uUIqaDDc_Ni09cEe3FjnGuUeqUFUJSC6FzLyeZtCTC4"
        }
      });
      const json = await response.json() 
      console.log(json)
      setNotes(json)
    }

    const addNote = async (title , description , tag)=>{
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST', 
           headers: {
          'Content-Type': 'application/json',
          'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI0ZWM3M2Y1YzVhODhmZWIzNjZiOWY2In0sImlhdCI6MTY0OTk2MTA3MX0.uUIqaDDc_Ni09cEe3FjnGuUeqUFUJSC6FzLyeZtCTC4'
         },
        body: JSON.stringify({title , description ,tag}) 
      });
      const json= response.json(); 
     const note = { "_id": "6259004f5296c7ef74faa3a9",
      "user": "624ec73f5c5a88feb366b9f6",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2022-04-15T05:19:11.528Z",
      "__v": 0};
      setNotes(notes.concat(note))
    }

    const deleteNote=(id)=>{
      console.log("clicked" + id)
      const newNotes = notes.filter((note)=> {return note._id!==id})
      setNotes(newNotes)
    }

    const editNote = async(id , title , description , tag)=>{
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'POST', 
           headers: {
          'Content-Type': 'application/json',
          'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI0ZWM3M2Y1YzVhODhmZWIzNjZiOWY2In0sImlhdCI6MTY0OTk2MTA3MX0.uUIqaDDc_Ni09cEe3FjnGuUeqUFUJSC6FzLyeZtCTC4'
         },
        body: JSON.stringify({title , description,tag}) 
      });
      const json= response.json(); 
      for (let index = 0; index < notes.length; index++) {
        const element = notes[index];
        if(element._id === id){
          element.title = title;
          element.description = description;
          element.tag = tag;
        }
        
      }
    }
     
    


    const [notes , setNotes ] = useState(notesInitial)
    return (
        <NoteContext.Provider value={{notes , addNote, deleteNote ,editNote ,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )



    }
export default NoteState;