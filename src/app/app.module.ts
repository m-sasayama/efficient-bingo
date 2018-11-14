import { NgModule } from '@angular/core';
import { NgModel } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatSliderModule,
  MatFormFieldModule
} from '@angular/material';


import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { LandingMenuComponent } from './landing-menu/landing-menu.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PlayRoomComponent } from './play-room/play-room.component';
import { LogoComponent } from './logo/logo.component';
import { DigitalPanelComponent } from './digital-panel/digital-panel.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingMenuComponent,
    NotFoundComponent,
    PlayRoomComponent,
    LogoComponent,
    DigitalPanelComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatSliderModule,
    MatInputModule,
    MatFormFieldModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
