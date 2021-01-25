import {
    DRESSERS
} from './dressers.js';

import {
    product_card_create
} from './card.js';

import {
    change_lang,
    choose_lang
} from './change_lang.js';

import {
    fill_info
} from './fill_info.js';

import {
    show_main,
    show_favorites,
    show_catalog,
    show_all_goods,
    show_what_need_know,
    show_our_address,
    show_start_page
} from './pages.js';

const EN_LANG = 'en';
const PL_LANG = 'pl';
const RU_LANG = 'ru';

//console.log(DRESSERS);

const user_lang = navigator.language.slice(0, 2) || navigator.userLanguage.slice(0, 2);
let website_lang;
const save_user_lang = localStorage.getItem('save_user_lang');
//console.log(save_user_lang);
const show_lang = document.getElementById('show_language');

const last_state = localStorage.getItem('last_state');
if ((last_state === null) || (last_state === undefined)) {
    localStorage.setItem('last_state', 'main');
} else {
    define_language(save_user_lang);
}

function define_language(lang) {
    switch (lang) {
        case EN_LANG:
        case PL_LANG:
        case RU_LANG: {
            website_lang = lang;
            break;
        }
        default: {
            website_lang = EN_LANG;
        }
    }

    show_lang.innerHTML = website_lang;
    show_lang.dataset.lang = website_lang;
    //show_lang.dataset[lang] = website_lang;
}

if ((save_user_lang === null) || (save_user_lang === undefined)) {
    define_language(user_lang);
} else {
    define_language(save_user_lang);
}
console.log(website_lang);

window.addEventListener('load', () => {
    change_lang(website_lang);
    fill_info();
    //show_main_page();
    //show_all_goods();
    show_catalog();
}, false);

window.addEventListener('unload', () => {
    const save_lang = document.getElementById('show_language');
    if ((save_lang.dataset.lang === null) || (save_lang.dataset.lang === undefined)) {
        localStorage.setItem('save_user_lang', save_lang.innerHTML.toLocaleLowerCase());
        //console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    } else {
        localStorage.setItem('save_user_lang', save_lang.dataset.lang.toLocaleLowerCase());
        //console.log('wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww');
    }

}, false);

//console.log(show_lang.innerHTML.toLocaleLowerCase());
//console.log(show_lang.dataset.lang);

const language_item_en = document.getElementById('language_item_en');
const language_item_pl = document.getElementById('language_item_pl');
const language_item_ru = document.getElementById('language_item_ru');

language_item_en.addEventListener('click', choose_lang, false);
language_item_pl.addEventListener('click', choose_lang, false);
language_item_ru.addEventListener('click', choose_lang, false);

const favorites = document.getElementById('favorites');
favorites.addEventListener('click', show_favorites, false);

//show_catalog();

const menu_main = document.getElementById('menu_main');
const menu_catalog = document.getElementById('menu_catalog');
const menu_all_goods = document.getElementById('menu_all_goods');
const menu_what_need_know = document.getElementById('menu_what_need_know');
const menu_our_address = document.getElementById('menu_our_address');

menu_main.addEventListener('click', show_main, false);
menu_catalog.addEventListener('click', show_catalog, false);
menu_all_goods.addEventListener('click', show_all_goods, false);
menu_what_need_know.addEventListener('click', show_what_need_know, false);
menu_our_address.addEventListener('click', show_our_address, false);