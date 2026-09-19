# gamemaker-kitchen
 Website Repo Source files

You can visit the website here: https://gamemakerkitchen.com/

## Installation and Running
After cloning the repository, open the project directory in your favorite editor (VSCode is recommended as it works quite well and has a Deno extension).

You will need Deno in order to run Lume, so [Install Deno](https://docs.deno.com/runtime/manual#install-deno) by following the directions on their site. 

**Note**: This repo is currently on v2.x at the time of writing.

Afterwards, you must build the site.

Open a terminal and ensure you're in the project directory at the top level (IE: `\gamemaker-kitchen`) and run:
```
deno task lume
```
Once this is complete, you can serve the site by running:

```
deno task serve
```
Now you should be able to see the site! You should be able to open your favorite browser, navigate to `localhost:3000` and see a local version of the site.

Lume will automatically watch any code changes and rebuild the site to reflect them. Go crazy!

## Accessing the CMS

GameMaker Kitchen now utilises the Lume CMS feature. You may access it via `localhost:3000\admin`.
