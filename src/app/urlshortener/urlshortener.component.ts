import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgTinyUrlModule } from 'ng-tiny-url';
import { NgTinyUrlService } from 'ng-tiny-url';

@Component({
  selector: 'app-urlshortener',
  templateUrl: './urlshortener.component.html',
  styleUrls: ['./urlshortener.component.css']
})
export class UrlshortenerComponent implements OnInit {
  fullURL: any;
  shortURL: any;
  isSubmitted = false;

  constructor(private tinyURL: NgTinyUrlService) { }

  ngOnInit(): void { }

  onSubmitForm(form: NgForm) {
    this.tinyURL.shorten(form.value.fullURL).subscribe(res => {
      this.shortURL = res;
      console.log(this.shortURL);
    });
    this.isSubmitted = true;
  }
}
