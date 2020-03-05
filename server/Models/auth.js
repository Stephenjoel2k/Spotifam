const querystring = require('querystring');
let request = require('request')

const getCode = (res, redirect_uri) => {
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: 'user-read-private user-read-email user-read-recently-played user-top-read user-read-playback-state user-modify-playback-state user-read-currently-playing',
      redirect_uri
    }))
  }

  const getToken = (res, code, redirect_uri) => {
    let authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(
          process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
        ).toString('base64'))
      },
      json: true
    }
    request.post(authOptions, async function(error, response, body) {
      var access_token = await body.access_token
      let uri = process.env.TOKEN_URI || 'http://localhost:8080'
      res.redirect(uri + '?access_token=' + access_token)
    })
  }

module.exports = { getCode, getToken }
