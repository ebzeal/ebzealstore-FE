import React, { Component } from 'react';
import styled, { ThemeProvider} from 'styled-components';
import Header from '../Header/Header';
import Meta from '../Meta';
import * as PageStyles from './page.styles';
import theme from '../styles/theme.styles';
import injectGlobal from '../styles/global.styles';


class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <PageStyles.StyledPage>
          <Meta />
          <Header />
          <PageStyles.Inner>
            {this.props.children}
          </PageStyles.Inner>
        </PageStyles.StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;
