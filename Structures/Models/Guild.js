const { Schema, model } = require('mongoose');

const Guild = new Schema({
    _id: Schema.Types.ObjectId,
    gID: { type: String },
    gName: { type: String },
    gIcon: { type: String, required: false },
    gInvite: { type: String },
    cID: { type: String },
    

});

module.exports = model("Guild", Guild, "guilds"); 