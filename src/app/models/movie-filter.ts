export interface MovieFilter {
  date?: string;
  page?: number;
  query?: string;
  primary_release_year?: number;
  with_genres?: number[];
  vote_average?: number[];
  genre_names?: string[];
}
