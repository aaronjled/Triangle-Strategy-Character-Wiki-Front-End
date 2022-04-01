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
    useEffect(getCharacters, [])
    return (
        <div>
        <h1>Hello</h1>
        <NewCharacterComponent
            newCharacterServerError={newCharacterServerError}
            createNewCharacter={createNewCharacter}>
        </NewCharacterComponent>
        {characters.map((character)=> {
            return <CharacterComponent key ={character._id} character={character}></CharacterComponent>
        })}
        </div>
        )
    

}
export default MainPageComponent