[![Build status](https://gitlab.com/octopusinvitro/html5-scafold/badges/master/pipeline.svg)](https://gitlab.com/octopusinvitro/html5-scafold/commits/master)
[![Depfu](https://badges.depfu.com/badges/82fd3b4fc953e9a39088b0820d983573/overview.svg)](https://depfu.com/github/octopusinvitro/html5-scafold?project_id=12256)
[![Maintainability](https://api.codeclimate.com/v1/badges/2a11d7b252c4d00fee25/maintainability)](https://codeclimate.com/github/octopusinvitro/html5-scafold/maintainability)


# Readme

I use this as a starting point for a web project. It uses **Sass** and **vanilla** JavaScript.

It's based on the [HTML5 boilerplate](https://html5boilerplate.com/) project, the [Normalize](https://necolas.github.io/normalize.css/) stylesheet and the [Jasmine](https://jasmine.github.io/) testing framework. It uses [Gulp](http://gulpjs.com/) as a task manager and [Browsersync](https://www.browsersync.io/) to locally run the site and tests (they have [a nice guide for Gulp here](https://www.browsersync.io/docs/gulp/)).

Travis stopped being free for open source projects so a [GitLab CI](https://docs.gitlab.com/ee/ci/) configuration is provided.

- The `app` folder is the working directory.

- The `site` folder is built from the `app` folder and it's regenerated often, so should not be added to source control or used to store permanent files.

- The `app/index.html` is the entry point to your app.

- The `app/js/index.html` is the JavaScript tests runner used in a browser.


## One-off setup

I will attempt to use the last files on the [HTML5 Boilerplate dist folder](https://github.com/h5bp/html5-boilerplate/tree/main/dist) and also the last [Normalize stylesheet](http://necolas.github.io/normalize.css/). If they are not, download the latest version.

Download the last release from the [Jasmine releases page](https://github.com/jasmine/jasmine/releases), extract the `lib` folder and the spec runner from the zip file, and place both under the `js` folder. When setting the DOM in tests, use `createElement()` and `remove()` rather than wiping the whole contents of the body, as Jasmine writes the test output to the body.

As new JavaScript and spec files are added to the project, add them to:
* the spec runner,
* the `gulpfile.js` (`dev.js`) in the right order,
* the `eslintrc.json` file in `globals` and `varsIgnorePattern`.

There is no need for the lint tasks in the `gulpfile.js`, but ESLint may still be needed for editor/IDE linter plugins to work. The `babel-eslint` package is needed as a parser for `gulp-eslint`.

Update the `browser` option in the Browsersync configuration inside the `gulpfile.js` to add all the browsers you want to use for testing.

For running the tests in the CI in a headless environment I am using `testem` as an extra dependency, just because I couldn't figure out how to use Browsersync for that. Let me know if you know how. Always happy to reduce dependencies (there is Karma too, but for every browser it needs you to install an extra dependency so I am not using it for now).


## Installing

You need to have node/npm installed. Clone this repository and install dependencies:

```sh
git clone https://github.com/octopusinvitro/html5-scafold
cd html5-scafold
npm install
```

## Running

### Run all tasks

```sh
npm start
```

And go to [http://localhost:4000](http://localhost:4000) in a browser.

This will run all the tasks:
* `cache`: add a cache buster to css and js files,
* `css`: compile sass files, then concatenate and minify them,
* `files`: copy site files to the `site` folder,
* `html`: watch for changes in `index.html` and copy to site,
* `img`: used to perform image optimizations, but I need to find a better module,
* `js`: concatenate all javascript files and minify them,
* `vendor`: copy the `app/js/vendor` folder to t`site/js/vendor` folder,
* `watch`: everytime there is a change to the asset files, their tasks will be run and the browser will be reloaded,
* `server`: launch the server. A `/tests` path was added to run the tests.

You can also compile assets independently with:

```sh
npm run assets
```

## Testing

### In the browser

Open [http://localhost:4000/tests](http://localhost:4000/tests) file in a browser.


### In the terminal (CI)

To run the tests in the Gitlab CI, you have to install Chrome and Firefox, then run `testem ci` through:

```sh
npm test
```

A basic `testem.json` file is provided with this repo:

```sh
npm test
ok 1 Firefox 98.0 - [undefined ms] - Example works
ok 2 Chrome 99.0 - [undefined ms] - Example works

1..2
# tests 2
# pass  2
# skip  0
# todo  0
# fail  0

# ok
```


## License

[![License](https://img.shields.io/badge/html5-license-green.svg?style=flat)](LICENSE.txt)
HTML5 Boilerplate License
