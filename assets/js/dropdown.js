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