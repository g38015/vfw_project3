// Project 2
// Visual Frameworks 1305
// Peter Hitchcock

// Wait until the DOM is ready
window.addEventListener("DOMContentLoaded", function() {

    // getElementsById Function
    function $(x) {
        var getElement = document.getElementById(x);
        return getElement;
    }
    
    // Function creates a select Field Element and Populates with Options
    function makeBedrooms() {
        var formTag = document.getElementsByTagName("form"), // Target Form Tag
            createSelectLi = $("bed"), // Finds Element Called bed, targets in HTML
            createSelect = document.createElement("select"); // Creates Select Element
            createSelect.setAttribute("id", "bedrooms"); // Sets Attribute id="bedrooms"
        for(var i=0, j=numberOfBedrooms.length; i<j; i++){ // Populates Select Tage with Array numberOfBedrooms
            var createOption = document.createElement("option"); // Creates Option Element
            var optionText = numberOfBedrooms[i]; // Creates Option Text, Grabs Value in Array
            createOption.setAttribute("value", optionText); // Sets Attribute value="optionText" (values in the array)
            createOption.innerHTML = optionText; // Sets the Text from Array in the Option Tag
            createSelect.appendChild(createOption); // Attaches Option Tags to Select Tag
        } // Loops through the array and sets all option tags
        createSelectLi.appendChild(createSelect); // Attaches Select Tag and Option Tags to Document
     } // Need to Call Function 

     
     // Find value of selected checkbox (this function has issue of retuning all values it loops through only returns one value
     function getCheckbox() {
         var checks = document.forms[0].type;
         for (var i = 0; i < document.leadForm.type.length; i++) {
             if(checks[i].checked) {
             propertyChecked = checks[i].value;
             
              }   
         }
     }
     // Function toggles form, hides form once show leads is tapped or clicked.
     function toggleLeads(n) {
         switch(n) {
             case "on":
                 $("contactForm").style.display = "none";
                 $("clear").style.display = "inline";
                 $("displayLink").style.display = "none";
                 $("addNew").style.display = "inline";
                 break;
             case "off":
                 $("contactForm").style.display = "block";
                 $("clear").style.display = "inline";
                 $("displayLink").style.display = "inline";
                 $("addNew").style.display = "none";
                 $("leads").style.display = "none";
                 break;
             default:
                 return false;
         }
     }
     
     // This function stores leads into local storage
     function storeLeads() {
         var id             = Math.floor(Math.random()*10000001);
         // Get all form field values and store in object
         // Object properties contain array form label and input value
         getCheckbox();
         var lead           = {};
             lead.name      = ["Name:", $("name").value];
             lead.phone     = ["Phone:", $("phone").value];
             lead.email     = ["Email:", $("email").value];
             lead.date      = ["Date:", $("date").value];
             lead.check     = ["Checked:", propertyChecked];
             lead.price     = ["Price:", $("price").value];
             lead.bedrooms  = ["Bedrooms:", $("bedrooms").value];
             lead.info      = ["Info:", $("additional").value];
             lead.hidden    = ["Hidden:", $("hideme").value];
             
             
         // Save data to local storage Use stringify to convert object to a string
         localStorage.setItem(id, JSON.stringify(lead));
         alert("Lead Has Been Saved!");
                      
     }
     // This function gets the leads from localstorage and shows them
     function getLeads() {
         if (localStorage.length === 0) {
             alert("You Have No Leads, Please Enter One Now");
             } else {
                toggleLeads("on");
                 //Write local data from local storage to browser
                 var createDiv = document.createElement("div");
                 createDiv.setAttribute("id", "leads");
                 var newList = document.createElement("ul");
                 createDiv.appendChild(newList);
                 document.body.appendChild(createDiv);
                 $("leads").style.display = "block";
                 for (var i = 0, len=localStorage.length; i<len; i++) {
                     var newLi = document.createElement("li");
                     var linkLi = document.createElement("li")
                     newList.appendChild(newLi);
                     var key = localStorage.key(i);
                     var value = localStorage.getItem(key);
                     // Convert sting from local storage back to an object by using JSON.parse()
                     var obj = JSON.parse(value);
                     var newSublist = document.createElement("ul");
                     newLi.appendChild(newSublist);
                     for (var n in obj) {
                         var makeSubli =document.createElement("li");
                         newSublist.appendChild(makeSubli);
                         var optSubText = obj[n][0]+" "+obj[n][1];
                         makeSubli.innerHTML = optSubText;
                         newSublist.appendChild(linkLi);                         
                     }
                     createItemLinks(localStorage.key(i), linkLi);
                 }
             } 
     }
     
     // Create Edit and Delete Links for Each Stored Lead when Displayed
     function createItemLinks(key, linkLi) {
         // Add Edit
         var editLink = document.createElement("a");
         editLink.href = "#";
         editLink.key = key;
         var editText = "Edit Lead";
         //editLink.addEventListener("click", editItem);
         editLink.innerHTML = editText;
         linkLi.appendChild(editLink);
         
         // Add LineBreak
         
         var breakTag = document.createElement("br");
         linkLi.appendChild(breakTag);
         
         // Add Delete
         var deleteLink = document.createElement('a');
         deleteLink.href = "#";
         deleteLink.key = key;
         var deleteText = "Delete Lead";
         //deleteLink.addEventListener("click", deleteItem);
         deleteLink.innerHTML = deleteText;
         linkLi.appendChild(deleteLink);
         
     
     }
     
     
     // This function clears all localstorage when delete leads is clicked or tapped
     function clearLeads() {
         if (localStorage.length === 0) {
             alert("There Are No Leads to Delete");
         } else {
             localStorage.clear();
             alert("All Leads Have Been Deleted!");
             window.location.reload();
             return false;
         }
     }
    
    
    // Var Defaults
    var numberOfBedrooms = ["1+", "2+", "3+"],
        propertyChecked
        ;
    makeBedrooms();
    

    // Set Link and Submit Click Events
    var display = $("displayLink");
    display.addEventListener("click", getLeads);
    var clear = $("clear");
    clear.addEventListener("click", clearLeads);
    var save = $("submit");
    save.addEventListener("click", storeLeads);

});

// Function for slider to show the value in the range to a user while sliding
function slideNumber(slider) {
     var slidevalue = document.getElementById("slidevalue");
     slidevalue.innerHTML = "$50000 to " + "$" + slider;

};