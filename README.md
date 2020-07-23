# Bermuda

A [Ghost](http://github.com/tryghost/ghost/) theme using [Tailwind CSS](https://tailwindcss.com/), [Prism](https://prismjs.com/) for syntax highlighting, and [FontAwesome](https://fontawesome.com/) for vector icons. Everything bundled together with [Webpack](https://webpack.js.org/).

# First time using a Ghost theme?

Ghost uses a simple templating language called [Handlebars](http://handlebarsjs.com/) for its themes.

This theme has lots of code comments to help explain what's going on just by reading the code. Once you feel comfortable with how everything works, we also have full [theme API documentation](https://ghost.org/docs/api/handlebars-themes/) which explains every possible Handlebars helper and template.

**The main files are:**

- `default.hbs` - The parent template file, which includes your global header/footer
- `index.hbs` - The main template to generate a list of posts, usually the home page
- `post.hbs` - The template used to render individual posts
- `page.hbs` - Used for individual pages
- `tag.hbs` - Used for tag archives, eg. "all posts tagged with `news`"
- `author.hbs` - Used for author archives, eg. "all posts written by Jamie"

One neat trick is that you can also create custom one-off templates by adding the slug of a page to a template file. For example:

- `page-about.hbs` - Custom template for an `/about/` page
- `tag-news.hbs` - Custom template for `/tag/news/` archive
- `author-ali.hbs` - Custom template for `/author/ali/` archive

# Development

Styles are compiled using Webpack/PostCSS. You'll need [Node](https://nodejs.org/), [Yarn](https://yarnpkg.com/) and [Webpack](https://webpack.js.org/) installed. After that, from the theme's root directory:

```bash
# install dependencies
yarn install

# run development server
yarn dev
```

# PostCSS Features Used

- Autoprefixer - Don't worry about writing browser prefixes of any kind, it's all done automatically with support for the latest 2 major versions of every browser.
- PurgeCSS - Remove unused CSS.
- cssnano - Takes your nicely formatted CSS and runs it through many focused optimisations, to ensure that the final result is as small as possible for a production environment.

# Icons

We use [FontAwesome](https://fontawesome.com/) SVG JavaScript Core. Using `fontawesome-svg-core` allows us to create a subset of icons and reduce the final bundled file size. To incude an icon in the build, edit the `src/index.js` file and add it to the import list. To use an icon, simply reference it in your HTML as `<i class="fas fa-play-circle"></i>`.

# Deployment

## Manual

To compile assets for production, purge css, and package into a zip file, run:

```bash
yarn build
```

The theme files are zipped into `theme.zip`, which you can then upload to your site.

## Automated

You can automate the deployment of your theme by using [Ghost's Admin API](https://ghost.org/docs/api/v3/admin/) and [Github Actions](https://github.com/features/actions).

Start by creating Ghost Admin API keys ([docs](https://ghost.org/docs/api/v3/admin/#token-authentication)) and copy the Content API Key and Admin API Key to GitHub Secrets ([docs](https://docs.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets)) using the keys `GHOST_ADMIN_API_URL` and `GHOST_ADMIN_API_KEY`.

Place the following into `.github/workflows/deploy-theme.yml` and your theme will automatically be updated upon `git push origin master`. 

```yaml
# This workflow will build the theme and submit to Ghost using the Admin API.
name: Deploy Theme
on:
  push:
    branches:
      - master
jobs:
  deploy:
    runs-on: ubuntu-18.04
    steps:
      - name: Checkout theme
        uses: actions/checkout@v2

      - name: Setup Node.js 12.x
        uses: actions/setup-node@v1
        with:
          node-version: '12.x'
      
      - name: Intall dependencies
        run: yarn --frozen-lockfile

      - name: Build theme
        run: yarn build

      - name: Deploy theme
        uses: TryGhost/action-deploy-theme@v1.4.0
        with:
          api-url: ${{ secrets.GHOST_ADMIN_API_URL }}
          api-key: ${{ secrets.GHOST_ADMIN_API_KEY }}
          theme-name: bermuda
          file: theme.zip
```

# Copyright & License

Copyright (c) 2020 Compulsivo, Inc. - Released under the [MIT license](LICENSE).