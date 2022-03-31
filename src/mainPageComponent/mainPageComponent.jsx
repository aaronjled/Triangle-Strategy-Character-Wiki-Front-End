import React, {useState, useEffect} from 'react'
import CharacterComponent from './characterComponent/characterComponent';
const MainPageComponent = () => {
    // const [mainPage, setmainPage] = useState();
    const [characters, setCharacters] = useState([])
    const getCharacters = async () => {
        try{
            const characters = await fetch("http://localhost:3001/character")
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
        {characters.map((character)=> {
            return <CharacterComponent key ={character._id} character={character}></CharacterComponent>
        })}
        </div>
        )
    

}
export default MainPageComponent