import PointListView from '../view/point-list-view.js'; // обертка ul
import PointView from '../view/point-view.js'; // point
import EditPointFormView from '../view/edit-point-form-view.js'; // форма создания/редактирования
import {render} from '../framework/render.js';


export default class PointsPresenter {
  #pointListComponent = new PointListView();
  #presenterContainerElement = null;
  #pointsModel = null;

  #points = [];
  #destinations = [];
  #offers = [];

  // При создании экземпляра класса презентера передаем ОБЪЕКТ с указанием:
  //  - контейнера (DOM-элемента!), куда положим САМ ПРЕЗЕНТЕР!
  //  - модели с данными
  constructor({presenterContainerElement, pointsModel}) {
    this.#presenterContainerElement = presenterContainerElement; // это DOM-элемент, и это контейнер для ВСЕГО списка, а не для точек
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points]; // Это наш массив точек, которые мы отрисовываем
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];

    render(this.#pointListComponent, this.#presenterContainerElement); // вставили обертку ul
    // Вставляем ФОРМУ СОЗДАНИЯ/РЕДАКТИРОВАНИЯ ТОЧКИ. Передаем объект с точкой, а также массивы destinations и offers
    render(new EditPointFormView({point: this.#points[0], destinations: this.#destinations, offers: this.#offers}), this.#pointListComponent.element);

    for (let i = 1; i < this.#points.length; i++) {
      render(new PointView({point: this.#points[i], destinations: this.#destinations, offers: this.#offers}), this.#pointListComponent.element);
    }
  }
}
