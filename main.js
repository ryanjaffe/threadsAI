function renderHome(){
    $('.js-photo-screen').hide();
    $('.js-preview-screen').hide();
    $('.js-palette-select-screen').hide();
    $('.js-palette-display-screen').hide();
    
    handleGetStarted();
}

function handleGetStarted(){
    $('.js-get-started-button').on('click',function(event){
        $('.js-instructions-screen').hide();
        $('.js-photo-screen').show();
    })
}
renderHome();