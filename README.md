# Ditto Documentation Website

## Installation

```console
yarn install
```

## Local Development

```console
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Generate search indexes

Search is provided by [Algolia](https://algolia.com/). Every time a change is made to the documentation, you should run the crawler locally which will update the search indexes.

0. Ensure that your changes have been pushed and deployed to `https://docs.ditto.live`. The scraper runs on the live version of the website, so they need to be deployed before following the rest of these instructions.
1. Install and run [Docker](https://docs.docker.com/get-docker/)
2. Get added to the Ditto Algolia account.
3. Copy the `.env.example` file.

```command
cp algolia/.env.example algolia/.env
```

4. Add your Algolia [API Write Key](https://www.algolia.com/account/api-keys/all?applicationId=F25GUUSPFJ) in `.env`

5. Run the Docker script to update the search indexes

```command
npm run search-indexes
```

## Build

```console
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

```console
GIT_USER=<Your GitHub username> USE_SSH=true yarn deploy
```

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.
If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
