/**
 * follow.js
 *
 * Created by jrootham on 12/06/15.
 *
 * Copyright © 2014 Jim Rootham
 */

function always(parentWidth, parentHeight) {
    return true;
}

function big(parentWidth, parentHeight) {
    return parentWidth > 1000 && parentHeight > 1000;
}

function medium(parentWidth, parentHeight) {
    return parentWidth > 500 && parentHeight > 500;
}

function distance(mouseLocation, rowIndex, columnIndex) {
    let dx = mouseLocation.column + columnIndex;
    let dy = mouseLocation.row + rowIndex;

    return Math.sqrt(dx * dx + dy * dy);
}

function setColour(previous, rowIndex, rowCount, columnIndex, columnCount, state, mouseLocation) {

    let size = $('input[name="size"]:checked').val();
//    const size = 1;

    var red = 0;
    if (rowIndex <= rowCount / 100 && columnIndex <= columnCount / 10)
    {
        red = 0;
    }

    if (mouseLocation) {
        let range = distance(mouseLocation, rowIndex, columnIndex);
        if (range < size) {
            red = 255 * (size - range) / size;
        }
    }

    return new RGB(
        red,
        Math.floor(50 * rowIndex / rowCount),
        Math.floor(50 * columnIndex / columnCount)
    );
}

var specArray = [
    {
        condition: big,
        spec: {
            rowCount:40,
            columnCount: 80,
            borderWidth: 0.5,
            borderColour: new RGB(180, 180, 180),
            setColour: setColour
        }
    },
    {
        condition: medium,
        spec: {
            rowCount: 40,
            columnCount: 80,
            borderWidth: 0.5,
            borderColour: new RGB(180, 180, 180),
            setColour: setColour
        }
    },
    {
        condition: always,
        spec: {
            rowCount: 5,
            columnCount: 10,
            borderWidth: 0.5,
            borderColour: new RGB(180, 180, 180),
            setColour: setColour
        }
    }
]

action(specArray, $('#drawing'), $('#foreground'));
