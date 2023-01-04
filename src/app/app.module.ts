import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { LeftFiltersComponent } from './main/left-filters/left-filters.component';
import { AlphaFilterComponent } from './main/alpha-filter/alpha-filter.component';
import { TopFiltersComponent } from './main/top-filters/top-filters.component';
import { AddEditComponent } from './main/add-edit/add-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LeftFiltersComponent,
    AlphaFilterComponent,
    TopFiltersComponent,
    AddEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
