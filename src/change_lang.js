import { WEBSITE_INFO } from './lang.js';

export function choose_lang(event){
    const button = event.currentTarget;
    const data_lang = button.dataset.lang;

    const show_lang = document.getElementById('show_language');
    show_lang.innerHTML = data_lang;
    show_lang.dataset.lang = data_lang;

    change_lang(data_lang);
}

export function change_lang(lang){
    const to_receive_orders = document.getElementById('to_receive_orders');
    to_receive_orders.innerHTML = WEBSITE_INFO.to_receive_orders[lang];

    const logo = document.getElementById('logo');
    logo.innerHTML = WEBSITE_INFO.logo[lang];

    const logo_info = document.getElementById('logo_info');
    logo_info.innerHTML = WEBSITE_INFO.important_information[lang];

    const favorites_text = document.getElementById('favorites_text');
    favorites_text.innerHTML = WEBSITE_INFO.favorites[lang];
}

