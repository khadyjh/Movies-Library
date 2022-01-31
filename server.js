'use strict';

const express=require('express');
const cors=require('cors');
const jsonData=require('./Movie Data/data.json')
const server=express();
server.use(cors());

function Spider(title,poster_path,overview){
    this.title=title;
    this.poster_path=poster_path;
    this.overview=overview;

}

server.get('/',handelHomePage);
server.get('/favorite',handelFavoritePage);
server.get('/*',handelUserE);
server.get('/*',handelServerE);
server.get('/local',handelE)

function handelHomePage(req,res){
   let spiderObj=new Spider(jsonData.title,jsonData.poster_path,jsonData.overview);
   res.status(200).json(spiderObj);

}

function handelFavoritePage(req,res){
    res.status(200).send("Welcome to Favorite Page");

}

function handelUserE(req,res){
    res.status(400).send("wrong url");

}
function handelServerE(req,res) {
    res.status(500).send("server Errore");
}

function handelE(){

}


server.listen(3000,()=>{
    console.log("my server working");
})

// i can hear you 
// yse i dont now why 
// about handelin error do we need to write it as json ?
// yse 
// it is correct in the broser 
// thank you 
// thats it yse about dr
// yes 
// yes 
// ok 
// about previos 
// y