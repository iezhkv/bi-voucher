import puppeteer from 'puppeteer';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    // Extract query parameters from the request URL
    const urlParams = new URLSearchParams(req.url.split('?')[1]);
    const name = urlParams.get('name') || 'Nadezhda Dimitrova Pandelieva';
    const price = urlParams.get('price') || '200';
    const wish = urlParams.get('wish') || 'Lorem Ipsum';

    // Construct the URL with query parameters for dynamic page rendering
    const targetUrl = `http://localhost:3000/?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}&wish=${encodeURIComponent(wish)}`;

    // Launch Puppeteer browser
    const browser = await puppeteer.launch({
      headless: true, // Run in headless mode
      args: ['--no-sandbox', '--disable-setuid-sandbox'], // For environments like Docker, Vercel, etc.
    });

    const page = await browser.newPage();

    // Set viewport width to 2100px and height to 1000px
    await page.setViewport({
      width: 2400,
      height: 2000, // Adjust based on the content you need to capture
    });

    // Navigate to the page with the dynamic URL containing query parameters
    await page.goto(targetUrl, {
      waitUntil: 'networkidle2', // Ensure the page is fully loaded
    });

    // Wait for the div with a specific id (e.g., 'capture')
    const element = await page.$('#capture'); // Replace 'capture' with the actual id of the div you want to capture

    if (!element) {
      throw new Error('Element with the specified id not found');
    }

    // Capture a screenshot of the div and save it as a PNG file
    const screenshot = await element.screenshot({
      type: 'png', // Set image type to PNG
    });

    // Close the browser
    await browser.close();

    // Return the screenshot as a response (binary)
    return new NextResponse(screenshot, {
      status: 200,
      headers: {
        'Content-Type': 'image/png', // Set the correct content type for the response
      },
    });
  } catch (error) {
    console.error('Error capturing screenshot:', error);

    // Return error response
    return new NextResponse(
      JSON.stringify({ message: 'Error capturing screenshot', error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
