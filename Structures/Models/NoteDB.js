const { Schema, model } = require('mongoose');

const NoteDB = new Schema({
    _id: Schema.Types.ObjectId,
    UserID: { type: String },
    NoteID: { type: String },
    Note: { type: String }

});

module.exports = model("Note", NoteDB, "Note"); 