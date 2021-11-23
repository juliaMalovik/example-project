import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HistoryListComponent} from './history-list.component';
import {HistoryService} from "../../services/history.service";

describe('HistoryListComponent', () => {
  let component: HistoryListComponent;
  let fixture: ComponentFixture<HistoryListComponent>;
  let historyService: HistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryListComponent);
    component = fixture.componentInstance;
    historyService = fixture.debugElement.injector.get(HistoryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should restore history', () => {
    spyOn(historyService.restoreSearchHistorySubject, 'next');
    component.restoreHistory({});
    expect(historyService.restoreSearchHistorySubject.next).toHaveBeenCalledWith({});
  });
});
