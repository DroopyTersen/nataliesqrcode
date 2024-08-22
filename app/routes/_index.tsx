import type { MetaFunction } from "@remix-run/cloudflare";
import QRCodeGenerator from "./QRCodeGenerator";

export const meta: MetaFunction = () => {
  return [
    { title: "QR Code Generator" },
    {
      name: "description",
      content: "Enter a URL. Get a QR code.",
    },
  ];
};

export default function Index() {
  return <QRCodeGenerator />;
}
