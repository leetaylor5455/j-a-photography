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