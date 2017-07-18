$(document).ready(function() {
    $('#search').click(function() {
      $("#search-bar").toggleClass("pad");
            $("input").slideToggle("slow", function() { 
      });
    });


  $(".outer").hover(function() {
			$(this).toggleClass("outer-move");
  });

});

