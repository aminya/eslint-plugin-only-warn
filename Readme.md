# @aminya/eslint-plugin-only-warn

[![Build Status](https://travis-ci.org/aminya/eslint-plugin-only-warn.svg?branch=master)](https://travis-ci.org/aminya/eslint-plugin-only-warn)

Downgrade errors to warnings **with flexibility**. This fork has more features than the original plugin:
- `exclude-id` option: a regex pattern to exclude some of the plugins or rules
- `fatal-as-warning` option: an option to make fatal errors a warning

## Installation

```
npm install eslint-plugin-only-warn@npm:@aminya/eslint-plugin-only-warn --save-dev
```

or in package.json:
```json
"devDependencies": {
    "eslint-plugin-only-warn": "npm:@aminya/eslint-plugin-only-warn@^1.2.1",
}
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also use `-g` for the above command.

## Usage

Add `only-warn` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "only-warn"
    ]
}
```

## Settings

### `exclude-id`

You can provide a regex string to exclude some of the rule IDs (a full rule name or the plugin name). You can separate each pattern by `|`.

```json
{
    "plugins": [
        "only-warn"
    ],
    "settings": {
        "only-warn": {
            "exclude-id": "no-unused-vars|@typescript-eslint"
        }
    }
}
```

### `fatal-as-warning`

Downgrade fatal errors to warning if 'fatal-as-warning' is enabled in the settings. However, it is recommended that you don't enable this. It is `false` by default.

```json
{
    "plugins": [
        "only-warn"
    ],
    "settings": {
        "only-warn": {
            "fatal-as-warning": true
        }
    }
}
```
