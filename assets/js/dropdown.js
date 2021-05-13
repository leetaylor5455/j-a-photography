$(function() {

    $('.dropdown-parent').on('click', function(e) {
        $dropdownParent = $(this);
        $dropdownChild = $(this).find('.dropdown-child');
        $dropdownIcon = $(this).find('.dropdown-icon');

        $dropdownParent.toggleClass('down');
        $dropdownIcon.addClass('up');

        if ($dropdownParent.hasClass('down')) {

            e.preventDefault();
            $dropdownChild.css('height', $dropdownChild.children().length * 30 + 'px');

        } else if ($(e.target).hasClass('dropdown-icon')) {

            $dropdownChild.css('height', '0px');
            $dropdownParent.removeClass('down');
            $dropdownIcon.removeClass('up');

        }
    });

});