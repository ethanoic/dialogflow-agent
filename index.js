export class DialogFlowWebHook {
  fulfilmentRequestPayload;
  responsePayload;

  constructor({
    responseId, 
    queryResult,
    originalDetectIntentRequest,
    session
  }) {
    this.fulfilmentRequestPayload = {
      responseId,
      queryResult,
      originalDetectIntentRequest,
      session
    }
  }

  getSession() {
    return this.fulfilmentRequestPayload.session;
  }

  getIntent() {
    const { intent } = this.fulfilmentRequestPayload.queryResult;
    return intent;
  }

  getQueryText() {
    const { queryText } = this.fulfilmentRequestPayload.queryResult;
    return queryText;
  }

  startResponse() {
    this.responsePayload = {
      fulfillmentMessages: []
    }
    return this;
  } 

  setTextResponse(message) {
    const response = {
      text: {
        text: [message]
      }
    }
    let messages = this.responsePayload.fulfillmentMessages.filter((item) => item.text === undefined);
    messages.push(response);
    this.responsePayload.fulfillmentMessages = messages;
    return this;
  }

  addTextResponse(message) {
    let index = null;
    let messageResponse = this.responsePayload.fulfillmentMessages.find((item,i ) => { 
      if (item.text !== undefined) {
        index = i;
        return true;
      } else {
        return false;
      }
    });
    if (messageResponse === null) {
      messageResponse = {
        text: {
          text: [message]
        }
      }
    }

    messageResponse.text.text.push(message);
    this.responsePayload.fulfillmentMessages[index] = messageResponse;

    return this;
  }

}