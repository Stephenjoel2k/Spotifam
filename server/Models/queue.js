const mongodb = require('mongodb')

let mongo = {
  user: 'stephenj2k',
  pass: 'qwerty123'
}

var loadCurrentQueue = async() => {
  const client = await mongodb.MongoClient.connect(`mongodb://${mongo.user}:${mongo.pass}@ds233571.mlab.com:33571/spotifam`, {useNewUrlParser: true})
  return client.db('spotifam').collection('tracks')
}

module.exports = { loadCurrentQueue }
