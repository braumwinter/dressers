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

const MAIN_PAGE = 'main_page';
const CATALOG_PAGE = 'catalog_page';
const ALL_PRODUCT_PAGE = 'all_catalog_page';

export function highlight_menu_item(menu_item_id) {
    const menu_items = document.querySelectorAll('.menu_item');
    //console.log(menu_items);

    menu_items.forEach(function (item) {
        if (item.id == menu_item_id) {
            item.classList.add('menu_item_active');
        } else {
            item.classList.remove('menu_item_active');
        }
    });
}


export function show_favorites() {
    const favorites_dressers = JSON.parse(localStorage.getItem('favorites_dressers'));
    const main = document.getElementById('main');
    const lang = document.getElementById('show_language').dataset.lang;

    highlight_menu_item('no_light');

    show_pages_links();

    if ((favorites_dressers === null) || (favorites_dressers === undefined)) {
        main.innerHTML = '';
        main.innerHTML = WEBSITE_INFO.no_chosen_one[lang];
    } else {
        main.innerHTML = '';
        main.innerHTML = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
    }

    main.dataset.page = MAIN_PAGE;
    const pages_links = document.getElementById('pages_links');
}

export function show_start_page() {
    const lang = document.getElementById('show_language').dataset.lang;
    const catalog = [];
    const main = document.getElementById('main');
    main.innerHTML = '';

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

    main.dataset.page = MAIN_PAGE;
    show_pages_links();
    highlight_menu_item('menu_main');
    catalog_card_create(catalog);
}

export function show_main(event) {
    const main = document.getElementById('main');
    main.innerHTML = '';
    main.innerHTML = 'main';
    console.log(main.dataset.page);
    show_pages_links();

    main.dataset.page = MAIN_PAGE;
    highlight_menu_item('menu_main');
}

export function show_catalog(event) {
    const lang = document.getElementById('show_language').dataset.lang;
    const catalog = [];
    const main = document.getElementById('main');
    main.innerHTML = '';
    console.log(main.dataset.page);
    show_pages_links();

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

    main.dataset.page = CATALOG_PAGE;
    highlight_menu_item('menu_catalog');

    catalog_card_create(catalog);
}

export function show_all_goods() {
    const main = document.getElementById('main');
    main.innerHTML = '';
    show_pages_links();

    const catalog = [];

    for (const key in DRESSERS) {
        const category = DRESSERS[key];
        for (const product in category) {
            if (product != 0) {
                catalog.push(product_card_create(category[product]));
            }
        }
    }

    main.dataset.page = ALL_PRODUCT_PAGE;
    highlight_menu_item('menu_all_goods');

    catalog.forEach(function (item) {
        main.appendChild(item);
    });
}

export function show_what_need_know() {
    const main = document.getElementById('main');
    main.innerHTML = '';
    main.innerHTML = 'show_what_need_know';
    show_pages_links();

    highlight_menu_item('menu_what_need_know');
}

export function show_our_address() {
    const main = document.getElementById('main');
    main.innerHTML = '';
    main.innerHTML = 'our_address';
    show_pages_links();

    highlight_menu_item('menu_our_address');
}

export function show_product(obj) {

}

export function show_pages_links() {
    const main = document.getElementById('main');
    const data_page = main.dataset.page;

    const pages_links = document.getElementById('pages_links');
    const lang = document.getElementById('show_language').dataset.lang.toLocaleLowerCase();

    const arrow_link = document.createElement('a');
    arrow_link.className = 'arrow_link';
    arrow_link.innerHTML = ' > ';

    switch (data_page) {
        case MAIN_PAGE: {
            console.log(MAIN_PAGE);
            const main_page_link = document.createElement('a');
            main_page_link.className = 'pages_link'
            main_page_link.innerHTML = WEBSITE_INFO.main_page[lang];
            main_page_link.onclick = function () {
                show_main();
            };
            pages_links.appendChild(main_page_link);
            pages_links.appendChild(arrow_link);
            break;
        };
    case CATALOG_PAGE: {
        console.log(CATALOG_PAGE);
        break;
    };
    case ALL_PRODUCT_PAGE: {
        console.log(ALL_PRODUCT_PAGE);
        break;
    };
    default: {
        console.log('пиши функцию!!!!');
    }
    }
}