/* массив с карточками */
const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Южный Урал',
        link: 'https://yaturisto.ru/wp-content/gallery/id-34-gory-juzhnojj-sibiri/id-34-gory-juzhnojj-sibiri-belukha-2.jpg'

    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },

    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },

    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


/*validation config*/
const config = {
    formSelector: '.popup__for',
    inputSelector: '.popup__input',
    buttonSelector: '.popup__submit',
    inputErrorClass: 'popup__input_type_error',
    inactiveButtonClass: 'popup__submit_disabled',
    errorClass: 'popup__error_type_active'
}

export { initialCards };
export { config };
