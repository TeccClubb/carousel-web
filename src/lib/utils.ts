import { LOGOUT_ROUTE, UPLOAD_IMAGE_ROUTE } from "@/constant";
import { googleLogout } from "@react-oauth/google";
import axios, { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const uploadImage = async ({
  oldUrl,
  file,
  loadingSetter,
  onImageSelect,
  onError,
}: {
  oldUrl: string;
  file: File;
  loadingSetter: ({
    isLoading,
    title,
  }: {
    isLoading: boolean;
    title?: string;
  }) => void;
  onImageSelect: (imageSrc: string) => void;
  onError: (message: string) => void;
}) => {
  try {
    loadingSetter({ isLoading: true, title: "Uploading..." });
    const formData = new FormData();
    formData.append("image", file);
    if (oldUrl.startsWith("http")) {
      formData.append("old_url", oldUrl);
    }
    const res = await axios
      .post<{ status: boolean; url: string }>(UPLOAD_IMAGE_ROUTE, formData)
      .then((res) => res.data);
    if (res.status) {
      onImageSelect(res.url);
    }
  } catch (error) {
    onError(
      error instanceof AxiosError
        ? error.message
        : "Something went wrong while uploading image"
    );
  } finally {
    loadingSetter({ isLoading: false });
  }
};

export const logout = async ({
  access_token,
  loadingSetter,
  onSuccess,
  onError,
}: {
  access_token: string;
  loadingSetter: ({
    isLoading,
    title,
  }: {
    isLoading: boolean;
    title?: string;
  }) => void;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}) => {
  try {
    loadingSetter({ isLoading: true, title: "Logging out..." });
    googleLogout();
    const res = await axios
      .post<{ status: boolean; message: string }>(
        LOGOUT_ROUTE,
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then((res) => res.data);
    if (res.status) {
      onSuccess(res.message);
    } else onError(res.message);
  } catch (error) {
    onError(
      error instanceof AxiosError
        ? error.message
        : "Something went wrong while logout"
    );
  } finally {
    loadingSetter({ isLoading: false });
  }
};

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
