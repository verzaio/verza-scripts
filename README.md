# Verza Scripts

This repository contains the official scripts for the Verza platform.

## Scripts List

| Script                                     | Description                                             |
| ------------------------------------------ | ------------------------------------------------------- |
| `https://scripts.verza-cdn.net/essentials` | Essentials script that bundles `editor` and `fly-mode`. |
| `https://scripts.verza-cdn.net/fly-mode`   | Fly mode script.                                        |
| `https://scripts.verza-cdn.net/editor`     | Editor script.                                          |
| `https://scripts.verza-cdn.net/playground` | Playground that includes a solid plane.                 |

## Development Scripts List

| Script                                         | Description                                          |
| ---------------------------------------------- | ---------------------------------------------------- |
| `https://scripts.verza-cdn.net/dev/playground` | A dev playground to test different features.         |
| `https://scripts.verza-cdn.net/dev/showcase`   | A showcase to test different features.               |
| `https://scripts.verza-cdn.net/dev/time`       | A script to debug time.                              |
| `https://scripts.verza-cdn.net/dev/character`  | A script to debug character clothing and animations. |

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
