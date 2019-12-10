function renderHome(){
    $('.js-photo-screen').hide();
    $('.js-preview-screen').hide();
    $('.js-palette-select-screen').hide();
    $('.js-palette-display-screen').hide();

    handleGetStarted();
}

Webcam.attach( '.js-viewfinder' );
function take_snapshot() {
    Webcam.snap( function(data_uri) {
        document.getElementById('my_result').innerHTML = 
        '<img src="'+data_uri+'"/>';
    } );
}

function handleGetStarted(){
    $('.js-get-started-button').on('click',function(event){
        $('.js-instructions-screen').hide();
        $('.js-photo-screen').show();
    })
}


renderHome();