import React, {useState, useEffect} from 'react'
import CharacterComponent from './characterComponent/characterComponent';
import NewCharacterComponent from './newCharacterComponent/newCharacterComponent';
const MainPageComponent = () => {
    // const [mainPage, setmainPage] = useState();
    const [characters, setCharacters] = useState([])
    const[newCharacterServerError, setNewCharacterServerError] = useState("")
    const createNewCharacter = async (newCharacter) => {
        console.log(newCharacter);
        console.log("Let's Create This")
        
        //send request to back-end
        const apiResponse = await fetch("https://triangle-wiki-api.herokuapp.com/character", {
        method: "POST",
        body: JSON.stringify(newCharacter),
        headers: {
            "Content-Type": "application/json"
        }
        })
        //parse the response
        const parsedResponse = await apiResponse.json()
        //if successful add item to state
        console.log(parsedResponse)
        if(parsedResponse.success){
            setCharacters([...characters, newCharacter])
        }else{
            setNewCharacterServerError(parsedResponse.data)
            //show error message in form
        }            
    }
     //delete aspect of route
     const deleteCharacter = async (idToDelete) => {
        try{ 
            //send request to back end
            const apiResponse = await fetch(`https://triangle-wiki-api.herokuapp.com/character/${idToDelete}`, {   
            method: 'DELETE'
            })
            //parse response
            const parsedResponse = await apiResponse.json()
            if(parsedResponse.success){
                const newCharacter = characters.filter(character => character._id !== idToDelete)
                setCharacters(newCharacter)
            }
            else{
                //TODO
            }
            console.log(parsedResponse)
        }catch(err){
            console.log(err)
        }
        console.log("deleting item ID" + idToDelete)
       
         
    }
    const updateCharacter = async (idToUpdate, characterToUpdate) => {
        const apiResponse = await fetch(`https://triangle-wiki-api.herokuapp.com/character/${idToUpdate}`, {
            method: "PUT",
            body: JSON.stringify(characterToUpdate),
            headers: {
                "Content-Type": "application/json"
            }
        })
            const parsedResponse = await apiResponse.json();
        if(parsedResponse.success){
        //one line version that uses a function to check the item to see if its the one to update, if not send old version
            const newCharacter = characters.map(character => character._id === idToUpdate ? characterToUpdate : character)
            setCharacters(newCharacter)
        }else{
            //TODO
        }
            
        }
    const getCharacters = async () => {
        try{
            const characters = await fetch("https://triangle-wiki-api.herokuapp.com/character")
            const parsedCharacters = await characters.json();
            setCharacters(parsedCharacters.data)

        }catch(err){
            console.log(err)
            //TODO
        }
    }
    useEffect(()=>{getCharacters()}, [])
    return (
        <div>
        <NewCharacterComponent
            newCharacterServerError={newCharacterServerError}
            createNewCharacter={createNewCharacter}>
        </NewCharacterComponent>
        <br></br>
        <br></br>
        {characters.map((character)=> {
            return <CharacterComponent key ={character._id} character={character} updateCharacter={updateCharacter} deleteCharacter={deleteCharacter}></CharacterComponent>
        })}
        </div>
        )
    

}
export default MainPageComponent