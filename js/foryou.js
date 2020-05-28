$(document).on('keypress',function(e){
    if(event.key == 'k') {
        return $("#bottom-area").css('visibility', function(i, visibility) {
            return (visibility == 'visible') ? 'hidden' : 'visible';
        });    
    }
});


// This makes the browser reload the page upon pressing the back button into
// here, so that the load event gets called again and the restaurants that the
// user can't eat from are greyed out.
window.addEventListener('unload', () => {});

window.addEventListener('load', () => {

    let restrictions = storageGet('restrictions') || [];
    let alimentaryRestrictionsUpdated = storageGet('alimentaryRestrictionsUpdated') || false;


    const hasRestrictions = (restaurant) => {
        const restaurantRestrictions = restaurantsData[restaurant].restrictions;
        return restrictions.some(
            restriction => restaurantRestrictions.includes(restriction.toLowerCase())
        );
    }
    // Blur restaurants that have offending restrictions.
    [ ...document.querySelectorAll('.restaurant-row') ]
        .filter(node => hasRestrictions(node.dataset.name))
        .forEach(node => {
            const logo = node.children[0].children[0].children[0];
            const food = node.children[0].children[1].children[0];
            const effect = 'grayscale(1) opacity(.3)';
            food.style.filter = effect;
            logo.style.filter = effect;
    });

    //Define a user message if the alimentary restrictions have changed
    if(alimentaryRestrictionsUpdated)
    {
        showUpdatedPreferencesMessage();
        storageSet('alimentaryRestrictionsUpdated', false);
    }

    search(
        document.querySelector('#restaurant-search'),
        document.querySelector('#restaurants'),
        document.querySelector('#restaurant-no-match'),
    );
});

function showUpdatedPreferencesMessage()
{
  var messageBox = document.createElement("div"); 
  messageBox.innerHTML = "<p>You have updated your alimentary restrictions successfully.</p>";
  messageBox.className = "infoBox";
  showElement(messageBox, TIME_MESSAGE_BOX_SHOWED_MS);
}