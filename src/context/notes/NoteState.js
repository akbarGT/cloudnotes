import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  let host = "http://localhost:5000/";
  let notesI = [];

  /////Fetch All Notes>>>>

  let getAllNotes = async () => {
    ////API Call>>>>
    const response = await fetch(`${host}api/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    ///API Call<<<<<
    let res = await response.json();
    console.log("GetAllNotes...", res);
    setNotes(res);
  };

  ///Fetch All Notes<<<<<

  const [notes, setNotes] = useState(notesI);
  //Add a Note
  let addNote = async (title, description, tag) => {
    ////API Call>>>>
    const response = await fetch(`${host}api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    ///API Call<<<<<
    let res = await response.json();
    console.log(res, "Add Note RES");

    console.log("Add new note...");
    const note = res;
    setNotes(notes.concat(note));
  };

  //API Delete Note>>>>>>>>>>>>
  const deleteNote = async (id) => {
    ////API Call>>>>
    const response = await fetch(`${host}api/notes/deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    let res = await response.json();
    ///API Call<<<<<

    console.log("Deleting The Note! ID:" + id + res);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
    props.showAlert("Note Deleted", "danger");
  };

  ///////API Delete Note<<<<<<<<<<<<<<<END

  ///Edit Note API
  const editNote = async (id, title, description, tag) => {
    ///API Call>>>
    console.log("editNote API CALL>" + id, description);
    const response = await fetch(`${host}api/notes/updatenote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const res = await response.json(); // parses JSON response into native JavaScript objects
    console.log(res, "editNote RES");
    ///API Call<<<<<

    let newNotes = JSON.parse(JSON.stringify(notes));
    //Login To edit in clinet
    for (let i = 0; i < newNotes.length; i++) {
      const element = newNotes[i];
      if (element._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };
  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, editNote, deleteNote, getAllNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
