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
  "Libraries: All of the cool libraries 😎",
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

cms.collection(
  "Tools: All of the cool tools 😎",
  "src:tools/**/*.md",
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

cms.collection(
  "Assets: All of the cool assets 😎",
  "src:assets/**/*.md",
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

cms.collection(
  "Snippets: All of the cool snippets 😎",
  "src:snippets/**/*.md",
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

cms.collection(
  "Plugins: All of the cool plugins 😎",
  "src:plugins/**/*.md",
  [
    {
      name: "title",
      type: "text",
      label: "Title",
    },
    url,
    {
      name: "parent",
      type: "text",
      label: "Parent Resource",
    },
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

cms.collection(
  "Tutorials: All of the amazing tutorials 🔥",
  "src:tutorials/**/*.md",
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
