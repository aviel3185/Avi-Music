import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { PlayingNowComponent } from './components/playing-now/playing-now.component';
import { BodyComponent } from './components/body/body.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './components/header/header.component';
import { MatTabsModule } from '@angular/material/tabs';
import { UtilsComponent } from './components/utils/utils.component';
import { SongComponent } from './components/song/song.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { SearchPipe } from './pipes/search.pipe';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { UploadSongComponent } from './components/upload-song/upload-song.component';
import { WinAuthInterceptor } from './httpInterceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SettingsComponent } from './components/settings/settings.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FilterUsersPipe } from './pipes/filter-users.pipe';



const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [AppComponent, PlayingNowComponent, BodyComponent, HeaderComponent,
    UtilsComponent, SongComponent, SearchPipe, UploadSongComponent, SettingsComponent, FilterUsersPipe],
  imports: [
    SocketIoModule.forRoot(config),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatBottomSheetModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatCardModule,
    MatBadgeModule,
    FormsModule,
    HttpClientModule,
    MatSliderModule,
    MatSnackBarModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatChipsModule,
    FormsModule
  ],
  entryComponents: [UploadSongComponent, SettingsComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WinAuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
