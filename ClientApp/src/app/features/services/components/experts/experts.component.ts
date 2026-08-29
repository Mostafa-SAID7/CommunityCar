import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroUserGroup, heroStar, heroChatBubbleLeftRight, heroVideoCamera, heroMapPin, heroCheckBadge } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-experts',
  standalone: true,
  imports: [CommonModule, NgIcon],
  providers: [provideIcons({ heroUserGroup, heroStar, heroChatBubbleLeftRight, heroVideoCamera, heroMapPin, heroCheckBadge })],
  template: `
    <div class="min-h-screen bg-slate-50 dark:bg-slate-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div class="max-w-7xl mx-auto space-y-10">
        
        <!-- Header -->
        <div class="text-center space-y-4 max-w-3xl mx-auto">
          <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Ask an Expert</h1>
          <p class="text-lg text-slate-600 dark:text-slate-400">Connect with certified mechanics and automotive professionals for personalized advice, diagnostics, and second opinions.</p>
        </div>

        <!-- Filters & Search -->
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div class="flex flex-wrap gap-2 w-full sm:w-auto">
            <button class="px-4 py-2 rounded-xl bg-primary-600 text-white font-medium text-sm transition-colors">All Experts</button>
            <button class="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">Mechanics</button>
            <button class="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">Detailers</button>
            <button class="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">Performance</button>
          </div>
        </div>

        <!-- Experts Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          
          <!-- Expert Card -->
          <div *ngFor="let item of [1,2,3,4,5,6]" class="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 group">
            <div class="flex items-start gap-4">
              <div class="relative">
                <div class="w-20 h-20 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-slate-800 overflow-hidden shadow-md">
                  <img src="/assets/images/default-avatar.png" alt="Expert" class="w-full h-full object-cover">
                </div>
                <div class="absolute -bottom-1 -right-1 bg-white dark:bg-slate-800 rounded-full p-0.5">
                  <ng-icon name="heroCheckBadge" class="w-6 h-6 text-primary-500"></ng-icon>
                </div>
              </div>
              
              <div class="flex-1">
                <div class="flex justify-between items-start">
                  <div>
                    <h3 class="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">Sarah Jenkins</h3>
                    <p class="text-sm text-slate-500 dark:text-slate-400">Master ASE Technician</p>
                  </div>
                  <div class="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 px-2 py-1 rounded-lg text-sm font-bold">
                    <ng-icon name="heroStar" class="w-4 h-4"></ng-icon>
                    <span>4.9</span>
                  </div>
                </div>
                
                <div class="mt-2 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <span class="flex items-center gap-1"><ng-icon name="heroMapPin" class="w-4 h-4"></ng-icon> Austin, TX</span>
                  <span>15 yrs exp.</span>
                </div>
              </div>
            </div>
            
            <div class="mt-5 pt-5 border-t border-slate-100 dark:border-slate-700/50">
              <p class="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">Specializing in European vehicle diagnostics, electrical systems, and preventative maintenance for Audi, BMW, and Porsche.</p>
              
              <div class="mt-4 flex flex-wrap gap-2">
                <span class="px-2.5 py-1 bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-600">Diagnostics</span>
                <span class="px-2.5 py-1 bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-600">European</span>
                <span class="px-2.5 py-1 bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-600">Electrical</span>
              </div>
            </div>
            
            <div class="mt-6 flex gap-3">
              <button class="flex-1 inline-flex justify-center items-center gap-2 px-4 py-2.5 border border-primary-600 text-primary-600 dark:text-primary-400 dark:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 text-sm font-semibold rounded-xl transition-colors">
                <ng-icon name="heroChatBubbleLeftRight" class="w-5 h-5"></ng-icon>
                Message
              </button>
              <button class="flex-1 inline-flex justify-center items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm shadow-primary-500/30">
                <ng-icon name="heroVideoCamera" class="w-5 h-5"></ng-icon>
                Book Call
              </button>
            </div>
          </div>

        </div>
        
      </div>
    </div>
  `
})
export class ExpertsComponent { }