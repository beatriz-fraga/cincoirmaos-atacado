app.controller("EditProductController", ($scope, $http, SessionService) => {
  $scope.img = "";
  $scope.name = "";
  $scope.price = "";

  $scope.formatPrice = () => {
    const price = Number($scope.price.replace(/\D/g, "")).toString();
    let priceStr = price.padStart(3, "0");
    const priceArr = priceStr.split("");
    priceArr.splice(priceArr.length - 2, 0, ",");
    $scope.price = "R$ " + priceArr.join("");
  };

  $scope.getProduct = () => {
    const id = new URLSearchParams(location.search).get("productId");
    $http
      .get("http://localhost:3333/api/products/" + id, {
        headers: {
          Authorization: `Bearer ${SessionService.getToken()}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        $scope.img = response.data.img;
        $scope.name = response.data.name;
        $scope.price = response.data.price.toFixed(2);
        $scope.formatPrice();
      });
  };

  $scope.updateProduct = () => {
    const id = new URLSearchParams(location.search).get("productId");
    $http
      .patch(
        "http://localhost:3333/api/products/" + id,
        {
          name: $scope.name,
          price: Number($scope.price.replace(/(?!,)\D/g, "").replace(",", ".")),
          img: $scope.img,
        },
        {
          headers: {
            Authorization: `Bearer ${SessionService.getToken()}`,
          },
        }
      )
      .then(() => {
        location.href = "/produtos-cadastrados.html";
      });
  };
  $scope.getProduct();
});
