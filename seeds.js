const mongoose = require('mongoose');

const Comment = require('./models/comments');

mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true })
    .then(() => {
        console.log("Mongo Connection open!!")
    })
    .catch(err => {
        console.log(err)
    })

const seedComments = [
    {
        user_name: 'Rohan',
        comment: 'INREM Foundation is a part of several nationally important programmes in India through its own action and with other partners',
        replies: []
    },
    {
        user_name: 'Suryansh',
        comment: 'European Union (EU) supports INREM on its Water quality management programme in 7 states of India focussed on building District platforms for multiple stakeholder engagement for solving these problems.',
        replies: []
    },
    {
        user_name: 'Rohan',
        comment: 'This Arghyam supported programme focusses to utilize the Water quality network for enabling the entire ecosystem of partners in government, civil society and citizens, for solutions to Water quality problems across India.',
        replies: []
    },
    {
        user_name: 'Anushka',
        comment: 'This UNICEF supported programme in Rajasthan is building a State level Integrated Fluorosis Mitigation (IFM) response along with multiple state departments across 33 districts of Rajasthan.',
        replies: []
    },
    {
        user_name: 'Varun',
        comment: 'This efforts supports National Programme for Prevention and Control of Fluorosis (NPPCF) and the Jal Jeevan Mission (JJM) on fluoride contamination problems in the state.',
        replies: []
    }
]

Comment.insertMany(seedComments)
    .then(res => {
        console.log(res)
    }).catch(e => {
        console.log(e)
    })