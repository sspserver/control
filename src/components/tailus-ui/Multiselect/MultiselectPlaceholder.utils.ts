export const multiselectPlaceholderContainerId = 'multiselect-placeholder-container';

function isElementVisible(child: Element, parent: HTMLElement): boolean {
  const childRect = child.getBoundingClientRect();
  const parentRect = parent.getBoundingClientRect();
  const childLeftRelativePosition = (childRect.left + childRect.width) - parentRect.left;
  const parentWidth = parentRect.width;

  return childLeftRelativePosition <= parentWidth;
}

export function getAmountOfVisibleChildren(id: string): number {
  const container = document.getElementById(id);
  const children = container?.children ?? [];
  let amountOfChildren = 0;

  if (container) {
    for (const child of children) {
      const isChildVisible = isElementVisible(child, container);

      if (isChildVisible) {
        amountOfChildren++;
        continue;
      }

      return amountOfChildren;
    }
  }

  return amountOfChildren;
}
