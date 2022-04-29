const fs = require('fs');
const eventPayload = require(process.env.GITHUB_EVENT_PATH);
const library = require('./submitlibrary.json');

const user = eventPayload.sender.login;
const [title, description, authors, link, version, tags, post] = Object.values(library);

var content = `---
title: ${title}
description: ${description}
link: ${link}
version: ${version}`;

let _date = new Date();

content += "date: " + string(_date.getFullYear()) + "-" + string(_date.getMonth() + 1) + "-" + string(_date.getDate()) + "\n";

content += "\ntags:\n";

var _tags = tags.split(",");

for (var entry in _tags) {
	content += "  - " + _tags[entry] +"\n";
}

content += "\authors:\n";

var _authors = authors.split(",");

for (var entry in _authors) {
	content += "  - " + _authors[entry] + "\n";
}

content += "---\n\n";

content += post;


if (!fs.existsSync("./lib")) {
	fs.mkdirSync("./lib");
}

if (!fs.existsSync("./lib/" + _authors[0])) {
	fs.mkdirSync("./lib/" + _authors[0]);
}

var path = "./lib/" + _authors[0] + "/" + title.replace(" ", "-") + ".md";
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