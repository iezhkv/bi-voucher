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
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 2400, height: 2000 });

    const targetUrl = `http://localhost:3000/vouchers/${id}`;
    await page.goto(targetUrl, { waitUntil: 'networkidle2' });

    // Ensure the required elements exist
    const frontExists = await page.$('#voucher-front');
    const backExists = await page.$('#voucher-back');
    if (!frontExists || !backExists) {
      throw new Error('One or both required divs (#voucher-front, #voucher-back) are missing');
    }

    // Render only the two divs
    await page.evaluate(() => {
      const body = document.querySelector('body');
      const front = document.querySelector('#voucher-front');
      const back = document.querySelector('#voucher-back');

      if (body) {
        // Clear the body content
        body.innerHTML = '';

        // Append the two required divs
        if (front) body.appendChild(front.cloneNode(true));
        if (back) body.appendChild(back.cloneNode(true));
      }
    });

    // Add page breaks for the two divs
    await page.evaluate(() => {
      const front = document.querySelector('#voucher-front');
      const back = document.querySelector('#voucher-back');

      if (front) front.style.pageBreakAfter = 'always';
      if (back) back.style.pageBreakBefore = 'always';
    });

    // Generate the PDF
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
    });

    // Close the browser
    await browser.close();

    // Return the PDF as a response
    return new NextResponse(pdf, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="voucher-${id}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return new NextResponse(
      JSON.stringify({ message: 'Error generating PDF', error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
