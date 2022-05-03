const API_KEY = "Provide your API key"


const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumantaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
   

}

const fetchIdMovie = (id,media,title)=>{
    if(media=="tv" || title=="NetFlixOriginals" ){
        return(`/tv/${id}?api_key=${API_KEY}`)

    }
    return (`/movie/${id}?api_key=${API_KEY}`)
}
//https://api.themoviedb.org/3/trending/all/week/129?api_key=cc9af3498908b1b601abeb6419e833b2
// https://api.themoviedb.org/3/movie/129?api_key=cc9af3498908b1b601abeb6419e833b2


export  {requests, fetchIdMovie}


