// event handling

var provinces = {Canada: ['Alberta', 'BC',
                          'Ontario'],
                 USA: ['Alabama', 'Alaska', 
                       'Arkansas']};

$(document).ready(function () {
  updateProvinces();
  
  $('#country').change(function () {
    updateProvinces();
  });
  
  $('button#register').click(function () {
    console.log('register button clicked');
  });

  $('button#register').dblclick(function () {
    console.log('register button double clicked');
  });
  
  $('button#register').toggle(function () {
    console.log('button toggled on');
  }, function () {
    console.log('button toggled off');
  });
  
  $('form').submit(function () {
    console.log('form submitted');
    return false;
  });
  
  $('#username').mouseenter(function () {
    console.log('mouse in text field!');
  });
  $('#username').mouseleave(function () {
    console.log('mouse out of text field');
  });
  $('#username').focus(function () {
    console.log('text field focus');
  });
  $('#username').change(function () {
    console.log('text field value change');
  });
  $('#username').select(function () {
    console.log('text field selection');
  });
});

function updateProvinces() {
  var country = $('#country').val();
  var provs = provinces[country];
  var content = '';
  $.each(provs, 
         function (index, value) {
    content += '<option>' + 
               value + 
               '</option>';
  });
  $('#province').html(content);
}


