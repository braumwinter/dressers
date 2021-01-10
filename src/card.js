const path_img = './assets/product/';

export function card_create(obj){
    //console.log(obj);
    const border = document.createElement('div');
    border.className = 'card_border';

    const first_img = document.createElement('img');
    first_img.src = path_img + obj.card_img[0];

    border.appendChild(first_img);

    return border;
}