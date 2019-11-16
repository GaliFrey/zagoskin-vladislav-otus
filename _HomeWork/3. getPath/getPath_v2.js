/* eslint-disable no-unused-vars */
function getPath(elem) {
  let elemPath = [];

  (function parentPath(partPath) {
    elemPath.unshift(partPath);
    if (!partPath.parentElement) return false;
    parentPath(partPath.parentElement);
  })(elem);

  function getId(elemForId) {
    let valueId = elemForId.getAttribute('id');

    if (valueId) {
      try {
      document.querySelectorAll(valueId);
      return `#${valueId}`;
      } catch(e) {
        return false;
      }
    }

    return false;
  }

  function getClass(elemForClass) {
    let valueClass = elemForClass.classList;
    let selfName = elemForClass.tagName.toLowerCase();

    if (valueClass.length > 0) {
      return `${selfName}${Array.prototype.reduce.call(valueClass, (pathStr, item) => { return pathStr += `.${item}` }, '')}`;
    }

    return false;
  }

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

  let path = [];
  // console.log(elemPath);
  for (let part of elemPath) {
    let valueId = getId(part);

    if (valueId) {
      path.push(valueId);
      continue;
    }

    let valueClass = getClass(part);

    if (valueClass) {
      path.push(valueClass);
      continue;
    }

    let valueNthChild = getNthChild(part);

    if (valueNthChild) {
      path.push(valueNthChild);
      continue;
    }
  }

  for (let i = path.length - 1; i >= 0; i--) {
    let newPath = path.slice(i).join(' > ');
    let searchResult = document.querySelectorAll(newPath).length;
    if (searchResult === 1) return newPath;
  }

  for (let j = path.length - 1; j >= 0; j--) {
    path.splice(j, 1, getNthChild(elemPath[j]));

    for (let i = path.length - 1; i >= 0; i--) {
      let newPath = path.slice(i).join(' > ');
      let searchResult = document.querySelectorAll(newPath).length;
      if (searchResult === 1) return newPath;
    }
  }
}

function testGetPath() {
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
}
