$(function() {

    $('.dropdown-parent').on('click', function(e) {
        if (e.target.tagName === 'A') { // if link clicked, dont close lists
            return;
        }

        $dropdownParent = $(this);
        $dropdownChild = $(this).find('.dropdown-child');
        $dropdownIcon = $(this).find('.dropdown-icon');

        $dropdownParent.toggleClass('down');
        $dropdownIcon.addClass('up');

        if ($dropdownParent.hasClass('down')) {
            $dropdownChild.css('height', $dropdownChild.children().length * 30 + 'px');

        } else {

            $dropdownChild.css('height', '0px');
            $dropdownParent.removeClass('down');
            $dropdownIcon.removeClass('up');

        }
    });

});

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
$(function() {
    const $form = $('#form');
    const $submitButton = $('#submit-button');
    const $submissionMessages = $('#submission-messages');

    async function handleSubmit(event) {

        let sections = [
            { key: 'fname', text: 'Your first name' },
            { key: 'lname', text: 'Your last name' },
            { key: 'message', text: 'A message' }
        ];
        let completeSections = [];
        let emailOrTel = false;
        let completed = false;

        event.preventDefault();
        $submissionMessages.empty(); // clean slate messages

        let data = new FormData(event.target);

        sections.forEach(section => {
            if (!data.get(section.key)) {
                $submissionMessages.append(`<li>${section.text} is required.</li>`);
            } else {
                completeSections.push(section.key);
            }
        });

        if (!data.get('tel') && !data.get('email')) {
            $submissionMessages.append('<li>Either your email or your phone number is required.</li>');
        } else {
            emailOrTel = true;
        }

        for (var i = 0; i < sections.length; i++) {

            completed = completeSections.indexOf(sections[i].key);

            if (completed < 0) {
                completed = false;
                i = 99;
            } else {
                completed = true;
            }
        }

        if (completed && emailOrTel) {
            completed = true;
        } else {
            completed = false;
        }

        if (completed) {

            fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                $submissionMessages.append("<li>Thanks, I'll be in touch soon!</li>");
                $submitButton.css('display', 'none');
                console.log(response);
                form.reset();
            }).catch(error => {
                $submissionMessages.append("<li>Thanks, I'll be in touch soon!</li>");
                $submitButton.css('display', 'block');
                console.error(error); 
            });
        }

    }

    $form.on('submit', handleSubmit);

});
//# sourceMappingURL=app.js.map