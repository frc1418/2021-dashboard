const autoPanel = document.getElementById('auto')
const autoButton = document.getElementById('auto-button');
const autoSelect = document.getElementById('auto-select');
const autoModeDisplay = document.getElementById('auto-mode-display');
const startingPosSelect = document.getElementById('starting-pos-select');
const startingPosDisplay = document.getElementById('starting-pos-display');

autoButton.addEventListener('click', () => {
    if (!NetworkTables.isRobotConnected()) {
        autoPanel.classList.remove('visible')
        alert('Error: Robot is not connected!');
        return;
    }

    showPanel(autoPanel, 'auto');
});

autoSelect.onchange = function() {
    NetworkTables.putValue('/autonomous/selected autonomous', autoSelect.value);
};

startingPosSelect.addEventListener('change', (event) => {
    NetworkTables.putValue('/autonomous/starting_position', event.target.value);
});


NetworkTables.addKeyListener('/autonomous/autonomous options', (_, modes, __) => {
    autoSelect.innerHTML = '';

    for (let modeName of modes.reverse()) {
        let optionElem = document.createElement('option');
        optionElem.textContent = modeName;
        autoSelect.appendChild(optionElem);
    }
}, true);

NetworkTables.addKeyListener('/SmartDashboard/Autonomous Mode/default', (_, modeName, __) => {
    autoSelect.value = modeName;
}, true);

NetworkTables.addKeyListener('/SmartDashboard/Autonomous Mode/active', (_, modeName, __) => {
    autoModeDisplay.textContent = modeName;
}, true);

NetworkTables.addKeyListener('/autonomous/starting_position', (_, modeName, __) => {
    startingPosDisplay.textContent = modeName;
}, true);

startingPosSelect.value = NetworkTables.getValue('/autonomous/starting_position');