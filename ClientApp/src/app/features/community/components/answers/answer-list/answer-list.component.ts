
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Answer {
  id: string;
  content: string;
  author: string;
  votes: number;
}

@Component({
  selector: 'app-answer-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.scss']
})
export default class AnswerListComponent {
  answers: Answer[] = [
    { id: '1', content: 'Yes, you can!', author: 'Alice', votes: 2 },
    { id: '2', content: 'Try this method.', author: 'Bob', votes: 5 },
    { id: '3', content: 'Contact support.', author: 'Charlie', votes: 1 },
    { id: '4', content: 'Check the manual.', author: 'Dana', votes: 0 }
  ];

  upvote(answer: Answer) {
    answer.votes++;
  }

  downvote(answer: Answer) {
    if (answer.votes > 0) answer.votes--;
  }
}
