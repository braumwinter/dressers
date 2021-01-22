import {
    WEBSITE_INFO
} from './lang.js';

const path_img = './assets/product/';

export function product_card_create(obj) {
    console.log('product_card_create ', obj);
    const lang = document.getElementById('show_language').dataset.lang || document.getElementById('show_language').innerHTML.toLocaleLowerCase();

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
    card_border.appendChild(card_name);

    const card_cost = document.createElement('p');
    card_cost.className = 'card_cost';
    card_cost.innerHTML = obj.roller_guides + ' $  -  ' + obj.ball_guides + ' $';
    card_border.appendChild(card_cost);

    const card_button = document.createElement('button');
    card_button.className = 'card_button';
    card_button.innerHTML = WEBSITE_INFO.select[lang];
    card_border.appendChild(card_button);

    return card_border;
}

export function catalog_card_create(obj) {
    console.log(obj);
}