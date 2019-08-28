import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const connectComponent = (Component, actions) => {
  const mapStateToProps = (state) => ({ ...state });

  const mapDispatchToProps = (dispatch) => bindActionCreators({ ...actions }, dispatch);
  return connect(
    mapStateToProps, mapDispatchToProps,
  )(Component);
};

export default connectComponent;
