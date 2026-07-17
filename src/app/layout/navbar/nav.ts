import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './nav.html'
})
export class Nav {
    icon = "light_mode";

    changeTheme() {
        const html = document.documentElement;
        const atual = html.dataset['theme'];

        html.dataset['theme'] = atual === 'dark' ? 'light' : 'dark';
        this.icon = atual === 'dark' ? "dark_mode" : "light_mode";
        localStorage.setItem('tema', html.dataset['theme'] ?? 'light');
    }
}
