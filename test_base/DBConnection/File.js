const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    _id:{
        type:String,
        trim: true,
    },
    file0:{
        type:Array,
    }
});

const File = mongoose.model("tbl_files", FileSchema);
module.exports = File;