const APP = document.getElementById('app')


function generateAppMenu(){
    APP.innerHTML = `
    <div id="gameChoice">
        <button type="button" onclick="generateGame('sudoku')">   SUDOKU   </button>
        <button type="button" onclick="generateGame('binero')">   BINERO   </button>
        <button type="button" onclick="generateGame('tectonic')"> TECTONIC </button>
        <button type="button" onclick="generateGame('yakazu')">   YAKAZU   </button>
    </div>`
}

function generateGame(gameName) {
    document.getElementById('gameChoice').style.display = 'none';
    APP.innerHTML = `
    <h3>${gameName}</h3>
    <section class="overallGameContainer ${gameName}">
        <div class="gameContainer" id="${gameName}Grid"> </div>
        <div class="gameMenu"></div>
    </section>
    `
    gameGeneration(gameName);
}


generateAppMenu()
generateGame('yakazu');