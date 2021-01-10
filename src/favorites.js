import { WEBSITE_INFO } from './lang.js';

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