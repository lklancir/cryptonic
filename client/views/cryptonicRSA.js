var publicKey;
var privateKey;
var plainText;
var cipherText;

Template.body.events({
  "click #generateKeyPair": function(event, template){
      Meteor.call("rsaKeyPair", function(error, result){
        if(error){
          console.log("error", error);
        }
        if(result){
            console.log("Public pem: ");
            console.log(result[0]);

            console.log("Private pem: ");
            console.log(result[1]);

            var fileString = ["public_key","private_key"];

            for (var i = 0; i < result.length; i++) {

              var textToWrite = result[i];
              var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
              var fileNameToSaveAs = fileString[i];

              var downloadLink = document.createElement("a");
              downloadLink.download = fileNameToSaveAs;
              downloadLink.innerHTML = "Download File";
              if (window.URL != null)
              {
                // Chrome allows the link to be clicked
                // without actually adding it to the DOM.
                downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
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

              swal("Success!", "Your Pulic and Private keys were successfuly generated!", "success");

            }




        }
      });
  },



  "click #loadPublicKey": function(event, template){

    var fileToLoad = document.getElementById("publicKeyToLoad").files[0];


    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent)
    {
      publicKey = fileLoadedEvent.target.result;
      console.log(publicKey);
      // document.getElementById("message").value = textFromFileLoaded;
    };
    fileReader.readAsText(fileToLoad, "UTF-8");

  },

  "click #loadFileRsa": function(event, template){

    var fileToLoad = document.getElementById("fileToBeLoadedRsa").files[0];


    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent)
    {

      plainText = fileLoadedEvent.target.result;
      console.log(plainText);
      // document.getElementById("message").value = textFromFileLoaded;
    };
    fileReader.readAsText(fileToLoad, "UTF-8");

  },

  "click #rsaEncrypt": function (event, template){


      Meteor.call("rsaEncrypt", publicKey, plainText, function(error, result){
        if(error){
          console.log("error", error);
        }
        if(result){

          var textToWrite = result;
          var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
          var fileNameToSaveAs = "cipher";

          var downloadLink = document.createElement("a");
          downloadLink.download = fileNameToSaveAs;
          downloadLink.innerHTML = "Download File";
          if (window.URL != null)
          {
            // Chrome allows the link to be clicked
            // without actually adding it to the DOM.
            downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
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


  "click #loadPrivateKey": function(event, template){

    var fileToLoad = document.getElementById("privateKeyToLoad").files[0];

    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent)
    {
      privateKey = fileLoadedEvent.target.result;
      console.log(privateKey);
      // document.getElementById("message").value = textFromFileLoaded;
    };
    fileReader.readAsText(fileToLoad, "UTF-8");

  },

  "click #loadFileDecrypt": function(event, template){

    var fileToLoad = document.getElementById("fileToBeDecrypted").files[0];

    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent)
    {
      cipherText = fileLoadedEvent.target.result;
      console.log(cipherText);

    };
    fileReader.readAsText(fileToLoad, "UTF-8");

  },

  "click #rsaDecrypt": function(event, template){
      Meteor.call("rsaDecrypt", privateKey, cipherText, function(error, result){
        if(error){
          console.log("error", error);
        }
        if(result){
          var resToString = result;
          document.getElementById("decryptRsaMessage").value = resToString;

        }
      });
  }



});
