import Enzyme from 'enzyme';
import EnzymeAdaptar from 'enzyme-adapter-react-16';

Enzyme.configure({
  adapter: new EnzymeAdaptar(),
  disableLifecycleMethods: true,
});
