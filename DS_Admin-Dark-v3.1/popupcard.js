window.onload = function(){
    var popup_controler = document.getElementById("card-title-button");
    var exit_popup = document.getElementById('close-card-button');

    popup_controler.addEventListener('click',showpopup);
    exit_popup.addEventListener('click',exitpop);console.log(1);
}

function showpopup(){
    console.log(1);
    var popup = document.getElementById('info-card');
    popup.style.display='block';
    
}

function exitpop(){
    console.log(2);
    var popup = document.getElementById('info-card');
    popup.style.display='none';
}