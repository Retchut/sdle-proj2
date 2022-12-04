const CANVAS_SIZE = 10;

const initializeCanvas = () => {
    const canvas = []
    for(let i = 0; i < CANVAS_SIZE; i++){
        canvas.push(Array(CANVAS_SIZE).fill('0'))
    }
    return canvas;
}

const updateCanvas = (canvas, message) => {
    //id|timestamp|char|start|end
    //alice|timestamp|c|x,y|x,y
    // { timestamp : 'miliseconds since epoch' , char : 'c', start : '0,0', end : '1,1' }
    // TODO: compare timestamps and change localNodeChanges
    const timestamp = message.timestamp;
    const char = message.char;
    const start = message.start.split(',');
    const end = message.end.split(',');

    for(let y = 0; y < CANVAS_SIZE; y++){
        for(let x = 0; x < CANVAS_SIZE; x++){
            if(x === parseInt(start[0]) && y === parseInt(start[1]) ||
                x === parseInt(end[0]) && y === parseInt(end[1]))
                canvas[y][x] = char;
        }
    }
    console.log(canvas)
    return canvas;
}

export { initializeCanvas, updateCanvas };