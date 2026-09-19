export const layout = "layouts/author.njk";

export default function* (site) {
  for (const author of site.getAuthors()) {
    let content = "";
    let authorPage = site.search.page(`type=authors_metadata title=${author.authorSafe}`);
    if (authorPage != undefined) {
      content = authorPage.content;
    }
    
    yield {
      url: (`/authors/${author.authorSafe}/`),
      title: `Author “${author.author}”`,
      content: content,
	    name: author.author,
      type: "author",
      author: author.author,
    };
  }
}