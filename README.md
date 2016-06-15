[![Build status](https://gitlab.com/octopusinvitro/html5-scafold/badges/master/pipeline.svg)](https://gitlab.com/octopusinvitro/html5-scafold/commits/master)
[![Depfu](https://badges.depfu.com/badges/82fd3b4fc953e9a39088b0820d983573/overview.svg)](https://depfu.com/github/octopusinvitro/html5-scafold?project_id=12256)
[![Maintainability](https://api.codeclimate.com/v1/badges/2a11d7b252c4d00fee25/maintainability)](https://codeclimate.com/github/octopusinvitro/html5-scafold/maintainability)


# Readme

I use this project as a base skeleton or a starting point for a web project. **This is my personal preference of a configuration** but it is easy to adapt.

It's based on the HTML5 boilerplate project, the normalize stylesheet and the Jasmine framework. It uses [Gulp](http://gulpjs.com/) as a task manager and [Browsersync](https://www.browsersync.io/) to run the site and tests (they have [a nice guide for Gulp here](https://www.browsersync.io/docs/gulp/).

Travis stopped being free for open source projects so a GitLab CI configuration is provided. [Test'em](https://github.com/testem/testem) and [PhantomJS](http://phantomjs.org/) are configured to run tests in their servers.

- Update badges with your user and repo names.

- Explain your project here.


## Setup

Use the last files on the [HTML5 Boilerplate dist folder](https://github.com/h5bp/html5-boilerplate/tree/main/dist), download the last release from the [Jasmine releases page](https://github.com/jasmine/jasmine/releases) and also download the last [Normalize stylesheet](http://necolas.github.io/normalize.css/).

From the Jasmine releases extract the `lib` folder and the spec runner from the zip file, and place both under the `js` folder. As new JavaScript classes are added to the project, add them and their tests to the spec runner.

Also add the new JavaScript files created for the project to the `gulpfile.js` in the right order, and to the `eslintrc.json` file. There is no need for the lint task in the `gulpfile.js`, but ESLint may still be needed for editor linter plugins. The `babel-eslint` module is needed as a parser to use with `gulp-eslint`.


## Installing

### Requirements

You need to have node/npm installed. Clone this repository and install dependencies:

```sh
$ git clone <URL>
$ cd repo
$ npm install
```

## Running

### Run all tasks

```sh
$ npm start
```

And go to [http://localhost:4000](http://localhost:4000) in a browser.

This will run all the tasks:
* `scss`: compile sass files, then concatenate and minify them,
* `js`: concatenate all javascript files and minify them,
* `img`: perform image optimizations,
* `files`: copy site files to the `site` folder,
* `vendor`: copy the vendor folder to t`site` folder,
* `watch`: everytime there is a change to the asset files, their tasks will be run and the browser will be refreshed.
* `server`: launch the server. A `/tests` path was added to run the tests.


## Testing

### In the browser

Open [http://localhost:4000/tests](http://localhost:4000/tests) file in a browser.


### In the terminal

To run the tests in the terminal (or in the CI of your choice), you have to install PhantomJS (a headless browser) and Test'em:

#### Install PhantomJS

For example, for version 2.1.1 on a Linux 64bit machine:

```sh
sudo apt install phantomjs
```

If that doesn't work, you could try:

```sh
$ PHANTOM_JS=phantomjs-2.1.1-linux-x86_64
$ mkdir ~/tmp
$ pushd ~/tmp
$ wget https://bitbucket.org/ariya/phantomjs/downloads/$PHANTOM_JS.tar.bz2
$ tar xvf $PHANTOM_JS.tar.bz2
$ mv $PHANTOM_JS phantomjs
$ ln -s ~/tmp/phantomjs/bin/phantomjs /usr/bin/phantomjs
$ rm -r $PHANTOM_JS.tar.bz2
$ phantomjs --version
$ popd
```

Test the installation

```sh
$ phantomjs
phantomjs>
```

Type `Ctrl` + `d` or `phantom.exit();` to leave the PhantomJS prompt.

#### Install Testem:

```sh
$ npm install testem -g
```

A basic `testem.json` file is provided with this repo:

```json
{
  "framework": "jasmine2",
  "src_files": [
    "js/src/example.js",
    "js/spec/example-spec.js"
  ]
}
```

List your JS source files followed by your JS test files inside `"src_files"`. Then, test the installation:

```sh
$ testem ci
ok 1 Firefox 75.0 - [undefined ms] - Example works
ok 2 PhantomJS 2.1 - [undefined ms] - Example works
ok 3 Chrome 81.0 - [undefined ms] - Example works
ok 4 Chrome 81.0 - [undefined ms] - Example works

1..4
# tests 4
# pass  4
# skip  0
# todo  0
# fail  0

# ok
```


## License

[![License](https://img.shields.io/badge/gnu-license-green.svg?style=flat)](https://opensource.org/licenses/GPL-2.0)
GNU License
