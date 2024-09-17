# Vehicle Monitor App Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.4.

# Project Name

Welcome to the Vehicle Monitor App Frontend repository! This project is designed to provide a simple front-end using Angular and Google Maps API for the Vehicle Monitor App Backend repository.

## Prerequisites

Before running the project, ensure you have the following dependencies installed on your system:

1. **Install Git**
  - Follow the instructions on the [Git website](https://git-scm.com/) to install Git.

2. **Install Node.js**
  - Download and install Node.js from the [Node.js website](https://nodejs.org/). This will also install npm (Node Package Manager).

3. **Install npm**
  - npm should be installed automatically with Node.js. Verify your installation by running:
    ```sh
    node -v
    npm -v
    ```

4. **Create a Google Maps API Key and a Google Maps Map ID**
  - Follow the instructions on the [Google Cloud Console](https://console.cloud.google.com/) to create a Google Maps API key and a Map ID.

5. **Create Configuration File**
  - Create a file at `\src\environments\googleMapsConfig.ts` with the following structure:
    ```typescript
    const googleMapsConfig = {
      apiKey: 'API_KEY',
      mapId: 'MAP_ID'
    };

    export default googleMapsConfig;
    ```
  - Replace `'API_KEY'` and `'MAP_ID'` with your actual Google Maps API key and Map ID.

## Starting the Front-End

To start the front-end of the project, follow these steps:

1. **Clone the Repository**
  - Clone the repository using Git.

2. **Install Dependencies**
  - Install the project dependencies using npm:
    ```sh
    npm install
    ```

3. **Run the Application**
  - Start the front-end application:
    ```sh
    npm run start
    ```

   This command will start the development server, and you can view the application in your web browser at `http://localhost:4200`.

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

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
