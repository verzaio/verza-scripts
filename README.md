<p align="center">
  <img width="150" src="https://verza.io/img/verza-public.svg" alt="Verza">

  <p align="center">Official scripts for <a href="https://verza.io" target="_blank">verza.io</a> platform.</p>
</p>

## Scripts List

The following scripts are available for use in your server:

| Script                                     | Description                                           |
| ------------------------------------------ | ----------------------------------------------------- |
| `https://scripts.verza-cdn.net/essentials` | Bundle of: `editor` and `fly-mode`.                   |
| `https://scripts.verza-cdn.net/fly-mode`   | Script for enabling fly mode in the server.           |
| `https://scripts.verza-cdn.net/editor`     | Script providing in-game editing capabilities.        |
| `https://scripts.verza-cdn.net/playground` | Script containing a solid plane for testing purposes. |

## Development Scripts List

The following development scripts are available for testing and debugging purposes:

| Script                                         | Description                                                                 |
| ---------------------------------------------- | --------------------------------------------------------------------------- |
| `https://scripts.verza-cdn.net/dev/playground` | Development Playground script for testing features.                         |
| `https://scripts.verza-cdn.net/dev/showcase`   | Development Showcase script for testing features.                           |
| `https://scripts.verza-cdn.net/dev/time`       | Time Debugging.                                                             |
| `https://scripts.verza-cdn.net/dev/character`  | Character Debugging script for debugging character clothing and animations. |

## Installation

To set up the scripts locally, follow these steps:

```bash
# clone & checkout
git clone git@github.com:verzaio/verza-scripts.git
cd verza-scripts
git checkout dev

# install
yarn install

# run
yarn run dev
```

Open [http://localhost:8085](http://localhost:8085) with your browser.
