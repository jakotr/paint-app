export default class FloodFill{
    constructor(canvas, point, replaceColor) {
        this.ctx = canvas.getContext('2d');

        this.imageData = this.ctx.getImageData(0, 0, canvas.width, canvas.height);

        const targetColor = this.getPixel(point);
        const newColor = this.hexIntoRgb(replaceColor);

        this.stack = [];
        this.fill(point, targetColor, newColor);
        this.fillColor();
        
    }

    fill(point, targetColor, newColor) {
        if(this.sameColor(targetColor, newColor)) {
            return;
        }

        const currentColor = this.getPixel(point);

        if(this.sameColor(targetColor, currentColor)) {
            this.setPixel(point, newColor);

            this.stack.push([{x: point.x + 1, y: point.y}, targetColor, newColor]);
            this.stack.push([{x: point.x - 1, y: point.y}, targetColor, newColor]);
            this.stack.push([{x: point.x, y: point.y + 1}, targetColor, newColor]);
            this.stack.push([{x: point.x, y: point.y - 1}, targetColor, newColor]);
        }
    }

    fillColor() {
        if(this.stack.length) {
            let range = this.stack.length;

            for(let i=0; i < range; i++) {
                this.fill(this.stack[i][0], this.stack[i][1], this.stack[i][2]);
            }

            this.stack.splice(0, range);
            this.fillColor();
        } else {
            this.ctx.putImageData(this.imageData, 0, 0);
            this.stack = [];
        }
    }

    setPixel(point, newColor) {
        const targetPixel = (point.y * this.imageData.width + point.x) * 4;

        this.imageData.data[targetPixel + 0] = newColor[0];
        this.imageData.data[targetPixel + 1] = newColor[1];
        this.imageData.data[targetPixel + 2] = newColor[2];
        this.imageData.data[targetPixel + 3] = newColor[3];
    }

    getPixel(point) {
        //selecting the rgba values from the exact pixel taht we clicked
        const targetPixel = (point.y * this.imageData.width + point.x) * 4;


        return [
            this.imageData.data[targetPixel + 0], //r
            this.imageData.data[targetPixel + 1], //g
            this.imageData.data[targetPixel + 2], //b
            this.imageData.data[targetPixel + 3], //a
        ]
    }

    sameColor(c1, c2) {
        return c1[0] === c2[0] && c1[1] === c2[1] && c1[2] === c2[2] && c1[3] === c2[3];
    }

    hexIntoRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16),
            255,
        ] : null;
    }
}