export const rescueScrollIntoView = (target: HTMLElement | EventTarget) => {
  const id = setTimeout(() => {
    (target as HTMLElement).scrollIntoView({
      block: "center",
      inline: "center",
    });
    clearTimeout(id);
  }, 100);
};
