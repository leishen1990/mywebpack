export default class Rotator {
  rotate(elem, delay) {
    setTimeout(() => elem.className += ' rotate', delay);
  }
}
