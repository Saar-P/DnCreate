const Character = require("../models/characterModel");



function addCharacter(character) {
    return character.save();
}
async function getCharacters(user_id) {
    return Character.find({ user_id: { $eq: user_id } }).populate('characterClassId').populate('raceId').exec();
}

async function getChar(_id) {
    return Character.findOne({ _id: { $eq: _id } }).populate('characterClassId').populate('raceId').exec();
}

async function getCharForAdventure(_id) {
    return Character.findOne({ _id: { $eq: _id } }).populate('user_id').exec();
}

function removeCharacter(char_id) {
    return Character.deleteOne({ _id: { $eq: char_id } }).exec()
}

function validateChar(char, _id) {
    return Character.findOne({ name: { $eq: char }, user_id: { $eq: _id } });
}

async function updateCharacter(character) {
    const info = await Character.updateOne({ _id: character._id }, character).exec();
    return info.n ? character : null;
}


module.exports = {
    getChar,
    addCharacter,
    getCharacters,
    removeCharacter,
    updateCharacter,
    validateChar,
    getCharForAdventure
}