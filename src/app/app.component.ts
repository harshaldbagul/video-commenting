import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommentDialogComponent } from './dialogs/comment-dialog/comment-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  progressBarPosition = 0;
  seekTooltipPosition: string;
  seekTo: number;
  videoComments = [];
  // comments = [
  //   {
  //     timestamp: 120,
  //     text: 'Comment 1',
  //   },
  //   {
  //     timestamp: 63,
  //     text: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
  //   },
  //   {
  //     timestamp: 367,
  //     text: 'Comment 3',
  //   },
  // ];

  constructor(public dialog: MatDialog) {}

  @ViewChild('videoPlayer') videoPlayer: ElementRef;

  ngOnInit(): void {}

  togglePlayPause() {
    const video: HTMLVideoElement = this.videoPlayer.nativeElement;
    video.paused ? video.play() : video.pause();
  }

  updateProgressBarPosition() {
    const video: HTMLVideoElement = this.videoPlayer.nativeElement;
    this.progressBarPosition = (video.currentTime / video.duration) * 100;
  }

  updateSeek(event, target: HTMLElement) {
    const video: HTMLVideoElement = this.videoPlayer.nativeElement;
    const skipTo = Math.round(
      (event.offsetX / target.clientWidth) * video.duration
    );
    const rect = video.getBoundingClientRect();
    this.seekTo = skipTo;
    this.seekTooltipPosition = `${event.pageX - rect.left}`;
  }

  onSeek(seekTo: number) {
    const video: HTMLVideoElement = this.videoPlayer.nativeElement;
    video.currentTime = seekTo;
    this.progressBarPosition = (video.currentTime / video.duration) * 100;
    video.play();
  }

  openCommentDialog(event): void {
    event.preventDefault();
    const dialogRef = this.dialog.open(CommentDialogComponent, {
      width: '300px',
      data: { timestamp: this.seekTo },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.videoComments.push(result);
        this.videoComments.sort((a, b) => a.timestamp - b.timestamp);
      }
    });
  }
}
