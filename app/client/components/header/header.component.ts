import { Component, OnInit, Input, ViewChildren, QueryList } from '@angular/core';
import { SongsService } from 'app/client/services/songs.service';
import { SongComponent } from '../song/song.component';
import { MusicService } from 'app/client/services/music.service';
import { UIManagerService } from 'app/client/services/ui-manager.service';
import { MatDialog } from '@angular/material';
import { SettingsComponent } from '../settings/settings.component';
import { AuthService } from 'app/client/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public songs: string[];
  @Input() searchQuery: string;
  @Input() isAdmin;
  public lastPlayedSong: SongComponent;
  @ViewChildren('songs') songComponents: QueryList<SongComponent>;
  constructor(private songsService: SongsService, public musicService: MusicService,
    private UIManager: UIManagerService, private dialog: MatDialog, private auth: AuthService) { }

  ngOnInit() {
    this.init();
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
    this.UIManager.setSongs(this.songComponents);

  }
  async init() {
    this.songs = await this.songsService.getSongs();
    this.openSettings();
  }

  async playedSong(update: SongComponent) {
    if (this.lastPlayedSong) {
      this.lastPlayedSong.playing = false;
    }
    this.lastPlayedSong = update;
    this.musicService.play();
  }

  openSettings() {
    const dialogRef = this.dialog.open(SettingsComponent, { width: '500px', height: '400px' });
    dialogRef.afterClosed().subscribe((users) => {
      if (users) {
        this.auth.editAdmins(users).then(r => console.log(r));
      }
    });
  }
}
