$( document ).ready(function(){
  let inputModal = document.querySelector("#phoneModal");



  var itiModal = window.intlTelInput(inputModal, {
    initialCountry: "auto",
    autoPlaceholder: "aggressive",
    nationalMode: true,
    showSelectedDialCode: true,
    formatOnDisplay: false,
    autoHideDialCode: false,
    geoIpLookup: function (success, failure) {
        $.get("https://ipinfo.io", function () {}, "jsonp").always(function (resp) {
            var countryCode = resp && resp.country ? resp.country : "";
            
            success(countryCode);
        });
    },
    utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
});
inputModal.addEventListener('input', function() {
  var fullNumber = itiModal.getNumber();
  document.getElementById('full_phone').value = fullNumber;
});


  new WOW().init();
  $('.popup-wrap, .close').on('click', function(e){
    if (e.target == this){
      $(this).closest('.popup').fadeOut();
    }
  })

  jQuery('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');
        jQuery.get(imgURL, function(data) {
            var $svg = jQuery(data).find('svg');
    
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }
            $svg = $svg.removeAttr('xmlns:a');
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }
            $img.replaceWith($svg);
    
        }, 'xml');
    });

  $('.quiz__question input[type="radio"]').on('change', function(){
    var answ = $(this).closest('.quiz__question');
    var btn = $(answ).find('.quiz__btn-next');
    $(btn).prop('disabled', false);
	
	var q = $(this).closest('.quiz__question');
    var id = Number($(q).data('question'));
    id += 1;
	window.setTimeout(function(){
		if (id <= MAX_Q){
      $('.quiz__question').removeClass('active');
      $('.quiz__question[data-question="' + id +'"]').addClass('active');
      track(id)

    }
    else{
      $('.quiz__question').removeClass('active');
      $('.quiz__final').addClass('active');
      $('.quiz__left').hide();
      $('.quiz__main').hide();
      window.setTimeout(function () {
        $('.quiz__load').fadeOut();
      }, 2000);
    }
	}, 500);
  })
  
  $('.quiz__question input[type="checkbox"]').on('change', function(){
    var q = $(this).closest('.quiz__question');
    var btn = $(q).find('.quiz__btn-next');
    var check = $(q).find('input[type=checkbox]:checked');
    if (check.length > 0){
      $(btn).prop('disabled', false);
    }
    else{
      $(btn).prop('disabled', true);
    }
  })
  
  var Q = $('.quiz__main').find('.quiz__question');
  var MAX_Q = Q.length;
  
  $('.quiz__btn-next').on('click', function(){
    var q = $(this).closest('.quiz__question');
    var id = Number($(q).data('question'));
    id += 1;
    if (id <= MAX_Q){
      $('.quiz__question').removeClass('active');
      $('.quiz__question[data-question="' + id +'"]').addClass('active');
      track(id)

    }
    else{
      $('.quiz__question').removeClass('active');
      $('.quiz__final').addClass('active');
      $('.quiz__left').hide();
      $('.quiz__main').hide();
      window.setTimeout(function () {
        $('.quiz__load').fadeOut();
      }, 2000);
    }
  })
  
  $('.quiz__btn-prev').on('click', function(){
    var q = $(this).closest('.quiz__question');
    var id = Number($(q).data('question'));
    id -= 1;
    $('.quiz__question').removeClass('active');
    $('.quiz__question[data-question="' + id +'"]').addClass('active');
    track(id)
  })
  
  $('.quiz__final input[name="contact"]').on('change', function(){
    if ($(this).val() == 'E-mail'){
      $('#q_mail').prop('required', true).removeClass('visually-hidden');
    }
    else{
      $('#q_mail').prop('required', false).addClass('visually-hidden');
    }
  })
  
  function track(prg){
    $('#quiz-percent').html((Math.round(prg/MAX_Q*100)));
    $('#quiz-bar-prg').css('width', prg/MAX_Q*100 + '%');
    $('.quiz__help p').html($('#hint_' + prg).html());
  }

  track(1);
  
  $('.quiz__inputs-block input').on('keyup', function(){
    var q = $(this).closest('.quiz__question');
    var btn = $(q).find('.quiz__btn-next');
    var inp = $(q).find('.quiz__inputs-block input');
    var filled = true;
    inp.each(function(){
      if ($(this).val().length == 0){
        filled = false;
      }
    })
    if (filled){
      $(btn).prop('disabled', false);
    }
    else{
      $(btn).prop('disabled', true);
    }
  })
  
  $('.footer__btn').on('click', function(){
    $('.footer').slideToggle();
    $(this).toggleClass('active')
  })

  $('.widget-close').on('click', function(){
    $('.widget').toggleClass('closed')
    $(this).toggleClass('active')
  })


	$('a[href="#popup-policy"]').on('click', function(e){
		e.preventDefault();
		$('#popup-policy').fadeIn();
	})
  });

  $(".quiz__btn-prev, .quiz__btn-next").on("click", function () {
    $(".popup-wrap").animate({scrollTop: 50}, 1000);
});


$(document).ready(function () {

  setTimeout(function(){
      if(!$("#quiz").is(":visible")){
          $('#quiz').fadeIn()
      }
  }, 15000)


  // jQuery('#phone_mask').inputmask('(999) 999-9999')
  // $('#phone_mask').inputmask({
  //     'mask': mask
  // });

  // function getMaskForCountry(countryCode) {
  //     let mask = '';
  //     switch (countryCode) {
  //         case 'uz':
  //             mask = '(999) 999-9999';
  //             break;
  //         case 'us':
  //             mask = '9999 999 999';
  //             break;
  //     }
  //     return mask;
  // }

  // let input = document.querySelector("#phone_mask");
  // var iti = window.intlTelInput(input, {
  //     initialCountry: "uz",
  //     utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.13/js/utils.js",
  //     onlyCountries: ["uz"],
  //     separateDialCode: true
  // });

  // $("#country_iso").val(iti.s.iso2)
  // $("#country_code").val(iti.s.dialCode)

  // input.addEventListener("countrychange", function() {
  //     let itiData = iti.getSelectedCountryData();
  //     let country_iso = itiData.iso2;
  //     let countryCode = itiData.dialCode;

  //     $("#country_iso").val(country_iso)
  //     $("#country_code").val(countryCode)

  //     // let mask = getMaskForCountry(countryCode);
  //     //
  //     // $('#phone_mask').inputmask('remove');
  //     // $('#phone_mask').inputmask({
  //     //     'mask': mask
  //     // });
  // });


  $('.quiz__final__btn').click(function () {

      $(this).attr('disabled', true)
      $('.preloader').addClass('active')

      let name = $('.c-form [name="name"]')
      let lastname = $('.c-form [name="lastname"]')
      let nameCount = $(name).val().length;
      let lastnameCount = $(lastname).val().length;

      if (nameCount < 2) {
          $(name).removeClass('valid');
          $(name).addClass('isValid');
      } else {
          $(name).removeClass('isValid');
          $(name).addClass('valid');

      }
      if (lastnameCount < 2) {
          $(lastname).removeClass('valid')
          $(lastname).addClass('isValid')
      } else {
          $(lastname).removeClass('isValid')
          $(lastname).addClass('valid')
      }

      let form_data = $('.c-form').serialize();

      // $.ajax({
      //     type: 'POST',
      //     url: 'send.php',
      //     data: form_data,
      //     success: function (data) {
      //         let decoded = JSON.parse(data)
      //         console.log(decoded)

      //         if(decoded.success){
                  
      //             $(".quiz__final__form").hide()
      //             $(".quiz__question__progress").hide()
      //             $(".quiz__final__message").show()
      //         }else{
      //             $("#phone_mask").addClass('isValid');
      //             $('.quiz__final__btn').attr('disabled', false)
      //             $('.preloader').removeClass('active')
      //         }

      //         $('.c-form .form-error-content').removeClass('active');
      //         $('.preloader').removeClass('active');
      //     }
      // })

  })

  $('a[href*="#"]').on('click', function (e) {
      e.preventDefault()
      $('html, body').animate({
              scrollTop: $($(this).attr('href')).offset().top - 100,
          }, 500, 'linear'
      )
  })
});
