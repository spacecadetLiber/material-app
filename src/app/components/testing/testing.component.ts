import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { response } from '../../models/response';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})

export class TestingComponent implements OnInit {

  //OPÇÕES
  selectedColor: string;
  selectedFont: string;
  selectedSize: string;

  //INTERFACE
  results: response;
  htmlText: string;
  //PARAMS

  params = {
    "handwriting_id": "8X3WQ4D800B0",
    "text": "",
    "handwriting_size": "",
    "handwriting_color": "",
  }

  png: string;
  hide: boolean = true;


  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onSubmit({ valid }: { valid: boolean }, f: any) {
    if (!valid) {
      this.hide = false;
      this.htmlText = `
        <div>
        <strong>Ups!</strong> Did you forgot to type in something? Try again!
      </div>`;
    } else {
      this.hide = true;
      let color = encodeURIComponent(this.params.handwriting_color);
      const url =
        `https://api.handwriting.io/render/png?handwriting_id=${this.params.handwriting_id}&text=${this.params.text}&handwriting_size=${this.params.handwriting_size}&handwriting_color=${color}`;
      this.png = url;
      console.log(this.params);

      this.http.get<Response>(url, {
        headers: new HttpHeaders().set('Authorization', 'Basic ' + btoa('STRSKVENJVBD0JDS:4ZN6VD256FEBHSM1'))
      })
        .subscribe(data => {
          Response = data['results'];

        }, (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('An error occurred:', err.error.message);
          } else {
            console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
            console.log(Response);
          }
        });
    }
  }

  //OPÇÕES

  changeFont() {
    document.getElementById("output-text").style.fontFamily = this.selectedFont;
  }

  changeColor() {
    document.getElementById("output-text").style.color = this.selectedColor;
  }

  changeSize() {
    document.getElementById("output-text").style.fontSize = this.selectedSize;
  }


}

