import { json } from "@remix-run/node"
import type { ActionFunction, LoaderFunction } from "@remix-run/node"

import { destroySession } from "~/utils/session.server"

export const action: ActionFunction = async ({ request }) =>
  destroySession(request, "/")

export const loader: LoaderFunction = async () => {
  throw json("Not Found", { status: 404 })
}

export default () => <></>
