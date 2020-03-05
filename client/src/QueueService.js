import axios from 'axios'

const url = 'queue/'

class QueueService {
  //Get tracks
  static getTracks() {
       return new Promise ((resolve, reject) => {
           axios.get(url).then((res) => {
               const data = res.data;
               resolve(
                   data.map(track => ({
                        _id: track._id,
                       title: track.title,
                       artist: track.artist
                   }))
               );
           })
           .catch((err)=> {
               reject(err);
           })
       });
   }

  //Create track
  static insertTrack(title, artist){
    return axios.post(url, {
      title: title,
      artist: artist
    })
  }

  //Delete track
  static deleteTrack(id){
    return axios.delete(`${url}${id}`)
  }
}

export default QueueService
