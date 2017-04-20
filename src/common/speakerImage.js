import {customAttribute, inject} from 'aurelia-framework';

@inject(Element)
@customAttribute('speaker-img')
export class SpeakerImage {
  constructor(element) {
    this.element = element;
  }

  valueChanged(newValue) {
    this.element.src = 'images/speakers/' + newValue;
  }

  bind(bindingContext) {
    this.valueChanged(this.value);
  }
}
