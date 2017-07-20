$(document).ready(function () {
  
  $('#search').click(function () {
    $("#search-bar").toggleClass("pad");
    $("#search-input").slideToggle("slow", function () {
    });
  });

  $('#add').click(function () {
    $("#add-bar").slideToggle("slow", function () {
    });
  });

  // $('.list-item').click(function () {
  //   $(this).children('.action').toggle();
  //   $(this).height(140);
  // });


  $('.list-item').click(function () {
    if ($(this).children('.action').hasClass('hide')) {
      $(this).animate({ height: 140 }, 200, function () {

        $(this).children('.action').fadeIn().removeClass('hide');

      });
    } else {
      $(this).animate({ height: 80 }, 200, function () {
        $(this).children('.action').fadeOut().addClass('hide');
      });
    }
  });


  // Search function

  var filterInput = document.getElementById('search-input');

  // On key up trigger filterNames
  filterInput.addEventListener('keyup', filterNames);

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

