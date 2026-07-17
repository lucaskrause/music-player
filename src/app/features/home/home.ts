import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Player } from '../../components/player/player';

@Component({
  selector: 'home-page',
  imports: [
    MatButtonModule,
    MatIconModule,
    Player,
  ],
  templateUrl: './home.html',
})
export class HomePage {

}
