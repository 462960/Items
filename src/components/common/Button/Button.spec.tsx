import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';

describe('Hello, Enzyme!', () => {
  it('renders', () => {
    const wrapper = shallow(
      <div>
        <h1>Hello, Enzyme!</h1>
      </div>
    );
    expect(wrapper.find('h1').html()).toMatch(/Hello, Enzyme/);
  });

  // it('renders snapshots, too', () => {
  //   const wrapper = shallow(<div>
  //     <h1>Hello, Enzyme!</h1>
  //   </div>)
  //   expect(wrapper).toMatchSnapshot()
  // })
});

it('renders the heading', () => {
  // const result = shallow(<Button />).contains(<button />);
  // expect(result).toBeTruthy();

  const result = shallow(<Button>aaa</Button>);
  expect(result.find('button').html()).toMatch(/aaa/);
});
