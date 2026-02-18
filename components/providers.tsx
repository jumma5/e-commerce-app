"use client"

import { Provider } from "react-redux"
import { ThemeProvider } from "next-themes"
import { store } from "@/store"
import { LocaleProvider } from "@/hooks/use-locale"
import { AuthProvider } from "@/hooks/use-auth"
import type { ReactNode } from "react"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <LocaleProvider>
          <AuthProvider>{children}</AuthProvider>
        </LocaleProvider>
      </ThemeProvider>
    </Provider>
  )
}
