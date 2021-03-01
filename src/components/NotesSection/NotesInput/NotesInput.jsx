import { useState,useRef } from "react";
import NotesMenu from "../NotesMenu/NotesMenu";
import TagsDisplay from "../TagsDisplay/TagsDisplay";
import { AiOutlinePushpin, AiFillPushpin } from "react-icons/ai";
import { IoAddCircleOutline } from "react-icons/io5";

import "./notesInput.css";

const NotesInput = ({ addNewNote, updateFullContainerVisibility, fullContainerVisible }) => {
  const [titleState, setTitle] = useState("");
  const [contentState, setContent] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [addedTags, addTag] = useState([]);
  const [isPinned, setPin] = useState(false);
  
  const contentInputRef = useRef(null);
  const titleInputRef = useRef(null);


  const onClickAdd = () => {
    addNewNote({
      title: titleState,
      content: contentState,
      isPinned: isPinned,
      tags: addedTags,
      bgColor: bgColor,
    });

    //reset all fields
    setTitle("");
    setContent("");
    addTag([]);
    setBgColor("");
    setPin(false);
    contentInputRef.current.style.height = "inherit";
    titleInputRef.current.style.height = "inherit";
  };

  const updateBgColor = (color) => {
    setBgColor(color);
  };

  const updateTagsList = (newTag) => {
    let isPresent = addedTags.find(
      (tag) => tag.toLowerCase() === newTag.toLowerCase()
    );
    if (isPresent === undefined) addTag([...addedTags, newTag]);
  };

  const deleteTag = (tag) => {
    let updatedTags = addedTags.filter(
      (item) => tag.toLowerCase() !== item.toLowerCase()
    );
    addTag(updatedTags);
  };

  const updateInput = (event, type) => {
    event.target.style.height = "inherit";
    event.target.style.height = `${event.target.scrollHeight}px`;
    if (type === "title") setTitle(event.target.value);
    else setContent(event.target.value);
  };

  return (
    <div
      className="container-notesInput"
      style={{
        backgroundColor: bgColor === "" ? "" : `var(${bgColor})`,
        borderColor:
          bgColor === "" || bgColor.includes("brown")
            ? `var(--color-light-gray)`
            : `var(${bgColor})`,
      }}
    >
      {fullContainerVisible ? (
        <div className="container-input-topRow">
          <textarea
          ref={titleInputRef}
            rows="1"
            className="input-title"
            placeholder="Title"
            value={titleState}
            onChange={(event) => updateInput(event, "title")}
          ></textarea>
          <div className="container-pin" onClick={() => setPin(!isPinned)}>
            {isPinned ? <AiFillPushpin /> : <AiOutlinePushpin />}
          </div>
        </div>
      ) : (
        <></>
      )}

      <textarea
      ref={contentInputRef}
        rows="1"
        className="input-content"
        placeholder="Take a note..."
        value={contentState}
        onChange={(event) => updateInput(event, "content")}
        onFocus={() => updateFullContainerVisibility(true)}
       
        style={!fullContainerVisible?{margin:"0"}:{}}
      ></textarea>

      {fullContainerVisible ? (
        <>
          <div>
            <TagsDisplay
              tags={addedTags}
              tagsId={"newNote"}
              deleteTag={(tag) => deleteTag(tag)}
            />
          </div>
          <div className="container-bottomMenu">
            <NotesMenu
              updateBgColor={(color) => updateBgColor(color)}
              activeColor={bgColor}
              updateTagsList={(tag) => updateTagsList(tag)}
            />
            <IoAddCircleOutline onClick={onClickAdd} className="icon-add"/>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default NotesInput;
