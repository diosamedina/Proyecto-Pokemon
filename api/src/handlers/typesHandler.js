const { checkIfEmpty, populateTypes } = require("../controllers/typesController")

const getTypesHandler = async (req, res) => {
    try {
        const empty = await checkIfEmpty();
        if (empty) {
            await populateTypes();
            return res.status(200).send('La tabla "types" ha sido poblada')
        } else {
            return res.status(200).send('La tabla "types" ya tenía datos')
        }
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
};

module.exports = { getTypesHandler };