var animals = ['cat', 'dog', 'hamster', 'goldfish', 'frog', 'snail', 'turtle', 'rabbit', 'monkey', 'skunk', 'bird', 'squirrel', 'hedgehog', 'ferret', 'zebra', 'lion', 'eagle', 'rhino', 'elephant', 'butterfly'];



$(document).ready(function() {


    renderButtons();


    $(document).on('click', '.animal_button', displayAnimalGif);


    $(document).on('click', '.gif_container', showGifHideImage);


    function renderButtons() {

        $('#animal_buttons').empty();


        for (var i = 0; i < animals.length; i++) {


            var animalButton = $('<button>')
            animalButton.addClass('animal_button');
            animalButton.attr('data-name', animals[i]);
            animalButton.text(animals[i]);
            $('#animal_buttons').append(animalButton);
        }
    }


    $('#add_animal').on('click', function() {


        var newAnimal = $('#animal_input').val().trim().toLowerCase();



        var isUnique = true;
        for (var i = 0; i < animals.length; i++) {
            if (animals[i] == newAnimal) {
                isUnique = false;
            }
        }



        if (newAnimal == "") {
            alert("Sorry. No empty buttons are allowed!")
        } else if (isUnique) {


            animals.push(newAnimal);



            renderButtons();

        } else {
            alert("You already have a " + newAnimal + " button!")
        }



        return false;
    })



    function displayAnimalGif() {


        $('#animal_images').empty();


        var animal = $(this).attr('data-name').replace(/ /g, '+');


        var publicKey = "dc6zaTOxFJmzC";
        var limit = "10";
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&limit=" + limit + "&api_key=" + publicKey;




        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function(response) {


            for (var i = 0; i < response.data.length; i++) {


                var currentStillURL = response.data[i].images.fixed_height_still.url;
                var currentMovingURL = response.data[i].images.fixed_height.url;


                var currentRating = response.data[i].rating;


                if (currentRating == "") {
                    currentRating = "none";
                }



                var currentGifDiv = $('<div>');
                currentGifDiv.addClass('gif_container');
                currentGifDiv.attr('data-name', "unclicked");


                var currentGifRating = $('<h1>');
                currentGifRating.text("Rating: " + currentRating);
                currentGifDiv.append(currentGifRating);


                var currentGifImage = $('<img>');
                currentGifImage.addClass('still_gif');
                currentGifImage.attr("src", currentStillURL);
                currentGifDiv.append(currentGifImage);


                var currentGif = $('<img>')
                currentGif.addClass('moving_gif');
                currentGif.attr("src", currentMovingURL);
                currentGif.hide();
                currentGifDiv.append(currentGif);


                $('#animal_images').append(currentGifDiv);

            }

        });
    }


    function showGifHideImage() {


        var clickTest = $(this).attr('data-name');


        if (clickTest == "unclicked") {

            var gifChildren = $(this).children();


            $(gifChildren[1]).hide();


            $(gifChildren[2]).show();


            $(this).attr('data-name', "clicked");

        } else {

            var gifChildren = $(this).children();


            $(gifChildren[2]).hide();


            $(gifChildren[1]).show();



            $(this).attr('data-name', "unclicked");

        }

    }



});