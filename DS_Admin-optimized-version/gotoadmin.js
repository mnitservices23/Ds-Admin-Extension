document.addEventListener('DOMContentLoaded', function() {

  var checkPageButton = [].slice.call(document.querySelectorAll(".admin-buttons")); 
  var siteEdit = document.getElementById('siteEditButton');

  //######## ADD BUTTON ID AND LINK #############//
  var buttons= {
      "mainButton":"/admin",
      "invManButton":"/useradmin.asp?page=xinvmanager",
      "configButton":"/useradmin.asp?page=xConfig"
    };//"siteEditButton":"/useradmin.asp?page=xMetaAdmin",
//################################################//

    chrome.tabs.getSelected(null, function(tab) {
        checkPageButton.forEach((element) => {
            element.addEventListener('click', function() { 
              
                var new_url = tab.url.split('/');                  
                new_url = new_url[0]+'//'+new_url[2] + buttons[this.getAttribute("id")];
                chrome.tabs.create({ url: new_url,index:tab.index+1 }); 
                              
             }, false);           
        });
        siteEdit.addEventListener('click',()=>{
            chrome.tabs.executeScript({
                code: 'fetch("/useradmin.asp?page=xMetaAdmin").then((res)=>window.location.reload());' //argument here is a string but function.toString() returns function's code
            }, (results) => {
                //Here we have just the innerHTML and not DOM structure
                  console.log(results[0]);
            });
            
        });
    });
}, false);   


    
