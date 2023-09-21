import PointsListPresenter from './presenter/points-list-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import {render} from './framework/render.js';
import NewPointButtonView from './view/new-point-button-view.js';
import PointsApiService from './point-api-service.js';

const headerInfoContainerElement = document.querySelector('.trip-main'); // Header Container
const filterContainerElement = document.querySelector('.trip-controls__filters');
const tripEventsContainerElement = document.querySelector('.trip-events');


const AUTHORIZATION = 'Basic qwertyqwertysdf';
const END_POINT = 'https://21.objects.pages.academy/big-trip';

const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});

const filterModel = new FilterModel();
const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});

const pointListPresenter = new PointsListPresenter({
  presenterContainer: tripEventsContainerElement,
  headerInfoContainer: headerInfoContainerElement,
  pointsModel,
  filterModel,
  onNewTaskDestroy: handleNewTaskFormClose
});


const filterPresenter = new FilterPresenter({
  filterContainer: filterContainerElement,
  filterModel,
  pointsModel
});

// Добавляем кнопку "New point", она заблокирована!!!!
render(newPointButtonComponent, headerInfoContainerElement);
filterPresenter.init();
pointListPresenter.init();
pointsModel.init()
  .finally(() => {
    newPointButtonComponent.element.disabled = pointsModel.error; // Блокировка кнопки "New point" зависит от ответа сервера
  });

function handleNewTaskFormClose() {
  newPointButtonComponent.element.disabled = false;
}
function handleNewPointButtonClick() {
  pointListPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}
