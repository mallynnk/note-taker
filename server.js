const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('./db/db');
const PORT = process.env.PORT || 3001;
const app = express();
const { json } = require("body-parser");
const uuid = require('uuid/v1');

app.use(express.static(path.join(__dirname, '/public')));

//parse incoming string / data
app.use(express.urlencoded({ extended: true }));
//parse incoming JSON 
app.use(express.json());

// routes to index 
app.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname + '/public/index.html'));
})

//routes to notes
app.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname + '/public/notes.html'));
})

//working route to db.json 
app.get('/api/notes', (req, res => { 
    console.log(db);
    res.json(db);
}))

app.post('/api/notes', (req, res) => { 
    //add the ID property
    const newNote = req.body
    newNote.id = uuid()
    console.log(newNote);
    db.push(req.body)

    fs.writeFile('db/db.json', JSON.stringify(db), function(err, data){
        if(err) {
            throw err 
        } else {
            res.send(data)
        }
    })
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

//method to make server listen
app.listen(PORT, () => {
    console.log('API server now on port ${PORT}!');
})