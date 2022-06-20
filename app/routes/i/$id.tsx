import { useLoaderData } from "@remix-run/react"
import { json } from "@remix-run/node"
import type { LoaderFunction } from "@remix-run/node"
import type { Space } from "@prisma/client"

import { db } from "~/utils/db.server"

type LoaderData = { space: Space }

export const loader: LoaderFunction = async ({ params }) => {
  const res = await db.space.findUnique({
    where: { id: parseInt(params.id!) },
  })
  if (res === null) throw new Response("Not Found", { status: 404 })
  const space = res!
  if (space.private) {
    throw new Error("private!!")
  }
  const data: LoaderData = { space }
  return json(data)
}

const I = () => {
  const data = useLoaderData<LoaderData>()

  return (
    <>
      <p>{data.toString()}</p>
    </>
  )
}
export default I
