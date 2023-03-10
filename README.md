# remote-file-scraper

Get files from remote server.

- [Requirements](#requirements)
- [Installation](#installation)
- [Run](#run)
  - [Interactive mode](#interactive-mode)
  - [Pre-filled mode](#pre-filled-mode)
- [Environment variable](#environment-variable)
  - [Variables](#variables)
  - [Scrapers](#scrapers)
  - [Downloaders](#downloaders)
    - [File list configuration](#file-list-configuration)
    - [Synology Download Station configuration](#synology-download-station-configuration)
- [Docker](#docker)
  - [Interactive mode](#interactive-mode-1)
  - [Batch mode](#batch-mode)


## Requirements

 - Node.js v18+

## Installation

```shell
npm i
```

## Run

### Interactive mode

```shell
npm start
```

### Pre-filled mode

You can pre-fill information using a `.env` file in program root directory.

```shell
touch .env # fill it
npm start
```

## Environment variable

### Variables

| Variable              | Description                                                                                      | Type    | Default value | Example                         |
| :-------------------- | :----------------------------------------------------------------------------------------------- | :------ | :------------ | :------------------------------ |
| BATCH_MODE            | Allow to run tool in batch mode, without user interaction                                        | boolean | `false`       | BATCH_MODE=true`                |
| URL                   | The URL to scrap                                                                                 | URL     |               | `URL=https://my-own-server.url` |
| SCRAPER               | The key of the scraper to use, see [scrapers paragraph](#scrapers)                               | String  |               | `SCRAPER=apache`                |
| DOWNLOADER            | The key of the downloader to use, see [downloader paragraph](#downloaders)                       | String  |               | `DOWNLOADER=pyload`             |
| LOG_LEVEL             | Level of log to print<br/>Possible values: `error, warn, info, debug, trace, log`                | String  | `info`        | `LOG_LEVEL=debug`               |
| RESULT_DIR            | Path result storing                                                                              | String  | `./tmp`       | `RESULT_DIR=/scraper`           |
| FILTER_EXTENSIONS     | List of extensions to filter files<br/>The leadinds dot is required, excepted for `<none>` value | String  |               | `FILTER_EXTENSIONS=.nfo,.txt`   |
| FILTER_EXTENSION_MODE | Filter can be used to include or exclude extension<br/>Possible values: `include, exclude`       | String  | `include`     | `FILTER_EXTENSION_MODE=exclude` |

### Scrapers

| Scraper     | Key       | Description                                                                 |
| :---------- | :-------- | :-------------------------------------------------------------------------- |
| Apache      | `apache`  | Scrap Apache HTTPD server directory list.                                   |
| Archive.org | `archive` | Scrap Archive.org files.                                                    |
| Local file  | `local`   | Scrap generated results on local system.<br />See [RESULT_DIR](#variables). |

### Downloaders

| Downloader                | Key         | Description                                                                                                                         |
| :------------------------ | :---------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| File list                 | `filelist`  | Generates a file with all URLs.<br />See [File list configuration](#file-list-configuration).                                       |
| Synology Download Station | `dlstation` | Synology Download Station downloader.<br />See [Synology Download Station configuration](#synology-download-station-configuration). |
| pyLoad                    | `pyload`    | pyLoad downloader.                                                                                                                  |

#### File list configuration

| Variable        | Description                                                                                       | Type   | Default value | Example                      |
| :-------------- | :------------------------------------------------------------------------------------------------ | :----- | :------------ | :--------------------------- |
| FILELIST_LIMIT  | The maximum number of URL for a file.<br />If `limit <= 0`, it all URLs will be in a single file. | Number |               | `FILELIST_LIMIT=50`          |
| FILELIST_OUTPUT | The output direction to generate files.                                                           | String | `./tmp`       | `FILELIST_OUTPUT=/tmp/files` |

#### Synology Download Station configuration

| Variable           | Description                                  | Type   | Example                             |
| :----------------- | :------------------------------------------- | :----- | :---------------------------------- |
| DLSTATION_URL      | URL to connect to Synology Download Station. | String | `DLSTATION_URL=https://my-nas:5000` |
| DLSTATION_ACCOUNT  | Login/username of the account to use.        | String | `DLSTATION_ACCOUNT=admin`           |
| DLSTATION_PASSWORD | Password of the account to use.              | String | `DLSTATION_PASSWORD=password`       |

## Docker

### Interactive mode

```shell
docker run -it atrovato/remote-file-scraper:latest
```

### Batch mode

```shell
docker run \
-v /path/to/mount:/tmp \
-e BATCH_MODE=true \
-e RESULT_DIR=/tmp \
# add all variables
atrovato/remote-file-scraper:latest
```