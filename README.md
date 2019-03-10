# toyrobot
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

This is the directory/file structure once you have checked out from the git repository.
```shell
├── Dockerfile
├── LICENSE
├── Makefile
├── README.md
├── docs
│   ├── assets
│   ├── classes
│   ├── enums
│   ├── globals.html
│   ├── index.html
│   ├── interfaces
│   └── modules
├── package.json
├── src
│   ├── conf.json
│   ├── commander.ts
│   ├── main.ts
│   ├── robot.ts
│   └── table.ts
├── test
│   ├── commander-test.spec.ts
│   ├── robot-test.spec.ts
│   └── table-test.spec.ts
├── toyRobot.iml
├── tsconfig.json
├── tslint.json
└── yarn.lock
```

Assuming you have complete the prerequisites (Node.js v6 and install `yarn` as package manager), you can start the application by the commands below.
This will run the full build cycle:
- Resolve package dependencies with yarn
- Clean dist/ doc/
- Linter, syntax check on all .ts files
- Execute test with mocha (pre-compilation)
- Compile Typescript files to Javascript files to dist/ with tsc
- Generate Documentation from sourceCode using [typeDoc](https://typedoc.org/) 
- Start the application toyRobot

```shell
$ yarn
$ yarn prod
```

**For development**, run the following commands in separate shells.

```shell
$ yarn dev
```
- Resolve package dependencies with yarn
- Clean dist/ doc/
- Linter, syntax check on all .ts files
- Execute test with mocha (pre-compilation)
- Start the application but using ts-node an executable, allow running TypeScript files (*.ts) without first compiling it to plain JavaScript.

## Alternative

Running the application in a docker container, provided you have installed docker.
- [docker](https://www.docker.com/get-started)

Docker containers wrap up software and its dependencies into a single unit that includes everything it needs to run. This guarantees the application will always run the same and makes collaboration as simple as sharing a container image.

Use the following command to build container from source
``` shell
# To pull the image from Docker Hub
docker pull ${IMAGE}:latest

# To build the image, replace ${IMAGE} with the desired name 
docker build . -t ${IMAGE}:latest

# To run the image in a container, starts the application
docker run --rm -it ${IMAGE} /bin/ash
```

I am lazy, and I can easily forgot all the build commands. Make, is a great Unix tool that simplifies building programs when they are composed from many files, or building many programs simultaneously. 

### Use of Make

```
From Wiki
A makefile is a special file, containing shell commands, that you create and name makefile (or Makefile depending upon the system). While in the directory containing this makefile, you will type make and the commands in the makefile will be executed
```

Using make, the command to build and run docker container is simplified to
``` shell
# To pull the image from Docker Hub
make docker-pull 

# To build the image from local directory
make docker-build

# To run the image in a container, starts the application
make docker-run

# Output
toyRobot Running!
Valid commands: PLACE X,Y,F (Direction: NORTH, EAST, SOUTH, WEST) or LEFT or RIGHT or MOVE or REPORT.
```



## Ideal development environment

I have been using [VScode](https://code.visualstudio.com/download) from Microsoft for this project. I have included the VScode project configuration in the repository, it is stored under `.vscode.` You will find task originate from npm scripts stored in `package.json`. 


### Install packages

Globals
```
$ yarn global add tslint typescript typedoc mocha gulp-cli
```

# Application Instructions
toyRobot is a CLI Application that reads commands from command line stdin of the following form:
```shell
PLACE X,Y,FACE
MOVE
LEFT
RIGHT
REPORT
```
-	PLACE will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST
-	The origin (0,0) is considered to be the SOUTH WEST most corner on the table
-	The first valid command to the robot is a PLACE command, after that, any sequence of commands may be issued, in any order, including another PLACE command
-	The application will discard all commands in the sequence until a valid PLACE command has been executed
-	MOVE will move the toy robot 1 unit forward in the direction it is currently facing
-	LEFT and RIGHT will rotate the robot 90 degrees in the specified direction without changing the position of the robot
-	REPORT will announce the X,Y and F of the robot. This can be in any form, but standard output is sufficient
-	Input is only standard input as MVP, will include reading text file in future releases.

## Run Example
```shell
$ echo Compile TypeScript to JS && tsc --pretty && yarn run doc
Compile TypeScript to JS
$ typedoc

Using TypeScript 3.2.4 from /Users/ctsang201/code/mystuff/toyRobot/node_modules/typedoc/node_modules/typescript/lib
Rendering [========================================] 100%

Documentation generated at /Users/ctsang201/code/mystuff/toyRobot/docs

✨  Done in 11.78s.
yarn run v1.13.0
$ node ./dist/main
toyRobot Running!
Valid commands: PLACE X,Y,F (Direction: NORTH, EAST, SOUTH, WEST) or LEFT or RIGHT or MOVE or REPORT.
> PLACE 0,0,NORTH
> MOVE
> REPORT
0, 1, NORTH
> PLACE 0,0,NORTH
> LEFT
> REPORT
0, 0, WEST
> PLACE 1,2,EAST
> MOVE
> MOVE
> LEFT
> MOVE
> REPORT
3, 3, NORTH
> 
```

# Application Constraints
-	The toy robot must not fall off the table during movement. This also includes the initial placement of the toy robot
-	Any move that would cause the robot to fall must be ignored
 




