# Image processing API

This API is part of my training on UDACITY, and allows students to understand the development of APIs with ExpressJS.

The purpose of this application is to provide learners with the skills necessary to develop an Express API on a NodeJS environment.

The only functionality of the application is the processing of JPG images through URL

## Getting started

To work with this project, you need to know JavaScript, TypeScript, ExpressJS and NodeJS.

### Configuration for local development

#### Install depencies

This project was made with NodeJs v16.17.0 and npm 8.15.0

To install the dependencies, place yourself in the project folder and run the following command

```bash
npm install
```

#### Script details

- `start:dev` to start local server for development
- `build` to build project
- `lint` to display ESLint issues
- `lint:fix` to automatically fix ESLint issues
- `test` to run project tests

To run the local server, execute:

```bash
npm run start:dev
```

Default URL should be http://127.0.0.1:3000/

### Testing

Tests are not required to run the API. But if you contribute, please run the tests before pushing to GitHub.
To run the tests, execute:

```bash
npm run test
```

### Production

To build for production, execute:

```bash
npm run build
```

The outpout folder is `dist`

## API Reference

### Getting Started

- Base URL: http://127.0.0.1:3000/

#### Endpoints

#### Get health check

```http
  GET /
```

- General: returns home page with a simple description.
- Sample: `http://127.0.0.1:3000`

#### Processing image

```http
  GET /api/images
```

| Parameter  | Type     | Description                       |
| :--------- | :------- | :-------------------------------- |
| `filename` | `string` | **Required**. File name on server |
| `width`    | `string` | **Required**. desired width       |
| `height`   | `string` | **Required**. desired height      |

- General: displays image with width and height provided.
- Sample: `http://127.0.0.1:3000/api/images?filename=encenadaport&width=300&height=400`

## Authors

- [Bakary FOFANA](https://github.com/FOFANA12)

## Acknowledgements

- [Udacity](https://www.udacity.com/)
