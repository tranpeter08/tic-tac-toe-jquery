class ResetBtn {
  constructor() {}

  $resetGame() {
    $('#reset').on('click', () => {
      const board = new Board();
      board.render();
      this.render(board);
    });
  }

  render(board) {
    $('#root').append(`<button id="reset">RESET</button>`);
    $(this.$resetGame(board));
  }
}
