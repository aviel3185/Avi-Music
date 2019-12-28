import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SongsService } from 'app/client/services/songs.service';

@Component({
  selector: 'app-upload-song',
  templateUrl: './upload-song.component.html',
  styleUrls: ['./upload-song.component.scss']
})
export class UploadSongComponent implements OnInit {
  public song: File;
  public uploadDone = false;
  constructor(public songService: SongsService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  async uploadSong() {
    await this.songService.postSong(this.song);
    this.uploadDone = true;
    this.cd.detectChanges();
  }

}
