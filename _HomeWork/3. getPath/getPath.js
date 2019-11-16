/* eslint-disable no-unused-vars */
/**
 * Функция находит уникальный селектор для выбранного элемента
 * @param {object} elem элемент HTML коллекции
 */
function getPath(element) {
  // будем использовать массив для записи частей составного селектора
  let arrPath = [];

  /**
   * Функция возвращает значение аттрибута id если такой имеется, иначе false
   * Добавлена проверка на корректный id, если querySelector выдает ошибку (например id = ['#2.00', '#g:g'])
   * @param {object} elemForId элемент HTML коллекции
   */
  function getId(elemForId) {
    let valueId = elemForId.getAttribute('id');

    if (valueId) {
      try {
        document.querySelectorAll(valueId);
        return `#${valueId}`;
      } catch (e) {
        return false;
      }
    }

    return false;
  }

  /**
   * Функция возвращает порядковый номер элемента относительно родителя
   * @param {object} elemForNthChild элемент HTML коллекции
   */
  function getNthChild(elemForNthChild) {
    let parent = elemForNthChild.parentElement;
    let friends = parent ? parent.children : [elemForNthChild];
    let selfName = elemForNthChild.tagName.toLowerCase();

    if (friends.legth === 1) {
      return selfName;
    }

    let bestFriends = Array.prototype.
      map.call(friends, (friend) => { return friend.tagName.toLowerCase() })
      .filter((friendName) => { return friendName === selfName })

    if (bestFriends.length === 1) {
      return selfName;
    }

    for (let i = 0; i < friends.length; i++) {
      if (friends[i] === elemForNthChild) {
        return `${selfName}:nth-child(${i + 1})`;
      }
    }

  }

  /**
   * Функция проверяет, возвращает ли селектор только один HTML элемент
   * @param {string} path строка составного селектора
   */
  function checkUnicalPath(path) {
    if (document.querySelectorAll(path).length !== 1) {
      return false;
    }

    return true;
  }

  /**
   * Функция осуществляет поиск уникального составного селектора
   * @param {object} elem элемент HTML коллекции
   */
  function searchPath(elem) {

    let getIdValue = getId(elem);

    if (getIdValue) {
      arrPath.unshift(getIdValue);
    } else {
      arrPath.unshift(getNthChild(elem));
    }

    if (checkUnicalPath(arrPath.join(' ')) === false) {
      arrPath.unshift('>');
      searchPath(elem.parentElement);
    }

    return (arrPath.join(' '));
  }

  return searchPath(element);
}

/**
 * Функция берет все элементы на странице, использует для каждого функцию getPath и выводит таблицу с результатом.
 */
(function testGetPath() {
  let arrHtmlElements = document.getElementsByTagName('*');

  let tableCheck = [];

  for (let elem of arrHtmlElements) {
    let obj = {};
    obj.path = getPath(elem);
    obj.findElem = document.querySelector(getPath(elem));
    obj.countElems = document.querySelectorAll(getPath(elem)).length;

    if (Boolean(obj.path) && Boolean(obj.findElem) && (obj.countElems === 1)) {
      obj.error = undefined;
    } else {
      obj.error = 'error';
    }

    tableCheck.push(obj);
  }

  console.table(tableCheck);
})();
