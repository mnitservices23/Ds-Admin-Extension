document.addEventListener('DOMContentLoaded', function() {

  var checkPageButton = [].slice.call(document.querySelectorAll(".admin-buttons"));
  var is_our_site;

  //######## ADD BUTTON ID AND LINK #############//
  var buttons= {
      "mainButton":"/admin",
      "siteEditButton":"/useradmin.asp?page=xMetaAdmin",
      "invManButton":"/useradmin.asp?page=xinvmanager",
      "configButton":"/useradmin.asp?page=xConfig"
    };
//################################################//
    
    function checkSite(){
        
        var hold = document.getElementsByClassName("footer-DS");
        
        return (hold.length > 0)?true:false;
        
    }

    chrome.tabs.executeScript({
        code: '(' + checkSite + ')();' //argument here is a string but function.toString() returns function's code
    }, (results) => {
        //Here we have just the innerHTML and not DOM structure
          is_our_site = results[0];
    });


    chrome.tabs.getSelected(null, function(tab) {

        checkPageButton.forEach((element) => {

            element.addEventListener('click', function() { 
                if(is_our_site){
                    var new_url = tab.url.split('/');
                    
                    new_url = new_url[0]+'//'+new_url[2] + buttons[this.getAttribute("id")];
                    chrome.tabs.create({ url: new_url,index:tab.index+1 }); 
                }
                
             }, false);
            
        });



    });

}, false);   


    
