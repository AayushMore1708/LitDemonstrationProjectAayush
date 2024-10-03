import { LitElement, html, css } from 'lit';

export class YouTubeApp extends LitElement {
  static styles = css`

    :host {

      display: block;
      height: auto;
      width: 600px;
      font-family: Arial, sans-serif;
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
    .video-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      grid-gap: 10px;
    }
    .video-container > div {
      background-color: #fff;
      border-radius: 5px;
      overflow: hidden;
    }
    .video-container iframe {
      width: 100%;
      height: 200px;
    }
  `;

  static get properties() {
    return {
      apiKey: { type: String },
      query: { type: String },
      videos: { type: Array },
    };
  }

  constructor() {
    super();
    this.apiKey = 'AIzaSyATp-R3on9_W5RemMf0fBFf-ur1jbe3II0'; // Replace with your actual YouTube API key
    this.query = '';
    this.videos = [];
  }

  render() {
    return html`
      <h3>Plugin 4: YouTube Player Plugin</h3>
      <div class="search-bar">
        <input
          type="text"
          autofocus
          placeholder="Search for a video..."
          .value="${this.query}"
          @input="${(e) => (this.query = e.target.value)}"
          @keydown="${(e) => {
        if (e.key === 'Enter') {
          this.searchVideos();
        }
      }}"
        />
        <button @click="${this.searchVideos}">Search</button>
      </div>

      <div class="video-container">
        ${this.videos.map(
        (video) => html`
            <div>
              <h4>${video.snippet.title}</h4>
              <iframe
                src="https://www.youtube.com/embed/${video.id.videoId}"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          `
      )}
      </div>
    `;
  }

  async searchVideos() {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${this.query}&type=video&key=${this.apiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      this.videos = data.items;
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  }
}

customElements.define('youtube-app', YouTubeApp);


