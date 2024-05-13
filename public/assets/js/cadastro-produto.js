app.controller("CreateProductController", ($scope, $http, SessionService) => {
  $scope.img = "";
  $scope.name = "";
  $scope.price = "R$ 0,00";

  $scope.formatPrice = () => {
    const price = Number($scope.price.replace(/\D/g, "")).toString();
    let priceStr = price.padStart(3, "0");
    const priceArr = priceStr.split("");
    priceArr.splice(priceArr.length - 2, 0, ",");
    $scope.price = "R$ " + priceArr.join("");
  };

  $scope.addProduct = () => {
    $scope.loading = true;
    $http
      .post(
        "http://localhost:3333/api/products/",
        {
          img: $scope.img,
          name: $scope.name,
          price: Number($scope.price.replace(/(?!,)\D/g, "").replace(",", ".")),
        },
        {
          headers: {
            Authorization: `Bearer ${SessionService.getToken()}`,
          },
        }
      )
      .then(() => {
        $scope.loading = false;
        location.href = "/produtos-cadastrados.html";
      });
  };

  SessionService.verifyLogin();
  SessionService.createVerifyLoginInterval();
  $scope.logout = SessionService.logout;
});
