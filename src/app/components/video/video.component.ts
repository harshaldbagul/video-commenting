import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommentDialogComponent } from 'src/app/dialogs/comment-dialog/comment-dialog.component';
import { VideoComment } from '../../models/VideoComment';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {
  progressBarPosition = 0;
  seekTooltipPosition: string;
  seekTo: number;
  videoComments: VideoComment[] = [];
  VIDEO_URL =
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

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

    dialogRef.afterClosed().subscribe((result: VideoComment) => {
      if (result) {
        this.videoComments.push(result);
        this.videoComments.sort((a, b) => a.timestamp - b.timestamp);
      }
    });
  }
}
