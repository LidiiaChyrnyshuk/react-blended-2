import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    value: '',
    page: 1,
    items: [],
    showBtn: false,
    isEmpty: false,
  };
  componentDidUpdate(prevProps, prevState) {
    const { value, page } = this.state;
    if (prevState.value !== value || prevState.page !== page) {
      ImageService.getImages(value, page).then(({ photos, total_results }) => {
        if (!photos.length) {
          this.setState({ isEmpty: true });
          return;
        }
        this.setState(prevState => ({
          items: [...prevState.items, ...photos],
          showBtn: page < Math.ceil(total_results / 15),
        }));
      });
    }
  }

  handleSubmit = value => {
    this.setState({
      value,
      page: 1,
      items: [],
      showBtn: false,
      isEmpty: false,
    });
  };

  handleButton = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    return (
      <>
        <SearchForm handleSubmit={this.handleSubmit} />
        {this.state.isEmpty && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}
        <Grid>
          {' '}
          {this.state.items.map(item => {
            return (
              <GridItem key={item.id}>
                <CardItem color={item.avg_color}>
                  <img src={item.src.large} alt={item.alt} />
                </CardItem>
              </GridItem>
            );
          })}{' '}
        </Grid>
        {this.state.showBtn && (
          <Button type="button" onClick={this.handleButton}>
            Load more
          </Button>
        )}
      </>
    );
  }
}
