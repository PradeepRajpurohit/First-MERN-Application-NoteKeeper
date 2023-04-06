const express = require('express')
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note');

const router = express.Router()

//ROUTE 1 : Get Allnotes of user using GET "/api/note/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("some Internal error occur.");
    }
})

//ROUTE 2 : Post a new note using POST "/api/note/addnote". Login required.
router.post('/addnote', fetchuser, [
    body('title', 'Title length should be minimum 3.').isLength({ min: 3 }),
    body('description', 'Description length should be minimum 5.').isLength({ min: 5 })
], async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }
        const note = await Note.create({
            user: req.user.id,
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag
        })
        res.json(note);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("some Internal error occur.");
    }

})

//ROUTE 3 : Update a existing note using POST "/api/note/updatenote/:id". Login required.
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //Create a newNote object
        const newNote = {};
        if (title) {
            { newNote.title = title }
        }
        if (description) {
            { newNote.description = description }
        }
        if (tag) {
            { newNote.tag = tag }
        }

        //Find the note to be updated and update it.
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Note allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("some Internal error occur.");
    }


})

//ROUTE 4 : Delete a existing note using DELETE "/api/note/deletenote". Login required.
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //Find the note to be deleted and delete it.
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Note allowed");
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ 'success': 'Note is deleted' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("some Internal error occur.");

    }


})

module.exports = router;