import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {MovieSearchComponent} from './movie-search.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HistoryService} from "../../services/history.service";
import * as mockData from "../../mock-data";
import {TextSearchFormComponent} from "../text-search-form/text-search-form.component";
import {MovieDiscoverFormComponent} from "../movie-discover-form/movie-discover-form.component";
import {FormBuilder} from "@angular/forms";
import {MovieService} from "../../services/movie.service";
import {delay, of} from "rxjs";
import {mapArray, mapObject} from "../../services/http-base.service";
import {Genre} from "../../models/genre";
import {MovieList} from "../../models/movie-list";

describe('MovieSearchComponent', () => {
  let component: MovieSearchComponent;
  let fixture: ComponentFixture<MovieSearchComponent>;
  let historyService: HistoryService;
  let movieService: MovieService;
  let fixtureSearch: ComponentFixture<TextSearchFormComponent>;
  let fixtureDiscover: ComponentFixture<MovieDiscoverFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [MovieSearchComponent, TextSearchFormComponent, MovieDiscoverFormComponent],
      providers: [FormBuilder, HistoryService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieSearchComponent);
    component = fixture.componentInstance;
    historyService = fixture.debugElement.injector.get(HistoryService);
    movieService = fixture.debugElement.injector.get(MovieService);
    fixtureSearch = TestBed.createComponent(TextSearchFormComponent);
    component.textSearch = fixtureSearch.componentInstance;
    fixtureDiscover = TestBed.createComponent(MovieDiscoverFormComponent);
    component.discoverSearch = fixtureDiscover.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should listen filters', () => {
    component.searchChanged(mockData.filterSearch);
    component.discoverFormChanged(mockData.filterDiscover);
    expect(component.formValue).toEqual(mockData.filterDiscover);
  });

  it('should change page', () => {
    spyOn(component, 'getMovies');
    component.pageChanged(1);
    expect(component.getMovies).toHaveBeenCalled();
  });

  it("should get Genre list", fakeAsync(() => {
    const response: Genre[] = mapArray<Genre>(Genre, mockData.genreList);
    spyOn(movieService, 'getGenres').and.returnValue(of(response).pipe(delay(1)));
    component.getGenres();
    tick(1);
    expect(component.genreList).toEqual(response);
  }));

  it("should get Movie list", fakeAsync(() => {
    component.genreList = mapArray<Genre>(Genre, mockData.genreList);
    component.formValue = mockData.filterDiscover;
    const response: MovieList = mapObject<MovieList>(MovieList, mockData.movieList);
    spyOn(movieService, 'getMovies').and.returnValue(of(response).pipe(delay(1)));
    component.getMovies(1, true);
    tick(1);
    expect(component.movieList.results.length).toEqual(response.results.length);
  }));
});
