import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ConversationComponent } from './conversation/conversation.component';
import { ProfileComponent } from './profile/profile.component';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { SearchPipe } from './pipes/search';
import {FormsModule} from '@angular/forms';
import { environment } from 'src/environments/environment';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AuthenticationGuard} from './services/authentication.guard'
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { config } from 'rxjs';
import { RequestComponent } from './modals/request/request.component';
import { ContactComponent } from './contact/contact.component';

const appRoutes:Routes =[
  {path:'',component:HomeComponent},
  {path:'home', component:HomeComponent, canActivate:[AuthenticationGuard]},
  {path:'login', component:LoginComponent},
  {path:'conversation/:uid', component:ConversationComponent},
  {path:'profile', component:ProfileComponent, canActivate:[AuthenticationGuard]}
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ConversationComponent,
    ProfileComponent,
    MenuComponent,
    SearchPipe,
    RequestComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,// esta importacion sirve para poder utilizar el ngModel
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ImageCropperModule,
    NgbModule.forRoot(),
    BootstrapModalModule.forRoot({container:document.body})
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[RequestComponent]
})
export class AppModule { }
