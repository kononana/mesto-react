import React from "react";

function Card(props){
    function handleCardClick(){
        props.onCardClick(props.card)
    }

    return (
        <li className="element">
        <button type="button" className="element__delete-button"></button>
        <img src={props.card.link} className="element__image" alt={props.card.name} onClick={handleCardClick}/>
        <div className="element__description">
            <h2 className="element__title">{props.card.name}</h2>
            <div className="element__like-section">
                <button type="button" className="element__like-button"></button>
                <span className="element__like-counter">0</span>
            </div>
        </div>
    </li>
    )
}

export default Card;