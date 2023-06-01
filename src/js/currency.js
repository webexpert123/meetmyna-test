$(function() {
  const backendUrl = config.apiServer;
  $.ajax({
    type: 'GET',
    url: `${backendUrl}/subscription/currency`,
    success: (data) => {
      if (data.currency === 'GBP') {
        $(".currency").each(function (index) {
          $(this).html($(this).html().replace(/{currency}/g, '£'))
          $(this).html($(this).html().replace(/{annually}/g, '5'))
          $(this).html($(this).html().replace(/{monthly}/g, '6'))
          $(this).html($(this).html().replace(/{taxText}/g, '+VAT'))
        })
      }
      if (data.currency === 'EUR') {
        $(".currency").each(function (index) {
          $(this).html($(this).html().replace(/{currency}/g, '€'))
          $(this).html($(this).html().replace(/{annually}/g, '7'))
          $(this).html($(this).html().replace(/{monthly}/g, '8'))
          $(this).html($(this).html().replace(/{taxText}/g, '+VAT'))
        })
      }
      if (data.currency === 'USD') {
        $(".currency").each(function (index) {
          $(this).html($(this).html().replace(/{currency}/g, '$'))
          $(this).html($(this).html().replace(/{annually}/g, '8'))
          $(this).html($(this).html().replace(/{monthly}/g, '9'))
          $(this).html($(this).html().replace(/{taxText}/g, '+tax'))
        })
      }
    }
  })
});
