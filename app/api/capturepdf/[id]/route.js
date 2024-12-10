import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        // Extract the `id` from the URL path
        const { id } = params;

        if (!id) {
            throw new Error("Missing `id` parameter in the URL");
        }

        // Make a POST request to /api/capturepdf/ with the id
        const response = await fetch(`${process.env.NEXT_PUBLIC_NEXT_API_BASE_URL}/api/capturepdf/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }), // Send the id in the request body
        });

        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`Failed to capture PDF: ${response.statusText}`);
        }

        // Forward the PDF response to the client
        const pdfBuffer = await response.arrayBuffer();
        return new NextResponse(pdfBuffer, {
            status: 200,
            headers: {
                "Content-Type": "application/pdf", // Indicate a PDF file
                "Content-Disposition": `attachment; filename="voucher-${id}.pdf"`, // Set the file name
            },
        });
    } catch (error) {
        console.error("Error in GET /api/capturepdf:", error);

        // Return error response
        return new NextResponse(
            JSON.stringify({
                message: "Error in GET /api/capturepdf",
                error: error.message,
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
