/*

    RECEIVE FILES IN GOOGLE DRIVE
    
*/

function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('forms.html').setTitle("Google File Upload");
}


function uploadFileToGoogleDrive(data, filess, name, email) {

  try {
    
    var dropbox = "Received Files";
    var folder, folders = DriveApp.getFoldersByName(dropbox);
    
    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder(dropbox);
    }
    var userFolder = folder.createFolder([name, email].join(" "));
    for(var x = 0; x < filess.length; x++){

    var contentType = data[x].substring(5,data[x].indexOf(';')),
        bytes = Utilities.base64Decode(data[x].substr(data[x].indexOf('base64,')+7)),
        blob = Utilities.newBlob(bytes, contentType, filess[x]),
        file = userFolder.createFile(blob);
    }
    return "OK";
    
  } catch (f) {
    Logger.log(f.toString());
  }
  
}
