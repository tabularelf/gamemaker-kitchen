import lumeCMS from "lume/cms/mod.ts";

const cms = lumeCMS();

const url: Lume.CMS.Field = {
  name: "url",
  type: "text",
  description: "The public URL of the page. Leave empty to use the file path.",
  transform(value) {
    if (!value) {
      return;
    }

    if (!value.endsWith("/")) {
      value += "/";
    }
    if (!value.startsWith("/")) {
      value = "/" + value;
    }

    return value;
  },
};

cms.document({
  name: "settings",
  description: "Global settings for the site.",
  store: "src:_data.yml",
  url: "/",
  fields: [
    {
      name: "lang",
      type: "text",
      label: "Language",
    },
    {
      name: "home",
      type: "object",
      fields: [
        {
          name: "welcome",
          type: "text",
          label: "Title",
          description: "Welcome message in the homepage",
        },
      ],
    },
    {
      name: "menu_links",
      type: "object-list",
      fields: [
        {
          name: "text",
          type: "text",
          label: "Title",
        },
        {
          name: "href",
          type: "text",
          label: "URL",
        },
      ],
    },
    {
      name: "extra_head",
      type: "code",
      description: "Extra content to include in the <head> tag",
    },
    {
      name: "metas",
      type: "object",
      description: "Meta tags configuration.",
      fields: [
        "site: text",
        "description: text",
        "title: text",
        "image: text",
        "twitter: text",
        "lang: text",
        "generator: checkbox",
      ],
    },
  ],
});

cms.collection(
  "posts: Blog posts",
  "src:posts/*.md",
  [
    "title: text",
    url,
    {
      name: "author",
      type: "text",
      init(field, { data }) {
        field.options = data.site?.search.values("author");
      },
    },
    "date: date",
    {
      name: "draft",
      label: "Draft",
      type: "checkbox",
      description: "If checked, the post will not be published.",
    },
    {
      name: "tags",
      type: "list",
      label: "Tags",
      init(field, { data }) {
        field.options = data.site?.search.values("tags");
      },
    },
    {
      name: "comments",
      type: "object",
      fields: [
        {
          name: "src",
          label: "Link to Mastodon post",
          type: "url",
        },
        {
          name: "bluesky",
          label: "Link to Bluesky post",
          type: "url",
        },
      ],
    },
    {
      name: "extra_head",
      type: "code",
      description: "Extra content to include in the <head> tag",
    },
    {
      name: "content",
      type: "markdown",
      label: "Content",
    },
  ],
);

cms.collection(
  "Libraries: All of the library content",
  "src:libraries/**/*.md",
  [
    {
      name: "title",
      type: "text",
      label: "Title",
    },
    url,
    {
      name: "link",
      type: "url",
      label: "Link",
    },
    {
      name: "logo",
      type: "url",
      label: "Logo",
    },
    {
      name: "banner",
      type: "url",
      label: "Banner",
    },
    {
      name: "paid",
      type: "checkbox",
      label: "Paid Asset?",
    },
    {
      name: "authors",
      type: "list",
      label: "Authors",
    },
    {
      name: "tags",
      type: "list",
      label: "Tags",
    },
    {
      name: "gm_versions",
      type: "list",
      label: "GameMaker Versions",
    },
    {
      name: "donation_link",
      type: "url",
      label: "Sponsor Link",
    },
    {
      name: "content",
      type: "markdown",
      label: "Content",
    },
  ],
);

cms.upload("uploads: Uploaded files", "src:uploads");

export default cms;
