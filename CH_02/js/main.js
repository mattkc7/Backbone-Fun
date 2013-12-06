(function($) {
	// object declarations go here
	var BuyerModel = Backbone.Model.extend({
		mutators: {
			//introduce virtual attribute:
			fullName: {
				get: function() {
					return this.firstName + ' ' + this.lastName;
				},

				set: function (key, value, options, set) {
					var names = value.split(' ');
					this.set('firstName', names[0], options);
					this.set('lastName', names[1], options);
				}
			},

			vip: {
				get: function() {
					return this.vip === true ? 'VIP' : 'Regular';
				},

				set: function (key, value, options, set) {
					set(key, value === 'VIP', options);
				}
			}
		}
	});


///////////////////
///		MAIN	///
///////////////////

	$(document).ready(function() {
		
		// Start application goes herE

		// example use of mutators - chapter 2:
		var buyerModel = new BuyerModel();
		buyerModel.set({
			firstName: 'Matthew',
			lastName: 'Chan'
		});

		buyerModel.get('fullName');
		buyerModel.get('firstName');
		buyerModel.get('lastName');

		var buyerModel2 = new BuyerModel();
		buyerModel2.set('fullName', 'Carl Louis');
		buyerModel2.get('fullName');
		buyerModel2.get('firstName');
		buyerModel2.get('lastName');
		
		var buyerModel3 = new BuyerModel();
		buyerModel3.set({
			fullName: 'Mister X',
			vip: 'VIP'
		});

		buyerModel3.get('VIP'); // VIP
		buyerModel3.attributes.vip; // true

		buyerModel3.bind('mutators:set:fullName',
			function (a, b, c, d) {
				console.log('mutators:set:fullName triggered');
		});

		buyerModel3.set({
			fullName: 'Mister Y'
		});

	});
})(jQuery);