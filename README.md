# The Lazy Media mobile app

An Expo app for browsing The Lazy Media's Game and Tech articles on a phone or in a browser.

![Language](https://img.shields.io/badge/language-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) ![Version](https://img.shields.io/badge/version-1.0.0-blue?style=flat-square)

## Overview

The app gives readers a compact way to browse The Lazy Media's Game and Tech articles. It opens on Game, uses bottom tabs to switch categories, and loads article details when a reader selects a story. The article lists and details come from an external API; this repository contains the Expo client, not the API service.

## Features

- Browse separate Game and Tech lists with thumbnails, titles, authors, and dates.
- Load more list entries as the reader scrolls.
- Read article headings, paragraphs, ordered and unordered lists, and images returned by the API.
- Use the same Expo project scripts to target Android, iOS, or web development environments.

## Getting started

### Prerequisites

- Node.js and npm.
- A device, emulator, or browser supported by the installed Expo toolchain. Android and iOS development also require the corresponding platform setup.
- Network access to the article API at `thelazymedia-api.herokuapp.com` for article content.

This project declares Expo SDK 44 and React Native 0.64.3 in [package.json](package.json). It has no lockfile, and the navigation dependencies use `*` version ranges. A fresh install can therefore resolve versions that differ from the original environment. Check compatibility with this older Expo SDK if installation or startup fails.

### Install and start

From the repository root in PowerShell:

```powershell
npm.cmd install
npm.cmd run start
```

Expo starts its development server and shows options for opening the app. Use a compatible device client or emulator to open it. The first visible app screen is the splash screen, followed by the Game list.

For macOS or Linux shells, use `npm install` and `npm run start` in the same directory.

### Other launch commands

The [package scripts](package.json) provide these development targets. Run one command from the repository root after installing dependencies:

| Target | PowerShell command | Requirement |
| --- | --- | --- |
| Android | `npm.cmd run android` | Android device or emulator setup. |
| iOS | `npm.cmd run ios` | macOS with an iOS device or simulator setup. |
| Web | `npm.cmd run web` | A browser and the project's web dependencies. |

These target commands are declared in `package.json` but have not been run in this checkout.

## Usage

1. Open the app from the Expo development server. A splash screen appears before the Game list.
2. Select an article to read its title, author, date, category, text, and any images returned by the API. Use the navigation header to return to the list.
3. Use the Tech and Game tabs to switch categories. Scrolling toward the end of a list requests another page.

## Data and API

The app makes these requests to `https://thelazymedia-api.herokuapp.com`:

| Action | Request | Used by |
| --- | --- | --- |
| Load Game articles | `GET /getListArticleByCategory/games/{page}` | [GamesScreen.js](screen/GamesScreen.js) |
| Load Tech articles | `GET /getListArticleByCategory/tech/{page}` | [TechScreen.js](screen/TechScreen.js) |
| Open an article | `POST /getArticle` with a JSON `link` field | [ArticleScreen.js](screen/ArticleScreen.js) |

The list screens start at page 1 and append entries from `json.data` as more pages are requested. The article screen passes the selected entry's `link` to the detail endpoint. [ArticleDetail.js](components/ArticleDetail.js) renders the returned content, while [ArticleImage.js](components/ArticleImage.js) loads remote article images.

The API address is hardcoded in the three screens. There are no environment variables, local API configuration, authentication steps, or offline article store in this repository. The app needs the API and image URLs to be reachable while reading.

## Troubleshooting

### The article list stays empty

Check that the development server is running and the device can reach the article API. The list screens depend on the API's `data` array and do not display a request error. If the API is unavailable or returns a different response shape, the app has no fallback content.

### An article opens without content or an image

Article details are fetched separately from the list. Check the detail endpoint and the remote image URL returned for that article. The image component waits for the image dimensions before displaying it.

### Installation or startup fails

Check the installed Node.js, Expo tooling, and device client against Expo SDK 44. This repository has no lockfile, so dependency resolution can change between installations. Start with the versions declared in [package.json](package.json) when diagnosing a mismatch.

## Project files

| Path | Purpose |
| --- | --- |
| [App.js](App.js) | Navigation between the splash screen, article tabs, and article view. |
| [screen/](screen/) | Game and Tech lists, article loading, and splash screen. |
| [components/](components/) | Article list items, article content, and remote images. |
| [app.json](app.json) | Expo app metadata, version, icons, and splash settings. |
| [assets/](assets/) | App icons, logo, splash image, and loading animations. |

## Development status

There is no test script in `package.json`, and this repository does not include a lockfile. The setup and behavior above were checked against the source. A live app launch and API availability have not been verified for this README.
