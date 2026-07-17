import { Component, ElementRef, ViewChild, signal } from '@angular/core';
import { Music } from './player.models';
import { MinutesPipe } from '../../pipes/minutes.pipe';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'audio-player',
  imports: [MinutesPipe, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './player.html',
  styleUrl: './player.css'
})
export class Player {
    @ViewChild('audioRef') audioRef!: ElementRef<HTMLAudioElement>;

    tableColumns: String[] = ["position", "song", "artist", "album", "play"];

    playlist: Music[] = [
        // {
        //     "position": 1,
        //     "song"    : "Ladyfingers",
        //     "album"   : "Midnight Mirage",
        //     "artist"  : "Herb Alpert & The Tijuana Brass",
        //     "artwork" : "https://m.media-amazon.com/images/M/MV5BMmY1NDBiODItZTIyZi00MTE1LThmNGUtNTAxOThlMDEwZGFlXkEyXkFqcGc@._V1_.jpg",
        //     "mp3"     : "/musicas/ladyfingers-herb_alpert_e_the_tijuana_brass.mp3"
        // },
        {
            "position": 2,
            "song"    : "Iris",
            "album"   : "City of Angels: Music from the Motion Picture",
            "artist"  : "Goo Goo Dolls",
            "artwork" : "https://m.media-amazon.com/images/I/51FS59Q4EKL._SX425_.jpg",
            "mp3"     : "/musicas/iris-goo_goo_dolls.mp3"
        },
        {
            "position": 3,
            "song"    : "Chest Pain (I Love)",
            "album"   : "Malcolm Todd",
            "artist"  : "Malcolm Todd",
            "artwork" : "https://m.media-amazon.com/images/I/413xrrFVz4L._UX358_FMwebp_QL85_.jpg",
            "mp3"     : "/musicas/chest-pain-i-love-malcolm_todd.mp3"
        },
        {
            "position": 4,
            "song"    : "Bloom",
            "album"   : "Woodland EP (2001)",
            "artist"  : "The Paper Kites",
            "artwork" : "https://m.media-amazon.com/images/I/61-hsf3CLzL._UX358_FMwebp_QL85_.jpg",
            "mp3"     : "/musicas/bloom-the-paper-kites.mp3"
        },
        {
            "position": 5,
            "song"    : "Yellow",
            "album"   : "Parachutes",
            "artist"  : "Coldplay",
            "artwork" : "https://m.media-amazon.com/images/I/91K6SPGKNxL._SX425_.jpg",
            "mp3"     : "/musicas/yellow-coldplay.mp3"
        },
        {
            "position": 6,
            "song"    : "Until I found you",
            "album"   : "Angel Face",
            "artist"  : "Stephen Sanchez",
            "artwork" : "https://m.media-amazon.com/images/I/51u1BZJL4hL._UX358_FMwebp_QL85_.jpg",
            "mp3"     : "/musicas/until-i-found-you-stephen-sanchez.mp3"
        },
        {
            "position": 7,
            "song"    : "What a wonderful world",
            "album"   : "What a wonderful world",
            "artist"  : "Louis Armstrong",
            "artwork" : "https://m.media-amazon.com/images/I/71oBdOk+2BL._AC_SX522_.jpg",
            "mp3"     : "/musicas/what-a-wonderful-world-louis-armstrong.mp3"
        }
    ];

    musicSelected: number = 0;
    playing = signal(false);
    duration = signal(0);
    currentTime = signal(0);
    currentPercent = signal(0);
    volume = signal(1);
    volumePercent = signal(100);

    ngAfterViewInit(): void {
        this.load();
    }

    private get audio(): HTMLAudioElement {
        return this.audioRef.nativeElement;
    }

    toggleMusic() {
        if (this.audio.paused) {
            this.audio.play();
            this.playing.set(true);
        } else {
            this.audio.pause();
            this.playing.set(false);
        }
    }

    changeMusic(dir: number) {
        let currentIndex = this.musicSelected + dir;

        if (currentIndex < 0) {
            this.musicSelected = this.playlist.length-1;
        } else if (currentIndex > this.playlist.length-1) {
            this.musicSelected = 0;
        } else {
            this.musicSelected = currentIndex;
        }
        this.audio.src = this.playlist[this.musicSelected].mp3;
        this.audio.play();
        this.playing.set(true);
    }

    onTimeUpdate() {
        this.currentTime.set(this.audio.currentTime);
        this.currentPercent.set((this.currentTime() / this.duration()) * 100);
    }

    onLoadedMetadata() {
        this.duration.set(this.audio.duration);
    }

    onEnded() {
        this.changeMusic(1);
    }

    seek(value: number) {
        this.audio.currentTime = value;
        this.currentTime.set(value);
    }

    setVolume(value: number) {
        this.audio.volume = value;
        this.volume.set(value);
        this.volumePercent.set(this.volume() * 100);
    }

    load() {
        this.audio.src = this.playlist[this.musicSelected].mp3;
        this.toggleMusic();
    }

    setMusic(position: number) {
        var music = this.playlist.filter((e) => e.position == position)[0];
        this.musicSelected = position - 1;
        this.audio.src = music.mp3;
    }
}