import React from "react";
import api from '../utils/api.js';
import Card from './Card.js'

function Main(props) {

    const [userName, setUserName] = React.useState('');
    const [userDescription, setuserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([])

    React.useEffect(() => {
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
            <img src={userAvatar} alt="Фотография в профиле" className="profile__avatar" style={{ backgroundImage: `url(${userAvatar})` }}/>
            <button className='profile__edit-avatar' type="button" onClick={props.onEditAvatar}></button>
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
                    key={card._id}
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