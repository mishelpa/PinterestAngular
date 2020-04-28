import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LogInterceptorService } from '../app/services/logInterceptor/log-interceptor.service';
import { PhotosListComponent } from './components/photos-list/photos-list.component';
import { PhotoModalComponent } from './components/photo-modal/photo-modal.component';
import { NavComponent } from './components/nav/nav.component';
import { SearcherComponent } from './components/searcher/searcher.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AppComponent,
    PhotosListComponent,
    PhotoModalComponent,
    NavComponent,
    SearcherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  providers: [
    {
      provide:  HTTP_INTERCEPTORS,
      useClass: LogInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
