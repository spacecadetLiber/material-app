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

  //User options
  selectedColor: string;
  selectedFont: string;
  selectedSize: string;

  //INTERFACE
  results: response;
  
  //PROPRIEDADE
  htmlText: string;
  
  //Parameters to send to the API
  params = {
    "handwriting_id": "8X3WQ4D800B0",
    "text": "",
    "handwriting_size": "",
    "handwriting_color": "",
  }
  
  //The property wich will receive tha API data
  png: string;
  
  //Hides the error div - True by default
  hide: boolean = true;

//Constructor: HTTPCLient dependency injection
  constructor(private http: HttpClient) { }

  ngOnInit() {}

  onSubmit({ valid }: { valid: boolean }, f: any) {
    
 //If the form is not valid (driven forms, all fields are connected), the div error shows
    if (!valid) {
      this.hide = false;
      this.htmlText = `
        <div>
        <strong>Ups!</strong> Did you forget to type in something? Try again!
      </div>`;
      
      //if the form is valid, the script hides the error div and sends the request
    } else {
      //Return to default value
      this.hide = true;
      
      //Color param needed to be enconded
      let color = encodeURIComponent(this.params.handwriting_color);
      
      // In the url const, the params are sent
      const url =
        `https://api.handwriting.io/render/png?handwriting_id=${this.params.handwriting_id}&text=${this.params.text}&handwriting_size=${this.params.handwriting_size}&handwriting_color=${color}`;
      
      // Atribution to the png property the url itself;
      this.png = url;
      
      // The GET request performed with the request headers (user and pass)
      this.http.get<Response>(url, {
        headers: new HttpHeaders().set('Authorization', 'Basic ' + btoa('STRSKVENJVBD0JDS:4ZN6VD256FEBHSM1'))
      })
      //returns an observable
        .subscribe(data => {
          Response = data['results'];

        //In case of an error
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

  //User options
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

