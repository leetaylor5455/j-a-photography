$(function() {
    const $imageWrapper = $('.images-wrapper');
    const numberOfImages = $imageWrapper.children().length;

    function getCurrentPos() {

        let valueInPx = parseInt($imageWrapper.css('transform').split(',')[5]);

        if (isNaN(valueInPx)) {
            valueInPx = 0
        };

        let valueInPerc = 0;

        if (valueInPx != 0) { // prevent infinite loop after transform is set from null to 0
            valueInPerc = Math.round(valueInPx / $imageWrapper.height()) * 100;
        }

        return valueInPerc;
    }

    function moveTo(val) {
        const duration = 850

        $imageWrapper.css({
            'opacity': '0',
            'transition': `opacity ${duration}ms cubic-bezier(0.37, 0, 0.63, 1)`
        });

        setTimeout(function() {
            $imageWrapper.css({
                'transform': `translateY(${val}%)`,
                'opacity': '1',
            });
        }, duration);

        
    }

    $('.next').on('click', function() {
        const location = getCurrentPos() - 100;

        if (location > numberOfImages * -100) {
            moveTo(location);
        } else if (location == numberOfImages * -100) {
            moveTo(0);
        }
    });

    $('.prev').on('click', function() {
        const location = getCurrentPos() + 100;

        if (location <= 0) {
            moveTo(location);
        }
    });
});