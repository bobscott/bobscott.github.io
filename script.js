// calculates and displays the plates needed for a given weight
function findWeights() {
    let weight = document.querySelector('.weight-input').value,
        precent = document.querySelector('.precent-input').value,
        bar_weight = window.localStorage.barWeight || 45,
        net_weight = ( ( weight * precent ) - bar_weight ) / 2,
        plates = [],
        output = '',
        weight55 = window.localStorage.weight55,
        weight45 = window.localStorage.weight45,
        weight35 = window.localStorage.weight35,
        weight25 = window.localStorage.weight25,
        weight15 = window.localStorage.weight15,
        weight10 = window.localStorage.weight10,
        weight5 = window.localStorage.weight5,
        weight2point5 = window.localStorage.weight2point5,
        weight1point25 = window.localStorage.weight1point25;

    while ( net_weight > 0 ) {
        if ( net_weight >= 55 && weight55 > 0 ) {
            weight55 -= 1;
            net_weight -= 55;
            plates.push('<div class="plate size-55">55</div>');

        } else if ( net_weight >= 45 && weight45 > 0 ) {
            weight45 -= 1;
            net_weight -= 45;
            plates.push('<div class="plate size-45">45</div>');

        } else if ( net_weight >= 35 && weight35 > 0 ) {
            weight35 -= 1;
            net_weight -= 35;
            plates.push('<div class="plate size-35">35</div>');

        } else if ( net_weight >= 25 && weight25 > 0 ) {
            weight25 -= 1;
            net_weight -= 25;
            plates.push('<div class="plate size-25">25</div>');

        } else if ( net_weight >= 15 && weight15 > 0 ) {
            weight15 -= 1;
            net_weight -= 15;
            plates.push('<div class="plate size-15">15</div>');

        } else if ( net_weight >= 10 && weight10 > 0 ) {
            weight10 -= 1;
            net_weight -= 10;
            plates.push('<div class="plate size-10">10</div>');

        } else if ( net_weight >= 5 && weight5 > 0 ) {
            weight5 -= 1;
            net_weight -= 5;
            plates.push('<div class="plate size-5">5</div>');

        } else if ( net_weight >= 2.5 && weight2point5 > 0 ) {
            weight2point5 -= 1;
            net_weight -= 2.5;
            plates.push('<div class="plate size-2point5">2.5</div>');

        } else if ( net_weight >= 1.25 && weight1point25 > 0 ) {
            weight1point25 -= 1;
            net_weight -= 1.25;
            plates.push('<div class="plate size-1point25">1.25</div>');

        } else {
            plates.push('<div class="plate size-LO"><p class="message">Missing Weights for: ' + net_weight + '</p><p class="help">Adjust your weight sets in the settings.</p></div>');
            net_weight = 0;
        }
    }

    if ( plates.length > 0 ) {
        let last = '';
        for ( let a = 0; a < plates.length; a += 1 ) {
            if ( plates[ a ] != last ) {
                if ( a != 0 ) {
                    output += '</div>';
                }
                output += '<div class="group">' + plates[ a ];
            } else {
                output += plates[ a ];
            }
            last = plates[ a ];
        }
        output += '</div>';
        document.querySelector('.weights-container').innerHTML = output;
    } else {
        document.querySelector('.weights-container').innerHTML = '';
    }

    if ( weight.length == 3 ) {
        document.querySelector('.weight-input').blur();
    }
}
document.querySelector('.weight-input').addEventListener( 'keyup', findWeights);
document.querySelector('.precent-input').addEventListener( 'change', findWeights);

// opens settings menu
document.querySelector('.settings-button').addEventListener( 'click', ()=>{
    document.querySelector('.settings-popup').classList.toggle('open');
});



// sets the bar weight value in settings
function setBarWeight() {
    let bar_weight = document.querySelector('.bar-weight').value;
    window.localStorage.barWeight = bar_weight;
    findWeights();
}
document.querySelector('.bar-weight').addEventListener( 'keyup', setBarWeight );

// sets the weight set value in settings
function setWeightSet(e) {
    let size = this.classList[ 1 ].split('-')[ 1 ];
    window.localStorage[ 'weight' + size ] = this.value;
    findWeights();
}
let weightSets = document.querySelectorAll('.weight-select');

for ( let a = 0; a < weightSets.length; a += 1 ) {
    weightSets[ a ].addEventListener( 'change', setWeightSet );
}

// sets rest timer in settings
function setRestTimer() {
    let rest_time = document.querySelector('.rest-amount').value;
    window.localStorage.restTime = rest_time;
}
document.querySelector('.rest-amount').addEventListener( 'change', setRestTimer );

// timer function
var timeInterval = '',
    timePaused = -1;
function startTimer() {
    let endMinutes = window.localStorage.restTime.split(':')[ 0 ] * 1,
        endSeconds = window.localStorage.restTime.split(':')[ 1 ] * 1,
        timer = document.querySelector( '.timer' ),
        endAlert = new Audio( 'timer.wav' );
        warningAlert = new Audio( 'timer-10.wav' );

    // show timer
    clearInterval( timeInterval );
    if ( endSeconds < 10 ) {
        timer.innerHTML = endMinutes + ':0' + endSeconds;
    } else {
        timer.innerHTML = endMinutes + ':' + endSeconds;
    }
    timer.classList.remove( 'red' );
    timer.classList.add( 'show' );

    // start timer
    timeInterval = setInterval(()=>{
        if ( timePaused == -1 ) {
            endSeconds -= 1;
        }
        if ( endSeconds < 0 && endMinutes > 0 ) {
            endSeconds = 59;
            endMinutes -= 1;
        } else if ( endSeconds < 1 && endMinutes == 0 ) {
            clearInterval( timeInterval );
            endAlert.play();
        }
        if ( endSeconds < 10 ) {
            timer.innerHTML = endMinutes + ':0' + endSeconds;
        } else {
            timer.innerHTML = endMinutes + ':' + endSeconds;
        }
        if ( endSeconds == 10 && endMinutes == 0 ) {
            timer.classList.add( 'red' );
            warningAlert.play();
        } else if ( endSeconds == 0 && endMinutes == 0 ) {
            timer.classList.remove( 'red' );
        }
    }, 1000);
}
document.querySelector('.rest-button').addEventListener( 'click', startTimer );
document.querySelector('.timer').addEventListener( 'click', ()=>{ timePaused *= -1; } );

// retrieves and sets default values in settings
function init() {
    // set default bar weight value
    window.localStorage.barWeight = window.localStorage.barWeight || 45;

    // display bar weight in settings
    document.querySelector('.bar-weight').value = window.localStorage.barWeight;

    // set default rest time
    window.localStorage.restTime = window.localStorage.restTime || '2:00';

    // display rest time in settings
    document.querySelector('.rest-amount').value = window.localStorage.restTime;

    // set default weight quantities
    window.localStorage.weight55 = window.localStorage.weight55 || 0;
    window.localStorage.weight45 = window.localStorage.weight45 || 10;
    window.localStorage.weight35 = window.localStorage.weight35 || 1;
    window.localStorage.weight25 = window.localStorage.weight25 || 1;
    window.localStorage.weight15 = window.localStorage.weight15 || 0;
    window.localStorage.weight10 = window.localStorage.weight10 || 2;
    window.localStorage.weight5 = window.localStorage.weight5 || 2;
    window.localStorage.weight2point5 = window.localStorage.weight2point5 || 2;
    window.localStorage.weight1point25 = window.localStorage.weight1point25 || 0;

    // display weight sets in settings
    document.querySelector('.weight-55').value = window.localStorage.weight55;
    document.querySelector('.weight-45').value = window.localStorage.weight45;
    document.querySelector('.weight-35').value = window.localStorage.weight35;
    document.querySelector('.weight-25').value = window.localStorage.weight25;
    document.querySelector('.weight-15').value = window.localStorage.weight15;
    document.querySelector('.weight-10').value = window.localStorage.weight10;
    document.querySelector('.weight-5').value = window.localStorage.weight5;
    document.querySelector('.weight-2point5').value = window.localStorage.weight2point5;
    document.querySelector('.weight-1point25').value = window.localStorage.weight1point25;

    // calculate weights in case field is auto filled by browser on page load
    findWeights();
}

init();
