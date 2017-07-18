$(document).ready(function() {
    $('#search').click(function() {
      $("#search-bar").toggleClass("pad");
            $("#search-input").slideToggle("slow", function() { 
      });
    });

    $('#add').click(function() {
            $("#add-bar").slideToggle("slow", function() { 
            });
    });


  $(".outer").hover(function() {
			$(this).toggleClass("outer-move");
  });

});