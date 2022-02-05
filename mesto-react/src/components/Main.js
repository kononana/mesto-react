import React, { useState, useEffect }  from "react";
import api from '../utils/api.js';
import Card from './Card.js'

function Main(props) {

    const [userName, setUserName] = useState('');
    const [userDescription, setuserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [cards, setCards] = useState([])

    useEffect(() => {
        api.getUserInfo()
            .then(userData => {
                setUserName(userData.name);
                setuserDescription(userData.about);
                setUserAvatar(userData.avatar);
            })
            .catch((err) => {
                console.log(err);
            })
        api.getInitialCards()
            .then((cards) => {
                setCards(cards);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

           
    return(
        <main className="main">
        <section className="profile">
            <div className="profile__image">
            <img src={userAvatar} alt="Фотография в профиле" className="profile__avatar"/>
            <button className='profile__edit-avatar' type="button" onClick={props.onEditAvatar} style={{ backgroundImage: `url(${userAvatar})` }} ></button>
        </div>
            <div className="profile__info">
                <h1 className="profile__info-name">{userName}</h1>
                <button className="button profile__edit-button" type="button" onClick={props.onEditProfile}></button>
                <p className="profile__info-occupation">{userDescription}</p>
            </div>
            <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
        </section>
        <section className="elements">
            <ul className="elements__list">
                {cards.map((card) => (
                    <Card
                    key={card.id}
                    card={card}
                    onCardClick={props.onCardClick}
                    />
                ))}
            </ul>
        </section>
    </main>
    )
}

export default Main;