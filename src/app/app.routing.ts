import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router';
import { LandingMenuComponent } from './landing-menu/landing-menu.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PlayRoomComponent } from './play-room/play-room.component';
import { BingoViewComponent } from './bingo-view/bingo-view.component';
import { PresentViewComponent } from './present-view/present-view.component';
import { SettingComponent } from './setting/setting.component';

const routes: Routes = [
    { path: '', component: LandingMenuComponent },
    { path: 'efficientbingo', component: LandingMenuComponent },
    {
        path: 'efficientbingo/playroom',
        component: PlayRoomComponent,
        children: [
            { path: 'bingo', component: BingoViewComponent },
            { path: 'present', component: PresentViewComponent }
        ]
    },
    { path: 'efficientbingo/setting', component: SettingComponent },
    { path: '**', component: NotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        anchorScrolling: 'enabled'
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }