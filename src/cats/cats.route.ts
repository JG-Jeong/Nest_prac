import { Cat, CatType } from "./cats.model";
import { Router } from "express";

const router = Router();

//* READ 고양이 전체 데이터 다 조회 -> GET
router.get("/cats", (req, res) => {
  try {
    const cats = { Cat };
    // throw new Error("db connect error");
    res.status(200).send({
      success: true,
      data: { cats },
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
});

//* READ 특정 고양이 데이터 조회 -> GET
router.get("/cats/:id", (req, res) => {
  try {
    const params = req.params;

    const cat = Cat.find((cat) => {
      return cat.id === params.id;
    });
    res.status(200).send({
      success: true,
      data: { cat },
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
});

//* CREATE 새로운 고양이 추가 api -> POST
router.post("/cats", (req, res) => {
  const data = req.body;
  console.log(data);
  Cat.push(data);
  try {
    res.status(200).send({
      success: true,
      data: { data },
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
});

//* UPDATE 고양이 데이터 업데이트 -> PUT
router.put("/cats/:id", (req, res) => {
  try {
    const body = req.body;
    const params = req.params;
    let result;
    Cat.forEach((cat) => {
      if (cat.id === params.id) {
        cat = body;
        result = cat;
      }
    });

    res.status(200).send({
      success: true,
      data: {
        cat: result,
      },
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
});

//* UPDATE 고양이 데이터 부분적으로 업데이트 -> PATCH
router.patch("/cats/:id", (req, res) => {
  try {
    const body = req.body;
    const params = req.params;
    let result;

    Cat.forEach((cat) => {
      if (cat.id === params.id) {
        console.log({ ...cat });
        console.log({ ...body });
        cat = { ...cat, ...body };
        result = cat;

        console.log(result);
        res.status(200).send({
          success: true,
          data: {
            cat: result,
          },
        });
      }
    });
    res.status(200).send({
      success: true,
      data: {
        cat: result,
      },
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
});

//* DELETE 고양이 데이터 삭제 -> DELETE

export default router;
