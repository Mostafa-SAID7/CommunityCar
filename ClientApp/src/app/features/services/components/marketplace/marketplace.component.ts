import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroMagnifyingGlass, heroFunnel, heroShoppingCart } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-marketplace',
  standalone: true,
  imports: [CommonModule, NgIcon],
  providers: [provideIcons({ heroMagnifyingGlass, heroFunnel, heroShoppingCart })],
  template: `
    <div class="min-h-screen bg-slate-50 dark:bg-slate-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div class="max-w-7xl mx-auto space-y-8">
        
        <!-- Header Section -->
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 class="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Marketplace</h1>
            <p class="mt-2 text-slate-600 dark:text-slate-400">Find the best parts and accessories for your vehicle.</p>
          </div>
          
          <!-- Actions -->
          <div class="flex items-center gap-4">
            <button class="relative p-2 text-slate-600 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 transition-colors">
              <ng-icon name="heroShoppingCart" class="w-6 h-6"></ng-icon>
              <span class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-primary-600 rounded-full">3</span>
            </button>
          </div>
        </div>

        <!-- Search and Filter Bar -->
        <div class="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row gap-4">
          <div class="relative flex-1">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <ng-icon name="heroMagnifyingGlass" class="w-5 h-5 text-slate-400"></ng-icon>
            </div>
            <input type="text" class="block w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-600 rounded-xl leading-5 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors sm:text-sm" placeholder="Search for parts, brands, or categories...">
          </div>
          
          <div class="flex gap-2">
            <div class="relative">
              <select class="appearance-none block w-full pl-3 pr-10 py-2 border border-slate-300 dark:border-slate-600 rounded-xl leading-5 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors sm:text-sm">
                <option>All Categories</option>
                <option>Engine</option>
                <option>Exterior</option>
                <option>Interior</option>
                <option>Wheels & Tires</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
            <button class="inline-flex items-center px-4 py-2 border border-slate-300 dark:border-slate-600 shadow-sm text-sm font-medium rounded-xl text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
              <ng-icon name="heroFunnel" class="w-4 h-4 mr-2"></ng-icon>
              Filters
            </button>
          </div>
        </div>

        <!-- Parts Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <!-- Placeholder Product Card -->
          <div *ngFor="let item of [1,2,3,4,5,6,7,8]" class="group bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div class="aspect-w-4 aspect-h-3 bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
              <!-- Placeholder Image Background -->
              <div class="w-full h-48 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center">
                <ng-icon name="heroShoppingCart" class="w-12 h-12 text-slate-400 dark:text-slate-500 opacity-50"></ng-icon>
              </div>
              <div class="absolute top-2 right-2">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                  In Stock
                </span>
              </div>
            </div>
            <div class="p-5">
              <div class="flex justify-between items-start">
                <div>
                  <p class="text-sm font-medium text-primary-600 dark:text-primary-400">Brakes & Rotors</p>
                  <h3 class="mt-1 text-lg font-bold text-slate-900 dark:text-white line-clamp-1">Performance Brake Kit {{item}}</h3>
                </div>
              </div>
              <p class="mt-2 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">High-performance ceramic brake pads with drilled and slotted rotors for ultimate stopping power.</p>
              
              <div class="mt-4 flex items-center justify-between">
                <span class="text-xl font-bold text-slate-900 dark:text-white">$249.99</span>
                <button class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  `
})
export class MarketplaceComponent { }