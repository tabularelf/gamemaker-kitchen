export const layout = "layouts/tag.njk";

export default function* ({ search }) {
  for (var tag of search.tags()) {
    yield {
      url: `/tags/${tag}/`,
      title: `Tagged “${tag}”`,
      type: "tag",
      tag,
    };
  }
}
 