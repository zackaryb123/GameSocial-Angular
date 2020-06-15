import {Deserializable, Serializable} from './index';

export interface IChat {
  uids?: string[];
  timeStamp?: number;
  count?: number;
  messages?: IMessage[];
}

export interface IMessage {
  uid?: string;
  message?: string;
  timeStamp?: number;
}

export class ChatModel implements Serializable, Deserializable, IChat  {
  uids?: string[];
  timeStamp?: number;
  count?: number;
  messages?: MessageModel[];

  constructor(uids?: string[], timeStamp?: number, count?: number, messages?: MessageModel[]) {
    this.uids = uids;
    this.timeStamp = timeStamp;
    this.count = count;
    this.messages = messages;
  }

  toJSON(): IChat {
    return this.serialize();
  }

  serialize(): IChat {
    return Object.assign({}, this, {
      uids: this.uids ? this.uids.map(content => content) : [],
      messages: this.messages ? this.messages.map(content => content.toJSON()) : []
    });
  }

  deserialize(input: IChat): this {
    return Object.assign(this, input, {
      uids: input.uids ? input.uids.map(content => content) : [],
      messages: input.messages ? input.messages.map(content => new MessageModel().deserialize(content)) : []
    });
  }
}

export class MessageModel implements Serializable, Deserializable, IMessage {
  message: string;
  timeStamp: number;


  constructor(message?: string, timeStamp?: number) {
    this.message = message;
    this.timeStamp = timeStamp;
  }

  toJSON(): IMessage {
    return this.serialize();
  }

  serialize(): IMessage {
    return Object.assign({}, this, {

    });
  }

  deserialize(input: IMessage): this {
    return Object.assign(this, input, {
      message: this.message ? this.message : '',
      timeStamp: this.timeStamp ? this.timeStamp : ''
    });
  }
}
