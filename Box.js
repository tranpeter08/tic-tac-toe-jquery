class Box {
  constructor(column, row, char = '') {
    this.element = `
      <div 
        class="col box" 
        data-col="${column}" 
        data-row="${row}"
      >
        <button class="mark">${char}</button>
      </div>`;
  }
}
