"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingBag, Menu, X, Moon, Sun, Globe, User, LogOut, Search, Heart } from "lucide-react"
import { useTheme } from "next-themes"
import { useLocale } from "@/hooks/use-locale"
import { useAuth } from "@/hooks/use-auth"
import { useAppSelector } from "@/store/hooks"
import { CartDrawer } from "./cart-drawer"

export function Navbar() {
  const pathname = usePathname()
  const { t, locale, setLocale } = useLocale()
  const { theme, setTheme } = useTheme()
  const { user, logout, isAuthenticated } = useAuth()
  const cartItems = useAppSelector((state) => state.cart.items)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/shop", label: t.nav.shop },
    { href: "/shop?category=men's%20clothing", label: "Men" },
    { href: "/shop?category=women's%20clothing", label: "Women" },
    { href: "/shop?category=jewelery", label: "Jewelry" },
  ]

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur-xl shadow-sm">
        {/* Top Bar */}
        <div className="border-b border-border/30 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 lg:px-8">
            <div className="flex items-center gap-4">
              {/* Language Toggle */}
              <button
                onClick={() => setLocale(locale === "en" ? "ar" : "en")}
                className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Toggle language"
              >
                <Globe size={12} />
                <span className="uppercase">{locale}</span>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Toggle theme"
                suppressHydrationWarning
              >
                {mounted ? (theme === "dark" ? <Sun size={14} /> : <Moon size={14} />) : <div className="h-[14px] w-[14px]" />}
              </button>
            </div>
          </div>
        </div>

        {/* Gradient Border */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-4 lg:px-8">
          {/* Logo */}
          <Link href="/" className="font-serif text-2xl font-bold tracking-[0.3em] bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent lg:text-3xl">
            {t.brand}
          </Link>

          {/* Desktop Nav */}
          <div className="hidden flex-1 items-center justify-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium tracking-wide transition-colors hover:text-foreground ${pathname === link.href ? "text-foreground" : "text-muted-foreground"
                  }`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-6 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-2 md:flex">
            {/* Search */}
            <Link
              href="/shop"
              className="rounded-full p-2 text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
              aria-label="Search"
            >
              <Search size={18} />
            </Link>

            {/* Auth */}
            {isAuthenticated ? (
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5">
                  <User size={14} />
                  <span className="text-xs font-medium">{user?.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="rounded-full p-2 text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
                  aria-label="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-xs font-medium transition-all hover:bg-secondary/80"
              >
                <User size={14} />
                <span>{t.nav.login}</span>
              </Link>
            )}

            {/* Wishlist */}
            <Link
              href="/shop"
              className="rounded-full p-2 text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
              aria-label="Wishlist"
            >
              <Heart size={18} />
            </Link>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative rounded-full bg-gradient-to-r from-primary to-accent p-2 text-white shadow-md transition-all hover:shadow-lg"
              aria-label="Open cart"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -end-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-[10px] font-bold text-background ring-2 ring-background"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setCartOpen(true)}
              className="relative rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Open cart"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -end-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent text-[10px] font-bold text-white shadow-lg"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-border md:hidden"
            >
              <div className="flex flex-col gap-1 px-4 py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${pathname === link.href
                      ? "bg-gradient-to-r from-primary/10 to-accent/10 text-foreground"
                      : "text-muted-foreground hover:bg-secondary"
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}

                <hr className="my-4 border-border" />

                {isAuthenticated ? (
                  <>
                    <div className="mb-2 flex items-center gap-2 rounded-lg bg-secondary px-3 py-2.5">
                      <User size={16} className="text-muted-foreground" />
                      <span className="text-sm font-medium">{user?.name}</span>
                    </div>
                    <button
                      onClick={() => {
                        logout()
                        setMobileMenuOpen(false)
                      }}
                      className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary"
                    >
                      <LogOut size={16} />
                      {t.nav.logout}
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-accent px-3 py-2.5 text-sm font-medium text-white"
                  >
                    <User size={16} />
                    {t.nav.login}
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
