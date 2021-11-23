export class Movie {
  public id?: number;
  public title?: string;
  public overview: string;
  public poster_path: string;
  public release_date: string;
  public vote_average: number;
  public genre_ids: number[];
  public genre_names: string[];
  constructor(dto: any) {
    this.id = dto.id;
    this.title = dto.title;
    this.overview = dto.overview;
    this.poster_path = dto.poster_path;
    this.release_date = dto.release_date;
    this.vote_average = dto.vote_average;
    this.genre_ids = dto.genre_ids;
  }
}
