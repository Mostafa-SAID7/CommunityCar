import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VendorDashboardService } from '../../services/vendor-dashboard.service';
import { VendorDashboardData, Product, Order } from '../../models/dashboard.models';

@Component({
  selector: 'app-vendor-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="vendor-dashboard">
      <div class="dashboard-header">
        <h1>Vendor Dashboard</h1>
        <p class="subtitle">Manage your products, orders, and sales</p>
      </div>

      <!-- Stats Cards -->
      <div class="stats-grid" *ngIf="dashboardData">
        <div class="stat-card">
          <div class="stat-icon">📦</div>
          <div class="stat-content">
            <h3>{{ dashboardData.stats.totalProducts }}</h3>
            <p>Total Products</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🛒</div>
          <div class="stat-content">
            <h3>{{ dashboardData.stats.totalOrders }}</h3>
            <p>Total Orders</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">💰</div>
          <div class="stat-content">
            <h3>{{ dashboardData.stats.totalRevenue | currency }}</h3>
            <p>Total Revenue</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📈</div>
          <div class="stat-content">
            <h3>{{ dashboardData.stats.activeListings }}</h3>
            <p>Active Listings</p>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="dashboard-content">
        <!-- Navigation Tabs -->
        <div class="tabs">
          <button
            class="tab-button"
            [class.active]="activeTab === 'overview'"
            (click)="setActiveTab('overview')">
            Overview
          </button>
          <button
            class="tab-button"
            [class.active]="activeTab === 'products'"
            (click)="setActiveTab('products')">
            Products
          </button>
          <button
            class="tab-button"
            [class.active]="activeTab === 'orders'"
            (click)="setActiveTab('orders')">
            Orders
          </button>
          <button
            class="tab-button"
            [class.active]="activeTab === 'inventory'"
            (click)="setActiveTab('inventory')">
            Inventory
          </button>
          <button
            class="tab-button"
            [class.active]="activeTab === 'analytics'"
            (click)="setActiveTab('analytics')">
            Analytics
          </button>
        </div>

        <!-- Tab Content -->
        <div [ngSwitch]="activeTab" class="tab-content-wrapper">
        <!-- Overview Tab -->
        <div *ngSwitchCase="'overview'" class="tab-content">
          <!-- Quick Actions -->
          <div class="quick-actions">
            <button class="btn-primary" (click)="openAddProductModal()">
              <i class="icon-plus"></i> Add New Product
            </button>
            <button class="btn-secondary" (click)="viewOrders()">
              <i class="icon-orders"></i> View Orders
            </button>
            <button class="btn-secondary" (click)="manageInventory()">
              <i class="icon-inventory"></i> Manage Inventory
            </button>
          </div>

        <!-- Recent Orders -->
        <div class="section">
          <div class="section-header">
            <h2>Recent Orders</h2>
            <button class="btn-link" (click)="viewAllOrders()">View All</button>
          </div>
          <div class="orders-table" *ngIf="recentOrders.length > 0; else noOrders">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let order of recentOrders">
                  <td>{{ order.id }}</td>
                  <td>{{ order.customerName }}</td>
                  <td>{{ order.items.length }} items</td>
                  <td>{{ order.totalAmount | currency }}</td>
                  <td>
                    <span class="status-badge" [ngClass]="order.status">
                      {{ order.status | titlecase }}
                    </span>
                  </td>
                  <td>{{ order.createdAt | date:'short' }}</td>
                  <td>
                    <button class="btn-sm" (click)="viewOrderDetails(order)">View</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <ng-template #noOrders>
            <div class="empty-state">
              <p>No recent orders</p>
            </div>
          </ng-template>
        </div>

        <!-- Top Products -->
        <div class="section">
          <div class="section-header">
            <h2>Top Products</h2>
            <button class="btn-link" (click)="viewAllProducts()">View All</button>
          </div>
          <div class="products-grid" *ngIf="topProducts.length > 0; else noProducts">
            <div class="product-card" *ngFor="let product of topProducts">
              <div class="product-image">
                <img [src]="product.images[0] || '/assets/images/placeholder.png'" [alt]="product.name">
              </div>
              <div class="product-info">
                <h3>{{ product.name }}</h3>
                <p class="price">{{ product.price | currency }}</p>
                <p class="stock">Stock: {{ product.stock }}</p>
                <div class="product-actions">
                  <button class="btn-sm" (click)="editProduct(product)">Edit</button>
                  <button class="btn-sm danger" (click)="deleteProduct(product)">Delete</button>
                </div>
              </div>
            </div>
          </div>
          <ng-template #noProducts>
            <div class="empty-state">
              <p>No products yet</p>
              <button class="btn-primary" (click)="openAddProductModal()">Add Your First Product</button>
            </div>
          </ng-template>
        </div>

        <!-- Low Stock Alert -->
        <div class="section" *ngIf="lowStockItems.length > 0">
          <div class="section-header">
            <h2>⚠️ Low Stock Alert</h2>
          </div>
          <div class="alert-list">
            <div class="alert-item" *ngFor="let item of lowStockItems">
              <span>{{ item.productName }}</span>
              <span class="stock-count">Only {{ item.currentStock }} left</span>
              <button class="btn-sm" (click)="restockItem(item)">Restock</button>
            </div>
          </div>
        </div>

        <!-- Products Tab -->
        <div *ngSwitchCase="'products'" class="tab-content">
          <div class="products-section">
            <div class="section-header">
              <h2>Product Management</h2>
              <button class="btn-primary" (click)="openAddProductModal()">Add New Product</button>
            </div>

            <div class="products-controls">
              <div class="search-filter">
                <input type="text" placeholder="Search products..." [(ngModel)]="productSearch" (input)="searchProducts()">
                <select [(ngModel)]="productFilter" (change)="filterProducts()">
                  <option value="all">All Products</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div class="products-table" *ngIf="filteredProducts.length > 0; else noProducts">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let product of filteredProducts">
                    <td>
                      <div class="product-cell">
                        <img [src]="product.images[0] || '/assets/images/placeholder.png'" [alt]="product.name">
                        <div>
                          <div class="product-name">{{ product.name }}</div>
                          <div class="product-brand">{{ product.brand }}</div>
                        </div>
                      </div>
                    </td>
                    <td>{{ product.category }}</td>
                    <td>{{ product.price | currency }}</td>
                    <td>
                      <span class="stock-indicator" [class.low]="product.stock < 10">
                        {{ product.stock }}
                      </span>
                    </td>
                    <td>
                      <span class="status-badge" [class]="'status-' + (product.isActive ? 'active' : 'inactive')">
                        {{ product.isActive ? 'Active' : 'Inactive' }}
                      </span>
                    </td>
                    <td>
                      <button class="btn-sm" (click)="editProduct(product)">Edit</button>
                      <button class="btn-sm danger" (click)="deleteProduct(product)">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ng-template #noProducts>
              <div class="empty-state">
                <p>No products found</p>
                <button class="btn-primary" (click)="openAddProductModal()">Add Your First Product</button>
              </div>
            </ng-template>
          </div>
        </div>

        <!-- Orders Tab -->
        <div *ngSwitchCase="'orders'" class="tab-content">
          <div class="orders-section">
            <div class="section-header">
              <h2>Order Management</h2>
            </div>

            <div class="orders-controls">
              <select [(ngModel)]="orderFilter" (change)="filterOrders()">
                <option value="all">All Orders</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div class="orders-table" *ngIf="filteredOrders.length > 0; else noOrders">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let order of filteredOrders">
                    <td>{{ order.id }}</td>
                    <td>{{ order.customerName }}</td>
                    <td>{{ getTotalItems(order) }} items</td>
                    <td>{{ order.totalAmount | currency }}</td>
                    <td>
                      <select [value]="order.status" (change)="updateOrderStatus(order, $event)">
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td>{{ order.createdAt | date:'short' }}</td>
                    <td>
                      <button class="btn-sm" (click)="viewOrderDetails(order)">View</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ng-template #noOrders>
              <div class="empty-state">
                <p>No orders found</p>
              </div>
            </ng-template>
          </div>
        </div>

        <!-- Inventory Tab -->
        <div *ngSwitchCase="'inventory'" class="tab-content">
          <div class="inventory-section">
            <div class="section-header">
              <h2>Inventory Management</h2>
              <button class="btn-primary" (click)="addInventoryItem()">Add Item</button>
            </div>

            <div class="inventory-alerts" *ngIf="lowStockItems.length > 0">
              <div class="alert-card">
                <h3>⚠️ Low Stock Alerts</h3>
                <div class="alert-items">
                  <div class="alert-item" *ngFor="let item of lowStockItems">
                    <span>{{ item.productName }}</span>
                    <span class="stock-count">Only {{ item.currentStock }} left (Min: {{ item.minimumStock }})</span>
                    <button class="btn-sm" (click)="restockItem(item)">Restock</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="inventory-table" *ngIf="dashboardData && dashboardData.inventory && dashboardData.inventory.length > 0; else noInventory">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Current Stock</th>
                    <th>Minimum Stock</th>
                    <th>Supplier</th>
                    <th>Last Restocked</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let item of dashboardData?.inventory">
                    <td>{{ item.productName }}</td>
                    <td>
                      <span class="stock-indicator" [class.low]="item.currentStock <= item.minimumStock">
                        {{ item.currentStock }}
                      </span>
                    </td>
                    <td>{{ item.minimumStock }}</td>
                    <td>{{ item.supplier }}</td>
                    <td>{{ item.lastRestocked | date:'short' }}</td>
                    <td>
                      <button class="btn-sm" (click)="updateStock(item)">Update</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ng-template #noInventory>
              <div class="empty-state">
                <p>No inventory items</p>
                <button class="btn-primary" (click)="addInventoryItem()">Add Inventory Item</button>
              </div>
            </ng-template>
          </div>
        </div>

        <!-- Analytics Tab -->
        <div *ngSwitchCase="'analytics'" class="tab-content">
          <div class="analytics-section">
            <h2>Sales Analytics</h2>

            <div class="analytics-grid">
              <div class="analytics-card">
                <h3>Revenue Trend</h3>
                <div class="chart-placeholder">
                  <p>Revenue chart would be displayed here</p>
                </div>
              </div>

              <div class="analytics-card">
                <h3>Top Products</h3>
                <div class="chart-placeholder">
                  <p>Top products chart would be displayed here</p>
                </div>
              </div>

              <div class="analytics-card">
                <h3>Order Status</h3>
                <div class="chart-placeholder">
                  <p>Order status distribution chart would be displayed here</p>
                </div>
              </div>

              <div class="analytics-card">
                <h3>Customer Insights</h3>
                <div class="chart-placeholder">
                  <p>Customer insights chart would be displayed here</p>
                </div>
              </div>
            </div>

            <div class="analytics-summary">
              <div class="summary-metrics">
                <div class="metric">
                  <h4>Total Sales</h4>
                  <p>{{ dashboardData?.stats?.totalRevenue | currency }}</p>
                </div>
                <div class="metric">
                  <h4>Average Order Value</h4>
                  <p>{{ getAverageOrderValue() | currency }}</p>
                </div>
                <div class="metric">
                  <h4>Conversion Rate</h4>
                  <p>{{ getConversionRate() }}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .vendor-dashboard {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .dashboard-header {
      margin-bottom: 2rem;
    }

    .dashboard-header h1 {
      margin: 0;
      color: #2c3e50;
      font-size: 2rem;
    }

    .subtitle {
      color: #7f8c8d;
      margin: 0.5rem 0 0 0;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .stat-icon {
      font-size: 2rem;
    }

    .stat-content h3 {
      margin: 0;
      font-size: 1.8rem;
      color: #2c3e50;
    }

    .stat-content p {
      margin: 0.5rem 0 0 0;
      color: #7f8c8d;
      font-size: 0.9rem;
    }

    .quick-actions {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }

    .btn-primary, .btn-secondary, .btn-link, .btn-sm {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s;
    }

    .btn-primary {
      background: #3498db;
      color: white;
    }

    .btn-primary:hover {
      background: #2980b9;
    }

    .btn-secondary {
      background: #ecf0f1;
      color: #2c3e50;
    }

    .btn-secondary:hover {
      background: #d5dbdb;
    }

    .btn-link {
      background: none;
      color: #3498db;
      text-decoration: underline;
    }

    .btn-sm {
      padding: 0.5rem 1rem;
      font-size: 0.9rem;
    }

    .btn-sm.danger {
      background: #e74c3c;
      color: white;
    }

    .section {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 2rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .section-header h2 {
      margin: 0;
      color: #2c3e50;
    }

    .orders-table table {
      width: 100%;
      border-collapse: collapse;
    }

    .orders-table th, .orders-table td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid #ecf0f1;
    }

    .orders-table th {
      background: #f8f9fa;
      font-weight: 600;
      color: #2c3e50;
    }

    .status-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 500;
    }

    .status-badge.pending { background: #f39c12; color: white; }
    .status-badge.processing { background: #3498db; color: white; }
    .status-badge.shipped { background: #9b59b6; color: white; }
    .status-badge.delivered { background: #27ae60; color: white; }
    .status-badge.cancelled { background: #e74c3c; color: white; }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .product-card {
      border: 1px solid #ecf0f1;
      border-radius: 8px;
      overflow: hidden;
      transition: box-shadow 0.2s;
    }

    .product-card:hover {
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }

    .product-image {
      height: 200px;
      overflow: hidden;
    }

    .product-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .product-info {
      padding: 1rem;
    }

    .product-info h3 {
      margin: 0 0 0.5rem 0;
      color: #2c3e50;
    }

    .price {
      font-size: 1.2rem;
      font-weight: bold;
      color: #27ae60;
      margin: 0.5rem 0;
    }

    .stock {
      color: #7f8c8d;
      font-size: 0.9rem;
      margin: 0.5rem 0;
    }

    .product-actions {
      display: flex;
      gap: 0.5rem;
      margin-top: 1rem;
    }

    .empty-state {
      text-align: center;
      padding: 3rem;
      color: #7f8c8d;
    }

    .empty-state p {
      margin: 0 0 1rem 0;
      font-size: 1.1rem;
    }

    .alert-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .alert-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      background: #fff3cd;
      border: 1px solid #ffeaa7;
      border-radius: 6px;
    }

    .stock-count {
      color: #d68910;
      font-weight: 500;
    }

    .tabs {
      display: flex;
      border-bottom: 1px solid #ecf0f1;
      margin-bottom: 2rem;
      overflow-x: auto;
    }

    .tab-button {
      padding: 1rem 2rem;
      background: none;
      border: none;
      border-bottom: 2px solid transparent;
      cursor: pointer;
      font-weight: 500;
      color: #7f8c8d;
      transition: all 0.2s;
      white-space: nowrap;
    }

    .tab-button.active {
      color: #3498db;
      border-bottom-color: #3498db;
    }

    .tab-button:hover {
      color: #3498db;
    }

    .tab-content {
      padding: 1rem 0;
    }

    .products-controls, .orders-controls {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.5rem;
      align-items: center;
    }

    .search-filter {
      display: flex;
      gap: 0.5rem;
      flex: 1;
    }

    .search-filter input {
      flex: 1;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .products-table table, .orders-table table, .inventory-table table {
      width: 100%;
      border-collapse: collapse;
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .products-table th, .products-table td,
    .orders-table th, .orders-table td,
    .inventory-table th, .inventory-table td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #ecf0f1;
    }

    .products-table th, .orders-table th, .inventory-table th {
      background: #f8f9fa;
      font-weight: 600;
      color: #2c3e50;
    }

    .product-cell {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .product-cell img {
      width: 40px;
      height: 40px;
      border-radius: 4px;
      object-fit: cover;
    }

    .product-name {
      font-weight: 500;
      color: #2c3e50;
    }

    .product-brand {
      color: #7f8c8d;
      font-size: 0.8rem;
    }

    .stock-indicator {
      font-weight: 500;
    }

    .stock-indicator.low {
      color: #e74c3c;
    }

    .status-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 500;
    }

    .status-active { background: #d4edda; color: #155724; }
    .status-inactive { background: #f8d7da; color: #721c24; }

    .inventory-alerts {
      margin-bottom: 2rem;
    }

    .alert-card {
      background: #fff3cd;
      border: 1px solid #ffeaa7;
      border-radius: 8px;
      padding: 1.5rem;
    }

    .alert-card h3 {
      margin: 0 0 1rem 0;
      color: #856404;
    }

    .alert-items {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .alert-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      background: white;
      border-radius: 6px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .stock-count {
      color: #d68910;
      font-weight: 500;
    }

    .analytics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .analytics-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .analytics-card h3 {
      margin: 0 0 1rem 0;
      color: #2c3e50;
    }

    .analytics-summary {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .summary-metrics {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
    }

    .metric h4 {
      margin: 0 0 0.5rem 0;
      color: #7f8c8d;
      font-size: 0.9rem;
    }

    .metric p {
      margin: 0;
      font-size: 1.2rem;
      font-weight: bold;
      color: #27ae60;
    }

    @media (max-width: 768px) {
      .vendor-dashboard {
        padding: 1rem;
      }

      .stats-grid {
        grid-template-columns: 1fr;
      }

      .tabs {
        padding-bottom: 0.5rem;
      }

      .tab-button {
        padding: 0.75rem 1rem;
        font-size: 0.9rem;
      }

      .quick-actions {
        flex-direction: column;
      }

      .section-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }

      .products-controls, .orders-controls {
        flex-direction: column;
        align-items: stretch;
      }

      .search-filter {
        flex-direction: column;
      }

      .products-grid {
        grid-template-columns: 1fr;
      }

      .orders-table, .products-table, .inventory-table {
        overflow-x: auto;
      }

      .analytics-grid {
        grid-template-columns: 1fr;
      }

      .summary-metrics {
        grid-template-columns: 1fr;
      }

      .alert-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }
    }
  `]
})
export default class VendorComponent implements OnInit {
  dashboardData: VendorDashboardData | null = null;
  activeTab: string = 'overview';
  recentOrders: Order[] = [];
  topProducts: Product[] = [];
  lowStockItems: any[] = [];
  filteredProducts: Product[] = [];
  filteredOrders: Order[] = [];
  productSearch: string = '';
  productFilter: string = 'all';
  orderFilter: string = 'all';

  constructor(
    private vendorService: VendorDashboardService
  ) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.vendorService.getVendorDashboardData().subscribe({
      next: (data) => {
        this.dashboardData = data;
        this.recentOrders = data.orders.slice(0, 5);
        this.topProducts = data.products.slice(0, 6);
        this.filteredProducts = data.products;
        this.filteredOrders = data.orders;
        this.checkLowStock();
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
      }
    });
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  checkLowStock() {
    if (this.dashboardData?.inventory) {
      this.lowStockItems = this.dashboardData.inventory.filter(
        item => item.currentStock <= item.minimumStock
      );
    }
  }

  openAddProductModal() {
    // TODO: Implement add product modal
    console.log('Open add product modal');
  }

  viewOrders() {
    // TODO: Navigate to orders page
    console.log('View all orders');
  }

  manageInventory() {
    // TODO: Navigate to inventory management
    console.log('Manage inventory');
  }

  viewAllOrders() {
    // TODO: Navigate to full orders list
    console.log('View all orders');
  }

  viewOrderDetails(order: Order) {
    // TODO: Open order details modal/page
    console.log('View order details:', order);
  }

  viewAllProducts() {
    // TODO: Navigate to full products list
    console.log('View all products');
  }

  editProduct(product: Product) {
    // TODO: Open edit product modal
    console.log('Edit product:', product);
  }

  deleteProduct(product: Product) {
    if (confirm(`Are you sure you want to delete ${product.name}?`)) {
      // TODO: Implement delete product
      console.log('Delete product:', product);
    }
  }

  restockItem(item: any) {
    // TODO: Open restock modal
    console.log('Restock item:', item);
  }

  searchProducts() {
    this.filterProducts();
  }

  filterProducts() {
    if (!this.dashboardData) return;

    let filtered = this.dashboardData.products;

    // Apply search filter
    if (this.productSearch.trim()) {
      const searchTerm = this.productSearch.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
      );
    }

    // Apply status filter
    if (this.productFilter !== 'all') {
      const isActive = this.productFilter === 'active';
      filtered = filtered.filter(product => product.isActive === isActive);
    }

    this.filteredProducts = filtered;
  }

  filterOrders() {
    if (!this.dashboardData) return;

    if (this.orderFilter === 'all') {
      this.filteredOrders = this.dashboardData.orders;
    } else {
      this.filteredOrders = this.dashboardData.orders.filter(order => order.status === this.orderFilter);
    }
  }

  updateOrderStatus(order: Order, event: any) {
    const newStatus = event.target.value;
    this.vendorService.updateOrderStatus(order.id, newStatus).subscribe({
      next: () => {
        order.status = newStatus;
        // TODO: Show success message
      },
      error: (error) => {
        console.error('Error updating order status:', error);
        // TODO: Show error message
      }
    });
  }

  getTotalItems(order: Order): number {
    return order.items.reduce((total, item) => total + item.quantity, 0);
  }

  addInventoryItem() {
    // TODO: Open add inventory item modal
    console.log('Add inventory item');
  }

  updateStock(item: any) {
    // TODO: Open update stock modal
    console.log('Update stock for:', item);
  }

  getAverageOrderValue(): number {
    if (!this.dashboardData?.orders.length) return 0;
    const total = this.dashboardData.orders.reduce((sum, order) => sum + order.totalAmount, 0);
    return total / this.dashboardData.orders.length;
  }

  getConversionRate(): number {
    // This would typically be calculated based on actual conversion metrics
    // For now, returning a placeholder
    return 15.5;
  }
}