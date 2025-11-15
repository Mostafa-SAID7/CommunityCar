import { Injectable } from '@angular/core';

export interface BrandConfig {
  name: string;
  slug: string;
  title: string;
  description: string;
  favicon: string;
  logo: {
    light: string;
    dark: string;
  };
  metatags: {
    title: string;
    description: string;
    keywords: string[];
    og: {
      title: string;
      description: string;
      image: string;
      type: string;
      url: string;
    };
  };
  social: {
    email: string;
    facebook: string;
    instagram: string;
    twitter: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private readonly brand: BrandConfig = {
    name: "CommunityCar",
    slug: "communitycar",
    title: "CommunityCar — Smart Shared Mobility",
    description: "CommunityCar connects neighbors through smarter, shared car access. Drive, book, and manage rides effortlessly with a secure and modern platform.",
    favicon: "/images/favicon.ico",
    logo: {
      light: "/images/logo-light.png",
      dark: "/images/logo-dark.png"
    },
    metatags: {
      title: "CommunityCar | Shared Car Platform for Modern Communities",
      description: "Join CommunityCar and experience effortless, secure, and eco-friendly car sharing. Seamless booking, trusted drivers, and transparent pricing.",
      keywords: [
        "car sharing",
        "ride booking",
        "community transport",
        "vehicle access",
        "mobility app"
      ],
      og: {
        title: "CommunityCar — Share Smarter. Drive Together.",
        description: "A next-generation car sharing platform built for connected communities.",
        image: "/images/social-preview.png",
        type: "website",
        url: "https://communitycar.com"
      }
    },
    social: {
      email: "communitycarfree@gmail.com",
      facebook: "https://www.facebook.com/profile.php?id=61583521502176",
      instagram: "https://www.instagram.com/communitycarfree",
      twitter: "https://x.com/CommunityCarFe"
    }
  };

  getBrand(): BrandConfig {
    return this.brand;
  }

  getName(): string {
    return this.brand.name;
  }

  getTitle(): string {
    return this.brand.title;
  }

  getDescription(): string {
    return this.brand.description;
  }

  getLogo(theme: 'light' | 'dark' = 'light'): string {
    return this.brand.logo[theme];
  }

  getSocialLinks() {
    return this.brand.social;
  }

  getMetaTags() {
    return this.brand.metatags;
  }

  getKeywords(): string[] {
    return this.brand.metatags.keywords;
  }

  getOgTags() {
    return this.brand.metatags.og;
  }
}