import React from 'react';
import { Editor, EditorState } from 'draft-js';

class DraftEditor extends React.Component {
  state = {
    editorState: EditorState.createEmpty()
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