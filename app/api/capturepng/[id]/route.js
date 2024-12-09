import puppeteer from 'puppeteer';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  try {
    const { id } = params;

    if (!id) {
      throw new Error('Missing `id` parameter in the URL');
    }

    const targetUrl = `http://localhost:3000/vouchers/${encodeURIComponent(id)}`;
    console.log('Navigating to:', targetUrl);

    // Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 }); // Adjust the viewport size as needed

    // Navigate to the target URL
    await page.goto(targetUrl, { waitUntil: 'networkidle2' });

    // Wait for the page to fully render
    await new Promise(resolve => setTimeout(resolve, 3000)); // Allow time for React components to load

    // Define the selector for the specific `div`s to capture
    const selector = '#voucher-front, #voucher-back'; // Update with your desired selectors

    // Locate the selected elements
    const element = await page.$(selector);
    if (!element) {
      throw new Error(`Element(s) matching selector "${selector}" not found`);
    }

    // Capture a screenshot of the selected element(s)
    const screenshot = await element.screenshot({ type: 'png' });

    // Close the browser
    await browser.close();

    // Return the screenshot as a response
    return new NextResponse(screenshot, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': `attachment; filename="voucher-${id}.png"`,
      },
    });
  } catch (error) {
    console.error('Error capturing screenshot:', error);
    return new NextResponse(
      JSON.stringify({ message: 'Error capturing screenshot', error: error.message }),
      { status: 500 }
    );
  }
}
