import Koa from 'koa';
import Router from 'koa-router';
import {
  createMission,
  getMissions,
  getMissionById,
  updateMissionByid,
  deleteMissionById,
} from '../services/missionServices';

export interface RequestFields {
  name: string;
  unit: string;
  amount: string;
  isFixed: string;
  increment: string;
}

/** 取得單一任務 */
export const getMissionController = async (
  ctx: Router.RouterContext,
  next: Koa.Next
) => {
  try {
    const id = parseInt(ctx.params.id);
    const row = await getMissionById(id);

    // TODO: see if 404 here or in the service
    if (!row) {
      throw new Error('404');
    }

    ctx.body = { success: true, data: row };
    await next();
  } catch (error) {
    console.error(error);
    ctx.body = {
      success: false,
      data: JSON.stringify(error, Object.getOwnPropertyNames(error)),
    };
    await next();
  }
};

/** 取得所有任務 */
export const getAllMissionsController = async (
  ctx: Router.RouterContext,
  next: Koa.Next
) => {
  try {
    const rows = await getMissions();
    ctx.body = { success: true, data: rows };

    await next();
  } catch (error) {
    console.error(error);
    ctx.body = {
      success: false,
      data: JSON.stringify(error, Object.getOwnPropertyNames(error)),
    };

    await next();
  }
};

/** 建立任務 */
export const createMissionController = async (
  ctx: Router.RouterContext,
  next: Koa.Next
) => {
  const { name, unit, amount, isFixed, increment } = ctx.request.body;
  const fields: RequestFields = { name, unit, amount, isFixed, increment };

  // TODO: throw error according to different field
  try {
    if (!name || !unit || !amount || !isFixed || !increment) {
      throw new Error(
        `missing request body: \n${generateMissionFieldsMessage(fields)}`
      );
    }

    const row = await createMission(
      name,
      unit,
      Number(amount),
      isFixed,
      Number(increment)
    );
    ctx.body = { success: true, data: row };

    await next();
  } catch (error) {
    console.error(error);
    ctx.body = {
      success: false,
      data: JSON.stringify(error, Object.getOwnPropertyNames(error)),
    };

    await next();
  }
};

export const updateMissionController = async (
  ctx: Router.RouterContext,
  next: Koa.Next
) => {
  const { name, unit, amount, isFixed, increment } = ctx.request.body;
  const fields: RequestFields = { name, unit, amount, isFixed, increment };

  const id = parseInt(ctx.params.id);

  // TODO: throw error according to different field
  try {
    if (!id) {
      throw new Error('Please specify target row id');
    }

    if (!name || !unit || !amount || !isFixed || !increment) {
      throw new Error(
        `missing request body: \n${generateMissionFieldsMessage(fields)}`
      );
    }

    // TODO: improve later introducing to variables
    const rows = await updateMissionByid(
      id,
      name,
      unit,
      Number(amount),
      isFixed === 'true',
      Number(increment)
    );
    // TODO: return diffs
    ctx.body = { success: true, data: rows };

    await next();
  } catch (error) {
    console.error(error);
    ctx.body = {
      success: false,
      data: JSON.stringify(error, Object.getOwnPropertyNames(error)),
    };

    await next();
  }
};

// TODO: delete single mission
export const deleteMissionController = async (
  ctx: Router.RouterContext,
  next: Koa.Next
) => {
  try {
    const id = parseInt(ctx.params.id);
    const row = await deleteMissionById(id);
    ctx.body = { success: true, data: !row ? [] : row };
    await next();
  } catch (error) {
    console.error(error);
    // TODO: throw 404 if no row exist
    ctx.body = {
      success: false,
      data: JSON.stringify(error, Object.getOwnPropertyNames(error)),
    };
    await next();
  }
};

/** missing fields helper */
const generateMissionFieldsMessage = (fields: RequestFields) => {
  const processedFields = Object.entries(fields).map((field) => {
    const [key, value] = field;
    return `${key}: ${value}`;
  });

  const message = processedFields.join(', ');

  return message;
};