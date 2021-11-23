import { TestBed } from '@angular/core/testing';

import { HistoryService } from './history.service';
import * as mockData from 'src/app/mock-data';
import {maxHistoryLength} from "../constants";

describe('HistoryService', () => {
  let service: HistoryService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HistoryService]
    });
    service = TestBed.inject(HistoryService);
    let store: {[p: string]: any} = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };
    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store value', () => {
    localStorage.setItem('movieHistory', JSON.stringify([]));
    service.setHistoryList(mockData.filterDiscover);
    expect(localStorage.getItem('movieHistory')).toEqual(JSON.stringify([mockData.filterDiscover]));
    expect(service.getHistoryList().length).toEqual(1);
    const filterList = [mockData.filterDiscover];
    for(let i = 0; i <= maxHistoryLength; i++) {
      filterList.push(mockData.filterDiscover);
    }
    localStorage.setItem('movieHistory', JSON.stringify(filterList));
    service.setHistoryList(mockData.filterDiscover);
    expect(service.getHistoryList().length).toEqual(maxHistoryLength);
  });


});
