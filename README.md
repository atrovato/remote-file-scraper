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

| Variable   | Description                                                                        | Type    | Default value | Example                         |
| :--------- | :--------------------------------------------------------------------------------- | :------ | :------------ | :------------------------------ |
| BATCH_MODE | Allow to run tool in batch mode, without user interaction                          | boolean | `false`       | BATCH_MODE=true`                |
| URL        | The URL to scrap                                                                   | URL     |               | `URL=https://my-own-server.url` |
| KIND       | The key kind of page to scrap, see [kinds paragraph](#kinds)                       | String  |               | `KIND=apache`                   |
| LOG_LEVEL  | Level of log to print<br/> Possible values: `error, warn, info, debug, trace, log` | String  | `info`        | `LOG_LEVEL=debug`               |
| RESULT_DIR | Path result storing                                                                | String  | `./tmp`       | `RESULT_DIR=/scraper`           |

### Kinds

| Kind        | Key       | Description                                                                  |
| :---------- | :-------- | :--------------------------------------------------------------------------- |
| Apache      | `apache`  | Scrap Apache HTTPD server directory list.                                    |
| Archive.org | `archive` | Scrap Archive.org files.                                                     |
| Local file  | `local`   | Scrap generated results on local system.<br /> See [RESULT_DIR](#variables). |
