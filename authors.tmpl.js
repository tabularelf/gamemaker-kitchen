export const layout = "layouts/tag.njk";

export default function* ({ search }) {
  for (const author of search.pages("type=lib")) {
    yield {
      url: `/authors/${author.data.authors}/`,
      title: `Tagged “${author.data.type}”`,
      type: "author",
      author,
    };
  }
}
