/* istanbul ignore file */
const paragraphBlock = (payload) => `
<div class="ce-block">
  <div class="">
    <div class="ce-paragraph cdx-block">
      <p style="margin-bottom: 20px">${payload.data.text}</p>
    </div>
  </div>
</div>
`;

const headerBlock = (payload) => `
<div class="ce-block">
  <div class="ce-block__content">
    <div class="ce-paragraph cdx-block">
      <h2 style="margin-bottom: 20px">${payload.data.text}</h2>
    </div>
  </div>
</div>
`;

const jsonToHtml = (editorOutput) => {
  let articleHTML = '';

  editorOutput.blocks.map(obj => {
    switch (obj.type) {
      case 'paragraph':
        articleHTML += paragraphBlock(obj);
        break;
      case 'header':
        articleHTML += headerBlock(obj);
        break;
      default:
        return '';
    }
    return '';
  });

  return articleHTML;
};

export default jsonToHtml;
