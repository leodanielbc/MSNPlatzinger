import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  friends: User[];
  constructor() {
    let usuario1:User = {
      nick: 'Leonardo',
      subnick: 'Hola!',
      age: 28,
      email: 'leo@gmail.com',
      friend: true,
      status:'online',
      uid: 1
    };
    let usuario2:User={
      nick: 'Yuliana',
      subnick: 'Mi mensaje personal',
      age: 25,
      email: 'yuliana@platzi.com',
      friend: true,
      status:'busy',
      uid:2
    };
    let usuario3:User={
      nick: 'Maria',
      subnick: 'Mi mensaje personal',
      age: 22,
      email: 'maria@platzi.com',
      friend: false,
      status:'away',
      uid:3
    };
    let usuario4:User={
      nick: 'Rosi',
      subnick: 'My messange',
      age: 22,
      email: 'rous@gmail.com',
      friend: false,
      status:'offline',
      uid:3
    };

    this.friends=[usuario1, usuario2, usuario3, usuario4];
  }
  getFriends(){
    return this.friends;
  }
}
