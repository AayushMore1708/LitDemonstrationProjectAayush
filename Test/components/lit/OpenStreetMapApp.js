import { LitElement, html, css } from 'lit';

export class OpenStreetMapApp extends LitElement {
  static styles = css`
    :host {
      display: block;
      height: auto;
      width: 600px;
      font-family: Arial, sans-serif;
    }

    .search-bar {
      display: flex;
      align-items: center;
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      padding: 12px;
      margin-bottom: 20px;
    }
    
    .search-bar input {
      flex: 1;
      border: none;
      outline: none;
      padding: 0;
      margin-right: 10px;
      font-size: 16px;
    }

    .search-bar button {
      background-color: #4CAF50;
      color: white;
      padding: 12px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    .search-bar button:hover {
      background-color: #45a049;
    }

    iframe {
      border: 0;
      width: 100%;
      height: 400px;
      border-radius: 10px;
    }
  `;

  static get properties() {
    return {
      query: { type: String },
      mapUrl: { type: String }
    };
  }

  constructor() {
    super();
    this.query = '';
    this.mapUrl = 'https://www.openstreetmap.org/export/embed.html?bbox=72.8777%2C19.0760%2C72.8780%2C19.0765&layer=mapnik';
  }

  render() {
    return html`
      <h3>Plugin 3: OpenStreetMap Plugin</h3>
      <div class="search-bar">
        <input
          type="text"
          placeholder="Search for a location..."
          .value="${this.query}"
          @input="${(e) => (this.query = e.target.value)}"
          @keydown="${(e) => {
            if (e.key === 'Enter') {
              this.searchLocation();
            }
          }}"
        />
        <button @click="${this.searchLocation}">Search</button>
      </div>
      <iframe
        src="${this.mapUrl}"
        allowfullscreen
      ></iframe>
    `;
  }

  async searchLocation() {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${this.query}`);
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        this.mapUrl = 'https://www.openstreetmap.org/export/embed.html?bbox=72.9660%2C19.2183%2C72.9900%2C19.2400&layer=mapnik';
      } else {
        console.error('Location not found');
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  }
}

customElements.define('openstreetmap-app', OpenStreetMapApp);
