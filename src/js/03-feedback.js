import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const { email, message } = form;
const STORAGE_KEY = 'feedback-form-state';

// console.log(email);
// console.log(message);

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onTextareaInput, 500));

const checkLocalStorage = () => {
    const storagedData = JSON.parse(
        localStorage.getItem(STORAGE_KEY)
    );

    if (localStorage.getItem(STORAGE_KEY)) {
        email.value = storagedData.email;
        message.value = storagedData.message;
    }
};

checkLocalStorage();

function onTextareaInput(evt) {
    // console.log(evt.target);
    // console.log(evt.target.name);
    // console.log(evt.target.value);

    const {
        target: { name, value },
    } = evt;

    if (name === 'email') {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(
                { email: value, message: message.value }
            )
        )
    };

    if (name === 'message') {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(
                { email: email.value, message: value }
            )
        )
    };
}

function onFormSubmit(evt) {
    evt.preventDefault();

    evt.target.reset();

    console.log(
        JSON.parse(localStorage.getItem(STORAGE_KEY))
    );

    localStorage.removeItem(STORAGE_KEY);
}

