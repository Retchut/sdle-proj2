export default function Canvas(props){
    const id = props.id;
    const canvasContents = props.canvas;

    const buildRow = (rowContents) => {
        return Object.keys(rowContents).map(key => (<td key={`col-${key}`} className="text-center align-middle">{rowContents[key]}</td>));
    };

    const buildTable = (tableContents) => {
        return Object.keys(tableContents).map(key => (<tr key={`row-${key}`}>{buildRow(tableContents[key])}</tr>))
    }

    return (
        <table id={id + `-canvas`} className="h-100 w-75 border-secondary border border-4 border-dark">
            <tbody>
                {buildTable(canvasContents)}
            </tbody>
        </table>
    )
}