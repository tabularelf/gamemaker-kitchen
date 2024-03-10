export const layout = "layouts/libraries.njk";
export const title = "Snippets";

export default function* ({ search, paginate }) {
  const posts = search.pages("type=snippet", "date=desc");

  for (
    const data of paginate(posts, { url, size: 24 })
  ) {
    // Show the first page in the menu
    if (data.pagination.page === 1) {
      data.menu = {
        visible: true,
        order: 7,
      };
    }

    yield data;
  }
}

function url(n) {
  if (n === 1) {
    return "/c/snippets/";
  }

  return `/c/snippets/${n}/`;
}
