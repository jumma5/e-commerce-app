"use client"

import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, Plus, Minus, Trash2 } from "lucide-react"
import { useLocale } from "@/hooks/use-locale"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { removeFromCart, updateQuantity, initCart } from "@/store/cart-slice"

interface CartDrawerProps {
  open: boolean
  onClose: () => void
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { t } = useLocale()
  const dispatch = useAppDispatch()
  const items = useAppSelector((state) => state.cart.items)

  useEffect(() => {
    dispatch(initCart())
  }, [dispatch])

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 end-0 z-50 flex w-full max-w-md flex-col bg-background shadow-2xl"
            role="dialog"
            aria-label={t.cart.title}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <h2 className="text-lg font-semibold text-foreground">{t.cart.title}</h2>
              <button
                onClick={onClose}
                className="rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <p className="text-muted-foreground">{t.cart.empty}</p>
                  <button
                    onClick={onClose}
                    className="mt-4 text-sm font-medium text-foreground underline underline-offset-4"
                  >
                    {t.cart.continueShopping}
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex gap-4"
                    >
                      <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-md bg-secondary">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          fill
                          className="object-contain p-2"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h3 className="text-sm font-medium leading-snug text-foreground line-clamp-2">
                            {item.title}
                          </h3>
                          <p className="mt-0.5 text-sm font-semibold text-foreground">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 rounded-md border border-border">
                            <button
                              onClick={() =>
                                dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
                              }
                              className="px-2 py-1 text-muted-foreground transition-colors hover:text-foreground"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="min-w-[20px] text-center text-sm text-foreground">{item.quantity}</span>
                            <button
                              onClick={() =>
                                dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
                              }
                              className="px-2 py-1 text-muted-foreground transition-colors hover:text-foreground"
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button
                            onClick={() => dispatch(removeFromCart(item.id))}
                            className="text-muted-foreground transition-colors hover:text-destructive"
                            aria-label={`Remove ${item.title}`}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border px-6 py-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">{t.cart.total}</span>
                  <span className="text-lg font-bold text-foreground">${total.toFixed(2)}</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="block w-full rounded-md bg-foreground px-4 py-3 text-center font-medium text-background transition-opacity hover:opacity-90"
                >
                  {t.cart.checkout}
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
