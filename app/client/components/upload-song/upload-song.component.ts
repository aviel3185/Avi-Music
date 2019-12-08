import { Component, OnInit } from '@angular/core';
import { SongsService } from 'app/client/services/songs.service';

@Component({
  selector: 'app-upload-song',
  templateUrl: './upload-song.component.html',
  styleUrls: ['./upload-song.component.scss']
})
export class UploadSongComponent implements OnInit {
  public song: File;
  constructor(public songService: SongsService) { }

  ngOnInit() {
  }

}
