/**
 * Home Page E2E Tests
 *
 * End-to-end tests for the home page
 */

import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/')

    // Check heading
    await expect(page.locator('h1')).toContainText('NEWTS')

    // Check for discovery banner
    await expect(page.locator('text=Discovery Mode')).toBeVisible()

    // Check for articles
    await expect(page.locator('article')).toHaveCount(8)
  })

  test('should display hero article', async ({ page }) => {
    await page.goto('/')

    // Hero article should be visible
    const hero = page.locator('article').first()
    await expect(hero).toBeVisible()

    // Should have title, description, and metrics
    await expect(hero.locator('h1')).toBeVisible()
    await expect(hero.locator('text=Strategic Impact')).toBeVisible()
    await expect(hero.locator('text=Novelty')).toBeVisible()
  })

  test('should display article cards', async ({ page }) => {
    await page.goto('/')

    // Signal cards should be visible (excluding hero)
    const cards = page.locator('article').nth(1)
    await expect(cards).toBeVisible()

    // Should have required elements
    await expect(cards.locator('h3')).toBeVisible()
    await expect(cards.locator('text=Impact')).toBeVisible()
  })

  test('should have working reload button', async ({ page }) => {
    await page.goto('/')

    const reloadBtn = page.locator('text=Reload').first()
    await expect(reloadBtn).toBeVisible()

    // Click reload
    await reloadBtn.click()

    // Page should still be functional
    await expect(page.locator('article')).toHaveCount(8)
  })

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    // Check mobile layout
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('article')).toHaveCount(8)
  })
})
