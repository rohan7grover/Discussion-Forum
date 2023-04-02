const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const Comment = require('./models/comments');

mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true })
    .then(() => {
        console.log("Mongo Connection open!!")
    })
    .catch(err => {
        console.log(err)
    })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/comments', async (req, res) => {
    const comments = await Comment.find({})
    console.log(comments)

    let data = []
    for (c of comments) {
        const arr = []
        if (c.replies) {
            for (id of c.replies) {
                const reply = await Comment.findById(id);
                arr.push({
                    "reply_person_id": reply._id.toString(),
                    "reply_person_name": reply.user_name, 
                    "reply_comment": reply.comment
                });
            }
            data.push({
                "p_id": c._id.toString(),
                "name": c.user_name,
                "comment": c.comment,
                "reply_arr": arr
            })
        }
        else {
            data.push({
                "p_id": c._id.toString(),
                "name": c.user_name,
                "comment": c.comment
            })
        }
    }
    console.log(data)
    res.render('comments/index', { data })
})

app.get('/comments/new', (req, res) => {
    res.render('comments/new')
})

app.post('/comments', async (req, res) => {
    const newComment = new Comment(req.body);
    await newComment.save();
    res.redirect(`/comments/${newComment._id}`)
})

app.get('/comments/:id', async (req, res) => {
    const { id } = req.params;
    const comment = await Comment.findById(id);
    console.log(comment);
    res.render('comments/show', { comment })
})

app.get('/comments/:id/edit', async (req, res) => {
    const { id } = req.params;
    const comment = await Comment.findById(id);
    res.render('comments/edit', { comment })
})

app.get('/comments/:id/reply', (req, res) => {
    const { id } = req.params;
    res.render('comments/reply', { parent_id: id })
})

app.post('/comments/:id/reply', async (req, res) => {
    const { id } = req.params;
    const newComment = new Comment(req.body);
    let reply_id = newComment._id.toString()
    await newComment.save();

    const comment = await Comment.findByIdAndUpdate(id, { "$push": { "replies": reply_id } }, { runValidators: true, new: true });

    res.redirect(`/comments/${newComment._id}`)
})

app.patch('/comments/:id', async (req, res) => {
    const { id } = req.params;
    const comment = await Comment.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/comments/${comment._id}`)
})

app.listen(3000, () => {
    console.log("listening on port 3000")
})