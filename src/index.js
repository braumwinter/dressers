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
    fill_info,
    add_dropdown_catalog,
    add_dropdown_tags
} from './fill_info.js';

import {
    show_main,
    show_favorites,
    show_catalog,
    show_all_goods,
    show_what_need_know,
    show_our_address,
    show_start_page,
    show_product_info
} from './pages.js';

import {
    NAME_DRESSERS,
    BODY_COLOR,
    BODY_MATERIAL,
    TAGS
} from './lang.js';

import {
    search_activation,
    search_blur,
    search
} from './search.js';

import {
    scroll_button,
    back_top
} from './scroll.js';

const temp_obj = {
    name: '1',
    category_name: NAME_DRESSERS.chord,
    card_img: ['chord1_small_1.jpg', 'chord1_small_2.jpg'],
    imgs: ['chord1_1.jpg', 'chord1_2.jpg', 'chord1_3.jpg'],
    roller_guides: 225.00,
    ball_guides: 274.00,
    body_color: [BODY_COLOR.sonoma_oak, BODY_COLOR.alder],
    facade_color: [BODY_COLOR.sonoma_oak],
    size: '',
    width: '100',
    height: '90',
    depth: '45',
    weight: '54',
    build_option: [TAGS.two_shelves, TAGS.eight_shuffles],
    body_material: [BODY_MATERIAL.chipboard],
    facade_material: [BODY_MATERIAL.chipboard],
    equipment: '',
    additional_information: '',
    category: '',
    vendor_code: '',
    tags: [TAGS.two_shelves, TAGS.eight_shuffles, TAGS.one_hundred_twenty, TAGS.with_shelf],

};

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
if ((last_state === null) || (last_state === undefined) || (last_state.length == 0)) {
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
//console.log(website_lang);

window.addEventListener('load', () => {
    change_lang(website_lang);
    fill_info();
    //add_dropdown_catalog(website_lang);
    //show_start_page();
    //show_what_need_know();
    //show_product_info(temp_obj);
    add_dropdown_catalog(website_lang);
    add_dropdown_tags(website_lang);

    show_start_page();
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

const search_form = document.getElementById('search_input');
search_form.addEventListener('focus', search_activation, true);
search_form.addEventListener('blur', search_blur, true);
search_form.addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
        search();
    }
});

const go_top_button = document.getElementById('back_to_top');

window.addEventListener('scroll', scroll_button);
go_top_button.addEventListener('click', back_top);