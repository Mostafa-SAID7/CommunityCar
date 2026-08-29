import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroMapPin, heroStar, heroPhone, heroGlobeAlt, heroCalendarDays } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-garages',
  standalone: true,
  imports: [CommonModule, NgIcon],
  providers: [provideIcons({ heroMapPin, heroStar, heroPhone, heroGlobeAlt, heroCalendarDays })],
  template: `
    <div class="min-h-screen bg-slate-50 dark:bg-slate-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div class="max-w-7xl mx-auto space-y-10">
        
        <!-- Header & Map Placeholder -->
        <div class="bg-white dark:bg-slate-800 rounded-3xl p-2 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col lg:flex-row gap-2 overflow-hidden h-[400px]">
          <div class="w-full lg:w-1/3 p-6 flex flex-col justify-center bg-slate-50 dark:bg-slate-800/50 rounded-2xl h-full">
            <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">Find a Garage</h1>
            <p class="text-slate-600 dark:text-slate-400 mb-6">Discover trusted local mechanics and repair shops near you.</p>
            
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ng-icon name="heroMapPin" class="w-5 h-5 text-slate-400"></ng-icon>
              </div>
              <input type="text" class="block w-full pl-10 pr-3 py-3 border border-slate-300 dark:border-slate-600 rounded-xl leading-5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors shadow-sm" placeholder="Enter your zip code or city...">
            </div>
            
            <button class="mt-4 w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-xl transition-colors shadow-sm">
              Search Area
            </button>
          </div>
          <div class="w-full lg:w-2/3 bg-slate-200 dark:bg-slate-700 rounded-2xl relative overflow-hidden h-full flex items-center justify-center">
            <!-- Map Placeholder -->
            <div class="absolute inset-0 opacity-20 bg-[url('/assets/images/map-placeholder.jpg')] bg-cover bg-center"></div>
            <div class="z-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-6 py-3 rounded-full text-slate-700 dark:text-slate-200 font-medium border border-slate-200 dark:border-slate-700 shadow-lg">
              Interactive Map Integration Here
            </div>
          </div>
        </div>

        <!-- Featured Garages List -->
        <div>
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Top Rated Near You</h2>
            <select class="bg-transparent text-sm font-medium text-slate-600 dark:text-slate-400 focus:outline-none focus:ring-0 border-none cursor-pointer">
              <option>Highest Rated</option>
              <option>Closest to me</option>
              <option>Most Reviewed</option>
            </select>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Garage Card -->
            <div *ngFor="let item of [1,2,3,4]" class="flex flex-col sm:flex-row bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow duration-300">
              <div class="w-full sm:w-2/5 h-48 sm:h-auto bg-slate-200 dark:bg-slate-700 relative">
                <!-- Garage Image -->
                <div class="absolute inset-0 bg-gradient-to-tr from-slate-300 to-slate-200 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center">
                  <ng-icon name="heroMapPin" class="w-12 h-12 text-slate-400 opacity-50"></ng-icon>
                </div>
                <div class="absolute top-3 left-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1 shadow-sm">
                  <ng-icon name="heroStar" class="w-3.5 h-3.5 text-amber-500 fill-current"></ng-icon> 4.8 (124)
                </div>
              </div>
              
              <div class="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-1 hover:text-primary-600 dark:hover:text-primary-400 cursor-pointer transition-colors">Apex Performance Auto</h3>
                  <p class="text-sm text-slate-500 dark:text-slate-400 flex items-start gap-1.5 mb-3">
                    <ng-icon name="heroMapPin" class="w-4 h-4 mt-0.5 flex-shrink-0"></ng-icon>
                    <span>1234 Mechanics Way, Auto District<br>2.4 miles away</span>
                  </p>
                  
                  <div class="flex flex-wrap gap-1.5 mb-4">
                    <span class="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium rounded border border-slate-200 dark:border-slate-600">Suspension</span>
                    <span class="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium rounded border border-slate-200 dark:border-slate-600">Tuning</span>
                    <span class="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium rounded border border-slate-200 dark:border-slate-600">Alignment</span>
                  </div>
                </div>
                
                <div class="flex gap-2 mt-2">
                  <button class="flex-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium py-2 rounded-xl text-sm transition-colors flex justify-center items-center">
                    <ng-icon name="heroPhone" class="w-4 h-4"></ng-icon>
                  </button>
                  <button class="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 rounded-xl text-sm transition-colors flex justify-center items-center gap-2 shadow-sm shadow-primary-500/20">
                    <ng-icon name="heroCalendarDays" class="w-4 h-4"></ng-icon> Book
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  `
})
export class GaragesComponent { }