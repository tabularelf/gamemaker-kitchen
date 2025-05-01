export const layout = "layouts/libraries.njk";
export const title = "Plugins";

export default function* ({ search, paginate }) {
  const posts = search.pages("type=plugin", "date=desc");

  for (
    const data of paginate(posts, { url, size: 24 })
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
    return "/plugins/";
  }

  return `/plugins/${n}/`;
}
