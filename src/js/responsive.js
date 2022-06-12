export const swiperMode = () => {
    let swiper = Swiper;
    let init = false;
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

                sliderPerView: 1,
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 20
                    },
                    992: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    }
                }
            });
            let cardCheck = document.querySelectorAll('.card__todo');
            cardCheck.forEach(card => {
                card.addEventListener('touchmove', (event) => {
                    swiper.slideNext(4000, false);
                })
            })
        }

    } else if (tablet.matches) {
        $('.swiper').addClass( "disabled" );
        init = false;
    } else if (desktop.matches) {
        $('.swiper').addClass( "disabled" );
        init = false;
    }
    return swiper;

}
