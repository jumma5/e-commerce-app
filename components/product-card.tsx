"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ShoppingBag, Star } from "lucide-react"
import { useLocale } from "@/hooks/use-locale"
import { useAppDispatch } from "@/store/hooks"
import { addToCart } from "@/store/cart-slice"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
  priority?: boolean
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { t } = useLocale()
  const dispatch = useAppDispatch()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group flex flex-col"
    >
      <Link 
        href={`/product/${product.id}`} 
        className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-secondary to-muted shadow-lg ring-1 ring-border transition-all duration-300 group-hover:shadow-2xl group-hover:ring-primary/50"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-accent/0 opacity-0 transition-opacity duration-300 group-hover:from-primary/10 group-hover:to-accent/10 group-hover:opacity-100" />
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          fill
          className="object-contain p-8 transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={priority}
        />
      </Link>

      <div className="mt-4 flex flex-col gap-2">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-sm font-semibold leading-snug text-foreground line-clamp-1 transition-colors group-hover:text-primary">
            {product.title}
          </h3>
        </Link>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 px-2 py-0.5">
            <Star size={12} className="fill-primary text-primary" />
            <span className="text-xs font-medium text-foreground">{product.rating.rate}</span>
          </div>
          <span className="text-xs text-muted-foreground">({product.rating.count})</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            ${product.price.toFixed(2)}
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault()
              dispatch(addToCart(product))
            }}
            className="rounded-full bg-gradient-to-r from-primary to-accent p-2 text-white shadow-lg transition-shadow hover:shadow-xl"
            aria-label={`${t.shop.addToCart}: ${product.title}`}
          >
            <ShoppingBag size={16} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
