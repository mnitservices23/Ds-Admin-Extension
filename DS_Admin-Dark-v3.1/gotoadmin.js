document.addEventListener('DOMContentLoaded', function() {
    var configUrl;
    var checkPageButton = [].slice.call(document.querySelectorAll(".admin-buttons")); 
    var special_action_buttons = [].slice.call(document.querySelectorAll(".admin-buttons-special"));
  
    //######## ADD BUTTON ID AND LINK #############//
    //this buttons lead to the admin
    var buttons =
     {
        "mainButton":"/admin",
        "slideShowbutton":"/useradmin.asp?page=xSlideShow3",
        "invManButton":"/useradmin.asp?page=xinvmanager",
        "configButton":"/useradmin.asp?page=xConfig",
        "manageSnippets":"/useradmin.asp?page=xSnippetsByType",
        "enableSnippets":"/useradmin.asp?page=xSnippetsAdmin"
      };
      //special buttons are buttons that invoke a functionality from the admin panel
      var special_buttons =
      {
              'siteEditbutton':'fetch("/useradmin.asp?page=xMetaAdmin").then(res=>window.location.reload());'
      };
  //################################################//
  


//########################### DSadmin Brain ################################//
      chrome.tabs.getSelected(null, function(tab) {
          //method for normal buttons
          checkPageButton.forEach((element) => {
              element.addEventListener('click', function() { 
                console.log(this);
                  var new_url = tab.url.split('/');                  
                  new_url = new_url[0]+'//'+new_url[2] + buttons[this.getAttribute("id")];
                  chrome.tabs.create({ url: new_url,index:tab.index+1 }); 
                                
               }, false);           
          });
          //method for specials function buttons
          special_action_buttons.forEach((element)=>{
              element.addEventListener('click',function(e){
                  console.log(this);
                  chrome.tabs.executeScript(tab.id,{	code: special_buttons[this.id]}, (results) => {});
                  
              });
          });
            //############################Get Dealer ID####################################//
               configUrl=tab.url.split('/');  
                 configUrl=configUrl[0]+'//'+ configUrl[2]+'/useradmin.asp?page=xConfig';
                 console.log(configUrl);
                 $.ajax({
                   url: configUrl,
                   success: function(data) {
                    dataDID = $(data).find("#tabSiteConfigJSON");
                    dataCSRep = $(data).find("#tabSnippet");
            
                    let jsonObjCsRepList = JSON.parse($(dataCSRep).find('div.CropBox.Value:contains("title":"Customer Success Account Manager")').text());
            
                    console.log(jsonObjCsRepList);
            
                    let jsonObjCsRep = JSON.parse($(dataCSRep).find('div.CropBox.Value:contains("ClientRelationsRep")').text());
                    let csRepKey = jsonObjCsRep.ClientRelationsRep;
            
                    console.log(csRepKey);
            
                    var jsonObjDID = JSON.parse($(dataDID).find("pre").text());
                    //  console.log(jsonObjDID);
                    let csRepName = jsonObjCsRepList[csRepKey].name;
                    //console.log(csRepName);
                    var did = jsonObjDID.dealerid;
                    var shortN = jsonObjDID.shortname;
                   // console.log(did, shortN);
                    $("#dealerID strong.value").html(did);
                    $("#shortName strong.value").html(shortN);
                    $("#csName strong.value").html(csRepName);
                   }
               });
            //############################END Get Dealer ID####################################//
              
                           
      });



    

  }, false); 

