const fs = require('fs');
const eventPayload = require(process.env.GITHUB_EVENT_PATH);
const library = require('./submitlibrary.json');

const user = eventPayload.sender.login;
const [title, description, authors, link, version, tags, post] = Object.values(library);

function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}

var content = `---
title: ${title}
description: ${description}
link: ${link}
version: ${version}`;

let _date = new Date();

content += "\ndate: " + new String(_date.getFullYear()) + "-" 
+ new String(pad(_date.getMonth() + 1)) + "-" 
+ new String(pad(_date.getDate())) + " " 
+ new String(pad(_date.getHours())) + ":" 
+ new String(pad(_date.getMinutes())) + ":" 
+ new String(pad(_date.getSeconds()));

content += "\ntags:\n";

var _tags = tags.split(", ");

for (var entry in _tags) {
	content += "  - " + _tags[entry] +"\n";
}

content += "authors:\n";

var _authors = authors.split(", ");

for (var entry in _authors) {
	content += "  - " + _authors[entry] + "\n";
}

content += "---\n\n";

content += post;

var _title = encodeURIComponent(title.replace(/[ .*+?^${}()|[\]\\]/g, "-")) + ".md";
var _author = encodeURIComponent(_authors[0].replace(/[ .*+?^${}()|[\]\\]/g, "-"));

if (!fs.existsSync("./lib")) {
	fs.mkdirSync("./lib");
}

if (!fs.existsSync("./lib/" + _author)) {
	fs.mkdirSync("./lib/" + _author);
}

var path = "./lib/" + _author + "/" + title;
fs.stat(path, function(err, stat) {
	if(err == null) {
		console.log('File exists ' + path);
	} else if(err.code === 'ENOENT') {
		// file does not exist
		fs.writeFileSync(path, content);
	} else {
		console.log('Some other error: ', err.code);
	}
});

fs.unlinkSync("submitlibrary.json")