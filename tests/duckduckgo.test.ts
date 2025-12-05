import { test, expect, describe } from "bun:test"
import { Hono } from "hono"

import type { SERPQueryParams, SERPResponse } from "search-engine-scraper"
import { duckduckgo } from "search-engine-scraper"
import { createPatchrightClient } from "search-engine-scraper"

const app = new Hono()

app.post("/duckduckgo", async (c) => {
  const body: SERPQueryParams = await c.req.json()
  const { page, browser } = await createPatchrightClient({ headless: true })

  try {
    const result: SERPResponse = await duckduckgo(page, body)
    return c.json(result)
  } finally {
    await browser.close()
  }
})

describe("POST /duckduckgo real browser integration", () => {
  test("scrapes DuckDuckGo results using Patchright", async () => {
    const { page, browser } = await createPatchrightClient({ headless: false })

    try {
      const queryParams: SERPQueryParams = {
        query: "bun runtime",
        page: 1,
        pageStart: 0
      }

      const result: SERPResponse = await duckduckgo(page, queryParams)

      console.log("[TEST] DuckDuckGo results:")
      console.log(JSON.stringify(result, null, 2))

      expect(result.engine).toBe("duckduckgo")
      expect(result.query).toBe("bun runtime")
      expect(result.page).toBe(1)
      expect(Array.isArray(result.results)).toBe(true)
      expect(result.results.length).toBeGreaterThan(0)

      const first = result.results[0]
      expect(first).toHaveProperty("title")
      expect(first).toHaveProperty("url")
      expect(first).toHaveProperty("snippet")
      expect(first).toHaveProperty("position")
    } finally {
      await browser.close()
    }
  }, { timeout: 60_000 })
})
