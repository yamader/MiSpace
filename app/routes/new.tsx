/** @jsx jsx */
import { jsx } from "@emotion/react"
import { useLoaderData } from "@remix-run/react"
import { json, redirect } from "@remix-run/node"
import type { ActionFunction, LoaderFunction } from "@remix-run/node"

import Layout from "~/components/layout"
import { getUserMeta, requireUid } from "~/utils/session.server"
import type { UserMeta } from "~/components/layout"

type LoaderData = {
  user: UserMeta | null
}

export const action: ActionFunction = async ({ request }) => {
  const uid = requireUid(request)
  return json({})
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUserMeta(request)
  if (user === null) throw redirect(`/login`)
  return json({ user })
}

const Host = () => {
  const data = useLoaderData<LoaderData>()

  return (
    <Layout user={data.user}>
      <h1
        css={{
          fontWeight: "800",
          "::after": {
            content: '":"',
          },
        }}>
        New Host
      </h1>
    </Layout>
  )
}
export default Host
