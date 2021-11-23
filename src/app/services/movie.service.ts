import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpBaseService, mapArray, mapObject} from './http-base.service';
import {MovieList} from '../models/movie-list';
import {MovieFilter} from '../models/movie-filter';
import {Observable} from 'rxjs';
import {Genre} from '../models/genre';
import {genrePath, discoverPath, searchPath} from '../constants';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService extends HttpBaseService {

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getMovies(filter: MovieFilter): Observable<MovieList> {
    const path = !!filter.query ? searchPath : discoverPath;
    let params = new HttpParams();
    Object.entries(filter).forEach((item: any[]) => {
      const [key, value] = item;
      if (value) {
        if (key !== 'vote_average') {
          params = params.append(key, Array.isArray(value) ? value.join(', ') : value.toString());
        } else {
          if (value.length) {
            (value as number[]).forEach((v: number, index: number) => {
              const queryName = 'vote_average.' + (index === 0 ? 'gte' : 'lte');
              params = params.append(queryName, v);
            });
          }
        }
      }
    });
    return this.get<MovieFilter>(path, params).pipe(map((dto: any) => {
      return mapObject<MovieList>(MovieList, dto);
    }));
  }

  getGenres(): Observable<Genre[]> {
    return this.get(genrePath).pipe(map((dto: any) => {
      return mapArray<Genre>(Genre, dto.genres);
    }));
  }

}
