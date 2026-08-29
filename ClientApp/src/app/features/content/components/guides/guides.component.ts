import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroBookOpen, heroClock, heroChevronRight, heroWrench, heroMagnifyingGlass } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-guides',
  standalone: true,
  imports: [CommonModule, NgIcon],
  providers: [provideIcons({ heroBookOpen, heroClock, heroChevronRight, heroWrench, heroMagnifyingGlass })],
  template: `
    <div class="min-h-screen bg-slate-50 dark:bg-slate-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div class="max-w-7xl mx-auto space-y-10">
        
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div class="max-w-2xl">
            <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Knowledge Base</h1>
            <p class="mt-3 text-lg text-slate-600 dark:text-slate-400">Comprehensive repair guides, maintenance schedules, and expert tutorials for your vehicle.</p>
          </div>
          
          <div class="w-full md:w-96 relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <ng-icon name="heroMagnifyingGlass" class="w-5 h-5 text-slate-400"></ng-icon>
            </div>
            <input type="text" class="block w-full pl-10 pr-3 py-3 border border-slate-300 dark:border-slate-700 rounded-2xl leading-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors shadow-sm" placeholder="Search guides, e.g. 'brake pad replacement'...">
          </div>
        </div>

        <!-- Featured Guide -->
        <div class="relative bg-primary-900 rounded-3xl overflow-hidden shadow-2xl">
          <div class="absolute inset-0 bg-gradient-to-r from-primary-900 to-primary-800/80 z-10"></div>
          <!-- Placeholder background image -->
          <div class="absolute inset-0 opacity-40 bg-[url('/assets/images/placeholder.png')] bg-cover bg-center"></div>
          
          <div class="relative z-20 p-8 sm:p-12 flex flex-col sm:flex-row items-center gap-8">
            <div class="flex-1 space-y-4">
              <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary-500/30 text-primary-200 border border-primary-400/30">
                Featured Tutorial
              </span>
              <h2 class="text-3xl sm:text-4xl font-bold text-white leading-tight">Complete Engine Bay Detailing Guide</h2>
              <p class="text-primary-100 text-lg max-w-xl">Learn the professional techniques to safely clean and dress your engine bay, making it look factory new without damaging sensitive electronics.</p>
              
              <div class="pt-4 flex flex-wrap items-center gap-6">
                <div class="flex items-center gap-2 text-primary-200 text-sm font-medium">
                  <ng-icon name="heroClock" class="w-5 h-5"></ng-icon>
                  <span>45 mins read</span>
                </div>
                <div class="flex items-center gap-2 text-primary-200 text-sm font-medium">
                  <ng-icon name="heroWrench" class="w-5 h-5"></ng-icon>
                  <span>Beginner Friendly</span>
                </div>
              </div>
            </div>
            
            <div class="w-full sm:w-auto">
              <button class="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-semibold rounded-xl text-primary-900 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-white transition-all transform hover:scale-105 shadow-lg">
                <ng-icon name="heroBookOpen" class="w-5 h-5 mr-2"></ng-icon>
                Read Guide
              </button>
            </div>
          </div>
        </div>

        <!-- Category Grid -->
        <div>
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white">Browse Categories</h3>
            <button class="text-primary-600 dark:text-primary-400 font-medium hover:underline flex items-center text-sm">
              View all <ng-icon name="heroChevronRight" class="w-4 h-4 ml-1"></ng-icon>
            </button>
          </div>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div *ngFor="let category of ['Maintenance', 'Repairs', 'Modifications', 'Troubleshooting']" class="group bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all cursor-pointer text-center">
              <div class="w-16 h-16 mx-auto bg-slate-50 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/30 transition-all duration-300">
                <ng-icon name="heroWrench" class="w-8 h-8 text-slate-400 group-hover:text-primary-600 dark:group-hover:text-primary-400"></ng-icon>
              </div>
              <h4 class="font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{{category}}</h4>
              <p class="text-sm text-slate-500 mt-1">12 Guides</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  `
})
export class GuidesComponent { }