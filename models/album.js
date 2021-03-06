const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  band: {
    type: String,
    required: true,
  },
  dateOfRelease: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Album', albumSchema);