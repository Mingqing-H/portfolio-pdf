const cornerSamples = Array.from({ length: 11 }, (_, index) => {
  const angle = index / 10 * Math.PI / 2;
  return [1 - Math.sqrt(Math.sin(angle)), 1 - Math.sqrt(Math.cos(angle))] as const;
});

type Point = readonly [number, number];

export function curvedWindow(offset: number, halfWidth: number, scale: number) {
  const radius = Math.max(halfWidth - 14 * scale, 1);
  const distance = Math.abs(offset) / radius;
  const x = offset * (1 + 0.083 * (offset / radius) ** 2);
  const width = (170 + 48 * distance ** 2) * scale;
  const edgeHeight = (edge: number) => (280 + 92 * (Math.abs(edge) / radius) ** 2.6) * scale;
  const leftHeight = edgeHeight(x - width / 2);
  const rightHeight = edgeHeight(x + width / 2);
  const height = Math.max(leftHeight, rightHeight);
  const corners: Point[] = [
    [0, (height - leftHeight) / 2],
    [width, (height - rightHeight) / 2],
    [width, (height + rightHeight) / 2],
    [0, (height + leftHeight) / 2],
  ];
  const rounding = 15 * scale;
  const points: string[] = [];
  corners.forEach((corner, index) => {
    const before = corners[(index + 3) % 4];
    const after = corners[(index + 1) % 4];
    const beforeLength = Math.hypot(before[0] - corner[0], before[1] - corner[1]);
    const afterLength = Math.hypot(after[0] - corner[0], after[1] - corner[1]);
    for (const [a, b] of cornerSamples) {
      const px = corner[0] + rounding * (a * (before[0] - corner[0]) / beforeLength + b * (after[0] - corner[0]) / afterLength);
      const py = corner[1] + rounding * (a * (before[1] - corner[1]) / beforeLength + b * (after[1] - corner[1]) / afterLength);
      points.push(`${px.toFixed(2)} ${py.toFixed(2)}`);
    }
  });
  return {
    x, width, height,
    rise: -12 * distance ** 2 * scale,
    bottomInset: (height - Math.min(leftHeight, rightHeight)) / 2,
    clip: `path("M${points.join('L')}Z")`,
  };
}
