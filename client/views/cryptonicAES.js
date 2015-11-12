var AES_ciphertext;
var AES_secretKey;

Template.body.events({

  "click #encrypt": function(event, template){

        var plainText = $('[id=message]').val();
        var passPhrase = $('[id=passphrase]').val();

        Meteor.call("aesEncrypt", plainText, passPhrase, function(error, result){
          if(error){
            console.log("error", error);
            swal("Something went wrong!", "Please try again", "error");
          }
          if(result){
            console.log(result);
            document.getElementById("cipherText").value = result;
            swal("Success!", "You have successfuly encrypted the given plain text", "success");

          }else {
            console.log("NEST");
          }
        });

        // var encrypted = CryptoJS.AES.encrypt($('[id=message]').val(), $('[id=passphrase]').val());
        // document.getElementById("cipherText").value = encrypted;
        //
        // console.log(encrypted);



  },

  "click #saveSecretKey": function(event, template){

        var textToWrite = $('[id=passphrase]').val();
        var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
        var fileNameToSaveAs = "secret_key"

        var downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.innerHTML = "Download File";
        if (window.webkitURL != null)
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

  },



  "click #saveFile": function(event, template){


        var textToWrite = $('[id=cipherText]').val();
        var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
        var fileNameToSaveAs = $('[id=fileName]').val();

        var downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.innerHTML = "Download File";
        if (window.webkitURL != null)
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


  },

  "click #loadFile": function(event, template){

    var fileToLoad = document.getElementById("fileToLoad").files[0];

    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent)
    {
      AES_ciphertext = fileLoadedEvent.target.result;
      console.log(AES_ciphertext);
      // document.getElementById("message").value = textFromFileLoaded;
    };
    fileReader.readAsText(fileToLoad, "UTF-8");


  },

  "click #loadKey": function(event, template){

    var fileToLoad = document.getElementById("keyToLoad").files[0];

    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent)
    {
      AES_secretKey = fileLoadedEvent.target.result;
      console.log(AES_secretKey);
      // document.getElementById("message").value = textFromFileLoaded;
    };
    fileReader.readAsText(fileToLoad, "UTF-8");


  },

  "click #aesDecrypt": function(event, template){




        Meteor.call("aesDecrypt", AES_ciphertext, AES_secretKey, function(error, result){
          if(error){
            console.log("error", error);
            swal("Something went wrong!", "Please try again", "error");

          }
          if(result){
            console.log(result)
            document.getElementById("decryptMessage").value = result;
            swal("Success!", "Your ciphertext was successfuly decrypted", "success");

          }
          else {
            swal("Secret key and cipher did not match!", "Are you sure you are supposed to read that?", "error");
          }
        });
        //napraviti IF ako je krivi ključ ili neuspjeli decrypt



  }



});
