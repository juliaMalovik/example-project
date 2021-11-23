import {Component, Input, OnInit} from '@angular/core';
import {MovieFilter} from '../../models/movie-filter';
import {HistoryService} from '../../services/history.service';

@Component({
    selector: 'app-history-list',
    templateUrl: './history-list.component.html'
})
export class HistoryListComponent implements OnInit {
    @Input()
    public historyList: MovieFilter[] = [];

    constructor(private historyService: HistoryService) {
    }

    ngOnInit(): void {
    }

    restoreHistory(history: MovieFilter): void {
        this.historyService.restoreSearchHistorySubject.next(history);
    }

}
