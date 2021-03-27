$(function() {
    let navIsOpen = false;

    let burger = {
        row1: {
            'transform': `translateY(0px)
            rotateZ(0deg)`,
        },
        row2: {
            'opacity': 1
        },
        row3: {
            'transform': `translateY(0px)
            rotateZ(0deg)`,
        }
    }

    let cross = {
        row1: {
            'transform': `translateY(6.5px)
            rotateZ(45deg)`,
        },
        row2: {
            'opacity': 0
        },
        row3: {
            'transform': `translateY(-6.5px)
            rotateZ(-45deg)`,
        }
    }

    $('.nav-button').on('click', function() {
        if (navIsOpen) {
            $('.nav-wrapper').css({
                'opacity': 0,
                'pointer-events': 'none'
            });
            navIsOpen = false;

            $('.row.1').css(burger.row1)
            $('.row.2').css(burger.row2)
            $('.row.3').css(burger.row3)

        } else {
            $('.nav-wrapper').css({
                'opacity': 1,
                'pointer-events': 'all'
            });
            navIsOpen = true;

            $('.row.1').css(cross.row1)
            $('.row.2').css(cross.row2)
            $('.row.3').css(cross.row3)
        }
        
    });
});