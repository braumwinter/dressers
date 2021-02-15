import {
    HEADER_EMAIL,
    HEADER_PHONE,
    CURRENCY_UNIT,
    WEBSITE_INFO,
    TAGS
} from './lang.js';

import {
    DRESSERS
} from './dressers.js';

import {
    show_category,
    show_tags
} from './pages.js';

const EN_LANG = 'en';
const PL_LANG = 'pl';
const RU_LANG = 'ru';

export function fill_info() {
    const header_phone = document.getElementById('header_phone');
    header_phone.href = 'tel:' + HEADER_PHONE;

    const header_phone_number = document.getElementById('header_phone_number');
    header_phone_number.innerHTML = HEADER_PHONE;

    const header_email = document.getElementById('header_email');
    header_email.href = 'mailto:' + HEADER_EMAIL;

    const header_email_address = document.getElementById('header_email_address');
    header_email_address.innerHTML = HEADER_EMAIL;

    const footer_phone = document.getElementById('footer_phone');
    footer_phone.href = 'tel:' + HEADER_PHONE;

    const footer_phone_number = document.getElementById('footer_phone_number');
    footer_phone_number.innerHTML = HEADER_PHONE;
}

export function add_dropdown_catalog(website_lang) {
    const lang = document.getElementById('show_language').dataset.lang.toLocaleLowerCase() || document.getElementById('show_language').innerHTML.toLocaleLowerCase();
    const dropdown_catalog = document.getElementById('dropdown_catalog');

    let catalog_item = [];
    const catalog_list = [];

    for (const key in DRESSERS) {
        const category = DRESSERS[key];
        for (const product in category) {
            //console.log(product);
            if (product == 0) {
                catalog_item.push(category[product]);
                //name = category[product];
            }

            if (product == 1) {
                //catalog_item.push(category[product].card_img);
                catalog_item.push(category[product].roller_guides);
                catalog_item.push([category[product].width, category[product].height, category[product].depth]);
                catalog_list.push(catalog_item);
                catalog_item = [];
            }
        }
    }

    //console.log(catalog_list);

    catalog_list.forEach(function (item) {
        //console.log(item);

        const str_cost = ' - ' + item[1] + ' ' + CURRENCY_UNIT + ' (';
        const str_size = ': ' + item[2][0] + 'x' + item[2][1] + 'x' + item[2][2];

        const dropdown_item = document.createElement('li');
        dropdown_item.className = 'dropdown_menu_item';
        dropdown_item.innerHTML = item[0][lang] + str_cost + WEBSITE_INFO.whd_short[lang] + str_size + WEBSITE_INFO.cm[lang] + ')';
        dropdown_item.dataset.en = item[0][EN_LANG] + str_cost + WEBSITE_INFO.whd_short[EN_LANG] + str_size + WEBSITE_INFO.cm[EN_LANG] + ')';
        dropdown_item.dataset.pl = item[0][PL_LANG] + str_cost + WEBSITE_INFO.whd_short[PL_LANG] + str_size + WEBSITE_INFO.cm[PL_LANG] + ')';
        dropdown_item.dataset.ru = item[0][RU_LANG] + str_cost + WEBSITE_INFO.whd_short[RU_LANG] + str_size + WEBSITE_INFO.cm[RU_LANG] + ')';
        dropdown_item.onclick = function () {
            show_category(item[0]);
        }

        dropdown_catalog.appendChild(dropdown_item);
    });
}

export function add_dropdown_tags(website_lang) {
    const lang = document.getElementById('show_language').dataset.lang.toLocaleLowerCase() || document.getElementById('show_language').innerHTML.toLocaleLowerCase();
    const dropdown_tags = document.getElementById('dropdown_tags');

    for (const key in TAGS) {
        const tag = TAGS[key];

        const dropdown_item = document.createElement('li');
        dropdown_item.className = 'dropdown_menu_item';
        dropdown_item.innerHTML = tag[lang];
        dropdown_item.dataset.en = tag[EN_LANG];
        dropdown_item.dataset.pl = tag[PL_LANG];
        dropdown_item.dataset.ru = tag[RU_LANG];
        dropdown_item.onclick = function () {
            show_tags(tag);
        }

        dropdown_tags.appendChild(dropdown_item);
    }
}