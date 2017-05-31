/* eslint react/prefer-stateless-function: 0 */
import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import connect from 'connect-alt';
import SiteHeader from 'components/header/';
import { Grid } from 'react-cellblock';
import styles from 'styles/app.css';
import classNames from 'classnames/bind';
import debug from 'debug';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import injectTapEventPlugin from 'react-tap-event-plugin';
import injectContext from 'decorators/inject-context';
import { Link } from 'react-router';

injectTapEventPlugin();

const cx = classNames.bind(styles);
const reactI13nTealium = new ReactI13nTealium();

@connect('ui', 'requests')
@injectContext
class App extends Component {

  props: {
    children?: ?any,
    location: {},
    params?: ?{},
    uiStore: {
      bodyHeight: ?number
    },
    requestsStore: {
      inProgress?: ?boolean
    }
  };

  state = {
    bodyHeight: this.props.uiStore.bodyHeight
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResizeDebounced);
    this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResizeDebounced);
  }

  handleResize = () => {
    let height = window.innerHeight;
    const footerEl = this._footerRef;
    height -= footerEl ? footerEl.getBoundingClientRect().height : 0;
    debug('dev')(`app handleResize, setting bodyHeight: ${height}`);
    this.getActions('ui').updateProperty('bodyHeight', height);
    this.setState({ bodyHeight: height });
  };

  handleResizeDebounced = debounce(this.handleResize, 150);

  onChange = (breakpoint) => {
    if (this.context.identity.initialBreakpoint !== breakpoint) {
      debug('dev')('breakpoint:changed', breakpoint);
      this.getActions('userIdentity').setInitialBreakpoint(breakpoint);
    }
  };

  render = () => {
    const { children, location } = this.props;
    const { identity } = this.context;
    const entitlements = get(identity, 'entitlements');
    const initialBreakpoint = get(identity, 'initialBreakpoint');
    const props = { location, entitlements };
    const params = { key: location.pathname, ...props };
    const { bodyHeight } = this.state;
    const bodyStyle = bodyHeight ? { height: bodyHeight } : null;
    const clonedChildren = () => (
      React.Children.map(children, child => React.cloneElement(child, params))
    );

    return (
      <Grid
        columnWidth={ 60 }
        initialBreakpoint={ initialBreakpoint }
        onChange={ this.onChange }
        flexible={ [ 4, 8, 12, 16 ] }
        className='react-cellblock'>
        <SiteHeader entitled={ !!entitlements } />
        <ReactCSSTransitionGroup
          component='div'
          transitionName='reversePageSwap'
          transitionEnterTimeout={ 600 }
          transitionLeaveTimeout={ 600 }>
          <div
            id='app-body'
            className={ cx('body', `breakpoint-${initialBreakpoint || 16}`) }
            style={ bodyStyle }>
            { clonedChildren() }
            <ul>
              <li><Link to='/upload'>Upload</Link></li>
              <li><Link to='/search'>Search</Link></li>
            </ul>
          </div>
        </ReactCSSTransitionGroup>
      </Grid>
    );
  };

}

export default App;