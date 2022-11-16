const { Schema, model } = require('mongoose');

const NoteDB = new Schema({
    _id: Schema.Types.ObjectId,
    UserID: String,
    NoteID: String,
    Note: String,

});

module.exports = model("Note", NoteDB, "notes"); 