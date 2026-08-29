import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import PostCardComponent from '../post-card/post-card.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, PostCardComponent],
  templateUrl: './post-list.component.html'
})
export default class PostListComponent {
  // Mock data for the UI
  posts = [
    {
      id: 1,
      title: 'Best tires for snowy conditions?',
      excerpt: 'I am moving to Colorado and need recommendations for winter tires for my Subaru Outback. I want something that handles ice well.',
      author: 'SnowDriver99',
      category: 'Maintenance',
      upvotes: 45,
      answersCount: 12,
      createdAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
      tags: ['tires', 'winter', 'subaru']
    },
    {
      id: 2,
      title: 'How to replace the cabin air filter in a 2018 Honda Civic?',
      excerpt: 'The dealership wants $60 to do this. I heard it takes 5 minutes. Does anyone have a step-by-step guide or video?',
      author: 'CivicOwner',
      category: 'DIY Repairs',
      upvotes: 120,
      answersCount: 5,
      createdAt: new Date(Date.now() - 86400000 * 5),
      tags: ['honda', 'civic', 'filter', 'diy']
    },
    {
      id: 3,
      title: 'Review: 2024 Toyota Prius Prime',
      excerpt: 'I just hit 1,000 miles on my new Prius Prime. Here are my thoughts on the EV range, interior comfort, and overall driving experience.',
      author: 'EcoDriver',
      category: 'Reviews',
      upvotes: 89,
      answersCount: 34,
      createdAt: new Date(Date.now() - 86400000 * 1),
      tags: ['toyota', 'prius', 'ev', 'hybrid']
    }
  ];
  
  categories = ['All', 'Maintenance', 'DIY Repairs', 'Reviews', 'Advice'];
  selectedCategory = 'All';

  setCategory(category: string) {
    this.selectedCategory = category;
  }
}
