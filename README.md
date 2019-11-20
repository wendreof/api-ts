# API-TS

[![Twitter](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2Fwendreolf)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2Fwendreof%2Fapi-ts%2F)
[![GitHub issues](https://img.shields.io/github/issues/wendreof/api-ts)](https://github.com/wendreof/api-ts/issues)
[![GitHub forks](https://img.shields.io/github/forks/wendreof/api-ts)](https://github.com/wendreof/api-ts/network)
[![GitHub stars](https://img.shields.io/github/stars/wendreof/api-ts)](https://github.com/wendreof/api-ts/stargazers)
[![GitHub last commit](https://img.shields.io/github/last-commit/wendreof/api-ts)](https://github.com/wendreof/api-ts/commits/master)

-------
<p align="center">
    <a href="#motivation">Motivation</a> &bull;
    <a href="#installation">Installation</a> &bull;
    <a href="#running">Running</a> &bull;
     <a href="#routes">Routes</a> &bull;
    <a href="#license">License</a> 
</p>

## Motivation
This project is a REST API made in TypeScript (JavaScript superset) with Docker containers, Redis to caching and MongoDB as database.

## Installation

- Clonning the repository

`git clone wendreof/api-ts`

Get Docker on https://www.docker.com/ to run the following steps.

- Turning up

`docker run -d -p 27017:27017 -p 28017:28017 -e AUTH=no tutum/mongodb`

`docker run -d -p 6379:6379 redis`

`docker exec -it redis redis-cli`
 
`docker build .`

## Running

- Starting commands

`npm run compile`

`npm start`

- The server is running on port 3050, available on browser and will return the API's version:
<p align="left">
 <img src="uploads/shot1.png" width="500"/>
</p>

## Routes

- GET/POST

`localhost:3050/api/v1/news`

- DELETE

`localhost:3050/api/v1/news/IDHASHHERE`

- PUT

`localhost:3050/api/v1/news/IDHASHHERE`


## License
This project is licensed under the terms of the MIT license. See the LICENSE file.
