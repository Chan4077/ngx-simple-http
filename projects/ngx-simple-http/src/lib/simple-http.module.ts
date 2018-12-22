import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SimpleHttpService } from './simple-http.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    SimpleHttpService
  ]
})
export class SimpleHttpModule { }
