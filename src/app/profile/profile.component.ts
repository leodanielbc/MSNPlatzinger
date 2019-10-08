import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:User;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  picture:any;
  constructor(private userService:UserService,
              private authenticationService:AuthenticationService,
              private firebaseStorage:AngularFireStorage) {

                this.authenticationService.getStatus().subscribe((status)=>{
      this.userService.getUserById(status.uid).valueChanges().subscribe((data:User)=>{
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
  //metodo guardar imagen o avatar
  saveSettings(){
    if(this.croppedImage){//verificamos si la img esta recortada
      const currentPictureId = Date.now;
      //se referencia un path en el storage, firebase recibe la imagen codificada(putstring)
      const pictures = this.firebaseStorage.ref('pictures/'+currentPictureId+'.jpg').putString(this.croppedImage,'data_url');
      //el ref regresa una promesa
      pictures.then((result)=>{
        //se genera con firebaseStorage una URL para el formato binario(putString). volvemos a referenciar la img para obtener la URL de la imagen de la foto q se acaba de subir
        this.picture = this.firebaseStorage.ref('pictures/'+currentPictureId+'.jpg').getDownloadURL();
        //Aqui se obtiene ya la URL en texto no en string(p)
        this.picture.subscribe((pictureURL)=>{
          this.userService.setAvatar(pictureURL,this.user.uid).then(()=>{
            alert('Avatar subido correctamente');
          }).catch((error)=>{
            alert('Hubo un error al tratar de subir la imagen');
            console.log(error);
          });
        });
      }).catch((error)=>{
        console.log(error);
      })
    }else{
      this.userService.editUser(this.user).then(()=>{
        alert('Cambios Guardados');
      }).catch((error)=>{
        alert('Hubo un Error!');
        console.log(error);
      });
      }
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }
  imageLoaded() {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }
}
