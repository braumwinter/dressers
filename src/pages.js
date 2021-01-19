import {
    WEBSITE_INFO
} from './lang.js';

import {
    DRESSERS
} from './dressers.js';

import {
    product_card_create,
    catalog_card_create
} from './card.js';

export function show_favorites() {
    const favorites_dressers = JSON.parse(localStorage.getItem('favorites_dressers'));
    const main = document.getElementById('main');
    const lang = document.getElementById('show_language').dataset.lang;

    if ((favorites_dressers === null) || (favorites_dressers === undefined)) {
        main.innerHTML = '';
        main.innerHTML = WEBSITE_INFO.no_chosen_one[lang];
    } else {
        main.innerHTML = '';
        main.innerHTML = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
    }
}

export function show_start_page() {
    const lang = document.getElementById('show_language').dataset.lang;
    const catalog = [];
    const div = document.getElementById('main');

    for (const key in DRESSERS) {
        const category = DRESSERS[key];
        for (const product in category) {
            //console.log(product);
            if (product == 0) {
                catalog.push(category[product]);
            }

            if (product == 1) {
                catalog.push(category[product].card_img);
            }
        }
    }

    highlight_menu_item('menu_main');
    catalog_card_create(catalog);
}

export function show_main(event) {
    const main = document.getElementById('main');
    main.innerHTML = 'main';

    highlight_menu_item('menu_main');
}

export function show_catalog(event) {
    const lang = document.getElementById('show_language').dataset.lang;
    const catalog = [];
    const div = document.getElementById('main');

    for (const key in DRESSERS) {
        const category = DRESSERS[key];
        for (const product in category) {
            //console.log(product);
            if (product == 0) {
                catalog.push(category[product]);
            }

            if (product == 1) {
                catalog.push(category[product].card_img);
            }
        }
    }

    highlight_menu_item('menu_catalog');

    catalog_card_create(catalog);
}

export function show_all_goods() {
    const main = document.getElementById('main');

    const catalog = [];

    for (const key in DRESSERS) {
        const category = DRESSERS[key];
        for (const product in category) {
            if (product != 0) {
                catalog.push(product_card_create(category[product]));
            }
        }
    }

    highlight_menu_item('menu_all_goods');

    catalog.forEach(function (item) {
        main.appendChild(item);
    });
}

export function show_what_need_know() {
    const main = document.getElementById('main');
    main.innerHTML = 'show_what_need_know';

    highlight_menu_item('menu_what_need_know');
}

export function show_our_address() {
    const main = document.getElementById('main');
    main.innerHTML = 'our_address';

    highlight_menu_item('menu_our_address');
}

export function highlight_menu_item(menu_item_id) {
    const menu_items = document.querySelectorAll('.menu_item');
    //console.log(menu_items);

    menu_items.forEach(function (item) {
        if(item.id == menu_item_id) {
            item.classList.add('menu_item_active');
        } else {
            item.classList.remove('menu_item_active');
        }
    });
  }