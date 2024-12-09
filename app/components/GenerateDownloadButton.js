import { useState } from "react";
import { Button, CircularProgress } from "@mui/material";

export default function GenerateDownloadButton({ data }) {
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);

  const handleDownload = async () => {
    // If the PDF is not yet ready, generate it
    if (!downloadUrl) {
      setLoading(true);

      try {
        // Send POST request with data to the server
        const response = await fetch("/api/capturepdf", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        // Check if the response is successful
        if (!response.ok) {
          throw new Error(`Failed to generate PDF. Status: ${response.status}`);
        }

        // Get the PDF blob from the response
        const pdfBlob = await response.blob();

        // Create a URL for the PDF Blob
        const pdfUrl = URL.createObjectURL(pdfBlob);

        // Set the download URL
        setDownloadUrl(pdfUrl);
      } catch (error) {
        console.error("Error during PDF generation:", error.message);
        alert(`An error occurred: ${error.message}`);
      } finally {
        setLoading(false);
      }
    } else {
      // If the PDF is ready, trigger the download
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "voucher-capture.pdf";
      link.click();
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleDownload}
      disabled={loading}
      sx={{
        marginTop: 2,
        padding: "12px 24px",
        fontSize: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loading ? (
        <>
          <CircularProgress size={24} sx={{ marginRight: 2 }} />
          Generating PDF...
        </>
      ) : downloadUrl ? (
        "Download PDF"
      ) : (
        "Generate PDF"
      )}
    </Button>
  );
}
