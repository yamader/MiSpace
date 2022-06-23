import { v4 as uuidv4 } from "uuid"
import { createCookieSessionStorage, json, redirect } from "@remix-run/node"

import { db } from "./db.server"
import type { UserMeta } from "~/components/layout"

// miauth

export const startMiAuth = async (host: string) => {
  const uuid = uuidv4()
  const name = "MiSpace"
  const callback = `${process.env.HOST_URL}/miauth`
  const permission = ["read:account"].join(",")
  await db.miAuth.create({
    data: {
      id: uuid,
      host,
    },
  })
  return `${host}/miauth/${uuid}?name=${name}&callback=${callback}&permission=${permission}`
}

export const submitMiAuth = async (id: string) => {
  const miauth = await db.miAuth.findUnique({
    where: { id },
  })
  if (!miauth) return null
  db.miAuth.delete({ where: { id } })

  const res = await fetch(`${miauth.host}/api/miauth/${miauth.id}/check`, {
    method: "POST",
  }).then(r => r.json())
  if (!res.ok) return null

  // upsert使わせろ
  const user = await db.user.findFirst({
    where: {
      // fqdn: res.user.host,
      fqdn: new URL(miauth.host).host, // ?!?!?!?!
      foreignId: res.user.id,
    },
  })
  if (user === null)
    return await db.user.create({
      data: {
        token: res.token,
        fqdn: new URL(miauth.host).host, //
        foreignId: res.user.id,
        nick: res.user.name,
        name: res.user.username,
        icon: res.user.avatarUrl,
      },
    })
  else
    return await db.user.update({
      where: { id: user.id },
      data: {
        token: res.token,
        nick: res.user.name,
        name: res.user.username,
        icon: res.user.avatarUrl,
      },
    })
}

// cookie

const storage = createCookieSessionStorage({
  cookie: {
    name: "login",
    secrets: ["Amagasaki2022"],
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  },
})

export const createSession = async (uid: number, go: string) => {
  const session = await storage.getSession()
  const user = await db.user.findUnique({
    where: { id: uid },
    select: {
      nick: true,
      name: true,
      fqdn: true,
      icon: true,
    },
  })
  if (user === null) throw json("Not Found", { status: 404 })
  session.set("uid", uid)
  session.set("nick", user!.nick)
  session.set("name", user!.name)
  session.set("fqdn", user!.fqdn)
  session.set("icon", user!.icon)
  return redirect(go, {
    headers: { "Set-Cookie": await storage.commitSession(session) },
  })
}

const getSession = (req: Request) =>
  storage.getSession(req.headers.get("Cookie"))

export const getUserMeta = async (req: Request): Promise<UserMeta | null> => {
  const session = await getSession(req)
  const uid = session.get("uid")
  if (!uid) return null
  return {
    nick: session.get("nick"),
    name: session.get("name"),
    fqdn: session.get("fqdn"),
    icon: session.get("icon"),
  }
}

export const requireUid = async (req: Request) => {
  const sesion = await getSession(req)
  const uid = sesion.get("uid")
  if (!uid) throw redirect(`/login`)
  return uid
}

export const destroySession = async (req: Request, go: string) => {
  const session = await getSession(req)
  return redirect(go, {
    headers: { "Set-Cookie": await storage.destroySession(session) },
  })
}
