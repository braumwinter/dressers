import {
    HEADER_EMAIL,
    HEADER_PHONE
} from './lang.js';

export function fill_info() {
    const header_phone = document.getElementById('header_phone');
    header_phone.href = 'tel:' + HEADER_PHONE;

    const header_phone_number = document.getElementById('header_phone_number');
    header_phone_number.innerHTML = HEADER_PHONE;

    const header_email = document.getElementById('header_email');
    header_email.href = 'mailto:' + HEADER_EMAIL;

    const header_email_address = document.getElementById('header_email_address');
    header_email_address.innerHTML = HEADER_EMAIL;
}