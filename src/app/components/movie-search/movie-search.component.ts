import {Component, ViewChild, OnInit} from '@angular/core';
import {MovieList} from '../../models/movie-list';
import {MovieService} from '../../services/movie.service';
import {MovieFilter} from '../../models/movie-filter';
import {Movie} from '../../models/movie';
import {Genre} from '../../models/genre';
import * as moment from 'moment-timezone';
import {HistoryService} from '../../services/history.service';
import {TextSearchFormComponent} from '../text-search-form/text-search-form.component';
import {MovieDiscoverFormComponent} from '../movie-discover-form/movie-discover-form.component';


@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit {
  public genreList: Genre[] = [];
  public movieList: MovieList;
  public historyList: MovieFilter[];
  public currentPage: number | undefined;
  public totalResults: number | undefined;
  public loading = false;
  public formValue: MovieFilter;
  @ViewChild(TextSearchFormComponent) textSearch: TextSearchFormComponent;
  @ViewChild(MovieDiscoverFormComponent) discoverSearch: MovieDiscoverFormComponent;

  constructor(private movieService: MovieService,
              private historyService: HistoryService) {
    this.genreList = [];
    this.historyList = [];
  }

  ngOnInit(): void {
    this.getGenres();
    this.historyList = this.historyService.getHistoryList();
  }

  searchChanged(formValue: MovieFilter): void {
    this.formValue = formValue;
    this.getMovies(1, !!formValue.query);
    this.discoverSearch.resetForm();
  }

  discoverFormChanged(formValue: MovieFilter): void {
    this.formValue = formValue;
    this.getMovies(1, true);
    this.textSearch.resetForm();
  }

  pageChanged($event: number): void {
    this.getMovies($event, false);
  }

  getMovies(page: number, saveHistory: boolean): void {
    this.loading = true;
    let movieFilter: MovieFilter = this.formValue || {};
    movieFilter.page = page;
    this.movieService.getMovies(movieFilter).subscribe({
      next: (movieList: MovieList) => {
        this.movieList = this.prepareMovieStringGenres(movieList);
        setTimeout(() => {
          this.currentPage = this.movieList.page;
          this.totalResults = this.movieList.total_results;
        });
        if (saveHistory) {
          this.historyService.setHistoryList(this.prepareHistoryItem(movieFilter));
          this.historyList = this.historyService.getHistoryList();
        }
      }
    }).add(() => {
      this.loading = false
    });
  }

  getGenres(): void {
    this.movieService.getGenres().subscribe({
      next: (genreList: Genre[]) => {
        this.genreList = genreList;
      }
    }).add(() => {
      this.getMovies(1, false);
    });
  }

  prepareMovieStringGenres(movieList: MovieList): MovieList {
    movieList.results.map((movie: Movie) => {
      movie.genre_names = [];
      this.genreList.forEach((genre: Genre) => {
        if (movie.genre_ids.includes(genre.id)) {
          movie.genre_names.push(genre.name);
        }
      });
      return movie;
    });
    return movieList;
  }

  prepareHistoryItem(filter: MovieFilter): MovieFilter {
    const historyItem: MovieFilter = {
      ...filter
    }
    this.genreList.forEach((genre: Genre) => {
      if ((historyItem.with_genres || []).includes(genre.id)) {
        (historyItem.genre_names || []).push(genre.name);
      }
    });
    historyItem.date = moment(new Date()).format('YYYY-MM-DD');
    return historyItem;
  }
}
