import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { PiechartComponent } from './piechart/piechart.component';

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, NgxChartsModule],
  declarations: [AppComponent, PiechartComponent],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
