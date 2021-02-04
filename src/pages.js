import {
    WEBSITE_INFO,
    DELIVERY_CITY_EN,
    DELIVERY_CITY_PL,
    DELIVERY_CITY_RU,
    COST_DELIVERY_ENTRANCE,
    COST_DELIVERY_APARTMENT,
    COST_DELIVERY_ANY_LOCATION,
    DELIVERY_COUNTRY_EN,
    DELIVERY_COUNTRY_PL,
    DELIVERY_COUNTRY_RU,
    WARRANTY_EN,
    WARRANTY_PL,
    WARRANTY_RU,
    BODY_COLOR
} from './lang.js';

import {
    DRESSERS
} from './dressers.js';

import {
    product_card_create,
    catalog_card_create
} from './card.js';

import {
    change_lang2
} from './change_lang.js';

const path_img_color = './assets/img/';

const MAIN_PAGE = 'main_page';
const CATALOG_PAGE = 'catalog_page';
const ALL_PRODUCT_PAGE = 'all_catalog_page';

const EN_LANG = 'en';
const PL_LANG = 'pl';
const RU_LANG = 'ru';

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
    const lang = document.getElementById('show_language').dataset.lang.toLocaleLowerCase() || document.getElementById('show_language').innerHTML.toLocaleLowerCase();

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
    const lang = document.getElementById('show_language').dataset.lang.toLocaleLowerCase() || document.getElementById('show_language').innerHTML.toLocaleLowerCase();
    const catalog = [];
    const main = document.getElementById('main');
    main.innerHTML = '';

    let catalog_item = [];

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
                catalog_item.push(category.length - 1)
                catalog.push(catalog_card_create(catalog_item));
                catalog_item = [];
            }
        }
    }

    main.dataset.page = MAIN_PAGE;
    show_pages_links();
    highlight_menu_item('menu_main');
    catalog.forEach(function (item) {
        main.appendChild(item);
    });
}

export function show_main(event) {
    const main = document.getElementById('main');
    main.innerHTML = '';

    console.log(main.dataset.page);
    show_pages_links();

    let catalog_item = [];

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
                catalog_item.push(category.length - 1)
                catalog.push(catalog_card_create(catalog_item));
                catalog_item = [];
            }
        }
    }

    main.dataset.page = MAIN_PAGE;
    show_pages_links();
    highlight_menu_item('menu_main');
    catalog.forEach(function (item) {
        main.appendChild(item);
    });
}

export function show_catalog() {
    const lang = document.getElementById('show_language').dataset.lang.toLocaleLowerCase() || document.getElementById('show_language').innerHTML.toLocaleLowerCase();
    const catalog = [];
    const main = document.getElementById('main');
    main.innerHTML = '';
    console.log(main.dataset.page);
    show_pages_links();

    let catalog_item = [];

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
                catalog_item.push(category.length - 1)
                catalog.push(catalog_card_create(catalog_item));
                catalog_item = [];
            }
        }
    }

    main.dataset.page = CATALOG_PAGE;
    highlight_menu_item('menu_catalog');

    catalog.forEach(function (item) {
        main.appendChild(item);
    });

    //change_lang2();
    //catalog_card_create(catalog);
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
    const lang = document.getElementById('show_language').dataset.lang.toLocaleLowerCase() || document.getElementById('show_language').innerHTML.toLocaleLowerCase();
    const main = document.getElementById('main');
    main.innerHTML = '';
    //main.innerHTML = 'show_what_need_know';
    show_pages_links();

    /* header */

    /*const page_header = document.createElement('h3');
    page_header.className = 'page_header';
    page_header.innerHTML = WEBSITE_INFO.what_you_need_know[lang];
    page_header.dataset.en = WEBSITE_INFO.what_you_need_know[EN_LANG];
    page_header.dataset.pl = WEBSITE_INFO.what_you_need_know[PL_LANG];
    page_header.dataset.ru = WEBSITE_INFO.what_you_need_know[RU_LANG];
    main.appendChild(page_header);*/

    /* delivery */
    const delivery_header = document.createElement('p');
    delivery_header.className = 'know_header';
    delivery_header.innerHTML = WEBSITE_INFO.delivery[lang];
    delivery_header.dataset.en = WEBSITE_INFO.delivery[EN_LANG];
    delivery_header.dataset.pl = WEBSITE_INFO.delivery[PL_LANG];
    delivery_header.dataset.ru = WEBSITE_INFO.delivery[RU_LANG];
    main.appendChild(delivery_header);

    const delivery_div = document.createElement('div');
    delivery_div.className = 'know_div';

    let delivery_p_0_lang;

    if (lang === PL_LANG) {
        delivery_p_0_lang = DELIVERY_CITY_PL;
    } else if (lang === RU_LANG) {
        delivery_p_0_lang = DELIVERY_CITY_RU;
    } else {
        delivery_p_0_lang = DELIVERY_CITY_EN;
    }

    const delivery_p_0 = document.createElement('p');
    delivery_p_0.className = 'know_p';
    delivery_p_0.innerHTML = WEBSITE_INFO.paragraph_15[lang] + ' ' + delivery_p_0_lang;
    delivery_p_0.dataset.en = WEBSITE_INFO.paragraph_15[EN_LANG] + ' ' + DELIVERY_CITY_EN;
    delivery_p_0.dataset.pl = WEBSITE_INFO.paragraph_15[PL_LANG] + ' ' + DELIVERY_CITY_EN;
    delivery_p_0.dataset.ru = WEBSITE_INFO.paragraph_15[RU_LANG] + ' ' + DELIVERY_CITY_EN;
    delivery_div.appendChild(delivery_p_0);

    const delivery_ul = document.createElement('ul');
    delivery_ul.className = 'know_ul';

    const delivery_li_0 = document.createElement('li');
    delivery_li_0.className = 'know_li';
    delivery_li_0.innerHTML = WEBSITE_INFO.paragraph_16[lang] + ' ' + COST_DELIVERY_ENTRANCE;
    delivery_li_0.dataset.en = WEBSITE_INFO.paragraph_16[EN_LANG] + ' ' + COST_DELIVERY_ENTRANCE;
    delivery_li_0.dataset.pl = WEBSITE_INFO.paragraph_16[PL_LANG] + ' ' + COST_DELIVERY_ENTRANCE;
    delivery_li_0.dataset.ru = WEBSITE_INFO.paragraph_16[RU_LANG] + ' ' + COST_DELIVERY_ENTRANCE;
    delivery_ul.appendChild(delivery_li_0);

    const delivery_li_1 = document.createElement('li');
    delivery_li_1.className = 'know_li';
    delivery_li_1.innerHTML = WEBSITE_INFO.paragraph_17[lang] + ' ' + COST_DELIVERY_APARTMENT;
    delivery_li_1.dataset.en = WEBSITE_INFO.paragraph_17[EN_LANG] + ' ' + COST_DELIVERY_APARTMENT;
    delivery_li_1.dataset.pl = WEBSITE_INFO.paragraph_17[PL_LANG] + ' ' + COST_DELIVERY_APARTMENT;
    delivery_li_1.dataset.ru = WEBSITE_INFO.paragraph_17[RU_LANG] + ' ' + COST_DELIVERY_APARTMENT;
    delivery_ul.appendChild(delivery_li_1);

    let delivery_li_2_lang;

    if (lang === PL_LANG) {
        delivery_li_2_lang = DELIVERY_CITY_PL;
    } else if (lang === RU_LANG) {
        delivery_li_2_lang = DELIVERY_CITY_RU;
    } else {
        delivery_li_2_lang = DELIVERY_CITY_EN;
    }

    const delivery_li_2 = document.createElement('li');
    delivery_li_2.className = 'know_li';
    delivery_li_2.innerHTML = delivery_li_2_lang + ' ' + WEBSITE_INFO.paragraph_18[lang] + ' ' + COST_DELIVERY_ANY_LOCATION;
    delivery_li_2.dataset.en = DELIVERY_COUNTRY_EN + ' ' + WEBSITE_INFO.paragraph_18[EN_LANG] + ' ' + COST_DELIVERY_ANY_LOCATION;
    delivery_li_2.dataset.pl = DELIVERY_COUNTRY_EN + ' ' + WEBSITE_INFO.paragraph_18[PL_LANG] + ' ' + COST_DELIVERY_ANY_LOCATION;
    delivery_li_2.dataset.ru = DELIVERY_COUNTRY_EN + ' ' + WEBSITE_INFO.paragraph_18[RU_LANG] + ' ' + COST_DELIVERY_ANY_LOCATION;
    delivery_ul.appendChild(delivery_li_2);

    let delivery_li_3_lang;

    if (lang === PL_LANG) {
        delivery_li_3_lang = WARRANTY_PL;
    } else if (lang === RU_LANG) {
        delivery_li_3_lang = WARRANTY_RU;
    } else {
        delivery_li_3_lang = WARRANTY_EN;
    }

    const delivery_li_3 = document.createElement('li');
    delivery_li_3.className = 'know_li';
    delivery_li_3.innerHTML = delivery_li_3_lang;
    delivery_li_3.dataset.en = WARRANTY_EN;
    delivery_li_3.dataset.pl = WARRANTY_PL;
    delivery_li_3.dataset.ru = WARRANTY_RU;
    delivery_ul.appendChild(delivery_li_3);

    delivery_div.appendChild(delivery_ul);
    main.appendChild(delivery_div);

    /* color */

    const color_header = document.createElement('p');
    color_header.className = 'know_header';
    color_header.innerHTML = WEBSITE_INFO.chipboard_colors[lang];
    color_header.dataset.en = WEBSITE_INFO.chipboard_colors[EN_LANG];
    color_header.dataset.pl = WEBSITE_INFO.chipboard_colors[PL_LANG];
    color_header.dataset.ru = WEBSITE_INFO.chipboard_colors[RU_LANG];
    main.appendChild(color_header);

    const color_div = document.createElement('div');
    color_div.className = 'know_div_color';

    for (const key in BODY_COLOR) {
        const card_info = BODY_COLOR[key];

        const color_card = document.createElement('figure');
        color_card.className = 'color_card';

        const color_img = document.createElement('img');
        color_img.className = 'color_img';
        color_img.src = path_img_color + card_info.img;
        color_img.alt = card_info.en;
        color_card.appendChild(color_img);

        let color_img_text_lang;

        if (lang === PL_LANG) {
            color_img_text_lang = card_info.pl;
        } else if (lang === RU_LANG) {
            color_img_text_lang = card_info.ru;
        } else {
            color_img_text_lang = card_info.en;
        }

        const color_img_text = document.createElement('figcaption');
        color_img_text.className = 'color_img_text';
        color_img_text.innerHTML = color_img_text_lang;
        color_img_text.dataset.en = card_info.en;
        color_img_text.dataset.pl = card_info.pl;
        color_img_text.dataset.ru = card_info.ru;
        color_card.appendChild(color_img_text);

        color_card.onclick = function(){
            show_image(color_img.src);
        }

        color_div.appendChild(color_card);
    }

    main.appendChild(color_div);

    /* equipment */

    const equipment_header = document.createElement('h3');
    equipment_header.className = 'know_header';
    equipment_header.innerHTML = WEBSITE_INFO.equipment[lang];
    equipment_header.dataset.en = WEBSITE_INFO.equipment[EN_LANG];
    equipment_header.dataset.pl = WEBSITE_INFO.equipment[PL_LANG];
    equipment_header.dataset.ru = WEBSITE_INFO.equipment[RU_LANG];
    main.appendChild(equipment_header);

    /* */
    const equipment_roller_div = document.createElement('div');
    equipment_roller_div.className = 'know_roller_div';

    const equipment_roller_img = document.createElement('img');
    equipment_roller_img.className = 'know_roller_img';
    equipment_roller_img.src = path_img_color + 'roller_guides.png';
    equipment_roller_img.alt = 'roller guides';
    equipment_roller_div.appendChild(equipment_roller_img);

    main.appendChild(equipment_roller_div);

    const equipment_roller_div_text = document.createElement('div');
    equipment_roller_div_text.className = 'equipment_div_text';

    const equipment_roller_text_p_center = document.createElement('p');
    equipment_roller_text_p_center.className = 'equipment_div_text_center';
    equipment_roller_text_p_center.innerHTML = WEBSITE_INFO.paragraph_0[lang];
    equipment_roller_text_p_center.dataset.en = WEBSITE_INFO.paragraph_0[EN_LANG];
    equipment_roller_text_p_center.dataset.pl = WEBSITE_INFO.paragraph_0[PL_LANG];
    equipment_roller_text_p_center.dataset.ru = WEBSITE_INFO.paragraph_0[RU_LANG];
    main.appendChild(equipment_roller_text_p_center);

    const equipment_roller_text = document.createElement('div');
    equipment_roller_text.className = 'equipment_text';

    const equipment_roller_text_p0 = document.createElement('p');
    equipment_roller_text_p0.className = 'equipment_text_p';
    equipment_roller_text_p0.innerHTML = WEBSITE_INFO.paragraph_1[lang];
    equipment_roller_text_p0.dataset.en = WEBSITE_INFO.paragraph_1[EN_LANG];
    equipment_roller_text_p0.dataset.pl = WEBSITE_INFO.paragraph_1[PL_LANG];
    equipment_roller_text_p0.dataset.ru = WEBSITE_INFO.paragraph_1[RU_LANG];
    equipment_roller_text.appendChild(equipment_roller_text_p0);

    const equipment_roller_text_p1 = document.createElement('p');
    equipment_roller_text_p1.className = 'equipment_text_p';
    equipment_roller_text_p1.innerHTML = WEBSITE_INFO.paragraph_2[lang];
    equipment_roller_text_p1.dataset.en = WEBSITE_INFO.paragraph_2[EN_LANG];
    equipment_roller_text_p1.dataset.pl = WEBSITE_INFO.paragraph_2[PL_LANG];
    equipment_roller_text_p1.dataset.ru = WEBSITE_INFO.paragraph_2[RU_LANG];
    equipment_roller_text.appendChild(equipment_roller_text_p1);

    const equipment_roller_text_p2 = document.createElement('p');
    equipment_roller_text_p2.className = 'equipment_text_p';
    equipment_roller_text_p2.innerHTML = WEBSITE_INFO.paragraph_3[lang];
    equipment_roller_text_p2.dataset.en = WEBSITE_INFO.paragraph_3[EN_LANG];
    equipment_roller_text_p2.dataset.pl = WEBSITE_INFO.paragraph_3[PL_LANG];
    equipment_roller_text_p2.dataset.ru = WEBSITE_INFO.paragraph_3[RU_LANG];
    equipment_roller_text.appendChild(equipment_roller_text_p2);

    main.appendChild(equipment_roller_text);

    const equipment_roller_text_akcent = document.createElement('p');
    equipment_roller_text_akcent.className = 'equipment_text_p_akcent';
    equipment_roller_text_akcent.innerHTML = WEBSITE_INFO.paragraph_4[lang];
    equipment_roller_text_akcent.dataset.en = WEBSITE_INFO.paragraph_4[EN_LANG];
    equipment_roller_text_akcent.dataset.pl = WEBSITE_INFO.paragraph_4[PL_LANG];
    equipment_roller_text_akcent.dataset.ru = WEBSITE_INFO.paragraph_4[RU_LANG];
    main.appendChild(equipment_roller_text_akcent);

    /* */
    const equipment_ball_div = document.createElement('div');
    equipment_ball_div.className = 'know_roller_div';

    const equipment_ball_img = document.createElement('img');
    equipment_ball_img.className = 'know_roller_img';
    equipment_ball_img.src = path_img_color + 'ball_guides.jpg';
    equipment_ball_img.alt = 'ball guides';
    equipment_ball_div.appendChild(equipment_ball_img);

    main.appendChild(equipment_ball_div);

    /*const equipment_ball_div_text = document.createElement('div');
    equipment_ball_div_text.className = 'equipment_div_text';*/

    const equipment_ball_text_p_center = document.createElement('p');
    equipment_ball_text_p_center.className = 'equipment_div_text_center';
    equipment_ball_text_p_center.innerHTML = WEBSITE_INFO.paragraph_5[lang];
    equipment_ball_text_p_center.dataset.en = WEBSITE_INFO.paragraph_5[EN_LANG];
    equipment_ball_text_p_center.dataset.pl = WEBSITE_INFO.paragraph_5[PL_LANG];
    equipment_ball_text_p_center.dataset.ru = WEBSITE_INFO.paragraph_5[RU_LANG];
    main.appendChild(equipment_ball_text_p_center);

    const equipment_ball_text = document.createElement('div');
    equipment_ball_text.className = 'equipment_text';

    const equipment_ball_text_p0 = document.createElement('p');
    equipment_ball_text_p0.className = 'equipment_text_p';
    equipment_ball_text_p0.innerHTML = WEBSITE_INFO.paragraph_6[lang];
    equipment_ball_text_p0.dataset.en = WEBSITE_INFO.paragraph_6[EN_LANG];
    equipment_ball_text_p0.dataset.pl = WEBSITE_INFO.paragraph_6[PL_LANG];
    equipment_ball_text_p0.dataset.ru = WEBSITE_INFO.paragraph_6[RU_LANG];
    equipment_ball_text.appendChild(equipment_ball_text_p0);

    const equipment_ball_ul = document.createElement('ul');
    equipment_ball_ul.className = 'know_ul';

    const equipment_ball_li_0 = document.createElement('li');
    equipment_ball_li_0.className = 'know_li';
    equipment_ball_li_0.innerHTML = WEBSITE_INFO.paragraph_7[lang];
    equipment_ball_li_0.dataset.en = WEBSITE_INFO.paragraph_7[EN_LANG];
    equipment_ball_li_0.dataset.pl = WEBSITE_INFO.paragraph_7[PL_LANG];
    equipment_ball_li_0.dataset.ru = WEBSITE_INFO.paragraph_7[RU_LANG];
    equipment_ball_ul.appendChild(equipment_ball_li_0);

    const equipment_ball_li_1 = document.createElement('li');
    equipment_ball_li_1.className = 'know_li';
    equipment_ball_li_1.innerHTML = WEBSITE_INFO.paragraph_8[lang];
    equipment_ball_li_1.dataset.en = WEBSITE_INFO.paragraph_8[EN_LANG];
    equipment_ball_li_1.dataset.pl = WEBSITE_INFO.paragraph_8[PL_LANG];
    equipment_ball_li_1.dataset.ru = WEBSITE_INFO.paragraph_8[RU_LANG];
    equipment_ball_ul.appendChild(equipment_ball_li_1);

    const equipment_ball_li_2 = document.createElement('li');
    equipment_ball_li_2.className = 'know_li';
    equipment_ball_li_2.innerHTML = WEBSITE_INFO.paragraph_9[lang];
    equipment_ball_li_2.dataset.en = WEBSITE_INFO.paragraph_9[EN_LANG];
    equipment_ball_li_2.dataset.pl = WEBSITE_INFO.paragraph_9[PL_LANG];
    equipment_ball_li_2.dataset.ru = WEBSITE_INFO.paragraph_9[RU_LANG];
    equipment_ball_ul.appendChild(equipment_ball_li_2);

    const equipment_ball_li_3 = document.createElement('li');
    equipment_ball_li_3.className = 'know_li';
    equipment_ball_li_3.innerHTML = WEBSITE_INFO.paragraph_10[lang];
    equipment_ball_li_3.dataset.en = WEBSITE_INFO.paragraph_10[EN_LANG];
    equipment_ball_li_3.dataset.pl = WEBSITE_INFO.paragraph_10[PL_LANG];
    equipment_ball_li_3.dataset.ru = WEBSITE_INFO.paragraph_10[RU_LANG];
    equipment_ball_ul.appendChild(equipment_ball_li_3);

    const equipment_ball_li_4 = document.createElement('li');
    equipment_ball_li_4.className = 'know_li';
    equipment_ball_li_4.innerHTML = WEBSITE_INFO.paragraph_11[lang];
    equipment_ball_li_4.dataset.en = WEBSITE_INFO.paragraph_11[EN_LANG];
    equipment_ball_li_4.dataset.pl = WEBSITE_INFO.paragraph_11[PL_LANG];
    equipment_ball_li_4.dataset.ru = WEBSITE_INFO.paragraph_11[RU_LANG];
    equipment_ball_ul.appendChild(equipment_ball_li_4);

    equipment_ball_text.appendChild(equipment_ball_ul);
    main.appendChild(equipment_ball_text);



    highlight_menu_item('menu_what_need_know');
}

export function show_our_address() {
    const main = document.getElementById('main');
    main.innerHTML = '';
    main.innerHTML = 'our_address';
    show_pages_links();

    highlight_menu_item('menu_our_address');
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

export function show_products(array) {
    const main = document.getElementById('main');
    main.innerHTML = '';
    show_pages_links();

    const catalog = [];

    for (const key in DRESSERS) {
        const category = DRESSERS[key];
        if (category[0] === array) {
            for (const product in category) {
                if (product != 0) {
                    catalog.push(product_card_create(category[product]));
                }
            }
        }
    }

    main.dataset.page = ALL_PRODUCT_PAGE;
    highlight_menu_item('menu_all_goods');

    catalog.forEach(function (item) {
        main.appendChild(item);
    });
}

export function show_image(path) {
    const main = document.getElementById('main');
    const lang = document.getElementById('show_language').dataset.lang.toLocaleLowerCase() || document.getElementById('show_language').innerHTML.toLocaleLowerCase();

    console.log(path);

    /* background: rgba(0, 170, 238, 0.9); */
    const shadow = document.createElement('div');
}

export function show_product_info(obj) {
    console.log(obj);
}