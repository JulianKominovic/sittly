import { NavigateFunction } from "react-router";

const UPDOWN_X_TOLERANCE = 10;
const LIMIT = 200;

export function findNextTabStop(el: Element) {
  const currentElement = el.getBoundingClientRect();
  let i = 0;
  while (i < LIMIT) {
    const found = document.elementFromPoint(
      currentElement.left + UPDOWN_X_TOLERANCE,
      currentElement.bottom + (i + 1)
    );
    const rightCandidate = Number((found as HTMLElement)?.tabIndex) >= 0;
    if (found && rightCandidate) return found;
    i++;
  }

  return null;
}
export function findPrevTabStop(el: Element) {
  const currentElement = el.getBoundingClientRect();
  let i = 0;
  while (i < LIMIT) {
    const found = document.elementFromPoint(
      currentElement.left + UPDOWN_X_TOLERANCE,
      currentElement.top - (i + 1)
    );
    const rightCandidate = Number((found as HTMLElement)?.tabIndex) >= 0;
    if (found && rightCandidate) return found;
    i++;
  }
  return null;
}

export function findRightTabStop(el: Element) {
  const currentElement = el.getBoundingClientRect();
  let i = 0;
  while (i < LIMIT) {
    const found = document.elementFromPoint(
      currentElement.right + (i + 1),
      currentElement.y
    );
    const rightCandidate = Number((found as HTMLElement)?.tabIndex) >= 0;
    if (found && rightCandidate) return found;
    i++;
  }
  return null;
}
export function findLeftTabStop(el: Element, navigation: NavigateFunction) {
  const currentElement = el.getBoundingClientRect();
  let i = 0;
  while (i < LIMIT) {
    const found = document.elementFromPoint(
      currentElement.left - (i + 1),
      currentElement.y
    );
    const rightCandidate = Number((found as HTMLElement)?.tabIndex) >= 0;
    if (found && rightCandidate) return found;
    i++;
  }

  return null;
}
