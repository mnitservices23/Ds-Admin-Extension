document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('gobutton');
    
    function checkSite(){
        
        var hold = document.getElementsByClassName("footer-DS");
        
        return (hold.length > 0)?true:false;
        
    }
    var is_our_site;
      chrome.tabs.executeScript({
        code: '(' + checkSite + ')();' //argument here is a string but function.toString() returns function's code
    }, (results) => {
        //Here we have just the innerHTML and not DOM structure
          is_our_site = results[0];
    });


    chrome.tabs.getSelected(null, function(tab) {
        checkPageButton.addEventListener('click', function() { 
            if(is_our_site){
                var new_url = tab.url.split('/');
                new_url = new_url[0]+'//'+new_url[2]+'/admin';
                chrome.tabs.create({ url: new_url }); 
            }
            
         }, false);
    });

}, false);   


    
