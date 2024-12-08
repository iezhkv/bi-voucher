import puppeteer from 'puppeteer';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    // Extract query parameters from the request URL
    const urlParams = new URLSearchParams(req.url.split('?')[1]);
    const name = urlParams.get('name') || 'Nadezhda Dimitrova Pandelieva';
    const price = urlParams.get('price') || '200';
    const wish = urlParams.get('wish') || 'Lorem Ipsum';

    // Construct the target URL with query parameters for the /Voucher route
    const targetUrl = `http://localhost:3000/Voucher?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}&wish=${encodeURIComponent(wish)}`;

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

    // Navigate to the /Voucher page with dynamic query parameters
    await page.goto(targetUrl, {
      waitUntil: 'networkidle2', // Ensure the page is fully loaded
    });

    // Capture the first div with the id 'capture1'
    const element1 = await page.$('#capture1');
    if (!element1) {
      throw new Error('Element with the id #capture1 not found');
    }

    // Get the bounding box of the first element
    const boundingBox1 = await element1.boundingBox();
    if (!boundingBox1) {
      throw new Error('Unable to get the bounding box of #capture1');
    }

    // Capture the second div with the id 'capture2'
    const element2 = await page.$('#capture2');
    if (!element2) {
      throw new Error('Element with the id #capture2 not found');
    }

    // Get the bounding box of the second element
    const boundingBox2 = await element2.boundingBox();
    if (!boundingBox2) {
      throw new Error('Unable to get the bounding box of #capture2');
    }

    // Generate the PDF with two pages (one for each div)
    const pdfBuffer = await page.pdf({
      format: 'A4', // A4 page format
      printBackground: true, // Include background graphics
      margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }, // Remove margins
      pageRanges: '1,2', // Two pages (we'll generate two separate pages below)
    });

    // Add content from the first div as the first page
    await page.evaluate((boundingBox1) => {
      const element1 = document.querySelector('#capture1');
      if (element1) {
        element1.style.pageBreakAfter = 'always'; // Ensure a page break after this element
      }
    }, boundingBox1);

    // Add content from the second div as the second page
    await page.evaluate((boundingBox2) => {
      const element2 = document.querySelector('#capture2');
      if (element2) {
        element2.style.pageBreakBefore = 'always'; // Ensure a page break before this element
      }
    }, boundingBox2);

    // Finalize PDF rendering with two separate pages
    const finalPdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      pageRanges: '1,2',
    });

    // Close the browser
    await browser.close();

    // Return the PDF as a response (binary)
    return new NextResponse(finalPdf, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf', // Set the correct content type for the response
        'Content-Disposition': `attachment; filename="voucher-capture.pdf"`, // Provide a filename for the download
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
