import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';

class DraftEditor extends React.Component {
  state = {
    editorState: EditorState.createEmpty()
  }

  constructor(props) {
    super(props);
  }

  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  onChange = (editorState) => {
    this.setState({editorState});
  }

  setEditor = (editor) => {
    this.editor = editor;
  }

  focusEditor = () => {
    if (this.editor) {
      this.editor.focus();
    }
  }

  render() {
    return (
      <div style={styles.editor} onClick={this.focusEditor}>
        <Editor
          ref={this.setEditor}
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

const styles = {
  editor: {
    border: '1px solid gray',
    minHeight: '6em'
  }
}

export default DraftEditor;