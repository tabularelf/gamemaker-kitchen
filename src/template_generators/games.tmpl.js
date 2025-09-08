export const layout = "layouts/libraries.njk";
export const title = "Games";

export default function* ({ search, paginate }) {
  const posts = search.pages("type=game", "date=desc");
  for (
    const data of paginate(posts, { url, size: 24 })
  ) {
    // Show the first page in the menu
    if (data.pagination.page === 1) {
      data.menu = {
        visible: true,
        order: 9,
      };
    }

    yield data;
  }
}

function url(n) {
  if (n === 1) {
    return "/games/";
  }

  return `/games/${n}/`;
}
