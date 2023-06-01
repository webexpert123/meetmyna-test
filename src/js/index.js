$(function() {
  let pageYoffset = 0;
  function headerListener() {
    const header = document.getElementById('header');
    const headerBtn = document.getElementById('header-trial-btn');
    if(!header) return;
    const headerHeight = header.getBoundingClientRect().height;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    // checks if the page is scrolling up or down 
    if(pageYoffset < scrollTop) {
      // checks if the scroll is bigger than the header height 
      if (scrollTop > headerHeight) {
        header.classList.add('-translate-y-full');
        let noYellowBtn = header.classList.contains('no-yellow-btn')
        // add set timeout to delay the bg change 
        setTimeout(() => {
          header.classList.add('bg-white', 'shadow');
          if(!noYellowBtn) {
            headerBtn.classList.add('bg-mynaYellow');
          }
        }, 500);
      }
    } else {
      header.classList.remove('-translate-y-full');
      if (scrollTop < headerHeight) {
        let notTransparent = header.classList.contains('not-transparent')
        if(!notTransparent) {
          header.classList.remove('bg-white', 'shadow');
          headerBtn.classList.remove('bg-mynaYellow');
        }
      }
    }
    // set previous pageYoffset 
    pageYoffset = scrollTop;
  }

  function closeCookies() {
    document.cookie = "mynaCookieAccept=true"
    const cookie = document.getElementById('cookies');
    cookie.classList.add('translate-y-full');
  }

  if(document.cookie.indexOf("mynaCookieAccept=") <= 0) {
    const cookieBtn = document.getElementById("accept-cookies");
  
    $('body').append(`<div class="fixed bottom-0 w-full bg-mynaGrey py-4 transform transition duration-300 ease-in-out" id="cookies">
    <div class="container sm:flex justify-between items-center">
    <p class="sm:mb-0 mb-4 text-white">This website uses cookies to improve your experience. We'll assume you're ok with this, but you can opt-out if you wish.</p>
    <button type="button" class="focus:outline-none rounded-full outline-none bg-white px-8 py-4" id="accept-cookies">Accept Cookies</button>
    </div>
    </div>`)
    if(cookieBtn) {
      cookieBtn.addEventListener("click", closeCookies);
    }
  }
  
  function toggleMobileNav() {
    const mobileHeader = document.getElementById('mobileHeader');
    if(mobileHeader.classList.contains('translate-x-full')) {
      mobileHeader.classList.remove('translate-x-full');
    } else {
      mobileHeader.classList.add('translate-x-full');
    }
  }
  
  const cookieBtn = document.getElementById("accept-cookies");
  const toggleMobile = document.getElementById('toggleMobile');
  
  if(cookieBtn) {
    cookieBtn.addEventListener("click", closeCookies);
  }
  if(toggleMobile) {
    toggleMobile.addEventListener("click", toggleMobileNav);
  }
  
  
  document.addEventListener('scroll', headerListener);
  
  window.addEventListener('resize', function() {
    const mobileHeader = document.getElementById('mobileHeader');
    let closedHeader = mobileHeader.classList.contains('translate-x-full');
    if(window.innerWidth > 768 && !closedHeader) {
      mobileHeader.classList.add('translate-x-full');
    }
  })


  //accodian on icon classes are transform rotate-45
  $('.accordion-item').click(function(e) {
    e.preventDefault();
    $(this).next().slideToggle();
    $(this).find('img').toggleClass('transform rotate-45');
  })


  //mailchimp
  let mailchimpForm = $('#mc-embed-form');
  let errors = $('#mailchimp-errors');
  function checkEmail(email) {
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return emailRegex.test(email)
  }

  function registerToMailchimp() {
    let action = mailchimpForm.attr('action');
    let method = mailchimpForm.attr('method');
    let data = mailchimpForm.serialize();
    console.log(action)
    $.ajax({
      type: method,
      url: action,
      data: data,
      cache: false,
      dataType: 'jsonp',
      contentType: 'application/json;charset=utf-8',
      error: (err) => {
        errors.html(`<p class="text-xs text-mynaMaroon mt-2">Something went wrong - please try again later</p>`);
      },
      success: (data) => {
        console.log(data);
        if(data.result === 'success') {
          errors.html(`<p class="text-xs text-mynaMint mt-2">Thank you for subscribing.</p>`);
          $('#mc-embed-form input[name="EMAIL"]').val('');
        } else if(data.result === 'error') {
          errors.html(`<p class="text-xs text-mynaMaroon mt-2">${data.msg}</p>`)
        }
      }
    })
  }

  mailchimpForm.submit(function(e) {
    e.preventDefault();
    let email = $(this).serializeArray()[0].value;
    if(!checkEmail(email)) {
      errors.html(`<p class="text-xs text-mynaMaroon mt-2">Your email address is incorrect - please try again</p>`);
    } else {
      registerToMailchimp();
    }
  })

  // Faq tabs
  let faqSelector = $('.faq-selector');
  let faqitems = $('.faq-item');
  if(faqSelector.length > 0) {
    faqSelector.click(function() {
      // control the selected tab 
      if($(this).hasClass('text-mynaNoir')) return;
      faqSelector.removeClass('text-mynaNoir');
      $(this).addClass('text-mynaNoir');
      // show the correct tab data 
      let tabvalue = $(this).data('value');
      let selectedTab = $(`.faq-item[data-tab="${tabvalue}"]`)
      if(!selectedTab.hasClass('hidden')) return;
      faqitems.addClass('hidden');
      selectedTab.removeClass('hidden');
    })
  }
  //pricing tabs
  let defaultState = "windows"
  let tabSelector = $('#pricing-tabs .tab-selector');
  let tabItems = $('.tab-item');
  let tabSelectInput = $('#tab-selector');
  if (window.navigator.userAgent.indexOf("Windows NT 10.0")!= -1) defaultState="windows";
  if (window.navigator.userAgent.indexOf("Mac")            != -1) defaultState="mac";
  if (window.navigator.userAgent.indexOf("Linux")          != -1) defaultState="linux";
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent) ) {
    // some code..
    defaultState = "tablet"
  }

  function changeTabOnDevice(device) {
    let selectedTab = $(`#pricing-tabs .tab-selector[data-value="${device}"]`);
    if(selectedTab.hasClass('border-mynaYellow')) return;
    tabSelector.removeClass('border-b-4 border-mynaYellow');
    tabSelector.addClass('border-b-1 opacity-50');
    selectedTab.removeClass('opacity-50');
    selectedTab.addClass('border-b-4 border-mynaYellow');
    showTabItem(device);
  }

  changeTabOnDevice(defaultState);


  function showTabItem(value) {
    let selectedTab = $(`.tab-item[data-tab="${value}"]`)
    if(!selectedTab.hasClass('hidden')) return;
    tabItems.addClass('hidden');
    selectedTab.removeClass('hidden');
  }

  if(tabSelector.length > 0) {
    tabSelector.click(function() {
      // control the selected tab 
      if($(this).hasClass('border-mynaYellow')) return;
      tabSelector.removeClass('border-b-4 border-mynaYellow');
      tabSelector.addClass('border-b-1 opacity-50');
      $(this).removeClass('opacity-50');
      $(this).addClass('border-b-4 border-mynaYellow');
      // show the correct tab data 
      let tabvalue = $(this).data('value');
      showTabItem(tabvalue);
      //change the value of the dropdown
      tabSelectInput.val(tabvalue);
    })
  }

  if(tabSelectInput) {
    tabSelectInput.on('change', function() {
      let selectedTab = $(`#pricing-tabs .tab-selector[data-value="${this.value}"]`);
      if(selectedTab.hasClass('border-mynaYellow')) return;
      tabSelector.removeClass('border-b-4 border-mynaYellow');
      tabSelector.addClass('border-b-1 opacity-50');
      selectedTab.removeClass('opacity-50');
      selectedTab.addClass('border-b-4 border-mynaYellow');
      showTabItem(this.value);
    })
  }

})
