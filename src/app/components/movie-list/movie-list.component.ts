import {Component, OnInit, Input} from '@angular/core';
import {Movie} from '../../models/movie';
import {imagePath} from '../../constants';

@Component({
    selector: 'app-movie-list',
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
    @Input()
    public movies: Movie[] = [];
    public imagePath: string = imagePath;

    constructor() {
    }

    ngOnInit(): void {
    }
}
