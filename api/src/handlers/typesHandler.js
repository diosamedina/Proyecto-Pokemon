const { checkIfEmpty, populateTypes } = require("../controllers/typesController")

const getTypesHandler = async (req, res) => {
    try {
        const empty = await checkIfEmpty();
        console.log('hola');
        if (empty) {
            await populateTypes()
        } else {
            res.status(200).send('La tabla "types" ya tiene datos')
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

module.exports = { getTypesHandler };