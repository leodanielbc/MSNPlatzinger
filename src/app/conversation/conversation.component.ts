import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';
import { ConversationService } from '../services/conversation.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  friendId: any;
  public friend: User;
  friends:User[];
  user:User;
  conversation_id:string;//guardar el id unico (idUser1 y idUser2)
  textMessage: string;
  conversation:any[];
  shake:boolean=false;

  constructor(private activatedRoute: ActivatedRoute,
              private userService:UserService,
              private conversationService:ConversationService,
              private authenticationService:AuthenticationService) {
    this.friendId = this.activatedRoute.snapshot.params['uid'];

    this.getFriends();
    this.generateIdUnic();

  }
  ngOnInit() {
  }
  // conversationTofriend(id){
  //   this.friend = this.friends.find((record)=>{
  //     return record.uid == id;
  //   });
  //}

  //se crea un ID unico usando los dos IDs de los usuarios
  generateIdUnic(){
    this.authenticationService.getStatus().subscribe((getSession)=>{
      this.userService.getUserById(getSession.uid).valueChanges().subscribe((user:User)=>{
        this.user=user;
        this.userService.getUserById(this.friendId).valueChanges().subscribe((data:User)=>{
          this.friend=data;
          const ids=[this.user.uid, this.friend.uid].sort();
          this.conversation_id = ids.join('|');
          this.getConversation();
        },(error)=>{
          console.log(error);
        });
      });
    })
  }
  getFriends(){
    this.userService.getUsers().valueChanges().subscribe((data:User[])=>{
      this.friends=data;
    },(error)=>{
      console.log(error);
    });
  }
  sendMessage(){
    const message={
      uid: this.conversation_id,
      timestamp: Date.now(),
      text: this.textMessage,
      sender: this.user.uid,
      receiver: this.friend.uid,
      type:'text'
    }
    this.conversationService.createConversation(message).then(()=>{
      this.textMessage = '';
    });
  }
  sendZumbido(){
    const message={
      uid: this.conversation_id,
      timestamp: Date.now(),
      text: null,
      sender: this.user.uid,
      receiver: this.friend.uid,
      type:'zumbido'
    }
    this.conversationService.createConversation(message).then(()=>{});
    this.doZumbido();
  }
  doZumbido(){
    const audio = new Audio('assets/sound/zumbido.m4a');
    audio.play();
    this.shake=true;
    window.setTimeout(()=>{
      this.shake=false
    },1000);
  }
  getConversation(){
    this.conversationService.getConversation(this.conversation_id).valueChanges().subscribe((data)=>{
      console.log(data);
      this.conversation = data;
      this.conversation.forEach((message)=>{
        if(!message.seen){
          message.seen = true;//lo marcamos como visto
          this.conversationService.editConversation(message);
          if(message.type==='text'){
            const audio = new Audio('assets/sound/new_message.m4a');
            audio.play();
          }else if(message.type==='zumbido'){
            this.doZumbido();
          }
        }
      })
    },(error)=>{
      console.log(error);
    });
  }
  getUserNickById(id){
    if(id === this.friend.uid){
      return this.friend.nick;
    }else{
      return this.user.nick;
    }
  }
}
