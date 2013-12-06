(function($) {
	// object declarations go here
	var InvoiceItemModel = Backbone.Model.extend({
		// set default values:
		defaults: {
			price: 0,
			quantity: 0
		},

		// calculate the amount
		calculateAmount: function() {
			return this.get('price') * this.get('quantity');
		}
	});

	var PreviewInvoiceItemView = Backbone.View.extend({
		// Define template using templating engine from Underscore.js
		template: _.template('\
			Price: <%= price %>.\
			Quantity: <%= quantity %>.\
			Amount: <%= amount %>.\
			'),

		render: function() {
			// Generate HTML by rendering the template
			var html = this.template({
				// Pass model properties to the template
				price: this.model.get('price'),
				quantity: this.model.get('quantity'),

				// Calculate amount and pass it to template
				amount: this.model.calculateAmount()	
			});

			// set HTML for the view element using jQuery
			$(this.el).html(html);
		}
	});

	var InvoiceListView = Backbone.View.extend({
		render: function() {
			$(this.el).html('Displaying stuff.');
		}
	});

	var InvoicePageView = Backbone.View.extend({
		render: function() {
			$(this.el).html('Displaying invoice #' + this.id + '.');
		}
	});

	var Workspace = Backbone.Router.extend({
		routes: {
			// default path
			'': 'invoiceList',

			// Usage of static path.
			'invoice': 'invoiceList',

			// usage of fragment parameter
			'invoice/:id': 'invoicePage',
		},

		invoiceList : function() {
			var invoiceListView = new invoiceListView({
				el: 'body'
			});
			invoiceListView.render();
		},

		invoicePage: function(id) {
			var invoicePageView = new InvoicePageView({
				el: 'body',
				id: id
			});
			invoicePageView.render();
		},
	});

///////////////////
///		MAIN	///
///////////////////

	$(document).ready(function() {
		
		// Start application goes here
		// Create the InvoiceItemModel instance and set attributes
		var invoiceItemModel = new InvoiceItemModel({
			price: 2,
			quantity: 3
		});

		// Create PreviewInvoiceItemView instance:
		var previewInvoiceItemView = new PreviewInvoiceItemView({
			// Pass our model
			model: invoiceItemModel,
			// set element where to render html
			el: 'body'
		});

		//render view manually
		previewInvoiceItemView.render();

		new Workspace();
		Backbone.history.start();

	});
})(jQuery);