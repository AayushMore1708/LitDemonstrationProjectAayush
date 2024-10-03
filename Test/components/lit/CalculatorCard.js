import { LitElement, html, css } from 'lit';

class CalculatorCard extends LitElement {
        static properties = {
                displayValue: { type: String },
                currentValue: { type: String },
                operator: { type: String },
                previousValue: { type: String },
        };

        static styles = css`
    .calculator {
      width: 250px; /* Adjust width for a balanced grid */
      height: 400px; /* Adjust height for the grid */
      border-radius: 8px;
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
      padding: 20px;
      display: grid;
      grid-template-rows: 1fr 4fr;
    }
    .display {
      background: #007aff;
      color: white;
      font-size: 24px;
      padding: 10px;
      text-align: right;
      border-radius: 5px;
      margin-bottom: 10px;
      transition: transform 0.3s ease, opacity 0.3s ease;
    }
      .display.animate {
    transform: scale(1.1);
    opacity: 0.8;
  }
    .buttons {
      display: grid;
      grid-template-columns: repeat(4, 1fr); /* Create a 4x4 grid */
      grid-gap: 10px; /* Add spacing between buttons */
    }
    button {
      padding: 10px;
      font-size: 28px;
      background-color: #f0f0f0;
      border-radius: 5px;
      cursor: pointer;
      transition: background 0.3s;
    }
    button:hover {
      background-color: yellow;
    }
    .operator {
      background-color: #ff9500;
      color: white;
    }
    .equals {
      background-color: #007aff;
      color: white;
    }
  `;

        constructor() {
                super();
                this.displayValue = '0';
                this.currentValue = '';
                this.previousValue = '';
                this.operator = null;
        }

        handleClick(value) {
                if (value === 'C') {
                        this.clear();
                } else if (['+', '-', '*', '/'].includes(value)) {
                        this.setOperator(value);
                } else if (value === '=') {
                        this.calculate();
                } else {
                        this.inputDigit(value);
                }
        }

        inputDigit(digit) {
                const start = parseInt(this.displayValue) || 0;
                const end = parseInt(start + digit);

                if (!isNaN(end)) {
                        this.animateDigitChange(start, end);
                } else {
                        this.displayValue = digit;
                }
        }animateDigitChange(start, end) {
                const stepCount = Math.abs(end - start);
                
                // Adjust the step based on the range to make large changes faster
                const step = (end > start) ? Math.ceil(stepCount / 20) : -Math.ceil(stepCount / 20);
                const stepTime = 20; // Keep the time between steps fast
                
                let currentValue = start;
              
                const stepInterval = setInterval(() => {
                  currentValue += step;
              
                  // Ensure we don't overshoot the target
                  if ((step > 0 && currentValue >= end) || (step < 0 && currentValue <= end)) {
                    currentValue = end;
                    clearInterval(stepInterval);
                  }
              
                  this.displayValue = String(currentValue);
                }, stepTime);
              }
              
        updated(changedProperties) {
                if (changedProperties.has('displayValue')) {
                        const displayElement = this.shadowRoot.querySelector('.display');
                        displayElement.classList.add('animate');
                        setTimeout(() => {
                                displayElement.classList.remove('animate');
                        }, 300); // The timeout matches the duration of the animation
                }
        }


        setOperator(operator) {
                if (this.currentValue) {
                        this.calculate();
                }
                this.operator = operator;
                this.currentValue = this.displayValue;
                this.displayValue = '';
        }

        calculate() {
                if (!this.currentValue || !this.displayValue) return;
              
                const current = parseFloat(this.currentValue);
                const next = parseFloat(this.displayValue);
                let result;
              
                switch (this.operator) {
                  case '+':
                    result = current + next;
                    break;
                  case '-':
                    result = current - next;
                    break;
                  case '*':
                    result = current * next;
                    break;
                  case '/':
                    result = current / next;
                    break;
                  default:
                    return;
                }
              
                const start = parseFloat(this.displayValue);
                this.animateDigitChange(start, result);
              
                this.currentValue = '';
                this.operator = null;
              }
              

        clear() {
                this.displayValue = '0';
                this.currentValue = '';
                this.operator = null;
        }

        render() {
                return html`
      <h2>Plugin 2: Calculator</h2>
      <div class="calculator">
        <div class="display">${this.displayValue}</div>
        <div class="buttons">
          <button @click="${() => this.handleClick('7')}">7</button>
          <button @click="${() => this.handleClick('8')}">8</button>
          <button @click="${() => this.handleClick('9')}">9</button>
          <button class="operator" @click="${() => this.handleClick('/')}">/</button>

          <button @click="${() => this.handleClick('4')}">4</button>
          <button @click="${() => this.handleClick('5')}">5</button>
          <button @click="${() => this.handleClick('6')}">6</button>
          <button class="operator" @click="${() => this.handleClick('*')}">*</button>

          <button @click="${() => this.handleClick('1')}">1</button>
          <button @click="${() => this.handleClick('2')}">2</button>
          <button @click="${() => this.handleClick('3')}">3</button>
          <button class="operator" @click="${() => this.handleClick('-')}">-</button>

          <button @click="${() => this.handleClick('0')}">0</button>
          <button @click="${() => this.handleClick('C')}">C</button>
          <button class="equals" @click="${() => this.handleClick('=')}">=</button>
          <button class="operator" @click="${() => this.handleClick('+')}">+</button>
        </div>
      </div>
    `;
        }
}

customElements.define('calculator-card', CalculatorCard);
