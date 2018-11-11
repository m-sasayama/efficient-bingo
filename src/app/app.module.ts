import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LandingMenuComponent } from './landing-menu/landing-menu.component';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing';
import { NotFoundComponent } from './not-found/not-found.component';
import { PlayRoomComponent } from './play-room/play-room.component';
import { LogoComponent } from './logo/logo.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingMenuComponent,
    NotFoundComponent,
    PlayRoomComponent,
    LogoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
