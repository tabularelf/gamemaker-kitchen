export const layout = "layouts/tag.njk";

export default function* ({ search }) {
  for (const author of search.pages("authors")) {
    yield {
      url: `/authors/${author}/`,
      title: `author “${author}”`,
      type: "author",
      author,
    };
  }
}
