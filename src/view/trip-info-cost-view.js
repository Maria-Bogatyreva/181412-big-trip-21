import {createElement} from '../render.js';

function createTripInfoCostTemplate() {
  return `<p class="trip-info__cost">
            Total: €&nbsp;<span class="trip-info__cost-value">1230</span>
          </p>`;
}

export default class TripInfoMainView {
  getTemplate() { // Получем шаблон элемента (кусок HTML-разметки)
    return createTripInfoCostTemplate();
  }

  getElement() { // Создаем DOM-элемент
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
