import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    value: '',
    page: 1,
    items: [],
  };
  componentDidUpdate(prevProps, prevState) {
    const { value, page } = this.state;
    if (prevState.value !== value || prevState.page !== page) {
      ImageService.getImages(value, page).then(data => {
        console.log(data);
      });
    }
  }

  handleSubmit = value => {
    this.setState({ value });
  };
  render() {
    return (
      <>
        <SearchForm handleSubmit={this.handleSubmit} />
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      </>
    );
  }
}
