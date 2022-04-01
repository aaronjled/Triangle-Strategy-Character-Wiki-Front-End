import React, {useState} from 'react';
//function calling the props sent down from mainpage to lift state and create and change characters.
const NewCharacterComponent = (props) => {
    //use state for showing or not showing a character, allows for the onClick toggle function
    const [showing, setShowing] = useState(false)
    //keeps track of the new characters created by the form, and update them
    const [newCharacter, setNewCharacter] = useState({
        image: "",
        name: "",
        factionName: "",
        unitClass: "",
        joins: "",
        bio: "",
    })
    //function that will shift between showing not showing, gets called in buttons on click
    const toggleShowing = () => {
        setShowing(!showing)
    }
    //tracks valid state, can be used for multiple functions regarding validation and testing
    const [isValidState, setIsValidState] = useState({valid: true, message: ""})
//keeps track of changes in the form field, and logs them in state
    const handleInputChange = (e) => {
        setNewCharacter({
            ...newCharacter,
            [e.target.name]: e.target.value
        })
    }
    //this function prevents the page from refreshing and chesks whether or not the state is valid before allowing the creation of a new character
    const submitNewCharacter = (e) =>{
        e.preventDefault()
        let validSubmission = true;
        if(newCharacter.name.length < 2){
            setIsValidState({
                valid: false,
                message: "Name needs to be longer"
            })
            validSubmission = false;
        }
        if(validSubmission){
        props.createNewCharacter(newCharacter)
        setNewCharacter({
            image: "",
            name: "",
            factionName: "",
            unitClass: "",
            joins: "",
            bio: "",
        })
        setIsValidState({
            valid: true,
            message:""
        })
        setShowing(false);
        }
    }
    return (
        //form to create new character
        <>
        {
            showing 
            ?
            //onClick toggle back to not showing the form on submit prevents the page from reloading, and uses the props sent from the parent file to log the created character lifting state.
            <div id ="new-character-form">
                <button onClick={toggleShowing}>Close</button>
                <form onSubmit={submitNewCharacter}>
                    {isValidState.valid ? null: <p className="form-error">{isValidState.message}</p>}
                    {props.newCharacterServerError ? <p className="form-error">{props.newCharacterServerError}</p> : null}
                    Image: <input required onChange ={handleInputChange} type = "text" name ="image" value={newCharacter.image}/>                    
                    Name: <input required onChange ={handleInputChange} type = "text" name ="name" value={newCharacter.name}/>
                    Faction: <input required onChange ={handleInputChange} type = "text" name ="factionName" value={newCharacter.factionName}/>
                    Unit Class: <input required onChange ={handleInputChange} type = "text" name ="unitClass" value={newCharacter.unitClass}/>
                    Joins: <input required onChange ={handleInputChange} type = "text" name ="joins" value={newCharacter.joins}/>
                    Bio: <input required onChange ={handleInputChange} type = "text" name ="bio" value={newCharacter.bio}/>

                    <br></br>
                <button type="submit">Submit</button>
                </form>
               
        </div>
        :
        <button onClick={toggleShowing}>Create New Character</button>
        }
        </>
    )
}
//export for use in main page
export default NewCharacterComponent