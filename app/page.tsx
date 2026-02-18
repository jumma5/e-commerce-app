"use client"

import { useEffect } from "react"
import { useAppDispatch } from "@/store/hooks"
import { initCart } from "@/store/cart-slice"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { CategoriesSection } from "@/components/categories-section"
import { FeaturedProducts } from "@/components/featured-products"

export default function HomePage() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initCart())
  }, [dispatch])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <CategoriesSection />
        <FeaturedProducts />
      </main>
      <Footer />
    </div>
  )
}
