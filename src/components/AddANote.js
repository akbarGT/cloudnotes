import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddANote = (props) => {
  console.log("Add Func Called");
  const getNotes = useContext(noteContext);
  const { addNote } = getNotes;

  ///initial state

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "GENERAL",
  });

  let handleSubmit = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    console.log("Add Note Button Clicked");
    setNote({
      title: "",
      description: "",
      tag: "",
    });
    props.showAlert("Added Note Successfully", "success");
  };

  let handleOnChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="container my-3">
        <h1>Add a note:</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Enter Title.
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={handleOnChange}
              value={note.title}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={handleOnChange}
              value={note.description}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={handleOnChange}
              value={note.tag}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddANote;
