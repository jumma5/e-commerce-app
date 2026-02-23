"use client"

import React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { useAuth } from "@/hooks/use-auth"
import { useLocale } from "@/hooks/use-locale"
import { Eye, EyeOff } from "lucide-react"

export default function SignupPage() {
  const { signup } = useAuth()
  const { t } = useLocale()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!name.trim()) newErrors.name = t.auth.nameRequired
    if (!email || !/\S+@\S+\.\S+/.test(email)) newErrors.email = t.auth.emailRequired
    if (!password || password.length < 6) newErrors.password = t.auth.passwordRequired
    if (password !== confirmPassword) newErrors.confirmPassword = t.auth.passwordMismatch
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    const result = signup(name, email, password)
    if (result.success) {
      const redirect = searchParams.get("redirect") || "/"
      router.push(redirect)
    } else {
      setErrors({ form: t.auth.emailExists })
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      {/* Animated Background Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-0 right-0 h-96 w-96 rounded-full bg-gradient-to-br from-accent to-primary blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-0 left-0 h-[32rem] w-[32rem] rounded-full bg-gradient-to-tl from-primary to-accent blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md rounded-2xl border border-border/50 bg-card/80 p-8 shadow-2xl backdrop-blur-xl"
      >
        <div className="mb-8 text-center">
          <Link href="/" className="mb-6 inline-block font-serif text-3xl font-bold tracking-widest bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {t.brand}
          </Link>
          <h1 className="text-2xl font-bold text-foreground">{t.auth.signupTitle}</h1>
          <p className="mt-2 text-muted-foreground">{t.auth.signupSubtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {errors.form && (
            <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-center text-sm text-destructive">
              {errors.form}
            </div>
          )}

          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
              {t.auth.name}
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-4 py-3 text-foreground transition-colors placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
            />
            {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
              {t.auth.email}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-4 py-3 text-foreground transition-colors placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
            />
            {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-foreground">
              {t.auth.password}
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-border bg-background px-4 py-3 text-foreground transition-colors placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-sm text-destructive">{errors.password}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium text-foreground">
              {t.auth.confirmPassword}
            </label>
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-4 py-3 text-foreground transition-colors placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
              
            />
            {errors.confirmPassword && <p className="mt-1 text-sm text-destructive">{errors.confirmPassword}</p>}
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full rounded-full bg-gradient-to-r from-primary to-accent px-4 py-3 font-semibold text-white shadow-lg transition-shadow hover:shadow-xl"
          >
            {t.auth.signup}
          </motion.button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {t.auth.hasAccount}{" "}
          <Link href="/login" className="font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:opacity-80">
            {t.auth.login}
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
