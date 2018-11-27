import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatDialogModule,
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
import { SettingComponent, PresentSettingDialog } from './setting/setting.component';
import { SettingService } from './_service/setting.service';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { PresentPanelComponent } from './present-panel/present-panel.component';

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
    SettingComponent,
    PresentSettingDialog,
    ConfirmDialogComponent,
    PresentPanelComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatDialogModule,
    MatCheckboxModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    SettingComponent,
    PresentSettingDialog,
    ConfirmDialogComponent
  ],
  providers: [SettingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
