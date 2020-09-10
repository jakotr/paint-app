// lineWidth check if its working with the brush or todo new one in html like 1407

import Tool from './Tool.js';
import Paint from './Paint.js';

const icons = document.querySelectorAll('.group__icon');
const lineWidthGroup = document.querySelector('.toolbox-left__line-options');
const lineWidth = document.querySelectorAll('.group__line-width');
const colorPick = document.querySelectorAll('.toolbox-right__colors__wrapper');

const paint = new Paint('canvas');
paint.activeTool = Tool.TOOL_LINE;
paint.init();

// listener for icons on left toolbox (without the line width)
icons.forEach(icon => {
    icon.addEventListener('click', (e) => {
        // activated selected icon to know what is selected ( without 2 first: undo & download)
        if(!(icon.dataset.icon == 'undo' || icon.dataset.icon == 'download')) {
            document.querySelector('[data-icon].active').classList.toggle('active');
            icon.classList.toggle('active');
        } 
        
        let selectedTool = icon.dataset.icon;
        paint.activeTool = selectedTool;
            
        switch (selectedTool) {
            case Tool.TOOL_LINE:
            case Tool.TOOL_RECTANGLE:
            case Tool.TOOL_CIRCLE:
            case Tool.TOOL_TRIANGLE:
            case Tool.TOOL_PEN:
            case Tool.TOOL_BRUSH:
                lineWidthGroup.classList.add('display');
            break;
            default: 
                lineWidthGroup.classList.remove('display');
        }
    });
});

//listener for lineWIdth in the left toolbox
lineWidth.forEach(width => {
    width.addEventListener('click', () => {
        document.querySelector('[data-line-width].active').classList.toggle('active');
        width.classList.toggle('active');
    });
});

//listener for every color in the right toolbox 
colorPick.forEach(color => {
    color.addEventListener('click', () => {
        document.querySelector('[data-color].active').classList.toggle('active');
        color.classList.toggle('active');
    });
});