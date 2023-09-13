import readFolderFs from "fs";
const fileModule = require("./readFile");

module.exports.readFolder = function (path: string, cssLink: string, outputFolder: string) {
    try {
        readFolderFs.readdir(path, function (err: any, files: any[]) {
            if (err) {
                console.log(err);
                process.exit(-1);
            }
            const textFiles:any[] = files.filter(file => file.split('.').pop()==='txt');
            textFiles.forEach(function (file) {
                fileModule.readFile(
                    `${path}/${file}`,
                    cssLink,
                    outputFolder
                );
            });
        });
    } catch (error) {
        console.error(error);
        process.exit(-1);
    }
};