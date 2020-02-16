# FFVII Runs Website

## Code organization

The code in this repos is divided into 3 sections:

* `shared` code that lives in `projects/shared`.  The data model, main run 
  logic, and data live here.
* `frontend` code that lives in the repo root.  It is implemented using angular.
  The most interesting bits live in `src/app`.
* `backend` code that lives in `functions`.  The backend is implemented using
  Firebase functions.  All writing to the database is done here.  The front end
  only sees read-only views.


## Development

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

**TODO(konkers)**: Document how to set up firebase emulators and test against those.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Checking code before pushing

Run `ng lint` as well as `npm run fmt:check` before pushing code/sending a pull request.
