/*
 * COMP229-015    Group 7
 * Group Project  Part 2 First Release
 * Project Name:  Survey Donkey
 * 
 * Members (name/student ID):
 * Alina Fadeeva – 301249589
 * Nadia Velikaia – 301244426
 * Terence Chu – 301220117
 * Zhihao Yu – 301305633
 * Akash Arora – 300849838
 * Nithiyavany Vijai – 301212774
 * 
 * File name:     index.js
 * Description:   
*/

//Just logic - no routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');


let DB = require('../config/db');

module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {title: 'Home', page: 'home'});
}
