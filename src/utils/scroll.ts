export function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  target.focus({ preventScroll: true });
}
