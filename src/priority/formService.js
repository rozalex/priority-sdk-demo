import * as priority from 'priority-web-sdk';

let _formInstance;
// let priority;

class FormService {	
	async getOrder(orderId) {
		// const priorityImport = await import('priority-web-sdk');
		// priority = priorityImport;

		console.log(" => priority.formStart('ORDERS', this.onError, this.onSuccess, '', 1)");
		const form = await priority.formStart('ORDERS', this.onError, this.onSuccess, '', 1);
		console.log(" <= ", form);

		_formInstance = form;
				window.myform = form;

		const filters = this.getFilters(orderId);
		form.setSearchFilter(filters);

		console.log(" => form.getRows(1)");
		const rows = form.getRows(1);

		console.log(" <= ", await rows);

		return rows;
	}

	async getSummaryFile() {

		console.log(" => _formInstance.activateStart('WWWSHOWORDER', 'P', null)");
		const procedure = await _formInstance.activateStart('WWWSHOWORDER', 'P', null);
		console.log(" <= ", procedure);

		console.log(" => procedure.proc.documentOptions(1, -4, 1)");
		const nextStep = await procedure.proc.documentOptions(1, -4, 1);
		console.log(" <= ", nextStep);


		return nextStep.Urls[0].url;
	}

	async getOrderItems() {
		console.log(" => _formInstance.startSubForm('ORDERITEMS')");
		const subform = await _formInstance.startSubForm("ORDERITEMS");
		console.log(" <= ", subform);
	}

	getFilters(orderId) {
		const filter = {
			or: 0,
			ignorecase: 1,
			QueryValues: [
				{
					field: 'ORDNAME',
					fromval: orderId,
					toval: '',
					op: '=',
					sort: 0,
					isdesc: 0
				}
			]
		};

		return filter;
	}

	endForm() {
		_formInstance.endCurrentForm();
	}

	onError() {
		console.log('error');
	}

	onSuccess() {
		console.log('success');
	}
}

export default new FormService();
