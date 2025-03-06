import { CarouselData } from "@/types";
import puppeteer from "puppeteer";

export async function GET(request: Request) {
  const host = request.headers.get("host") || "localhost:3000";
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const requestURL = new URL(request.url);
  const encodedCarousel = requestURL.searchParams.get("carousel");
  const encodedUser = requestURL.searchParams.get("user");
  const carousel = encodeURIComponent(encodedCarousel!);
  const user = encodeURIComponent(encodedUser!);
  const url = `${protocol}://${host}/download-carousel?carousel=${carousel}&user=${user}`;

  const decodedCarouselData: CarouselData = JSON.parse(
    decodeURIComponent(encodedCarousel!)
  );
  const {
    slideRatio: { width, height },
  } = decodedCarouselData;

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const pageWidth = 1024;
    const pageHeight = (height / width) * pageWidth;
    await page.setViewport({
      width: pageWidth,
      height: pageHeight,
    });

    await page.goto(url, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      width: pageWidth,
      height: pageHeight,
      printBackground: true,
    });

    await browser.close();

    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="react-app-output.pdf"',
      },
    });
  } catch (error) {
    throw error;
  }
}
