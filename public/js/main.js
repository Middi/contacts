$(document).ready(function() {
    $('#search').click(function() {
            $( "input" ).slideToggle( "slow", function() {
    // Animation complete.
      });
    });


    // --- On Enter Key --- //
  $(".outer").hover(function() {
			// --- Make Search Bar Move Up --- //
			$(this).toggleClass("outer-move");
  });

});