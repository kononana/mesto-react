import React from "react";
import "../index.css";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import currentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";

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
        console.log(`Ошибочка: ${error}`)
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


    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      btntext="Сохранить"
      isOpen={isEditProfilePopupOpen}
      onClose={closeAllPopups}
      >
          <input 
          name="name" 
          type="text" 
          id="name-input" 
          placeholder="Имя" 
          className="popup__input popup__input_field_name" 
          required minLength="2" 
          maxLength="40"
          />
          <span className="popup__error" id="name-input-error"></span>
          <input 
          name="about" 
          type="text" 
          id="job-input" 
          placeholder="род деятельности" 
          className="popup__input popup__input_field_job" 
          required minLength="2" 
          maxLength="200"
          />
          <span className="popup__error" id="job-input-error"></span>
    </PopupWithForm>


    <PopupWithForm
     name="add-card"
     title="Новое место"
     btntext="Создать"
     isOpen={isAddPlacePopupOpen}
     onClose={closeAllPopups}
     >
        <input 
        name="title" 
        id="cardName-input" 
        type="text" 
        placeholder="Название" 
        className="popup__input popup__input_field_card-name" 
        required minLength="2" 
        maxLength="30"
        />
        <span className="popup__error" id="cardName-input-error"></span>
        <input 
        name="link" 
        type="url" 
        id="cardLink-input" 
        placeholder="Ссылка на картинку" 
        className="popup__input popup__input_field_card-link" 
        required
        />
        <span className="popup__error" id="cardLink-input-error"></span>
    </PopupWithForm>

 
    <PopupWithForm
     name="type-avatar"
     title="Обновить аватар"
     btntext="Сохранить"
     isOpen={isEditAvatarPopupOpen}
     onClose={closeAllPopups}
    >
        <input 
        type="url" 
        id="avatar-link" 
        name="avatar" 
        placeholder="Ссылка на аватар" 
        className="popup__input" 
        required
        />
        <span id="avatar-link-error" className="popup__error"></span>
     </PopupWithForm>


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
