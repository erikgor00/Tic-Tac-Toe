let fields = [
    null,
    'circle',
    'circle',
    'circle',
    null,
    'cross',
    'cross',
    null,
    null,
];

function render() {
    const content = document.getElementById('content');
    let html = '<table>';

    for (let i = 0; i < 3; i++) {
        html += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            const symbol = fields[index];
            html += `<td>${symbol ? symbol === 'circle' ? 'O' : 'X' : ''}</td>`;
        }
        html += '</tr>';
    }

    html += '</table>';
    content.innerHTML = html;
}