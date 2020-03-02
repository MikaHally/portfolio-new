// Loading animation
$(window).on('load', function () {
    $('body').removeAttr('style');
    $(".loader").fadeOut("slow");
    $(".loader-wrapper").css("display", "none");
});

// Color fade effect
$(window).scroll(function() {

    // selectors
    var $window = $(window),
        $body = $('body'),
        $panel = $('.panel');

    // Change 50% earlier than scroll position so colour is there when you arrive.
    var scroll = $window.scrollTop() + ($window.height() / 2);

    $panel.each(function () {
        var $this = $(this);

        // if position is within range of this panel.
        // So position of (position of top of div <= scroll position) && (position of bottom of div > scroll position).
        // Remember we set the scroll to 50% earlier in scroll var.
        if ($this.position().top <= scroll && $this.position().top + $this.height() > scroll) {

            // Remove all classes on body with color-
            $body.removeClass(function (index, css) {
                return (css.match (/(^|\s)color-\S+/g) || []).join(' ');
            });

            // Add class of currently active div
            $body.addClass('color-' + $(this).data('color'));
        }
    });

}).scroll();

// Toogle video responsive
if ($(window).width() < 960) {
    $("#video-desktop").css("display", "none");
    $("#video-mobile").css("display", "block");
}
else {
    $("#video-desktop").css("display", "block");
    $("#video-mobile").css("display", "none");
}



// Confetti Animation
window.addEventListener('load', function () {
    var end = Date.now() + (1 * 1000);

    // go Buckeyes!
    var colors = ['#275efe', '#ffffff'];

    (function frame() {
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: {
                x: 0
            },
            colors: colors
        });
        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: {
                x: 1
            },
            colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
})


// Responsive navigation menu
function toggleNav() {
    $(".menu").toggleClass("close");
    $(".nav-links").toggleClass("open");
    $(".nav-links li").toggleClass("fade");
}

$(".hamburger").click(function () {
    toggleNav()
});

$("#about").click(function () {
    toggleNav()
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#about-section").offset().top
    }, 500);
});

$("#work").click(function () {
    toggleNav()
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#work-section").offset().top
    }, 500);
});

$("#contact").click(function () {
    toggleNav()
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#contact-section").offset().top
    }, 500);
});

$("#footer-work").click(function () {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#work-section").offset().top
    }, 500);
});

$("#footer-about").click(function () {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#about-section").offset().top
    }, 500);
});

$("#hero-learn-more").click(function () {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#about-section").offset().top
    }, 500);
});




;(function () {

    // Scroll class

    var latestKnownScrollY = window.pageYOffset || 0,
        scrollDebounce = false,
        scrollListeners = [];


    function resetScrollDebounce() {
        scrollDebounce = false;
    }

    function onScroll() {

        if (scrollDebounce) {
            return;
        }

        requestAnimationFrame(resetScrollDebounce);

        latestKnownScrollY = window.pageYOffset; // No IE8

        for (var i = scrollListeners.length - 1; i >= 0; i--) {
            scrollListeners[i]({
                latestKnownScrollY
            });
        }

        scrollDebounce = true;

    }

    window.addEventListener('scroll', onScroll, {passive: false});


    class ScrollSection {

        constructor(element, {onInView, onOutOfView, onScroll, threshold = 0}) {

            this.el = element;

            this.onInView = onInView;
            this.onOutOfView = onOutOfView;
            this.onScroll = onScroll;

            this.observer = new IntersectionObserver((e) => this.intersectionObserver(e), {
                threshold
            });
            this.observer.observe(this.el);

        }

        intersectionObserver([event]) {

            if (event.isIntersecting == true) {
                this.inView(event);
                return;
            }

            this.outOfView(event);

        }

        inView(event) {

            if (this.onInView) {
                this.onInView(event);
            }

            if (this.onScroll) {
                this.onScroll({
                    latestKnownScrollY
                });

                scrollListeners.push(this.onScroll);

            }

        }

        outOfView(event) {

            if (this.onOutOfView) {
                this.onOutOfView(event);
            }

            if (this.onScroll) {

                scrollListeners = scrollListeners.filter(item => {
                    return item != this.onScroll;
                });
            }

        }

        get relativeScrollY() {
            return latestKnownScrollY - this.el.offsetTop;
        }

    }


    // Header scrolled state
    (function () {

        var headerTrigger = document.querySelector(".header-scroll-trigger");

        if (!headerTrigger) return;

        var headerContainer = document.querySelector(".header-container");

        new ScrollSection(headerTrigger, {
            threshold: 0,
            onInView: topOfPage,
            onOutOfView: scrolled
        });


        function topOfPage() {
            headerContainer.classList.remove('scrolled');
        }

        function scrolled() {
            headerContainer.classList.add('scrolled');
        }

    })();

})();
;







