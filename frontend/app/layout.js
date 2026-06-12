import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata = {
  title: "LMS",
  description: "Learning Management System"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}