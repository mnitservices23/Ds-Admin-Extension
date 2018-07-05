document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('gobutton');
  

    chrome.tabs.getSelected(null, function(tab) {
        checkPageButton.addEventListener('click', function() {    
            var new_url = tab.url.split('/');
            new_url = new_url[0]+'//'+new_url[2]+'/admin';
            chrome.tabs.create({ url: new_url });  
          //chrome.tabs.update({ url:  new_url});
            //console.log(new_url);
         }, false);
    });

}, false);   


    
