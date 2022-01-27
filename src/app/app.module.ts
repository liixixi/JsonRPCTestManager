import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { InterfaceExplorerComponent } from './interface-explorer/interface-explorer.component';
import { FunctionViewerComponent } from './function-viewer/function-viewer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import { OutputComponent } from './output/output.component';
import { ParametersComponent } from './parameters/parameters.component';
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    InterfaceExplorerComponent,
    FunctionViewerComponent,
    OutputComponent,
    ParametersComponent,
    
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatListModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
