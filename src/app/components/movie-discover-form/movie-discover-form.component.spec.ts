import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {MovieDiscoverFormComponent} from './movie-discover-form.component';
import {FormBuilder} from "@angular/forms";
import {HistoryService} from "../../services/history.service";
import {MovieFilter} from "../../models/movie-filter";
import * as mockData from "../../mock-data";

describe('MovieDiscoverFormComponent', () => {
  let component: MovieDiscoverFormComponent;
  let fixture: ComponentFixture<MovieDiscoverFormComponent>;
  let historyService: HistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieDiscoverFormComponent],
      providers: [FormBuilder]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDiscoverFormComponent);
    component = fixture.componentInstance;
    historyService = fixture.debugElement.injector.get(HistoryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset form', () => {
    component.resetForm();
    expect(component.discoverForm.controls['vote_average'].value).toEqual(component.initRange);
  });

  it('should listen history selection', () => {
    spyOn(component, 'updateFormByHistory');
    historyService.restoreSearchHistorySubject.subscribe((filter: MovieFilter) => {
      expect(component.updateFormByHistory).toHaveBeenCalled();
    })
    historyService.restoreSearchHistorySubject.next(mockData.filterDiscover);
  });

  it('should update form', () => {
    component.updateFormByHistory(mockData.filterDiscover);
    expect(component.discoverForm.controls['vote_average'].value).toEqual(mockData.filterDiscover.vote_average);
  });

  it('should submit form', () => {
    spyOn(component, 'onDiscoverFormChanges');
    component.onSubmit();
    expect(component.onDiscoverFormChanges).toHaveBeenCalled();
  });

  it('should listen form changes', fakeAsync(() => {
    spyOn(component.discoverFormChanged, 'emit');
    component.discoverForm.controls['primary_release_year'].setValue(2021);
    tick(600);
    expect(component.discoverFormChanged.emit).toHaveBeenCalled();
  }));
});
