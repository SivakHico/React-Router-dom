const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const cors = require("cors");
const app = express();
const port = 9000;
const { uuid } = require("uuidv4");

// setup middleware
app.use(bodyParser.json());
app.use(cors());

//
var _dishes = [
  {
    _id: "1",
    name: "Tomato Soup",
    description:
      "Lorem ipsum is a placeholder text commonly used to demonstrate the visual",
    category: "Starter",
    availableOn: "dinner",
    activate: true,
    price: "49.99",
    estimate: "10",
  },
  {
    _id: "2",
    name: "Ice Cream",
    description:
      "Lorem ipsum is a placeholder text commonly used to demonstrate the visual",
    category: "Desserts",
    availableOn: "Weekdays",
    activate: true,
    price: "4.99",
    estimate: "1",
  },
  {
    _id: "3",
    name: "Chicken Salad",
    description:
      "Lorem ipsum is a placeholder text commonly used to demonstrate the visual",
    category: "Salads",
    availableOn: "Lunch",
    activate: true,
    price: "79",
    estimate: "20",
  },
];

// get dishes
router.get("/dishes", (req, res) => {
  res.json({
    status: "OK",
    data: _dishes,
  });
  console.log(data);
});

// clear dishes
router.get("/dishes/clear", (req, res) => {
  _dishes = [];

  res.json({
    status: "OK",
  });
});

// get dish by id
router.get("/dishes/:_id", (req, res) => {
  const dish = _dishes.find((x) => x._id === req.params._id);

  res.json({
    status: "OK",
    data: dish ? dish : null,
  });
});

// insert/update dish
router.put("/dishes", (req, res) => {
  if (req.body == null) {
    res.json({
      status: "Failed",
      message: "No content provided",
    });
  } else {
    let dish = req.body,
      status = "OK";

    if (!dish._id) {
      //
      dish._id = uuid();
      dish._Created = new Date();
      dish._Changed = null;

      //
      _dishes.push(dish);
    } else {
      //
      const dishIndex = _dishes.findIndex((x) => x._id === dish._id);

      //
      if (dishIndex >= 0) {
        //
        dish._Changed = new Date();

        //
        _dishes[dishIndex] = dish;
      } else {
        //
        status = `dish not found for _id ${dish._id}`;
      }
    }

    res.json({
      status: status,
      data: dish,
    });
  }
});

// delete dish
router.delete("/dishes/:_id", (req, res) => {
  let dishIndex = _dishes.findIndex((x) => x._id === req.params._id);

  if (dishIndex !== -1) {
    _dishes.splice(dishIndex, 1);
  }

  res.json({
    status: "OK",
    message: dishIndex !== -1 ? "Dish deleted" : "Dish not found",
  });
});

//
app.use(router);

//
app.listen(port, () => {
  console.log(`api is ready on http://localhost:${port}`);
});
