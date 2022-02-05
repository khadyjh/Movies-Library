# Movies-Library

# Movies-Library - 02v

**Author Name**: khadyjh AL-abbadi

## WRRC
![wrrc](wrrc01.jfif)

## Overview

## Getting Started
first you need to clone it in your local machine then install the required packages from the terminal using npm command 
then you need to open vs code to start coding by define the installed packages by using require() method 
 -  const express=require('express');
  - const cors=require('cors'); 

   then create server using the express by:
   - const server=express();

   then define the get method to send the data 
   if you want to send data you need to define post method with insert operation 
   if you want to retrieve data you need to define get method with select operation 
   if you want to delete data you need to define delete method with delete operation 
   if you want to select or upadate or delete specific record you should include the id .



when you want to run the server you need to run it from the terminal 
when you want to delete record from table you must include the id with the req 
when you want to update record from table you must include the id with the req and the data with the body of req 


## Project Features
no features yet it just use the get method to send data to the user 
use api to fitch data from it then send it to the browser using async methode like axios
it support inserting retrieving ubdating and deleting from sql database 