export const url = "/feed.json";

export default function ({ site, search }, { md, url, date, htmlUrl }) {
  const feed = {
    version: "https://jsonfeed.org/version/1",
    title: site.title,
    home_page_url: url("", true),
    feed_url: url("feed.json", true),
    description: site.description,
    author: {
      name: site.author.name,
      url: site.author.url,
    },
    items: [],
  };

  for (const post of search.pages("type=posts", "date=desc", 10)) {
    feed.items.push({
      id: url(post.url, true),
      url: url(post.url, true),
      title: post.title,
      content_html: htmlUrl(md(post.content), true),
      date_published: date(post.date, "ATOM"),
    });
  }

  return JSON.stringify(feed, null, 2);
}
