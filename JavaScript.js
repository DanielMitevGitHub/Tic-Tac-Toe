window.onload = function () {

    // Canvas-Element holen
    const myCanvas = document.getElementById("myCanvas");

    // 2D-Zeichenkontext holen (Werkzeug zum Zeichnen)
    const context = myCanvas.getContext("2d");

    // Status und Ergebnisliste holen
    const statusText = document.getElementById("status");
    const resultList = document.getElementById("resultList");
    const btnNewGame = document.getElementById("btnNewGame");

    // Array für den Spielstand (9 Felder)
    let board = ["", "", "", "", "", "", "", "", ""];

    // Startspieler
    let currentPlayer = "X";

    // Spielstatus (ob das Spiel beendet ist)
    let gameOver = false;

    // Funktion zum Zeichnen des Spielfelds
    function ZeichneSpielfeld() {

        // Außenrahmen zeichnen
        context.strokeStyle = "black";
        context.lineWidth = 1;
        context.strokeRect(0, 0, 300, 300);

        // Linien für das Gitter zeichnen
        context.beginPath();

        // Vertikale Linien
        context.moveTo(100, 0);
        context.lineTo(100, 300);

        context.moveTo(200, 0);
        context.lineTo(200, 300);

        // Horizontale Linien
        context.moveTo(0, 100);
        context.lineTo(300, 100);

        context.moveTo(0, 200);
        context.lineTo(300, 200);

        context.stroke();
    }

    // Funktion zum Zeichnen von X
    function drawX(row, col) {

        let startX = col * 100;
        let startY = row * 100;

        context.strokeStyle = "red";
        context.lineWidth = 3;

        context.beginPath();

        // Erste diagonale Linie
        context.moveTo(startX + 20, startY + 20);
        context.lineTo(startX + 80, startY + 80);

        // Zweite diagonale Linie
        context.moveTo(startX + 80, startY + 20);
        context.lineTo(startX + 20, startY + 80);

        context.stroke();
    }

    // Funktion zum Zeichnen von O
    function drawO(row, col) {

        let startX = col * 100;
        let startY = row * 100;

        context.strokeStyle = "blue";
        context.lineWidth = 3;

        context.beginPath();

        // Kreis zeichnen (Mittelpunkt + Radius)
        context.arc(startX + 50, startY + 50, 30, 0, 2 * Math.PI);

        context.stroke();
    }

    // Funktion zur Prüfung auf Gewinner
    function checkWinner() {

        const wins = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let combo of wins) {
            let a = combo[0];
            let b = combo[1];
            let c = combo[2];

            if (board[a] !== "" &&
                board[a] === board[b] &&
                board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    }

    // Funktion zur Prüfung auf Unentschieden
    function isDraw() {
        return board.every(cell => cell !== "");
    }

    // Ergebnis zur Liste hinzufügen
    function addResult(text) {
        const li = document.createElement("li");
        li.textContent = text;
        resultList.appendChild(li);
    }

    // Spiel zurücksetzen
    function resetGame() {

        // Canvas löschen
        context.clearRect(0, 0, 300, 300);

        // Spielfeld neu zeichnen
        ZeichneSpielfeld();

        // Array zurücksetzen
        board = ["", "", "", "", "", "", "", "", ""];

        // Spieler zurücksetzen
        currentPlayer = "X";

        // Spiel aktivieren
        gameOver = false;

        // Status aktualisieren
        statusText.textContent = "Aktueller Spieler: " + currentPlayer;
    }

    // Klick-Event auf Canvas
    myCanvas.addEventListener("click", function (event) {

        if (gameOver) { return; }

        let row = Math.floor(event.offsetY / 100);
        let col = Math.floor(event.offsetX / 100);

        let index = row * 3 + col;

        // Prüfen ob Feld frei ist
        if (board[index] !== "") return;

        // Spielzug speichern
        board[index] = currentPlayer;

        // Symbol zeichnen
        if (currentPlayer === "X") {
            drawX(row, col);
        } else {
            drawO(row, col);
        }

        // Gewinner prüfen
        let winner = checkWinner();

        if (winner !== null) {
            statusText.textContent = "Gewinner: " + winner;
            addResult("Gewinner: " + winner);
            gameOver = true;
            return;
        }

        // Unentschieden prüfen
        if (isDraw()) {
            statusText.textContent = "Unentschieden";
            addResult("Unentschieden");
            gameOver = true;
            return;
        }

        // Spieler wechseln
        currentPlayer = (currentPlayer === "X") ? "O" : "X";

        // Status aktualisieren
        statusText.textContent = "Aktueller Spieler: " + currentPlayer;
    });

    // Button-Event
    btnNewGame.addEventListener("click", resetGame);

    // Spielfeld initial zeichnen
    ZeichneSpielfeld();
};
