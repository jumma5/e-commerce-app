"use client"

import React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, CheckCircle2, ShoppingBag } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useLocale } from "@/hooks/use-locale"
import { useAuth } from "@/hooks/use-auth"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { clearCart, initCart } from "@/store/cart-slice"

interface FormData {
  name: string
  email: string
  address: string
  city: string
  zip: string
  cardNumber: string
  expiry: string
  cvv: string
}

export default function CheckoutPage() {
  const { t } = useLocale()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { isAuthenticated } = useAuth()
  const items = useAppSelector((state) => state.cart.items)
  const [orderPlaced, setOrderPlaced] = useState(false)

  useEffect(() => {
    dispatch(initCart())
  }, [dispatch])

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login?redirect=/checkout")
    }
  }, [isAuthenticated, router])

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleChange = (field: keyof FormData, value: string) => {
    let formatted = value

    // Format card number with spaces
    if (field === "cardNumber") {
      formatted = value.replace(/\D/g, "").slice(0, 16)
      formatted = formatted.replace(/(\d{4})(?=\d)/g, "$1 ")
    }

    // Format expiry
    if (field === "expiry") {
      formatted = value.replace(/\D/g, "").slice(0, 4)
      if (formatted.length >= 3) {
        formatted = `${formatted.slice(0, 2)}/${formatted.slice(2)}`
      }
    }

    // Format CVV
    if (field === "cvv") {
      formatted = value.replace(/\D/g, "").slice(0, 4)
    }

    // Format ZIP
    if (field === "zip") {
      formatted = value.replace(/\D/g, "").slice(0, 5)
    }

    setForm((prev) => ({ ...prev, [field]: formatted }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}

    if (!form.name.trim()) newErrors.name = t.checkout.nameRequired
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = t.checkout.emailRequired
    if (!form.address.trim()) newErrors.address = t.checkout.addressRequired
    if (!form.city.trim()) newErrors.city = t.checkout.cityRequired
    if (!form.zip || form.zip.length < 5) newErrors.zip = t.checkout.zipRequired
    if (!form.cardNumber || form.cardNumber.replace(/\s/g, "").length < 16)
      newErrors.cardNumber = t.checkout.cardRequired
    if (!form.expiry || !/^\d{2}\/\d{2}$/.test(form.expiry)) newErrors.expiry = t.checkout.expiryRequired
    if (!form.cvv || form.cvv.length < 3) newErrors.cvv = t.checkout.cvvRequired

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setOrderPlaced(true)
    dispatch(clearCart())
  }

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 flex-col items-center justify-center bg-background px-4 py-20">
          <ShoppingBag size={48} className="mb-4 text-muted-foreground" />
          <h2 className="text-xl font-semibold text-foreground">{t.cart.empty}</h2>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            {t.cart.continueShopping}
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-16">
          {/* Back */}
          <Link
            href="/shop"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} />
            {t.product.backToShop}
          </Link>

          <AnimatePresence mode="wait">
            {orderPlaced ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <CheckCircle2 size={64} className="mb-6 text-foreground" />
                <h2 className="font-serif text-3xl font-bold text-foreground">{t.checkout.success}</h2>
                <p className="mt-3 text-muted-foreground">Thank you for your order.</p>
                <button
                  onClick={() => router.push("/")}
                  className="mt-8 rounded-md bg-foreground px-8 py-3 font-medium text-background transition-opacity hover:opacity-90"
                >
                  {t.nav.home}
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="mb-10 font-serif text-3xl font-bold text-foreground md:text-4xl">
                  {t.checkout.title}
                </h1>

                <div className="grid gap-10 lg:grid-cols-3">
                  {/* Form */}
                  <form onSubmit={handleSubmit} className="lg:col-span-2">
                    <div className="flex flex-col gap-8">
                      {/* Shipping Info */}
                      <fieldset>
                        <legend className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                          {t.checkout.shippingInfo}
                        </legend>
                        <div className="grid gap-4 md:grid-cols-2">
                          <FormField
                            label={t.checkout.name}
                            value={form.name}
                            error={errors.name}
                            onChange={(v) => handleChange("name", v)}
                            placeholder="John Doe"
                          />
                          <FormField
                            label={t.checkout.email}
                            value={form.email}
                            error={errors.email}
                            onChange={(v) => handleChange("email", v)}
                            placeholder="john@example.com"
                            type="email"
                          />
                          <div className="md:col-span-2">
                            <FormField
                              label={t.checkout.address}
                              value={form.address}
                              error={errors.address}
                              onChange={(v) => handleChange("address", v)}
                              placeholder="123 Main St"
                            />
                          </div>
                          <FormField
                            label={t.checkout.city}
                            value={form.city}
                            error={errors.city}
                            onChange={(v) => handleChange("city", v)}
                            placeholder="New York"
                          />
                          <FormField
                            label={t.checkout.zip}
                            value={form.zip}
                            error={errors.zip}
                            onChange={(v) => handleChange("zip", v)}
                            placeholder="10001"
                          />
                        </div>
                      </fieldset>

                      {/* Payment Info */}
                      <fieldset>
                        <legend className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                          {t.checkout.paymentInfo}
                        </legend>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="md:col-span-2">
                            <FormField
                              label={t.checkout.cardNumber}
                              value={form.cardNumber}
                              error={errors.cardNumber}
                              onChange={(v) => handleChange("cardNumber", v)}
                              placeholder="4242 4242 4242 4242"
                            />
                          </div>
                          <FormField
                            label={t.checkout.expiry}
                            value={form.expiry}
                            error={errors.expiry}
                            onChange={(v) => handleChange("expiry", v)}
                            placeholder="12/25"
                          />
                          <FormField
                            label={t.checkout.cvv}
                            value={form.cvv}
                            error={errors.cvv}
                            onChange={(v) => handleChange("cvv", v)}
                            placeholder="123"
                          />
                        </div>
                      </fieldset>

                      <button
                        type="submit"
                        className="w-full rounded-md bg-foreground px-6 py-4 font-medium text-background transition-opacity hover:opacity-90 lg:hidden"
                      >
                        {t.checkout.placeOrder}
                      </button>
                    </div>
                  </form>

                  {/* Order Summary */}
                  <aside className="lg:sticky lg:top-24 lg:self-start">
                    <div className="rounded-lg border border-border bg-card p-6">
                      <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                        {t.checkout.orderSummary}
                      </h3>

                      <div className="flex flex-col gap-4">
                        {items.map((item, index) => (
                          <div key={item.id} className="flex items-center gap-3">
                            <div className="relative h-14 w-12 flex-shrink-0 overflow-hidden rounded bg-secondary">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.title}
                                fill
                                className="object-contain p-1"
                                sizes="48px"
                                priority={index === 0}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-foreground line-clamp-1">{item.title}</p>
                              <p className="text-xs text-muted-foreground">x{item.quantity}</p>
                            </div>
                            <span className="text-sm font-medium text-foreground">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <hr className="my-5 border-border" />

                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{t.checkout.subtotal}</span>
                          <span className="text-foreground">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{t.checkout.shipping}</span>
                          <span className="text-foreground">{t.checkout.free}</span>
                        </div>
                        <hr className="my-2 border-border" />
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-foreground">{t.checkout.total}</span>
                          <span className="text-xl font-bold text-foreground">${subtotal.toFixed(2)}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const formEl = document.querySelector("form")
                          if (formEl) formEl.requestSubmit()
                        }}
                        className="mt-6 hidden w-full rounded-md bg-foreground px-6 py-4 font-medium text-background transition-opacity hover:opacity-90 lg:block"
                      >
                        {t.checkout.placeOrder}
                      </button>
                    </div>
                  </aside>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function FormField({
  label,
  value,
  error,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string
  value: string
  error?: string
  onChange: (value: string) => void
  placeholder: string
  type?: string
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-foreground">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-md border bg-background px-4 py-3 text-foreground transition-colors placeholder:text-muted-foreground focus:outline-none ${
          error ? "border-destructive focus:border-destructive" : "border-border focus:border-foreground"
        }`}
      />
      {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
    </div>
  )
}
