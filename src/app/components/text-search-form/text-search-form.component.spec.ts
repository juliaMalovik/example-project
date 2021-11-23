import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TextSearchFormComponent} from './text-search-form.component';
import {FormBuilder} from "@angular/forms";
import {HistoryService} from "../../services/history.service";
import * as mockData from 'src/app/mock-data';
import {MovieFilter} from "../../models/movie-filter";

describe('TextSearchFormComponent', () => {
  let component: TextSearchFormComponent;
  let fixture: ComponentFixture<TextSearchFormComponent>;
  let historyService: HistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TextSearchFormComponent],
      providers: [FormBuilder]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextSearchFormComponent);
    component = fixture.componentInstance;
    historyService = fixture.debugElement.injector.get(HistoryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset form', () => {
    component.resetForm();
    expect(component.searchForm.controls['query'].value).toEqual('');
  });

  it('should submit form', () => {
    spyOn(component.searchFormChanged, 'emit');
    component.searchForm.controls['query'].setValue('test');
    component.onSubmit();
    expect(component.searchFormChanged.emit).toHaveBeenCalled();
    component.searchForm.controls['query'].setValue('   ');
    component.onSubmit();
    expect().nothing();
  });

  it('should update form', () => {
    spyOn(component, 'onSubmit');
    component.updateFormByHistory(mockData.filterSearch);
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should listen history selection', () => {
    spyOn(component, 'updateFormByHistory');
    historyService.restoreSearchHistorySubject.subscribe((filter: MovieFilter) => {
      expect(component.updateFormByHistory).toHaveBeenCalled();
    })
    historyService.restoreSearchHistorySubject.next(mockData.filterSearch);
  });
});
