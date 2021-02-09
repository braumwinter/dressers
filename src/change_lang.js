import {
    WEBSITE_INFO
} from './lang.js';

export function choose_lang(event) {
    const button = event.currentTarget;
    const data_lang = button.dataset.lang;

    const show_lang = document.getElementById('show_language');
    show_lang.innerHTML = data_lang;
    show_lang.dataset.lang = data_lang;

    change_lang(data_lang);
}

export function change_lang(lang) {
    const to_receive_orders = document.getElementById('to_receive_orders');
    to_receive_orders.innerHTML = WEBSITE_INFO.to_receive_orders[lang];

    const logo = document.getElementById('logo');
    logo.innerHTML = WEBSITE_INFO.logo[lang];

    const logo_info = document.getElementById('logo_info');
    logo_info.innerHTML = WEBSITE_INFO.important_information[lang];

    const favorites_text = document.getElementById('favorites_text');
    favorites_text.innerHTML = WEBSITE_INFO.favorites[lang];

    const menu_main = document.getElementById('menu_main');
    menu_main.innerHTML = WEBSITE_INFO.menu_main[lang];

    const menu_catalog = document.getElementById('menu_catalog');
    menu_catalog.innerHTML = WEBSITE_INFO.menu_catalog[lang];

    const menu_all_goods = document.getElementById('menu_all_goods');
    menu_all_goods.innerHTML = WEBSITE_INFO.menu_all_goods[lang];

    const menu_what_need_know = document.getElementById('menu_what_need_know');
    menu_what_need_know.innerHTML = WEBSITE_INFO.menu_what_need_know[lang];

    const menu_our_address = document.getElementById('menu_our_address');
    menu_our_address.innerHTML = WEBSITE_INFO.menu_our_address[lang];

    const menu_tags = document.getElementById('menu_tags');
    menu_tags.innerHTML = WEBSITE_INFO.menu_tags[lang];

    const data_attr_lang = '[data-' + lang + ']';

    const change_lang_array = document.querySelectorAll(data_attr_lang);

    change_lang_array.forEach(function (item) {
        const name = item.dataset[lang];
        item.innerHTML = name;
    });
}

export function change_lang2() {
    const data = document.querySelectorAll('[data-en]');

    console.log(data);

    data.forEach(function (item) {
        const name = item.dataset.en;
        item.innerHTML = name;
    });
}