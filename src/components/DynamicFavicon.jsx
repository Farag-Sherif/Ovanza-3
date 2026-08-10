import { useEffect } from "react";
import { useSlidersQuery } from "../hooks/queries/useSlidersQuery";

export default function DynamicFavicon() {
  const { data: sliders = [] } = useSlidersQuery();

  useEffect(() => {
    if (sliders && sliders.length > 0) {
      const firstSlider = sliders[0];
      if (firstSlider?.image_path) {
        const link =
          document.querySelector("link[rel*='icon']") ||
          document.createElement("link");
        link.type = "image/x-icon";
        link.rel = "shortcut icon";
        link.href = firstSlider.image_path;
        document.getElementsByTagName("head")[0].appendChild(link);
      }
    }
  }, [sliders]);

  return null;
}
