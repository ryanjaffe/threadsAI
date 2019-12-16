'use strict'

const extractionUrl = 'https://api.imagga.com/v2/colors';
const extractionAuthorization = 'Basic YWNjXzNkNzBmYTkxNjFlMzAwOTo5OWRlNTExN2E0MmJkMzY5NDMzM2UzZjYzMGZhYzQ0Mw==';

function renderHome(){
    $('.js-photo-screen').hide();
    $('.js-extraction-preview-screen').hide();
    $('.js-palette-select-screen').hide();
    $('.js-palette-display-screen').hide();

    handleGetStarted();
}  

function handleImageLinkButton(){
    $('#js-find-colors').on('click',function(event){
        event.preventDefault();
        let imageLink = $('#js-image-link-entry').val();
        extractColors(extractionUrl,imageLink,extractionAuthorization);  
    });
}

  
function extractColors(extractionUrl,imageLink,extractionAuthorization) {
    const url = `${extractionUrl}?image_url=${imageLink}&extract_overall_colors=0
    extract_object_colors=1&overall_count=5`;
  
   const extractionHeaders = {
        headers: new Headers({
        'authorization' : extractionAuthorization,
        })
    };
  
    fetch(url, extractionHeaders,{
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => {
            displayResults(responseJson);
            storeResults(responseJson);
        })
        .catch(err => {
            $('.js-error-message').show();
            $('.js-error-message').text(`Something went wrong: ${err.message}`);
    });    
}

function displayResults(responseJson) {
    $('.js-extraction-list').empty();
    for (let i=0; i<responseJson.result.colors.foreground_colors.length; i++) {
        $('.js-extraction-list').append(`
        <li>${responseJson.result.colors.foreground_colors[i].closest_palette_color}
        </li>`)
        $('js-extracted-colors-display').append(`
        <div style="background-color: ${responseJson.result.colors.foreground_colors[i].html_code};" 
        class = "extracted-color-tile js-extracted-color-tile">
        </div>`)
    };
}

function storeResults(responseJson){
    let extractionArray = [];
    for (let i=0; i<responseJson.result.colors.foreground_colors.length; i++) {
        extractionArray.push(`${responseJson.result.colors.foreground_colors[i].
            html_code}`)
    }
    // return extractionArray;
    console.log(extractionArray);
}

// function getFinalPalette(paletteChoice,paletteChoiceUrl){

// }

// function handlePaletteSubmit() {
//     $('form').submit(event => {
//       event.preventDefault();
//       const paletteChoice = $('.js-palette-choice').val();
//       getFinalPalette(paletteChoice);
//     });
//   }

function handleInstructionsButton(){
    $('.js-instructions-button').on('click',function(event){
        $('.js-instructions-screen').show();
        $('.js-photo-screen').hide();
        $('.js-palette-select-screen').hide();   
    });
}

function handleColorsApprovedButton(){
    $('.js-colors-approved').on('click',function(event){
        $('.js-photo-screen').hide();
        $('.js-palette-select-screen ').show();
    });
    handleInstructionsButton();
    handlePhotoButton();
}

function handlePhotoButton(){
    $('.js-photo-button').on('click',function(event){
        $('.js-instructions-screen').hide();
        $('.js-palette-select-screen').hide();   
        $('.js-photo-screen').show();
    });
}

function handleGetStarted(){
    $('.js-get-started-button').on('click',function(event){
        $('.js-instructions-screen').hide();
        $('.js-preview-heading').hide();
        $('.js-photo-screen').show();
        $('.js-photo-preview-heading').hide();
        $('.js-error-message').hide();
        $('.js-extracted-colors-heading').hide();
        handleImageLinkButton();
    });
    // remove handleColorsApprovedButton when api is fixed
    // handleColorsApprovedButton();
    // handleInstructionsButton();
}

// put handleColorsApprovedButton in function displayResults when api is fixed

$(function() {
    console.log("App loaded");
    renderHome();
    handleImageLinkButton();
});