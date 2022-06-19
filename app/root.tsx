import type { MetaFunction } from "@remix-run/node"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react"

import sanitize from "sanitize.css"
import sanitizeForm from "sanitize.css/forms.css"
import sanitizeTyp from "sanitize.css/typography.css"

export const links = () => [
  { rel: "stylesheet", href: sanitize },
  { rel: "stylesheet", href: sanitizeForm },
  { rel: "stylesheet", href: sanitizeTyp },
]

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Misskey すぱけ",
  viewport: "width=device-width,initial-scale=1",
})

export default function App() {
  return (
    <html lang='ja'>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
