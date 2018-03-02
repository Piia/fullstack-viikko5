import React from 'react'
import { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Blog from './Blog'
import TogglableBlog from './TogglableBlog'

describe('<TogglableBlog />', () => {
  let togglableComponent

  beforeEach(() => {
    togglableComponent = shallow(
      <TogglableBlog title="title">
        <div className="testDiv" />
      </TogglableBlog>
    )
  })

  it('renders its children', () => {
    expect(togglableComponent.contains(<div className="testDiv" />)).toEqual(true)
  })

  it('at start the children are not displayed', () => {
    const div = togglableComponent.find('.togglableContent')
    expect(div.getElement().props.style).toEqual({ display: 'none' })
  })

  it('after clicking the title, children are displayed', () => {
    const titleP = togglableComponent.find('.title')
    titleP.simulate('click')

    const div = togglableComponent.find('.togglableContent')

    expect(div.getElement().props.style).toEqual({ display: '' })
  })

})