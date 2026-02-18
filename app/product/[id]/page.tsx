"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, Star, ShoppingBag, Loader2, Check } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useLocale } from "@/hooks/use-locale"
import { useAppDispatch } from "@/store/hooks"
import { addToCart, initCart } from "@/store/cart-slice"
import type { Product } from "@/lib/types"

export default function ProductDetailPage() {
  const { t } = useLocale()
  const params = useParams()
  const dispatch = useAppDispatch()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    dispatch(initCart())
  }, [dispatch])

  useEffect(() => {
    if (params.id) {
      fetch(`https://fakestoreapi.com/products/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data)
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }
  }, [params.id])

  const handleAddToCart = () => {
    if (!product) return
    dispatch(addToCart(product))
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-16">
          {/* Back Link */}
          <Link
            href="/shop"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} />
            {t.product.backToShop}
          </Link>

          {loading ? (
            <div className="flex items-center justify-center py-32">
              <Loader2 size={32} className="animate-spin text-muted-foreground" />
            </div>
          ) : !product ? (
            <div className="flex items-center justify-center py-32">
              <p className="text-muted-foreground">Product not found.</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid gap-10 md:grid-cols-2 lg:gap-16"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden rounded-lg bg-secondary">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  fill
                  className="object-contain p-8 md:p-12"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>

              {/* Info */}
              <div className="flex flex-col justify-center">
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {t.categories[product.category as keyof typeof t.categories] || product.category}
                </p>

                <h1 className="font-serif text-3xl font-bold leading-snug text-foreground md:text-4xl text-balance">
                  {product.title}
                </h1>

                {/* Rating */}
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < Math.round(product.rating.rate)
                            ? "fill-foreground text-foreground"
                            : "text-border"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating.rate} ({product.rating.count} reviews)
                  </span>
                </div>

                {/* Price */}
                <p className="mt-6 text-3xl font-bold text-foreground">${product.price.toFixed(2)}</p>

                {/* Description */}
                <div className="mt-6">
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {t.product.description}
                  </h3>
                  <p className="leading-relaxed text-muted-foreground">{product.description}</p>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  disabled={added}
                  className="mt-8 flex w-full items-center justify-center gap-3 rounded-md bg-foreground px-6 py-4 font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-70 md:w-auto"
                >
                  {added ? (
                    <>
                      <Check size={18} />
                      Added!
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} />
                      {t.product.addToCart}
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
