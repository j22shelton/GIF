$(document).ready(function() {

  //array of topics//

var topics = ["Vancouver", "Miami", "Melbourne", "Honolulu", "London", "Geneva", "Stockholm"];

   //queryURL construction//

function displayInfo() {
var City = $(this).attr("City-name");
var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + City + "&api_key=RRuIISVDimUoguQCWj8PpdXCZSQ42xu5&limit=10";
   
   //AJAX request//

$.ajax({
  url: queryURL,
  method: "GET"
})
    //after data returned//

    .done(function(response) {
   
      console.log(queryURL);

      console.log(response);

    $("#Citys").empty();

   //storing data from AJAX request//

    var results = response.data;
   
    //looping through each item//
    for (var i = 0; i < results.length; i++) {

        //creating and storing div tag//
        var CityDiv = $("<div class='userCity'>");
   
    //creating paragragh for ratings//
    var rating = results[i].rating;
    var pRate = $("<p>").text("Rating: " + rating);
   
    var urlStill = results[i].images.fixed_height_still.url;
    var urlPlay = results[i].images.fixed_height.url;
   
    var gif = $("<img>").addClass("gif").attr("src", urlStill).attr("data-still", urlStill).attr("data-animate", urlPlay).attr("data-state", "still");
   
    //appending paragraph and image tag to cityDiv//
    CityDiv.append(gif);
    CityDiv.append(pRate);
   
    $("#Citys").append(CityDiv);
    }
   
        //click GIF//
    $(".gif").on("click", function() {

        //Pause GIF//

    var state = $(this).attr("data-state");
    if (state === "still") {
       $(this).attr("src", $(this).attr("data-animate"));
       $(this).attr("data-state", "animate");
    } else {
       $(this).attr("src", $(this).attr("data-still"));
       $(this).attr("data-state", "still");
    }
   });

    });
   
    }
   
    //function for displaying data//
    function renderButtons() {
   
    // Deleting the used buttons prior to adding new ones
    $("#CityButtons").empty();
   
    //loops through array of cities//
    for (var i = 0; i < topics.length; i++) {
   
    //buttons//
    var CityRender = $("<button>");
   
    CityRender.addClass("City");
    CityRender.attr("City-name", topics[i]);
    CityRender.text(topics[i]);

    //append paragragh and imageto div//
    $("#CityButtons").append(CityRender);
    }
    }
   //function to handle events where one button is clicked//
    $("#addCity").on("click", function(event) {

    //prevents the form from trying to submit itself//
    event.preventDefault();

    //grab the text from the input box//
    var City = $("#City-input").val().trim();

    //topic added to array//
    topics.push(City);

    // calling renderButtons to handle the processing of array
    renderButtons();
    });
   
    $(document).on("click", ".City", displayInfo);
    // Calling the renderButtons function at least once to display the items//
    renderButtons();
   
   });