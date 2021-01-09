import {
    HEADER_EMAIL,
    HEADER_PHONE
} from './lang.js';

export function fill_info() {
    const header_phone = document.getElementById('header_phone');
    header_phone.innerHTML = HEADER_PHONE;

    const header_email = document.getElementById('header_email');
    header_email.innerHTML = HEADER_EMAIL;
}