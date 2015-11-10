Meteor.startup(function(){
  console.log("SERVER STARTED");

  forge = Meteor.npmRequire('node-forge');
  rsa = forge.pki.rsa;
  pki = forge.pki;

});
Meteor.methods({

  aesEncrypt:function(){

  },

  aesDecrypt:function(AES_ciphertext,AES_secretkey){

    var decrypted = CryptoJS.AES.decrypt(AES_ciphertext, AES_secretkey);
    console.log(decrypted);
    var dec = decrypted.toString(CryptoJS.enc.Utf8);

    return dec;
  },

  rsaKeyPair:function(){


    var keypair = rsa.generateKeyPair({bits: 2048, e: 0x10001});
    console.log("OKE SAD SMO GA GENERIRALI");

    var publicKey = pki.publicKeyToPem(keypair.publicKey)
    var privateKey = pki.privateKeyToPem(keypair.privateKey)

    console.log(publicKey);
    console.log(privateKey);


    return [publicKey,privateKey];

  },

  rsaEncrypt:function(pubPem,plainText){

    console.log(plainText);

    var publicKey = pki.publicKeyFromPem(pubPem);
    console.log(publicKey);

    var encrypted = publicKey.encrypt(plainText);
    console.log("Encryption: ");
    console.log(encrypted);


    return encrypted;

  },

  rsaDecrypt:function(privPem, cipherText){

    var privateKey = pki.privateKeyFromPem(privPem);
    var decrypted  = privateKey.decrypt(cipherText);
    console.log(decrypted);

    return decrypted;
  },

  rsaSign:function(privPem, openFile){

    var privateKey = pki.privateKeyFromPem(privPem);

    var md = forge.md.sha256.create();
    md.update(openFile, 'utf8');

    var signature = privateKey.sign(md);

    console.log(signature);
    console.log(md.digest());
    return [signature,md.digest().toHex()];
  },

  rsaVerify:function(){

  }


});
