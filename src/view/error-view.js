import AbstractView from '../framework/view/abstract-view.js';

function createErrorTemplate() {
  return '<p class="trip-events__msg">Failed to load latest route information</p>';
}

export default class ErrorView extends AbstractView {
  constructor() {
    super();
  }

  get template() { // Получем шаблон элемента (кусок HTML-разметки)
    return createErrorTemplate();
  }

}
