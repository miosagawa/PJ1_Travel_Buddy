var APIKey = "AIzaSyA6dPYvFRmtr6QqLt7KrqQlqXOab3FMGh0";
var langSelected = $("#lang-btn").text();

$(document).ready(function () {

    //clicking the translate button starts the translate query
    $("#translate-btn").on("click", function (event) {
        event.preventDefault();
        var translateText = $("#translation-text").val();
        startTranslation(translateText);
    });

    //selecting language from dropdown will choose translated language
    $("#lang-opt").on("click", "li", function (event) {
        event.preventDefault();
        $("#lang-btn").text($(this).text());

        switch ($("#lang-btn").text()) {
            case "Spanish":
                langSelected = "es";
                break;
            case "French":
                langSelected = "fr";
                break;
            case "German":
                langSelected = "de";
                break;
            case "Japanese":
                langSelected = "ja";
                break;
            case "Russian":
                langSelected = "ru";
                break;
            default:
                langSelected = "en";
        };
    });

    //quick translation buttons
    $(".common").on("click", function (event) {
        event.preventDefault();
        var question = $(this).text();
        var translateText;

        switch (question) {
            case "Restroom?":
                translateText = "Where is the nearest bathroom?";
                break;
            case "ATM?":
                translateText = "Where is the nearest bank or ATM?";
                break;
            case "Train?":
                translateText = "Where is the nearest train?";
                break;
            case "Coffee?":
                translateText = "Where can I get a good cup of coffee?";
                break;
            case "Restaurant?":
                translateText = "What is the best restaurant in town?";
                break;
            default:
                translateText = "Where is the nearest market?";
        };
        startTranslation(translateText);
    });


    //button for random fact modal
    $("#randFact").on("click", function (event) {
        event.preventDefault();
        randomFact();
    });

    //API call that translates the text input
    function startTranslation(translateText) {
        var queryURL = "https://translation.googleapis.com/language/translate/v2?q=" + translateText + "&target=" + langSelected + "&key=" + APIKey;

        $.ajax({
            url: queryURL,
            method: "POST"

        }).then(function (response) {
            var translation = response.data.translations[0].translatedText;
            placeTranslation(translation);

        });
    };

    //writes translated text to textarea
    function placeTranslation(translation) {
        $("#translatedText").text(translation);

    }

    //random fact api call
    function randomFact() {
        var randomURL = "https://uselessfacts.jsph.pl/random.json?language=en"

        $.ajax({
            url: randomURL,
            method: "GET"
        }).then(function (response) {

            $(".modal-body").empty();
            var fact = response.text;
            $(".modal-body").append("<p class='modal-body'>" + fact + "</p>");
        });

    };

    //map content below
    mapboxgl.accessToken = 'pk.eyJ1IjoiY291cnRuZXlqIiwiYSI6ImNrYzN0OW12ZDAxOGwycW1ydjc0bW9mMG0ifQ.VWF3V-tNFAcHm2RpqpbBTg';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-97.7431, 30.2672],
        zoom: 0
    });

    map.addControl(
        new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
        })
    );
    // Add geolocate control to the map.
    map.addControl(
        new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        })
    );

    // map logic end

});



