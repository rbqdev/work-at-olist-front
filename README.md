# Work at Olist Frontend &middot; [![npm](https://img.shields.io/npm/v/npm.svg?style=flat-square)](https://www.npmjs.com/package/npm) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/your/your-project/blob/master/LICENSE)

This project is an Olist frontend test. With the objective of create an account screen, with Name, Email, Password and Confirmation of Password with pure JS.

## Installing / Getting started

A quick introduction of the minimal setup you need to running this project.

```shell
git clone https://gitlab.com/rbq.dev/work-at-olist-front.git
cd yourproject
npm install
npm run server
```

Here what should say what actually happens when you execute `npm run server`. And after this will open tab on your browser
```shell
｢wds｣: Project is running at http://localhost:8080/
```

## Developing

### Built With
This project was building with HTML, CSS, Vanilla JS(ES6) and Web Components.

### Prerequisites
You need of NPM installed in your machine to running this project.

### Deploying / Publishing
To build the project in production mode, you need only run the following comand

```shell
npm run build
```
Or you can build in development mode
```shell
npm run start
```
You also can use `watch` to re-build always you change something in development mode
```shell
npm run watch
```

### How use the components of project?
This project use web components how custom inputs, you can create any instances of component inside a form tag, just call the following HTML commands in your code:

HTML Component | Description | Params / Attributes
-------------- | ----------- | -------------------
`<input-component />` | Custom `<input />` tag with validation and error classes | `label`, `type`, `name`( name also is ID ), `value`, `required` )
`<password-component />` | Custom tag's password. This component contains two password's inputs and a div to measure the strength of the password  | `label`
`<submit-component />` | Custom `<button></button>` tag with validation and error classes | `label`, `disabled` )

Calling a component:
```
<input-component label="Input Test" type="text" name="input-test" required></input-component>
```

You can change some component's border colors of validation, error and submit background with simple css using a custom variable of a outside css file or style. Like this:

```
input-component {
    --color-valid: green;
    --color-error: red;
}
```

Custom Class | Description | Default
------------ | ----------- | -------
--color-valid | Color Border `Valid` of Input Component | #00d598
--color-error | Color Border `Error` of Input Component | #f9967f
--submit-bg | Background color of Submit component  | #00d598

## Demo
You can see a demo of this project: [Link Here](https://glacial-gorge-64557.herokuapp.com/)

## Tests
Use Mocha and Chai to make tests. You can run the follow comand to check:

```shell
npm run test
```

## Style guide

Project written using [Style Guide of Airbnb](bhttps://github.com/airbnb/javascript). To check run:

```shel
npm run lint
```

## Api Reference

This project use [MockApi](https://www.mockapi.io/) for save users.  You can see users here [Users's endpoint Link](https://5b9701e429cbd70014a8fd28.mockapi.io/api/user)
