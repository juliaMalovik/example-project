import {Component, Output, EventEmitter, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {Subscription} from 'rxjs';
import {HistoryService} from '../../services/history.service';
import {MovieFilter} from '../../models/movie-filter';
import {noOnlyWhitespaceValidator} from "../../helpers/validators";

@Component({
    selector: 'app-text-search-form',
    templateUrl: './text-search-form.component.html'
})
export class TextSearchFormComponent implements OnInit, OnDestroy {

    public searchForm: FormGroup;
    @Output()
    searchFormChanged: EventEmitter<MovieFilter> = new EventEmitter();
    private subscriptions: Subscription[] = [];

    constructor(private formBuilder: FormBuilder,
                private historyService: HistoryService) {
    }

    ngOnInit(): void {
        this.subscriptions.push(this.historyService.restoreSearchHistorySubject.subscribe((historyItem: MovieFilter) => {
            if (historyItem.query) {
                this.updateFormByHistory(historyItem);
            }
        }));
        this.initForm();
    }

    initForm(): void {
        this.searchForm = this.formBuilder.group({
            query: ['', [noOnlyWhitespaceValidator]]
        });
    }

    resetForm() {
      this.searchForm.controls['query'].setValue('');
    }

    updateFormByHistory(movieFilter: MovieFilter) {
      this.searchForm.controls['query'].setValue(movieFilter.query);
        this.onSubmit();
    }

    onSubmit(): void {
        if (this.searchForm.valid) {
            this.searchFormChanged.emit(this.searchForm.value);
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

}
