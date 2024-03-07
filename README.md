# gamemaker-kitchen
 Website Repo Source files

You can visit the website here: https://gamemakerkitchen.com/

## Installation and Running
After cloning the repository, open the project directory in your favorite editor (VSCode is recommended as it works quite well and has a Deno extension).

You will need Deno in order to run Lume, so [Install Deno](https://docs.deno.com/runtime/manual#install-deno) by following the directions on their site. 

Afterwards, you must build the site.

Open a terminal and ensure you're in the project directory at the top level (IE: `\gamemaker-kitchen`) and run:
```
deno task lume
```
Once this is complete, you can serve the site by running:

```
deno task lume --serve
```
Now you shoul dbe able to see the site! You should be able to open your favorite browser, navigate to `localhost:3000` and see a local version of the site.

Lume will automatically watch any code changes and rebuild the site to reflect them. Go crazy!

### deno task lume alias
If `deno task` is too many characters for you, you may optionally set up an alias with the following command:
```
deno install --allow-run --allow-env --allow-read --name lume --force --reload https://deno.land/x/lume_cli/mod.ts
```
After you run this command, `lume` in the terminal will be the equivalent of `deno task lune` and you can therefore serve the site with:
```
lume --serve
```