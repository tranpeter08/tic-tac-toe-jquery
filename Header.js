class Header {
  constructor(player = 'x') {
    this.player = player;
    this.element = `<h2 id="header">Current Player: <span id="player">${player}<span></h2>`;
  }

  update(player) {
    $('#player').text(player);
  }

  draw() {
    $('#header').text('Draw!');
  }

  winner(player) {
    $('#header').text(`Player ${player} wins!`);
  }
}
