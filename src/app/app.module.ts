import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatSliderModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatCardModule
} from '@angular/material';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { LandingMenuComponent } from './landing-menu/landing-menu.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PlayRoomComponent } from './play-room/play-room.component';
import { LogoComponent } from './logo/logo.component';
import { DigitalPanelComponent } from './digital-panel/digital-panel.component';
import { BingoViewComponent } from './bingo-view/bingo-view.component';
import { PresentViewComponent } from './present-view/present-view.component';
import { SettingComponent } from './setting/setting.component';
import { SettingService } from './_service/setting.service';


@NgModule({
  declarations: [
    AppComponent,
    LandingMenuComponent,
    NotFoundComponent,
    PlayRoomComponent,
    LogoComponent,
    DigitalPanelComponent,
    BingoViewComponent,
    PresentViewComponent,
    SettingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatSliderModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatCheckboxModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [SettingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
