import React from 'react';
import { shallow } from 'enzyme';
import { checkProps, findByTestAttribute } from '@Utils/';
import { DropDown } from './DropDown';

const setUp = (props = {}) => {
  const component = shallow(<DropDown {...props} />);
  return component;
};

describe('DropDown Component Tests', () => {
  let expectedprops;
  describe('Checking propTypes', () => {
    it('should not throw a warning', () => {
      expectedprops = {
        markAsRead: jest.fn(),
        getNotifications: jest.fn(),
        markAllRead: jest.fn(),
        updateSubscription: jest.fn(),
        getProfile: jest.fn(),
        profile: {
          user: {
            newPostEmailSub: true,
          },
        },
        history: {
          push: jest.fn(),
        },
        type: 'notification',
        show: true,
        notifications: {
          notifications: [{
            id: 1,
            resourceType: 'article',
            resourceId: 'slug',
            createdAt: '2019-09-04 09:59:58.982+01',
            message: 'test message',
          }],
        },
      };

      const propsErr = checkProps(DropDown, DropDown.PropTypes, expectedprops);

      expect(propsErr).toBeUndefined();
    });
  });

  describe('Should render with props for notifications', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setUp(expectedprops);
    });

    it('should render without error', () => {
      const component = findByTestAttribute(wrapper, 'dropDownComponent');
      expect(component.length).toBe(1);
    });

    it('Should test mark as read function', () => {
      const appInstance = wrapper.instance();
      wrapper.find('[btn-test="markAllRead"]').simulate('click');
      expect(appInstance.props.markAllRead).toHaveBeenCalled();
      expect(appInstance.props.getNotifications).toHaveBeenCalled();
    });

    it('Should test handle click', () => {
      const appInstance = wrapper.instance();
      appInstance.handleClick(2, 'article', 'resourceId');
      expect(appInstance.props.markAsRead).toHaveBeenCalled();
      expect(appInstance.props.getNotifications).toHaveBeenCalled();
      expect(appInstance.props.history.push).toHaveBeenCalled();
    });

    it('Should test handle click', () => {
      const appInstance = wrapper.instance();
      appInstance.handleClick(2, 'follow', 'resourceId');
      expect(appInstance.props.markAsRead).toHaveBeenCalled();
      expect(appInstance.props.getNotifications).toHaveBeenCalled();
      expect(appInstance.props.history.push).toHaveBeenCalled();
    });

    it('Should test handle click', () => {
      const appInstance = wrapper.instance();
      wrapper.find('[data-test="notifybutton"]').simulate('click');
      appInstance.handleClick(2, 'comment', 'resourceId');
      expect(appInstance.props.markAsRead).toHaveBeenCalled();
      expect(appInstance.props.getNotifications).toHaveBeenCalled();
      expect(appInstance.props.history.push).toHaveBeenCalled();
    });

    it('Should test componentDidUpdate', () => {
      const prevProps = {
        profile: {
          user: null,
        },
      };
      const appInstance = wrapper.instance();
      const returned = appInstance.componentDidUpdate(prevProps);
      expect(returned).toBe(1);
    });

    it('Should test componentDidUpdate', () => {
      const prevProps = {
        profile: {
          user: {
            newPostEmailSub: true,
          },
        },
      };
      const appInstance = wrapper.instance();
      appInstance.componentDidUpdate(prevProps);
      expect(appInstance.state.updated).toBe(true);
    });

    it('Should test componentDidUpdate', () => {
      const prevProps = {
        profile: {
          user: {
            newPostEmailSub: false,
          },
        },
      };
      const appInstance = wrapper.instance();
      appInstance.componentDidUpdate(prevProps);
      expect(appInstance.state.updated).toBe(false);
    });
  });

  describe('Should render with props for UserProfile', () => {
    let wrapper;
    beforeEach(() => {
      expectedprops.type = 'userProfile';
      wrapper = setUp(expectedprops);
    });

    it('should render without error', () => {
      const component = findByTestAttribute(wrapper, 'dropDownComponent');
      expect(component.length).toBe(1);
    });

    it('should render without error', async () => {
      const e = {
        target: {
          checked: true,
        },
      };
      const appInstance = wrapper.instance();
      wrapper.find('[data-test="checkbox"]').simulate('change', e);
      await expect(appInstance.props.updateSubscription).toHaveBeenCalled();
      expect(appInstance.props.getProfile).toHaveBeenCalled();
      expect(appInstance.state.emailNotify).toBe(true);
    });
  });

  describe('Should render with props for no notifications', () => {
    let wrapper;
    beforeEach(() => {
      const newPros = expectedprops;
      newPros.notifications = {
        notifications: [],
      };
      newPros.type = 'notification';
      wrapper = setUp(newPros);
    });

    it('should render without error a loading div for no notifications', () => {
      const component = findByTestAttribute(wrapper, 'dropDownComponent');
      expect(component.length).toBe(1);
    });
  });

  describe('Should render with props for no userProfile', () => {
    let wrapper;
    beforeEach(() => {
      const newPros = expectedprops;
      newPros.profile = {
        user: null,
      };
      newPros.type = 'userProfile';
      wrapper = setUp(newPros);
    });

    it('should render without error a loading div for no notifications', () => {
      const component = findByTestAttribute(wrapper, 'dropDownComponent');
      expect(component.length).toBe(1);
    });
  });

  describe('Should render with props for no userProfile', () => {
    let wrapper;
    beforeEach(() => {
      const newPros = expectedprops;
      newPros.show = false;
      newPros.type = 'userProfile';
      wrapper = setUp(newPros);
    });

    it('should render without error a loading div for show false', () => {
      const component = findByTestAttribute(wrapper, 'dropDownComponent');
      expect(component.length).toBe(1);
    });
  });
});
