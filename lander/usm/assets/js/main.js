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

$( document ).ready(function(){

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
  })