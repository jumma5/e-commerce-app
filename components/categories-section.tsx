"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Watch, Gem, Shirt } from "lucide-react"
import { useLocale } from "@/hooks/use-locale"

const categories = [
  { key: "electronics" as const, icon: Watch, gradient: "from-blue-500 to-cyan-500" },
  { key: "jewelery" as const, icon: Gem, gradient: "from-purple-500 to-pink-500" },
  { key: "men's clothing" as const, icon: Shirt, gradient: "from-indigo-500 to-purple-500" },
  { key: "women's clothing" as const, icon: Shirt, gradient: "from-pink-500 to-rose-500" },
]

export function CategoriesSection() {
  const { t } = useLocale()

  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-3xl" />
        <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-gradient-to-tl from-accent/20 to-transparent blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-4 inline-block rounded-full bg-gradient-to-r from-primary to-accent px-4 py-1.5 text-sm font-medium text-white"
          >
            Shop by Category
          </motion.span>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-5xl text-balance">
            {t.categories.title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {categories.map((cat, index) => {
            const Icon = cat.icon
            return (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  href={`/shop?category=${encodeURIComponent(cat.key)}`}
                  className="group relative flex flex-col items-center gap-4 overflow-hidden rounded-2xl bg-card p-8 shadow-lg ring-1 ring-border transition-all hover:shadow-2xl hover:ring-primary/50"
                >
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-10`} />
                  
                  <div className={`relative rounded-full bg-gradient-to-br ${cat.gradient} p-4 shadow-lg`}>
                    <Icon size={32} className="text-white" />
                  </div>
                  <span className="relative text-center text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                    {t.categories[cat.key]}
                  </span>
                  <ArrowRight
                    size={16}
                    className="relative text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary rtl:group-hover:-translate-x-1"
                  />
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
