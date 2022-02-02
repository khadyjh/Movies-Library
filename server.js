'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jsonData = require('./Movie Data/data.json');
const { default: axios } = require('axios');
const server = express();
server.use(cors());

function Spider(title, poster_path, overview) {
    this.title = title;
    this.poster_path = poster_path;
    this.overview = overview;

}

function Movis(id, title, release_date, poster_path, overview) {
    this.id = id;
    this.title = title;
    this.release_date = release_date;
    this.poster_path = poster_path;
    this.overview = overview;

}

server.get('/', handelHomePage);
server.get('/favorite', handelFavoritePage);
server.get('/trending', handelMoviApi);
server.get('/search', handelSearchApi)
server.get('/language', handelLangApi)
server.get('/append', handelAppendApi)

server.get('/*', handelUserE);

// server.get('/*',handelServerE);
// server.get('/local',handelE)
server.use(handelE);


let querySearch = "man";
let language = "pt-BR";
let append = 'videos';
let url = `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.APIKEY}`;

function handelHomePage(req, res) {
    let spiderObj = new Spider(jsonData.title, jsonData.poster_path, jsonData.overview);
    res.status(200).json(spiderObj);

}

function handelFavoritePage(req, res) {
    res.status(200).send("Welcome to Favorite Page");

}

function handelMoviApi(req, res) {

    axios.get(url).then(result => {
        //    console.log(result.data.results)
        let movisData = result.data.results.map(movi => {
            return new Movis(movi.id, movi.title, movi.release_date, movi.poster_path, movi.overview)
        })
        res.status(200).json(movisData);
    }).catch(err => {
        handelE(err, req, res);
    });


}
function handelLangApi(req, res) {

    let newUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.APIKEY}&language=${language}&query=${querySearch}&page=2`;

    axios.get(newUrl).then(result => {
        //    console.log(result.data.results)
        let movisData = result.data.results.map(movi => {
            return new Movis(movi.id, movi.title, movi.release_date, movi.poster_path, movi.overview)
        })
        res.status(200).json(movisData);
    }).catch(err => {
        handelE(err, req, res);
    });

}

// function handelServerE(req,res) {
//     res.status(500).send("server Errore");
// }

function handelSearchApi(req, res) {
    let newUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.APIKEY}&language=en-US&query=${querySearch}&page=2`;

    axios.get(newUrl).then(result => {
        //    console.log(result.data.results)
        let movisData = result.data.results.map(movi => {
            return new Movis(movi.id, movi.title, movi.release_date, movi.poster_path, movi.overview)
        })
        res.status(200).json(movisData);
    }).catch(err => {
        handelE(err, req, res);
    });

}


function handelAppendApi(req, res) {
    // let newUrl1=`https://api.themoviedb.org/3/movie/157336?api_key=${process.env.APIKEY}&append_to_response=videos,images`;
    let newUrl1 = `https://api.themoviedb.org/3/movie/157336?api_key=${process.env.APIKEY}&append_to_response=videos,images`;
    axios.get(newUrl1).then(result => {
        //    console.log(result.data.results)
        let movisData = result.data.results.map(movi => {
            return new Movis(movi.id, movi.title, movi.release_date, movi.poster_path, movi.overview)
        })
        res.status(200).json(movisData);
    }).catch(err => {
        handelE(err, req, res);
    });

}
function handelE(error, req, res) {
    let errObj = {
        status: 500,
        message: error,
    }

    res.status(500).send(errObj);
}


function handelUserE(req, res) {
    res.status(400).send("wrong url");

}


server.listen(3001, () => {
    console.log("my server working");
})

