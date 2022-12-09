var express = require("express");
var app = express();
var cors = require("cors");
var bodyParser = require("body-parser");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const { db } = require("./config/admin");

app.use(cors());
var port = 3000;
app.listen(port, function () {
  console.log("Server is running..." + port);
});
//thêm search

//Ds cửa hàng
app.get("/api/get/Brand", async (req, res) => {
  // call firebase
  const courseRef = db.collection("Brand");

  try {
    courseRef.get().then((snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log(items);
      return res.status(201).json(items);
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

//lấy sản menu từ id của hàng
app.get("/api/get/Brand/:id/Menu", async (req, res) => {
  // call firebase
  const ID = req.params.id;
  const courseRef = db.collection("Brand").doc(ID).collection("Menu");
  try {
    courseRef.get().then((snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log(items);
      return res.status(201).json(items);
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});
//end lấy sản menu từ id của hàng
app.post("/api/post/Brand", async (req, res) => {
  try {
    const {
      Address,
      IMG,
      UpdateDate,
      UpdateBy,
      Status,
      Rating,
      Name,
      Description,
      Type,
      Email,
      CreateBy,
      CreateDate,
    } = req.body;
    const item = {
      Address: Address,
      IMG: IMG,
      UpdateDate: UpdateDate,
      Status: Status,
      Rating: Rating,
      CreateBy: CreateBy,
      Name: Name,
      Description: Description,
      UpdateBy: UpdateBy,
      Type: Type,
      Email: Email,
      CreateDate: CreateDate,
    };
    await db.collection("Brand").add(item);

    console.log("add", item);
    res.status(200).send({
      status: "success",
      message: "entry added successfully",
      data: item,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.delete("/api/delete-Brand/:id", async (req, res) => {
  const id = req.params.id;
  const {
    Name,
    UpdateBy,
    Status,
    Description,
    UpdateDate,
    CreateBy,
    CreateDate,
    Type,
    IMG,
  } = req.body;
  try {
    const item = {
      Name: Name,
      UpdateBy: UpdateBy,
      Status: Status,
      Description: Description,
      UpdateDate: UpdateDate,
      CreateBy: CreateBy,
      CreateDate: CreateDate,
      Type: Type,
      IMG: IMG,
    };
    await db.collection("Brand").doc(id).delete(item);
    console.log("Delete", id);
    res.status(200).send({
      status: "Delete success",
      message: "Delete successfully",
      data: item,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.put("/api/Update-Brand/:id", async (req, res) => {
  const id = req.params.id;
  delete req.body.id;
  const { Name, UpdateBy, Status, IMG, Description, CreateBy, Address } =
    req.body;
  try {
    const item = {
      Name: Name,
      UpdateBy: UpdateBy,
      Status: Status,
      Description: Description,
      CreateBy: CreateBy,
      IMG: IMG,
      Address: Address,
    };
    await db.collection("Brand").doc(id).update(item);
    console.log("Update", id);
    res.status(200).send({
      status: "Update success",
      message: "Update successfully",
      data: item,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});
//end Brand

//Contact
app.get("/api/get/Contact", async (req, res) => {
  // call firebase
  const courseRef = db.collection("Contact");

  try {
    courseRef.get().then((snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log(items);
      return res.status(201).json(items);
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

app.post("/api/create-Contact", async (req, res) => {
  const { Name, Email, Phone, Address, Status } = req.body;
  try {
    const course = db.collection("Contact").doc();
    const item = {
      Name: Name,
      Email: Email,
      Phone: Phone,
      Address: Address,
      Status: Status,
    };
    await course.set(item);
    console.log("add", item);
    res.status(200).send({
      status: "success",
      message: "entry added successfully",
      data: item,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.delete("/api/delete-Contact/:id", async (req, res) => {
  const id = req.params.id;
  const { Name, Email, Phone, Address, Status } = req.body;
  try {
    const item = {
      Name: Name,
      Email: Email,
      Phone: Phone,
      Address: Address,
      Status: Status,
    };
    await db.collection("Contact").doc(id).delete(item);
    console.log("Delete", id);
    res.status(200).send({
      status: "Delete success",
      message: "Delete successfully",
      data: item,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.put("/api/Update-Contact/:id", async (req, res) => {
  const id = req.body.id;
  delete req.body.id;
  try {
    await db.collection("Contact").doc(id).update(req.body);
    console.log("Update", id);
    res.status(200).send({
      status: "Update success",
      message: "Update successfully",
      data: id,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//end contact

//nhà cung cấp
app.get("/api/get/Supplier", async (req, res) => {
  // call firebase
  const courseRef = db.collection("Supplier");
  try {
    courseRef.get().then((snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(items);
      return res.status(201).json(items);
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

app.post("/api/add-Supplier", async (req, res) => {
  const { Email, Address, BrandID, Price, Status, ConfirmedBy, CreateDay } =
    req.body;
  try {
    const course = db.collection("Supplier").doc();
    const item = {
      BrandID: BrandID,
      Email: Email,
      Address: Address,
      Price: Price,
      Status: Status,
      ConfirmedBy: ConfirmedBy,
      CreateDay: CreateDay,
    };
    await course.set(item);
    console.log("add", item);
    res.status(200).send({
      status: "success",
      message: "entry added successfully",
      data: item,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.delete("/api/delete-Supplier/:id", async (req, res) => {
  const id = req.body.id;
  try {
    await db.collection("Supplier").doc(id).delete();
    console.log("Delete", id);
    res.status(200).send({
      status: "Delete success",
      message: "Delete successfully",
      data: id,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.put("/api/Update-Supplier/:id", async (req, res) => {
  const id = req.body.id;
  delete req.body.id;
  try {
    await db.collection("Supplier").doc(id).update(req.body);
    console.log("Update", id);
    res.status(200).send({
      status: "Update success",
      message: "Update successfully",
      data: id,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});
//end nhà cung cấp

//mã giảm giá

app.get("/api/get/Discount", async (req, res) => {
  // call firebase
  const courseRef = db.collection("Discount");

  try {
    courseRef.get().then((snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log(items);
      return res.status(201).json(items);
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

app.get("/api/get/Blog", async (req, res) => {
  // call firebase
  const courseRef = db.collection("Blog");

  try {
    courseRef.get().then((snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log(items);
      return res.status(201).json(items);
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});
app.post("/api/CreateDiscount", async (req, res) => {
  const { Name, IMG, Discount } = req.body;
  try {
    const course = db.collection("Discount").doc();
    const item = {
      Name: Name,
      IMG: IMG,
      Discount: Discount,
    };
    await course.set(item);
    console.log("add", item);
    res.status(200).send({
      status: "success",
      message: "entry added successfully",
      data: item,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.put("/api/UpdateDiscount/:id", async (req, res) => {
  const id = req.params.id;
  delete req.body.id;
  const { Name, IMG, Discount } = req.body;
  try {
    const item = {
      Name: Name,
      IMG: IMG,
      Discount: Discount,
    };
    await db.collection("Discount").doc(id).update(item);
    console.log("Update", id);
    res.status(200).send({
      status: "Update success",
      message: "Update successfully",
      data: item,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});
app.delete("/api/delete-Discount/:id", async (req, res) => {
  const id = req.params.id;
  const { Name, IMG, Discount } = req.body;
  try {
    const item = {
      Name: Name,
      IMG: IMG,
      Discount: Discount,
    };
    await db.collection("Discount").doc(id).delete(item);
    console.log("Delete", id);
    res.status(200).send({
      status: "Delete success",
      message: "Delete successfully",
      data: item,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});
//end mã giảm

//thông tin hóa đơn
app.get("/api/get/Brand/:id/Invoice", async (req, res) => {
  // call firebase
  const ID = req.params.id;
  const courseRef = db.collection("Brand").doc(ID).collection("InvoiceDish");
  try {
    courseRef.get().then((snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log(items);
      return res.status(201).json(items);
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});
//thêm hóa đơn
app.post("/api/Invoice/InvoiceBrand/:id", async (req, res) => {
  const { Cart, CreateDate, Email } = req.body;
  const ID = req.params.id;
  try {
    const course = db.collection("Brand").doc(ID).collection("InvoiceDish");
    const item = {
      Cart: Cart,
      CreateDate: CreateDate,
      Email: Email,
    };
    await course.add(item);
    console.log("add", item);
    res.status(200).send({
      status: "success",
      message: "entry added successfully",
      data: item,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//comment quán
app.get("/api/get/Feedback-Brand/:id/FeedbackBrand", async (req, res) => {
  // call firebase
  const ID = req.params.id;
  const courseRef = db.collection("Brand").doc(ID).collection("FeedBackQuan");
  try {
    courseRef.get().then((snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log(items);
      return res.status(201).json(items);
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

app.post("/api/add-FeedbackBrand/FeedBackBrand/:id", async (req, res) => {
  const { Name, Comment, IMG, Rating, CreateBy, CreateDate } = req.body;
  const ID = req.params.id;
  try {
    const course = db.collection("Brand").doc(ID).collection("FeedBackQuan");
    const item = {
      Name: Name,
      Comment: Comment,
      IMG: IMG,
      Rating: Rating,
      CreateBy: CreateBy,
      CreateDate: CreateDate,
    };
    await course.add(item);
    console.log("add", item);
    res.status(200).send({
      status: "success",
      message: "entry added successfully",
      data: item,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//Acoount

app.get("/api/get/Account", async (req, res) => {
  // call firebase
  const courseRef = db.collection("Account");

  try {
    courseRef.get().then((snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log(items);
      return res.status(201).json(items);
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

app.post("/api/dktaikhoan", async (req, res) => {
  const { Name, Address, Password, PhoneNumber, Email, Gender } = req.body;
  const course = db.collection("Account").doc();
  const item = {
    Name: Name,
    Address: Address,
    Password: Password,
    PhoneNumber: PhoneNumber,
    Type: "User",
    Email: Email,
    Gender: Gender,
  };
  try {
    console.log("add", item);
    await course.set(item);
    res.status(200).send({
      status: "success",
      message: "entry added successfully",
      data: item,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});
app.post("/api/taikhoanAdmin", async (req, res) => {
  const { Name, Address, Password, PhoneNumber, Email, Gender, Type } =
    req.body;
  const course = db.collection("Account").doc();
  const item = {
    Name: Name,
    Address: Address,
    Password: Password,
    PhoneNumber: PhoneNumber,
    Type: Type,
    Email: Email,
    Gender: Gender,
  };
  try {
    console.log("add", item);
    await course.set(item);
    res.status(200).send({
      status: "success",
      message: "entry added successfully",
      data: item,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});
app.post("/api/dangnhap", async (req, res) => {
  const { Password, Email } = req.body;
  const course = db.collection("Account").doc();
  const item = {
    Password: Password,
    Email: Email,
  };
  try {
    console.log("add", item);
    await course.get(item);
    res.status(200).send({
      status: "success",
      message: "entry added successfully",
      data: item,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});
app.post("/api/get/Account", async (req, res) => {
  // call firebase
  var Email = req.body.Email;
  var Password = req.body.Password;
  const courseRef = db.collection("Account");

  try {
    const items = {
      Email: Email,
      Password: Password,
    };

    courseRef.get().then((snapshot) => {
      // const index =  snapshot.docs.find((item)=>{item === Password })
      if (snapshot) {
        const account = snapshot.docs.find((item) => {
          item.Password === Password;
        });
        if (account) {
          res.status(200).json("đăng nhập thành công");
        } else {
          res.status(400).json("pass sai");
        }
      } else {
        alert("Invalid username!");
      }
      // const items = snapshot.docs.find((doc) => ({
      //   Password: doc.Password,
      //   ...doc.data(),
      // }));

      console.log(items);
      // return res.status(201).json(items);
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

app.put("/api/Put/:id", async (req, res) => {
  const id = req.params.id;
  const { Name, Address, Password, PhoneNumber, Email, Gender, Type } =
    req.body;
  try {
    const item = {
      Name: Name,
      Address: Address,
      Password: Password,
      PhoneNumber: PhoneNumber,
      Type: Type,
      Email: Email,
      Gender: Gender,
    };
    await db.collection("Account").doc(id).update(item);
    console.log("Update", id);
    res.status(200).send({
      status: "Update success",
      message: "Update successfully",
      data: item,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.delete("/api/deleteAccount/:id", async (req, res) => {
  const id = req.params.id;
  const { Name, Address, Password, PhoneNumber, Email, Gender, Type } =
    req.body;
  try {
    const item = {
      Name: Name,
      Address: Address,
      Password: Password,
      PhoneNumber: PhoneNumber,
      Type: Type,
      Email: Email,
      Gender: Gender,
    };
    await db.collection("Account").doc(id).delete(item);
    console.log("Delete", id);
    res.status(200).send({
      status: "Delete success",
      message: "Delete successfully",
      data: item,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//thêm món menu
app.post("/api/post/Brand/:id/Menu", async (req, res) => {
  const { Description, Name, Status, Price, IMG, Type, Rate } = req.body;
  const id = req.params.id;
  try {
    const course = db.collection("Brand").doc(id).collection("Menu");
    const item = {
      Description: Description,
      Name: Name,
      Status: Status,
      Price: Price,
      IMG: IMG,
      Type: Type,
      Amount: 1,
      FeeShip: 25000,
      Rate: Rate,
    };
    await course.add(item);
    console.log("add", item);
    res.status(200).send({
      status: "success",
      message: "entry added successfully",
      data: item,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.put("/api/putt/Brand/:id/Menu/:code", async (req, res) => {
  const { Description, Name, Status, Price, IMG, Type, Rate, id } = req.body;
  const ID = req.params.id;
  try {
    const item = {
      Description: Description,
      Name: Name,
      Status: Status,
      Price: Price,
      IMG: IMG,
      Type: Type,
      Amount: 1,
      FeeShip: 25000,
      Rate: Rate,
      id: id,
    };
    await db
      .collection("Brand")
      .doc(ID)
      .collection("Menu")
      .doc(req.body.id)
      .update(item);

    console.log("add", item);
    res.status(200).send({
      status: "success",
      message: "entry added successfully",
      data: item,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});
app.delete("/api/Delete/Brand/:id/Menu/:code", async (req, res) => {
  const { Description, Name, Status, Price, IMG, Type, Rate, id } = req.body;
  const ID = req.params.id;
  try {
    const item = {
      Description: Description,
      Name: Name,
      Status: Status,
      Price: Price,
      IMG: IMG,
      Type: Type,
      Amount: 1,
      FeeShip: 25000,
      Rate: Rate,
      id: id,
    };
    await db
      .collection("Brand")
      .doc(ID)
      .collection("Menu")
      .doc(req.body.id)
      .delete(item);

    console.log("add", item);
    res.status(200).send({
      status: "success",
      message: "entry added successfully",
      data: item,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});
