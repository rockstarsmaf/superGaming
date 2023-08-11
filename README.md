# Super Gaming

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.1.
# Description
1) Upon successful login, you will be directed to the units page, where a comprehensive display of available cards is presented.
2) Hovering over any card triggers a dynamic flip effect, while clicking on the "View Card" option opens up the specific card details seamlessly.
3) Within the unitDetails page, initiating edits to any data and subsequently updating the API involves clicking the designated "Edit" button, thereby prompting a user-friendly pop-up. This interface allows users to precisely select the data they intend to modify.
4) Upon completing your tasks on the unitDetails page, simply close it to be automatically rerouted to the units page. For those interested in gaining visual insights, the "Sales" button serves as your gateway.
5) The primary chart features a date range selection—simply choose your desired starting and ending dates, followed by an "Update" click. This chart exhibits both quantity and sales metrics between the specified dates.
6) The secondary chart focuses on daily data for each month, showcasing trends and patterns on a day-to-day basis.
7) When your session concludes, the logout button awaits your command, promptly ushering you back to the login page for a smooth transition.
8) The implementation of authGuard ensures that users are only able to navigate to specific routes if they possess the necessary authentication credentials. This security measure prevents unauthorized access to restricted areas of the application.

## Move to superGame folder

Once the repository is cloned, in the powershell `cd superGame`

## Install node_modules

Run `npm i` and the node modules file will be installed.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
