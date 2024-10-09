let fields = [
    null, null, null,
    null, null, null,
    null, null, null,
];

let currentPlayer = 'circle'; // Beginne mit 'circle'

function render() {
    const content = document.getElementById('content');
    let html = '<table>';

    for (let i = 0; i < 3; i++) {
        html += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            const symbol = fields[index];
            html += `<td onclick="handleCellClick(this, ${index})">${symbol ? (symbol === 'circle' ? createAnimatedCircle() : createAnimatedCross()) : ''}</td>`;
        }
        html += '</tr>';
    }

    html += '</table>';
    content.innerHTML = html;
}

function handleCellClick(cell, index) {
    if (fields[index] === null) { // Prüfe, ob das Feld leer ist
        fields[index] = currentPlayer; // Setze das aktuelle Symbol
        cell.innerHTML = currentPlayer === 'circle' ? createAnimatedCircle() : createAnimatedCross();
        cell.onclick = null;

        // Überprüfe, ob das Spiel vorbei ist
        const winner = checkWinner();
        if (winner) {
            drawWinningLine(winner);
        } else {
            currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle'; // Wechsle den Spieler
        }
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontale Kombinationen
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertikale Kombinationen
        [0, 4, 8], [2, 4, 6]             // diagonale Kombinationen
    ];

    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            return combo; // Gibt die Gewinnkombination zurück
        }
    }
    return null; // Kein Gewinner
}

function drawWinningLine(combination) {
    const lineColor = '#ffffff';
    const lineWidth = 5;

    const startCell = document.querySelectorAll(`td`)[combination[0]];
    const endCell = document.querySelectorAll(`td`)[combination[2]];
    const startRect = startCell.getBoundingClientRect();
    const endRect = endCell.getBoundingClientRect();

    const contentRect = document.getElementById('content').getBoundingClientRect();

    const lineLength = Math.sqrt(
        Math.pow(endRect.left - startRect.left, 2) + Math.pow(endRect.top - startRect.top, 2)
    );
    const lineAngle = Math.atan2(endRect.top - startRect.top, endRect.left - startRect.left);

    const line = document.createElement('div');
    line.style.position = 'absolute';
    line.style.width = `${lineLength}px`;
    line.style.height = `${lineWidth}px`;
    line.style.backgroundColor = lineColor;
    line.style.top = `${startRect.top + startRect.height / 2 - lineWidth / 2} px`;
    line.style.left = `${startRect.left + startRect.width / 2} px`;
    line.style.transform = `rotate(${lineAngle}rad)`;
    line.style.top = `${startRect.top + startRect.height / 2 - lineWidth / 2 - contentRect.top}px`;
    line.style.left = `${startRect.left + startRect.width / 2 - contentRect.left}px`;
    line.style.transform = `rotate(${lineAngle}rad)`;
    line.style.transformOrigin = `top left`;
    document.getElementById('content').appendChild(line);
}

function createAnimatedCircle() {
    const svgNamespace = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNamespace, "svg");
    svg.setAttribute("width", "70");
    svg.setAttribute("height", "70");

    const circle = document.createElementNS(svgNamespace, "circle");
    circle.setAttribute("cx", "35"); // Mittelpunkt x
    circle.setAttribute("cy", "35"); // Mittelpunkt y
    circle.setAttribute("r", "30"); // Radius
    circle.setAttribute("fill", "none");
    circle.setAttribute("stroke", "#00B0EF");
    circle.setAttribute("stroke-width", "5");

    // Definiere die Animation
    const animate = document.createElementNS(svgNamespace, "animate");
    animate.setAttribute("attributeName", "stroke-dashoffset");
    animate.setAttribute("from", `${2 * Math.PI * 30}`); // Umfang des Kreises
    animate.setAttribute("to", "0");
    animate.setAttribute("dur", "0.225s"); // Geschwindigkeit auf 125 ms setzen
    animate.setAttribute("fill", "freeze");

    // Definiere den Umfang des Kreises für die Animation
    const circumference = 2 * Math.PI * 30; // 30 ist der Radius
    circle.setAttribute("stroke-dasharray", `${circumference} ${circumference}`);
    circle.setAttribute("stroke-dashoffset", circumference);

    // Füge die Animation zum Kreis hinzu
    circle.appendChild(animate);

    svg.appendChild(circle);
    return svg.outerHTML; // Gibt den SVG-HTML-Code zurück
}

function createAnimatedCross() {
    const svgNamespace = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNamespace, "svg");
    svg.setAttribute("width", "70");
    svg.setAttribute("height", "70");

    // Definiere die Pfade für das Kreuz mit mittigem Schnittpunkt
    const path1 = document.createElementNS(svgNamespace, "rect");
    path1.setAttribute("x", "15"); // Linke obere Ecke des horizontalen Balkens
    path1.setAttribute("y", "32.5"); // Linke obere Ecke des horizontalen Balkens
    path1.setAttribute("width", "40"); // Breite des horizontalen Balkens
    path1.setAttribute("height", "5"); // Höhe des horizontalen Balkens
    path1.setAttribute("fill", "#FFC000"); // Füllfarbe
    path1.setAttribute("opacity", "0"); // Start mit 0 Opazität

    const path2 = document.createElementNS(svgNamespace, "rect");
    path2.setAttribute("x", "32.5"); // Linke obere Ecke des vertikalen Balkens
    path2.setAttribute("y", "15"); // Linke obere Ecke des vertikalen Balkens
    path2.setAttribute("width", "5"); // Breite des vertikalen Balkens
    path2.setAttribute("height", "40"); // Höhe des vertikalen Balkens
    path2.setAttribute("fill", "#FFC000"); // Füllfarbe
    path2.setAttribute("opacity", "0"); // Start mit 0 Opazität

    // Füge die Animation hinzu
    const animate1 = document.createElementNS(svgNamespace, "animate");
    animate1.setAttribute("attributeName", "opacity");
    animate1.setAttribute("from", "0");
    animate1.setAttribute("to", "1");
    animate1.setAttribute("dur", "0.225s");
    animate1.setAttribute("fill", "freeze");

    const animate2 = document.createElementNS(svgNamespace, "animate");
    animate2.setAttribute("attributeName", "opacity");
    animate2.setAttribute("from", "0");
    animate2.setAttribute("to", "1");
    animate2.setAttribute("dur", "0.225s");
    animate2.setAttribute("fill", "freeze");

    // Füge die Animationen zu den Pfaden hinzu
    path1.appendChild(animate1);
    path2.appendChild(animate2);

    // Füge die Pfade zum SVG hinzu
    svg.appendChild(path1);
    svg.appendChild(path2);

    return svg.outerHTML; // Gibt den SVG-HTML-Code zurück
}

function restartGame() {
    fields = [
        null, null, null,
        null, null, null,
        null, null, null,
    ];
    render();
}
