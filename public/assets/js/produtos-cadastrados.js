app.controller(
  "RegisteredProductsController",
  ($scope, $http, AdminService, SessionService) => {
    $scope.products = [];

    $scope.getAllProducts = () => {
      $http.get("http://localhost:3333/api/products").then((response) => {
        $scope.products = response.data;
      });
    };

    $scope.deleteProduct = (id) => {
      $http
        .delete("http://localhost:3333/api/products/" + id, {
          headers: {
            Authorization: "Bearer" + SessionService.getToken(),
          },
        })
        .then(() => {
          $scope.getAllProducts();
        });
    };

    $scope.logout = SessionService.logout;

    SessionService.verifyLogin();
    AdminService.verifyAdmin();
    $scope.getAllProducts();
  }
);
