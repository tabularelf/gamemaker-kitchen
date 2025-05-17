export const layout = "layouts/author.njk";

export default function* (site) {
  console.log([...site.getAuthors()])
  for (const author of site.getAuthors()) {
    let content = "";
    let authorPage = site.search.page(`type=authors_metadata title=${author.author}`);
    if (authorPage != undefined) {
      content = authorPage.data.content;
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