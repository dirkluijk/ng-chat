import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User, UserInfo } from 'firebase/auth';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { Message } from './message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements AfterViewInit {
  newMessageBody: string;
  messages$: Observable<Message[]>;
  user?: User;

  @ViewChild('scrollContainer') private scrollContainer: ElementRef<HTMLElement>;

  private messageCollection: AngularFirestoreCollection<Message>;

  constructor(db: AngularFirestore, private afAuth: AngularFireAuth) {
    this.messageCollection = db.collection<Message>('messages', ref => ref.orderBy('datePosted'));
    this.messages$ = this.messageCollection.valueChanges();

    this.messages$.subscribe(() => this.scrollToBottom());

    afAuth.user.pipe(first()).subscribe(user => this.user = user);
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    setTimeout(() => this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight);
  }

  send(event: KeyboardEvent): void {
    event.preventDefault();

    if (!this.newMessageBody) {
      return;
    }

    this.messageCollection.add({
      user: this.user.toJSON() as UserInfo,
      body: this.newMessageBody,
      datePosted: new Date().getTime()
    });

    this.newMessageBody = '';
  }
}
