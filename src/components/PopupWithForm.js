import React from "react";

function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened": ""}`}>
            <div className="popup__container">
            <button type="button" className="popup__close" aria-label="сlose" onClick={props.onClose}></button>
            <h2 className="popup__title">{props.title}</h2>
            <form name={props.name} className="popup__form" noValidate>
                {props.children}
                <button type="submit" className="popup__submit">{props.btntext}</button>
            </form>
            </div>
    </div>

    )

}

export default PopupWithForm