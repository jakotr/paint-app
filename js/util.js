export function getMouseXYOnCanvas(canvas, e) {
    let rect = canvas.getBoundingClientRect();
    let x = Math.floor(e.clientX - rect.left);
    let y = Math.floor(e.clientY - rect.top);
    x < 0 ? x = 0 : x = x;
    y < 0 ? y = 0 : y = y;
    return {x:x, y:y}
}   