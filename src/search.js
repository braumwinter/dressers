import {
    DRESSERS
} from './dressers.js';

import {
    WEBSITE_INFO
} from './lang.js';

import {
    show_main,
    show_all_goods,
    highlight_menu_item
} from './pages.js';

import {
    product_card_create,
    catalog_card_create
} from './card.js';

const EN_LANG = 'en';
const PL_LANG = 'pl';
const RU_LANG = 'ru';

export function search_activation() {
    const search_input = document.getElementById('search_input');
    search_input.className = 'search_input search_input_active';
    search_input.addEventListener('click', search, false);
}

export function search_blur() {
    const search_input = document.getElementById('search_input');
    search_input.className = 'search_input';
    document.getElementById('search_input').value = '';
    search_input.removeEventListener('click', search, false);
}

export function search(event) {
    const main = document.getElementById('main');
    const lang = document.getElementById('show_language').dataset.lang.toLocaleLowerCase() || document.getElementById('show_language').innerHTML.toLocaleLowerCase();

    highlight_menu_item('no_light');

    const search_input_value = document.getElementById('search_input').value;

    if (search_input_value.length === 0) {
        return;
    }

    const catalog = [];
    console.log(search_input_value);

    for (const key in DRESSERS) {
        const category = DRESSERS[key];
        for (const product in category) {
            if (product != 0) {
                const product_info = category[product];

                for (const value in product_info) {
                    if ((value != 'card_img') && (value != 'imgs')) {
                        //console.log('VALUE', value);

                        const product_field = product_info[value];
                        //console.log(product_field);
                        const field_type = toString.call(product_field);

                        //console.log(field_type);

                        if (field_type == '[object Number]') {
                            //console.log('number/string');
                            if (product_field == search_input_value) {
                                //console.log('YES');
                                catalog.push(product_card_create(product_info));
                                continue;
                            }
                        } else if (field_type == '[object String]') {
                            //console.log('number/string');
                            if (product_field.toLocaleLowerCase() == search_input_value.toLocaleLowerCase()) {
                                //console.log('YES');
                                catalog.push(product_card_create(product_info));
                                continue;
                            }
                        } else if ((field_type == '[object Object]')) {
                            //console.log('object');
                            let is_found = false;
                            for (let key in product_field) {
                                //console.log(product_field[key]);
                                if (product_field[key].toLocaleLowerCase() == search_input_value.toLocaleLowerCase()) {
                                    is_found = true;
                                }
                            }

                            if (is_found) {
                                catalog.push(product_card_create(product_info));
                                continue;
                            }

                        } else if ((field_type == '[object Array]')) {
                            //console.log('array');

                            for (let index_field = 0; index_field < product_field.length; index_field++) {
                                let is_found = false;
                                for (let key in product_field[index_field]) {
                                    //console.log(value);
                                    //console.log(product_field[index_field][key]);
                                    if (product_field[index_field][key].toLocaleLowerCase() == search_input_value.toLocaleLowerCase()) {
                                        is_found = true;
                                    }
                                }

                                if (is_found) {
                                    catalog.push(product_card_create(product_info));
                                    //catalog.push(product_info);
                                    continue;
                                }
                            }
                        }
                    }
                }
                //console.log(product_info);
                //console.log(Object.values(product_info));

                /* простые
                console.log(product_info.name);
                console.log(product_info.roller_guides);
                console.log(product_info.ball_guides);
                console.log(product_info.width);
                console.log(product_info.height);
                console.log(product_info.depth);
                console.log(product_info.weight); */

                /* сложные
                console.log(product_info.category_name);
                console.log(product_info.body_color);
                console.log(product_info.facade_color);
                console.log(product_info.build_option);
                console.log(product_info.body_material);
                console.log(product_info.facade_material);
                console.log(product_info.tags); */
            }
        }
    }

    //console.log(catalog);

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

        const try_change_request = document.createElement('p');
        try_change_request.className = 'no_results_p';
        try_change_request.innerHTML = WEBSITE_INFO.try_change_request[lang];
        try_change_request.dataset.en = WEBSITE_INFO.try_change_request[EN_LANG];
        try_change_request.dataset.pl = WEBSITE_INFO.try_change_request[PL_LANG];
        try_change_request.dataset.ru = WEBSITE_INFO.try_change_request[RU_LANG];
        no_results_div.appendChild(try_change_request);

        const check_request_typos = document.createElement('p');
        check_request_typos.className = 'no_results_p';
        check_request_typos.innerHTML = WEBSITE_INFO.check_request_typos[lang];
        check_request_typos.dataset.en = WEBSITE_INFO.check_request_typos[EN_LANG];
        check_request_typos.dataset.pl = WEBSITE_INFO.check_request_typos[PL_LANG];
        check_request_typos.dataset.ru = WEBSITE_INFO.check_request_typos[RU_LANG];
        no_results_div.appendChild(check_request_typos);

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