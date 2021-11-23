import {Injectable} from '@angular/core';
import {MovieFilter} from '../models/movie-filter';
import {maxHistoryLength} from '../constants';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  public restoreSearchHistorySubject: Subject<MovieFilter> = new Subject();

  constructor() {
  }

  setHistoryList(historyItem: MovieFilter): void {
    let history = [];
    const historyResult = localStorage.getItem('movieHistory');
    if (historyResult) {
      history = JSON.parse(historyResult as string);
    }
    history.unshift(Object.assign(historyItem, {}));
    if (history.length > maxHistoryLength) {
      history.length = maxHistoryLength;
    }
    localStorage.setItem('movieHistory', JSON.stringify(history));
  }

  getHistoryList(): MovieFilter[] {
    let historyObjectList = [];
    const historyResult = localStorage.getItem('movieHistory');
    if (historyResult) {
      historyObjectList = JSON.parse(historyResult as string);
    }
    return historyObjectList;
  }
}
