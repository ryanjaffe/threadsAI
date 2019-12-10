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
    } );
    $('.js-preview-heading').show();
    handlePhotoApprovedButton();
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