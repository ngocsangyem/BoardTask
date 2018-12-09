let indexApp = {
	toolTips: () => {
		$('[data-toggle="tooltip"]').tooltip()
	},
	listId: [{
		taskTask: {
			group: {
				name: 'sang',
				put: false,
			},
			chosenClass: 'sortable-chosen'
		},
		taskProgress: {
			group: {
				name: 'sang'
			}
		},
		taskFinish: {
			group: {
				name: 'sang',
				pull: false
			}
		}
	},
	{
		taskTask2: {
			group: {
				name: 'sang',
				put: false,
			},
			chosenClass: 'sortable-chosen'
		},
		taskProgress3: {
			group: {
				name: 'sang'
			}
		},
		taskFinish4: {
			group: {
				name: 'sang',
				pull: false
			}
		}
	}],
	shortTable: (id, opt) => {
		let el = document.getElementById(id)
		let sortable = new Sortable(el, opt)
	},
	init: function () {
		for (let index = 0; index < indexApp.listId.length; index++) {
			console.log(indexApp.listId.length);
			for (let key in indexApp.listId[index]) {
				console.log(indexApp.listId[0][key]);
				// indexApp.shortTable(key , indexApp.listId[0][key])
			}
		}

	}
}






indexApp.init();


(function (funcName, baseObj) {
	// The public function name defaults to window.docReady
	// but you can pass in your own object and own function name and those will be used
	// if you want to put them in a different namespace
	funcName = funcName || "docReady";
	baseObj = baseObj || window;
	var readyList = [];
	var readyFired = false;
	var readyEventHandlersInstalled = false;

	// call this when the document is ready
	// this function protects itself against being called more than once
	function ready() {
		if (!readyFired) {
			// this must be set to true before we start calling callbacks
			readyFired = true;
			for (var i = 0; i < readyList.length; i++) {
				// if a callback here happens to add new ready handlers,
				// the docReady() function will see that it already fired
				// and will schedule the callback to run right after
				// this event loop finishes so all handlers will still execute
				// in order and no new ones will be added to the readyList
				// while we are processing the list
				readyList[i].fn.call(window, readyList[i].ctx);
			}
			// allow any closures held by these functions to free
			readyList = [];
		}
	}

	function readyStateChange() {
		if (document.readyState === "complete") {
			ready();
		}
	}

	// This is the one public interface
	// docReady(fn, context);
	// the context argument is optional - if present, it will be passed
	// as an argument to the callback
	baseObj[funcName] = function (callback, context) {
		if (typeof callback !== "function") {
			throw new TypeError("callback for docReady(fn) must be a function");
		}
		// if ready has already fired, then just schedule the callback
		// to fire asynchronously, but right away
		if (readyFired) {
			setTimeout(function () {
				callback(context);
			}, 1);
			return;
		} else {
			// add the function and context to the list
			readyList.push({
				fn: callback,
				ctx: context
			});
		}
		// if document already ready to go, schedule the ready function to run
		if (document.readyState === "complete") {
			setTimeout(ready, 1);
		} else if (!readyEventHandlersInstalled) {
			// otherwise if we don't have event handlers installed, install them
			if (document.addEventListener) {
				// first choice is DOMContentLoaded event
				document.addEventListener("DOMContentLoaded", ready, false);
				// backup is window load event
				window.addEventListener("load", ready, false);
			} else {
				// must be IE
				document.attachEvent("onreadystatechange", readyStateChange);
				window.attachEvent("onload", ready);
			}
			readyEventHandlersInstalled = true;
		}
	}
})("docReady", window);





docReady(function () {
	console.log('oke');
	// Tooltips Initialization
	toolTopInstall();
	// Collapse Task Board
	// collapseTaskBoard();
	// Wave efect
	Waves.attach('.card__header', ['waves-light']);
	// Short Table
	// shortTableJs()
});




function collapseTaskBoard() {
	let btnCollapse = document.querySelector('.block__btn--collapse button')
	let boardCollapses = document.getElementsByClassName('block__collapse')
	let state = 0
	boardCollapses.forEach(btnCollapse => {
		btnCollapse.onclick = function () {
			boardCollapse.classList.toggle('block__collapse--show')
			console.log(boardCollapse.offsetParent);

		}
	});

}

function toolTopInstall() {
	$('[data-toggle="tooltip"]').tooltip()
}

function shortTableJs() {
	let el = document.getElementById('taskTask')
	let el2 = document.getElementById('taskProgress')
	let el3 = document.getElementById('taskFinish')

	let sortable = new Sortable(el, {
		group: {
			name: 'sang',
			pull: true,
			put: false
		},
		chosenClass: 'sortable-chosen',
		sort: true,
		// delay: 3000,
		// touchStartThreshold: 2
	})
	let sortable2 = new Sortable(el2, {
		group: {
			name: 'sang',
			pull: true
		},
		chosenClass: 'sortable-chosen',
		sort: true
	})
	let sortable3 = new Sortable(el3, {
		group: {
			name: 'sang',
			pull: false
		},
		chosenClass: 'sortable-chosen',
		sort: true
	})

}





// Can not use Array.forEach
