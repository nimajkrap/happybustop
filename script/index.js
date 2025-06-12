
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

// 헤더 픽스 js
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


// 퀵버튼 js
$(function () {
    $(window).scroll(function () {
        if ($(document).scrollTop() > 200) {
            $('.quick_btn').addClass('btn_on');
        }
        else {
            $('.quick_btn').removeClass('btn_on');
        }
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
        slidesPerView: 'auto',
        loop: true,
        loopedSlides: 1,

        on: {
            // 1. 초기화 이전에 슬라이드 복제
            beforeInit: slideClone,

            // 2. 활성 pagination 순환하기
            slideChange: function (instance) {
                swiperPaginationLoop(instance)
            }
        },

        coverflowEffect: {
            rotate: 30,
            stretch: 30, // 간격
            depth: 0,
            modifier: 1,
            slideShadows: false, //그라데이션 제거
        },

        pagination: {
            el: ".story_first .swiper-pagination",
            clickable: true,
            renderBullet: paginationOverflow,
        },

        navigation: {
            nextEl: ".story_first .swiper-button-next",
            prevEl: ".story_first .swiper-button-prev",
        },
    });
});

function slideClone(tg) {
    var swiperWrapper = tg.el.querySelector('.swiper-wrapper');
    var slides = swiperWrapper.querySelectorAll('.swiper-slide');

    for (var i = 0; i < slides.length; i++) {
        var clone = slides[i].cloneNode(true);
        swiperWrapper.appendChild(clone);
    }
}

function swiperPaginationLoop(instance) {
    var currentIndex = instance.realIndex;
    var loopedSlides = instance.slides.length / 2;

    if (currentIndex >= loopedSlides) {
        currentIndex -= loopedSlides;
    }

    $(instance.pagination.bullets[currentIndex]).addClass('swiper-pagination-bullet-active');
}

function paginationOverflow(index, className) {
    if (index > this.slides.length / 2 - 1) {
        return '';
    } else {
        return '<span class="' + className + '"></span>';
    }
}



// 소개 메뉴 js
$(function () {
    const menuLinks = $('.int_menu li a');
    const sections = ['#HappyBusStop', '#Activity', '#Faith'];

    $(window).on('scroll', function () {
        let scrollTop = $(this).scrollTop();

        // 현재 어떤 섹션이 보이는지 체크
        sections.forEach((id, index) => {
            let target = $(id);
            let offsetTop = target.offset().top - 280; // 조정값

            if (scrollTop >= offsetTop) {
                // 모든 메뉴에서 클래스 제거 후 현재만 추가
                menuLinks.removeClass('active');
                menuLinks.eq(index).addClass('active');
            }
        });
    });
});


// 소개 카운팅 js

$(function () {
    // 카운트 애니메이션 함수
    function countUp($el, target) {
        $({ val: 0 }).animate({ val: target }, {
            duration: 2000,
            step: function (now) {
                $el.text(Math.floor(now).toLocaleString());
            }
        });
    }

    let counted = false;

    $(window).on('scroll', function () {
        const trigger = $('.count').offset().top - window.innerHeight + 100;

        if (!counted && $(window).scrollTop() > trigger) {
            counted = true;

            $('.counting h2').each(function () {
                const targetNum = parseInt($(this).text().replace(/,/g, ''));
                countUp($(this), targetNum);
            });
        }
    });
});


// 그래프 js

$(function () {
    let chartRendered = false;

    const config = {
        type: 'doughnut',
        data: {
            labels: ['아동지원', '운영관리', '기타'],
            datasets: [{
                data: [81.0, 13.0, 5.0],
                backgroundColor: ['#E32C23', '#FFD206', '#cccccc'],
                borderWidth: 0
            }]
        },
        options: {
            cutout: '40%',
            responsive: false,
            animation: {
                animateRotate: true,
                duration: 1500
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                },
                datalabels: false 
            }
        },
        plugins: [{
            id: 'customLabels',
            afterDatasetsDraw(chart, args, options) {
                const { ctx, data, chartArea: { top, bottom, left, right }, _metasets } = chart;
                ctx.save();
                ctx.font = 'bold 17px Pretendard Variable';
                ctx.fillStyle = 'white';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                const meta = chart.getDatasetMeta(0);
                meta.data.forEach((element, index) => {
                    const value = data.datasets[0].data[index];
                    const { x, y } = element.tooltipPosition();
                    ctx.fillText(`${value}%`, x, y);
                });

                ctx.restore();
            }
        }]
    };



    $(window).on('scroll', function () {
        const chartTop = $('#donutChart').offset().top;
        const scrollTop = $(window).scrollTop();
        const winHeight = $(window).height();

        if (!chartRendered && scrollTop + winHeight > chartTop + 50) {
            chartRendered = true;
            new Chart(document.getElementById('donutChart'), config);
        }
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

        speed: 700,
    });
});

$(function () {
    document.querySelectorAll('.swiper-slide').forEach(slide => {
        const bar = slide.querySelector('.per_red');
        if (!bar) return;

        const targetWidth = getComputedStyle(slide).getPropertyValue('--target-width');

        slide.addEventListener('mouseenter', () => {
            // 현재 width를 유지 중이므로 잠시 0으로 설정
            bar.style.transition = 'none';
            bar.style.width = '0px';

            // 리플로우 발생 → transition 재활성화
            void bar.offsetWidth;

            // 다시 애니메이션 적용
            bar.style.transition = 'width 0.8s ease-out';
            bar.style.width = targetWidth;
        });
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



// 굿즈 제품 하트 js
$(function () {
    $(document).ready(function () {
        // 큰 하트 토글
        $('.heartbig').click(function () {
            $(this).hide();
            $('.heartbigred').show();
        });

        $('.heartbigred').click(function () {
            $(this).hide();
            $('.heartbig').show();
        });

        // 작은 하트들 토글
        $('.heartdefault').click(function () {
            $(this).hide();
            $(this).siblings('.heartred').show();
        });

        $('.heartred').click(function () {
            $(this).hide();
            $(this).siblings('.heartdefault').show();
        });
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

        autoplay: {
            delay: 4000, // 머무는 시간
            disableOnInteraction: false,
        },

        speed: 700, // fade 속도

        navigation: {
            nextEl: "#Letter .swiper-button-next",
            prevEl: "#Letter .swiper-button-prev",
        },
    });
});

$(function () {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out-back'
    });
});