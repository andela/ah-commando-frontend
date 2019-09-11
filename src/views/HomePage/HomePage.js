import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getHomePageArticles, getArticle, getEditorsChoice } from '@App/actions/Articles';
import connectComponent from '@Lib/connect-component';
import Footer from '@Components/Footer';
import PasswordRequest from '@Components/Forms/PasswordRequest';
import Icon from '@Components/Icon';
import HomeCardArticle from './HomeCardArticle';
import Banner from './Banner';
import MainCardSection from './MainCardSection';
import AsideCardSection from './AsideCardSection';
import './homepage.style.scss';

export class Home extends Component {
  state = {
    asideHeight: '800px',
  }

  scroller = React.createRef();

  articleDiv = React.createRef();

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, true);
    const { homePageGet, homeArticleGet, editorsChoiceGet } = this.props;
    homePageGet();
    homeArticleGet();
    editorsChoiceGet();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    if (this.scroller.current === null) { return; }
    const currentHeight = this.scroller.current.getBoundingClientRect().top;
    if (currentHeight < -2950) {
      this.setState({ asideHeight: '500px' });
    } else {
      this.setState({ asideHeight: '750px' });
    }
  };

  handleClick = (e, position) => {
    if (position === 'top') {
      this.articleDiv.current.scrollTop -= 200;
    } else this.articleDiv.current.scrollTop += 200;
  };

  render() {
    const { asideHeight } = this.state;
    return (
      <div data-test="homepageComponent" className="homepage" ref={this.scroller}>
        <PasswordRequest />
        <HomeCardArticle />
        <div className="articleSection">
          <section className="featured">
            <MainCardSection />
          </section>
          <aside className="aside" style={{ height: asideHeight }}>
            <div className="btns top">
              <button data-test="topBtn" type="button" onClick={(e) => this.handleClick(e, 'top')}>
                <Icon name="angleTop" />
              </button>
            </div>
            <AsideCardSection reactRef={this.articleDiv} />
            <div className="btns bottom">
              <button data-test="bottomBtn" type="button" onClick={(e) => this.handleClick(e, 'bottom')}>
                <Icon name="angleBottom" />
              </button>
            </div>
          </aside>
        </div>
        <div className="banner" data-test="Banner">
          <Banner />
        </div>
        <div style={{ padding: '30px' }}>
          <Footer />
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  homePageGet: PropTypes.func.isRequired,
  homeArticleGet: PropTypes.func.isRequired,
  editorsChoiceGet: PropTypes.func.isRequired,
};

export default connectComponent(Home,
  {
    homePageGet: getHomePageArticles,
    homeArticleGet: getArticle,
    editorsChoiceGet: getEditorsChoice,
  });
