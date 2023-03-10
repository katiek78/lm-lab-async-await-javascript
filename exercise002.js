import fetch from "node-fetch";

const lastFM = "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=discokate&api_key=83029527112615614d46b4e0d4eb31ba&format=json&limit=10"

const fetchData = async (apiEndPoint) => {
  try {
    const response = await fetch(apiEndPoint);   
    const json = await response.json();
  
    if (json.recenttracks.track.length) {
      const tracks = json.recenttracks.track;
      if (tracks[0]['@attr']?.nowplaying === 'true') {
        console.log(`Katie is now playing 🎵 ${tracks[0].name} by ${tracks[0].artist["#text"]}`);          
      } else {
        console.log(`Katie's last played track 💿 on Last.FM was ${tracks[0].name} by ${tracks[0].artist["#text"]}`);
      }
      console.log(`Recently played tracks on Last.FM 📅:`);
      tracks.slice(1).forEach(track => {
        console.log(`🟣 ${track.name} by ${track.artist["#text"]}`);
      })
    }
  } catch(error) {
    console.log(error);
  }
};

fetchData(lastFM);
