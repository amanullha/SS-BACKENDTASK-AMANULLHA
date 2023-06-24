# SS-BACKENDTASK-AMANULLHA


## Set up the environment by using NPM for run locally

1. Clone the GitHub repository from the given github link
2. Create a `.env` file in the project
3. Add given `.env` values to the `.env` file to the project
4. Install Docker in your system
5. Create a docker-compose.yml file in your pc at any folder
6. Add given dynamoDB docker-compose code to docker-compose.yml file
7. Open terminal inside the root directory
8. Then run this command `npm install --save`
9.  After installation is done, run `npm start` or `npm start:dev`

### Set up the environment by Docker Image

1. Install Docker in your system
2. Clone the GitHub repository from the given github link
3. Create a `.env` file in the project
3. Add given `.env` values to the `.env` file to the project
4. Open terminal inside the root directory
5. Run this command `docker build -t ss-backend-img .`
6. After executing previous command, run this `docker run my-nest-app ss-backend-img`
7. If port is not working , then run `docker run --publish 3000:3000 ss-backend-img`
   
This command will start the Docker container with the Nest.js application and DynamoDB service running inside. The application will be accessible on port 3000.

# Test the application: 
Open a web browser and access http://localhost:3000 to test your Nest.js application running within the Docker container. Make sure everything is working as expected.


## Resources
### .env
`
  APP_PORT=3005

  #  aws configuration
  AWS_ACCESS_KEY_ID=abcd
  AWS_SECRET_ACCESS_KEY=abcd
  AWS_REGION=us-east-1
  AWS_IS_DB_LOCAL=true
  # server type
  SERVER_TYPE=test_
  # Tokens
    JWT_COOKIE_EXPIRES_IN=1
    ACCESS_TOKEN_VALIDITY=1d
    REFRESH_TOKEN_VALIDITY=2d
    JWT_SECRET=c2bffd90e623eb87809ee81c18fe361479ab92c264b23c75620538b2b0f724c2

`

## Getting Started
Access project POST MAN file: `https://documenter.getpostman.com/view/22890389/2s93z5AQUH#intro`


## User Module:
1. <strong style="color:#FFb400">POST</strong> create user

    

    Create a normal user with necessary information
    `http://127.0.0.1:3005/user/create`

  ```
    
    body
    --------------------------------------
        {
          "name":"jon walker",
          "email":"1normaluser5@gmail.com",
          "password":"P@ss12345",
          "phone":"01988"
        }
    response
    --------------------------------------
        {
          "id": "6f4bd652-cda5-4909-85ad-3434da63fc6c",
          "name": "jon walker",
          "email": "151g54dnormaluser5@gmail.com",
          "image": "",
          "status": "ACTIVE"
        }
  ```
2. <strong style="color:#FFb400">POST</strong> create Admin

    

    Create a Admin necessary information
    
    `http://127.0.0.1:3005/user/create-admin`

  ```
    
    body
    --------------------------------------
        {
          "name":"jon walker",
          "email":"1normaluser5@gmail.com",
          "password":"P@ss12345",
          "phone":"01988"
        }
    response
    --------------------------------------
        {
          "id": "6f4bd652-cda5-4909-85ad-3434da63fc6c",
          "name": "jon walker",
          "email": "151g54dnormaluser5@gmail.com",
          "image": "",
          "status": "ACTIVE"
        }
  ```
3. <strong style="color:#FFb400">POST</strong> Login

    

   Login with email and password with type is email.
    
    `localost:3005/user/login`

  ```
    
    body
    --------------------------------------
        {
          "email":"1normaluser5@gmail.com",
          "password":"P@ss12345",
        }
    response
    --------------------------------------
        {
          "id": "36726d16-7116-4507-bf6b-1ac93f44ec07",
          "name": "Netflix Demo",
          "email": "admin0004@gmail.com",
          "image": "image_link",
          "status": "ACTIVE"
        }
  
  
  ```
  <span style="color:red">Note: </span>Token will set to the cookies

4. <strong style="color:green">GET</strong> get a user

    

    This route is role-based, specifically designed for retrieving a user by userId. Only users with the 'Admin' role have the privilege to access and retrieve a user information.

    `localost:3005/user/userId`

  ```
    response
    --------------------------------------
        {
          "image": "",
          "createdAt": "2023-06-22T18:18:14.760Z",
          "phone": "01988",
          "isVerified": false,
          "name": "jon walker",
          "id": "6f4bd652-cda5-4909-85ad-3434da63fc6c",
          "userType": "CUSTOMER",
          "email": "151g54dnormaluser5@gmail.com",
          "verificationCode": "",
          "status": "ACTIVE",
          "updatedAt": "2023-06-22T18:18:14.760Z"
        }
  ```
5. <strong style="color:green">GET</strong> get users

    

    This route is role-based, specifically designed for retrieving a user by their userId. Only users with the 'Admin' role have the privilege to access and retrieve user information.

    `localost:3005/user`

  ```
    response
    --------------------------------------
        {
          "image": "",
          "createdAt": "2023-06-22T18:18:14.760Z",
          "phone": "01988",
          "isVerified": false,
          "name": "jon walker",
          "id": "6f4bd652-cda5-4909-85ad-3434da63fc6c",
          "userType": "CUSTOMER",
          "email": "151g54dnormaluser5@gmail.com",
          "verificationCode": "",
          "status": "ACTIVE",
          "updatedAt": "2023-06-22T18:18:14.760Z"
        }
  ```



## Filmmaker Module:
1. <strong style="color:#FFb400">POST</strong> register a filmmaker

    

    This route is a role-based route, specifically designed for creating filmmaker profiles by users who have the admin role



    `localost:3005/filmmakers`

  ```
    
    body
    --------------------------------------
        {
          "name": "Jhon deo",
          "role": "DIRECTOR",
        }
    response
    --------------------------------------
        {
          "id": "0ef5f144-4dc2-4db3-9cf6-4f529700c236",
          "name": "Jhon deo",
          "role": "DIRECTOR",
          "createdAt": 1687459936751,
          "updatedAt": 1687459936751
        }
  ```
2. <strong style="color:green">GET</strong> get a filmmaker

    

    This route is a role-based route, specifically designed for get the filmmaker profiles by users who have the admin role



    `localost:3005/filmmakers/filmmakerId`

  ```
    
    response
    --------------------------------------
        {
          "id": "0ef5f144-4dc2-4db3-9cf6-4f529700c236",
          "name": "Jhon deo",
          "role": "DIRECTOR",
          "createdAt": 1687459936751,
          "updatedAt": 1687459936751
        }
  ```



## Media(Movies/TV_Show) Module:
1. <strong style="color:#FFb400">POST</strong> Create New Movie/TV show

    

This route is a role-based route, specifically designed for creating Movie/TV Show by users who have the admin role

    `http://127.0.0.1:3005/media`

  ```
    
    body
    --------------------------------------
       {
          "title": "PACHUVUM ATHBUTHA VILAKKUM 2",
          "imageUrl": "https://assets.voxcinemas.com/posters/P_HO00010200.jpg",
          "actorIds": [],
          "mediaType": "TV_SHOW",
          "episode": 1
        }
    response
    --------------------------------------
        {
          "id": "e4206f23-a7d3-4023-aa85-74051ecfc71b",
          "title": "PACHUVUM ATHBUTHA VILAKKUM 2",
          "imageUrl": "https://assets.voxcinemas.com/posters/P_HO00010200.jpg",
          "description": "",
          "releaseDate": "",
          "genre": "Action",
          "mediaType": "TV_SHOW",
          "episode": 1,
          "duration": 120,
          "language": "English",
          "filmmakerIds": [],
          "awards": [],
          "trailerUrl": "",
          "productionCompany": "",
          "country": "Bangladesh",
          "streamingPlatform": "YouTube",
          "createdAt": 1687459887588,
          "updatedAt": 1687459887588
}
  ```
2. <strong style="color:blue">PUT</strong> Update Movie/TV show

    

This route is a role-based route, specifically designed for update the Movie/TV Show by users who have the admin role

<span style="color:red">Note: </span> If the showType is a TV_Show, update the corresponding episode of the TV_Show, otherwise, no update will be
    
    `http://127.0.0.1:3005/media`

  ```
    
    body
    --------------------------------------
       {
          "filmmakerIds":["0ef5f144-4dc2-4db3-9cf6-4f529700c236","6b877111-edac-4b0b-8790-ed2ed70f0eb1"]
       }
    response
    --------------------------------------
      {
        "country": "Bangladesh",
        "releaseDate": "",
        "description": "",
        "episode": 1,
        "language": "English",
        "mediaType": "TV_SHOW",
        "productionCompany": "",
        "title": "PACHUVUM ATHBUTHA VILAKKUM 2",
        "trailerUrl": "",
        "duration": 120,
        "createdAt": "2023-06-22T18:51:27.588Z",
        "filmmakerIds": [
            "0ef5f144-4dc2-4db3-9cf6-4f529700c236",
            "6b877111-edac-4b0b-8790-ed2ed70f0eb1"
          ],
        "awards": [],
        "imageUrl": "https://assets.voxcinemas.com/posters/P_HO00010200.jpg",
        "streamingPlatform": "YouTube",
        "genre": "Action",
        "id": "e4206f23-a7d3-4023-aa85-74051ecfc71b",
        "updatedAt": "2023-06-22T18:52:55.460Z"
      }
  ```

3. <strong style="color:green">Get</strong> Get a Movie/TV show

    

Access a comprehensive collection of movies and TV shows, featuring a curated list of filmmakers, available for users

    
    `http://127.0.0.1:3005/media/mediaId`

  ```
    response
    --------------------------------------
      {
        "country": "Bangladesh",
        "releaseDate": "",
        "description": "",
        "episode": 1,
        "language": "English",
        "mediaType": "TV_SHOW",
        "productionCompany": "",
        "title": "PACHUVUM ATHBUTHA VILAKKUM 2",
        "trailerUrl": "",
        "duration": 120,
        "createdAt": "2023-06-22T18:51:27.588Z",
        "filmmakerIds": [
            "0ef5f144-4dc2-4db3-9cf6-4f529700c236",
            "6b877111-edac-4b0b-8790-ed2ed70f0eb1"
          ],
        "awards": [],
        "imageUrl": "https://assets.voxcinemas.com/posters/P_HO00010200.jpg",
        "streamingPlatform": "YouTube",
        "genre": "Action",
        "id": "e4206f23-a7d3-4023-aa85-74051ecfc71b",
        "updatedAt": "2023-06-22T18:52:55.460Z",
        "filmmakers": [
            {
              "name": "Jhon deo",
              "createdAt": "2023-06-22T18:52:16.751Z",
              "id": "0ef5f144-4dc2-4db3-9cf6-4f529700c236",
              "role": "DIRECTOR",
              "updatedAt": "2023-06-22T18:52:16.751Z"
            },
            {
              "name": "refii",
              "createdAt": "2023-06-22T18:51:59.390Z",
              "id": "6b877111-edac-4b0b-8790-ed2ed70f0eb1",
              "role": "DIRECTOR",
              "updatedAt": "2023-06-22T18:51:59.390Z"
            }
          ]
      }
  ```


4. <strong style="color:green">Get</strong> Get aLL the Movie/TV show

    

Get all the movies or tv show, with filmmaker list, user or gaust can access permission

    
    `http://127.0.0.1:3005/media`

  ```
    response
    --------------------------------------
      {
        "country": "Bangladesh",
        "releaseDate": "",
        "description": "",
        "episode": 1,
        "language": "English",
        "mediaType": "TV_SHOW",
        "productionCompany": "",
        "title": "PACHUVUM ATHBUTHA VILAKKUM 2",
        "trailerUrl": "",
        "duration": 120,
        "createdAt": "2023-06-22T18:51:27.588Z",
        "filmmakerIds": [
            "0ef5f144-4dc2-4db3-9cf6-4f529700c236",
            "6b877111-edac-4b0b-8790-ed2ed70f0eb1"
          ],
        "awards": [],
        "imageUrl": "https://assets.voxcinemas.com/posters/P_HO00010200.jpg",
        "streamingPlatform": "YouTube",
        "genre": "Action",
        "id": "e4206f23-a7d3-4023-aa85-74051ecfc71b",
        "updatedAt": "2023-06-22T18:52:55.460Z",
        "filmmakers": [
            {
              "name": "Jhon deo",
              "createdAt": "2023-06-22T18:52:16.751Z",
              "id": "0ef5f144-4dc2-4db3-9cf6-4f529700c236",
              "role": "DIRECTOR",
              "updatedAt": "2023-06-22T18:52:16.751Z"
            },
            {
              "name": "refii",
              "createdAt": "2023-06-22T18:51:59.390Z",
              "id": "6b877111-edac-4b0b-8790-ed2ed70f0eb1",
              "role": "DIRECTOR",
              "updatedAt": "2023-06-22T18:51:59.390Z"
            }
          ]
      }
  ```




























<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
















## Run Locally  
Clone the project  

~~~bash  
  git clone https://link-to-project
~~~

Go to the project directory  

~~~bash  
  cd my-project
~~~

Install dependencies  

~~~bash  
npm install
~~~

Start the server  

~~~bash  
npm run start
~~~  

























<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
