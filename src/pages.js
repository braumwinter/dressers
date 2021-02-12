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
    BODY_COLOR,
    CURRENCY_UNIT,
    COST_REPLACING_BALL_GUIDES
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
const path_img = './assets/product/';

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
    const favorites_dressers = localStorage.getItem('favorites_dressers');
    const main = document.getElementById('main');
    const lang = document.getElementById('show_language').dataset.lang.toLocaleLowerCase() || document.getElementById('show_language').innerHTML.toLocaleLowerCase();

    highlight_menu_item('no_light');

    show_pages_links();

    if ((favorites_dressers === null) || (favorites_dressers === undefined) || (favorites_dressers.length == 0)) {
        main.innerHTML = '';

        const no_chosen_one = document.createElement('p');
        no_chosen_one.className = 'no_chosen_one';
        no_chosen_one.innerHTML = WEBSITE_INFO.no_chosen_one[lang];
        no_chosen_one.dataset.en = WEBSITE_INFO.no_chosen_one[EN_LANG];
        no_chosen_one.dataset.pl = WEBSITE_INFO.no_chosen_one[PL_LANG];
        no_chosen_one.dataset.ru = WEBSITE_INFO.no_chosen_one[RU_LANG];
        main.appendChild(no_chosen_one);

        return;
    }

    const info_arr = favorites_dressers.split(',');
    const info_structure = [];

    if ((favorites_dressers === null) || (favorites_dressers === null)) {
        //console.log(is_found);
        return is_found;
    }

    for (let i = 0; i < info_arr.length; i = i + 4) {
        const obj = {};
        obj[EN_LANG] = info_arr[i];
        obj[PL_LANG] = info_arr[i + 1];
        obj[RU_LANG] = info_arr[i + 2];

        info_structure.push(obj);
        info_structure.push(info_arr[i + 3]);
    }

    //console.log(info_structure);

    const catalog = [];

    for (const key in DRESSERS) {
        const category = DRESSERS[key];
        for (const product in category) {
            if (product != 0) {
                const product_info = category[product];
                //console.log(product_info);
                for (let i = 0; i < info_structure.length; i = i + 2) {
                    let is_first_equal = false;
                    let is_second_equal = false;
                    let is_third_equal = false;
                    let is_fourth_equal = false;

                    //console.log(info_structure[i][EN_LANG], product_info.category_name[EN_LANG]);
                    if (info_structure[i][EN_LANG] == product_info.category_name[EN_LANG]) {
                        //console.log('yes');
                        is_first_equal = true;
                    }
                    if (info_structure[i][PL_LANG] == product_info.category_name[PL_LANG]) {
                        //console.log('yes');
                        is_second_equal = true;
                    }
                    if (info_structure[i][RU_LANG] == product_info.category_name[RU_LANG]) {
                        //console.log('yes');
                        is_third_equal = true;
                    }

                    //console.log(info_structure[i][EN_LANG], product_info.category_name[EN_LANG]);
                    if (info_structure[i + 1] == product_info.name) {
                        //console.log('yes');
                        is_fourth_equal = true;
                    }

                    if (is_first_equal && is_second_equal && is_third_equal && is_fourth_equal) {
                        //console.log('yes');
                        catalog.push(product_card_create(category[product]));
                    }
                }

            }
        }
    }

    main.innerHTML = '';
    catalog.forEach(function (item) {
        main.appendChild(item);
    });

    const remove_everything_favorites_div = document.createElement('div');
    remove_everything_favorites_div.className = 'remove_everything_favorites_div';

    const remove_everything_favorites_button = document.createElement('button');
    remove_everything_favorites_button.className = 'remove_everything_favorites_button';
    remove_everything_favorites_button.innerHTML = WEBSITE_INFO.remove_everything_favorites[lang];
    remove_everything_favorites_button.dataset.en = WEBSITE_INFO.remove_everything_favorites[EN_LANG];
    remove_everything_favorites_button.dataset.pl = WEBSITE_INFO.remove_everything_favorites[PL_LANG];
    remove_everything_favorites_button.dataset.ru = WEBSITE_INFO.remove_everything_favorites[RU_LANG];
    remove_everything_favorites_button.onclick = function () {
        const delete_question = WEBSITE_INFO.question_favorites[lang];
        const is_delete = confirm(delete_question);

        if (is_delete) {
            localStorage.setItem('favorites_dressers', '');
            main.innerHTML = '';

            const no_chosen_one = document.createElement('p');
            no_chosen_one.className = 'no_chosen_one';
            no_chosen_one.innerHTML = WEBSITE_INFO.no_chosen_one[lang];
            no_chosen_one.dataset.en = WEBSITE_INFO.no_chosen_one[EN_LANG];
            no_chosen_one.dataset.pl = WEBSITE_INFO.no_chosen_one[PL_LANG];
            no_chosen_one.dataset.ru = WEBSITE_INFO.no_chosen_one[RU_LANG];
            main.appendChild(no_chosen_one);
        }

    };
    remove_everything_favorites_div.appendChild(remove_everything_favorites_button);
    main.appendChild(remove_everything_favorites_div);


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

    //console.log(main.dataset.page);
    show_pages_links();

    const catalog = [];
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
    //console.log(main.dataset.page);
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
    delivery_li_0.innerHTML = WEBSITE_INFO.paragraph_16[lang] + ' ' + COST_DELIVERY_ENTRANCE + CURRENCY_UNIT;
    delivery_li_0.dataset.en = WEBSITE_INFO.paragraph_16[EN_LANG] + ' ' + COST_DELIVERY_ENTRANCE + CURRENCY_UNIT;
    delivery_li_0.dataset.pl = WEBSITE_INFO.paragraph_16[PL_LANG] + ' ' + COST_DELIVERY_ENTRANCE + CURRENCY_UNIT;
    delivery_li_0.dataset.ru = WEBSITE_INFO.paragraph_16[RU_LANG] + ' ' + COST_DELIVERY_ENTRANCE + CURRENCY_UNIT;
    delivery_ul.appendChild(delivery_li_0);

    const delivery_li_1 = document.createElement('li');
    delivery_li_1.className = 'know_li';
    delivery_li_1.innerHTML = WEBSITE_INFO.paragraph_17[lang] + ' ' + COST_DELIVERY_APARTMENT + CURRENCY_UNIT;
    delivery_li_1.dataset.en = WEBSITE_INFO.paragraph_17[EN_LANG] + ' ' + COST_DELIVERY_APARTMENT + CURRENCY_UNIT;
    delivery_li_1.dataset.pl = WEBSITE_INFO.paragraph_17[PL_LANG] + ' ' + COST_DELIVERY_APARTMENT + CURRENCY_UNIT;
    delivery_li_1.dataset.ru = WEBSITE_INFO.paragraph_17[RU_LANG] + ' ' + COST_DELIVERY_APARTMENT + CURRENCY_UNIT;
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
    delivery_li_2.innerHTML = delivery_li_2_lang + ' ' + WEBSITE_INFO.paragraph_18[lang] + ' ' + COST_DELIVERY_ANY_LOCATION + CURRENCY_UNIT;
    delivery_li_2.dataset.en = DELIVERY_COUNTRY_EN + ' ' + WEBSITE_INFO.paragraph_18[EN_LANG] + ' ' + COST_DELIVERY_ANY_LOCATION + CURRENCY_UNIT;
    delivery_li_2.dataset.pl = DELIVERY_COUNTRY_EN + ' ' + WEBSITE_INFO.paragraph_18[PL_LANG] + ' ' + COST_DELIVERY_ANY_LOCATION + CURRENCY_UNIT;
    delivery_li_2.dataset.ru = DELIVERY_COUNTRY_EN + ' ' + WEBSITE_INFO.paragraph_18[RU_LANG] + ' ' + COST_DELIVERY_ANY_LOCATION + CURRENCY_UNIT;
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

        color_card.onclick = function () {
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

    /*  */

    const know_additional_div = document.createElement('div');
    know_additional_div.className = 'know_additional_div';

    const know_additional_p0 = document.createElement('p');
    know_additional_p0.className = 'know_additional_p equipment_text_p_akcent';
    know_additional_p0.innerHTML = WEBSITE_INFO.paragraph_12[lang];
    know_additional_p0.dataset.en = WEBSITE_INFO.paragraph_12[EN_LANG];
    know_additional_p0.dataset.pl = WEBSITE_INFO.paragraph_12[PL_LANG];
    know_additional_p0.dataset.ru = WEBSITE_INFO.paragraph_12[RU_LANG];
    know_additional_div.appendChild(know_additional_p0);

    const know_additional_p1 = document.createElement('p');
    know_additional_p1.className = 'know_additional_p';
    know_additional_p1.innerHTML = WEBSITE_INFO.paragraph_13[lang] + COST_REPLACING_BALL_GUIDES + CURRENCY_UNIT;
    know_additional_p1.dataset.en = WEBSITE_INFO.paragraph_13[EN_LANG] + COST_REPLACING_BALL_GUIDES + CURRENCY_UNIT;
    know_additional_p1.dataset.pl = WEBSITE_INFO.paragraph_13[PL_LANG] + COST_REPLACING_BALL_GUIDES + CURRENCY_UNIT;
    know_additional_p1.dataset.ru = WEBSITE_INFO.paragraph_13[RU_LANG] + COST_REPLACING_BALL_GUIDES + CURRENCY_UNIT;
    know_additional_div.appendChild(know_additional_p1);

    const cost_four_shuflya = 4 * COST_REPLACING_BALL_GUIDES;

    const know_additional_p2 = document.createElement('p');
    know_additional_p2.className = 'know_additional_p';
    know_additional_p2.innerHTML = WEBSITE_INFO.paragraph_14[lang] + cost_four_shuflya + CURRENCY_UNIT;
    know_additional_p2.dataset.en = WEBSITE_INFO.paragraph_14[EN_LANG] + cost_four_shuflya + CURRENCY_UNIT;
    know_additional_p2.dataset.pl = WEBSITE_INFO.paragraph_14[PL_LANG] + cost_four_shuflya + CURRENCY_UNIT;
    know_additional_p2.dataset.ru = WEBSITE_INFO.paragraph_14[RU_LANG] + cost_four_shuflya + CURRENCY_UNIT;
    know_additional_div.appendChild(know_additional_p2);

    main.appendChild(know_additional_div);

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
            //console.log(MAIN_PAGE);
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
        //console.log(CATALOG_PAGE);
        break;
    };
    case ALL_PRODUCT_PAGE: {
        //console.log(ALL_PRODUCT_PAGE);
        break;
    };
    default: {
        //console.log('пиши функцию!!!!');
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

    //console.log(path);

    /* background: rgba(0, 170, 238, 0.9); */
    const shadow = document.createElement('div');
}

export function show_product_info(obj) {
    //console.log(obj);

    const lang = document.getElementById('show_language').dataset.lang.toLocaleLowerCase() || document.getElementById('show_language').innerHTML.toLocaleLowerCase();
    const main = document.getElementById('main');
    main.innerHTML = '';

    const short_info = document.createElement('div');
    short_info.className = 'short_info_product';

    const short_info_images = document.createElement('div');
    short_info_images.className = 'short_info_images';

    const info_image_div = document.createElement('div');
    info_image_div.className = 'info_image_div';

    const info_image = document.createElement('img');
    info_image.className = 'info_image';
    info_image.src = path_img + obj.imgs[0];
    info_image.alt = obj.category_name[EN_LANG];
    info_image_div.appendChild(info_image);

    short_info_images.appendChild(info_image_div);
    short_info.appendChild(short_info_images);

    const info_images_div = document.createElement('div');
    info_images_div.className = 'info_images_div';

    const images_array_product = obj.imgs;

    images_array_product.forEach(function (item) {
        const small_image_product_div = document.createElement('div');
        small_image_product_div.className = 'small_image_product_div';

        const small_image_product = document.createElement('img');
        small_image_product.className = 'small_image_product';
        small_image_product.src = path_img + item;
        small_image_product.alt = obj.category_name[EN_LANG];

        /* функция клика чтобы картинки были большие */

        small_image_product_div.appendChild(small_image_product);
        info_images_div.appendChild(small_image_product_div);
    });

    const images_array_product_body = obj.body_color;
    //console.log(images_array_product_body);

    images_array_product_body.forEach(function (item) {
        const small_image_product_div = document.createElement('div');
        small_image_product_div.className = 'small_image_product_div';

        const small_image_product = document.createElement('img');
        small_image_product.className = 'small_image_product';
        small_image_product.src = path_img_color + item.img;
        small_image_product.alt = obj.category_name[EN_LANG];

        /* функция клика чтобы картинки были большие */

        small_image_product_div.appendChild(small_image_product);
        info_images_div.appendChild(small_image_product_div);
    });

    const images_array_product_facade = obj.facade_color;

    images_array_product_facade.forEach(function (item) {
        if (!(images_array_product_body.includes(item))) {
            const small_image_product_div = document.createElement('div');
            small_image_product_div.className = 'small_image_product_div';

            const small_image_product = document.createElement('img');
            small_image_product.className = 'small_image_product';
            small_image_product.src = path_img_color + item.img;
            small_image_product.alt = obj.category_name[EN_LANG];

            /* функция клика чтобы картинки были большие */

            small_image_product_div.appendChild(small_image_product);
            info_images_div.appendChild(small_image_product_div);
        }
    });

    /*if (obj.body_color[EN_LANG] !== obj.facade_color[EN_LANG]) {
        const small_image_product_facade_div = document.createElement('div');
        small_image_product_facade_div.className = 'small_image_product_div';

        const small_image_product_facade = document.createElement('img');
        small_image_product_facade.className = 'small_image_product';
        small_image_product_facade.src = path_img_color + obj.facade_color.img;
        small_image_product_facade.alt = obj.facade_color[EN_LANG];

        // функция клика чтобы картинки были большие

        small_image_product_facade_div.appendChild(small_image_product_facade);
        info_images_div.appendChild(small_image_product_facade_div);
    } */

    short_info.appendChild(info_images_div);

    const short_info_text = document.createElement('div');
    short_info_text.className = 'short_info_text';

    const short_info_header = document.createElement('h3');
    short_info_header.className = 'short_info_header';
    short_info_header.innerHTML = obj.category_name[lang] + ' ' + obj.name;
    short_info_header.dataset.en = obj.category_name[EN_LANG] + ' ' + obj.name;
    short_info_header.dataset.pl = obj.category_name[PL_LANG] + ' ' + obj.name;
    short_info_header.dataset.ru = obj.category_name[RU_LANG] + ' ' + obj.name;
    short_info_text.appendChild(short_info_header);

    const short_info_dimensions = document.createElement('p');
    short_info_dimensions.className = 'short_info_dimensions';
    short_info_dimensions.innerHTML = obj.width + WEBSITE_INFO.cm[lang] + ' x ' + obj.height + WEBSITE_INFO.cm[lang] + ' x ' + obj.depth + WEBSITE_INFO.cm[lang];
    short_info_dimensions.dataset.en = obj.width + WEBSITE_INFO.cm[EN_LANG] + ' x ' + obj.height + WEBSITE_INFO.cm[EN_LANG] + ' x ' + obj.depth + WEBSITE_INFO.cm[EN_LANG];
    short_info_dimensions.dataset.pl = obj.width + WEBSITE_INFO.cm[PL_LANG] + ' x ' + obj.height + WEBSITE_INFO.cm[PL_LANG] + ' x ' + obj.depth + WEBSITE_INFO.cm[PL_LANG];
    short_info_dimensions.dataset.ru = obj.width + WEBSITE_INFO.cm[RU_LANG] + ' x ' + obj.height + WEBSITE_INFO.cm[RU_LANG] + ' x ' + obj.depth + WEBSITE_INFO.cm[RU_LANG];
    short_info_text.appendChild(short_info_dimensions);

    const short_info_colors = document.createElement('div');
    short_info_colors.className = 'short_info_colors';

    images_array_product_body.forEach(function (item) {
        if (short_info_colors.innerHTML.length) {
            const short_info_colors_delimiter = document.createElement('p');
            short_info_colors_delimiter.innerHTML = ' \\ ';
            short_info_colors.appendChild(short_info_colors_delimiter);
        }

        //console.log(item);

        const short_info_color_body = document.createElement('p');
        short_info_color_body.innerHTML = item[lang];
        short_info_color_body.dataset.en = item[EN_LANG];
        short_info_color_body.dataset.pl = item[PL_LANG];
        short_info_color_body.dataset.ru = item[RU_LANG];
        short_info_colors.appendChild(short_info_color_body);
    });

    images_array_product_facade.forEach(function (item) {
        if (!(images_array_product_body.includes(item))) {
            const short_info_colors_delimiter = document.createElement('p');
            short_info_colors_delimiter.innerHTML = ' \\ ';
            short_info_colors.appendChild(short_info_colors_delimiter);

            const short_info_color_body = document.createElement('p');
            short_info_color_body.innerHTML = item[lang];
            short_info_color_body.dataset.en = item[EN_LANG];
            short_info_color_body.dataset.pl = item[PL_LANG];
            short_info_color_body.dataset.ru = item[RU_LANG];
            short_info_colors.appendChild(short_info_color_body);
        }
    });

    /*const short_info_color_body = document.createElement('p');
    short_info_color_body.innerHTML = obj.body_color[lang];
    short_info_color_body.dataset.en = obj.body_color[EN_LANG];
    short_info_color_body.dataset.pl = obj.body_color[PL_LANG];
    short_info_color_body.dataset.ru = obj.body_color[RU_LANG];
    short_info_colors.appendChild(short_info_color_body);

    const short_info_colors_delimiter = document.createElement('p');
    short_info_colors_delimiter.innerHTML = ' \\ ';
    short_info_colors.appendChild(short_info_colors_delimiter);

    const short_info_color_facade = document.createElement('p');
    short_info_color_facade.innerHTML = obj.facade_color[lang];
    short_info_color_facade.dataset.en = obj.facade_color[EN_LANG];
    short_info_color_facade.dataset.pl = obj.facade_color[PL_LANG];
    short_info_color_facade.dataset.ru = obj.facade_color[RU_LANG];
    short_info_colors.appendChild(short_info_color_facade);*/

    short_info_text.appendChild(short_info_colors);

    const short_info_first_cost_div = document.createElement('div');
    short_info_first_cost_div.className = 'short_info_cost_div';

    const short_info_first_cost_text = document.createElement('p');
    short_info_first_cost_text.className = 'short_info_cost_text';
    short_info_first_cost_text.innerHTML = WEBSITE_INFO.text_roller_guides[lang];
    short_info_first_cost_text.dataset.en = WEBSITE_INFO.text_roller_guides[EN_LANG];
    short_info_first_cost_text.dataset.pl = WEBSITE_INFO.text_roller_guides[PL_LANG];
    short_info_first_cost_text.dataset.ru = WEBSITE_INFO.text_roller_guides[RU_LANG];
    short_info_first_cost_div.appendChild(short_info_first_cost_text);

    const short_info_first_cost = document.createElement('h3');
    short_info_first_cost.className = 'short_info_cost';
    short_info_first_cost.innerHTML = obj.roller_guides + ' ' + CURRENCY_UNIT;
    short_info_first_cost_div.appendChild(short_info_first_cost);

    short_info_text.appendChild(short_info_first_cost_div);

    const short_info_second_cost_div = document.createElement('div');
    short_info_second_cost_div.className = 'short_info_cost_div';

    const short_info_second_cost_text = document.createElement('p');
    short_info_second_cost_text.className = 'short_info_cost_text';
    short_info_second_cost_text.innerHTML = WEBSITE_INFO.text_ball_guides[lang];
    short_info_second_cost_text.dataset.en = WEBSITE_INFO.text_ball_guides[EN_LANG];
    short_info_second_cost_text.dataset.pl = WEBSITE_INFO.text_ball_guides[PL_LANG];
    short_info_second_cost_text.dataset.ru = WEBSITE_INFO.text_ball_guides[RU_LANG];
    short_info_second_cost_div.appendChild(short_info_second_cost_text);

    const short_info_second_cost = document.createElement('h3');
    short_info_second_cost.className = 'short_info_cost';
    short_info_second_cost.innerHTML = obj.ball_guides + ' ' + CURRENCY_UNIT;
    short_info_second_cost_div.appendChild(short_info_second_cost);

    short_info_text.appendChild(short_info_second_cost_div);

    const button_add_favorites = document.createElement('button');
    button_add_favorites.id = 'button_add_favorites';

    const info_names = [obj.category_name, obj.name];
    if (check_favorites(info_names)) {
        button_add_favorites.className = 'button_add_favorites button_add_favorites_active';
        button_add_favorites.innerHTML = WEBSITE_INFO.remove_favorites[lang];
        button_add_favorites.dataset.en = WEBSITE_INFO.remove_favorites[EN_LANG];
        button_add_favorites.dataset.pl = WEBSITE_INFO.remove_favorites[PL_LANG];
        button_add_favorites.dataset.ru = WEBSITE_INFO.remove_favorites[RU_LANG];
        button_add_favorites.onclick = function () {
            const favorites_info = [obj.category_name, obj.name];
            delete_favorites(favorites_info);
        };
    } else {
        button_add_favorites.className = 'button_add_favorites';
        button_add_favorites.innerHTML = WEBSITE_INFO.add_favorites[lang];
        button_add_favorites.dataset.en = WEBSITE_INFO.add_favorites[EN_LANG];
        button_add_favorites.dataset.pl = WEBSITE_INFO.add_favorites[PL_LANG];
        button_add_favorites.dataset.ru = WEBSITE_INFO.add_favorites[RU_LANG];
        button_add_favorites.onclick = function () {
            const favorites_info = [obj.category_name, obj.name];
            add_favorites(favorites_info);
        };
    }

    short_info_text.appendChild(button_add_favorites);

    short_info.appendChild(short_info_text);

    main.appendChild(short_info);

    const full_description = document.createElement('div');
    full_description.className = 'full_description';

    const full_description_name = document.createElement('h3');
    full_description_name.className = 'full_description_name';
    full_description_name.innerHTML = WEBSITE_INFO.full_description[lang];
    full_description_name.dataset.en = WEBSITE_INFO.full_description[EN_LANG];
    full_description_name.dataset.pl = WEBSITE_INFO.full_description[PL_LANG];
    full_description_name.dataset.ru = WEBSITE_INFO.full_description[RU_LANG];
    full_description.appendChild(full_description_name);

    const full_description_body_color_div = document.createElement('div');
    full_description_body_color_div.className = 'full_description_div';

    const full_description_body_label = document.createElement('p');
    full_description_body_label.className = 'full_description_label';
    full_description_body_label.innerHTML = WEBSITE_INFO.body_color[lang];
    full_description_body_label.dataset.en = WEBSITE_INFO.body_color[EN_LANG];
    full_description_body_label.dataset.pl = WEBSITE_INFO.body_color[PL_LANG];
    full_description_body_label.dataset.ru = WEBSITE_INFO.body_color[RU_LANG];
    full_description_body_color_div.appendChild(full_description_body_label);

    const full_description_body_text = document.createElement('p');
    full_description_body_text.className = 'full_description_text';

    images_array_product_body.forEach(function (item) {
        if (full_description_body_text.innerHTML.length) {
            const full_description_body_text_delimiter = document.createElement('span');
            full_description_body_text_delimiter.innerHTML = ' \\ ';
            full_description_body_text.appendChild(full_description_body_text_delimiter);
        }

        const full_description_body_text_span = document.createElement('span');
        full_description_body_text_span.innerHTML = item[lang];
        full_description_body_text_span.dataset.en = item[EN_LANG];
        full_description_body_text_span.dataset.pl = item[PL_LANG];
        full_description_body_text_span.dataset.ru = item[RU_LANG];
        full_description_body_text.appendChild(full_description_body_text_span);
    });

    full_description_body_color_div.appendChild(full_description_body_text);
    full_description.appendChild(full_description_body_color_div);

    const full_description_facade_color_div = document.createElement('div');
    full_description_facade_color_div.className = 'full_description_div';

    const full_description_facade_label = document.createElement('p');
    full_description_facade_label.className = 'full_description_label';
    full_description_facade_label.innerHTML = WEBSITE_INFO.facade_color[lang];
    full_description_facade_label.dataset.en = WEBSITE_INFO.facade_color[EN_LANG];
    full_description_facade_label.dataset.pl = WEBSITE_INFO.facade_color[PL_LANG];
    full_description_facade_label.dataset.ru = WEBSITE_INFO.facade_color[RU_LANG];
    full_description_facade_color_div.appendChild(full_description_facade_label);

    const full_description_facade_text = document.createElement('p');
    full_description_facade_text.className = 'full_description_text';

    images_array_product_facade.forEach(function (item) {
        if (full_description_facade_text.innerHTML.length) {
            const full_description_facade_text_delimiter = document.createElement('span');
            full_description_facade_text_delimiter.innerHTML = ' \\ ';
            full_description_facade_text.appendChild(full_description_facade_text_delimiter);
        }

        const full_description_facade_text_span = document.createElement('span');
        full_description_facade_text_span.innerHTML = item[lang];
        full_description_facade_text_span.dataset.en = item[EN_LANG];
        full_description_facade_text_span.dataset.pl = item[PL_LANG];
        full_description_facade_text_span.dataset.ru = item[RU_LANG];
        full_description_facade_text.appendChild(full_description_facade_text_span);
    });

    full_description_facade_color_div.appendChild(full_description_facade_text);
    full_description.appendChild(full_description_facade_color_div);

    const full_description_width_div = document.createElement('div');
    full_description_width_div.className = 'full_description_div';

    const full_description_width_label = document.createElement('p');
    full_description_width_label.className = 'full_description_label';
    full_description_width_label.innerHTML = WEBSITE_INFO.width[lang];
    full_description_width_label.dataset.en = WEBSITE_INFO.width[EN_LANG];
    full_description_width_label.dataset.pl = WEBSITE_INFO.width[PL_LANG];
    full_description_width_label.dataset.ru = WEBSITE_INFO.width[RU_LANG];
    full_description_width_div.appendChild(full_description_width_label);

    const full_description_width_text = document.createElement('p');
    full_description_width_text.className = 'full_description_text';
    full_description_width_text.innerHTML = obj.width + ' ' + WEBSITE_INFO.cm[lang];
    full_description_width_text.dataset.en = obj.width + ' ' + WEBSITE_INFO.cm[EN_LANG];
    full_description_width_text.dataset.pl = obj.width + ' ' + WEBSITE_INFO.cm[PL_LANG];
    full_description_width_text.dataset.ru = obj.width + ' ' + WEBSITE_INFO.cm[RU_LANG];
    full_description_width_div.appendChild(full_description_width_text);
    full_description.appendChild(full_description_width_div);

    const full_description_height_div = document.createElement('div');
    full_description_height_div.className = 'full_description_div';

    const full_description_height_label = document.createElement('p');
    full_description_height_label.className = 'full_description_label';
    full_description_height_label.innerHTML = WEBSITE_INFO.height[lang];
    full_description_height_label.dataset.en = WEBSITE_INFO.height[EN_LANG];
    full_description_height_label.dataset.pl = WEBSITE_INFO.height[PL_LANG];
    full_description_height_label.dataset.ru = WEBSITE_INFO.height[RU_LANG];
    full_description_height_div.appendChild(full_description_height_label);

    const full_description_height_text = document.createElement('p');
    full_description_height_text.className = 'full_description_text';
    full_description_height_text.innerHTML = obj.height + ' ' + WEBSITE_INFO.cm[lang];
    full_description_height_text.dataset.en = obj.height + ' ' + WEBSITE_INFO.cm[EN_LANG];
    full_description_height_text.dataset.pl = obj.height + ' ' + WEBSITE_INFO.cm[PL_LANG];
    full_description_height_text.dataset.ru = obj.height + ' ' + WEBSITE_INFO.cm[RU_LANG];
    full_description_height_div.appendChild(full_description_height_text);
    full_description.appendChild(full_description_height_div);

    const full_description_depth_div = document.createElement('div');
    full_description_depth_div.className = 'full_description_div';

    const full_description_depth_label = document.createElement('p');
    full_description_depth_label.className = 'full_description_label';
    full_description_depth_label.innerHTML = WEBSITE_INFO.depth[lang];
    full_description_depth_label.dataset.en = WEBSITE_INFO.depth[EN_LANG];
    full_description_depth_label.dataset.pl = WEBSITE_INFO.depth[PL_LANG];
    full_description_depth_label.dataset.ru = WEBSITE_INFO.depth[RU_LANG];
    full_description_depth_div.appendChild(full_description_depth_label);

    const full_description_depth_text = document.createElement('p');
    full_description_depth_text.className = 'full_description_text';
    full_description_depth_text.innerHTML = obj.depth + ' ' + WEBSITE_INFO.cm[lang];
    full_description_depth_text.dataset.en = obj.depth + ' ' + WEBSITE_INFO.cm[EN_LANG];
    full_description_depth_text.dataset.pl = obj.depth + ' ' + WEBSITE_INFO.cm[PL_LANG];
    full_description_depth_text.dataset.ru = obj.depth + ' ' + WEBSITE_INFO.cm[RU_LANG];
    full_description_depth_div.appendChild(full_description_depth_text);
    full_description.appendChild(full_description_depth_div);

    const full_description_weight_div = document.createElement('div');
    full_description_weight_div.className = 'full_description_div';

    const full_description_weight_label = document.createElement('p');
    full_description_weight_label.className = 'full_description_label';
    full_description_weight_label.innerHTML = WEBSITE_INFO.weight[lang];
    full_description_weight_label.dataset.en = WEBSITE_INFO.weight[EN_LANG];
    full_description_weight_label.dataset.pl = WEBSITE_INFO.weight[PL_LANG];
    full_description_weight_label.dataset.ru = WEBSITE_INFO.weight[RU_LANG];
    full_description_weight_div.appendChild(full_description_weight_label);

    const full_description_weight_text = document.createElement('p');
    full_description_weight_text.className = 'full_description_text';
    full_description_weight_text.innerHTML = obj.weight + ' ' + WEBSITE_INFO.kg[lang];
    full_description_weight_text.dataset.en = obj.weight + ' ' + WEBSITE_INFO.kg[EN_LANG];
    full_description_weight_text.dataset.pl = obj.weight + ' ' + WEBSITE_INFO.kg[PL_LANG];
    full_description_weight_text.dataset.ru = obj.weight + ' ' + WEBSITE_INFO.kg[RU_LANG];
    full_description_weight_div.appendChild(full_description_weight_text);
    full_description.appendChild(full_description_weight_div);

    const full_description_build_option_div = document.createElement('div');
    full_description_build_option_div.className = 'full_description_div';

    const full_description_build_option_label = document.createElement('p');
    full_description_build_option_label.className = 'full_description_label';
    full_description_build_option_label.innerHTML = WEBSITE_INFO.build_option[lang];
    full_description_build_option_label.dataset.en = WEBSITE_INFO.build_option[EN_LANG];
    full_description_build_option_label.dataset.pl = WEBSITE_INFO.build_option[PL_LANG];
    full_description_build_option_label.dataset.ru = WEBSITE_INFO.build_option[RU_LANG];
    full_description_build_option_div.appendChild(full_description_build_option_label);

    const full_description_build_option_text = document.createElement('p');
    full_description_build_option_text.className = 'full_description_text';

    const build_option_array = obj.build_option;

    build_option_array.forEach(function (item) {
        if (full_description_build_option_text.innerHTML.length) {
            const full_description_build_option_text_delimiter = document.createElement('span');
            full_description_build_option_text_delimiter.innerHTML = ' \\ ';
            full_description_build_option_text.appendChild(full_description_build_option_text_delimiter);
        }

        const full_description_build_option_text_span = document.createElement('span');
        full_description_build_option_text_span.innerHTML = item[lang];
        full_description_build_option_text_span.dataset.en = item[EN_LANG];
        full_description_build_option_text_span.dataset.pl = item[PL_LANG];
        full_description_build_option_text_span.dataset.ru = item[RU_LANG];
        full_description_build_option_text.appendChild(full_description_build_option_text_span);
    });

    full_description_build_option_div.appendChild(full_description_build_option_text);
    full_description.appendChild(full_description_build_option_div);

    const full_description_body_material_div = document.createElement('div');
    full_description_body_material_div.className = 'full_description_div';

    const full_description_body_material_label = document.createElement('p');
    full_description_body_material_label.className = 'full_description_label';
    full_description_body_material_label.innerHTML = WEBSITE_INFO.body_material[lang];
    full_description_body_material_label.dataset.en = WEBSITE_INFO.body_material[EN_LANG];
    full_description_body_material_label.dataset.pl = WEBSITE_INFO.body_material[PL_LANG];
    full_description_body_material_label.dataset.ru = WEBSITE_INFO.body_material[RU_LANG];
    full_description_body_material_div.appendChild(full_description_body_material_label);

    const full_description_body_material_text = document.createElement('p');
    full_description_body_material_text.className = 'full_description_text';

    const body_material_array = obj.body_material;

    body_material_array.forEach(function (item) {
        if (full_description_body_material_text.innerHTML.length) {
            const full_description_body_material_text_delimiter = document.createElement('span');
            full_description_body_material_text_delimiter.innerHTML = ' \\ ';
            full_description_body_material_text.appendChild(full_description_body_material_text_delimiter);
        }

        const full_description_body_material_text_span = document.createElement('span');
        full_description_body_material_text_span.innerHTML = item[lang];
        full_description_body_material_text_span.dataset.en = item[EN_LANG];
        full_description_body_material_text_span.dataset.pl = item[PL_LANG];
        full_description_body_material_text_span.dataset.ru = item[RU_LANG];
        full_description_body_material_text.appendChild(full_description_body_material_text_span);
    });

    full_description_body_material_div.appendChild(full_description_body_material_text);
    full_description.appendChild(full_description_body_material_div);

    const full_description_facade_material_div = document.createElement('div');
    full_description_facade_material_div.className = 'full_description_div';

    const full_description_facade_material_label = document.createElement('p');
    full_description_facade_material_label.className = 'full_description_label';
    full_description_facade_material_label.innerHTML = WEBSITE_INFO.facade_material[lang];
    full_description_facade_material_label.dataset.en = WEBSITE_INFO.facade_material[EN_LANG];
    full_description_facade_material_label.dataset.pl = WEBSITE_INFO.facade_material[PL_LANG];
    full_description_facade_material_label.dataset.ru = WEBSITE_INFO.facade_material[RU_LANG];
    full_description_facade_material_div.appendChild(full_description_facade_material_label);

    const full_description_facade_material_text = document.createElement('p');
    full_description_facade_material_text.className = 'full_description_text';

    const facade_material_array = obj.facade_material;

    facade_material_array.forEach(function (item) {
        if (full_description_facade_material_text.innerHTML.length) {
            const full_description_facade_material_text_delimiter = document.createElement('span');
            full_description_facade_material_text_delimiter.innerHTML = ' \\ ';
            full_description_facade_material_text.appendChild(full_description_facade_material_text_delimiter);
        }

        const full_description_facade_material_text_span = document.createElement('span');
        full_description_facade_material_text_span.innerHTML = item[lang];
        full_description_facade_material_text_span.dataset.en = item[EN_LANG];
        full_description_facade_material_text_span.dataset.pl = item[PL_LANG];
        full_description_facade_material_text_span.dataset.ru = item[RU_LANG];
        full_description_facade_material_text.appendChild(full_description_facade_material_text_span);
    });

    full_description_facade_material_div.appendChild(full_description_facade_material_text);
    full_description.appendChild(full_description_facade_material_div);

    main.appendChild(full_description);
}

export function add_favorites(array) {
    const lang = document.getElementById('show_language').dataset.lang.toLocaleLowerCase() || document.getElementById('show_language').innerHTML.toLocaleLowerCase();

    const favorites_dressers = localStorage.getItem('favorites_dressers');

    //console.log(array);
    const save_info_arr = [];

    const category_names = array[0];

    for (const key in category_names) {
        const name = category_names[key];
        save_info_arr.push(name);
    }

    save_info_arr.push(array[1]);
    const save_info_str = save_info_arr.join();

    let save;

    if ((favorites_dressers === null) || (favorites_dressers === null) || (favorites_dressers.length == 0)) {
        save = save_info_str;
    } else {
        save = favorites_dressers + ',' + save_info_str;
    }

    localStorage.setItem('favorites_dressers', save);

    /*const favorites_dressers2 = localStorage.getItem('favorites_dressers');
    const info = favorites_dressers2.split(',');

    console.log(info);*/

    const button_add_favorites = document.getElementById('button_add_favorites');
    button_add_favorites.className = 'button_add_favorites button_add_favorites_active';
    button_add_favorites.innerHTML = WEBSITE_INFO.remove_favorites[lang];
    button_add_favorites.dataset.en = WEBSITE_INFO.remove_favorites[EN_LANG];
    button_add_favorites.dataset.pl = WEBSITE_INFO.remove_favorites[PL_LANG];
    button_add_favorites.dataset.ru = WEBSITE_INFO.remove_favorites[RU_LANG];
    button_add_favorites.onclick = function () {
        const favorites_info = [obj.category_name, obj.name];
        delete_favorites(favorites_info);
    };
}

export function delete_favorites(array) {
    const lang = document.getElementById('show_language').dataset.lang.toLocaleLowerCase() || document.getElementById('show_language').innerHTML.toLocaleLowerCase();

    const favorites_dressers = localStorage.getItem('favorites_dressers');
    const info_arr = favorites_dressers.split(',');
    const info_structure = [];
    let delete_index = undefined;

    if ((favorites_dressers === null) || (favorites_dressers === null) || (favorites_dressers.length == 0)) {
        //console.log(is_found);
        return is_found;
    }

    for (let i = 0; i < info_arr.length; i = i + 4) {
        const obj = {};
        obj[EN_LANG] = info_arr[i];
        obj[PL_LANG] = info_arr[i + 1];
        obj[RU_LANG] = info_arr[i + 2];

        info_structure.push(obj);
        info_structure.push(info_arr[i + 3]);
    }

    //console.log(info_structure);

    for (let i = 0; i < info_structure.length; i = i + 2) {
        let is_first_equal = false;
        let is_second_equal = false;
        let is_third_equal = false;
        let is_fourth_equal = false;

        if (info_structure[i][EN_LANG] == array[0][EN_LANG]) {
            is_first_equal = true;
        }
        if (info_structure[i][PL_LANG] == array[0][PL_LANG]) {
            is_second_equal = true;
        }
        if (info_structure[i][RU_LANG] == array[0][RU_LANG]) {
            is_third_equal = true;
        }
        if (info_structure[i + 1] == array[1]) {
            is_fourth_equal = true;
        }

        if (is_first_equal && is_second_equal && is_third_equal && is_fourth_equal) {
            delete_index = i;
        }
    }

    info_structure.splice(delete_index, 2);

    const new_save_info_arr = [];

    for (let i = 0; i < info_structure.length; i = i + 2) {
        new_save_info_arr.push(info_structure[i][EN_LANG]);
        new_save_info_arr.push(info_structure[i][PL_LANG]);
        new_save_info_arr.push(info_structure[i][RU_LANG]);
        new_save_info_arr.push(info_structure[i + 1]);
    }

    const new_save_info_str = new_save_info_arr.join();
    localStorage.setItem('favorites_dressers', new_save_info_str);


    const button_add_favorites = document.getElementById('button_add_favorites');
    button_add_favorites.className = 'button_add_favorites';
    button_add_favorites.innerHTML = WEBSITE_INFO.add_favorites[lang];
    button_add_favorites.dataset.en = WEBSITE_INFO.add_favorites[EN_LANG];
    button_add_favorites.dataset.pl = WEBSITE_INFO.add_favorites[PL_LANG];
    button_add_favorites.dataset.ru = WEBSITE_INFO.add_favorites[RU_LANG];
    button_add_favorites.onclick = function () {
        const favorites_info = [obj.category_name, obj.name];
        add_favorites(favorites_info);
    };
}

export function check_favorites(array) {
    let is_found = false;

    const favorites_dressers = localStorage.getItem('favorites_dressers');

    if ((favorites_dressers === null) || (favorites_dressers === null) || (favorites_dressers.length == 0)) {
        //console.log(is_found);
        return is_found;
    }

    const info_arr = favorites_dressers.split(',');
    const info_structure = [];

    for (let i = 0; i < info_arr.length; i = i + 4) {
        const obj = {};
        obj[EN_LANG] = info_arr[i];
        obj[PL_LANG] = info_arr[i + 1];
        obj[RU_LANG] = info_arr[i + 2];

        info_structure.push(obj);
        info_structure.push(info_arr[i + 3]);
    }

    //console.log(info_structure);

    for (let i = 0; i < info_structure.length; i = i + 2) {
        let is_first_equal = false;
        let is_second_equal = false;
        let is_third_equal = false;
        let is_fourth_equal = false;

        if (info_structure[i][EN_LANG] == array[0][EN_LANG]) {
            is_first_equal = true;
        }
        if (info_structure[i][PL_LANG] == array[0][PL_LANG]) {
            is_second_equal = true;
        }
        if (info_structure[i][RU_LANG] == array[0][RU_LANG]) {
            is_third_equal = true;
        }
        if (info_structure[i + 1] == array[1]) {
            is_fourth_equal = true;
        }

        if (is_first_equal && is_second_equal && is_third_equal && is_fourth_equal) {
            is_found = true;
        }
    }

    //console.log(is_found);

    return is_found;
}

export function show_category(name_obj) {
    //console.log(name_obj);

    const main = document.getElementById('main');
    const lang = document.getElementById('show_language').dataset.lang.toLocaleLowerCase() || document.getElementById('show_language').innerHTML.toLocaleLowerCase();

    highlight_menu_item('no_light');

    const catalog = [];

    for (const key in DRESSERS) {
        const category = DRESSERS[key];
        for (const products in category) {
            //console.log(category[0]);
            //const product_info = category[products];
            if (category[0][EN_LANG] == name_obj[EN_LANG]) {
                if (products != 0) {
                    catalog.push(product_card_create(category[products]));
                }
            }
        }
    }

    if (catalog.length) {
        //console.log('catalog.length');
        main.innerHTML = '';
        catalog.forEach(function (item) {
            main.appendChild(item);
        });
    } else {
        //console.log('no');
        main.innerHTML = '';

        const no_results_div = document.createElement('div');
        no_results_div.className = 'no_results_div';

        const no_results_header = document.createElement('h3');
        no_results_header.className = 'no_results_header';
        no_results_header.innerHTML = WEBSITE_INFO.no_results[lang];
        no_results_header.dataset.en = WEBSITE_INFO.no_results[EN_LANG];
        no_results_header.dataset.pl = WEBSITE_INFO.no_results[PL_LANG];
        no_results_header.dataset.ru = WEBSITE_INFO.no_results[RU_LANG];
        no_results_div.appendChild(no_results_header);

        const button_back = document.createElement('button');
        button_back.className = 'button_back';
        button_back.innerHTML = WEBSITE_INFO.back_to_main[lang];
        button_back.dataset.en = WEBSITE_INFO.back_to_main[EN_LANG];
        button_back.dataset.pl = WEBSITE_INFO.back_to_main[PL_LANG];
        button_back.dataset.ru = WEBSITE_INFO.back_to_main[RU_LANG];
        button_back.onclick = function () {
            show_main();
        };
        no_results_div.appendChild(button_back);

        const button_all = document.createElement('button');
        button_all.className = 'button_back';
        button_all.innerHTML = WEBSITE_INFO.show_all_button[lang];
        button_all.dataset.en = WEBSITE_INFO.show_all_button[EN_LANG];
        button_all.dataset.pl = WEBSITE_INFO.show_all_button[PL_LANG];
        button_all.dataset.ru = WEBSITE_INFO.show_all_button[RU_LANG];
        button_all.onclick = function () {
            show_all_goods();
        };
        no_results_div.appendChild(button_all);

        main.appendChild(no_results_div);
    }
}

export function show_tags(name_tag) {
    //console.log(name_tag);

    const main = document.getElementById('main');
    const lang = document.getElementById('show_language').dataset.lang.toLocaleLowerCase() || document.getElementById('show_language').innerHTML.toLocaleLowerCase();

    highlight_menu_item('no_light');

    const catalog = [];

    for (const key in DRESSERS) {
        const category = DRESSERS[key];
        for (const products in category) {
            const product_info = category[products];
            if (products != 0) {
                console.log(product_info.tags);

                const tags_arr = product_info.tags;

                if (tags_arr.length) {
                    for (let tags_index = 0; tags_index < tags_arr.length; tags_index++) {
                        console.log(tags_arr[tags_index][EN_LANG]);
                        if (tags_arr[tags_index][EN_LANG] == name_tag[EN_LANG]) {
                            console.log('yes');
                            catalog.push(product_card_create(product_info));
                            continue;
                        }
                    }
                }
            }
        }
    }

    console.log(catalog);

    if (catalog.length) {
        //console.log('catalog.length');
        main.innerHTML = '';
        catalog.forEach(function (item) {
            main.appendChild(item);
        });
    } else {
        //console.log('no');
        main.innerHTML = '';

        const no_results_div = document.createElement('div');
        no_results_div.className = 'no_results_div';

        const no_results_header = document.createElement('h3');
        no_results_header.className = 'no_results_header';
        no_results_header.innerHTML = WEBSITE_INFO.no_results[lang];
        no_results_header.dataset.en = WEBSITE_INFO.no_results[EN_LANG];
        no_results_header.dataset.pl = WEBSITE_INFO.no_results[PL_LANG];
        no_results_header.dataset.ru = WEBSITE_INFO.no_results[RU_LANG];
        no_results_div.appendChild(no_results_header);

        const button_back = document.createElement('button');
        button_back.className = 'button_back';
        button_back.innerHTML = WEBSITE_INFO.back_to_main[lang];
        button_back.dataset.en = WEBSITE_INFO.back_to_main[EN_LANG];
        button_back.dataset.pl = WEBSITE_INFO.back_to_main[PL_LANG];
        button_back.dataset.ru = WEBSITE_INFO.back_to_main[RU_LANG];
        button_back.onclick = function () {
            show_main();
        };
        no_results_div.appendChild(button_back);

        const button_all = document.createElement('button');
        button_all.className = 'button_back';
        button_all.innerHTML = WEBSITE_INFO.show_all_button[lang];
        button_all.dataset.en = WEBSITE_INFO.show_all_button[EN_LANG];
        button_all.dataset.pl = WEBSITE_INFO.show_all_button[PL_LANG];
        button_all.dataset.ru = WEBSITE_INFO.show_all_button[RU_LANG];
        button_all.onclick = function () {
            show_all_goods();
        };
        no_results_div.appendChild(button_all);

        main.appendChild(no_results_div);
    }
}