import { WEBSITE_INFO } from './lang.js';

export function change_lang(lang){
    const to_receive_orders = document.getElementById('to_receive_orders');
    to_receive_orders.innerHTML = WEBSITE_INFO.to_receive_orders[lang];
}

export function choose_lang(event){
    const button = event.currentTarget;
    const data_lang = button.dataset.lang;
    //console.log(data_lang);

    const show_lang = document.getElementById('show_language');
    show_lang.innerHTML = data_lang;
    show_lang.dataset.lang = data_lang;

    change_lang(data_lang);
}