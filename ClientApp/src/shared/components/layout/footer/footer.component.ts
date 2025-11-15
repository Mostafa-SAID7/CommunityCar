import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandService } from '../../../../core/services/brand.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  brand: any;
  socialLinks: any;

  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    this.brand = this.brandService.getBrand();
    this.socialLinks = this.brandService.getSocialLinks();
  }
}