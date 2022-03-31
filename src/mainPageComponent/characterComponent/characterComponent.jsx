import React, {useState} from 'react'
const CharacterComponent = (props) => {
    return ( 
        <div className="index-single-character">
            <h2>Name: {props.character.name}</h2>  
            <h3>Faction: {props.character.factionName}</h3>
            <h4>Starting Class: {props.character.unitClass}</h4>
            <h5>How to Unlock: {props.character.joins}</h5>
            <p>Bio: {props.character.bio}</p>  
        </div>
    )
}
export default CharacterComponent