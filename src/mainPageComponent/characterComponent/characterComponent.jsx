import React, { useState } from 'react'
const CharacterComponent = (props) => {
    //use state for showing or not showing a character, allows for the onClick toggle function
    const [showing, setShowing] = useState(false)
    //keeps track of the edited characters created by the form, and update them
    const [updateCharacter, setUpdateCharacter] = useState({
        image: props.character.image,
        name: props.character.name,
        factionName: props.character.factionName,
        unitClass: props.character.unitClass,
        joins: props.character.joins,
        bio: props.character.bio,
        _id: props.character._id
    })
    const toggleShowing = () => {
        setShowing(!showing)
    }
    //keeps track of changes in the form field, and logs them in state
    const handleInputChange = (e) => {
        setUpdateCharacter({
            ...updateCharacter,
            [e.target.name]: e.target.value
        })
    }
    const submitUpdateCharacter = (e) => {
        e.preventDefault();
        props.updateCharacter(props.character._id, updateCharacter);
        setShowing(false);
        console.log("updating Character!")
    }
    return (
        //form to create edit character
        <>
            {
                showing
                    ?
                    //onClick toggle back to not showing the form on submit prevents the page from reloading, and uses the props sent from the parent file to log the created character lifting state.
                    <div id="edit-character-form">
                        <button onClick={toggleShowing}>Close</button>
                        <form onSubmit={submitUpdateCharacter}>
                            Image: <input required onChange={handleInputChange} type="text" name="image" value={updateCharacter.image} />
                            Name: <input required onChange={handleInputChange} type="text" name="name" value={updateCharacter.name} />
                            Faction: <input required onChange={handleInputChange} type="text" name="factionName" value={updateCharacter.factionName} />
                            Unit Class: <input required onChange={handleInputChange} type="text" name="unitClass" value={updateCharacter.unitClass} />
                            Joins: <input required onChange={handleInputChange} type="text" name="joins" value={updateCharacter.joins} />
                            Bio: <input required onChange={handleInputChange} type="text" name="bio" value={updateCharacter.bio} />

                            <br></br>
                            <button type="submit">Submit</button>
                        </form>

                    </div>
                    :
                    <button onClick={toggleShowing}>Edit Character</button>
            }
            <div className="index-single-character">
                <h2>Name: {props.character.name}</h2>
                <h3>Faction: {props.character.factionName}</h3>
                <h4>Starting Class: {props.character.unitClass}</h4>
                <h5>How to Unlock: {props.character.joins}</h5>
                <p>Bio: {props.character.bio}</p>
            </div>
            <button onClick={() => {props.deleteCharacter(props.character._id)}}>Delete</button>
            <br></br>
        </>
    )
}



export default CharacterComponent