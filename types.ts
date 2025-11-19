export interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: number;
}

export interface WebhookResponse {
  text: string;
}

export enum Sender {
  User = 'Você',
  AI = 'SimpIA'
}