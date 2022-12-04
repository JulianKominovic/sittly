const LIMIT = 400;
function findNextTabStop() {
  let i = 0;
  while (i < LIMIT) {
    const found = document.elementFromPoint(i, i);
    const rightCandidate = Number((found as HTMLElement)?.tabIndex) >= 0;
    if (found && rightCandidate) return found;
    i++;
  }
  return null;
}
export default () => {
  const id = setTimeout(() => {
    const element = findNextTabStop();
    (element as HTMLElement)?.focus();
    element?.scrollIntoView({ block: "center", inline: "center" });
    clearTimeout(id);
  }, 10);
};
