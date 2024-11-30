import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata = {
  title: "Social Media",
  description: "Post inane banter and follow your bezzies",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`text-2xl h-screen w-screen flex flex-col bg-myLightGrey text-myBlack`}
        >
          <Nav />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
