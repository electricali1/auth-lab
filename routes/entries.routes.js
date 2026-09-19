const router = require("express").Router();
const isSignedIn = require('../middleware/is-signed-in');
const Entry = require('../models/Entry');

// Part 3 - New Entry Page
router.get('/new', isSignedIn, (req, res) => {
    res.render('new-journal.ejs');
});

// Part 4 - Create an Entry
router.post('/', isSignedIn, async (req, res) => {
    console.log(req.session.user);
    await Entry.create({
        title: req.body.title,
        entryBody: req.body.entryBody,
        isPublic: Boolean(req.body.isPublic),
        owner: req.session.user._id
    });
    res.redirect('/entries');
});

// Part 5 - Public Entries
router.get('/', async (req, res) => {
    const foundEntries = await Entry.find({ isPublic: true });
    res.render('all-entries.ejs', { entries: foundEntries });
});

// Part 6 - My Entries
router.get('/my-entries', isSignedIn, async (req, res) => {
    const userEntries = await Entry.find({ owner: req.session.user._id });
    res.render('my-entries.ejs', { entries: userEntries });
});

module.exports = router;
