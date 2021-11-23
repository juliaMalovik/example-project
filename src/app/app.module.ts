import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgxSliderModule} from '@angular-slider/ngx-slider';
import {NgxPaginationModule} from 'ngx-pagination';
import {AppComponent} from './app.component';
import {MovieListComponent} from './components/movie-list/movie-list.component';
import {MovieSearchComponent} from './components/movie-search/movie-search.component';
import {MovieDiscoverFormComponent} from './components/movie-discover-form/movie-discover-form.component';
import {HistoryListComponent} from './components/history-list/history-list.component';
import {TextSearchFormComponent} from './components/text-search-form/text-search-form.component';
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    MovieSearchComponent,
    MovieDiscoverFormComponent,
    HistoryListComponent,
    TextSearchFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    RouterModule,
    NgxSliderModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
