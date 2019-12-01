class Board {
  constructor() {
    this.moves = 0;
    this.header = new Header();
    this.grid = new Array(3).fill(null).map(item => {
      return new Array(3).fill(null);
    });

    this.player = 'x';
    this.pos = {};
  }

  get boxes() {
    const size = this.grid.length;
    let boxes = '';

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        boxes += new Box(j, i).element;
      }
      // rows += `<div class="row" >${cols}</div>`;
    }

    return boxes;
  }

  $boxClick() {
    const game = this;

    $('.board').on('click', '.mark', function() {
      const $mark = $(this);
      game.pos = $mark.data();

      if (!game.isEmptyBox($mark)) {
        return;
      }

      $mark.attr('disabled', true);
      game.moves++;
      game.markBox($mark);
      game.setGrid();

      if (game.isWinner()) {
        game.endGame();
      } else if (game.moves === 9) {
        game.header.draw();
      } else {
        game.player = game.player === 'x' ? 'o' : 'x';
        game.header.update(game.player);
      }
    });
  }

  setGrid() {
    this.grid[this.pos.row][this.pos.col] = this.player;
  }

  isEmptyBox($mark) {
    return $mark.text() === '';
  }

  markBox($mark) {
    $mark.text(this.player);
  }

  isWinner() {
    const horizontal = [[0, 1], [0, -1]];
    const vertical = [[1, 0], [-1, 0]];
    const diag1 = [[1, 1], [-1, -1]];
    const diag2 = [[1, -1], [-1, 1]];

    return (
      this.inspectDir(horizontal) ||
      this.inspectDir(vertical) ||
      this.inspectDir(diag1) ||
      this.inspectDir(diag2)
    );
  }

  inspectDir(directions) {
    let count = 0;

    for (const dir of directions) {
      count += this.inspectNext(dir);
    }

    return count === 2;
  }

  inspectNext([y, x]) {
    let count = 0;
    let row = this.pos.row + y;

    if (row < 0 || row > 2) {
      return 0;
    }

    let col = this.pos.col + x;
    let next = this.grid[row][col];

    while (next === this.player) {
      count++;
      row += y;

      if (row < 0 || row > 2) {
        return count;
      }

      col += x;
      next = this.grid[row][col];
    }

    return count;
  }

  endGame() {
    $('.board')
      .find('.mark')
      .each(function() {
        $(this).attr('disabled', true);
      });
    this.header.winner(this.player);
  }

  attachEventListeners() {
    $(this.$boxClick());
  }

  render() {
    $('#root').html(
      `${this.header.element}
      <div class="board">${this.boxes}</div>`
    );

    this.attachEventListeners();
  }
}
