import NotesMenu from "../../NotesMenu/NotesMenu";
import TagsDisplay from "../../TagsDisplay/TagsDisplay";
import { AiOutlinePushpin, AiFillPushpin } from "react-icons/ai";

const NotesCard = ({ tagId, title, content, bgColor, tags, isPinned }) => {
  console.log(bgColor);
  return (
    <div
      className="notes-card"
      style={{
        backgroundColor: bgColor === "" ? "" : `var(${bgColor})`,
        borderColor:
          bgColor === "" || bgColor.includes("brown")
            ? `var(--color-light-gray)`
            : `var(${bgColor})`,
        gridRow: content.length > 200 ? "auto / span 2" : "",
      }}
    >
      <div className="container-display-topRow">
        <div className="display-title">{title}</div>
        <div
          className="container-pin"
          //   onClick={() => setPin(!isPinned)}
        >
          {isPinned ? <AiFillPushpin /> : <AiOutlinePushpin />}
        </div>
      </div>

      <div className="display-content">
        {content.length > 200 ? `${content.substring(0, 200)} . . .` : content}
      </div>
      <div>
        <TagsDisplay
          tags={tags}
          tagsId={tagId}
          deleteTag={(tag) => console.log(tag)}
        />
      </div>
      <div className="container-display-bottomMenu">
        <NotesMenu
          //   updateBgColor={(color) => updateBgColor(color)}
          //   activeColor={bgColor}
          //   updateTagsList={(tag) => updateTagsList(tag)}
          updateBgColor={(color) => console.log(color)}
          activeColor={bgColor}
          updateTagsList={(tag) => console.log(tag)}
        />
      </div>
    </div>
  );
};

export default NotesCard;
