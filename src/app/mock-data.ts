import {MovieFilter} from "./models/movie-filter";

export const genreList = [
  {id: 28, name: "Action"},
  {id: 12, name: "Adventure"},
  {id: 16, name: "Animation"},
  {id: 35, name: "Comedy"}
];


export const movieList = {
  page: 1,
  total_pages: 5,
  total_results: 81,
  results: [
    {
      adult: false,
      backdrop_path: "/fLKKGEHe0Jylb5i5Rb8kQjq4dEt.jpg",
      genre_ids: [35],
      id: 8277,
      original_language: "en",
      original_title: "American Pie Presents: Beta House",
      overview: "Erik, Ryan, and Cooze start college and pledge the Beta House fraternity, presided over by none other than legendary Dwight Stifler.",
      popularity: 49.389,
      poster_path: "/cEJMqmCGdKJkmjWwi3Iv6l4kMIK.jpg",
      release_date: "2007-12-10",
      title: "American Pie Presents: Beta House",
      video: false,
      vote_average: 5.6,
      vote_count: 1486
    },
    {
      adult: false,
      backdrop_path: "/z6QueZOw7EzKySKJklKrFu08nD6.jpg",
      genre_ids: [28, 12, 35],
      id: 749645,
      original_language: "en",
      original_title: "The Beta Test",
      overview: "An engaged Hollywood agent receives a mysterious letter for an anonymous sexual encounter and becomes ensnared in a sinister world of lying.",
      popularity: 12.891,
      poster_path: "/zZMebBIsNipjFhJFv0zjm0KQaBF.jpg",
      release_date: "2021-10-15",
      title: "The Beta Test",
      video: false,
      vote_average: 6.3,
      vote_count: 26
    }
  ]
};

export const filterSearch: MovieFilter = {
  query: 'test'
}

export const filterDiscover: MovieFilter = {
  primary_release_year: 2020,
  with_genres: [35],
  vote_average: [5,10]
}
