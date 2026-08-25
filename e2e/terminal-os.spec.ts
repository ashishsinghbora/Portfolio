import { test, expect } from '@playwright/test';

test.describe('ASHISH_OS Terminal OS Portfolio E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('completes boot sequence lifecycle and lands on interactive terminal', async ({ page }) => {
    // Check if boot sequence banner exists or click FAST BOOT
    const fastBootBtn = page.getByRole('button', { name: /FAST BOOT/i });
    if (await fastBootBtn.isVisible()) {
      await fastBootBtn.click();
    }

    // Verify terminal header and node status
    await expect(page.getByText('ASHISH_OS')).toBeVisible();
    await expect(page.getByText(/pantnagar\.node/i)).toBeVisible();

    // Verify terminal CLI input is present
    const cliInput = page.getByLabel('Terminal command input');
    await expect(cliInput).toBeVisible();
  });

  test('executes core commands: whoami, ls -la /projects/, cat AI_AGENT_CORE.sys', async ({ page }) => {
    // Skip boot if present
    const fastBootBtn = page.getByRole('button', { name: /FAST BOOT/i });
    if (await fastBootBtn.isVisible()) {
      await fastBootBtn.click();
    }

    const cliInput = page.getByLabel('Terminal command input');

    // 1. Run whoami
    await cliInput.fill('whoami');
    await cliInput.press('Enter');
    await expect(page.getByText(/USER IDENTITY: Ashish Singh Bora/i)).toBeVisible();
    await expect(page.getByText(/Pantnagar, Udham Singh Nagar/i)).toBeVisible();

    // 2. Run ls -la /projects/
    await cliInput.fill('ls -la /projects/');
    await cliInput.press('Enter');
    await expect(page.getByText('DIRECTORY INDEX:')).toBeVisible();
    await expect(page.getByText('AI_AGENT_CORE.sys')).toBeVisible();
    await expect(page.getByText('SECURITY_AUDIT.sec')).toBeVisible();

    // 3. Run cat AI_AGENT_CORE.sys
    await cliInput.fill('cat AI_AGENT_CORE.sys');
    await cliInput.press('Enter');
    await expect(page.getByText('LAUNCH DEEP CASE STUDY')).toBeVisible();
  });

  test('triggers case study modal and closes with ESC key', async ({ page }) => {
    // Skip boot
    const fastBootBtn = page.getByRole('button', { name: /FAST BOOT/i });
    if (await fastBootBtn.isVisible()) {
      await fastBootBtn.click();
    }

    const cliInput = page.getByLabel('Terminal command input');

    // Open AI_AGENT_CORE case study via CLI
    await cliInput.fill('open AI_AGENT_CORE.sys');
    await cliInput.press('Enter');

    // Verify modal dialog appears
    const modalDialog = page.getByRole('dialog');
    await expect(modalDialog).toBeVisible();
    await expect(page.getByText(/SYSTEM TOPOLOGY & EXECUTION PIPELINE/i)).toBeVisible();
    await expect(page.getByText(/BENCHMARK METRICS & PERFORMANCE TELEMETRY/i)).toBeVisible();

    // Press Escape key
    await page.keyboard.press('Escape');

    // Verify modal is dismissed
    await expect(modalDialog).not.toBeVisible();
  });

  test('switches color themes and updates active palette', async ({ page }) => {
    // Skip boot
    const fastBootBtn = page.getByRole('button', { name: /FAST BOOT/i });
    if (await fastBootBtn.isVisible()) {
      await fastBootBtn.click();
    }

    // Click Matrix theme pill
    const matrixPill = page.getByTitle('Switch to Matrix theme');
    await matrixPill.click();

    // Verify html data-theme attribute is matrix
    const htmlElement = page.locator('html');
    await expect(htmlElement).toHaveAttribute('data-theme', 'matrix');

    // Click Dracula theme pill
    const draculaPill = page.getByTitle('Switch to Dracula theme');
    await draculaPill.click();
    await expect(htmlElement).toHaveAttribute('data-theme', 'dracula');
  });
});
