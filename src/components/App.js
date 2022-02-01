import React from "react";
import "../index.css";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import currentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
    const[isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
    const[isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const[isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const[selectedCard, setSelectedCard] = React.useState({name:'', link:''})
    const [currentUser, setCurrentUSer] = React.useState('');
    const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        setCurrentUSer(data)
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`)
    })
    api.getInitialCards()
        .then((cards) => {
                setCards(cards);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])
  
  function handleEditProfileClick(){
    setIsEditProfilePopupOpen(true)
  }
  function handleAddPlaceClick(){
    setIsAddPlacePopupOpen(true)
  }
  function handleEditAvatarClick(){
    setIsEditAvatarPopupOpen(true)
  }
  function closeAllPopups(){
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard({name:'', link:''})
  }
  
  function handleCardClick(card){
    setSelectedCard(card)
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      const delCard = cards.filter((e) => e._id !== card._id)
      setCards(delCard);
    })
  }

  function handleUpdateUser(person){
    api.changeUserInfo(person)
    .then((person) => {
      setCurrentUSer(person);
      closeAllPopups()
    })
    .catch((error) => {
      console.log(error)
    })
  }

  function handleUpdateAvatar(data) {
    api.changeUserAvatar(data)
      .then((data) => {
        setCurrentUSer(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }
  function handleAddPlaceSubmit(newCard) {
    api.addCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }


  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
}


    return (
      <currentUserContext.Provider value={currentUser}>
    <div className="page">
    <Header/>
    <Main
    onEditProfile={handleEditProfileClick}
    onEditAvatar={handleEditAvatarClick}
    onAddPlace={handleAddPlaceClick}
    onCardClick={handleCardClick}
    cards={cards}
    onCardLike={handleCardLike}
    onCardDelete={handleCardDelete} />
    
    <Footer/>

    <EditProfilePopup 
    isOpen={isEditProfilePopupOpen} 
    onClose={closeAllPopups} 
    onUpdateUser={handleUpdateUser}/> 

    <EditAvatarPopup 
      isOpen={isEditAvatarPopupOpen} 
      onClose={closeAllPopups}
      onUpdateAvatar={handleUpdateAvatar} 
      /> 

    <AddPlacePopup
     isOpen={isAddPlacePopupOpen}
     onClose={closeAllPopups}
     onAddPlace={handleAddPlaceSubmit}
     />


    <PopupWithForm
     name="type_delete"
     title="Вы уверены?"
     btntext="Да">
     </PopupWithForm>


     <ImagePopup
     card={selectedCard}
     onClose={closeAllPopups}
     ></ImagePopup>

    </div>
    </currentUserContext.Provider>
  );
}

export default App;
