import React from "react";
import "../index.css";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";

function App() {
    const[isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
    const[isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const[isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const[selectedCard, setselectedCard] = React.useState({name:'', link:''})
  
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
    setselectedCard({name:'', link:''})
  }
  
  function handleCardClick(card){
    setselectedCard(card)
  }

    return (
    <div className="page">
    <Header/>
    <Main
    onEditProfile={handleEditProfileClick}
    onEditAvatar={handleEditAvatarClick}
    onAddPlace={handleAddPlaceClick}
    onCardClick={handleCardClick}/>
    
    <Footer/>
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      btntext="Сохранить"
      isOpen={isEditProfilePopupOpen}
      onClose={closeAllPopups}
      >
          <input name="name" type="text" id="name-input" placeholder="Имя" className="popup__input popup__input_field_name" required minLength="2" maxLength="40"/>
          <span className="popup__error" id="name-input-error"></span>
          <input name="about" type="text" id="job-input" placeholder="род деятельности" className="popup__input popup__input_field_job" required minLength="2" maxLength="200"/>
          <span className="popup__error" id="job-input-error"></span>
    </PopupWithForm>
    <PopupWithForm
     name="add-card"
     title="Новое место"
     btntext="Создать"
     isOpen={isAddPlacePopupOpen}
     onClose={closeAllPopups}
    >
        <input name="title" id="cardName-input" type="text" placeholder="Название" className="popup__input popup__input_field_card-name" required minLength="2" maxLength="30"/>
        <span className="popup__error" id="cardName-input-error"></span>
        <input name="link" type="url" id="cardLink-input" placeholder="Ссылка на картинку" className="popup__input popup__input_field_card-link" required/>
        <span className="popup__error" id="cardLink-input-error"></span>
    </PopupWithForm>
 
    <PopupWithForm
     name="type-avatar"
     title="Обновить аватар"
     btntext="Сохранить"
     isOpen={isEditAvatarPopupOpen}
     onClose={closeAllPopups}
    >
        <input type="url" id="avatar-link" name="avatar" placeholder="Ссылка на аватар" className="popup__input" required/>
        <span id="avatar-link-error" className="popup__error"></span>
     </PopupWithForm>

     <PopupWithForm
     name="type_delete"
     title="Вы уверены?"
     btntext="Да"
     >
     </PopupWithForm>
     <ImagePopup
     card={selectedCard}
     onClose={closeAllPopups}
     ></ImagePopup>

    </div>
  );
}

export default App;
