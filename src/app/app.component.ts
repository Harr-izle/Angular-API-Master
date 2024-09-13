import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './service/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Angular-API-Master';
  constructor(private apiService:ApiService){}

  ngOnInit(){
    this.apiService.getPost().subscribe(data => console.log(data));
  }
}
