import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

const TO_DO = 'to_do';

export class Todos extends Component {
  state = {
    todoItems: [],
  };

  componentDidMount() {
    const localStarageItems = JSON.parse(localStorage.getItem(TO_DO));
    if (localStarageItems) {
      this.setState({ todoItems: localStarageItems });
    }
    console.log(localStarageItems);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todoItems !== this.state.todoItems) {
      localStorage.setItem(TO_DO, JSON.stringify(this.state.todoItems));
    }
  }

  handleSubmit = value => {
    const toDo = {
      text: value,
      id: nanoid(),
    };
    this.setState(prevState => ({
      todoItems: [...prevState.todoItems, toDo],
    }));
  };

  toDelete = id => {
    this.setState(prevState => ({
      todoItems: prevState.todoItems.filter(item => item.id !== id),
    }));
  };

  render() {
    return (
      <>
        <SearchForm handleSubmit={this.handleSubmit} />
        <Grid>
          {this.state.todoItems.map((item, index) => (
            <GridItem key={item.id}>
              <Todo
                id={item.id}
                text={item.text}
                counter={index + 1}
                onDelete={this.toDelete}
              />
            </GridItem>
          ))}
        </Grid>
      </>
    );
  }
}
