export const layout = "layouts/tag.njk";

export default function* ({ search }) {
  const tags = new Set(search.values("tags"));
  //console.log([...tags]);

  for (var tag of tags) {
    yield {
      url: `/tags/${tag}/`,
      title: `Tagged “${tag}”`,
      type: "tag",
      tag,
    };
  }
}
 