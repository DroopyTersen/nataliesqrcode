import { useState, useEffect, useRef } from "react";
import QRCode from "qrcode.react";

export default function QRCodeGenerator() {
  const [url, setUrl] = useState("");
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  const qrRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (url && qrRef.current) {
      const canvas = qrRef.current.querySelector("canvas");
      if (canvas) {
        setQrCodeDataUrl(canvas.toDataURL("image/png"));
      }
    } else {
      setQrCodeDataUrl(null);
    }
  }, [url]);

  const downloadQRCode = () => {
    if (!qrCodeDataUrl) return;

    const link = document.createElement("a");
    link.href = qrCodeDataUrl;
    link.download = "qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
          QR Code Generator
        </h1>
        <div className="mb-4">
          <label
            htmlFor="url"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Enter URL
          </label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col items-center">
          <div ref={qrRef} style={{ display: "none" }}>
            {url && (
              <QRCode
                value={url}
                size={200}
                bgColor={"#00000000"}
                fgColor={"#000000"}
                level={"L"}
                includeMargin={false}
              />
            )}
          </div>
          {qrCodeDataUrl && (
            <img src={qrCodeDataUrl} alt="QR Code" width={200} height={200} />
          )}
          {url && (
            <button
              onClick={downloadQRCode}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Download QR Code
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
