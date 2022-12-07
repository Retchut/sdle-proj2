const CANVAS_SIZE = 10;

/**
 * Generates an empty canvas
 * @returns The generated canvas object, of size CANVAS_SIZE*CANVAS_SIZE
 */
function initializeCanvas(){
    const canvas = {};
    const row = {};
    for(let x = 0; x < CANVAS_SIZE; x++){
        row[x] = '0';
    }

    for(let y = 0; y < CANVAS_SIZE; y++){
        canvas[y] = {};
        Object.assign(canvas[y], row);
    }

    return canvas;
}

/**
 * Updates a canvas with a change's contents
 * @param {*} canvas    The canvas to update
 * @param {*} change    The change to update the canvas with
 * @returns     The updated canvas
 */
function updateCanvas(canvas, change) {
    var copy = {};
    var data_test
    canvas.map().once(function(data, key){
        //copy[key] = data
        //copy[key] = {}
        //Object.assign(copy[key], data);
        //console.log(Object.keys(copy).length)
        key_test = data
    })
    console.log(data)
    //console.log(Object.keys(copy).length)

    //Object.assign(copy, canvas);

    //id|timestamp|char|start|end
    //alice|timestamp|c|x,y|x,y
    // { timestamp : 'miliseconds since epoch' , char : 'c', start : '0,0', end : '1,1' }
    // TODO: compare timestamps and change localNodeChanges
    // const timestamp = change.timestamp;
    // const char = change.char;
    // const start = change.start.split(',');
    // const end = change.end.split(',');
    const timestamp = change.timestamp;
    const char = change.char;
    const start = change.start.split(',');
    const end = change.end.split(',');

    for(let y = 0; y < CANVAS_SIZE; y++){
        for(let x = 0; x < CANVAS_SIZE; x++){
            if(x === parseInt(start[0]) && y === parseInt(start[1]) ||
                x === parseInt(end[0]) && y === parseInt(end[1]))
                copy[y][x] = char;
        }
    }

    return copy;
}

export { initializeCanvas, updateCanvas };