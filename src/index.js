import {
    DRESSERS
} from './dressers.js';

import {
    card_create
} from './card.js';

import {
    change_lang,
    choose_lang
} from './change_lang.js';

import {
    fill_info
} from './fill_info.js';

const EN_LANG = 'en';
const PL_LANG = 'pl';
const RU_LANG = 'ru';

//console.log(DRESSERS);

const user_lang = navigator.language.slice(0, 2) || navigator.userLanguage.slice(0, 2);
let website_lang;
const save_user_lang = JSON.parse(localStorage.getItem('save_user_lang'));
//console.log(save_user_lang);
const show_lang = document.getElementById('show_language');

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

    const catalog = [];
    const div = document.getElementById('main');

    for (const key in DRESSERS) {
        const category = DRESSERS[key];
        for (const product in category) {
            //console.log(product);
            if (product != 0) {
                catalog.push(card_create(category[product]));
            }
        }
    }

    catalog.forEach(function (item) {
        div.appendChild(item);
    });
}, false);

window.addEventListener('unload', () => {
    //const save_lang = document.getElementById('show_language');
    if ((show_lang.dataset.lang === null) || (show_lang.dataset.lang === undefined)) {
        localStorage.setItem('save_user_lang', JSON.stringify(show_lang.innerHTML.toLocaleLowerCase()));
        //console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    } else {
        localStorage.setItem('save_user_lang', JSON.stringify(show_lang.dataset.lang));
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