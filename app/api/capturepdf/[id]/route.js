import puppeteer from 'puppeteer';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // Parse JSON data from the request body
    const { id } = await req.json();

    if (!id) {
      throw new Error('Missing `id` in the request body');
    }

    // Launch Puppeteer browser
    const browser = await puppeteer.launch({
      headless: true, // Run in headless mode
      args: ['--no-sandbox', '--disable-setuid-sandbox'], // For environments like Docker, Vercel, etc.
    });

    const page = await browser.newPage();

    // Set viewport width and height
    await page.setViewport({
      width: 2400,
      height: 2000, // Adjust based on the content
    });

    // Navigate to the dynamic /Voucher page with the given ID
    const targetUrl = `http://localhost:3000/vouchers/${id}`;
    await page.goto(targetUrl, {
      waitUntil: 'networkidle2', // Ensure the page is fully loaded
    });

    // Ensure both divs exist on the page
    const frontExists = await page.$('#voucher-front');
    const backExists = await page.$('#voucher-back');
    if (!frontExists || !backExists) {
      throw new Error('One or both required divs (#voucher-front, #voucher-back) are missing');
    }

    // Add page breaks for the two divs
    await page.evaluate(() => {
      const front = document.querySelector('#voucher-front');
      const back = document.querySelector('#voucher-back');
      if (front) {
        front.style.pageBreakAfter = 'always'; // Add a page break after the front
      }
      if (back) {
        back.style.pageBreakBefore = 'always'; // Add a page break before the back
      }
    });

    // Generate the PDF with two pages
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true, // Include background graphics
      margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }, // Remove margins
    });

    // Close the browser
    await browser.close();

    // Return the PDF as a response (binary)
    return new NextResponse(pdf, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf', // Set the correct content type for the response
        'Content-Disposition': `attachment; filename="voucher-${id}.pdf"`, // Provide a filename for the download
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);

    // Return error response
    return new NextResponse(
      JSON.stringify({ message: 'Error generating PDF', error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
