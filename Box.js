class Box {
  constructor(column, row, char = '') {
    this.element = `
      <div 
        class="box" 
      >
        <button
          data-col="${column}" 
          data-row="${row}"
          class="mark"
        >${char}</button>
      </div>`;
  }
}
