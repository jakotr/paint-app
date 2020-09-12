import {  getMouseXYOnCanvas, mobileAndTabletCheck  } from './util.js';
import Tool from './Tool.js';
import FloodFill from './FloodFill.js';

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

    set activeLineWidth(width) {
        this.width = width;
    }

    set activeColor(color) {
        this.color = color;
    }

    init() {
        // console.log(mobileAndTabletCheck())
        mobileAndTabletCheck() ? this.canvas.ontouchstart = e => this.onMouseDown(e) : this.canvas.onmousedown = e => this.onMouseDown(e);
        
    }

    onMouseDown(e) {
        
        this.savedData = this.ctx.getImageData(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);

        mobileAndTabletCheck() ? this.canvas.ontouchmove = e => this.onMouseMove(e) : this.canvas.onmousemove = e => this.onMouseMove(e);
        mobileAndTabletCheck() ?  document.ontouchend = e => this.onMouseUp(e) : document.onmouseup = e => this.onMouseUp(e);

        this.startPos = getMouseXYOnCanvas(this.canvas, e);

        if(this.tool == Tool.TOOL_PEN || this.tool == Tool.TOOL_BRUSH) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.startPos.x, this.startPos.y);
        } else if(this.tool == Tool.TOOL_PAINT) {
            new FloodFill(this.canvas, this.startPos, this.color);
        }


    }

    onMouseMove(e) {
        
        this.currentPos = getMouseXYOnCanvas(this.canvas, e);
        
        if(this.tool != Tool.TOOL_PEN && this.tool != Tool.TOOL_BRUSH) {
            this.ctx.beginPath();
        }
        
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
            case Tool.TOOL_PEN:
                this.drawPenLine();
            break;
            case Tool.TOOL_BRUSH:
                this.drawBrushLine();
            break;
            default:
                '';
        }
        this.ctx.lineWidth = this.tool == Tool.TOOL_BRUSH ? this.width*2 : this.width;
        this.ctx.strokeStyle = this.color;
        this.ctx.stroke();
    }

    onMouseUp(e) {
        mobileAndTabletCheck() ? this.canvas.ontouchmove = null : this.canvas.onmousemove = null; 
        mobileAndTabletCheck() ? document.ontouchend = null : document.onmouseup = null;
    }

    drawLine() {

        this.ctx.putImageData(this.savedData, 0, 0);
        // this.ctx.beginPath();
        this.ctx.moveTo(this.startPos.x, this.startPos.y);
        this.ctx.lineTo(this.currentPos.x, this.currentPos.y);
        // this.ctx.stroke();
    }

    drawRectangle() {
        this.ctx.putImageData(this.savedData, 0, 0);
        // this.ctx.beginPath();
        this.ctx.rect(this.startPos.x, this.startPos.y, this.currentPos.x - this.startPos.x, this.currentPos.y - this.startPos.y);
        // this.ctx.stroke();
    }

    drawCircle() {
        //dis formula - Pythagorean theorem - d=√((x_2-x_1)²+(y_2-y_1)²)
        let radius = Math.sqrt(Math.pow((this.currentPos.x - this.startPos.x), 2) + Math.pow((this.currentPos.y - this.startPos.y), 2));
        this.ctx.putImageData(this.savedData, 0, 0);
        // this.ctx.beginPath();
        this.ctx.arc(this.startPos.x, this.startPos.y, radius, 0, 2*Math.PI);
        // this.ctx.stroke();
    }

    drawTriangle() {
        this.ctx.putImageData(this.savedData, 0, 0);
        // this.ctx.beginPath();
        this.ctx.moveTo((this.currentPos.x + this.startPos.x) / 2, this.startPos.y);
        this.ctx.lineTo(this.startPos.x, this.currentPos.y);
        this.ctx.lineTo(this.currentPos.x, this.currentPos.y);
        this.ctx.lineTo((this.currentPos.x + this.startPos.x) / 2, this.startPos.y);
        // this.ctx.stroke();
    }

    drawPenLine() {
        this.ctx.lineTo(this.currentPos.x, this.currentPos.y );
        // this.ctx.stroke();
    }

    drawBrushLine() {
        this.ctx.lineTo(this.currentPos.x, this.currentPos.y);
    }

}