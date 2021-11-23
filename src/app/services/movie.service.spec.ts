import { TestBed, inject } from '@angular/core/testing';

import { MovieService } from './movie.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpBaseService, mapArray, mapObject} from "./http-base.service";
import {Genre} from "../models/genre";
import {of} from "rxjs";
import * as mockData from 'src/app/mock-data';
import {MovieList} from "../models/movie-list";
import {MovieFilter} from "../models/movie-filter";

describe('MovieService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService, HttpBaseService]
    });
  });

  it('should be created', inject([MovieService], (service: MovieService) => {
    expect(service).toBeTruthy();
  }));

  it('should be valid Get movies', inject([MovieService, HttpBaseService], (service: MovieService, api: HttpBaseService, done: () => {}) => {
    const movieList:MovieList = mapObject<MovieList>(MovieList, mockData.movieList);
    const filter: MovieFilter = mockData.filterSearch;
    spyOn(api, 'get').and.returnValue(of(movieList));
    service.getMovies(filter).subscribe(response => {
      expect(response).toEqual(movieList);
      done();
    });
    const filterDiscover: MovieFilter = mockData.filterDiscover;
    service.getMovies(filterDiscover).subscribe(response => {
      expect(response).toEqual(movieList);
      done();
    });
    expect().nothing();
  }));

  it('should be valid Get genres', inject([MovieService, HttpBaseService], (service: MovieService, api: HttpBaseService, done: () => {}) => {
    const genres:Genre[] = mapArray<Genre>(Genre, mockData.genreList);
    service.getGenres().subscribe(response => {
      expect(response).toEqual(genres);
      done();
    });
    spyOn(api, 'get').and.returnValue(of(genres));
    expect().nothing();
  }));
});
