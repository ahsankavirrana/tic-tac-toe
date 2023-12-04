import { useState } from "react"

const Player = ({initialName, symbol, isActive, onChangeName}) => {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick() {
        setIsEditing((editing) => !editing)
        if (isEditing){
            onChangeName(symbol, playerName);
        }
        // setIsEditing((editing) => !editing)
        //setIsEditing(!isEditing); //setIsEditing(isEditing ? 'Save' : 'Edit')
    }

    function handleSaveClick(event) {
        setPlayerName(event.target.value);
        
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>;
    let btnCaption
    // isEditing ? playerName = <input type="text" required /> : <span className="player-name">{name}</span>;
    if (isEditing) {
        editablePlayerName  = <input type="text" required  value={playerName} onChange={handleSaveClick}/>;
        // btnCaption = "Save";
    }

  return (
    <>
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                 {editablePlayerName}
                 <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    </>
  )
}

export default Player