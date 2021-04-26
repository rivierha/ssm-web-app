# Staging Stack Management Web App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.9.

An Engineering team mostly comprises of multiple Devs and QAs with an average ratio of Dev to QA Engineers being 5:1. Asmultiple teams test out different PRs parallely for release, they need isolated environments to test the pull requests. This app is about managing those isolated environments within the team members effectively. Let’s name those environments as "Instances".

## Get started

### Clone the repo

```shell
git clone https://github.com/rivierha/ssm-web-app.git
cd ssm-web-app
```

### Install npm packages

Install the `npm` packages described in the `package.json` and verify that it works:

```shell
npm install
npm start
```

The `npm start` command builds (compiles TypeScript and copies assets) the application into `dist/`, watches for changes to the source files, and runs `lite-server` on port `3000`.

Shut it down manually with `Ctrl-C`.

#### npm scripts

These are the most useful commands defined in `package.json`:

* `npm start` - runs the TypeScript compiler, asset copier, and a server at the same time, all three in "watch mode".
* `npm run build` - runs the TypeScript compiler and asset copier once.
* `npm run build:watch` - runs the TypeScript compiler and asset copier in "watch mode"; when changes occur to source files, they will be recompiled or copied into `dist/`.
* `npm run lint` - runs `tslint` on the project files.
* `npm run serve` - runs `lite-server`.

These are the test-related scripts:

* `npm test` - builds the application and runs Intern tests (both unit and functional) one time.
* `npm run ci` - cleans, lints, and builds the application and runs Intern tests (both unit and functional) one time.
* 
### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Functionality overview

The application is a staging stack management app. It uses a custom API for all requests, including firebase for authentication. You can view a live demo over at - **
- view the api source code here - https://github.com/rivierha/ssm-api
**General functionality:**

- Authenticate users via Firebase Authentication (login/signup pages + logout button on dahboard page)
- CRU* users (sign up page - no deleting required)
- CRU* teams (teams page - no deleting required)
- CRUD instances
- CR*D instance logs (no updating required)
- GET and display paginated lists of instances and instance logs

**The general page breakdown looks like this:**

- Instances page (URL: /#/instances )
    - List of instances of the team
    - Pagination for list of instances
    - Sort and filter list based on instance name, status, date, time 
    - Delete instance button
- Sign in/Sign up pages (URL: /#/login, /#/signup )
    - Uses Firebase Authentication
    - Authentication can be done using email-password or Google signin
- Teams page (URL: /#/teams )
    - List of teams
    - Add new team
- Create Instance dialog to create instances
- Use Instance dialog to use instances
- Instance logs page (URL: /#/logs/:instance-id)
    - Delete log button
    - List of logs of the instance
    - Pagination for list of instance logs
    - Sort and filter list based on log user, reason, time 


## Code scaffoldin

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
