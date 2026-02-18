"use client"

import React from "react"

import Link from "next/link"
import { useState } from "react"
import { Mail, Instagram, Twitter, Facebook, Youtube, MapPin, Phone, Send } from "lucide-react"
import { useLocale } from "@/hooks/use-locale"

export function Footer() {
  const { t } = useLocale()
  const [email, setEmail] = useState("")

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    setEmail("")
  }

  return (
    <footer className="relative border-t border-border/50 bg-gradient-to-b from-background to-secondary/20">
      {/* Gradient Border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand & Description */}
          <div className="space-y-4">
            <Link href="/" className="inline-block font-serif text-2xl font-bold tracking-[0.3em] bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t.brand}
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Discover timeless elegance and contemporary style. Your destination for premium fashion.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-secondary p-2 text-muted-foreground transition-all hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:text-white"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-secondary p-2 text-muted-foreground transition-all hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:text-white"
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-secondary p-2 text-muted-foreground transition-all hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:text-white"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-secondary p-2 text-muted-foreground transition-all hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:text-white"
                aria-label="Youtube"
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/shop?category=men's%20clothing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Men's Collection
                </Link>
              </li>
              <li>
                <Link href="/shop?category=women's%20clothing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Women's Collection
                </Link>
              </li>
              <li>
                <Link href="/shop?category=jewelery" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Jewelry
                </Link>
              </li>
              <li>
                <Link href="/shop?category=electronics" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {t.footer.contact}
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">Stay Connected</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Subscribe to get special offers and updates.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-full border border-border bg-background px-4 py-2.5 pr-12 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-primary to-accent p-2 text-white transition-all hover:shadow-lg"
                  aria-label="Subscribe"
                >
                  <Send size={14} />
                </button>
              </div>
            </form>
            <div className="mt-6 space-y-2">
              <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                <span>123 Fashion Ave, Damascus</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Phone size={14} className="flex-shrink-0" />
                <span>+963937683313</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Mail size={14} className="flex-shrink-0" />
                <span>jummakkarem@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} TUH. {t.footer.rights}
            </p>
            <div className="flex items-center gap-6">
              <Link href="/" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
                {t.footer.privacy}
              </Link>
              <Link href="/" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
                {t.footer.terms}
              </Link>
              <Link href="/" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
                {t.footer.about}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
