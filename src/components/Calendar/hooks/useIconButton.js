import { useEffect } from "react";
import { createRoot } from "react-dom/client";

function useIconButton({
  name,
  title = "",
  icon: IconComponent,
  styles = {},
  onClick = () => {},
}) {
  if (!name) {
    throw new Error("Button name is required");
  }

  if (!IconComponent) {
    throw new Error("Icon component is required");
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

      // Create a wrapper span for the icon component
      const iconWrapper = document.createElement("span");
      iconWrapper.title = title;
      // iconWrapper.style.display = "inline-block";
      // iconWrapper.style.color = "black";
      const root = createRoot(iconWrapper);
      root.render(IconComponent);

      // Append the icon wrapper to the button
      customButton.appendChild(iconWrapper);

      // Set innerHTML to the icon component
      // customButton.innerHTML = `<span style="display: inline-block">${IconComponent}</span>`;
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

export default useIconButton;
