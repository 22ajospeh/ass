

var lastid = 0;
var wishlist = document.getElementById('list');
var wishlist2 = document.getElementById('list2');
var wishlist3 = document.getElementById('list3');

var wishlist4 = document.getElementById('container');
// Adds value of AddTask to the list
document.getElementById("add").onclick = function() {

	if (AddTask.value.length < 1) return;

	var node = document.createElement("li");     
	var text1 = document.getElementById("AddTask").value;  
	var text2 = document.getElementById("Priority").value;
	var text3 = document.getElementById("EstTime").value;

	var textTotal = text1 + ", " + text2 + ", " +  text3;

	wishlist.innerHTML += '<li' + ' ' + "id='" + lastid + "' " + "onClick=" + "removeName(" + "'" + lastid + "') "  + '>' + textTotal + '</li>';

  wishlist4.innerHTML += "<div id='test" + lastid + "' class='draggable'>" + text1 + "</div>";

  localStorage.setItem("tabelaContent4", wishlist4.innerHTML);

	/* "onClick='removeName(" + "'item" + lastid + ")''" */

	document.getElementById('AddTask').value='';
	document.getElementById('Priority').value='';
	document.getElementById('EstTime').value='';

	localStorage.setItem("tabelaContent", wishlist.innerHTML);

	

	var item = document.getElementById(lastid);
	item.setAttribute('class', 'dropzone');
	item.setAttribute('draggable', 'true');
	var clone = item.cloneNode(true);

 	list3.appendChild(clone);
	clone.setAttribute('onClick','nothing');
	clone.setAttribute('class', 'dropzone');
	clone.setAttribute('draggable', 'true');
	clone.setAttribute('id', lastid+'clone')

	localStorage.setItem("tabelaContent3", wishlist3.innerHTML);

	lastid += 1;
}

document.getElementById("clear").onclick = function() {


	window.localStorage.clear();
	window.location.reload();

}

let dragged;
let id;
let index;
let indexDrop;
let list;

document.addEventListener("dragstart", ({target}) => {
  dragged = target;
  id = target.id;
  list = target.parentNode.children;
  for(let i = 0; i < list.length; i += 1) {
  	if(list[i] === dragged){
      index = i;
    }
  }
});

document.addEventListener("dragover", (event) => {
  event.preventDefault();
});

document.addEventListener("drop", ({target}) => {
if(target.className == "dropzone" && target.id !== id) {
   dragged.remove( dragged );
  for(let i = 0; i < list.length; i += 1) {
  	if(list[i] === target){
      indexDrop = i;
    }
  }
  console.log(index, indexDrop);
  if(index > indexDrop) {
  	target.before( dragged );
  } else {
   target.after( dragged );
  }
}
});

// Check for saved wishlist items
var saved = localStorage.getItem('tabelaContent');
var saved2 = localStorage.getItem('tabelaContent2');
var saved3 = localStorage.getItem('tabelaContent3');
var saved4 = localStorage.getItem('tabelaContent4');

// If there are any saved items, update our list
if (saved || saved2 || saved3 || saved4) {
	wishlist.innerHTML = saved;
	wishlist2.innerHTML = saved2;
  wishlist4.innerHTML = saved4;
	//wishlist3.innerHTML = saved3;

}


function removeName(itemid) {
	var item = document.getElementById(itemid);
	var item2 = document.getElementById(itemid+'clone');
	
	
	list2.appendChild(item);
  item.setAttribute('id', 'tester'+itemid)
	item.setAttribute('onClick','removeName2(' + itemid + ')');
	item.setAttribute('class', 'dropzone');

	list3.removeChild(item2);


	localStorage.setItem("tabelaContent", wishlist.innerHTML);
	localStorage.setItem("tabelaContent2", wishlist2.innerHTML);

    // list.removeChild(item);
}

function removeName2(itemid) {
  var outerCont = document.getElementById(container);
	var item = document.getElementById('tester' + itemid);
  var item2 = document.getElementById("test" + itemid);

	list2.removeChild(item)

  container.removeChild(item2);




}

// Enter == Add button
var ATask = document.getElementById("AddTask");

ATask.addEventListener("keyup", function(event) {
	if (event.keyCode === 13) {
		var form = event.target.form;
	    var index = Array.prototype.indexOf.call(form, event.target);
	    form.elements[index + 1].focus();
	    event.preventDefault();

	}

});

var Priority = document.getElementById("Priority");

Priority.addEventListener("keyup", function(event) {
	if (event.keyCode === 13) {
		var form = event.target.form;
	    var index = Array.prototype.indexOf.call(form, event.target);
	    form.elements[index + 1].focus();
	    event.preventDefault();

	}

});

var EstTime = document.getElementById("EstTime");

EstTime.addEventListener("keyup", function(event) {
	if (event.keyCode === 13) {
		 event.preventDefault();
	   document.getElementById("add").click();
	 }

});

var tabelaContent; 

tabelaContent = document.getElementById("list").innerHTML
localStorage.setItem("tabelaContent",tabelaContent);


//var dragItem2 = document.querySelector("#item2");

interact('.draggable')
  .resizable({
      // resize from all edges and corners
      edges: { left: false, right: false, bottom: true, top: false },

      listeners: {
        move (event) {
          var target = event.target
          var x = (parseFloat(target.getAttribute('data-x')) || 0)
          var y = (parseFloat(target.getAttribute('data-y')) || 0)

          // update the element's style
          target.style.width = event.rect.width + 'px'
          target.style.height = event.rect.height + 'px'

          // translate when resizing from top or left edges
          x += event.deltaRect.left
          y += event.deltaRect.top

          target.style.webkitTransform = target.style.transform =
            'translate(' + x + 'px,' + y + 'px)'

          target.setAttribute('data-x', x)
          target.setAttribute('data-y', y)
          
        }
      },
      modifiers: [
        
        // keep the edges inside the parent
        interact.modifiers.restrictEdges({
          outer: 'parent'
        }),

        // minimum size
        interact.modifiers.restrictSize({
          min: { width: 100, height: 50 }
        })
      ],

      inertia: true
    })
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    modifiers: [
      interact.modifiers.snap({
          targets: [
            interact.createSnapGrid({ x: 30, y: 30 })
          ],
          range: Infinity,
          relativePoints: [ { x: 0, y: 0 } ]
        }),
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
      })
    ],
    // enable autoScroll
    autoScroll: true,

    listeners: {
      // call this function on every dragmove event
      move: dragMoveListener,

      // call this function on every dragend event
      end (event) {
        var textEl = event.target.querySelector('p')

        textEl && (textEl.textContent =
          'moved a distance of ' +
          (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                     Math.pow(event.pageY - event.y0, 2) | 0))
            .toFixed(2) + 'px')
      }
    }
  })


function dragMoveListener (event) {
  var target = event.target
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

  // translate the element
  target.style.webkitTransform =
    target.style.transform =
      'translate(' + 0 + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
}

// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener