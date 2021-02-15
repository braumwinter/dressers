export function scroll_button() {
    const scrolled = window.pageYOffset;
    const coords = document.documentElement.clientHeight;
    const go_top_butoon = document.getElementById('back_to_top');

    if (scrolled > coords) {
        go_top_butoon.classList.add('back_to_top_active');
    }
    if (scrolled < coords) {
        go_top_butoon.classList.remove('back_to_top_active');
    }
}

export function back_top() {
    window.scrollBy({
        top: -document.documentElement.scrollHeight,
        behavior: 'smooth'
    });
}