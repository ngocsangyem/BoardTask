var data = {
	status: 'danger'
}


let indexApp = {
	listIdShortTable: {
		taskTask: {
			group: {
				name: 'sang',
				// put: false,
			},
			chosenClass: 'sortable-chosen',
			animation: 500,
			ghostClass: 'sortable-ghost',
			chosenClass: 'sortable-chosen',
			onStart: () => {
				console.log('Start drag');
			},
			onEnd: () => {
				console.log('End Drag');
			}
			// handle: '.my-handle',
			// filter: '.block__item--normal'
		},
		taskProgress: {
			group: {
				name: 'sang'
			},
			animation: 500,
		},
		taskFinish: {
			group: {
				name: 'sang',
				// pull: false
			},
			animation: 500,
		}
	},
	templates: (e) => {
		return `<div class="block__item block__item--${data.status}">
		<div class="block__line"></div>
		<div class="block__content block__content--hasfile">
			<div class="block__note">
				<div class="block__title"><a href="#">
						<h3>K-DB-5: <span>Oke</span></h3>
					</a></div>
				<div class="block__des">Lorem</div>
			</div>
			<div class="block__action">
				<div class="block__file"><a href="#">Xem file</a></div>
				<div class="block__btn--collapse"><button type="button"><i class="mdi mdi-chevron-down"></i></button></div>
				<div class="block__btn--moveTask"><button type="button"><i class="mdi mdi-chevron-right"></i></button></div>
			</div>
		</div>
		<div class="block__collapse">
			<div class="block__detail">
				<hr>
				<div class="row">
					<div class="col"><i class="mdi mdi-briefcase"></i>Chua xac dinh</div>
					<div class="col-auto"><span>3h</span></div>
					<div class="col-auto"><span>Chua xac dinh</span></div>
				</div>
				<hr>
			</div>
			<div class="block__create">
				<div class="row">
					<div class="col"><i class="mdi mdi-account"></i><a href="#">Ngoc Sang</a></div>
					<div class="col-auto"><span class="creat__day">6 months ago</span></div>
				</div>
				<hr>
				<div class="row">
					<div class="col"><i class="mdi mdi-pen"></i><a href="#">Anh dao</a></div>
					<div class="col-auto"><span class="creat__day">6 months ago</span></div>
				</div>
			</div>
		</div>
	</div>`
	}
	,
	creatLists: () => {
		let tmp = []
		for (let key in data) {
			if (data.hasOwnProperty(key)) {
				let element = data[key];
				tmp.push(indexApp.templates(element))
			}
		}
		return tmp;
	},
	shortTable: (id, opt) => {
		let el = document.getElementById(id)
		let sortable = new Sortable(el, opt)
	},
	initShortTable: () => {
		for (let key in indexApp.listIdShortTable) {
			indexApp.shortTable(key, indexApp.listIdShortTable[key])
			let el = document.getElementById(key)
			el.innerHTML += indexApp.creatLists()
			// console.log(el);
		}

	}
}






indexApp.initShortTable();













// Can not use Array.forEach
