import { TestBed, inject } from '@angular/core/testing';

import { HttpBaseService } from './http-base.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('HttpBaseService', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpBaseService]
    });
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', inject([HttpBaseService], (service: HttpBaseService) => {
    expect(service).toBeTruthy();
  }));
});
