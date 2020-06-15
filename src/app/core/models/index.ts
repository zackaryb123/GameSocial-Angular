export interface Deserializable {
  deserialize(input: any): this;
}

export interface Serializable {
  toJSON(): any;
  serialize(): any;
}
