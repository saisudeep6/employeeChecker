$( function() {

    var wind = $(window);

    wow = new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 200,
        mobile: false,
        live: false
    });
    wow.init();

    // ---------- background change -----------
    var pageSection = $(".bg-img");
    pageSection.each(function (indx) {

        if ($(this).attr("data-background")) {
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });

    // demos dropdown toggle show
    $(".demos-dropdown-toggle , .demos-dropdown").on("mouseenter", function(){
        $(this).parent().find(".demos-dropdown").addClass("show");
    })
    $(".demos-dropdown-toggle , .demos-dropdown").on("mouseleave", function(){
        $(this).parent().find(".demos-dropdown").removeClass("show");
    })

    // ---------- links transition -----------
    var links = document.querySelectorAll('.fade-link');

    // Attach click event listener to each link
    links.forEach(function(link) {
      link.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default navigation behavior

        // Fade out the body
        document.body.style.opacity = 0;

        // Wait for the transition to complete
        document.body.addEventListener('transitionend', function() {
          // Load the new page after the fade-out effect
          window.location.href = event.target.href;
        }, { once: true });
      });
    });


    // ---------- to top -----------

    wind.on("scroll", function() {

        var bodyScroll = wind.scrollTop(),
            toTop = $("#to_top")

        if (bodyScroll > 700) {

            toTop.addClass("show");

        } else {

            toTop.removeClass("show");
        }
    });

    $('#to_top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 0);
        return false;
    });

    // -------- counter --------
    $('.counter').countUp({
        delay: 10,
        time: 2000
    });


     /* ==  float_box_container button  == */
    $( ".float_box_container" ).mousemove(function(e) {
        var parentOffset = $(this).offset(); 
        var relX = e.pageX - parentOffset.left;
        var relY = e.pageY - parentOffset.top;
        $(".float_box").css({"left": relX, "top": relY });
        $(".float_box").addClass("show");
    });
    $( ".float_box_container" ).mouseleave(function(e) {
        $(".float_box").removeClass("show");
    });

    // -------- fav-btn --------
    $(".fav-btn").on("click", function(){
        $(this).toggleClass("active");
    })

    // -------- cls --------
    $(".cls").on("click", function(){
        $(this).parent().fadeOut();
    })

    // ------------ working in desktop -----------
    if ($(window).width() > 991) {
        $('.parallaxie').parallaxie({
        });
    }

    // ---------- tooltip -----------
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
    })
        
});

// -------- parralax img mouse move -------
$(function () {
    
    var b = document.getElementsByTagName("body")[0];  

    b.addEventListener("mousemove", function(event) {
    parallaxed(event);

    });

    function parallaxed(e) {
        var amountMovedX = (e.clientX * -0.3 / 8);
        var amountMovedY = (e.clientY * -0.3 / 8);
        var x = document.getElementsByClassName("parallaxed");
        var i;
        for (i = 0; i < x.length; i++) {
            x[i].style.transform='translate(' + amountMovedX + 'px,' + amountMovedY + 'px)'
        }
    }
});



// ------------ Preloader -----------
$( function() {
    const svg = document.getElementById("svg");
    const tl = gsap.timeline();
    const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
    const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

    tl.to(".loader-wrap-heading .load-text , .loader-wrap-heading .cont", {
        delay: 1.5,
        y: -100,
        opacity: 0,
    });
    tl.to(svg, {
        duration: 0.5,
        attr: { d: curve },
        ease: "power2.easeIn",
    }).to(svg, {
        duration: 0.5,
        attr: { d: flat },
        ease: "power2.easeOut",
    });
    tl.to(".loader-wrap", {
        y: -1500,
    });
    tl.to(".loader-wrap", {
        zIndex: -1,
        display: "none",
    });
    tl.from(
        "header",
        {
            y: 200,
        },
        "-=1.5"
    );
    tl.from(
        "header .container",
        {
            y: 40,
            opacity: 0,
            delay: 0.3,
        },
        "-=1.5"
    );
});


$(window).on("load", function () {

    // ------------ Preloader -----------
    var body = $('body');
    body.addClass('loaded');
    setTimeout(function () {
        body.removeClass('loaded');
    }, 1500);

});

    // ------------ magnetic hover -----------
    var hoverMouse = function ($el) {
        $el.each(function () {
        var $self = $(this);
        var hover = false;
        var offsetHoverMax = $self.attr("offset-hover-max") || 0.1;
        var offsetHoverMin = $self.attr("offset-hover-min") || 0.2;

        var attachEventsListener = function () {
        $(window).on("mousemove", function (e) {
            //
                var hoverArea = hover ? offsetHoverMax : offsetHoverMin;

                // cursor
                var cursor = {
                x: e.clientX,
                y: e.pageY
                };

                // size
                var width = $self.outerWidth();
                var height = $self.outerHeight();

                // position
                var offset = $self.offset();
                var elPos = {
                x: offset.left + width / 2,
                y: offset.top + height / 2
                };

                // comparaison
                var x = cursor.x - elPos.x;
                var y = cursor.y - elPos.y;

                // dist
                var dist = Math.sqrt(x * x + y * y);

                // mutex hover
                var mutHover = false;

                // anim
                if (dist < width * hoverArea) {
                mutHover = true;
                if (!hover) {
                    hover = true;
                }
                onHover(x, y);
                }

                // reset
                if (!mutHover && hover) {
                onLeave();
                hover = false;
                }
            });
            };

            var onHover = function (x, y) {
            TweenMax.to($self, 0.4, {
                x: x * 0.8,
                y: y * 0.8,
                scale: .95,
                rotation: x * 0.1,
                ease: Power2.easeOut
            });
            };
            var onLeave = function () {
            TweenMax.to($self, 0.7, {
                x: 0,
                y: 0,
                scale: 1,
                rotation: 0,
                ease: Elastic.easeOut.config(1.2, 0.4)
            });
            };

            attachEventsListener();
        });
    };

    hoverMouse($(".butn , .magnetic-hover"));



      // ------------ mousecursor scripts -----------
    $( function() {
        function mousecursor() {
            if ($("body")) {
                const e = document.querySelector(".cursor-inner"),
                    t = document.querySelector(".cursor-outer");
                let n, i = 0,
                    o = !1;
                window.onmousemove = function (s) {
                    o || (t.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)"), e.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)", n = s.clientY, i = s.clientX
                },
                $("body").on("mouseenter", "a, .cursor-pointer", function () {
                    e.classList.add("cursor-hover"), t.classList.add("cursor-hover")
                })
                , $("body").on("mouseleave", "a, .cursor-pointer", function () {
                    e.classList.remove("cursor-hover"), t.classList.remove("cursor-hover")
                }),

                    // $("body").on("mouseenter", ".swiper-wrapper.curs-scroll", function () {
                    //     e.classList.add("cursor-scroll"), t.classList.add("cursor-scroll")
                    // }), $("body").on("mouseleave", ".swiper-wrapper.curs-scroll", function () {
                    //     $(this).is("a") && $(this).closest(".cursor-pointer").length || (e.classList.remove("cursor-scroll"), t.classList.remove("cursor-scroll"))
                    // }),

                    e.style.visibility = "visible", t.style.visibility = "visible"
            }
        };

        $(function () {
            mousecursor();
        });

    });




    // ------------ gsap scripts -----------
$(function () {
    // gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    // ------ demos dropdown cards effect ------
    const tl400 = gsap.timeline();

    tl400.to(".demos-dropdown .demo-card", {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        delay: 0.3,
        stagger: {
            amount: 0.5,
            from: "start"
        }
    });

    
    const demosDropdownToggleList = document.querySelectorAll(".demos-dropdown-toggle");
    const demosDropdownList = document.querySelectorAll(".demos-dropdown");

    demosDropdownToggleList.forEach(function(demosDropdownToggle) {
        demosDropdownToggle.addEventListener("mouseenter", function() {
            tl400.restart();
        });

        demosDropdownToggle.addEventListener("mouseleave", function() {
            tl400.reverse();
        });
    });

    demosDropdownList.forEach(function(demosDropdown) {
        demosDropdown.addEventListener("mouseenter", function() {
            tl400.play();
        });

        demosDropdown.addEventListener("mouseleave", function() {
            tl400.reverse();
        });
    });

});
    

$(function () {

    // ------------ team images width same height -----------
    // var images = $(".tc-team-style1 .team-card .img, .img_sm_h");
    // images.each(function () {
    //   var width = $(this).width();
    //   $(this).height(width);
    // });


    // toggle saerch 
    $(".search-form").hide();
    $(".search-icon").on("click", function(){
        $(this).find(".fa-search").toggleClass("fa-times");
        $(".search-form").fadeToggle();
    })
    

    // ----------- side menu -----------
    $(".side_menu_btn").on("click", function () {
        $(this).toggleClass("active");
        $(".side_menu4_overlay").toggleClass("show");
        $(".side_menu4_overlay2").toggleClass("show");
        $(".side_menu_style4").toggleClass("show");
    });

    $(".side_menu_style4 .clss").on("click", function () {
        $(".side_menu4_overlay").toggleClass("show");
        $(".side_menu4_overlay2").toggleClass("show");
        $(".side_menu_style4").toggleClass("show");
    });


});


// ------------ swiper sliders -----------
$(document).ready(function () {

    // ------------ tc-case-st2 -----------
    var swiper = new Swiper('.tc-case-st2 .case-slider', {
        spaceBetween: 100,
        centeredSlides: true,
        speed: 1000,
        pagination: false,
        navigation: false,
        mousewheel: false,
        keyboard: true,
        autoplay: {
            delay: 5000,
        },
        loop: true,
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            480: {
                slidesPerView: 1,
            },
            787: {
                slidesPerView: 1,
            },
            991: {
                slidesPerView: 1,
            },
            1200: {
                slidesPerView: 1.8,
            }
        }
    });


    // ------------ tc-case-st2 -----------
    var swiper = new Swiper('.tc-case-st2 .marq-text', {
        spaceBetween: 30,
        centeredSlides: true,
        slidesPerView: "auto",
        speed: 100000,
        autoplay: {
            delay: 1,
        },
        loop: true,
    //   allowTouchMove: false,
        disableOnInteraction: true,
    });


    // ------------ tc-case-st2 -----------
    var swiper = new Swiper('.tc-testimonials-st2 .testimonials-slider', {
        spaceBetween: 80,
        speed: 1000,
        pagination: false,
        navigation: false,
        mousewheel: false,
        keyboard: true,
        autoplay: {
            delay: 5000,
        },
        loop: true,
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            480: {
                slidesPerView: 1,
            },
            787: {
                slidesPerView: 1,
            },
            991: {
                slidesPerView: 1,
            },
            1200: {
                slidesPerView: 2,
            }
        }
    });


    // ------------ logos-slider -----------
    var swiper = new Swiper('.tc-testimonials-st2 .logos-slider', {
        spaceBetween: 80,
        centeredSlides: true,
        slidesPerView: "auto",
        speed: 10000,
        autoplay: {
            delay: 1,
        },
        loop: true,
    //   allowTouchMove: false,
        disableOnInteraction: true,
    });


});



// ------------ gsap scripts -----------
$(function () {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    // create the smooth scroller FIRST!
    const smoother = ScrollSmoother.create({
        content: "#scrollsmoother-container",
        smooth: 2,
        normalizeScroll: true,
        ignoreMobileResize: true,
        effects: true,
        //preventDefault: true,
        //ease: 'power4.out',
        //smoothTouch: 0.1, 
    });

    // smoother.effects("img", { speed: "auto" });

    let headings = gsap.utils.toArray(".js-title").reverse();
    headings.forEach((heading, i) => {
        let headingIndex = i + 1;
        let mySplitText = new SplitText(heading, { type: "chars" });
        let chars = mySplitText.chars;

        chars.forEach((char, i) => {
            smoother.effects(char, { lag: (i + headingIndex) * 0.1, speed: 1 });
        });
    });


    let splitTextLines = gsap.utils.toArray(".js-splittext-lines");

    splitTextLines.forEach(splitTextLine => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: splitTextLine,
                start: 'top 90%',
                duration: 2,
                end: 'bottom 60%',
                scrub: false,
                markers: false,
                toggleActions: 'play none none none'
                // toggleActions: 'play none play reset'
            }
        });

        const itemSplitted = new SplitText(splitTextLine, { type: "lines" });
        gsap.set(splitTextLine, { perspective: 400 });
        itemSplitted.split({ type: "lines" })
        // tl.from(itemSplitted.lines, { y: 100, delay: 0.2, opacity: 0, stagger: 0.1, duration: 1, ease: 'inOut' });
        // tl.from(itemSplitted.lines, { y: 100, opacity: 0, stagger: 0.05, duration: 1, ease: 'back.inOut' });
        tl.from(itemSplitted.lines, { duration: 1, delay: 0.5, opacity: 0, rotationX: -80, force3D: true, transformOrigin: "top center -50", stagger: 0.1 });
    });

});

// Spinner
var spinner = function () {
    setTimeout(function () {
        if ($('#spinner').length > 0) {
            $('#spinner').removeClass('show');
        }
    }, 1);
};
spinner();

// Sticky Navbar
$(window).scroll(function () {
    if ($(this).scrollTop() > 45) {
        $('.nav-bar').addClass('sticky-top');
    } else {
        $('.nav-bar').removeClass('sticky-top');
    }
});

// Back to top button
$(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
});
$('.back-to-top').click(function () {
    $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
    return false;
});

