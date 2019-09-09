import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getHomePageArticles, getArticle, getEditorsChoice } from '@App/actions/Articles';
import connectComponent from '@Lib/connect-component';
import Header from '@Components/Header';
import Footer from '@Components/Footer';
import SignUp from '@Components/Forms/SignUp';
import SignIn from '@Components/Forms/SignIn';
import PasswordRequest from '@Components/Forms/PasswordRequest';
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
    if (this.scroller.current.getBoundingClientRect().top < -2950) {
      this.setState({ asideHeight: '500px' });
    } else {
      this.setState({ asideHeight: '750px' });
    }
  };

  handleClick = (e, position) => {
    if (position === 'top') {
      e.target.parentElement.nextElementSibling.scrollTop += 200;
    } else e.target.parentElement.previousElementSibling.scrollTop -= 200;
  };

  render() {
    const { asideHeight } = this.state;
    return (
      <div data-test="homepageComponent" className="homepage" ref={this.scroller}>
        <SignIn />
        <SignUp />
        <Header />
        <PasswordRequest />
        <HomeCardArticle />
        <div className="articleSection">
          <section className="featured">
            <MainCardSection />
          </section>
          <aside className="aside" style={{ height: asideHeight }}>
            <div className="btns top">
              <button data-test="topBtn" type="button" onClick={(e) => this.handleClick(e, 'top')}>^</button>
            </div>
            <AsideCardSection />
            <div className="btns bottom">
              <button data-test="bottomBtn" type="button" onClick={(e) => this.handleClick(e, 'bottom')}>v</button>
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
