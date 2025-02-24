/**
 * Checks if a given text fits within a specified container width.
 * @param {string} text - The text to measure.
 * @param {number} containerWidth - The width of the container in pixels.
 * @param {string} [fontType="IRANSansWeb"] - The font family (e.g., "IRANSansWeb").
 * @param {string} [fontWeight="400"] - The font weight (e.g., "400", "bold").
 * @param {string} [fontSize="16px"] - The font size (e.g., "14px").
 * @returns {boolean} - True if the text fits, false otherwise.
 */
export default function doesTextFitInContainer(
  text: string,
  containerWidth: number,
  fontType: string = "IRANSansWeb", // Default font family set to IRANSansWeb
  fontWeight: string = "400",
  fontSize: string = "16px"
): boolean {
  // Create a temporary canvas element
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  if (!context) {
      console.error('Canvas context is not supported.');
      return false;
  }

  // Set the font properties
  context.font = `${fontWeight} ${fontSize} ${fontType}`;

  // Measure the width of the text
  const textWidth = context.measureText(text).width;

  // Clean up the canvas element
  canvas.remove();

  // Check if the text width is less than or equal to the container width
  return textWidth <= containerWidth;
}