import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  friends: User[];
  constructor() {
    let usuario1:User = {
      nick: 'Leonardo',
      subnick: 'Hola!',
      age: 28,
      email: 'leo@gmail.com',
      friend: true,
      uid: 1
    };
    let usuario2:User={
      nick: 'Yuliana',
      subnick: 'Mi mensaje personal',
      age: 25,
      email: 'yuliana@platzi.com',
      friend: true,
      uid:2
    };
    let usuario3:User={
      nick: 'Maria',
      subnick: 'Mi mensaje personal',
      age: 22,
      email: 'maria@platzi.com',
      friend: false,
      uid:3
    };

    this.friends=[usuario1, usuario2, usuario3];
  }

  ngOnInit() {
  }

}
