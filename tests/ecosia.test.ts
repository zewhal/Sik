import { test, expect, describe } from "bun:test"
import { Hono } from "hono"

import type { SERPResponse, SERPQueryParams } from "search-engine-scraper"
import { ecosia } from "search-engine-scraper"
import { createCuimpClient } from "search-engine-scraper"

const app = new Hono()

app.post("/ecosia", async (c) => {
  const body: SERPQueryParams = await c.req.json()

  console.log("[SERVER] Received POST /ecosia with body:", body)

  const result: SERPResponse = await ecosia(
    createCuimpClient({}),
    body,
    {},
    ""
  )

  console.log("[SERVER] Returning Ecosia result (raw):")
  console.log(JSON.stringify(result, null, 2))

  return c.json(result)
})

describe("POST /ecosia real HTTP integration", () => {
  test("should connect to POST and display the data it got", async () => {
    const body: SERPQueryParams = {
      query: "bun runtime",
      page: 1,
      pageStart: 0
    }

    console.log("[TEST] Sending POST /ecosia body:", body)

    const res = await app.request("/ecosia", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    })

    console.log("[TEST] Response status:", res.status)

    const json = (await res.json()) as SERPResponse

    console.log("[TEST] JSON response received:")
    console.log(JSON.stringify(json, null, 2))

    expect(res.status).toBe(200)
    expect(json.query).toBe("bun runtime")
    expect(typeof json.page).toBe("number")
    expect(Array.isArray(json.results)).toBe(true)
    expect(json.results.length).toBeGreaterThan(0)
  })
})
