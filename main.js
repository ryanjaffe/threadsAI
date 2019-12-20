'use strict'

const extractionUrl = 'https://api.imagga.com/v2/colors';
const extractionAuthorization = 'Basic YWNjXzNkNzBmYTkxNjFlMzAwOTo5OWRlNTExN2E0MmJkMzY5NDMzM2UzZjYzMGZhYzQ0Mw==';

function extractColors(extractionUrl,imageLink,extractionAuthorization) {
    const url = `${extractionUrl}?image_url=${imageLink}&extract_overall_colors=0
    &overall_count=3`;
  
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
            createPalette(responseJson);
        })
        .catch(err => {
            $('.js-error-message').show();
            $('.js-error-message').text(`Something went wrong: ${err.message}`);
    });    
}

function displayResults(responseJson) {
    $('#js-image-link-entry').empty();
    for (let i=0; i<responseJson.result.colors.foreground_colors.length; i++) {
        $('.js-extraction-list').append(`
        <li class = "extracted-color-text js-extracted-color-text">
        ${responseJson.result.colors.foreground_colors[i].closest_palette_color}
        </li>`);
        $('.js-extracted-colors-display').append(`
        <div style="background-color: ${responseJson.result.colors.foreground_colors[i].html_code};" 
        class = "extracted-color-tile js-extracted-color-tile">
        </div>`)
    };
    handleExtractColorsButton();
}


function createPalette(responseJson){
    (new KolorWheel(`${responseJson.result.colors.foreground_colors[0].html_code}`)).abs(0,-1,-1,$(".js-color-palette-1")).each(function(elm){
        elm.css("background",this.getHex());
    });
    (new KolorWheel(`${responseJson.result.colors.foreground_colors[1].html_code}`)).abs(0,-1,-1,$(".js-color-palette-2")).each(function(elm){
        elm.css("background",this.getHex());
    });
    (new KolorWheel(`${responseJson.result.colors.foreground_colors[2].html_code}`)).abs(0,-1,-1,$(".js-color-palette-3")).each(function(elm){
        elm.css("background",this.getHex());
    });

    var base = new KolorWheel("#ffffff");
    var target = base.abs(`${responseJson.result.colors.foreground_colors[0].html_code}`,$(".js-color-palette-4")).each(function(elm){
        elm.css("background",this.getHex());
    });
    var base = new KolorWheel("#ffffff");
    var target = base.abs(`${responseJson.result.colors.foreground_colors[1].html_code}`,$(".js-color-palette-5")).each(function(elm){
        elm.css("background",this.getHex());
    });
    var base = new KolorWheel("#ffffff");
    var target = base.abs(`${responseJson.result.colors.foreground_colors[2].html_code}`,$(".js-color-palette-6")).each(function(elm){
        elm.css("background",this.getHex());
    });

    var base = new KolorWheel("#000000");
    var target = base.abs(`${responseJson.result.colors.foreground_colors[0].html_code}`,$(".js-color-palette-7")).each(function(elm){
        elm.css("background",this.getHex());
    });
    var base = new KolorWheel("#000000");
    var target = base.abs(`${responseJson.result.colors.foreground_colors[1].html_code}`,$(".js-color-palette-8")).each(function(elm){
        elm.css("background",this.getHex());
    });
    var base = new KolorWheel("#000000");
    var target = base.abs(`${responseJson.result.colors.foreground_colors[2].html_code}`,$(".js-color-palette-9")).each(function(elm){
        elm.css("background",this.getHex());
    });

    (new KolorWheel(`${responseJson.result.colors.foreground_colors[0].html_code}`)).rel(0,0,80,$(".js-color-palette-10")).each(function(elm) {
        elm.css("background",this.getHex());
    });
    (new KolorWheel(`${responseJson.result.colors.foreground_colors[1].html_code}`)).rel(0,0,80,$(".js-color-palette-11")).each(function(elm) {
        elm.css("background",this.getHex());
    });
    (new KolorWheel(`${responseJson.result.colors.foreground_colors[2].html_code}`)).rel(0,0,80,$(".js-color-palette-12")).each(function(elm) {
        elm.css("background",this.getHex());
    });

}

function handleExtractColorsButton(){
    $('.js-colors-approved').on('click',function(event){
        $('.js-instructions-screen').hide();
        $('.js-photo-screen').hide();
        $('.js-palette-display-screen').show();  
    });
}

function handleInstructionsButton(){
    $('.js-instructions-button').on('click',function(event){
        $('.js-instructions-screen').show();
        $('.js-photo-screen').hide();
        $('.js-palette-display-screen').hide();   
    });
}


function handlePhotoButton(){
    $('.js-photo-button').on('click',function(event){
        $('.js-instructions-screen').hide();
        $('.js-palette-display-screen').hide();   
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
    });
}

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
        $('#js-image-link-entry').val(''); 
    });
}

$(function() {
    renderHome();
    handleImageLinkButton();
    handleInstructionsButton();
    handlePhotoButton();
});