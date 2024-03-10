export const layout = "layouts/libraries.njk";
export const title = "Tools";

export default function* ({ search, paginate }) {
  const posts = search.pages("type=tool", "date=desc");

  for (
    const data of paginate(posts, { url, size: 20 })
  ) {
    // Show the first page in the menu
    if (data.pagination.page === 1) {
      data.menu = {
        visible: true,
        order: 3,
      };
    }

    yield data;
  }
}

function url(n) {
  if (n === 1) {
    return "/c/tools/";
  }

  return `/c/tools/${n}/`;
}
