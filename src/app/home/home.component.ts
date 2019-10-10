import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  friends: User[];
  query:string='';
  user:User;
  constructor(private userServices:UserService,
              private authenticationService:AuthenticationService,
              private router:Router) {
    userServices.getUsers().valueChanges().subscribe((data:User[])=>{
      this.friends=data;
    },(error)=>{
      console.log(error);
    });
    this.userAutenticado();
  }
  userAutenticado(){
    this.authenticationService.getStatus().subscribe((status)=>{
      this.userServices.getUserById(status.uid).valueChanges().subscribe((data:User)=>{
        this.user=data;
        console.log(this.user);
      },(error)=>{
        console.log(error);
      });
    },(error)=>{
      console.log(error);
    });
  }
  ngOnInit() {
  }
  logout(){
    this.authenticationService.logout().then(()=>{
      alert('Sesión Cerrada Correctamente');
      this.router.navigate(['login']);
    }).catch((error)=>{
      console.log(error)
    });
  }
}
