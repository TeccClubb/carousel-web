import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const passwordPattern = new RegExp(
  "^" +
    "(?=.*[0-9])" + //at least 1 digit
    // "(?=.*[a-z])" + //at least 1 lower case letter
    // "(?=.*[A-Z])" + //at least 1 upper case letter
    "(?=.*[a-zA-Z])" + //any letter
    // "(?=.*[@#$%^&+=])" + //at least 1 spacial character
    // "(?=\\S+$)" + //no white spaces
    ".{8,}" + //at least 8 characters , (maximum 15)
    "$"
);

export const getFormattedDate = (date: string) =>
  new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));

export const htmlContent = (value: string) =>
  value.replace(/\*(.*?)\*/g, (_, text) => {
    const match = text.match(EMAIL_REGEX);
    return match
      ? `<b><a href="mailto:${match[0]}" class="text-blue-600">${match[0]}</a></b>`
      : `<b>${text}</b>`;
  });

// const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
//   // Remove '#' if it exists
//   hex = hex.replace(/^#/, '');

//   // If the length is 3, convert to 6-digit hex
//   if (hex.length === 3) {
//     hex = hex.split('').map((char) => char + char).join('');
//   }

//   // Check if the hex code is valid
//   if (!/^([0-9a-fA-F]{6})$/.test(hex)) {
//     return null;
//   }

//   // Parse the hex values
//   const r = parseInt(hex.slice(0, 2), 16);
//   const g = parseInt(hex.slice(2, 4), 16);
//   const b = parseInt(hex.slice(4, 6), 16);

//   return { r, g, b };
// }

// export const isColorDark = (hex: string): boolean => {
//   const rgb = hexToRgb(hex);

//   if (!rgb) {
//     throw new Error("Invalid hex color");
//   }

//   // Calculate luminance using the formula
//   const luminance = 0.2126 * (rgb.r / 255) + 0.7152 * (rgb.g / 255) + 0.0722 * (rgb.b / 255);

//   // Return true if the color is dark, false if it's light
//   return luminance < 0.5;
// }

// const lightOrDark = (color: string) => {

//   let r, g, b;

//   if (color.match(/^rgb/)) {
//       color = color.match(
//           /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
//       );

//       r = color[1];
//       g = color[2];
//       b = color[3];
//   } else {
//       const hexColor = +("0x" + color.slice(1).replace(color.length < 5 && /./g, "$&$&"));

//       r = hexColor >> 16;
//       g = (hexColor >> 8) & 255;
//       b = hexColor & 255;
//   }

//   const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;

//   if (brightness > 128) {
//       return "light";
//   } else {
//       return "dark";
//   }
// }

export const getBrightness = (color: string) => {
  let r: number, g: number, b: number;

  if (color.match(/^rgb/)) {
    const colorMatch = color.match(
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
    );

    if (colorMatch) {
      r = parseInt(colorMatch[1], 10);
      g = parseInt(colorMatch[2], 10);
      b = parseInt(colorMatch[3], 10);
    } else {
      throw new Error("Invalid RGB or RGBA color format");
    }
  } else {
    const hexColor =
      color.length === 4
        ? parseInt(
            "0x" +
              color
                .slice(1)
                .split("")
                .map((x) => x + x)
                .join(""),
            16
          )
        : parseInt("0x" + color.slice(1), 16);

    r = (hexColor >> 16) & 255;
    g = (hexColor >> 8) & 255;
    b = hexColor & 255;
  }

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

//
//   color: string
// ): "light" | "dark" | "intermediate" => {
//   let r: number, g: number, b: number;

//   if (color.match(/^rgb/)) {
//     const colorMatch = color.match(
//       /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
//     );

//     if (colorMatch) {
//       r = parseInt(colorMatch[1], 10);
//       g = parseInt(colorMatch[2], 10);
//       b = parseInt(colorMatch[3], 10);
//     } else {
//       throw new Error("Invalid RGB or RGBA color format");
//     }
//   } else {
//     const hexColor =
//       color.length === 4
//         ? parseInt(
//             "0x" +
//               color
//                 .slice(1)
//                 .split("")
//                 .map((x) => x + x)
//                 .join(""),
//             16
//           )
//         : parseInt("0x" + color.slice(1), 16);

//     r = (hexColor >> 16) & 255;
//     g = (hexColor >> 8) & 255;
//     b = hexColor & 255;
//   }

//   const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;

//   // return brightness > 128 ? "light" : "dark";
//   return brightness > 200 ? "light" : brightness < 80 ? "dark" : "intermediate";
// };

// export const isColorDark = (color: string) => {
// return lightOrDark(color) === "dark";
// }

// export const isColorLight = (color: string) => {
// return lightOrDark(color) === "light";
// }
