const notesModel = require('../models/noteModel');

const createNotesC = async(req, res) => {
    const {text, userId} = req.body
    
    console.log("jalan");
    if (!text) return req.status(400).json({error: 'Tuliskan catatan'})

    try {
        const [id] = await notesModel.createNotes({text, userId})
        res.status(201).json({id, text, userId})    
    } catch (error) {
        res.status(400).json({error: "Gagal membuat note"})
    }
}

module.exports = {
    createNotesC
}