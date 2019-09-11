import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';

const editor = (data = null) => new EditorJS({
  autofocus: false,
  holder: 'article-div',
  placeholder: 'Tell us your story...',
  tools: {
    header: {
      class: Header,
      inlineToolbar: ['link'],
    },
  },
  data,
});

export default editor;
