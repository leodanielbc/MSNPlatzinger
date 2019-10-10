import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestsService } from '../services/requests.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  friends: User[];
  query:string='';
  user:User;
  friendEmail:string='';

  constructor(private userServices:UserService,
              private authenticationService:AuthenticationService,
              private router:Router,
              private modalService: NgbModal,
              private requestService:RequestsService) {
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
        if(this.user.friends){
          this.user.friends = Object.values(this.user.friends);//transforma los elementos en objetos, ordena los valores que obtenemos
          console.log(this.user);
        }
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
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  sendRequest(){
    const request = {
      timestamp: Date.now(),
      receiver_email: this.friendEmail,
      sender: this.user.uid,
      status: 'pending'
    };
    this.requestService.createRequest(request).then(()=>{
      alert('Solicitud enviada');
    }).catch((error)=>{
      alert('Hubo un error');
      console.log(error);
    });
  }
}
