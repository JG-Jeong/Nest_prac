import { Cat, CatType } from "./cats.model";
import { Request, Response } from "express";

//* READ 고양이 전체 데이터 다 조회 -> GET
export const readAllcat = (req: Request, res: Response) => {
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
};

//* READ 특정 고양이 데이터 조회 -> GET
export const readCat = (req: Request, res: Response) => {
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
};

//* CREATE 새로운 고양이 추가 api -> POST
export const createCat = (req: Request, res: Response) => {
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
};

//* UPDATE 고양이 데이터 업데이트 -> PUT
export const updateCat = (req: Request, res: Response) => {
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
};

//* UPDATE 고양이 데이터 부분적으로 업데이트 -> PATCH
export const patchCat = (req: Request, res: Response) => {
  try {
    const body = req.body;
    const params = req.params;
    let result;

    Cat.forEach((cat) => {
      if (cat.id === params.id) {
        cat = { ...cat, ...body };
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
};

//* DELETE 고양이 데이터 삭제 -> DELETE
export const deleteCat = (req: Request, res: Response) => {
  try {
    const params = req.params;
    const newCat = Cat.filter((cat) => cat.id !== params.id);

    res.status(200).send({
      success: true,
      data: { newCat },
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
};
