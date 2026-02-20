export function setButtonText(
  btn,
  isLoading,
  defaultText = "Save",
  loadingText = "Saving...",
) {
  if (isLoading) {
    btn.textContent = isLoading ? loadingText : defaultText;
  } else {
    btn.textContent = defaultText;
  }
}
