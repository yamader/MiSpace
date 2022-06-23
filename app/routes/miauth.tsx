import { json, redirect } from "@remix-run/node"
import type { LoaderFunction } from "@remix-run/node"

import { submitMiAuth, createSession } from "~/utils/session.server"

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)

  // url query not found
  const session = url.searchParams.get("session")
  if (session === null) throw json("Not Found", { status: 404 })

  // submit failed
  const user = await submitMiAuth(session)
  if (!user) throw json("Not Found", { status: 404 })

  return createSession(user.id, "/")
}

// render error page
export default () => <></>
