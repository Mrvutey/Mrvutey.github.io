const fs = require('fs').promises;
const moment = require('moment');
const multer = require("multer")

const logError = async (controller="user.list",message="error message",res) => {
  try {
    // Append the log message to the file (create the file if it doesn't exist)
    const timestamp = moment().format("DD/MM/YYYY HH:mm:ss"); // Use 'moment' for formatted timestamp
    const path = "./logs/"+controller+".txt";
    const logMessage = "["+timestamp+"] "+message +"\n\n";
    await fs.appendFile(path, logMessage);
  } catch (error) {
    console.error('Error writing to log file:', error);
  }
  res.status(500).send('Internal Server Error');
}

const formatDate = () => {
  
}

const isEmptyOrNull = (value) => {
  if(value === "" || value === null || value === undefined || value === "null" || value === "undefined"){
    return true;
  }
  return false;
}

const generatInvoicNo = () => {

}

const removeFile = async (fileName) => {
  var filePath = "D:/xampp/htdocs/full_stack/image/"
  try {
      await fs.unlink(filePath+fileName);
      return 'File deleted successfully';
  } catch (err) {
    console.error('Error deleting file:', err);
    throw err;
  }
}


const upload = multer({
  storage:multer.diskStorage({
      destination:function(req,file,callback){ // image path
          callback(null,"D:/xampp/htdocs/full_stack/image/")
      },
      filename : function(req,file,callback){
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
          callback(null, file.fieldname + '-' + uniqueSuffix)
      }
  }),
  limits:{
      fileSize : (1024*1024) * 3 // max 3MB
  },
  fileFilter: function(req,file,callback){
      if(file.mimetype != "image/png" && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg'){
          // not allow 
          callback(null,false)
      }else{
          callback(null,true)
      }
  }
})
// const myupload = multer({
//   storage:,
//   limits:,
//   fileFilter:
// })


module.exports = {
  upload,
  logError,
  formatDate,
  isEmptyOrNull,
  generatInvoicNo,
  removeFile
}