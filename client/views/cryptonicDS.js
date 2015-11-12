var openFile;
var signature;
var privateKey;
var publicKey;

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
        swal("Something went wrong!", "Please try again", "error");
        
      }
      if(result){
        document.getElementById("messageDigest").value = result[1];

        var textToWrite = result[0];
        var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
        var fileNameToSaveAs = "signature";

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
  },

  "click #loadFileOpenVerify": function(event, template){
    var fileToLoad = document.getElementById("fileToBeVerified").files[0];

    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent)
    {
      openFile = fileLoadedEvent.target.result;
      console.log(openFile);
      // document.getElementById("message").value = textFromFileLoaded;
    };
    fileReader.readAsText(fileToLoad, "UTF-8");
  },

  "click #loadSignature": function(event, template){

    var fileToLoad = document.getElementById("signature").files[0];

    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent)
    {
      signature = fileLoadedEvent.target.result;
      console.log(signature);
      // document.getElementById("message").value = textFromFileLoaded;
    };
    fileReader.readAsText(fileToLoad, "UTF-8");

  },


  "click #loadPublicKeyDS": function(event, template){

    var fileToLoad = document.getElementById("publicKeyToLoadDS").files[0];

    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent)
    {
      publicKey = fileLoadedEvent.target.result;
      console.log(publicKey);
      // document.getElementById("message").value = textFromFileLoaded;
    };
    fileReader.readAsText(fileToLoad, "UTF-8");

  },

  "click #rsaVerify": function(event, template){

    Meteor.call("rsaVerify", publicKey, signature, openFile, function(error, result){
      if(error){
        swal("Something went wrong!", "Please try again", "error");
        console.log("error", error);
      }
      if(result){
        console.log("OVDJE REZA: ");
        console.log(result);
        swal("Success!", "The file has been succesfuly verified and the integrity is unchanged!", "success");

      }
      else{
        swal("Error!", "The integrity of the file was changed or the signature did not match!", "error");

      }
    });

  }


});
