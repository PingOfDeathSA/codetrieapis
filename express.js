const express = require('express');
const fileUpload = require('express-fileupload');
const uploadMuisc = require('./file-manager/upload-muisc');
const getMusic = require('./file-manager/get-muisc');
const deleteMusic = require('./file-manager/delete-music');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));



// APIs
uploadMuisc.uploadMusic(app , path, fs);
getMusic.getMusic(app, path, fs);
deleteMusic.deleteMusic(app, path, fs);

 
  
 
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});