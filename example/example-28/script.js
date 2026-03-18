function startDivision() {
    const a = document.getElementById('dividend').value;
    const b = document.getElementById('divisor').value;
    const board = document.getElementById('board');
    const hint = document.getElementById('step-hint');
    
    if (!a || !b || b == 0) return alert("Введите корректные числа");

    board.innerHTML = ""; // Очистка
    let steps = [];
    let currentDividend = "";
    let remainder = 0;
    let quotient = "";

    // Логика пошагового деления
    let strA = a.toString();
    let tempNumStr = "";
    
    for (let i = 0; i < strA.length; i++) {
        tempNumStr += strA[i];
        let val = parseInt(tempNumStr);
        
        if (val >= b) {
            let q = Math.floor(val / b);
            let product = q * b;
            let diff = val - product;
            
            steps.push({
                type: 'step',
                val: val,
                product: product,
                diff: diff,
                digit: q,
                offset: i
            });
            
            tempNumStr = diff.toString();
            quotient += q.toString();
        } else {
            if (quotient.length > 0) quotient += "0";
        }
    }

    renderSteps(a, b, quotient, steps);
}

function renderSteps(a, b, res, steps) {
    const board = document.getElementById('board');
    let html = `<div>${a} | <span style="border-left: 2px solid black; padding-left: 5px;">${b}</span></div>`;
    html += `<div style="margin-left: ${a.length * 15}px"> | <span class="res-line">${res}</span></div>`;
    
    steps.forEach((s, index) => {
        let space = "&nbsp;".repeat(s.offset - (s.product.toString().length - 1));
        html += `<div style="color: red">-${space}${s.product}</div>`;
        html += `<div>&nbsp;${space}<span class="res-line">${s.diff}</span></div>`;
    });
    
    board.innerHTML = html;
    document.getElementById('step-hint').innerText = "Готово! Разберем: сначала берем часть делимого, находим сколько раз в нем умещается делитель, вычитаем и сносим следующую цифру.";
}
