import * as React from 'react';

interface PLState {
  playlist: string[];
}

export default class Playlist extends React.Component<unknown, PLState> {

  constructor(props: unknown) {
    super(props);
    this.state = {
      playlist: [], 
    }; 
  }

  loadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
        const reader = new FileReader()
    reader.onload = async (e) => { 
      const text = (e.target.result);
      if (typeof text === 'string') {
        const playlist = text.split(/\r?\n/);
        this.setState({playlist})
      }
    };
    reader.readAsText(e.target.files[0]);
  };

  play = async () => {
    const playlist = this.state.playlist;
    console.log('DELETEME: Play button clicked');
    window.api.start_playlist(playlist);
  };

  render() {
    const playlist = this.state.playlist;
    if (playlist.length < 1) {
      return (
          <div>
            <input type="file" onChange={this.loadFile} />
          </div>
      );
    } else {
      return (
        <div>
          <button onClick={this.play}> Play </button>
          <button> Pause</button>
          <ol>
            { playlist.map(( element: string ) => <li key={element}> {element} </li> )}
          </ol>

        </div>
      );
    }
  }
}
