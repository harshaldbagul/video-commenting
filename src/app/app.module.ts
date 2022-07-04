import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CommentDialogComponent } from './dialogs/comment-dialog/comment-dialog.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { FormatTimePipe } from './pipes/format-time.pipe';
import { VideoComponent } from './components/video/video.component';
@NgModule({
  declarations: [AppComponent, CommentDialogComponent, FormatTimePipe, VideoComponent],
  imports: [
    BrowserModule,
    FormsModule,
    NoopAnimationsModule,
    MatDialogModule,
    MatButtonModule,MatFormFieldModule,MatInputModule
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
