# remote-file-scraper
Get files from remote server

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

| Variable   | Description                                                                       | Type    | Default value | Example                         |
| :--------- | :-------------------------------------------------------------------------------- | :------ | :------------ | :------------------------------ |
| BATCH_MODE | Allow to run tool in batch mode, without user interaction                         | boolean | `false`       | BATCH_MODE=true`                |
| URL        | The URL to scrap                                                                  | URL     |               | `URL=https://my-own-server.url` |
| SCRAPER    | The key of the scraper to use, see [scrapers paragraph](#scrapers)                | String  |               | `SCRAPER=apache`                |
| DOWNLOADER | The key of the downloader to use, see [downloader paragraph](#downloaders)        | String  |               | `DOWNLOADER=pyload`             |
| LOG_LEVEL  | Level of log to print<br/>Possible values: `error, warn, info, debug, trace, log` | String  | `info`        | `LOG_LEVEL=debug`               |
| RESULT_DIR | Path result storing                                                               | String  | `./tmp`       | `RESULT_DIR=/scraper`           |

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

| Variable                 | Description                                  | Type   | Default value | Example                                   |
| :----------------------- | :------------------------------------------- | :----- | :------------ | :---------------------------------------- |
| DOWNLOADSTATION_URL      | URL to connect to Synology Download Station. | String |               | `DOWNLOADSTATION_URL=https://my-nas:5000` |
| DOWNLOADSTATION_ACCOUNT  | Login/username of the account to use.        | String |               | `DOWNLOADSTATION_ACCOUNT=admin`           |
| DOWNLOADSTATION_PASSWORD | Password of the account to use.              | String |               | `DOWNLOADSTATION_PASSWORD=password`       |
