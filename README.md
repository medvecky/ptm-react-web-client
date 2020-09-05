## Description
### Personal Task Management System

app demo: [PTM App](http://http://13.49.0.113/)

React based web client for: 

[Personal Task Management REST API service](https://github.com/medvecky/ptm-server)  

## Env setup

### Prerequisites

* Installed [docker](https://www.docker.com/products/docker-desktop)
* Installed [Node.js](https://nodejs.org) (only for local development)
* started ptm-server, description in documentation:
   [ptm-server/README](https://github.com/medvecky/ptm-server/blob/master/README.md)

### App installation

start client: 
  ```bash
  docker-compose build
  docker-compose up
  ```
by default service operable on 
[http://localhost](http://localhost)

### App installation for local development

#### Modules installation

```bash
$ npm install
```

#### Running the app
```bash
$ npm run start
```

by default service operable on 
[http://localhost:3001](http://localhost:3001)

### App deploy to GitHub Pages

Change homepage property in packages.json to:
 http://xxxxxx.github.io/ptm-react-web-client
 
 where xxxxxx - your github profile name
 
as example: 
 
```
 "homepage": "http://medvecky.github.io/ptm-react-web-client"
```

then run following commands: 

```bash
 npm run build 
 npm run deploy
```

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

##### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
