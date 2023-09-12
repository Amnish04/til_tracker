const htmlFs = require("fs");

module.exports.convertToHTML = function (title: string, cssLink: string, body: string, outputFolder: string) {
    const result:string = `<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>${title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    ${
        cssLink
            ? `<link rel="stylesheet" href="${cssLink}">`
            : ""
    }
</head>
<body>
<h1>${title}</h1>
${body}
</body>
</html>`;

    htmlFs.writeFile(`${outputFolder}/${title}.html`, result, function (err: string) {
        if (err) console.error(err);
    });
    console.log(`${title}.html is created successfully!`);
};