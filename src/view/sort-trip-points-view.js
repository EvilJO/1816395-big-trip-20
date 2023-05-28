import AbstractView from '../framework/view/abstract-view.js';
import { CONST_COMMON_DATA } from '../const/common-const.js';

/**
 * Возвращает разметку критерия сортировки точек путешествия
 * @param {string} sortItem Строка с названием критерия сортировки
 * @returns Строку с разметкой критерия сортировки точек путешествия
 */

function createTripSortItemHTML(sortItem) {
  return (/*html*/`

    <div class="trip-sort__item  trip-sort__item--${sortItem}">
      <input id="sort-${sortItem}" class="trip-sort__input  visually-hidden" data-sort-type="${sortItem.toLocaleUpperCase()}" type="radio" name="sort-${sortItem}" value="sort-${sortItem}">
      <label class="trip-sort__btn" for="sort-${sortItem}">${sortItem}</label>
    </div>

`);
}

/**
 * Создает строку разметки всех критериев сортировки точек путешествия
 * @param {Array} sortItems Массив с критериями сортировки точек путешествия
 * @returns Строку с разметкой критериев сортировки точек путешествия
 */

function createTripSortItemsHTML(sortItems) {
  return sortItems
    .map((sortItem) => createTripSortItemHTML(sortItem))
    .join('');
}

/**
 * Создает шаблон разметки критериев сортировки
 * @returns Строку с шаблоном разметки критериев сортировки
 */

function createTripSortTemplate() {
  const sortItems = Object.values(CONST_COMMON_DATA.sortTypes);

  const tripSortItemsHTML = createTripSortItemsHTML(sortItems);

  return (/*html*/
    `
      <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
        ${tripSortItemsHTML}
      </form>
    `
  );
}


/**
* Класс для управления компонентом для отрисовки SortsEventsTripView
*/

export default class SortsTripPointsView extends AbstractView {
  #handleSortTypeChange = null;

  constructor({onSortTypeChange}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);

  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName === 'INPUT') {
      evt.preventDefault();
      this.#handleSortTypeChange(evt.target.dataset.sortType);
    }


  };

  /**
   * Метод для получения шаблона разметки критериев сортировки точек путешествия
   */

  get template() {
    return createTripSortTemplate();
  }

}
