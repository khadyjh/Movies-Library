'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jsonData = require('./Movie Data/data.json');
const { default: axios } = require('axios');
let pg = require('pg');

const client = new pg.Client(process.env.DATABASE_URL)

const server = express();
server.use(cors());
server.use(express.json());

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
server.get('/search', handelSearchApi);
server.get('/language', handelLangApi);
server.get('/append', handelAppendApi);

// server.post('/addMovie', movieHandel);

server.post('/addMovie',handell);
server.get('/getMovies',handelAdded)

server.put('/updateamovi/:id',updateHandel);
server.delete('/deleteMovi/:id',deleteMH)

server.get('/getOneM/:id',getOneMHandel)

server.get('/*', handelUserE);


// server.get('/*',handelServerE);
// server.get('/local',handelE)
server.use(handelE);

let port = process.env.PORT;
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
    let newUrl1 = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.APIKEY}&sort_by=popularity.asc`;

    axios.get(newUrl1).then(result => {

        let movisData = result.data.results.map(movi => {
            return new Movis(movi.id, movi.title, movi.release_date, movi.poster_path, movi.overview)
        })
        res.status(200).json(movisData);
    }).catch(err => {
        handelE(err, req, res);
    });

}


// function movieHandel(req, res) {
//     console.log(req.body);
//     const mov=req.body;
//     let sql=`INSERT INTO movie (title,release_date,poster_path,overview) VALUES ($1,$2,$3,$4) RETURNING *; `
//     let values=[mov.title,mov.release_date,mov.poster_path,mov.overview];
//     client.query(sql,values).then(data =>
//         {
//             // res.status(200).json(data);
//             res.send(data)
//         })
// }

function handell(req,res){
    console.log(req.body);
    let sql1=`INSERT INTO movie (title,release_date,poster_path,overview) VALUES ($1,$2,$3,$4) RETURNING *;`
    let values1=[req.body.title || " ",req.body.release_date || " ",req.body.poster_path || " ",req.body.overview || " "];
    client.query(sql1,values1).then((data)=>
    {
        res.json(data.rows);
    })
}

function handelAdded(req,res){
    let sql1=`SELECT * FROM movie;`
    client.query(sql1).then(data =>{
        res.json(data.rows);
    })
}

function updateHandel(req,res){
   // console.log(req.params.id) 
    // console.log(req.body.rows)
    let id=req.params.id;
    let sql=`UPDATE movie SET title=$1 ,release_date=$2, poster_path=$3, overview=$4 WHERE id=$5 RETURNING * ;`
    let values=[req.body.title, req.body.release_date , req.body.poster_path , req.body.overview , id];
    client.query(sql,values).then((data)=>{
        // console.log(data)
      res.status(200).json(data.rows);
    })


    
}

function deleteMH(req,res){
    let id=req.params.id;
    let sql=`DELETE FROM movie WHERE id=${id};`
    client.query(sql).then(()=>{
        res.status(200).send("the data deleted")
    })
}

function getOneMHandel(req,res){
    let id=req.params.id;
    let sql1=`SELECT * FROM movie WHERE id=${id} ;`
    client.query(sql1).then(data =>{
        res.json(data.rows);
    })
}


function handelUserE(req, res) {
    res.status(400).send("wrong url");

}

function handelE(error, req, res) {
    let errObj = {
        status: 500,
        message: error,
    }

    res.status(500).send(errObj);
}

client.connect().then(() => {
    server.listen(port, () => {
        console.log("my server working");
    })
})



// CREATE DATABASE movie;