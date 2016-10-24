var selectedNode = document;

function selectNode(node) {
  node.className = 'selected';
  selectedNode = node;
  console.log('selected: ', selectedNode);
}
function deselectNode(node) {
  node.className = '';
}

window.onload = function () {
  selectNode(document);
  var btnParent = 
   document.getElementById('btnParent');
  btnParent.onclick = function () {
    if (selectedNode.parentNode) {
      deselectNode(selectedNode);
      selectNode(selectedNode.parentElement);
    }
  };
  var btnPrevSib = 
   document.getElementById('btnPrevSib');
  btnPrevSib.onclick = function () {
    if (selectedNode.previousSibling) {
      deselectNode(selectedNode);
      selectNode(selectedNode.previousSibling);
    }
  };
  var btnNextSib = 
   document.getElementById('btnNextSib');
  btnNextSib.onclick = function () {
    if (selectedNode.nextSibling) {
      deselectNode(selectedNode);
      selectNode(selectedNode.nextSibling);
    }
  };
  var btnFirstChild = 
   document.getElementById('btnFirstChild');
  btnFirstChild.onclick = function () {
    if (selectedNode.firstChild) {
      deselectNode(selectedNode);
      selectNode(selectedNode.firstChild);
    }
  };
  var btnLastChild = 
   document.getElementById('btnLastChild');
  btnLastChild.onclick = function () {
    if (selectedNode.lastChild) {
      deselectNode(selectedNode);
      selectNode(selectedNode.lastChild);
    }
  };
  var btnAddPlace = 
   document.getElementById('btnAddPlace');
  btnAddPlace.onclick = function () {
    var ol =  
      document.getElementById('coolPlaces');
    
    var txtNewPlace = 
      document.getElementById('txtNewPlace');
    var newPlace = txtNewPlace.value;
    
    // create a new DOM node
    var newListItem = 
        document.createElement('li');
    var content = 
        document.createTextNode(newPlace);
    newListItem.appendChild(content);
    ol.appendChild(newListItem);
  };
  
  var lstVisibility = 
    document.getElementById('lstVisibility');
  lstVisibility.onchange = function () {
    var list = 
    document.getElementById('lstVisibility');
    var selectedIndex = list.selectedIndex;
    var visibility = list.options[selectedIndex].text;
    
    selectedNode.style.display = visibility;
  };
  
};






