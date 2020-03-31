import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-like-button',
  templateUrl: './like-button.component.html',
  styleUrls: ['./like-button.component.css']
})
export class LikeButtonComponent implements OnInit {
  @Input() nbLikes: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  handleLike() {
    this.nbLikes++;
  }

}
