import { LitElement, html, css } from 'lit';

class MyElement extends LitElement {
  static styles = css`
    p {
      color: blue;
    }
  `;

  render() {
    return html`<h3>Custom Plugin 1: </h3><p>Hello <b>Kulp Developers</b> <br/>This Custom Elements are created <br> from Lit Library!</p>`;
  }
}

customElements.define('my-element', MyElement);
export default MyElement;
