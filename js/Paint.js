import {  getMouseXYOnCanvas  } from './util.js';
import Tool from './Tool.js';

export default class Paint {
    constructor(canvas) {
        this.canvas = document.querySelector(canvas);
        this.ctx = this.canvas.getContext('2d');
        //bug fixed with the scale
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
    }

    set activeTool(tool) {
        this.tool = tool;
    }

    init() {
        this.canvas.onmousedown = e => this.onMouseDown(e);
    }

    onMouseDown(e) {
        // console.log(this.canvas.width, this.canvas.height)

        this.savedData = this.ctx.getImageData(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);

        this.canvas.onmousemove = e => this.onMouseMove(e);
        document.onmouseup = e => this.onMouseUp(e);

        this.startPos = getMouseXYOnCanvas(this.canvas, e);

    }

    onMouseMove(e) {
        this.currentPos = getMouseXYOnCanvas(this.canvas, e);
        

        switch(this.tool) {
            case Tool.TOOL_LINE:
                this.drawLine();
            break;
            case Tool.TOOL_RECTANGLE:
                this.drawRectangle();
            break;
            case Tool.TOOL_CIRCLE:
                this.drawCircle();
            break;
            case Tool.TOOL_TRIANGLE:
                this.drawTriangle();
            break;
            default:
                '';
        }
    }

    onMouseUp(e) {
        this.canvas.onmousemove = null; 
        document.onmouseup = null;
    }

    drawLine() {

        this.ctx.putImageData(this.savedData, 0, 0);

        this.ctx.beginPath();
        this.ctx.moveTo(this.startPos.x, this.startPos.y);
        this.ctx.lineTo(this.currentPos.x, this.currentPos.y);
        this.ctx.stroke();
    }

    drawRectangle() {
        this.ctx.putImageData(this.savedData, 0, 0);
        this.ctx.beginPath();
        this.ctx.rect(this.startPos.x, this.startPos.y, this.currentPos.x - this.startPos.x, this.currentPos.y - this.startPos.y);
        this.ctx.stroke();
    }

    drawCircle() {
        //dis formula - Pythagorean theorem - d=√((x_2-x_1)²+(y_2-y_1)²)
        let radius = Math.sqrt(Math.pow((this.currentPos.x - this.startPos.x), 2) + Math.pow((this.currentPos.y - this.startPos.y), 2));
        this.ctx.putImageData(this.savedData, 0, 0);
        this.ctx.beginPath();
        this.ctx.arc(this.startPos.x, this.startPos.y, radius, 0, 2*Math.PI);
        this.ctx.stroke();
    }

    drawTriangle() {
        this.ctx.putImageData(this.savedData, 0, 0);
        this.ctx.beginPath();
        this.ctx.moveTo((this.currentPos.x + this.startPos.x) / 2, this.startPos.y);
        this.ctx.lineTo(this.startPos.x, this.currentPos.y);
        this.ctx.lineTo(this.currentPos.x, this.currentPos.y);
        this.ctx.lineTo((this.currentPos.x + this.startPos.x) / 2, this.startPos.y);
        this.ctx.stroke();
    }
}