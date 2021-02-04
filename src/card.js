import {
    WEBSITE_INFO,
    CURRENCY_UNIT
} from './lang.js';

import {
    DRESSERS
} from './dressers.js';

import {
    show_products,
    show_product_info
} from './pages.js';

const path_img = './assets/product/';
const EN_LANG = 'en';
const PL_LANG = 'pl';
const RU_LANG = 'ru';

export function product_card_create(obj) {
    console.log('product_card_create ', obj);
    const lang = document.getElementById('show_language').dataset.lang.toLocaleLowerCase() || document.getElementById('show_language').innerHTML.toLocaleLowerCase();

    const card_border = document.createElement('div');
    card_border.className = 'card_border';

    const img_border = document.createElement('div');
    img_border.className = 'card_img_border';
    //img_border.style.backgroundImage = `url(${path_img + obj.card_img[1]})`;
    card_border.appendChild(img_border);

    const card_img_first = document.createElement('img');
    card_img_first.className = 'card_img_first';
    card_img_first.src = path_img + obj.card_img[0];
    img_border.appendChild(card_img_first);

    const card_img_second = document.createElement('img');
    card_img_second.className = 'card_img_second';
    card_img_second.src = path_img + obj.card_img[1];
    img_border.appendChild(card_img_second);

    const card_name = document.createElement('p');
    card_name.className = 'card_name';
    card_name.innerHTML = obj.category_name[lang] + ' ' + obj.name;
    card_name.dataset.en = obj.category_name[EN_LANG] + ' ' + obj.name;
    card_name.dataset.pl = obj.category_name[PL_LANG] + ' ' + obj.name;
    card_name.dataset.ru = obj.category_name[RU_LANG] + ' ' + obj.name;
    card_border.appendChild(card_name);

    const card_cost = document.createElement('p');
    card_cost.className = 'card_cost';
    card_cost.innerHTML = obj.roller_guides + ' ' + CURRENCY_UNIT + '  -  ' + obj.ball_guides + ' ' + CURRENCY_UNIT;
    card_border.appendChild(card_cost);

    const card_button = document.createElement('button');
    card_button.className = 'card_button';
    card_button.innerHTML = WEBSITE_INFO.select[lang];
    card_button.dataset.en = WEBSITE_INFO.select[EN_LANG];
    card_button.dataset.pl = WEBSITE_INFO.select[PL_LANG];
    card_button.dataset.ru = WEBSITE_INFO.select[RU_LANG];
    card_button.onclick = function(){
        show_product_info(obj);
    }
    card_border.appendChild(card_button);

    return card_border;
}

export function catalog_card_create(array) {
    //console.log(array);
    const lang = document.getElementById('show_language').dataset.lang.toLocaleLowerCase() || document.getElementById('show_language').innerHTML.toLocaleLowerCase();

    const catalog_card_border = document.createElement('div');
    catalog_card_border.className = 'catalog_card_border';

    const catalog_img_border = document.createElement('div');
    catalog_img_border.className = 'catalog_card_img_border';
    catalog_card_border.appendChild(catalog_img_border);

    const catalog_card_img_first = document.createElement('img');
    catalog_card_img_first.className = 'catalog_card_img_first';
    catalog_card_img_first.src = path_img + array[1][0];
    catalog_img_border.appendChild(catalog_card_img_first);

    const catalog_card_img_second = document.createElement('img');
    catalog_card_img_second.className = 'catalog_card_img_second';
    catalog_card_img_second.src = path_img + array[1][1];
    catalog_img_border.appendChild(catalog_card_img_second);

    const catalog_card_first_info = document.createElement('div');
    catalog_card_first_info.className = 'catalog_first_info';
    //catalog_card_border.appendChild(catalog_card_first_info);

    const catalog_card_name = document.createElement('p');
    catalog_card_name.className = 'catalog_card_name';
    catalog_card_name.innerHTML = array[0][lang];
    catalog_card_name.dataset.en = array[0][EN_LANG];
    catalog_card_name.dataset.pl = array[0][PL_LANG];
    catalog_card_name.dataset.ru = array[0][RU_LANG];
    catalog_card_first_info.appendChild(catalog_card_name);

    /*const catalog_card_hyphen = document.createElement('p');
    catalog_card_hyphen.className = 'catalog_card_hyphen';
    catalog_card_hyphen.innerHTML = '  - ';
    catalog_card_first_info.appendChild(catalog_card_hyphen);*/

    const catalog_card_cost = document.createElement('p');
    catalog_card_cost.className = 'catalog_card_cost';
    catalog_card_cost.innerHTML = array[2];
    catalog_card_first_info.appendChild(catalog_card_cost);

    const catalog_card_dollar = document.createElement('p');
    catalog_card_dollar.className = 'catalog_card_dollar';
    catalog_card_dollar.innerHTML = CURRENCY_UNIT;
    catalog_card_first_info.appendChild(catalog_card_dollar);

    catalog_card_border.appendChild(catalog_card_first_info);

    const catalog_card_second_info = document.createElement('div');
    catalog_card_second_info.className = 'catalog_card_second_info';

    const catalog_card_dimensions_title = document.createElement('p');
    catalog_card_dimensions_title.className = 'catalog_card_dimensions_title';
    catalog_card_dimensions_title.innerHTML = WEBSITE_INFO.whd[lang];
    catalog_card_dimensions_title.dataset.en = WEBSITE_INFO.whd[EN_LANG];
    catalog_card_dimensions_title.dataset.pl = WEBSITE_INFO.whd[PL_LANG];
    catalog_card_dimensions_title.dataset.ru = WEBSITE_INFO.whd[RU_LANG];
    catalog_card_second_info.appendChild(catalog_card_dimensions_title);

    const catalog_card_dimensions = document.createElement('p');
    catalog_card_dimensions.className = 'catalog_card_dimensions';
    catalog_card_dimensions.innerHTML = array[3][0] + ' x ' + array[3][1] + ' x ' + array[3][2];
    catalog_card_second_info.appendChild(catalog_card_dimensions);

    catalog_card_border.appendChild(catalog_card_second_info);

    const catalog_card_button = document.createElement('button');
    catalog_card_button.className = 'catalog_card_button';
    catalog_card_button.innerHTML = WEBSITE_INFO.go_to_catalog[lang];
    catalog_card_button.dataset.en = WEBSITE_INFO.go_to_catalog[EN_LANG];
    catalog_card_button.dataset.pl = WEBSITE_INFO.go_to_catalog[PL_LANG];
    catalog_card_button.dataset.ru = WEBSITE_INFO.go_to_catalog[RU_LANG];
    catalog_card_button.onclick = function(){
        show_products(array[0]);
    }
    catalog_card_border.appendChild(catalog_card_button);

    array.forEach(function (item, index, array) {
        // [0] - {en:.., pl:.., ru:..} названия
        // [1] - [0, 1] картинки
        // [2] - number цена
        // [3] - [0, 1, 2] размеры
        // [4] - number количество
    });

    return catalog_card_border;
}