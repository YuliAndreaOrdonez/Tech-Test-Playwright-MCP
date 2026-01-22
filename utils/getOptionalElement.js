export async function getOptionalLocator(page, selector) {
  const locator = page.locator(selector);
  return (await locator.count()) > 0 ? locator : null;
}
