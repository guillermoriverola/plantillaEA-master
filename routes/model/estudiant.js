var mongoose = require('mongoose');

module.exports = mongoose.model('Estudiant', {
    nom: String,
    direccio: String,
    telefons: {
        casa: String,
        feina: String   }
});