import {Component, Input, Output, EventEmitter, OnInit, OnDestroy} from '@angular/core';
import {Genre} from '../../models/genre';
import {FormGroup, FormBuilder} from '@angular/forms';
import {Options} from '@angular-slider/ngx-slider';
import {debounceTime} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {HistoryService} from '../../services/history.service';
import {MovieFilter} from '../../models/movie-filter';

@Component({
  selector: 'app-movie-discover-form',
  templateUrl: './movie-discover-form.component.html',
  styleUrls: ['./movie-discover-form.component.scss']
})
export class MovieDiscoverFormComponent implements OnInit, OnDestroy {
  @Input()
  public genreList: Genre[] = [];
  public yearList: number[] = [];
  public voteOptions: Options;
  readonly initRange: number[];
  public discoverForm: FormGroup = new FormGroup({});
  private isOnlyReset: boolean = false;
  @Output()
  discoverFormChanged: EventEmitter<MovieFilter> = new EventEmitter();
  private subscriptions: Subscription[] = [];

  constructor(private formBuilder: FormBuilder,
              private historyService: HistoryService) {
    this.voteOptions = {
      floor: 0,
      ceil: 10,
      step: 1
    };
    this.initRange = [5, 10];
    this.initForm();
  }

  ngOnInit(): void {
    this.subscriptions.push(this.historyService.restoreSearchHistorySubject.subscribe((historyItem: MovieFilter) => {
      if (!historyItem.query) {
        this.updateFormByHistory(historyItem);
      }
    }));
    this.yearList = this.generateYears();
  }

  initForm(): void {
    this.discoverForm = this.formBuilder.group({
      primary_release_year: null,
      with_genres: [[]],
      vote_average: [this.initRange]
    });
    this.onDiscoverFormChanges();
  }

  resetForm() {
    this.isOnlyReset = true;
    this.discoverForm.controls['primary_release_year'].setValue(null);
    this.discoverForm.controls['with_genres'].setValue([]);
    this.discoverForm.controls['vote_average'].setValue(this.initRange);
  }

  updateFormByHistory(movieFilter: MovieFilter) {
    this.discoverForm.controls['primary_release_year'].setValue(movieFilter.primary_release_year);
    this.discoverForm.controls['with_genres'].setValue(movieFilter.with_genres);
    this.discoverForm.controls['vote_average'].setValue(movieFilter.vote_average);
  }

  generateYears(): number[] {
    const currentYear = new Date().getFullYear();
    const years = [];
    let startYear = 1900;
    while (startYear <= currentYear) {
      years.push(startYear++);
    }
    return years.reverse();
  }

  onDiscoverFormChanges(): void {
    this.discoverForm.valueChanges.pipe(debounceTime(600)).subscribe(val => {
      if (!this.isOnlyReset) {
        this.discoverFormChanged.emit(this.discoverForm.value);
      }
      this.isOnlyReset = false;
    });
  }

  onSubmit(): void {
    this.onDiscoverFormChanges();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
