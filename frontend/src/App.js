import React, { Component } from "react";
import api from "./api";
import { Container, Messages, Message, Input } from "./styles";

class App extends Component {
  state = {
    newInputMessage: "",
    context: {},
    messages: []
  };

  async componentWillMount() {
    const {
      data: {
        output: {
          text: [message]
        },
        context
      }
    } = await api.post("/bot");
    this.setState({ context, messages: [{ id: 0, message }] });
  }

  addMessageFromUser = message => {
    if (!message) {
      return false;
    }
    this.setState({
      newInputMessage: "",
      messages: [
        ...this.state.messages,
        { id: this.state.messages.length, message, user: true }
      ]
    });
    return true;
  };

  handleSubmitMessage = async e => {
    if (e.key === "Enter") {
      if (this.addMessageFromUser(this.state.newInputMessage)) {
        const {
          data: {
            output: { text },
            context
          }
        } = await api.post("/bot", {
          message: this.state.newInputMessage,
          context: this.state.context
        });
        const messages = text.map((message, index) => ({
          id: this.state.messages.length + index,
          message
        }));
        this.setState({
          messages: this.state.messages.concat(messages)
        });
      }
    }
  };

  render() {
    return (
      <Container>
        <Messages>
          {this.state.messages.map(({ id, message, user }) => (
            <Message key={id} user={user}>
              {message}
            </Message>
          ))}
        </Messages>
        <Input
          type="text"
          placeholder="Press enter"
          onChange={e => this.setState({ newInputMessage: e.target.value })}
          value={this.state.newInputMessage}
          onKeyPress={this.handleSubmitMessage}
        />
      </Container>
    );
  }
}

export default App;
