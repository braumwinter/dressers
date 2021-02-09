import {
    HEADER_EMAIL,
    HEADER_PHONE
} from './lang.js';

import {
    DRESSERS
} from './dressers.js';

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

export function add_dropdown_catalog(website_lang) {
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
                catalog_item.push(category[product].card_img);
                catalog_item.push(category[product].roller_guides);
                catalog_item.push([category[product].width, category[product].height, category[product].depth]);
                catalog_list.push(catalog_item);
                catalog_item = [];
            }
        }
    }

    console.log(catalog_list);
}