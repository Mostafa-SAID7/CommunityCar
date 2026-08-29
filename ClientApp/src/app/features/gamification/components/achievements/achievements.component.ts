import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroTrophy, heroStar, heroBolt, heroFire, heroHandThumbUp } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [CommonModule, NgIcon],
  providers: [provideIcons({ heroTrophy, heroStar, heroBolt, heroFire, heroHandThumbUp })],
  template: `
    <div class="min-h-screen bg-slate-50 dark:bg-slate-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div class="max-w-6xl mx-auto space-y-8">
        
        <!-- Header -->
        <div class="flex flex-col items-center justify-center text-center space-y-4 mb-12">
          <div class="inline-flex items-center justify-center p-4 bg-primary-100 dark:bg-primary-900/30 rounded-3xl mb-2">
            <ng-icon name="heroTrophy" class="w-12 h-12 text-primary-600 dark:text-primary-400"></ng-icon>
          </div>
          <h1 class="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Your Achievements</h1>
          <p class="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">Unlock achievements by participating in the community, helping others, and attending events. Show off your accomplishments!</p>
        </div>

        <!-- Progress Overview -->
        <div class="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row items-center gap-8 mb-12">
          <div class="w-full md:w-1/3 flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700 pb-8 md:pb-0">
            <div class="text-6xl font-black text-slate-900 dark:text-white mb-2">12<span class="text-3xl text-slate-400">/40</span></div>
            <p class="text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider text-sm">Achievements Unlocked</p>
          </div>
          <div class="w-full md:w-2/3 space-y-4">
            <div class="flex justify-between text-sm font-medium">
              <span class="text-slate-700 dark:text-slate-300">Master Mechanic Journey</span>
              <span class="text-primary-600 dark:text-primary-400">30%</span>
            </div>
            <div class="w-full h-4 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-primary-500 to-indigo-500 rounded-full" style="width: 30%"></div>
            </div>
            <p class="text-sm text-slate-500 dark:text-slate-400">Unlock 3 more achievements to reach the next milestone!</p>
          </div>
        </div>

        <!-- Achievements Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <!-- Unlocked Achievement -->
          <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-emerald-200 dark:border-emerald-900/50 relative overflow-hidden group">
            <div class="absolute -right-6 -top-6 w-24 h-24 bg-emerald-50 dark:bg-emerald-900/20 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out"></div>
            <div class="relative z-10 flex items-start gap-4">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/30 text-white">
                <ng-icon name="heroBolt" class="w-7 h-7"></ng-icon>
              </div>
              <div>
                <h3 class="font-bold text-slate-900 dark:text-white text-lg">Fast Starter</h3>
                <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Completed your profile and made your first post within 24 hours.</p>
                <div class="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
                  <span>Unlocked on Oct 12, 2023</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Unlocked Achievement 2 -->
          <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-amber-200 dark:border-amber-900/50 relative overflow-hidden group">
            <div class="absolute -right-6 -top-6 w-24 h-24 bg-amber-50 dark:bg-amber-900/20 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out"></div>
            <div class="relative z-10 flex items-start gap-4">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/30 text-white">
                <ng-icon name="heroFire" class="w-7 h-7"></ng-icon>
              </div>
              <div>
                <h3 class="font-bold text-slate-900 dark:text-white text-lg">Hot Streak</h3>
                <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Logged in for 7 consecutive days and engaged with content.</p>
                <div class="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 text-xs font-semibold">
                  <span>Unlocked on Nov 05, 2023</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Locked Achievement (In Progress) -->
          <div class="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 relative overflow-hidden grayscale-[50%] hover:grayscale-0 transition-all duration-300">
            <div class="flex items-start gap-4 mb-4">
              <div class="w-14 h-14 rounded-2xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center flex-shrink-0 text-slate-400 dark:text-slate-500">
                <ng-icon name="heroHandThumbUp" class="w-7 h-7"></ng-icon>
              </div>
              <div>
                <h3 class="font-bold text-slate-700 dark:text-slate-300 text-lg">Helpful Hand</h3>
                <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Receive 50 upvotes on your answers in the community Q&A.</p>
              </div>
            </div>
            <div class="mt-4 space-y-2">
              <div class="flex justify-between text-xs font-medium text-slate-500">
                <span>Progress: 32 / 50</span>
                <span>64%</span>
              </div>
              <div class="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div class="h-full bg-slate-400 dark:bg-slate-500 rounded-full" style="width: 64%"></div>
              </div>
            </div>
          </div>
          
          <!-- Locked Achievement -->
          <div class="bg-slate-50 dark:bg-slate-800/30 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 relative overflow-hidden opacity-75 grayscale">
            <div class="flex items-start gap-4">
              <div class="w-14 h-14 rounded-2xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center flex-shrink-0 text-slate-400 dark:text-slate-500">
                <ng-icon name="heroStar" class="w-7 h-7"></ng-icon>
              </div>
              <div>
                <h3 class="font-bold text-slate-700 dark:text-slate-300 text-lg">Local Legend</h3>
                <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Attend 5 official local car meetups and check-in via the app.</p>
                <div class="mt-3 text-xs font-medium text-slate-400 flex items-center gap-1">
                  <ng-icon name="heroTrophy" class="w-3.5 h-3.5"></ng-icon> Reward: 500 pts
                </div>
              </div>
            </div>
          </div>
          
        </div>
        
      </div>
    </div>
  `
})
export class AchievementsComponent { }