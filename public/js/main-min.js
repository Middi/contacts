$(document).ready(function () {

    // Search bar reveal
  $('#search').click(function () {
    if ($("#search-bar").hasClass('hide')) {
        $("#search-bar").show().removeClass('hide');
    }
    else {
        $("#search-bar").fadeOut().addClass('hide');
    }
  });


  $('#add').click(function () {
    if ($("#add-bar").hasClass('hide')) {
        $("#add-bar").show().removeClass('hide');
    }
    else {
        $("#add-bar").fadeOut().addClass('hide');
    }
  });

  // Options bar reveal
  $('.list-item').click(function () {
    if ($(this).children('.action').hasClass('hide')) {
      
        $(this).children('.action').show().removeClass('hide');

    } else {
      
        $(this).children('.action').fadeOut().addClass('hide');
 
    }
  });

  // // Options bar reveal
  // $('.list-item').click(function () {
  //   if ($(this).children('.action').hasClass('hide')) {
  //     $(this).animate({ height: 140 }, 200, function () {

  //       $(this).children('.action').fadeIn().removeClass('hide');

  //     });
  //   } else {
  //     $(this).animate({ height: 80 }, 200, function () {
  //       $(this).children('.action').fadeOut().addClass('hide');
  //     });
  //   }
  // });


  // Search function
  
  // get element and add eventlistener
  var filterInput = document.getElementById('search-input').addEventListener('keyup', filterNames);


  function filterNames() {
    // take value and convert to uppercase
    var filterValue = document.getElementById('search-input').value.toUpperCase();
    // get all list-items
    var li = document.getElementsByClassName('list-item');

    for (var i = 0; i < li.length; i++) {
      // get each li-text and if the inner html matches filterValue
      var a = li[i].getElementsByClassName('li-text')[0];
      if (a.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
        li[i].style.display = '';
      }
      else {
        li[i].style.display = 'none';
      }
    }
  };
});

