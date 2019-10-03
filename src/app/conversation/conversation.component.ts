import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  friendId: any;
  friends: User[];
  friend: User;

  price:number = 78.2273;
  today:any= Date.now();

  constructor(private activatedRoute: ActivatedRoute,
              private userService:UserService) {
    this.friendId = this.activatedRoute.snapshot.params['uid'];
    this.friends = userService.getFriends();
    this.friend = this.friends.find((record)=>{
      return record.uid == this.friendId;
    });
    console.log(this.friend);
  }
  ngOnInit() {
  }

}
