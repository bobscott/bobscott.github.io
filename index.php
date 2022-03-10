<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Plate Finder</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="style.css" />
</head>
<body>

    <div class="app">
        <div class="weights-container">

        </div>
        <div class="input-container">
            <input type="number" class="weight-input" placeholder="Input Weight" />
            <select class="precent-input">
                <option value="1">100%</option>
                <option value="0.75">75%</option>
                <option value="0.5">50%</option>
                <option value="0.25">25%</option>
            </select>
        </div>
    </div>

<script>

function findWeights() {
    let weight = document.querySelector('.weight-input').value,
        precent = document.querySelector('.precent-input').value,
        bar_weight = 45,
        net_weight = ( ( weight - bar_weight ) * precent ) / 2,
        plates = [];

    while (net_weight > 0) {
        if (net_weight >= 45) {
            net_weight -= 45;
            plates.push('<div class="plate size-45">45</div>');
        } else if (net_weight >= 35) {
            net_weight -= 35;
            plates.push('<div class="plate size-35">35</div>');
        } else if (net_weight >= 25) {
            net_weight -= 25;
            plates.push('<div class="plate size-25">25</div>');
        } else if (net_weight >= 10) {
            net_weight -= 10;
            plates.push('<div class="plate size-10">10</div>');
        } else if (net_weight >= 5) {
            net_weight -= 5;
            plates.push('<div class="plate size-5">5</div>');
        } else if (net_weight >= 2.5) {
            net_weight -= 2.5;
            plates.push('<div class="plate size-2point5">2.5</div>');
        } else {
            plates.push('<div class="plate size-LO">' + net_weight + '</div>');
            net_weight = 0;
        }
    }

    if ( plates.length > 0 ) {
        document.querySelector('.weights-container').innerHTML = plates.join('');
    } else {
        document.querySelector('.weights-container').innerHTML = '';
    }

    if ( weight.length == 3 ) {
        document.querySelector('.weight-input').blur();
    }
}

document.querySelector('.weight-input').addEventListener( 'keyup', findWeights);
document.querySelector('.precent-input').addEventListener( 'change', findWeights);

findWeights();

document.querySelector('.weight-input').focus();

</script>
</body>
</html>
