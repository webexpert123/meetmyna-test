//Start contact form submit
$(function () {
  $('#contactFormSubmit').click(function () {
    grecaptcha.execute().then(() => {
      var grecaptchacode = grecaptcha.getResponse()
      var body = {
        firstName: $('#grid-first-name').val(),
        lastName: $('#grid-last-name').val(),
        email: $('#contactEmail').val(),
        company: $('#contactCompany').val(),
        message: $('#contactMessage').val(),
        'g-recaptcha-response': grecaptchacode
      }
      $.ajax({
        type: 'POST',
        url: `https://476okppotd.execute-api.eu-west-1.amazonaws.com/prod/api`,
        data: JSON.stringify(body),
        // success: (data) => {

        // }
        complete: (data) => {
          $('#sentMessage').removeClass('hidden')
        }
      })
    })
  })
});
