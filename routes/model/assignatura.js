var mongoose = require('mongoose');

module.exports = mongoose.model('Assignatura', {
    nom: String,
    estudiants: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Estudiant'
    }],
    when: String,
});

