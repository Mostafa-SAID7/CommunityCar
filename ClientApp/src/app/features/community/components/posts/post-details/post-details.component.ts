import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-details.component.html'
})
export default class PostDetailsComponent {
  post = {
    id: 1,
    title: 'Best tires for snowy conditions?',
    content: `I am moving to Colorado next month and need recommendations for winter tires for my Subaru Outback (2020 model). I want something that handles ice well and doesn't completely destroy my fuel economy when the roads are dry. 

I've been looking at the Michelin X-Ice Snow and the Bridgestone Blizzak WS90. Has anyone had experience with both of these on a crossover?

Thanks in advance for the help!`,
    author: {
      name: 'SnowDriver99',
      avatar: 'SD',
      rank: 'Enthusiast'
    },
    category: 'Maintenance',
    upvotes: 45,
    createdAt: new Date(Date.now() - 86400000 * 2),
    tags: ['tires', 'winter', 'subaru', 'colorado']
  };

  answers = [
    {
      id: 101,
      content: `I run the Blizzak WS90s on my Forester and they are absolutely incredible on ice and deep snow. The trade-off is they wear down a bit faster on dry pavement compared to the Michelins. If you are going to be driving in severe conditions frequently, go with Blizzak.`,
      author: {
        name: 'RockyMountainMechanic',
        avatar: 'RM',
        rank: 'Expert',
        isVerified: true
      },
      upvotes: 23,
      createdAt: new Date(Date.now() - 86400000 * 1.5),
      isAccepted: true
    },
    {
      id: 102,
      content: `I've had the X-Ice Snow for two seasons now. They are quieter on the highway than Blizzaks and feel a bit more responsive on dry roads. You can't go wrong with either, but I prefer the Michelins for mixed conditions.`,
      author: {
        name: 'DailyDriver',
        avatar: 'DD',
        rank: 'Member',
        isVerified: false
      },
      upvotes: 12,
      createdAt: new Date(Date.now() - 86400000 * 1),
      isAccepted: false
    }
  ];
}
