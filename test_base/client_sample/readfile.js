var mongooseDrv = require("mongoose");
var Grid = require('gridfs-stream');
var schema = mongooseDrv.Schema;
mongooseDrv.connect('mongodb+srv://admin:atlasadmin@cluster0-sxaex.mongodb.net/reporter?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true });
var connection = mongooseDrv.connection;
 
if (connection !== "undefined") {
    console.log(connection.readyState.toString());
    var path = require("path");
    var grid = require("gridfs-stream");
    var fs = require("fs");
    // var videosrc = path.join(__dirname, "../uploads/celibration_write.mp4");
    Grid.mongo = mongooseDrv.mongo;
    connection.once("open", () => {
        console.log("Connection Open");
        var gridfs = grid(connection.db);
        if (gridfs) {
            var fsstreamwrite = fs.createWriteStream(
                path.join(__dirname, "../uploads/moon.jpg")
            );
 
            var readstream = gridfs.createReadStream({
                filename: "moon.jpg"
            });
            readstream.pipe(fsstreamwrite);
            readstream.on("close", function (file) {
                console.log("File Read successfully from database");
            });
        } else {
            console.log("Sorry No Grid FS Object");
        }
    });
} else {
 
    console.log('Sorry not connected');
}
console.log("done");