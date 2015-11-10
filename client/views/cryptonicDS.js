var openFile;
var privateKey;

Template.body.events({
  "click #loadFileOpen": function(event, template){
    var fileToLoad = document.getElementById("fileToBeSigned").files[0];

    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent)
    {
      openFile = fileLoadedEvent.target.result;
      console.log(openFile);
      // document.getElementById("message").value = textFromFileLoaded;
    };
    fileReader.readAsText(fileToLoad, "UTF-8");
  },



  "click #loadPrivateKeyDS": function(event, template){

    var fileToLoad = document.getElementById("privateKeyToLoadDS").files[0];

    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent)
    {
      privateKey = fileLoadedEvent.target.result;
      console.log(privateKey);
      // document.getElementById("message").value = textFromFileLoaded;
    };
    fileReader.readAsText(fileToLoad, "UTF-8");

  },

  "click #rsaSign": function(event, template){
    Meteor.call("rsaSign", privateKey, openFile, function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){
        document.getElementById("messageDigest").value = result[1];

        var textToWrite = result[0];
        var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
        var fileNameToSaveAs = "signed_file";

        var downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.innerHTML = "Download File";
        if (window.URL != null)
        {
          // Chrome allows the link to be clicked
          // without actually adding it to the DOM.
          downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        }
        else
        {
          // Firefox requires the link to be added to the DOM
          // before it can be clicked.
          downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
          downloadLink.onclick = destroyClickedElement;
          downloadLink.style.display = "none";
          document.body.appendChild(downloadLink);
        }

        downloadLink.click();
      }
    });
  }
});
