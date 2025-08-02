(function(){
    angular
    .module('users',['FBAngular'])
    .controller('UserController', [
        '$mdSidenav', '$mdBottomSheet', '$log', '$q','$scope','$element','Fullscreen','$mdToast','$animate',
        UserController
    ]);
    /**
    * Main Controller for the Angular Material Starter App
    * @param $scope
    * @param $mdSidenav
    * @param avatarsService
    * @constructor
    */
    function UserController( $mdSidenav, $mdBottomSheet, $log, $q, $scope, $element, Fullscreen, $mdToast, $animate, $translate, dialogs) {
        $scope.toastPosition = {
            bottom: true,
            top: false,
            left: true,
            right: false
        };
        $scope.toggleSidenav = function(ev) {
            $mdSidenav('right').toggle();
        };
        $scope.getToastPosition = function() {
            return Object.keys($scope.toastPosition)
            .filter(function(pos) { return $scope.toastPosition[pos]; })
            .join(' ');
        };
        $scope.showActionToast = function() {        
            var toast = $mdToast.simple()
            .content(help_array[0])
            .action(help_array[7])
            .hideDelay(15000)
            .highlightAction(false)
            .position($scope.getToastPosition());
        
            var toast1 = $mdToast.simple()
            .content(help_array[1])
            .action(help_array[7])
            .hideDelay(15000)
            .highlightAction(false)
            .position($scope.getToastPosition());
		  
            var toast2 = $mdToast.simple()
            .content(help_array[2])
            .action(help_array[7])
            .hideDelay(15000)
            .highlightAction(false)
            .position($scope.getToastPosition());
            
            var toast3 = $mdToast.simple()
            .content(help_array[3])
            .action(help_array[7])
            .hideDelay(15000)
            .highlightAction(false)
            .position($scope.getToastPosition());
            
            var toast4 = $mdToast.simple()
            .content(help_array[4])
            .action(help_array[7])
            .hideDelay(15000)
            .highlightAction(false)
            .position($scope.getToastPosition());            

            var toast5 = $mdToast.simple()
            .content(help_array[5])
            .action(help_array[7])
            .hideDelay(15000)
            .highlightAction(false)
            .position($scope.getToastPosition());

            var toast6 = $mdToast.simple()
            .content(help_array[6])
            .action(help_array[8])
            .hideDelay(15000)
            .highlightAction(false)
            .position($scope.getToastPosition());


            $mdToast.show(toast).then(function() {
                $mdToast.show(toast1).then(function() {
                    $mdToast.show(toast2).then(function() {
                        $mdToast.show(toast3).then(function() {
                            $mdToast.show(toast4).then(function() {
                                $mdToast.show(toast5).then(function() {
                                    $mdToast.show(toast6).then(function() {
                                    });
                                });
			 				});
			  			});
			  		});
			  	});
            });		
        };
		var self = this;
		self.selected     = null;
		self.users        = [ ];
		self.toggleList   = toggleUsersList;

		$scope.showVariables = false; /** I hides the 'Variables' tab */
		$scope.isActive = true;
		$scope.isActive1 = true; 
	
		$scope.goFullscreen = function () {
			/** Full screen */
			if (Fullscreen.isEnabled())
				Fullscreen.cancel();
			else
				Fullscreen.all();
		};
	
		$scope.toggle = function () {
			$scope.showValue=!$scope.showValue;
			$scope.isActive = !$scope.isActive;
		};  
	
		$scope.toggle1 = function () {
			$scope.showVariables=!$scope.showVariables;
			$scope.isActive1 = !$scope.isActive1;
		};
		
		/** Change event function of the check box show direction */
        $scope.showDirection = function() {
            showDirection($scope); /** Function defined in experiment.js file */
        }
		
		
		/** Function for changing the radio buttons for toggle the side/top views */
		$scope.sideTopViewsToggle = function() {
			sideTopViewsToggleFn($scope); /** Function defined in experiment.js file */
		}
		
		/** Change event function of temperature slider */
		$scope.changeTemperature = function() {
			changeTempExpmt($scope);
		}
		
		/** Change event function of refractor slider */
		$scope.changeRefractor = function() {
			changeRefractorExpmnt($scope);
		}
		
		
		/** Change event function of liquid sample dropdown */
		$scope.changeLiquidSample = function() {
			liquidExperiment($scope);
		}
		
		/** Change event function of Light Source dropdown */
		$scope.changeLightSource = function() {
			lightExperiment($scope);
		}
		/** Change event function of reset button */
		$scope.reset = function() {	
			$mdToast.cancel();
			resetExperiment($scope);
		}		
		
		/** Event function of switchOn button */
		$scope.switchOn = function() {	
			switchOnLight($scope);
		}
		
		/** Change event function of the check box Show result */
        $scope.showResult = function() {
            showResult($scope); /** Function defined in experiment.js file */
			calculate_polarisability($scope);
        }
		
		/**
		* First hide the bottom sheet IF visible, then
		* hide or Show the 'left' sideNav area
		*/
		function toggleUsersList() {
			$mdSidenav('right').toggle();
		}
	}
})();