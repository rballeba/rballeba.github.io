const activeFlag = 'active';

let restrictions = storageGet('restrictions') || [];
let initialRestrictions = Object.assign([], restrictions);

const toggle = (event) => {
    const name = event.currentTarget.dataset.name;
    if (event.target.classList.contains('info-link')) {
        return;
    }
    const classes = event.currentTarget.classList;
    if (classes.contains(activeFlag)) {
        restrictions = restrictions.filter(x => x !== name);
        classes.remove(activeFlag);
    } else {
        restrictions.push(name);
        classes.add(activeFlag);
    }
    storageSet('restrictions', restrictions);
    
};

function saveAlimentary() {
    storageSet('alimentaryRestrictionsUpdated', JSON.stringify(restrictions) != JSON.stringify(initialRestrictions));
};

$('#saveAndBackButton').click(function(){ saveAlimentary() });

window.addEventListener('load', () => {

    // Add onclick listener to toggles.
    // For some reason adding it with an attribute onclick doesn't seem to work.
    // Also, load restrictions from previous sessions.
    document.querySelectorAll('.toggle').forEach(node => {
        node.onclick = toggle;
        if (restrictions.includes(node.dataset.name)) {
            node.classList.add(activeFlag);
        }
    });

    search(
        document.querySelector('#restriction-search'),
        document.querySelector('#restrictions-row'),
        document.querySelector('#restriction-no-match'),
    );

})
