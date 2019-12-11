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

function handleGetStarted(){
    $('.js-get-started-button').on('click',function(event){
        $('.js-instructions-screen').hide();
        $('.js-preview-heading').hide();
        $('.js-photo-screen').show();
    });
}

Webcam.attach( '.js-viewfinder' );
function take_snapshot() {
    Webcam.snap( function(data_uri) {
        document.getElementById('my_result').innerHTML = 
        '<img src="'+data_uri+'"/>';
        extractColors(data_uri);
        console.log(data_uri);
    } );
    $('.js-preview-heading').show();
    handlePhotoApprovedButton();
}


function extractColors(data_uri) {
    const url = `${extractionUrl}?image_url=${data_uri}&extract_overall_colors=0
    extract_object_colors=1&overall_count=3`;
  
   const extractionHeaders = {
        headers: new Headers({
        'authorization' : extractionAuthorization
        })
    };
  
    fetch(extractionUrl, extractionHeaders)
      .then(response => response.json())
      .then(responseJson => console.log(responseJson));
}  


function handleInstructionsButton(){
    $('.js-instructions-button').on('click',function(event){
        $('.js-instructions-screen').show();
        $('.js-photo-screen').hide();
        $('.js-extraction-preview-screen').hide();   
    });
}

function handlePhotoApprovedButton(){
    $('.js-photo-approved').on('click',function(event){
        $('.js-photo-screen').hide();
        $('.js-extraction-preview-screen').show();
    });
    handlePhotoButton();
}

function handlePhotoButton(){
    $('.js-photo-button').on('click',function(event){
        $('.js-instructions-screen').hide();
        $('.js-photo-screen').show();
        $('.js-extraction-preview-screen').hide();   
    });
}

handleInstructionsButton();
renderHome();