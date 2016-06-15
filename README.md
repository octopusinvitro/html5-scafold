[![Build Status](https://travis-ci.org/octopusinvitro/html5-scafold.svg?branch=master)](https://travis-ci.org/octopusinvitro/html5-scafold)
[![build status](https://gitlab.com/octopusinvitro/html5-scafold/badges/master/pipeline.svg)](https://gitlab.com/octopusinvitro/html5-scafold/commits/master)
[![Depfu](https://badges.depfu.com/badges/82fd3b4fc953e9a39088b0820d983573/overview.svg)](https://depfu.com/github/octopusinvitro/html5-scafold?project_id=12256)
[![Maintainability](https://api.codeclimate.com/v1/badges/2a11d7b252c4d00fee25/maintainability)](https://codeclimate.com/github/octopusinvitro/html5-scafold/maintainability)


# Readme

You can use this project as a base skeleton or a starting point for a web project. **This is my personal preference of a configuration** but it is easy to change to your favorite tools.

**Remember to:**

- Update badges with your user and repo names.

- Update travis by turning your project repo ON.

- Explain your project here.


## About

This project uses the [HTML5 Boilerplate](https://html5boilerplate.com/), [Gulp](http://gulpjs.com/) for tasks automation and [Jasmine](http://jasmine.github.io/) for JavaScript tests. You can run the site locally at localhost:4000 using [Browsersync](https://www.browsersync.io/). Check [their guide](https://www.browsersync.io/docs/gulp/) out or keep reading.

Also, CI files have been added to be used with Travis and GitLab. To run tests in their servers, [Test'em](https://github.com/testem/testem) and [PhantomJS](http://phantomjs.org/) are configured in these files. It is recommended that you also run them in your local terminal to ensure that both you and the server are on the same page. Please find instructions below.

## Installing

### Requirements

You need to have node/npm installed.

### Download

Clone this repository and install dependencies:

```sh
$ git clone <URL>
$ cd repo
$ npm install
```

## Running

### Run all tasks

```sh
$ gulp
```

This will run all the tasks:
* `scss`: compile sass files, then concatenate and minify them,
* `js`: concatenate all javascript files and minify them,
* `img`: perform image optimizations
* `dist`: regenerate the site,
* `vendor`: copy the vendor folder to the output site
* `watch`: everytime there is a change in `scss`, `js` or `dist` files, those tasks will be run and the browser will be refreshed.
* `server`: launch the server. You can then go to [http://localhost:4000](http://localhost:4000) in a browser. A `/test` path was added to run the tests.

### Run single tasks

You can also run each task separately, for example, to run only the `watch` task:

```sh
$ gulp watch
```

## Testing

### In the browser

Open [http://localhost:4000/test/specrunner.html](http://localhost:4000/test/specrunner.html) file in a browser.


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
