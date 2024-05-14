import { useEffect } from "react";

function useImageButton({
  name,
  styles = {},
  imageStyles = {},
  src,
  alt,
  title = "",
  onClick = () => {},
}) {
  if (!name) {
    throw new Error("Button name is required");
  }

  if (!src) {
    throw new Error("Image source is required");
  }

  useEffect(() => {
    const customButton = document.querySelector(`.fc-${name}-button`);
    if (customButton) {
      // Apply default styles
      customButton.style.background = "none";
      customButton.style.outline = "none";
      customButton.style.border = "none";
      customButton.style.padding = 0;
      customButton.classList.add("custom-button");

      // Add more styles
      Object.entries(styles).forEach(([property, value]) => {
        customButton.style[property] = value;
      });

      // Set innerHTML to the image tag
      const defaultStyles = { height: "40px", width: "40px" };
      const imageStyleString = Object.entries({
        ...defaultStyles,
        ...imageStyles,
      })
        .map(([property, value]) => `${property}: ${value}`)
        .join("; ");

      // Create a wrapper span for the icon component
      const imgWrapper = document.createElement("img");
      imgWrapper.src = src;
      imgWrapper.alt = alt;
      imgWrapper.title = title;
      imgWrapper.style = imageStyleString;

      customButton.appendChild(imgWrapper);

      // customButton.innerHTML = `<img src="${src}" alt="${alt}" style="${imageStyleString}" />`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    [name]: {
      text: "",
      click: onClick,
    },
  };
}

export default useImageButton;
