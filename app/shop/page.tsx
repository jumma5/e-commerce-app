"use client"

import { useEffect, useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Search, SlidersHorizontal, Loader2, X } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { useLocale } from "@/hooks/use-locale"
import { useAppDispatch } from "@/store/hooks"
import { initCart } from "@/store/cart-slice"
import type { Product } from "@/lib/types"

type SortOption = "default" | "price-asc" | "price-desc" | "name-asc" | "name-desc"

export default function ShopPage() {
  const { t } = useLocale()
  const searchParams = useSearchParams()
  const dispatch = useAppDispatch()

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [sortBy, setSortBy] = useState<SortOption>("default")
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    dispatch(initCart())
  }, [dispatch])

  useEffect(() => {
    const cat = searchParams.get("category")
    if (cat) setSelectedCategory(cat)
  }, [searchParams])

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const categories = useMemo(() => {
    const cats = [...new Set(products.map((p) => p.category))]
    return cats.sort()
  }, [products])

  const maxPrice = useMemo(() => {
    if (products.length === 0) return 1000
    return Math.ceil(Math.max(...products.map((p) => p.price)))
  }, [products])

  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Search
    if (search.trim()) {
      const query = search.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      )
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory)
    }

    // Price filter
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "name-asc":
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "name-desc":
        result.sort((a, b) => b.title.localeCompare(a.title))
        break
    }

    return result
  }, [products, search, selectedCategory, priceRange, sortBy])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">{t.shop.title}</h1>
          </motion.div>

          {/* Search & Filter Bar */}
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search */}
            <div className="relative flex-1 md:max-w-md">
              <Search size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t.shop.search}
                className="w-full rounded-md border border-border bg-background py-2.5 pe-4 ps-10 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-foreground focus:outline-none"
              >
                <option value="default">{t.shop.sortBy}</option>
                <option value="price-asc">{t.shop.priceLowHigh}</option>
                <option value="price-desc">{t.shop.priceHighLow}</option>
                <option value="name-asc">{t.shop.nameAZ}</option>
                <option value="name-desc">{t.shop.nameZA}</option>
              </select>

              {/* Filter Toggle (mobile) */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 rounded-md border border-border px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-secondary md:hidden"
              >
                <SlidersHorizontal size={16} />
              </button>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Sidebar Filters (Desktop) */}
            <aside className="hidden w-56 flex-shrink-0 md:block">
              <div className="sticky top-24 flex flex-col gap-6">
                {/* Category Filter */}
                <div>
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {t.shop.filterByCategory}
                  </h3>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => setSelectedCategory("")}
                      className={`text-start text-sm transition-colors ${
                        !selectedCategory ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {t.shop.filterByCategory}
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat === selectedCategory ? "" : cat)}
                        className={`text-start text-sm capitalize transition-colors ${
                          selectedCategory === cat
                            ? "font-medium text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {t.categories[cat as keyof typeof t.categories] || cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {t.shop.priceRange}
                  </h3>
                  <div className="flex flex-col gap-3">
                    <input
                      type="range"
                      min={0}
                      max={maxPrice}
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full accent-foreground"
                    />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Mobile Filters */}
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mb-6 overflow-hidden rounded-md border border-border p-4 md:hidden"
              >
                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      {t.shop.filterByCategory}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedCategory("")}
                        className={`rounded-full px-3 py-1 text-xs transition-colors ${
                          !selectedCategory
                            ? "bg-foreground text-background"
                            : "bg-secondary text-foreground"
                        }`}
                      >
                        All
                      </button>
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat === selectedCategory ? "" : cat)}
                          className={`rounded-full px-3 py-1 text-xs capitalize transition-colors ${
                            selectedCategory === cat
                              ? "bg-foreground text-background"
                              : "bg-secondary text-foreground"
                          }`}
                        >
                          {t.categories[cat as keyof typeof t.categories] || cat}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      {t.shop.priceRange}
                    </h3>
                    <input
                      type="range"
                      min={0}
                      max={maxPrice}
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full accent-foreground"
                    />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Products Grid */}
            <div className="flex-1">
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 size={32} className="animate-spin text-muted-foreground" />
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="flex items-center justify-center py-20">
                  <p className="text-muted-foreground">{t.shop.noProducts}</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6">
                  {filteredProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} priority={index < 3} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
