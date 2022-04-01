import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { GameDetailComponent } from './game-detail/game-detail.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: GameDetailComponent },
    ]),
    MatCardModule,
    MatButtonModule
  ],
  declarations: [GameDetailComponent],
})
export class StoreFeatureGameDetailModule {}
