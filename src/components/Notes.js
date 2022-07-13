import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import AddANote from "./AddANote";
import NoteItems from "./NoteItems";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  let navigate = useNavigate();
  const getNotes = useContext(noteContext);
  const { notes, getAllNotes, editNote } = getNotes;

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      getAllNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "GENERAL",
  });

  let updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  ///Click Handlers>>>>

  let handleSubmit = (e) => {
    //e.preventDefault();
    console.log("Upddating Note... ", note);
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Note Updated Successfully", "success");
  };

  let handleOnChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  ///CLick Handlers<<<<END
  return (
    <>
      <AddANote showAlert={props.showAlert} />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note:
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* //// */}
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Enter Title.
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={handleOnChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    value={note.edescription}
                    name="edescription"
                    onChange={handleOnChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    value={note.etag}
                    name="etag"
                    onChange={handleOnChange}
                  />
                </div>
              </form>
              {/* ///// */}
              ...
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* //// */}
      <div>
        <div className="  row my-3">
          <h1>Saved Notes:</h1>
          <div className="container mx-2">
            {notes.length === 0 && "No Notes To Display."}
          </div>
          {notes.map((note) => {
            return (
              <NoteItems
                showAlert={props.showAlert}
                key={note._id}
                updateNote={updateNote}
                note={note}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;
