import { Component, inject, OnInit } from '@angular/core';
import { UserChatService } from '../services/User/user-chat.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User, Channel } from 'stream-chat';
import { ChatClientService, ChannelService, StreamAutocompleteTextareaModule, StreamChatModule, StreamI18nService } from 'stream-chat-angular';
import { UserChatDTO } from '../core/models/user.model';
import {
  MissingTranslationHandler, TranslateCompiler, TranslateLoader, TranslateModule, TranslateParser, TranslateService, TranslateStore,
  USE_DEFAULT_LANG,
  USE_STORE,
  USE_EXTEND,
  DEFAULT_LANGUAGE,
} from '@ngx-translate/core';
import { EmptyCompiler, EmptyMissingTranslationHandler, EmptyParser, EmptyTranslateLoader } from './emptyloader';

@Component({
  selector: 'app-user-chat',
  imports: [CommonModule, RouterModule, TranslateModule, StreamAutocompleteTextareaModule, StreamChatModule],
  templateUrl: './user-chat.component.html',
  styleUrl: './user-chat.component.css',
  providers: [
    StreamI18nService,
    TranslateService,
    TranslateStore,
    { provide: TranslateLoader, useClass: EmptyTranslateLoader },
    { provide: TranslateCompiler, useClass: EmptyCompiler },
    { provide: TranslateParser, useClass: EmptyParser },
    { provide: MissingTranslationHandler, useClass: EmptyMissingTranslationHandler },
    { provide: USE_DEFAULT_LANG, useValue: 'en' }, // Provide the default language
    { provide: USE_STORE, useValue: false },       // Disable storing language
    { provide: USE_EXTEND, useValue: false },
    { provide: DEFAULT_LANGUAGE, useValue: 'en' }
  ],
})
export class UserChatComponent implements OnInit {
  private chatUserService = inject(UserChatService);
  private router = inject(Router);

  availableUsers: UserChatDTO[] = [];
  currentUser: UserChatDTO | null = new UserChatDTO('', '', '', '', new Date());
  selectedUser: UserChatDTO | null = null;
  onlineStatus: string = 'Offline';

  constructor(
    private chatService: ChatClientService,
    private channelService: ChannelService,
    private streamI18nService: StreamI18nService
  ) { }

  async ngOnInit(): Promise<void> {
    this.loadCurrentUser();
  }

  // Fetch the current user from the API and store it
  private loadCurrentUser(): void {
    this.chatUserService.getAvailableUsers().subscribe({
      next: (users: UserChatDTO[]) => {
        const credentials = JSON.parse(localStorage.getItem('credentials') || '{}');
        this.currentUser = users.find((user) => user.email === credentials.email) || null;

        if (!this.currentUser) {
          console.error('Current user not found in API.');
          return;
        }

        console.log('Current user:', this.currentUser);
        
        this.loadAvailableUsers();
      },
      error: (err) => console.error('Error fetching current user:', err),
    });
  }

  // Load all users except the current user
  private loadAvailableUsers(): void {
    this.chatUserService.getAvailableUsers().subscribe({
      next: (users: UserChatDTO[]) => {
        this.availableUsers = users.filter((user) => user.email !== this.currentUser?.email);
        this.initializeChat();
      },
      error: (err) => console.error('Error fetching users:', err),
    });
  }
// Initialize chat only once
private async initializeChat(): Promise<void> {
  if (this.chatService.chatClient.user?.id) {
    console.log('Chat service already initialized.');
    return;
  }

  if (!this.currentUser) {
    console.error('User not loaded. Cannot initialize chat.');
    return;
  }

  const { userId, fullName, userChatToken } = this.currentUser;
  if (!userId || !userChatToken) {
    console.error('Missing required user credentials (userId or token).');
    return;
  }

  const apiKey = 'st3gknapp8zn';
  const user: User = { id: userId, name: fullName };

  try {
    console.log('Initializing chat with user:', user);
    await this.chatService.init(apiKey, user, userChatToken);
    console.log('Chat initialized successfully.');
  } catch (error) {
    console.error('Error initializing chat:', error);
  }
}

// Start a new chat with another user
async startChat(otherUserId: string): Promise<void> {
  if (!this.currentUser) {
    console.error('Current user not initialized.');
    return;
  }

  const otherUser = this.availableUsers.find((user) => user.userId === otherUserId);
  if (!otherUser) {
    console.error('Selected user not found.');
    return;
  }

  // Ensure chat client is connected
  await this.initializeChat();

  const members = [this.currentUser.userId, otherUserId].sort();
  const channelId = `chat_${members[0]}_${members[1]}`;

  try {
    // Reset channel before opening a new one
    this.channelService.reset();

    const channel = this.chatService.chatClient.channel('messaging', channelId, { members });
    await channel.watch();

    this.channelService.init({ type: 'messaging', id: channelId });
    this.onlineStatus = channel.state.watcher_count > 0 ? 'Online' : 'Offline';

    console.log('Chat started with:', otherUser.fullName);
  } catch (error) {
    console.error('Error starting chat:', error);
  }
}

  // Start chat when the user is selected
  // async startChat(otherUserId: string): Promise<void> {
  //   if (!this.currentUser) {
  //     console.error('Current user not initialized yet.');
  //     return;
  //   }

  //   const otherUser = this.availableUsers.find((user) => user.userId === otherUserId);
  //   if (!otherUser) {
  //     console.error('Selected user not found.');
  //     return;
  //   }

  //   console.log("other: " + otherUserId);
  //   this.selectedUser = otherUser;

  //   const apiKey = 'st3gknapp8zn';
  //   const user: User = { id: this.currentUser.userId, name: this.currentUser.fullName };

  //   // Initialize chat service when needed (not during ngOnInit)
  //   this.chatService.init(apiKey, user, this.currentUser.userChatToken);

  //   const members = [this.currentUser.userId, otherUserId].sort();
  //   const channelId = `chat_${members[0]}_${members[1]}`;
  //   console.log("channelId: " + channelId);

  //   try {
  //     this.channelService.reset();
  //     const channel = this.chatService.chatClient.channel('messaging', channelId, {
  //       members,
  //     });
  //     await channel.watch();
  //     this.channelService.init({ type: 'messaging', id: channelId });

  //     this.onlineStatus = channel.state.watcher_count > 0 ? 'Online' : 'Offline';

  //     console.log('Chat started with:', otherUser.fullName);
  //   } catch (error) {
  //     console.error('Error starting chat:', error);
  //   }
  // }

  // private async initializeChat(): Promise<void> {
  //   if (this.chatService.chatClient) {
  //     console.log('Chat service already initialized.');
  //     return; // Avoid reinitializing
  //   }

  //   const apiKey = 'st3gknapp8zn';
  //   const credentials = this.currentUser; // Fetch user from API
  //   console.log(credentials?.userChatToken);
  //   if (!credentials || !credentials.userId || !credentials.userChatToken) {
  //     console.error('Missing user credentials.');
  //     return;
  //   }

  //   const user: User = { id: credentials.userId, name: credentials.fullName };

  //   try {
  //     await this.chatService.init(apiKey, user, credentials.userChatToken);
  //     console.log('Chat initialized successfully.');
  //   } catch (error) {
  //     console.error('Error initializing chat:', error);
  //   }
  // }

}

