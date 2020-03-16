export default abstract class Event {
  static get eventName(): string {
    return this.name;
  }
  get eventName(): string {
    return this.constructor.name;
  }
}
