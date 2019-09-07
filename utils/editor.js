import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';

const editor = () => new EditorJS({
  autofocus: false,
  holder: 'article-div',
  placeholder: 'Tell us your story...',
  tools: {
    header: {
      class: Header,
      inlineToolbar: ['link'],
    },
    list: {
      class: List,
      inlineToolbar: true,
    },
  },
});

export default editor;
