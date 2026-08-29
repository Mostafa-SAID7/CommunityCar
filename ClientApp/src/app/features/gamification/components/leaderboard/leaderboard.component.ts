import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroTrophy, heroArrowTrendingUp, heroArrowTrendingDown, heroMinus, heroStar } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule, NgIcon],
  providers: [provideIcons({ heroTrophy, heroArrowTrendingUp, heroArrowTrendingDown, heroMinus, heroStar })],
  template: `
    <div class="min-h-screen bg-slate-50 dark:bg-slate-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div class="max-w-4xl mx-auto space-y-8">
        
        <!-- Header Section -->
        <div class="text-center space-y-4">
          <div class="inline-flex items-center justify-center p-3 bg-amber-100 dark:bg-amber-900/30 rounded-2xl mb-4">
            <ng-icon name="heroTrophy" class="w-10 h-10 text-amber-500"></ng-icon>
          </div>
          <h1 class="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Community Leaderboard</h1>
          <p class="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">See who is leading the pack. Earn points by helping others, posting guides, and engaging with the community.</p>
        </div>

        <!-- Top 3 Podium -->
        <div class="flex flex-col sm:flex-row justify-center items-end gap-4 sm:gap-6 pt-10 pb-6">
          <!-- Rank 2 -->
          <div class="w-full sm:w-1/3 flex flex-col items-center order-2 sm:order-1">
            <div class="relative w-20 h-20 mb-4">
              <img src="/assets/images/default-avatar.png" alt="Rank 2" class="w-full h-full rounded-full border-4 border-slate-300 dark:border-slate-600 object-cover shadow-lg">
              <div class="absolute -bottom-3 -right-2 w-8 h-8 bg-slate-300 dark:bg-slate-600 rounded-full flex items-center justify-center font-bold text-slate-800 dark:text-white text-sm shadow-md border-2 border-white dark:border-slate-800">2</div>
            </div>
            <h3 class="font-bold text-slate-900 dark:text-white">Jane Smith</h3>
            <p class="text-primary-600 dark:text-primary-400 font-medium">12,450 pts</p>
            <div class="w-full h-24 sm:h-32 bg-slate-200 dark:bg-slate-800 rounded-t-2xl mt-4 border-t border-l border-r border-slate-300 dark:border-slate-700 shadow-inner"></div>
          </div>

          <!-- Rank 1 -->
          <div class="w-full sm:w-1/3 flex flex-col items-center order-1 sm:order-2">
            <div class="relative w-28 h-28 mb-4">
              <div class="absolute -top-6 left-1/2 -translate-x-1/2 text-amber-400 z-10 animate-bounce">
                <ng-icon name="heroStar" class="w-8 h-8 fill-current"></ng-icon>
              </div>
              <img src="/assets/images/default-avatar.png" alt="Rank 1" class="w-full h-full rounded-full border-4 border-amber-400 object-cover shadow-xl">
              <div class="absolute -bottom-3 -right-2 w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center font-bold text-amber-900 text-lg shadow-md border-2 border-white dark:border-slate-800">1</div>
            </div>
            <h3 class="font-bold text-lg text-slate-900 dark:text-white">John Doe</h3>
            <p class="text-primary-600 dark:text-primary-400 font-bold">15,200 pts</p>
            <div class="w-full h-32 sm:h-40 bg-gradient-to-t from-amber-100 to-amber-50 dark:from-amber-900/40 dark:to-slate-800 rounded-t-2xl mt-4 border-t-2 border-l border-r border-amber-300 dark:border-amber-700/50 shadow-inner"></div>
          </div>

          <!-- Rank 3 -->
          <div class="w-full sm:w-1/3 flex flex-col items-center order-3 sm:order-3">
            <div class="relative w-20 h-20 mb-4">
              <img src="/assets/images/default-avatar.png" alt="Rank 3" class="w-full h-full rounded-full border-4 border-amber-700 dark:border-amber-800 object-cover shadow-lg">
              <div class="absolute -bottom-3 -right-2 w-8 h-8 bg-amber-700 dark:bg-amber-800 rounded-full flex items-center justify-center font-bold text-white text-sm shadow-md border-2 border-white dark:border-slate-800">3</div>
            </div>
            <h3 class="font-bold text-slate-900 dark:text-white">Mike Johnson</h3>
            <p class="text-primary-600 dark:text-primary-400 font-medium">10,800 pts</p>
            <div class="w-full h-20 sm:h-24 bg-slate-200 dark:bg-slate-800 rounded-t-2xl mt-4 border-t border-l border-r border-slate-300 dark:border-slate-700 shadow-inner"></div>
          </div>
        </div>

        <!-- Leaderboard List -->
        <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div class="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 flex justify-between items-center">
            <h2 class="font-semibold text-slate-900 dark:text-white">Global Ranking</h2>
            <select class="appearance-none bg-transparent text-sm font-medium text-slate-600 dark:text-slate-400 focus:outline-none focus:ring-0 cursor-pointer">
              <option>This Week</option>
              <option>This Month</option>
              <option>All Time</option>
            </select>
          </div>
          
          <ul class="divide-y divide-slate-200 dark:divide-slate-700">
            <li *ngFor="let item of [4,5,6,7,8,9,10]" class="px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors flex items-center gap-4">
              <div class="w-8 font-bold text-slate-400 text-center">{{item}}</div>
              
              <div class="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden flex-shrink-0">
                <img src="/assets/images/default-avatar.png" alt="Avatar" class="w-full h-full object-cover">
              </div>
              
              <div class="flex-1">
                <h4 class="font-semibold text-slate-900 dark:text-white">User {{item}}</h4>
                <p class="text-sm text-slate-500 dark:text-slate-400">Level {{20 - item}}</p>
              </div>
              
              <div class="text-right">
                <div class="font-bold text-slate-900 dark:text-white">{{10000 - (item * 450)}} pts</div>
                <div class="text-xs flex items-center justify-end gap-1" [ngClass]="{'text-emerald-500': item % 2 === 0, 'text-rose-500': item % 3 === 0, 'text-slate-400': item % 2 !== 0 && item % 3 !== 0}">
                  <ng-icon *ngIf="item % 2 === 0" name="heroArrowTrendingUp" class="w-3 h-3"></ng-icon>
                  <ng-icon *ngIf="item % 3 === 0" name="heroArrowTrendingDown" class="w-3 h-3"></ng-icon>
                  <ng-icon *ngIf="item % 2 !== 0 && item % 3 !== 0" name="heroMinus" class="w-3 h-3"></ng-icon>
                  <span>{{item % 2 === 0 ? '+2' : (item % 3 === 0 ? '-1' : '0')}}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>

      </div>
    </div>
  `
})
export class LeaderboardComponent { }