   //Manually changed from front-end UI

    let status = true;
    $('.start').on('click', function(e){
        e.preventDefault();
        status = true;
        
        
    });
    $('.stop').on('click', function(){
        status = false;
    });  