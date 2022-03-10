# Image Processing Api

## Scripts
- ``` npm run build ``` to build the .ts files
- ``` npm run start ``` to start the server
- ``` npm run start:prod ```to build and start the server
- ``` npm run lint ``` to run eslint
- ``` npm run lint:fix ``` to fix linting issues
- ``` npm run format ``` to run prettier
- ``` npm run test ``` to run unit tests

## Endpoints
- ``` /api/images?filename={filename}&width={width}&height={height} ``` to resize an image
- ``` / ``` to get hello world message
- http://localhost:3000/api/images?filename=fjord&width=200&height=200 endpoint should return status 200

## Examples
- ``` /api/images?filename=fjord&width=200&height=200 ``` gets you the fjord image in the full folder resized to 200x200
