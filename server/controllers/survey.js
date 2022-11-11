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
 * File name:     survey.js
 * Description:   Controllers for survey page - enables add survey, edit, delete, take and view
*/

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//Create a reference to the model
let Survey = require('../models/survey');
let CompletedSurvey = require('../models/completedSurvey');

module.exports.displaySurveyList = (req, res, next) => { 
    Survey.find((err, surveyList) => { 
        if (err) {
            return console.error(err); 
        } else {
            res.render('survey/list', {
                title: 'Surveys',
                SurveyList: surveyList,
            }); 
        }
    }).sort({
        name: 1
    }); 
};

module.exports.displayAddPage = (req, res, next) => {
    res.render('survey/add', {
        title: 'Add Survey',
    })
}

module.exports.processAddPage = (req, res, next) => {
    //Create newSurvey object
    let newSurvey = Survey({
        "title": req.body.title,
        "q1": req.body.q1,
        "q1Opt1": req.body.q1Opt1,
        "q1Opt2": req.body.q1Opt2,
        "q1Opt3": req.body.q1Opt3,
        "q1Opt4": req.body.q1Opt4,
    });

    Survey.create(newSurvey, (err, Survey) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            //Refresh the survey list
            res.redirect('/survey-list');
        }
    });
}

module.exports.displayEditSurveyPage = (req, res, next) => {
    let id = req.params.id;

    Survey.findById(id, (err, surveyToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            //Show the edit view
            res.render('survey/edit', {
                title: 'Edit Survey',
                survey: surveyToEdit,
            })
        }
    });
}

module.exports.processEditSurveyPage = (req, res, next) => {
    let id = req.params.id;

    let updatedSurvey = Survey({
        "_id": id,
        "title": req.body.title,
        "q1": req.body.q1,
        "q1Opt1": req.body.q1Opt1,
        "q1Opt2": req.body.q1Opt2,
        "q1Opt3": req.body.q1Opt3,
        "q1Opt4": req.body.q1Opt4,
    });

    //Search for _id
    Survey.updateOne({
        _id: id
    }, updatedSurvey, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/survey-list');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Survey.remove({
        _id: id
    }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/survey-list');
        }
    });
}


module.exports.displayTakeSurveyPage = (req, res, next) => {
    let id = req.params.id;

    Survey.findById(id, (err, surveyToTake) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            //Show the edit view
            res.render('survey/takeSurvey', {
                title: 'Take Survey',
                survey: surveyToTake,
            })
        }
    });
}

module.exports.processTakeSurveyPage = (req, res, next) => {

    let newCompletedSurvey = CompletedSurvey({
        "title": req.body.title,
        "userName": req.body.userName,
        "answer": req.body.optQ1,
    });

    CompletedSurvey.create(newCompletedSurvey, (err, CompletedSurvey) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            //Refresh the survey list
            res.redirect('/survey-list');
        }
    });
}
