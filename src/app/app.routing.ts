import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router';
import { LandingMenuComponent } from './landing-menu/landing-menu.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PlayRoomComponent } from './play-room/play-room.component';

const routes: Routes = [
    { path: '', component: LandingMenuComponent },
    { path: 'bingo', component: LandingMenuComponent },
    { path: 'bingo/playroom', component: PlayRoomComponent },
    { path: 'bingo/setting', component: PlayRoomComponent },
    { path: '**', component: NotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }