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

function findWeights () {
    let weight = document.querySelector('.weight-input').value,
        precent = document.querySelector('.precent-input').value,
        bar_weight = 45,
        net_weight = ( ( weight - bar_weight ) * precent ) / 2,
        plates = [];

    while (net_weight > 0) {
        if (net_weight >= 45) {
            net_weight -= 45;
            plates.push(45);
        } else if (net_weight >= 35) {
            net_weight -= 35;
            plates.push(35);
        } else if (net_weight >= 25) {
            net_weight -= 25;
            plates.push(25);
        } else if (net_weight >= 10) {
            net_weight -= 10;
            plates.push(10);
        } else if (net_weight >= 5) {
            net_weight -= 5;
            plates.push(5);
        } else if (net_weight >= 2.5) {
            net_weight -= 2.5;
            plates.push(2.5);
        } else {
            plates.push(net_weight);
            net_weight = 0;
        }
    }

    if ( plates.length > 0 ) {
        plates = '<div class="plate">' + plates.join('</div><div class="plate">') + '</div>';
        document.querySelector('.weights-container').innerHTML = plates;
    } else {
        document.querySelector('.weights-container').innerHTML = '';
    }
}

document.querySelector('.weight-input').addEventListener( 'keyup', findWeights);
document.querySelector('.precent-input').addEventListener( 'change', findWeights);


</script>
</body>
</html>
