
// 헤더 js
$(function () {
    window.addEventListener('scroll', function () {
        const headerFixed = document.querySelector('.header_fixed');
        const scrollY = window.scrollY;

        if (scrollY > 10) {
            headerFixed.style.display = 'block';
        } else {
            headerFixed.style.display = 'none';
        }
    });
});



$(function () {
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('.header_fixed').outerHeight();

    $(window).scroll(function (event) {
        didScroll = true;
    });

    setInterval(function () {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }

    }, 250);
});


// 메인 비주얼 슬라이드 js
$(function () {
    var swiper = new Swiper(".MainVisual", {

        loop: true, // 무한 재생

        freeMode: true,

        effect: "fade", // fade 효과
        fadeEffect: {
            crossFade: true // 겹쳐서 fade
        },

        speed: 2000, // fade 속도

        slidesPerview: 1, // 보이는 슬라이드 개수

        autoplay: {
            delay: 5000, // 머무는 시간
            disableOnInteraction: false,
        },

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },

    });
});


// 후원 배너 js
$(function () {
    const $selectBox = $(".text_ul_wrap > a");
    const $icon = $(".select_icon");
    const $menu = $(".ul_select_style");
    const $input = $(".amount_input");

    // 토글 드롭다운
    $selectBox.on("click", function () {
        $menu.toggleClass("active");
        $icon.toggleClass("active");
    });

    // 선택 이벤트
    $(".ul_select_style > li").on("click", function () {
        const text = $(this).text();
        $selectBox.text(text);
        $menu.removeClass("active");
        $icon.removeClass("active");

        if (text === "직접입력") {
            $input.val("");
            $input.focus();
        } else {
            $input.val(formatComma(text));
        }
    });

    // 바깥 클릭 시 닫기
    $("body").on("click", function (e) {
        if (!$(".text_ul_wrap").has(e.target).length && !$input.is(e.target)) {
            $menu.removeClass("active");
            $icon.removeClass("active");
        }
    });

    // 숫자만 입력 + 쉼표 처리
    $input.on("input", function () {
        const raw = $(this).val().replace(/[^0-9]/g, "");
        $(this).val(formatComma(raw));
    });

    function formatComma(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
});

$('#donationForm').on('submit', function (e) {
    e.preventDefault(); // 기본 제출 막기
    location.reload();  // 새로고침
});


// 스토리 슬라이드 js

$(function () {
    var swiper = new Swiper(".story", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 3,
        loop: true,
        slideToClickedSlide: true,

        coverflowEffect: {
            rotate: 10,
            stretch: 30, // 간격
            depth: 0,
            modifier: 1,
            slideShadows: false, //그라데이션 제거
        },

        pagination: {
            el: ".story_first .swiper-pagination",
            clickable: true,
        },

        navigation: {
            nextEl: ".story_first .swiper-button-next",
            prevEl: ".story_first .swiper-button-prev",
        },
    });
});

$(function(){
    AOS.init({
            duration: 700,
            offset: 300,
            easing: 'ease-out-back',
        });
});

// 캠페인 슬라이드 js   
$(function () {
    var swiper = new Swiper(".campaign", {
        slidesPerView: 4,
        spaceBetween: 25,
        loop: true,
        centeredSlides: false,

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
});


// 후원아동 슬라이드 js
$(function () {
    // 텍스트 슬라이더
    var textSwiper = new Swiper('.chlidText', {
        loop: true,
        allowTouchMove: true,
    });

    // 이미지 슬라이더
    var imageSwiper = new Swiper('.chlid', {
        slidesPerView: 7,
        spaceBetween: 40,
        loop: true,
        centeredSlides: true,
        navigation: {
            nextEl: '.sponchlid .swiper-button-next', // 버튼 바깥으로 빼기
            prevEl: '.sponchlid .swiper-button-prev',
        },
        on: {
            slideChange: function () {
                // 이미지 넘길 때 텍스트도 함께 넘김
                textSwiper.slideToLoop(this.realIndex);
            }
        }
    });

    // 슬라이드 클릭 시 텍스트도 이동
    $('.chlid .swiper-slide').on('click', function () {
        var index = $(this).attr('data-swiper-slide-index'); // 원본 인덱스
        imageSwiper.slideToLoop(index);
        textSwiper.slideToLoop(index);
    });
});


// 소식 슬라이드 js
$(function () {
    var swiper = new Swiper(".letter", {
        slidesPerView: 'auto',
        loop: true,
        centeredSlides: false,
        spaceBetween: 20,
        allowTouchMove: false,

        navigation: {
        nextEl: "#Letter .swiper-button-next",
        prevEl: "#Letter .swiper-button-prev",
      },
    });
});