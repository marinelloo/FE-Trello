export var swiper= Swiper;
export var init = false;

export const swiperMode = () => {
    let desktop = window.matchMedia('(min-width: 1025px)');
    let tablet = window.matchMedia('(min-width: 769px) and (max-width: 1024px)');

    if (!desktop.matches) {
        if (!init) {
            init = true;
            swiper = new Swiper('.swiper', {

                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    type: 'bullets',
                },

                sliderPerView: 3,
                spaceBetween: 30,

                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 20
                    },
                    768: {
                        slidesPerView: 1,
                        spaceBetween: 20
                    },
                    992: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    }
                }
            });
        }

    } else if (tablet.matches) {
        $('.swiper-wrapper').addClass( "disabled" );
        init = false;
    } else if (desktop.matches) {
        $('.swiper-wrapper').addClass( "disabled" );
        init = false;
    }

}
