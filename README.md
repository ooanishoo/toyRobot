# toyRobot
A toy robot simulator written in Node.js for interview @ ZoneDigital

# How to get things started?

## Prerequisites
Check for node, npm, and npx

- [node](https://nodejs.org/en/), Run ` node --version` in terminal to verify
- npm comes with node
- [yarn](https://yarnpkg.com/en/docs/install#mac-stable)


Alternatively if you are on Mac OSX, you can install these packages using [brew package manager for Mac OSX](https://brew.sh/) 

If you feel you have the need to become a node.js ninja, then you can always go that extra mile and install node with [nvm](https://github.com/creationix/nvm/blob/master/README.md), the Node.js version manager. With this utility application, you can have multiple Node.js versions installed on your system, and switching between them is only a command away. 

## Starting things up

The application's source code is located in `src/` can built using `make`. This will transpile the source code [TypeScript](https://www.typescriptlang.org/docs/home.html) and publish it to `dist`.

Assuming you have complete the prereqisites (Node.js v6 and install `yarn` as package manager), you can start the application by the commands below.

```shell
$ yarn
$ yarn start
```

**For development**, run the following commands in separate shells.

```shell
$ yarn watch
```

```shell
$ yarn watch:launch
```

```shell
$ yarn watch:test
```


Use of Make

I am lazy, and I can easily forgot all the build commands. Make, is a great Unix tool that simplifies building programs when they are composed from many files, or building many programs simultaneously. It is able to determine when source files have changed and rebuild only those components needed for an update.

```
From Wiki
A makefile is a special file, containing shell commands, that you create and name makefile (or Makefile depending upon the system). While in the directory containing this makefile, you will type make and the commands in the makefile will be executed
```

## Ideal development environment

Great scaffolder: https://github.com/ospatil/generator-node-typescript

### Install packages

Globals
```
$ yarn global add tslint typescript gulp
```

