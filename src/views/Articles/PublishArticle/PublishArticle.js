import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { WithContext as ReactTags } from 'react-tag-input';
import Loader from 'react-loader-spinner';
import swal from '@sweetalert/with-react';
import Modal from '@Components/Modal';
import Button from '@Components/Button';
import connectComponent from '@Lib/connect-component';
import { closeModal } from '@Actions/uiActions';
import { postImage } from '@Actions/imageAction';
import { createArticle, updateArticle } from '@Actions/Articles';
import { isEmpty } from '@Utils/';
import './PublishArticle.scss';

const KeyCodes = {
  comma: 188,
  enter: 13,
  space: 32,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter, KeyCodes.space];

let imagePath = '';

export class PublishArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      description: '',
      btnText: 'Select File',
      image: '',
    };
  }

  componentDidUpdate = prevProps => {
    const { ui: { modalOpen }, article, edit } = this.props;
    if (edit) {
      if (prevProps.ui.modalOpen !== modalOpen && !isEmpty(article)) {
        const {
          article: {
            image,
            description,
            tagList,
          },
        } = this.props;
        const btnText = image.split('/');
        this.setState({
          image,
          description,
          btnText: btnText[btnText.length - 1],
          tags: tagList.split(' ')
            .filter(tag => tag.length > 0)
            .map(tag => ({
              id: tag,
              text: tag,
            })),
        });
        imagePath = image;
        document.getElementById('custom-text').innerHTML = '';
      }
    }
  }

  handleDelete = (i) => {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i),
    });
  }

  handleAddition = (tag) => {
    const { tags } = this.state;
    if (tags.length < 5) {
      this.setState(state => ({ tags: [...state.tags, tag] }));
    } else {
      swal({
        text: 'You can only enter 5 tags',
        icon: 'warning',
        button: {
          className: 'sweet-alert-btn',
        },
      });
    }
  }

  handleDrag = (tag, currPos, newPos) => {
    const { tags } = this.state;
    const newTags = [...tags].slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    this.setState({ tags: newTags });
  }

  resetModal = () => {
    const { close } = this.props;
    close();
  }

  handleClick = () => {
    document.getElementById('file').click();
  }

  handleChange = async (e) => {
    if (!e.target.files) {
      const { name, value } = e.target;
      return this.setState({
        [name]: value,
      });
    }
    const { uploadImage } = this.props;
    const [file] = e.target.files;
    imagePath = URL.createObjectURL(file);
    const { value } = document.getElementById('file');
    const textContainer = document.getElementById('custom-text');
    if (value) {
      const [, fileName] = value.match(/[/\\]([\w\d\s.\-()]+)$/);
      this.setState({
        btnText: fileName,
      });
      textContainer.innerHTML = '';
    }
    const formData = new FormData();
    formData.append('image', file);
    const response = await uploadImage(formData);
    this.setState({
      image: response.payload,
    });
  }

  publish = () => {
    const { image, tags, description } = this.state;
    const {
      title,
      articleBody,
      createNewArticle,
      editArticle,
      history,
      edit,
    } = this.props;
    let tagList = '';

    tags.forEach(tag => tagList += `${tag.text} `);
    if (this.readyToPublish()) {
      if (!edit) {
        return createNewArticle({
          title,
          articleBody,
          image,
          tagList,
          description,
        }, history);
      }
      const {
        match: {
          params: { slug },
        },
      } = this.props;

      return editArticle({
        title,
        articleBody,
        image,
        tagList,
        description,
      }, slug, history);
    }
    swal({
      text: 'All fields are required',
      icon: 'warning',
      button: {
        className: 'sweet-alert-btn',
      },
    });
  }

  readyToPublish = () => {
    const { image, tags, description } = this.state;
    return image && tags && description;
  };

  render() {
    const {
      ui: {
        modalOpen,
        modal,
      },
      image: { loading: imageLoading },
    } = this.props;
    const {
      tags,
      btnText,
      description,
    } = this.state;
    const loader = <Loader type="BallTriangle" color="#000" height={18} width={79} />;

    return (
      <Modal close={this.resetModal} open={modalOpen && modal === 'publish'}>
        <div className="center article-image-div">
          <div
            className="vertical-center image-div"
            style={{
              backgroundImage: `url(${imagePath})`,
              backgroundColor: '#f8f8f8',
              border: '1px dashed #ccc',
              borderRadius: '5px',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              marginBottom: '20px',
              height: '250px',
              width: '550px',
            }}
          >
            <input
              type="file"
              name="file"
              id="file"
              accept="image/*"
              onChange={this.handleChange}
              hidden
            />
            <button
              type="button"
              onClick={this.handleClick}
              disabled={imageLoading}
              id="btn"
            >
              {imageLoading ? loader : btnText}
            </button>
            <span id="custom-text">
              Select a high definition image
              (preferrable landscape) to make your
              article more appealing to readers
            </span>
          </div>
        </div>
        <div className="center">
          <div className="tag-wrapper">
            <ReactTags
              tags={tags}
              handleDelete={this.handleDelete}
              handleAddition={this.handleAddition}
              handleDrag={this.handleDrag}
              delimiters={delimiters}
              classNames={{
                tags: 'tags',
                tagInput: 'tag-input',
                tagInputField: 'tag-input-field',
                selected: 'selected-tag',
                tag: 'tag',
                remove: 'remove-tag',
              }}
            />
          </div>
        </div>
        <div className="vertical-center">
          <span
            className="center description-text"
          >
            * A short description will attract readers scanning
            through the platform. Make it catchy and watch readers rush in
          </span>
          <div className="center">
            <textarea
              name="description"
              value={description}
              className="description-input"
              onChange={this.handleChange}
              placeholder="click to type"
            />
          </div>
          <div className="center">
            <Button
              handleClick={this.publish}
              type="button"
              label="publish"
              disabled={imageLoading}
            >
              {imageLoading && loader}
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}

PublishArticle.propTypes = {
  ui: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    modalOpen: PropTypes.bool.isRequired,
    modal: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  close: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  articleBody: PropTypes.string.isRequired,
  uploadImage: PropTypes.func.isRequired,
  createNewArticle: PropTypes.func.isRequired,
  editArticle: PropTypes.func.isRequired,
  image: PropTypes.shape().isRequired,
  article: PropTypes.shape().isRequired,
  edit: PropTypes.bool,
  match: PropTypes.shape().isRequired,
};

PublishArticle.defaultProps = {
  edit: false,
};

export default connectComponent(
  withRouter(PublishArticle), {
    close: closeModal,
    uploadImage: postImage,
    createNewArticle: (articleData, history) => createArticle(articleData, history),
    editArticle: (articleData, slug, history) => updateArticle(articleData, slug, history),
  },
);
