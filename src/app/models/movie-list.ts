import {Movie} from './movie';
import {mapArray} from "../services/http-base.service";

export class MovieList {
    public page?: number;
    public total_results?: number;
    public total_pages?: number;
    public result_list?: Movie[];
    constructor(dto: any) {
        this.page = dto.page;
        this.total_results = dto.total_results;
        this.total_pages = dto.total_pages;
        this.results = dto.results;
    }
    set results(dtoArray: any) {
        let results: Movie[] = [];
        if (dtoArray && dtoArray.length) {
          results = mapArray<Movie>(Movie, dtoArray);
        }
        this.result_list = results;
    }
    get results() {
        return this.result_list;
    }
}
