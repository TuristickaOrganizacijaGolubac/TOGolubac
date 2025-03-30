$(document).ready(function() {
    var flipbook = $('#flipbook');
    var width = Math.min(1000, $(window).width() * 0.9);
    var height = width;

     $('#flipbook').on('click', '.page', function(e) {
        var x = e.pageX - $(this).offset().left;
        var pageWidth = $(this).width();

        if (x < pageWidth * 0.2) { // Klik na levi ćošak
            $('#flipbook').turn('previous');
        } else if (x > pageWidth * 0.8) { // Klik na desni ćošak
            $('#flipbook').turn('next');
        }
    });

    flipbook.turn({
        width: width,
        height: height,
        autoCenter: true,
        gradients: true, // Omogućava gradijente (curl efekat)
        elevation: 50, // Podešava dubinu curl efekta
        pages: 19,
        display: 'single',
        when: {
            turned: function(e, page) {
                console.log('Trenutna stranica: ' + page);
            }
        }
    });

    $(document).keydown(function(e) {
        if (e.keyCode == 37) {
            flipbook.turn('previous');
        } else if (e.keyCode == 39) {
            flipbook.turn('next');
        }
    });

    flipbook.on('touchstart', function(e) {
        var touchStartX = e.originalEvent.touches[0].pageX;
        flipbook.on('touchmove', function(e) {
            var touchEndX = e.originalEvent.touches[0].pageX;
            if (touchStartX - touchEndX > 50) {
                flipbook.turn('next');
                flipbook.off('touchmove');
            } else if (touchEndX - touchStartX > 50) {
                flipbook.turn('previous');
                flipbook.off('touchmove');
            }
        });
    });

    flipbook.on('touchend', function() {
        flipbook.off('touchmove');
    });

    $(window).resize(function() {
        var width = Math.min(1000, $(window).width() * 0.9);
        var height = width;
        flipbook.turn('size', width, height);
        flipbook.turn('resize');
    });
});
