// 헤더 js
$(function () {
    $(document).ready(function () {

        var scrollOffset = $('.scroll-menu').offset();

        $(window).scroll(function () {
            if ($(document).scrollTop() > scrollOffset.top) {
                $('.scroll-menu').addClass('scroll-fixed');
            }
            else {
                $('.scroll-menu').removeClass('scroll-fixed');
            }
        });
    });
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
        slidesPerView: 2,
        loop: true,

        coverflowEffect: {
            rotate: 30,
            stretch: 50, // 간격
            depth: 100,
            modifier: 1,
            slideShadows: false, //그라데이션 제거
        },

        pagination: {
            el: ".swiper-pagination",
        },

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },

        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },

    });
});