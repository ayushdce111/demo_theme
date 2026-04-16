

'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    //Canvas Menu
    $(".canvas__open").on('click', function () {
        $(".offcanvas-menu").addClass("show-offcanvas-menu");
        $(".offcanvas-menu-overlay").addClass("active");
        $("body").addClass("over-hid");
    });

    $(".offcanvas-menu-overlay").on('click', function () {
        $(".offcanvas-menu").removeClass("show-offcanvas-menu");
        $(".offcanvas-menu-overlay").removeClass("active");
        $("body").removeClass("over-hid");
    });

    /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*------------------
        Hero Slider
    --------------------*/
    var hero_s = $(".hero__sliders");
    hero_s.owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: false,
        nav: true,
        navText: ["<span class='arrow_left'><span/>", "<span class='arrow_right'><span/>"],
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true
    });

    /*--------------------------
    Testimonial Slider
    ----------------------------*/
    var testimonialSlider = $(".testimonial__slider");
    testimonialSlider.owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: true,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: false
    });

    /*-----------------------------
        Team Slider
    -------------------------------*/
    $(".team__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 2,
        dots: false,
        nav: true,
        navText: ["<span class='arrow_left'><span/>", "<span class='arrow_right'><span/>"],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {

            320: {
                items: 1
            },
            768: {
                items: 2
            }
        }
    });

    /*--------------------------
        Select
    ----------------------------*/
    $(".class-select").niceSelect();
    $("select").niceSelect();

    /*------------------
        Accordin Active
    --------------------*/
    $('.collapse').on('shown.bs.collapse', function () {
        $(this).prev().addClass('active');
    });

    $('.collapse').on('hidden.bs.collapse', function () {
        $(this).prev().removeClass('active');
    });

    /*------------------
		Pricing
    --------------------*/
    $(".pricing__item").mouseover(function () {
        $(".pricing__item").removeClass('active');
        $(this).addClass('active');
    });

    /*------------------
		Barfiller
	--------------------*/
    $('#bar1').barfiller({
        barColor: "#5768AD",
    });

    $('#bar2').barfiller({
        barColor: "#5768AD",
    });

    $('#bar3').barfiller({
        barColor: "#5768AD",
    });

    $('#bar4').barfiller({
        barColor: "#5768AD",
    });

    /*------------------
        Counter Up
    --------------------*/
    $('.choose-counter').each(function () {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 4000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });

})(jQuery);


const myanimate = document.querySelector(".myanimate");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      myanimate.classList.remove("show");

      // force reflow to restart animation
      void myanimate.offsetWidth;

      myanimate.classList.add("show");
    } else {
      myanimate.classList.remove("show");
    }
  });
}, {
  threshold: 0.5
});

observer.observe(myanimate);


gsap.registerPlugin(ScrollTrigger);

gsap.timeline({
  scrollTrigger: {
    trigger: ".containertoanimate",
    start: "center center",
    // end: "+=200%",
    pin: true,
    scrub: true,
    pinSpacing: true,
    // markers: true // 👈 helpful for debugging
  }
})
.fromTo(".containertoanimate .imagetoanimate",
  { scale: 1 },
  { scale: 1, ease: "none",transformOrigin: "center center " }
);

