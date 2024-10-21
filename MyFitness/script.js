function calculateBars() {
    let ironAmount = parseFloat(document.getElementById('iron-amount').value);
    let barLength = parseFloat(document.getElementById('bar-length').value);

    const weightPerMeter = 10;
    const barWeight = weightPerMeter * barLength;

    if (ironAmount && barLength) {
        let barCount = Math.floor(ironAmount / barWeight);
        document.getElementById('bars-output').textContent = `Con ${ironAmount} kg de hierro, puedes hacer aproximadamente ${barCount} barras de ${barLength} metros.`;
    } else {
        document.getElementById('bars-output').textContent = 'Por favor, ingresa una cantidad válida de hierro.';
    }
}


let kits = [];

function createKit() {
    let kitName = document.getElementById('kit-name').value;
    let barCount = parseInt(document.getElementById('bar-count').value);
    let discs = parseInt(document.getElementById('discs').value);
    let butterflies = parseInt(document.getElementById('butterflies').value);

    if (kitName && barCount && discs && butterflies) {
        let kit = {
            name: kitName,
            bars: barCount,
            discs: discs,
            butterflies: butterflies
        };

        kits.push(kit);
        updateKitList();
        resetKitForm();
    } else {
        alert('Por favor, completa todos los campos para crear un kit.');
    }
}

function updateKitList() {
    let kitList = document.getElementById('kit-list');
    kitList.innerHTML = ''; 
    kits.forEach(kit => {
        let li = document.createElement('li');
        li.textContent = `${kit.name}: ${kit.bars} barras, ${kit.discs} discos, ${kit.butterflies} mariposas`;
        kitList.appendChild(li);
    });
}

function resetKitForm() {
    document.getElementById('kit-name').value = '';
    document.getElementById('bar-count').value = '';
    document.getElementById('discs').value = '';
    document.getElementById('butterflies').value = '';
}
